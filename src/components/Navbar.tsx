import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'The Retreat', href: '#villa' },
  { label: 'Spaces', href: '#villa-experience' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Surroundings', href: '#nearby' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 2.2, ease: [0.25, 1, 0.5, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? 'glass-dark py-4 shadow-lg' : 'bg-transparent py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#home" className="flex items-baseline gap-2 group">
            <span
              className="text-3xl lg:text-4xl tracking-[0.05em] transition-colors duration-500 text-[var(--color-gold)]"
              style={{ fontFamily: 'var(--font-heading)', fontWeight: 300 }}
            >
              SaGa
            </span>
            <span
              className="text-xl lg:text-2xl tracking-[0.25em] text-[var(--color-warm-white)] font-light transition-colors duration-500"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Montana
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[0.65rem] font-light tracking-[0.3em] uppercase text-white/85 hover:text-[var(--color-gold)] transition-colors duration-500"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#booking"
              className="ml-4 px-8 py-3 text-[0.65rem] font-semibold tracking-[0.3em] uppercase transition-all duration-500 rounded-full bg-transparent text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-[var(--color-charcoal)]"
              style={{
                fontFamily: 'var(--font-body)',
                border: '1px solid var(--color-gold)',
              }}
            >
              Reserve
            </a>
          </nav>

          {/* Mobile Hamburg */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex flex-col gap-2 p-2 z-50 relative cursor-pointer"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7, backgroundColor: '#D4AF37' } : { rotate: 0, y: 0, backgroundColor: '#FDFBF8' }}
              className="block w-6 h-[1px]"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1, backgroundColor: '#FDFBF8' }}
              className="block w-6 h-[1px]"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7, backgroundColor: '#D4AF37' } : { rotate: 0, y: 0, backgroundColor: '#FDFBF8' }}
              className="block w-6 h-[1px]"
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile Full Screen Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6"
            style={{ background: 'rgba(17,17,17,0.98)' }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="text-2xl tracking-[0.2em] text-white/80 hover:text-[var(--color-gold)] transition-colors"
                style={{ fontFamily: 'var(--font-heading)', fontWeight: 300 }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#booking"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="mt-6 px-10 py-3.5 text-[0.65rem] tracking-[0.3em] uppercase text-[var(--color-gold)] rounded-full transition-all duration-500"
              style={{
                fontFamily: 'var(--font-body)',
                border: '1px solid var(--color-gold)',
              }}
            >
              Reserve Your Stay
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
