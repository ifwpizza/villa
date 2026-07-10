import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const reviewsData = [
  {
    quote: "SaGa Montana redefines what a weekend escape in the mountains should feel like. The interiors are incredibly sophisticated, the private pool landscape is pure bliss, and the mountain morning mist from the balcony is a sight we will never forget.",
    author: "Rahul & Natasha Mehta",
    source: "Google Luxury Verified",
    rating: 5,
    tag: "STAYED IN MAY 2026"
  },
  {
    quote: "Absolute resort-grade privacy and design. The kitchen is fully equipped for long stays, the mezzanine loft is a fantastic touch that our family loved, and the backup power gave us complete peace of mind. Five-star standard throughout.",
    author: "Priya Shah & Family",
    source: "Booking.com Elite Guest",
    rating: 5,
    tag: "STAYED IN JUNE 2026"
  },
  {
    quote: "A masterpiece of boutique design. Having booked several villas across Maharashtra, SaGa Montana easily stands out for its exceptional attention to clean layout, beautiful color tones, and direct responsive WhatsApp concierge. Highly recommended.",
    author: "Aman Patel",
    source: "Superhost Verified",
    rating: 5,
    tag: "STAYED IN JULY 2026"
  }
];

export default function Reviews() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev === reviewsData.length - 1 ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="reviews" className="section-luxury bg-[var(--color-ivory)] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header & Trust Badges */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-24">
          <div className="lg:col-span-6">
            <p className="eyebrow-dark mb-4">Guest Testimonials</p>
            <h2 className="heading-luxury text-3xl md:text-5xl font-light">
              Voices of Splendor
            </h2>
          </div>

          {/* Badges */}
          <div className="lg:col-span-6 flex flex-wrap gap-4 lg:justify-end">
            {/* Google Badge */}
            <div className="flex items-center gap-3 px-6 py-4 border border-[var(--color-stone-dark)] bg-[var(--color-warm-white)] rounded-[20px]">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-50 text-blue-600 font-semibold text-sm">G</div>
              <div>
                <p className="text-xs font-semibold text-[var(--color-charcoal)]" style={{ fontFamily: 'var(--font-body)' }}>Google Verified</p>
                <p className="text-[0.65rem] text-[var(--color-ash)] font-light mt-0.5" style={{ fontFamily: 'var(--font-body)' }}>4.9/5 · 140+ Reviews</p>
              </div>
            </div>
            {/* Booking.com Badge */}
            <div className="flex items-center gap-3 px-6 py-4 border border-[var(--color-stone-dark)] bg-[var(--color-warm-white)] rounded-[20px]">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-900 text-white font-bold text-xs">B.</div>
              <div>
                <p className="text-xs font-semibold text-[var(--color-charcoal)]" style={{ fontFamily: 'var(--font-body)' }}>Booking.com</p>
                <p className="text-[0.65rem] text-[var(--color-ash)] font-light mt-0.5" style={{ fontFamily: 'var(--font-body)' }}>9.4/10 · Exceptional</p>
              </div>
            </div>
          </div>
        </div>

        {/* Large Testimonial Block */}
        <div className="relative min-h-[380px] md:min-h-[300px]">
          {/* Oversized Quote Mark */}
          <span
            className="absolute -top-16 -left-6 md:-left-12 select-none pointer-events-none text-[12rem] font-light leading-none text-[var(--color-stone)] opacity-60"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            “
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              className="relative z-10 max-w-5xl"
            >
              {/* Quote Tag */}
              <span className="inline-block text-[0.6rem] tracking-[0.25em] uppercase text-[var(--color-gold-dark)] font-semibold mb-6" style={{ fontFamily: 'var(--font-body)' }}>
                {reviewsData[activeIdx].tag}
              </span>

              {/* Quote */}
              <blockquote
                className="text-2xl md:text-4xl leading-[1.4] md:leading-[1.35] text-[var(--color-charcoal)] font-light mb-12"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {reviewsData[activeIdx].quote}
              </blockquote>

              {/* Author & Rating */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-[var(--color-stone)] pt-8">
                <div>
                  <h4 className="text-lg font-light text-[var(--color-charcoal)]" style={{ fontFamily: 'var(--font-heading)' }}>
                    {reviewsData[activeIdx].author}
                  </h4>
                  <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[var(--color-ash)] mt-1" style={{ fontFamily: 'var(--font-body)' }}>
                    {reviewsData[activeIdx].source}
                  </p>
                </div>

                {/* Five Star SVG Strip */}
                <div className="flex gap-1.5">
                  {[...Array(reviewsData[activeIdx].rating)].map((_, s) => (
                    <svg key={s} className="w-5 h-5 text-[var(--color-gold)] fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.1l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2.1z" />
                    </svg>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Indicators (Thick elegant lines) */}
        <div className="flex gap-4 mt-20">
          {reviewsData.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className="h-1 rounded-full transition-all duration-700 cursor-pointer"
              style={{
                width: activeIdx === i ? '4.5rem' : '1.5rem',
                backgroundColor: activeIdx === i ? 'var(--color-burgundy)' : 'var(--color-stone-dark)',
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
