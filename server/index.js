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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const DATA_FILE = path.join(__dirname, 'data', 'availability.json');
const MAX_BOOKED_DATES = 2000;

applySecurityMiddleware(app);
app.use(cookieParser());
app.use(express.json({ limit: '16kb' }));

if (!fs.existsSync(path.dirname(DATA_FILE))) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
}
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ bookedDates: [] }, null, 2));
}

let passwordHash = null;

async function initPasswordHash() {
  if (process.env.OWNER_PASSWORD_HASH) {
    passwordHash = process.env.OWNER_PASSWORD_HASH;
  } else if (process.env.OWNER_PASSWORD) {
    const hash = await bcrypt.hash(process.env.OWNER_PASSWORD, 12);
    passwordHash = hash;
    let envContent = fs.readFileSync(ENV_FILE, 'utf-8');
    envContent = envContent.replace(/OWNER_PASSWORD=.*/, `OWNER_PASSWORD_HASH=${hash}`);
    envContent = envContent.replace(/# Owner password:.*\n?/, '');
    envContent = envContent.replace(/# Hash will be generated.*\n?/, '');
    fs.writeFileSync(ENV_FILE, envContent);
    console.log('✅ Owner password hashed; raw OWNER_PASSWORD removed from .env');
  } else {
    console.error('❌ Set OWNER_PASSWORD (first run) or OWNER_PASSWORD_HASH in .env');
    process.exit(1);
  }
}

function readAvailability() {
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw);
}

function writeAvailability(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
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

app.get('/api/availability', (_req, res) => {
  try {
    res.json(readAvailability());
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
  (req, res) => {
    const validation = validateBookedDates(req.body?.bookedDates);
    if (!validation.ok) {
      return res.status(400).json({ error: validation.error });
    }

    try {
      const uniqueDates = [...new Set(req.body.bookedDates)].sort();
      writeAvailability({ bookedDates: uniqueDates });
      res.json({ success: true, bookedDates: uniqueDates });
    } catch (err) {
      console.error('Error writing availability:', err.message);
      res.status(500).json({ error: 'Failed to update availability' });
    }
  }
);

if (config.isProduction) {
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

initPasswordHash().then(() => {
  app.listen(config.port, () => {
    console.log(`\n🏔️  SaGa Montana API server running on port ${config.port}\n`);
  });
});
