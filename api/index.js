import { createApp } from '../server/createApp.js';

let app;

export default async function handler(req, res) {
  try {
    if (!app) {
      app = await createApp();
    }
    return app(req, res);
  } catch (err) {
    console.error('[api] bootstrap failed:', err.message);
    res.status(503).json({
      error: 'API is not configured. Set JWT_SECRET, CSRF_SECRET, and OWNER_PASSWORD_HASH in Vercel.',
    });
  }
}
