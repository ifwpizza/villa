import { motion } from 'framer-motion';

const immersiveAmenities = [
  {
    image: '/images/pool-daytime.jpeg',
    title: 'Shared Swimming Pool',
    subtitle: 'Refresh in the hillside infinity-edge pool with panoramic mountain vistas.',
  },
  {
    image: '/images/lawn-pool-mountain.jpeg',
    title: 'Manicured Lawn & Garden',
    subtitle: 'Expansive green spaces for yoga, family games, or sunset cocktails.',
  },
  {
    image: '/images/balcony-sitout.jpeg',
    title: 'Private Balcony Retreat',
    subtitle: 'Your personal outdoor lounge with artificial turf and mountain-facing seating.',
  },
  {
    image: '/images/kitchen-full.jpeg',
    title: 'Fully Equipped Kitchen',
    subtitle: 'Premium appliances, utensils, gas, and RO purifier — ready for home cooking.',
  },
];

const minimalAmenities = [
  'Air Conditioning',
  'High-Speed WiFi',
  'BBQ Setup',
  'Premium Sound System',
  'Fridge',
  'Microwave Oven',
  'Water Purifier',
  'Gas Stove & Free Gas',
  'Kitchen Utensils',
  'Power Backup',
  '24/7 Water Supply',
  'Have Parking Area',
];

export default function Amenities() {
  return (
    <section id="amenities" className="section-royal-dark">
      {/* Header */}
      <div className="section-luxury pb-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-16">
          <div>
            <p className="eyebrow mb-5">Curated Amenities</p>
            <h2 className="heading-luxury-light" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
              Everything You Need,
              <br />
              <em style={{
                fontWeight: 300,
                background: 'linear-gradient(135deg, #A8893A 0%, #D4AF37 40%, #F5E6A3 60%, #C9A74A 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Nothing You Don't</em>
            </h2>
          </div>
          <p className="text-sm max-w-md text-[var(--color-ash)] leading-relaxed" style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}>
            From resort-grade pool access to a fully stocked kitchen,
            every amenity is thoughtfully integrated into the villa experience.
          </p>
        </div>
      </div>

      {/* Gold divider before grid */}
      <div className="max-w-7xl mx-auto px-[clamp(1.5rem,5vw,4rem)]">
        <div className="gold-divider-wide mb-0" />
      </div>

      {/* Large Photography Grid with Hover Reveal */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-[clamp(1.5rem,5vw,4rem)] md:max-w-none md:grid-cols-2 md:gap-0 md:px-0">
        {immersiveAmenities.map((amenity, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] group cursor-default image-reveal md:h-[70vh] md:aspect-auto md:rounded-none"
          >
            <img
              src={amenity.image}
              alt={amenity.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />

            {/* Default: subtle gradient with title */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-all duration-700 group-hover:from-black/92 group-hover:via-black/50" />

            {/* Gold corner accent on hover */}
            <div className="absolute top-0 left-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
              borderTop: '1px solid rgba(212,175,55,0.6)',
              borderLeft: '1px solid rgba(212,175,55,0.6)',
            }} />
            <div className="absolute bottom-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
              borderBottom: '1px solid rgba(212,175,55,0.6)',
              borderRight: '1px solid rgba(212,175,55,0.6)',
            }} />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
              <div
                className="mb-4 transition-all duration-700 group-hover:w-16"
                style={{
                  width: '2rem',
                  height: '1px',
                  background: 'linear-gradient(90deg, var(--color-champagne-dark), var(--color-gold-royal))',
                  boxShadow: '0 0 8px rgba(212,175,55,0.5)',
                }}
              />
              <h3
                className="text-white text-2xl md:text-2xl mb-2 transition-all duration-500"
                style={{ fontFamily: 'var(--font-heading)', fontWeight: 400 }}
              >
                {amenity.title}
              </h3>
              <p
                className="text-white/75 md:text-white/0 group-hover:text-white/70 transition-all duration-700 text-sm max-w-sm md:translate-y-4 md:group-hover:translate-y-0"
                style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
              >
                {amenity.subtitle}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Minimal Text List */}
      <div className="section-luxury">
        <div className="max-w-7xl mx-auto">
          <div className="gold-divider-wide mb-12" />
          <p className="eyebrow mb-10">Also Included</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-12 gap-y-6">
            {minimalAmenities.map((name, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="text-[var(--color-ash)] text-sm flex items-center gap-3 group"
                style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
              >
                <span
                  className="w-1.5 h-1.5 flex-shrink-0 rounded-full transition-all duration-300 group-hover:scale-125"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-champagne-dark), var(--color-gold-royal))',
                    boxShadow: '0 0 6px rgba(212,175,55,0.5)',
                  }}
                />
                <span className="group-hover:text-[var(--color-ash-light)] transition-colors duration-300">{name}</span>
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
