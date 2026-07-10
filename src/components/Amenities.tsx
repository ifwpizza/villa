import { motion } from 'framer-motion';

const featureAmenities = [
  {
    image: '/images/pool-daytime.jpeg',
    tag: 'HILLSIDE OASIS',
    title: 'Shared Infinity-Edge Pool',
    desc: 'Bask in clean, turquoise waters looking directly onto the valleys of Karla. The outdoor pool deck is styled with custom loungers, offering the perfect spot for morning swims or golden hour reflections.',
    details: ['Panoramic Valley View', 'Regular Maintenance', 'Poolside Deck Chairs']
  },
  {
    image: '/images/balcony-sitout.jpeg',
    tag: 'PRIVATE RETREAT',
    title: 'Private Turf Balcony Deck',
    desc: 'An outdoor living space featuring premium artificial turf and comfortable outdoor seating. Steps away from the master bedroom, it offers a tranquil corner to enjoy fresh mountain breezes over your morning espresso.',
    details: ['Premium Seating', 'All-Weather Flooring', 'Direct Bedroom Access']
  },
  {
    image: '/images/kitchen-full.jpeg',
    tag: 'EPICUREAN DELIGHT',
    title: 'Fully Appointed Chef’s Kitchen',
    desc: 'Equipped to meet all culinary desires. Features a premium double-door refrigerator, modern microwave oven, direct gas stove, complete set of cooking utensils, and a high-grade RO water purification system.',
    details: ['Complete Utensils & Gas', 'RO Water Purifier', 'Double-Door Refrigerator']
  },
  {
    image: '/images/lawn-pool-mountain.jpeg',
    tag: 'OUTDOOR GRANDEUR',
    title: 'Expansive Gardens & Lawns',
    desc: 'Surrounding the villa is a manicured lawns ideal for casual yoga sessions, children playing, or hosting family BBQ dinners under a canopy of stars.',
    details: ['Barbecue grill setup', 'Night ambient lighting', 'Secure kids area']
  }
];

const generalAmenities = [
  'High-Speed WiFi', 'Bespoke Air Conditioning', 'Robust Power Backup', 'Secure Free Parking',
  'Flat-Screen TVs', 'Premium Soundbar', '24/7 Water Supply', 'Fine Bed Linens',
  'Bathroom Toiletries', 'Iron & Board', 'Wardrobe Storage', 'First Aid Kit'
];

export default function Amenities() {
  return (
    <section id="amenities" className="bg-[var(--color-charcoal)] text-[var(--color-warm-white)]">
      
      {/* Editorial Header */}
      <div className="section-luxury pb-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-24">
          <div>
            <p className="eyebrow mb-4">Curated Comfort</p>
            <h2 className="heading-luxury-light text-3xl md:text-5xl font-light">
              Bespoke Amenities
            </h2>
          </div>
          <p className="text-sm max-w-md text-white/55 font-light leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            Every touchpoint is designed with a boutique resort aesthetic in mind, balancing private luxury villa comforts with state-of-the-art facilities.
          </p>
        </div>
      </div>

      {/* Alternating Feature Blocks (Apple-Style Editorial Layout) */}
      <div className="flex flex-col">
        {featureAmenities.map((feature, i) => {
          const isEven = i % 2 === 0;
          return (
            <div
              key={i}
              className="py-16 md:py-24 border-b border-white/5"
            >
              <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center`}>
                  
                  {/* Visual container */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className={`lg:col-span-6 overflow-hidden rounded-[28px] shadow-2xl relative image-reveal ${
                      !isEven ? 'lg:order-2' : ''
                    }`}
                  >
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-[320px] md:h-[480px] object-cover"
                      loading="lazy"
                    />
                  </motion.div>

                  {/* Copy container */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    className={`lg:col-span-6 flex flex-col justify-center ${
                      !isEven ? 'lg:order-1' : ''
                    }`}
                  >
                    <span className="text-[0.65rem] tracking-[0.35em] uppercase text-[var(--color-gold)] font-semibold mb-4" style={{ fontFamily: 'var(--font-body)' }}>
                      {feature.tag}
                    </span>
                    <h3 className="heading-luxury-light text-2xl md:text-4.5xl mb-6 font-light">
                      {feature.title}
                    </h3>
                    <p className="text-white/60 text-sm md:text-base leading-relaxed font-light mb-8" style={{ fontFamily: 'var(--font-body)' }}>
                      {feature.desc}
                    </p>

                    {/* Features checklist */}
                    <div className="flex flex-col gap-3">
                      {feature.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
                          <span className="text-xs text-white/75 font-light" style={{ fontFamily: 'var(--font-body)' }}>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* General Minimal Dot List */}
      <div className="section-luxury">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="eyebrow mb-4">Included Conveniences</p>
            <h3 className="heading-luxury-light text-2xl md:text-3.5xl font-light">
              Additional Luxuries
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {generalAmenities.map((amenity, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (idx % 4) * 0.05 }}
                className="flex items-center gap-4 py-4 px-6 border border-white/5 bg-white/2 rounded-full"
              >
                <div className="w-2 h-2 rounded-full bg-[var(--color-gold)] flex-shrink-0" />
                <span className="text-white/70 text-xs md:text-sm font-light" style={{ fontFamily: 'var(--font-body)' }}>
                  {amenity}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
