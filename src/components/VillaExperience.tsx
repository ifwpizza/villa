import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const spacePhotos = [
  { src: '/images/second-bedroom.jpeg', title: 'The Master Suite', desc: 'Curated organic textures, premium bed linen, and wide glass doors opening to mountain views.' },
  { src: '/images/mezzanine-bedroom.jpeg', title: 'The Mezzanine Loft', desc: 'An intimate architectural loft space perfect for extra guests or late night stories.' },
  { src: '/images/kitchen-full.jpeg', title: 'The Designer Kitchen', desc: 'Completely equipped with premium cookware, RO purifier, double-door fridge, and ready-to-use gas stove.' },
  { src: '/images/entrance-hallway.jpeg', title: 'The Entrance Foyer', desc: 'A grand welcoming hallway utilizing indirect warm lighting and raw wood highlights.' },
  { src: '/images/living-room-night.jpeg', title: 'The Lounge at Dusk', desc: 'Plush custom seating looking out onto the lights of Karla.' },
];

const houseRules = [
  { title: 'Tranquil Environment', desc: 'Respect the peaceful local community. Sound levels should remain indoor-focused after 10 PM.' },
  { title: 'Maximum Occupancy', desc: 'Designed to host up to 8 guests. Prior registration is required for security protocols.' },
  { title: 'Pet Policy', desc: 'To preserve the bespoke furniture and layout, pets are not allowed inside the villa premises.' },
  { title: 'Strict Cleaning Code', desc: 'We request guests to treat this designer space with respect. Charges may apply for deep staining.' },
];

