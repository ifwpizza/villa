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
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 z-10">
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
                      ? 'ring-1 ring-[var(--color-champagne)] opacity-100'
                      : 'opacity-40 hover:opacity-70'
                  }`}
                >
                  <img src={img.src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Details Section — dark background */}
      <div className="section-luxury">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            {/* Left: Villa Details */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span
                  className="text-[0.6rem] tracking-[0.3em] uppercase text-emerald-400"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
                >
                  Available for Bookings
                </span>
              </div>

              <h3
                className="heading-luxury-light mb-3"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
              >
                SaGa Montana
              </h3>

              <p
                className="text-[0.7rem] tracking-[0.15em] text-[var(--color-ash)] mb-10"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Yash Villas, Dahivali · Near Ekvira Temple · Karla, Lonavala
              </p>

              {/* Minimal spec list */}
              <div className="flex flex-col gap-6 mb-10">
                {[
                  ['Configuration', '2 BHK Villa'],
                  ['Occupancy', 'Up to 8 Guests'],
                  ['Check-in', '12:00 PM'],
                  ['Check-out', '11:00 AM'],
                ].map(([label, value], i) => (
                  <div key={i} className="flex justify-between items-baseline border-b border-white/5 pb-4">
                    <span className="text-[0.6rem] tracking-[0.25em] uppercase text-[var(--color-ash-light)]" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>
                      {label}
                    </span>
                    <span className="text-sm text-[var(--color-warm-white)]" style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              {/* House Rules — minimal */}
              <div>
                <p className="text-[0.6rem] tracking-[0.25em] uppercase text-[var(--color-ash-light)] mb-4" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>
                  House Rules
                </p>
                <div className="grid grid-cols-2 gap-3 text-[0.7rem] text-[var(--color-ash)]" style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}>
                  <span>· No Pets Allowed</span>
                  <span>· No Illegal Activities</span>
                  <span>· Respect the Property</span>
                  <span>· Maintain Cleanliness</span>
                </div>
              </div>
            </div>

            {/* Right: Elegant Pricing Table */}
            <div className="lg:col-span-7 lg:pl-16">
              <p className="eyebrow mb-8">Tariff</p>

              {/* Pricing Table */}
              <div className="border border-white/8">
                {/* Header */}
                <div className="flex border-b border-white/8 px-8 py-5" style={{ background: 'rgba(201,167,74,0.05)' }}>
                  <span className="flex-1 text-[0.6rem] tracking-[0.25em] uppercase text-[var(--color-champagne)]" style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}>
                    Period
                  </span>
                  <span className="w-32 text-right text-[0.6rem] tracking-[0.25em] uppercase text-[var(--color-champagne)]" style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}>
                    Rack Rate
                  </span>
                  <span className="w-40 text-right text-[0.6rem] tracking-[0.25em] uppercase text-[var(--color-champagne)]" style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}>
                    Nightly Rate
                  </span>
                </div>

                {/* Row 1 */}
                <div className="flex items-baseline border-b border-white/5 px-8 py-6">
                  <span className="flex-1 text-sm text-[var(--color-warm-white)]" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400 }}>
                    Sunday – Friday
                  </span>
                  <span className="w-32 text-right text-sm text-[var(--color-ash)] line-through" style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}>
                    ₹10,000
                  </span>
                  <span className="w-40 text-right text-xl text-[var(--color-champagne)]" style={{ fontFamily: 'var(--font-heading)', fontWeight: 500 }}>
                    ₹8,000
                  </span>
                </div>

                {/* Row 2 */}
                <div className="flex items-baseline border-b border-white/5 px-8 py-6">
                  <span className="flex-1 text-sm text-[var(--color-warm-white)]" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400 }}>
                    Saturday
                  </span>
                  <span className="w-32 text-right text-sm text-[var(--color-ash)] line-through" style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}>
                    ₹15,000
                  </span>
                  <span className="w-40 text-right text-xl text-[var(--color-champagne)]" style={{ fontFamily: 'var(--font-heading)', fontWeight: 500 }}>
                    ₹12,000
                  </span>
                </div>

                {/* Footer note */}
                <div className="px-8 py-4" style={{ background: 'rgba(201,167,74,0.03)' }}>
                  <span className="text-[0.6rem] tracking-[0.15em] text-[var(--color-ash)]" style={{ fontFamily: 'var(--font-body)' }}>
                    20% standard discount applied · Group discounts available for 6+ guests
                  </span>
                </div>
              </div>

              {/* CTA */}
              <motion.a
                href="#booking"
                whileHover={{ scale: 1.01 }}
                className="mt-10 block w-full text-center py-5 text-[0.65rem] tracking-[0.35em] uppercase bg-[var(--color-burgundy)] hover:bg-[var(--color-burgundy-dark)] text-[var(--color-warm-white)] transition-colors duration-500"
                style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}
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
