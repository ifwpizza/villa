import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const ENV_FILE = path.resolve(__dirname, '..', '.env');

if (!fs.existsSync(ENV_FILE)) {
  console.error(
    '❌ Missing .env file. Copy .env.example to .env and set strong secrets before starting the server.'
  );
  process.exit(1);
}

dotenv.config({ path: ENV_FILE });

const isProduction = process.env.NODE_ENV === 'production';

function requireSecret(name, minLength = 32) {
  const value = process.env[name]?.trim();
  if (!value) {
    const msg = `${name} is required. Use: openssl rand -base64 48`;
    console.error(`❌ ${msg}`);
    process.exit(1);
  }
  if (value.length < minLength) {
    const msg = `${name} should be at least ${minLength} characters for production security.`;
    if (isProduction) {
      console.error(`❌ ${msg}`);
      process.exit(1);
    }
    console.warn(`⚠️  ${msg} (allowed in development — rotate before deploy)`);
  }
  return value;
}

function resolveCsrfSecret(jwtSecret) {
  if (process.env.CSRF_SECRET?.trim()) {
    return requireSecret('CSRF_SECRET', 32);
  }
  if (isProduction) {
    console.error('❌ CSRF_SECRET must be set in production. Use: openssl rand -base64 48');
    process.exit(1);
  }
  console.warn('⚠️  CSRF_SECRET not set; using JWT_SECRET for CSRF in development only.');
  return jwtSecret;
}

const jwtSecret = requireSecret('JWT_SECRET', 32);

export const config = {
  isProduction,
  port: Number(process.env.PORT) || 3001,
  jwtSecret,
  csrfSecret: resolveCsrfSecret(jwtSecret),
  corsOrigins: (process.env.CORS_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean),
  cookieSecure: process.env.COOKIE_SECURE === 'true' || isProduction,
  trustProxy: process.env.TRUST_PROXY === 'true' || isProduction,
};