export default function VillaExperience() {
  const [activeSpace, setActiveSpace] = useState(0);

  return (
    <section id="villa-experience" className="bg-[var(--color-charcoal)] text-[var(--color-warm-white)]">
      
      {/* ── Immersive Carousel Space ── */}
      <div className="relative h-[80vh] md:h-[90vh] overflow-hidden flex flex-col justify-end">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSpace}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${spacePhotos[activeSpace].src}')` }}
          />
        </AnimatePresence>

        {/* Ambient Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)] via-black/30 to-black/50" />

        {/* Info panel */}
        <div className="relative z-10 p-8 md:p-16 lg:p-24 max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-xl">
              <p className="eyebrow mb-4 text-[var(--color-gold)]">The Spaces</p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSpace}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="heading-luxury-light text-3xl md:text-5xl mb-4 font-light">
                    {spacePhotos[activeSpace].title}
                  </h3>
                  <p className="text-white/60 text-sm md:text-base leading-relaxed font-light" style={{ fontFamily: 'var(--font-body)' }}>
                    {spacePhotos[activeSpace].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Selector Buttons */}
            <div className="flex flex-wrap gap-2 md:gap-3">
              {spacePhotos.map((photo, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSpace(i)}
                  className={`px-4 py-2.5 text-[0.6rem] tracking-[0.25em] uppercase border transition-all duration-500 rounded-full font-medium ${
                    activeSpace === i
                      ? 'border-[var(--color-gold)] text-[var(--color-gold)] bg-[var(--color-gold-muted)]'
                      : 'border-white/10 text-white/55 hover:border-white/30 hover:text-white'
                  }`}
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {photo.title.split(' ')[1] || photo.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Pricing & Rates (Spacious & Clean Layout) ── */}
      <div className="section-luxury">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Spec list */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <p className="eyebrow mb-4">Timeless Tariff</p>
              <h3 className="heading-luxury-light text-3xl md:text-4xl mb-6 font-light">
                Rates & Policies
              </h3>
              <p className="text-white/50 text-sm font-light leading-relaxed mb-10" style={{ fontFamily: 'var(--font-body)' }}>
                Rent the entire estate. Prices include absolute private access to the 2BHK villa, pool access, curated kitchen facilities, and round-the-clock backup services.
              </p>

              <div className="flex flex-col gap-6">
                {[
                  ['Villa Configuration', '2 BHK Luxury Private Villa'],
                  ['Occupancy Guidelines', '5 to 8 Guests comfortably'],
                  ['Ideal getaway for', 'Families, couples, small retreats'],
                  ['Location details', 'Dahivali, Karla near Ekvira temple'],
                ].map(([label, value], i) => (
                  <div key={i} className="flex flex-col pb-4 border-b border-white/5">
                    <span className="text-[0.6rem] tracking-[0.25em] uppercase text-[var(--color-gold)] mb-1" style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}>
                      {label}
                    </span>
                    <span className="text-sm font-light text-white/80" style={{ fontFamily: 'var(--font-body)' }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing list */}
            <div className="lg:col-span-7 lg:pl-12">
              <div className="border border-white/8 rounded-[28px] overflow-hidden bg-white/3">
                {/* Table Header */}
                <div className="flex justify-between items-center px-8 py-6 border-b border-white/8 bg-white/5">
                  <span className="text-[0.65rem] tracking-[0.3em] uppercase text-[var(--color-gold)] font-semibold" style={{ fontFamily: 'var(--font-body)' }}>
                    DAY OF WEEK
                  </span>
                  <span className="text-[0.65rem] tracking-[0.3em] uppercase text-[var(--color-gold)] font-semibold text-right" style={{ fontFamily: 'var(--font-body)' }}>
                    NIGHTLY RATE
                  </span>
                </div>

                {/* Sun-Fri Row */}
                <div className="flex justify-between items-center px-8 py-8 border-b border-white/5 hover:bg-white/1 transition-all duration-300">
                  <div>
                    <h4 className="text-lg font-light mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                      Sunday – Friday
                    </h4>
                    <p className="text-[0.65rem] tracking-[0.1em] text-white/40 uppercase" style={{ fontFamily: 'var(--font-body)' }}>
                      Weekday Escape Rate
                    </p>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-xs text-white/30 line-through" style={{ fontFamily: 'var(--font-body)' }}>₹10,000</span>
                    <span className="text-2xl text-[var(--color-gold)] font-light" style={{ fontFamily: 'var(--font-heading)' }}>₹8,000</span>
                  </div>
                </div>

                {/* Sat Row */}
                <div className="flex justify-between items-center px-8 py-8 border-b border-white/5 hover:bg-white/1 transition-all duration-300">
                  <div>
                    <h4 className="text-lg font-light mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                      Saturday
                    </h4>
                    <p className="text-[0.65rem] tracking-[0.1em] text-white/40 uppercase" style={{ fontFamily: 'var(--font-body)' }}>
                      Weekend Premium Rate
                    </p>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-xs text-white/30 line-through" style={{ fontFamily: 'var(--font-body)' }}>₹15,000</span>
                    <span className="text-2xl text-[var(--color-gold)] font-light" style={{ fontFamily: 'var(--font-heading)' }}>₹12,000</span>
                  </div>
                </div>

                {/* Bottom discount policy info */}
                <div className="px-8 py-6 bg-white/2">
                  <p className="text-xs text-white/50 leading-relaxed font-light" style={{ fontFamily: 'var(--font-body)' }}>
                    * We offer up to 20% discount depending on booking size (automatically applied during reservation details). Extra discounts available for stays longer than 3 nights.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Timeline & Logistics (Vertical Editorial) ── */}
      <div className="section-luxury pt-0">
        <div className="max-w-7xl mx-auto">
          <div className="gold-divider-wide mb-16" />
          
          <div className="text-center mb-16">
            <p className="eyebrow mb-4">Stay Timeline</p>
            <h3 className="heading-luxury-light text-3xl md:text-4xl font-light">
              Logistics & Hours
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { time: '12:00 PM', title: 'Grand Check-in', desc: 'Step into a clean, air-conditioned villa. Keys are handed over alongside a quick walk-through of the amenities.' },
              { time: '04:00 PM', title: 'High Tea & Housekeeping', desc: 'Our housekeeping staff is available to spruce up the rooms, change linens, or assist in setting up cooking amenities.' },
              { time: '11:00 AM', title: 'Check-out & Farewell', desc: 'A warm check-out process. Property verification occurs, leaving you with sweet memories of the valley.' },
            ].map((step, idx) => (
              <div key={idx} className="relative p-8 border border-white/5 bg-white/3 rounded-[28px] flex flex-col hover:border-[var(--color-gold)] transition-colors duration-500">
                <span className="text-3xl text-[var(--color-gold)] font-light mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                  {step.time}
                </span>
                <h4 className="text-lg font-normal mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                  {step.title}
                </h4>
                <p className="text-white/50 text-xs leading-relaxed font-light" style={{ fontFamily: 'var(--font-body)' }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── House Rules Section (Luxury Cards) ── */}
      <div className="section-luxury pt-0">
        <div className="max-w-7xl mx-auto">
          <div className="gold-divider-wide mb-16" />

          <div className="mb-16">
            <p className="eyebrow mb-4">Rules & Etiquette</p>
            <h3 className="heading-luxury-light text-3xl md:text-4xl font-light">
              Villa Guidelines
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {houseRules.map((rule, idx) => (
              <div
                key={idx}
                className="p-8 border border-white/5 bg-white/2 rounded-[28px] transition-all duration-500 hover:-translate-y-2 hover:border-[var(--color-gold)]/30"
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[var(--color-gold-muted)] text-[var(--color-gold)] mb-6 text-xs font-semibold" style={{ fontFamily: 'var(--font-body)' }}>
                  0{idx + 1}
                </div>
                <h4 className="text-lg font-normal mb-3 text-[var(--color-warm-white)]" style={{ fontFamily: 'var(--font-heading)' }}>
                  {rule.title}
                </h4>
                <p className="text-white/45 text-xs leading-relaxed font-light" style={{ fontFamily: 'var(--font-body)' }}>
                  {rule.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
