import { motion } from 'framer-motion';

const localAttractions = [
  {
    name: 'Ekvira Temple & Karla Caves',
    distance: '3.0 km away',
    duration: '10 min drive',
    desc: 'Explore ancient rock-cut Buddhist shrines dating back to the 2nd century BC, nestled alongside the historic Ekvira Devi temple complex.',
    image: '/images/community-exterior.jpeg'
  },
  {
    name: 'Wet N Joy Water Park',
    distance: '6.2 km away',
    duration: '12 min drive',
    desc: 'Perfect family day out. Host to India\'s largest wave pools, high-velocity slides, and modern amusement attractions.',
    image: '/images/pool-daytime.jpeg'
  },
  {
    name: 'Scenic Mountain Trails',
    distance: '2.0 km away',
    duration: '5 min drive',
    desc: 'Unmatched trekking routes and sunset viewpoints across Karla and Bhaja ranges, especially vibrant during the monsoon mist.',
    image: '/images/balcony-mountain-view.jpeg'
  },
  {
    name: 'Local Dining & Markets',
    distance: '1.2 km away',
    duration: '4 min drive',
    desc: 'Enjoy authentic Maharashtrian dhabas, local organic farm produce, and the world-famous Lonavala chikki stores.',
    image: '/images/garden-night-lighting.jpeg'
  }
];

export default function NearbyAttractions() {
  return (
    <section id="nearby" className="section-luxury bg-[var(--color-ivory)]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-24">
          <p className="eyebrow-dark mb-4">Surroundings</p>
          <h2 className="heading-luxury text-3xl md:text-5xl font-light">
            Nearby Attractions
          </h2>
        </div>

        {/* Attractions Grid - Horizontal Editorial Cards */}
        <div className="flex flex-col gap-10">
          {localAttractions.map((attraction, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: idx * 0.08 }}
              className="luxury-card group grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden cursor-default"
            >
              
              {/* Left Column: Visual container (4 cols) */}
              <div className="md:col-span-4 h-[220px] md:h-[260px] overflow-hidden image-reveal relative">
                <img
                  src={attraction.image}
                  alt={attraction.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                
                {/* Distance Badge */}
                <div
                  className="absolute top-5 left-5 px-4 py-2 text-[0.6rem] tracking-[0.2em] uppercase font-semibold text-[var(--color-gold)] bg-[var(--color-charcoal)]/85 backdrop-filter backdrop-blur-md rounded-full"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {attraction.distance}
                </div>
              </div>

              {/* Right Column: Copy container (8 cols) */}
              <div className="md:col-span-8 p-8 md:p-12 flex flex-col justify-center bg-[var(--color-warm-white)] group-hover:bg-white transition-colors duration-500">
                <div className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
                  <h3
                    className="text-xl md:text-2.5xl font-normal text-[var(--color-charcoal)]"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {attraction.name}
                  </h3>
                  
                  {/* Duration Badge */}
                  <span
                    className="text-[0.6rem] tracking-[0.2em] uppercase text-[var(--color-gold-dark)] font-semibold"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {attraction.duration}
                  </span>
                </div>
                
                <p
                  className="text-sm text-[var(--color-ash)] leading-relaxed font-light"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {attraction.desc}
                </p>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
