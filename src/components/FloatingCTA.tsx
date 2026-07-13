import { motion } from 'framer-motion';

export default function FloatingCTA() {
  return (
    <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url('/images/pool-night.jpeg')` }}
      />
      {/* Deeper royal overlay with warm gold tint */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, rgba(10,7,2,0.85) 0%, rgba(22,14,4,0.65) 50%, rgba(10,7,2,0.9) 100%)',
      }} />
      {/* Gold radial glow in center */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(201,167,74,0.08) 0%, transparent 60%)',
      }} />

      {/* Decorative top gold line */}
      <div className="absolute top-0 left-0 right-0" style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.6), rgba(201,167,74,0.9), rgba(212,175,55,0.6), transparent)',
        boxShadow: '0 0 12px rgba(212,175,55,0.3)',
      }} />
      {/* Decorative bottom gold line */}
      <div className="absolute bottom-0 left-0 right-0" style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.6), rgba(201,167,74,0.9), rgba(212,175,55,0.6), transparent)',
        boxShadow: '0 0 12px rgba(212,175,55,0.3)',
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
          Your Nature Escape
          <br />
          <em style={{
            fontWeight: 300,
            background: 'linear-gradient(135deg, #A8893A 0%, #D4AF37 35%, #F5E6A3 55%, #D4AF37 75%, #C9A74A 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 20px rgba(212,175,55,0.4))',
          }}>Awaits</em>
        </motion.h2>

        {/* Ornamental divider above button */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
          style={{
            width: '4rem',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
            boxShadow: '0 0 10px rgba(212,175,55,0.5)',
          }}
        />

        <motion.a
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          href="#booking"
          className="booking-cta gold-glow px-14 py-5"
        >
          Reserve Your Stay
        </motion.a>
      </div>
    </section>
  );
}
