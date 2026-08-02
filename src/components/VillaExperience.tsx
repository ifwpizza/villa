import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const villaImages = [
  { src: '/images/second-bedroom.jpeg', caption: 'Second Bedroom' },
  { src: '/images/mezzanine-bedroom.jpeg', caption: 'Mezzanine Loft' },
  { src: '/images/kitchen-full.jpeg', caption: 'Designer Kitchen' },
  { src: '/images/entrance-hallway.jpeg', caption: 'Grand Entrance' },
  { src: '/images/living-room-night.jpeg', caption: 'Evening Ambiance' },
];

export default function VillaExperience() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section id="villa-experience" className="bg-[var(--color-noir)] overflow-hidden">
      {/* Full-width immersive image slider */}
      <div className="relative h-[70vh] md:h-[85vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${villaImages[activeIdx].src}')` }}
          />
        </AnimatePresence>

        {/* Dark gradient overlay */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(0deg, rgba(22,22,22,1) 0%, rgba(22,22,22,0.3) 50%, rgba(22,22,22,0.5) 100%)',
        }} />

        {/* Caption & Nav */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10"
          style={{ padding: 'clamp(2rem, 5vw, 5rem)' }}
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <div>
              <p className="eyebrow mb-4">The Spaces</p>
              <AnimatePresence mode="wait">
                <motion.h2
                  key={activeIdx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="heading-luxury-light"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
                >
                  {villaImages[activeIdx].caption}
                </motion.h2>
              </AnimatePresence>
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-3">
              {villaImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`w-16 h-16 md:w-20 md:h-20 overflow-hidden transition-all duration-500 ${
                    activeIdx === i
                      ? 'opacity-100'
                      : 'opacity-40 hover:opacity-70'
                  }`}
                  style={activeIdx === i ? {
                    outline: '1px solid rgba(212,175,55,0.8)',
                    outlineOffset: '2px',
                    boxShadow: '0 0 16px rgba(212,175,55,0.4)',
                  } : {}}
                >
                  <img src={img.src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Details Section — dark background */}
      <div className="flex min-h-[70vh] items-center" style={{ padding: 'clamp(5rem, 9vw, 9rem) clamp(2rem, 5vw, 5rem)' }}>
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-20 items-start">

            {/* Left: Villa Details */}
            <div className="min-w-0">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span
                  className="text-[0.7rem] tracking-[0.25em] uppercase text-emerald-300"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
                >
                  Available for Bookings
                </span>
              </div>

              <h3
                className="heading-luxury-light mb-3"
                style={{ fontSize: 'clamp(2.25rem, 3vw, 3rem)', fontWeight: 400, letterSpacing: '0.02em' }}
              >
                SaGa Montana
              </h3>

              <p
                className="text-sm tracking-[0.08em] leading-relaxed text-[var(--color-stone-dark)] mb-9"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Yash Villas, Dahivali · Near Ekvira Temple · Karla, Lonavala
              </p>

              {/* Minimal spec list */}
              <div className="flex flex-col gap-5 mb-9">
                {[
                  ['Configuration', '2 BHK Villa'],
                  ['Occupancy', 'Up to 8 Guests'],
                  ['Check-in', '12:00 PM'],
                  ['Check-out', '11:00 AM'],
                ].map(([label, value], i) => (
                  <div key={i} className="flex justify-between gap-6 items-baseline border-b border-white/15 pb-4">
                    <span className="text-[0.7rem] tracking-[0.2em] uppercase text-[var(--color-stone-dark)]" style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}>
                      {label}
                    </span>
                    <span className="shrink-0 text-base text-[var(--color-warm-white)]" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              {/* House Rules — minimal */}
              <div>
                <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[var(--color-stone-dark)] mb-4" style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}>
                  House Rules
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 text-sm text-[var(--color-stone-dark)]" style={{ fontFamily: 'var(--font-body)', fontWeight: 400 }}>
                  <span>• No pets allowed</span>
                  <span>• No illegal activities</span>
                  <span>• Respect the property</span>
                  <span>• Maintain cleanliness</span>
                </div>
              </div>
            </div>

            {/* Right: Elegant Pricing Table */}
            <div className="min-w-0 flex flex-col items-center">
              <p className="eyebrow mb-8">Tariff</p>

              {/* Pricing Table */}
              <div className="w-full max-w-3xl border border-white/15 bg-black/10">
                {/* Header */}
                <div className="grid grid-cols-[1.35fr_1fr_1fr] items-center border-b border-white/15 px-6 md:px-8 py-4" style={{ background: 'linear-gradient(90deg, rgba(201,167,74,0.16) 0%, rgba(212,175,55,0.07) 100%)' }}>
                  <span className="text-center text-[0.72rem] tracking-[0.2em] uppercase text-[var(--color-champagne-light)]" style={{ fontFamily: 'var(--font-body)', fontWeight: 700 }}>
                    Period
                  </span>
                  <span className="text-center text-[0.72rem] tracking-[0.2em] uppercase text-[var(--color-champagne-light)]" style={{ fontFamily: 'var(--font-body)', fontWeight: 700 }}>
                    Rack Rate
                  </span>
                  <span className="text-center text-[0.72rem] tracking-[0.2em] uppercase text-[var(--color-champagne-light)]" style={{ fontFamily: 'var(--font-body)', fontWeight: 700 }}>
                    Nightly Rate
                  </span>
                </div>

                {/* Row 1 */}
                <div className="grid grid-cols-[1.35fr_1fr_1fr] items-center border-b border-white/10 px-6 md:px-8 py-5">
                  <span className="text-center text-xl text-[var(--color-warm-white)]" style={{ fontFamily: 'var(--font-heading)', fontWeight: 500 }}>
                    Sunday – Friday
                  </span>
                  <span className="text-center text-lg text-[var(--color-stone-dark)] line-through" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>
                    ₹10,000
                  </span>
                  <span className="text-center text-2xl" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, color: 'var(--color-gold-royal)' }}>
                    ₹8,000
                  </span>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-[1.35fr_1fr_1fr] items-center border-b border-white/10 px-6 md:px-8 py-5">
                  <span className="text-center text-xl text-[var(--color-warm-white)]" style={{ fontFamily: 'var(--font-heading)', fontWeight: 500 }}>
                    Saturday
                  </span>
                  <span className="text-center text-lg text-[var(--color-stone-dark)] line-through" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>
                    ₹15,000
                  </span>
                  <span className="text-center text-2xl" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, color: 'var(--color-gold-royal)' }}>
                    ₹12,000
                  </span>
                </div>

                {/* Footer note */}
                <div className="px-6 md:px-8 py-4 text-center" style={{ background: 'rgba(201,167,74,0.08)' }}>
                  <span className="text-sm tracking-[0.08em] text-[var(--color-stone-dark)]" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>
                    20% standard discount applied · Group discounts available for 6+ guests
                  </span>
                </div>
              </div>

              {/* CTA */}
              <motion.a
                href="#booking"
                whileHover={{ scale: 1.01 }}
                className="mt-8 block w-full max-w-3xl text-center py-5 text-[0.75rem] tracking-[0.28em] uppercase text-[var(--color-warm-white)] transition-all duration-500 hover:bg-[var(--color-burgundy-dark)]"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  background: 'var(--color-burgundy)',
                  boxShadow: '0 4px 20px rgba(142,31,31,0.35)',
                }}
              >
                Reserve Your Stay
              </motion.a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
