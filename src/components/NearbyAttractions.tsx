import { motion } from 'framer-motion';

const attractions = [
  {
    name: 'ATV Adventures',
    distance: 'Nearby',
    time: 'A short drive away',
    description: 'Enjoy exciting ATV and buggy rides for an off-road adventure.',
    image: '/images/nearby-atv.png',
  },
  {
    name: 'Ekvira Temple',
    distance: 'Nearby',
    time: 'A short drive away',
    description: 'Visit the revered Ekvira Devi temple beside the historic Karla Caves.',
    image: '/images/nearby-ekvira-temple.png',
  },
  {
    name: 'Wet n Joy',
    distance: 'Nearby',
    time: 'A short drive away',
    description: 'Make a day of it at the water park with slides, pools, and family fun.',
    image: '/images/nearby-wet-n-joy.png',
  },
  {
    name: 'Mr Bean Trampoline Park',
    distance: 'Nearby',
    time: 'A short drive away',
    description: 'A lively trampoline park where children and adults can jump, play, and explore.',
    image: '/images/nearby-mr-bean.jpg',
  },
  {
    name: 'Lonavla Wax Museum',
    distance: 'Nearby',
    time: 'A short drive away',
    description: 'Discover lifelike wax figures and family-friendly displays at the Lonavala Wax Museum.',
    image: '/images/nearby-lonavla-wax-museum.png',
  },
];

export default function NearbyAttractions() {
  return (
    <section id="nearby" className="section-luxury bg-parchment-gold">
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
              className="royal-card group grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden cursor-default"
            >
              {/* Image */}
              <div className="md:col-span-4 h-[200px] md:h-[220px] overflow-hidden image-reveal relative">
                <img
                  src={a.image}
                  alt={a.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

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
