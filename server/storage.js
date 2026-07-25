import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, 'data', 'availability.json');
const BLOB_PATHNAME = 'availability.json';

function ensureLocalDataFile() {
  if (process.env.BLOB_READ_WRITE_TOKEN || process.env.VERCEL) {
    return;
  }
  if (!fs.existsSync(path.dirname(DATA_FILE))) {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ bookedDates: [] }, null, 2));
  }
}

export async function readAvailability() {
  ensureLocalDataFile();

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { list } = await import('@vercel/blob');
    const { blobs } = await list({ prefix: BLOB_PATHNAME, limit: 1 });
    if (blobs.length === 0) {
      return { bookedDates: [] };
    }
    const res = await fetch(blobs[0].url);
    if (!res.ok) {
      return { bookedDates: [] };
    }
    return res.json();
  }

  if (process.env.VERCEL) {
    console.warn('[storage] Set BLOB_READ_WRITE_TOKEN on Vercel for persistent availability.');
    return { bookedDates: [] };
  }

  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw);
}

export async function writeAvailability(data) {
  ensureLocalDataFile();

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = await import('@vercel/blob');
    await put(BLOB_PATHNAME, JSON.stringify(data), {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: 'application/json',
    });
    return;
  }

  if (process.env.VERCEL) {
    throw new Error('Availability storage is not configured (BLOB_READ_WRITE_TOKEN)');
  }

  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}
