import { motion } from 'framer-motion';

const attractions = [
  {
    name: 'Ekvira Temple & Karla Caves',
    distance: '3.0 km',
    time: '10 min drive',
    description: 'Ancient rock-cut caves and the iconic Ekvira Devi temple.',
    image: '/images/community-exterior.jpeg',
  },
  {
    name: 'Wet N Joy Water Park',
    distance: '6.2 km',
    time: '12 min drive',
    description: 'India\'s largest water park with thrilling slides and a wave pool.',
    image: '/images/pool-daytime.jpeg',
  },
  {
    name: 'Scenic Mountain Trails',
    distance: '2.0 km',
    time: '5 min drive',
    description: 'Tranquil walking trails and viewpoints across Karla and Bhaja hills.',
    image: '/images/balcony-mountain-view.jpeg',
  },
  {
    name: 'Local Dining & Markets',
    distance: '1.2 km',
    time: '4 min drive',
    description: 'Authentic Maharashtrian dhabas, cafes, and chikki shops.',
    image: '/images/garden-night-lighting.jpeg',
  },
];

export default function NearbyAttractions() {
  return (
    <section id="nearby" className="section-luxury bg-[var(--color-parchment)]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="eyebrow-dark mb-5">Surroundings</p>
          <h2 className="heading-luxury" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
            What's Nearby
          </h2>
        </div>

        {/* Horizontal Image Cards */}
        <div className="flex flex-col gap-6">
          {attractions.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden cursor-default"
              style={{ border: '1px solid var(--color-stone)' }}
            >
              {/* Image */}
              <div className="md:col-span-4 h-[200px] md:h-[220px] overflow-hidden image-reveal relative">
                <img
                  src={a.image}
                  alt={a.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Distance Badge */}
                <div
                  className="absolute top-4 left-4 px-3 py-1.5 text-[0.55rem] tracking-[0.2em] uppercase"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    background: 'rgba(22,22,22,0.85)',
                    color: 'var(--color-champagne)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {a.distance}
                </div>
              </div>

              {/* Content */}
              <div className="md:col-span-8 p-8 md:p-10 flex flex-col justify-center bg-[var(--color-warm-white)] group-hover:bg-white transition-colors duration-500">
                <div className="flex items-center justify-between mb-4">
                  <h3
                    className="text-xl md:text-2xl"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 400,
                      color: 'var(--color-noir)',
                    }}
                  >
                    {a.name}
                  </h3>
                  <span
                    className="text-[0.55rem] tracking-[0.2em] uppercase text-[var(--color-ash)] hidden md:block"
                    style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
                  >
                    {a.time}
                  </span>
                </div>
                <p
                  className="text-sm text-[var(--color-ash)] leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
                >
                  {a.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
