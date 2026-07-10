import { motion, type Variants } from 'framer-motion';

const textVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 2.4,
    },
  },
};

const lineVariant: Variants = {
  hidden: { opacity: 0, y: 50, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.4, ease: 'easeOut' },
  },
};

export default function Hero() {
  return (
    <section id="home" className="relative h-screen overflow-hidden bg-[var(--color-charcoal)]">
      {/* Cinematic Responsive Background using HTML <picture> */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <picture className="w-full h-full">
          {/* Mobile composition (portrait priority crop showing villa + pool) */}
          <source
            media="(max-width: 639px)"
            srcSet="/images/pool-night.jpeg"
          />
          {/* Tablet composition */}
          <source
            media="(max-width: 1023px)"
            srcSet="/images/sunset-pool-villa.jpeg"
          />
          {/* Desktop panoramic composition */}
          <img
            src="/images/hero-sunset-pool.jpeg"
            alt="SaGa Montana Luxury Villa"
            className="ken-burns w-full h-full object-cover"
          />
        </picture>

        {/* Deep luxurious dark overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-b"
          style={{
            background: 'linear-gradient(180deg, rgba(17,17,17,0.75) 0%, rgba(17,17,17,0.4) 40%, rgba(17,17,17,0.85) 100%)',
          }}
        />
      </div>

      {/* Hero Core Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-6 lg:px-12 text-center">
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto flex flex-col items-center"
        >
          {/* Eyebrow */}
          <motion.p
            variants={lineVariant}
            className="eyebrow mb-6 text-[var(--color-gold)] font-medium tracking-[0.4em]"
          >
            A Private Sanctuary · Karla, Lonavala
          </motion.p>

          {/* Luxury Serif Title */}
          <motion.h1
            variants={lineVariant}
            className="heading-luxury-light mb-8 font-light"
            style={{
              fontSize: 'clamp(2.5rem, 7.5vw, 6.5rem)',
              lineHeight: '1.05',
              wordBreak: 'keep-all',
            }}
          >
            Experience <span className="italic text-[var(--color-gold)] font-normal">Timeless</span>
            <br className="hidden sm:block" />
            Luxury in Nature
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={lineVariant}
            className="max-w-xl text-white/70 text-sm md:text-base font-light leading-relaxed mb-12"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            An award-winning 2BHK designer private villa designed for the discerning traveler, nestled in the Karla mountains.
          </motion.p>

          {/* Floating Glass Booking Button */}
          <motion.div variants={lineVariant}>
            <a
              href="#booking"
              className="inline-flex items-center gap-3 px-12 py-5 text-[0.65rem] font-semibold tracking-[0.35em] uppercase text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-[var(--color-charcoal)] transition-all duration-[0.8s] glass-dark rounded-full shadow-[0_12px_30px_rgba(212,175,55,0.15)] group"
              style={{ border: '1px solid rgba(212, 175, 55, 0.4)' }}
            >
              Reserve Your Escape
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Progress Line Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 1.5 }}
          className="absolute bottom-10 flex flex-col items-center gap-4 cursor-pointer"
          onClick={() => document.getElementById('villa')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span
            className="text-white/40 text-[0.6rem] tracking-[0.4em] uppercase"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            className="w-[1px] h-10 bg-gradient-to-b from-[var(--color-gold)] to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
