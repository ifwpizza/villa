import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const reviews = [
  {
    name: 'Rahul Mehta',
    location: 'Mumbai',
    quote: 'SaGa Montana redefines what a weekend escape should feel like. The designer interiors are stunning, the mountain views are breathtaking, and the kids adored the loft mezzanine bed.',
    initials: 'RM',
  },
  {
    name: 'Priya Shah',
    location: 'Pune',
    quote: 'Exceptional hospitality in every sense. The villa is immaculate, spacious, and beautifully modern. The pool area feels like a private resort — we didn\'t want to leave.',
    initials: 'PS',
  },
  {
    name: 'Aman Patel',
    location: 'Surat',
    quote: 'The perfect antidote to city life. Top-tier amenities, robust power backup, a stunning kitchen, and WiFi that actually works. Already recommending this to everyone I know.',
    initials: 'AP',
  },
  {
    name: 'Sneha Kulkarni',
    location: 'Thane',
    quote: 'From the color palettes to the lighting fixtures, every detail is extraordinarily well-considered. Having access to the shared pool in Karla made the experience even more special.',
    initials: 'SK',
  },
  {
    name: 'Harsh Gupta',
    location: 'New Delhi',
    quote: 'Outstanding in every way. The WhatsApp booking was seamless, and the villa far exceeded our expectations. SaGa Montana delivers genuine, unhurried luxury.',
    initials: 'HG',
  },
];

export default function Reviews() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="reviews" className="section-luxury bg-parchment-gold overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-20">
          <p className="eyebrow-dark mb-5">Guest Voices</p>
          <h2 className="heading-luxury" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
            In Their Words
          </h2>
        </div>

        {/* Editorial Review Layout */}
        <div className="relative min-h-[320px] md:min-h-[280px]">
          {/* Large decorative quotation mark */}
          <div
            className="absolute -top-8 -left-4 md:-left-8 select-none pointer-events-none"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(8rem, 15vw, 14rem)',
              fontWeight: 300,
              lineHeight: 1,
              color: 'var(--color-champagne-muted)',
            }}
          >
            "
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative z-10"
            >
              {/* Quote */}
              <blockquote
                className="text-xl md:text-3xl lg:text-4xl leading-[1.4] md:leading-[1.35] mb-12 max-w-4xl"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 300,
                  color: 'var(--color-noir)',
                }}
              >
                {reviews[idx].quote}
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-5">
                {/* Initials avatar */}
                <div
                  className="w-12 h-12 flex items-center justify-center text-sm tracking-wider"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 500,
                    color: 'var(--color-champagne)',
                    border: '1px solid var(--color-champagne)',
                  }}
                >
                  {reviews[idx].initials}
                </div>
                <div>
                  <p
                    className="text-sm tracking-[0.08em]"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 500,
                      color: 'var(--color-noir)',
                    }}
                  >
                    {reviews[idx].name}
                  </p>
                  <p
                    className="text-[0.6rem] tracking-[0.25em] uppercase mt-0.5"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 400,
                      color: 'var(--color-ash)',
                    }}
                  >
                    {reviews[idx].location}
                  </p>
                </div>

                {/* Gold stars */}
                <div className="flex gap-1 ml-auto">
                  {[...Array(5)].map((_, s) => (
                    <svg key={s} className="w-4 h-4 star-gold" viewBox="0 0 24 24" fill="var(--color-gold-royal)">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Indicators */}
        <div className="flex gap-3 mt-16">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className="h-px transition-all duration-700"
              style={{
                width: idx === i ? '3rem' : '1.5rem',
                background: idx === i ? 'var(--color-champagne)' : 'var(--color-stone-dark)',
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
