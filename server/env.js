import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const ENV_FILE = path.resolve(__dirname, '..', '.env');
const onVercel = Boolean(process.env.VERCEL);

if (fs.existsSync(ENV_FILE)) {
  dotenv.config({ path: ENV_FILE });
} else if (!onVercel) {
  console.error(
    '❌ Missing .env file. Copy .env.example to .env and set strong secrets before starting the server.'
  );
  process.exit(1);
}

const isProduction = process.env.NODE_ENV === 'production' || onVercel;

function defaultCorsOrigins() {
  if (process.env.CORS_ORIGIN) {
    return process.env.CORS_ORIGIN;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'http://localhost:5173';
}

function requireSecret(name, minLength = 32) {
  const value = process.env[name]?.trim();
  if (!value) {
    const msg = `${name} is required. Use: openssl rand -base64 48`;
    console.error(`❌ ${msg}`);
    process.exit(1);
  }
  if (value.length < minLength) {
    const msg = `${name} should be at least ${minLength} characters for production security.`;
    if (isProduction && !onVercel) {
      console.error(`❌ ${msg}`);
      process.exit(1);
    }
    if (isProduction && onVercel) {
      console.error(`❌ ${msg}`);
      process.exit(1);
    }
    console.warn(`⚠️  ${msg} (allowed in local development — rotate before deploy)`);
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
  corsOrigins: defaultCorsOrigins()
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean),
  cookieSecure: process.env.COOKIE_SECURE === 'true' || isProduction,
  trustProxy: process.env.TRUST_PROXY === 'true' || isProduction || onVercel,
};
