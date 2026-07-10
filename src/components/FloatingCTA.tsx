import { motion } from 'framer-motion';

export default function FloatingCTA() {
  return (
    <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url('/images/pool-night.jpeg')` }}
      />
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, rgba(22,22,22,0.8) 0%, rgba(22,22,22,0.6) 50%, rgba(22,22,22,0.85) 100%)',
      }} />

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="eyebrow mb-8"
        >
          Begin Your Journey
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="heading-luxury-light mb-10"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
        >
          Your Luxury Escape
          <br />
          <em style={{ fontWeight: 300 }}>Awaits</em>
        </motion.h2>

        <motion.a
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          href="#booking"
          className="px-12 py-4 text-[0.65rem] tracking-[0.35em] uppercase text-[var(--color-champagne)] hover:bg-[var(--color-champagne)] hover:text-[var(--color-noir)] transition-all duration-700"
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            border: '1px solid rgba(201,167,74,0.4)',
          }}
        >
          Reserve Your Stay
        </motion.a>
      </div>
    </section>
  );
}
