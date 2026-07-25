import express from 'express';
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config, ENV_FILE } from './env.js';
import { applySecurityMiddleware, loginLimiter } from './middleware/security.js';
import {
  authenticateToken,
  clearAuthCookie,
  doubleCsrfProtection,
  generateCsrfToken,
  setAuthCookie,
  signOwnerToken,
} from './middleware/auth.js';
import { logSecurityEvent } from './securityLogger.js';
import { readAvailability, writeAvailability } from './storage.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MAX_BOOKED_DATES = 2000;

let passwordHash = null;

async function initPasswordHash() {
  if (process.env.OWNER_PASSWORD_HASH) {
    passwordHash = process.env.OWNER_PASSWORD_HASH;
    return;
  }
  if (process.env.OWNER_PASSWORD && fs.existsSync(ENV_FILE)) {
    const hash = await bcrypt.hash(process.env.OWNER_PASSWORD, 12);
    passwordHash = hash;
    let envContent = fs.readFileSync(ENV_FILE, 'utf-8');
    envContent = envContent.replace(/OWNER_PASSWORD=.*/, `OWNER_PASSWORD_HASH=${hash}`);
    envContent = envContent.replace(/# Owner password:.*\n?/, '');
    envContent = envContent.replace(/# Hash will be generated.*\n?/, '');
    fs.writeFileSync(ENV_FILE, envContent);
    console.log('✅ Owner password hashed; raw OWNER_PASSWORD removed from .env');
    return;
  }
  throw new Error(
    'OWNER_PASSWORD_HASH must be set in environment (required on Vercel; copy from local .env)'
  );
}

function isValidCalendarDate(dateStr) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return (
    date.getUTCFullYear() === y &&
    date.getUTCMonth() === m - 1 &&
    date.getUTCDate() === d
  );
}

function validateBookedDates(bookedDates) {
  if (!Array.isArray(bookedDates)) {
    return { ok: false, error: 'bookedDates must be an array' };
  }
  if (bookedDates.length > MAX_BOOKED_DATES) {
    return { ok: false, error: `Too many dates (max ${MAX_BOOKED_DATES})` };
  }
  for (const entry of bookedDates) {
    if (typeof entry !== 'string' || !isValidCalendarDate(entry)) {
      return { ok: false, error: 'One or more dates have an invalid format' };
    }
  }
  return { ok: true };
}

let appPromise = null;

export function createApp() {
  if (!appPromise) {
    appPromise = buildApp();
  }
  return appPromise;
}

async function buildApp() {
  await initPasswordHash();

  const app = express();

  applySecurityMiddleware(app);
  app.use(cookieParser());
  app.use(express.json({ limit: '16kb' }));

  app.get('/api/availability', async (_req, res) => {
    try {
      res.json(await readAvailability());
    } catch (err) {
      console.error('Error reading availability:', err.message);
      res.status(500).json({ error: 'Failed to read availability data' });
    }
  });

  app.get('/api/csrf-token', authenticateToken, (req, res) => {
    const csrfToken = generateCsrfToken(req, res);
    res.json({ csrfToken });
  });

  app.post('/api/login', loginLimiter, async (req, res) => {
    const password = req.body?.password;
    if (typeof password !== 'string' || !password.trim()) {
      return res.status(400).json({ error: 'Password is required' });
    }
    if (password.length > 256) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    try {
      const match = await bcrypt.compare(password, passwordHash);
      if (!match) {
        logSecurityEvent('login_failed', { ip: req.ip });
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = signOwnerToken();
      setAuthCookie(res, token);
      logSecurityEvent('login_success', { ip: req.ip });
      res.json({ authenticated: true });
    } catch (err) {
      console.error('Login error:', err.message);
      res.status(500).json({ error: 'Authentication failed' });
    }
  });

  app.post('/api/logout', (_req, res) => {
    clearAuthCookie(res);
    res.json({ success: true });
  });

  app.get('/api/verify', authenticateToken, (_req, res) => {
    res.json({ valid: true });
  });

  app.put(
    '/api/availability',
    authenticateToken,
    doubleCsrfProtection,
    async (req, res) => {
      const validation = validateBookedDates(req.body?.bookedDates);
      if (!validation.ok) {
        return res.status(400).json({ error: validation.error });
      }

      try {
        const uniqueDates = [...new Set(req.body.bookedDates)].sort();
        await writeAvailability({ bookedDates: uniqueDates });
        res.json({ success: true, bookedDates: uniqueDates });
      } catch (err) {
        console.error('Error writing availability:', err.message);
        res.status(500).json({ error: 'Failed to update availability' });
      }
    }
  );

  if (config.isProduction && !process.env.VERCEL) {
    const distPath = path.join(__dirname, '..', 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath, { index: false }));
      app.get(/^(?!\/api).*/, (_req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }
  }

  app.use((err, _req, res, next) => {
    if (err.message === 'Not allowed by CORS') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next(err);
  });

  return app;
}
