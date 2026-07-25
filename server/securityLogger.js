const SENSITIVE_KEYS = ['password', 'token', 'authorization', 'cookie'];

function redact(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  const out = { ...obj };
  for (const key of Object.keys(out)) {
    if (SENSITIVE_KEYS.includes(key.toLowerCase())) {
      out[key] = '[REDACTED]';
    }
  }
  return out;
}

export function logSecurityEvent(event, details = {}) {
  const entry = {
    ts: new Date().toISOString(),
    event,
    ...redact(details),
  };
  console.warn('[security]', JSON.stringify(entry));
}
