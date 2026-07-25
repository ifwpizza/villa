import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loginOwner } from '../lib/ownerApi';

interface OwnerLoginProps {
  onLogin: () => void;
  onClose: () => void;
}

export default function OwnerLogin({ onLogin, onClose }: OwnerLoginProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setLoading(true);
    setError('');

    try {
      const result = await loginOwner(password);

      if (!result.ok) {
        setError(result.error);
        setLoading(false);
        return;
      }

      onLogin();
    } catch {
      setError('Server unavailable. Please try again.');
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="owner-login-overlay"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.96 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="owner-login-card"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="owner-login-close"
            aria-label="Close"
          >
            ✕
          </button>

          {/* Logo */}
          <div className="text-center mb-10">
            <span
              className="gold-shimmer-text"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
                fontWeight: 300,
                letterSpacing: '0.1em',
              }}
            >
              SaGa
            </span>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
                fontWeight: 300,
                letterSpacing: '0.1em',
                color: 'var(--color-warm-white)',
              }}
            >
              {' '}Montana
            </span>
            <p
              className="mt-3"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.6rem',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: 'var(--color-ash)',
              }}
            >
              Owner Access
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="owner-login-field">
              <label
                htmlFor="owner-password"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.55rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'var(--color-ash)',
                  fontWeight: 500,
                  marginBottom: '0.5rem',
                  display: 'block',
                }}
              >
                Password
              </label>
              <input
                id="owner-password"
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                placeholder="Enter owner password"
                autoFocus
                className="owner-login-input"
              />
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="owner-login-error"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !password.trim()}
              className="owner-login-submit"
            >
              {loading ? (
                <span className="owner-login-spinner" />
              ) : (
                'Authenticate'
              )}
            </button>
          </form>

          {/* Decorative bottom line */}
          <div className="gold-divider-wide mt-8" />
          <p
            className="text-center mt-4"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.5rem',
              letterSpacing: '0.15em',
              color: 'var(--color-ash)',
            }}
          >
            Authorized personnel only
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
