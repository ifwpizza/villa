import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'data', 'availability.json');

app.use(cors());
app.use(express.json());

// ── Ensure data directory and file exist ──
if (!fs.existsSync(path.dirname(DATA_FILE))) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
}
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ bookedDates: [] }, null, 2));
}

// ── Hash password on first run if raw password is provided ──
let passwordHash = null;
const ENV_FILE = path.resolve(__dirname, '..', '.env');

async function initPasswordHash() {
  if (process.env.OWNER_PASSWORD_HASH) {
    passwordHash = process.env.OWNER_PASSWORD_HASH;
  } else if (process.env.OWNER_PASSWORD) {
    const hash = await bcrypt.hash(process.env.OWNER_PASSWORD, 12);
    passwordHash = hash;
    // Replace raw password with hash in .env for security
    let envContent = fs.readFileSync(ENV_FILE, 'utf-8');
    envContent = envContent.replace(
      /OWNER_PASSWORD=.*/,
      `OWNER_PASSWORD_HASH=${hash}`
    );
    // Remove any comment line about the password
    envContent = envContent.replace(/# Owner password:.*\n?/, '');
    // Remove the line mentioning hash generation
    envContent = envContent.replace(/# Hash will be generated.*\n?/, '');
    fs.writeFileSync(ENV_FILE, envContent);
    console.log('✅ Password hashed and saved to .env (raw password removed)');
  } else {
    console.error('❌ No OWNER_PASSWORD or OWNER_PASSWORD_HASH set in .env');
    process.exit(1);
  }
}

// ── Helpers ──
function readAvailability() {
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw);
}

function writeAvailability(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access token required' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
}

// ── Routes ──

// Public: Get booked dates
app.get('/api/availability', (_req, res) => {
  try {
    const data = readAvailability();
    res.json(data);
  } catch (err) {
    console.error('Error reading availability:', err);
    res.status(500).json({ error: 'Failed to read availability data' });
  }
});

// Owner login
app.post('/api/login', async (req, res) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }

  try {
    const match = await bcrypt.compare(password, passwordHash);
    if (!match) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ role: 'owner' }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// Protected: Update availability
app.put('/api/availability', authenticateToken, (req, res) => {
  const { bookedDates } = req.body;

  if (!Array.isArray(bookedDates)) {
    return res.status(400).json({ error: 'bookedDates must be an array' });
  }

  // Validate date format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const invalidDates = bookedDates.filter((d) => !dateRegex.test(d));
  if (invalidDates.length > 0) {
    return res
      .status(400)
      .json({ error: `Invalid date format: ${invalidDates.join(', ')}` });
  }

  try {
    // Sort and deduplicate
    const uniqueDates = [...new Set(bookedDates)].sort();
    writeAvailability({ bookedDates: uniqueDates });
    res.json({ success: true, bookedDates: uniqueDates });
  } catch (err) {
    console.error('Error writing availability:', err);
    res.status(500).json({ error: 'Failed to update availability' });
  }
});

// Verify token validity
app.get('/api/verify', authenticateToken, (_req, res) => {
  res.json({ valid: true });
});

// ── Start ──
initPasswordHash().then(() => {
  app.listen(PORT, () => {
    console.log(`\n🏔️  SaGa Montana API server running on http://localhost:${PORT}`);
    console.log(`   Availability data: ${DATA_FILE}\n`);
  });
});
