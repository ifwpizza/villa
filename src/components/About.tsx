import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="villa" className="section-luxury bg-parchment-gold overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Top: Eyebrow + Heading — editorial style */}
        <div className="max-w-3xl mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="eyebrow-dark mb-6"
          >
            The Retreat
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="heading-luxury"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          >
            A sanctuary of stillness.
          </motion.h2>
        </div>

        {/* Asymmetric Grid: Large image + text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-start">
          {/* Large Image — spans 7 cols */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-7 overflow-hidden image-reveal"
          >
            <img
              src="/images/mountain-panorama.jpeg"
              alt="Misty mountain panorama near SaGa Montana"
              className="w-full h-[50vh] lg:h-[70vh] object-cover"
              loading="lazy"
            />
          </motion.div>

          {/* Text Panel — spans 5 cols */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col justify-center lg:pl-12 lg:pr-4 py-8 lg:py-16"
          >
            <div className="gold-divider mb-8" style={{ boxShadow: '0 0 10px rgba(212,175,55,0.4)', width: '4rem' }} />

            <p
              className="text-sm md:text-base leading-[1.9] text-[var(--color-ash)] mb-8"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
            >
              Tucked away in the serene hills of Karla, near the ancient
              Ekvira Temple, SaGa Montana offers the ultimate combination
              of designer interiors and natural beauty. Every detail,
              from the curated furnishings to the panoramic mountain
              views, has been crafted for those who appreciate the art
              of living well.
            </p>

            <p
              className="text-sm md:text-base leading-[1.9] text-[var(--color-ash)] mb-10"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
            >
              This boutique villa serves as a perfect escape for families
              and friends seeking space and a breath of fresh mountain
              air, just hours from Mumbai and Pune. Pune is easily
              accessible and well connected by road, railway, and public
              transport.
            </p>

            {/* Minimal Stats */}
            <div className="flex gap-12">
              {[
                { num: '2', label: 'Bedrooms' },
                { num: '8', label: 'Max Guests' },
                { num: '∞', label: 'Views' },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span
                    className="text-3xl md:text-4xl mb-1 gold-shimmer-text"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 300,
                    }}
                  >
                    {stat.num}
                  </span>
                  <span
                    className="text-[0.6rem] tracking-[0.3em] uppercase"
                    style={{
                      fontFamily: 'var(--font-body)',
                      color: 'var(--color-ash-light)',
                      fontWeight: 500,
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Secondary row follows the same 7 / 5-column split as the row above. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 mt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="overflow-hidden image-reveal lg:col-span-7"
          >
            <img
              src="/images/balcony-mountain-view.jpeg"
              alt="Mountain View from Balcony"
              className="w-full h-[35vh] md:h-[45vh] object-cover"
              loading="lazy"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="overflow-hidden image-reveal lg:col-span-5"
          >
            <img
              src="/images/balcony-sitout.jpeg"
              alt="Private Balcony Sitout"
              className="w-full h-[35vh] md:h-[45vh] object-cover"
              loading="lazy"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
