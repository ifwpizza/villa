import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="villa" className="section-luxury bg-[var(--color-ivory)] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Editorial Eyebrow and Main Serif Headline */}
        <div className="max-w-4xl mb-24">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="eyebrow-dark mb-6"
          >
            The Sanctuary
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="heading-luxury"
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)' }}
          >
            A sanctuary where mountains meet <span className="italic text-[var(--color-gold)] font-light">luxury design</span>.
          </motion.h2>
        </div>

        {/* Asymmetrical Layout Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Main Visual Component: Large portrait view */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="lg:col-span-7 overflow-hidden rounded-[28px] shadow-2xl relative image-reveal group"
          >
            <img
              src="/images/living-room-day.jpeg"
              alt="Luxury Living Room at SaGa Montana"
              className="w-full h-[550px] lg:h-[750px] object-cover"
              loading="lazy"
            />
            {/* Absolute positioning detail overlay */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-700" />
          </motion.div>

          {/* Descriptive Content & Details */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col lg:pl-16 py-8 lg:py-16 justify-center"
          >
            <div className="gold-divider mb-10" />

            <h3
              className="text-2xl md:text-3xl font-light mb-8 text-[var(--color-charcoal)]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Curated for the Discerning
            </h3>

            <p
              className="text-sm md:text-base leading-[2] text-[var(--color-ash)] mb-8"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
            >
              Nestled near the quiet ranges of Karla, SaGa Montana is an architectural masterpiece designed to let you disconnect from the bustle and reconnect with the serene rhythm of nature. Every space, from the high-vaulted mezzanine to the sun-soaked decks, uses organic materials, custom lighting, and bespoke furnishings to create a warm luxury experience.
            </p>

            <p
              className="text-sm md:text-base leading-[2] text-[var(--color-ash)] mb-12"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
            >
              Immerse yourself in panoramic mountain views, step out into a private garden sit-out, or plunge into the hillside swimming pool. This is private luxury villa living, redefined.
            </p>

            {/* Spec grid */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[var(--color-stone)]">
              {[
                { number: '2', label: 'Beds' },
                { number: '8', label: 'Guests' },
                { number: '100%', label: 'Privacy' },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span
                    className="text-4xl text-[var(--color-gold-dark)]"
                    style={{ fontFamily: 'var(--font-heading)', fontWeight: 300 }}
                  >
                    {stat.number}
                  </span>
                  <span
                    className="text-[0.65rem] tracking-[0.2em] uppercase text-[var(--color-ash)] mt-2"
                    style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Secondary Asymmetrical offset gallery rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="overflow-hidden rounded-[28px] shadow-xl image-reveal md:mt-20"
          >
            <img
              src="/images/balcony-mountain-view.jpeg"
              alt="Scenic Mountain view balcony"
              className="w-full h-[400px] object-cover"
              loading="lazy"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15 }}
            className="overflow-hidden rounded-[28px] shadow-xl image-reveal"
          >
            <img
              src="/images/balcony-sitout.jpeg"
              alt="Private sitout balcony"
              className="w-full h-[400px] object-cover"
              loading="lazy"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
