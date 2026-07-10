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
  'Double-Door Refrigerator',
  'Microwave Oven',
  'Water Purifier (RO)',
  'Gas Stove & Free Gas',
  'Complete Kitchen Utensils',
  'Power Backup',
  '24/7 Water Supply',
  'Free Secure Parking',
];

export default function Amenities() {
  return (
    <section id="amenities" className="bg-[var(--color-noir)]">
      {/* Header */}
      <div className="section-luxury pb-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="eyebrow mb-5">Curated Amenities</p>
            <h2 className="heading-luxury-light" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
              Everything You Need,
              <br />
              <em style={{ fontWeight: 300 }}>Nothing You Don't</em>
            </h2>
          </div>
          <p className="text-sm max-w-md text-[var(--color-ash)] leading-relaxed" style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}>
            From resort-grade pool access to a fully stocked kitchen,
            every amenity is thoughtfully integrated into the villa experience.
          </p>
        </div>
      </div>

      {/* Large Photography Grid with Hover Reveal */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {immersiveAmenities.map((amenity, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className="relative h-[50vh] md:h-[70vh] overflow-hidden group cursor-default image-reveal"
          >
            <img
              src={amenity.image}
              alt={amenity.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />

            {/* Default: subtle gradient with title */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-700 group-hover:from-black/90 group-hover:via-black/50" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
              <div className="gold-divider mb-4 transition-all duration-700 group-hover:w-16" style={{ width: '2rem' }} />
              <h3
                className="text-white text-xl md:text-2xl mb-2 transition-all duration-500"
                style={{ fontFamily: 'var(--font-heading)', fontWeight: 400 }}
              >
                {amenity.title}
              </h3>
              <p
                className="text-white/0 group-hover:text-white/70 transition-all duration-700 text-sm max-w-sm transform translate-y-4 group-hover:translate-y-0"
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
          <p className="eyebrow mb-8">Also Included</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-12 gap-y-5">
            {minimalAmenities.map((name, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="text-[var(--color-ash)] text-sm flex items-center gap-3"
                style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
              >
                <span className="w-1 h-1 bg-[var(--color-champagne)] rounded-full flex-shrink-0" />
                {name}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
