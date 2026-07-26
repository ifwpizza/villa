import jwt from 'jsonwebtoken';
import { doubleCsrf } from 'csrf-csrf';
import { config } from '../env.js';
import { logSecurityEvent } from '../securityLogger.js';

export const AUTH_COOKIE = 'owner_session';

const csrf = doubleCsrf({
  getSecret: () => config.csrfSecret,
  cookieName: 'csrf_token',
  cookieOptions: {
    sameSite: 'strict',
    path: '/',
    secure: config.cookieSecure,
    httpOnly: true,
  },
  getSessionIdentifier: (req) =>
    req.cookies?.[AUTH_COOKIE] || req.ip || 'anonymous',
});

export const { generateCsrfToken, doubleCsrfProtection } = csrf;

export function authenticateToken(req, res, next) {
  const bearer = req.headers.authorization?.split(' ')[1];
  const token = req.cookies?.[AUTH_COOKIE] || bearer;

  if (!token) {
    logSecurityEvent('auth_missing_token', { ip: req.ip, path: req.path });
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    if (decoded.role !== 'owner') {
      logSecurityEvent('auth_invalid_role', { ip: req.ip, path: req.path });
      return res.status(403).json({ error: 'Forbidden' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    logSecurityEvent('auth_invalid_token', { ip: req.ip, path: req.path, error: err.name });
    return res.status(403).json({ error: 'Invalid or expired session' });
  }
}

export function setAuthCookie(res, token) {
  res.cookie(AUTH_COOKIE, token, {
    httpOnly: true,
    secure: config.cookieSecure,
    sameSite: 'strict',
    path: '/',
    maxAge: 24 * 60 * 60 * 1000,
  });
}

export function clearAuthCookie(res) {
  res.clearCookie(AUTH_COOKIE, {
    httpOnly: true,
    secure: config.cookieSecure,
    sameSite: 'strict',
    path: '/',
  });
}

export function signOwnerToken() {
  return jwt.sign({ role: 'owner' }, config.jwtSecret, { expiresIn: '24h' });
}
