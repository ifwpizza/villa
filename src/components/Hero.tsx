import { motion, type Variants } from 'framer-motion';

const textVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 2.6,
    },
  },
};

const lineVariant: Variants = {
  hidden: { opacity: 0, y: 60, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.2, ease: 'easeOut' },
  },
};

export default function Hero() {
  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Ken Burns Background */}
      <div className="absolute inset-0">
        <div
          className="ken-burns absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/hero-sunset-pool.jpeg')` }}
        />
        {/* Royal luxury overlay — deeper with warm gold tint at bottom */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 40%, rgba(10,7,2,0.82) 100%)',
        }} />
        {/* Subtle gold radial glow from center */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 50% 60%, rgba(201,167,74,0.06) 0%, transparent 65%)',
        }} />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-5xl mx-auto flex flex-col items-center"
        >
          {/* Main Heading — huge elegant serif */}
          <motion.h1
            variants={lineVariant}
            className="heading-luxury-light mb-12"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 7rem)' }}
          >
            Experience{' '}
            <em
              style={{
                fontWeight: 300,
                background: 'linear-gradient(135deg, #A8893A 0%, #D4AF37 35%, #F5E6A3 55%, #D4AF37 75%, #C9A74A 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 24px rgba(212,175,55,0.35))',
              }}
            >
              Nature
            </em>
            <br />
            Like Never Before
          </motion.h1>

          {/* Royal gold divider under heading */}
          <motion.div
            variants={lineVariant}
            style={{
              width: '6rem',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #D4AF37, #C9A74A, #D4AF37, transparent)',
              boxShadow: '0 0 12px rgba(212,175,55,0.5)',
              marginBottom: '0',
            }}
          />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 1.5 }}
          className="absolute bottom-12 flex flex-col items-center gap-3 cursor-pointer"
          onClick={() => document.getElementById('villa')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-white/30 text-[0.55rem] tracking-[0.4em] uppercase" style={{ fontFamily: 'var(--font-body)' }}>
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            style={{
              width: '1px',
              height: '2.5rem',
              background: 'linear-gradient(180deg, #D4AF37, #C9A74A, transparent)',
              boxShadow: '0 0 6px rgba(212,175,55,0.4)',
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
