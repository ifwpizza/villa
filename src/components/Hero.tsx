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
        {/* Very dark luxury overlay */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.75) 100%)',
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
          {/* Eyebrow */}
          <motion.p variants={lineVariant} className="eyebrow mb-8">
            A Private Villa Retreat · Karla, Lonavala
          </motion.p>

          {/* Main Heading — huge elegant serif */}
          <motion.h1
            variants={lineVariant}
            className="heading-luxury-light mb-8"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 7rem)' }}
          >
            Experience <em style={{ fontWeight: 300 }}>Luxury</em>
            <br />
            Like Never Before
          </motion.h1>

          {/* Sub text */}
          <motion.p
            variants={lineVariant}
            className="max-w-xl text-white/60 text-sm md:text-base font-light leading-relaxed mb-12"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            A meticulously designed 2BHK designer villa nestled
            in the serene mountains, offering unparalleled privacy
            and timeless elegance.
          </motion.p>

          {/* Floating Glass Booking Button */}
          <motion.a
            variants={lineVariant}
            href="#booking"
            className="glass-dark px-12 py-4 text-[0.65rem] font-medium tracking-[0.35em] uppercase text-[#C9A74A] hover:bg-[#C9A74A] hover:text-[#161616] transition-all duration-700 group"
            style={{ border: '1px solid rgba(201,167,74,0.35)' }}
          >
            <span className="flex items-center gap-3">
              Reserve Your Stay
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </span>
          </motion.a>
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
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-[#C9A74A] to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
