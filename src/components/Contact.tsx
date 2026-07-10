import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section id="contact" className="section-luxury bg-[var(--color-parchment)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Contact Details */}
          <div className="lg:col-span-5 flex flex-col pt-4">
            <p className="eyebrow-dark mb-5">Get in Touch</p>
            <h2 className="heading-luxury mb-10" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              Contact Us
            </h2>
            <div className="gold-divider mb-10" />

            <div className="flex flex-col gap-10">
              <div>
                <h4 className="text-[0.55rem] tracking-[0.25em] uppercase text-[var(--color-ash)] mb-3" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>
                  Location
                </h4>
                <p className="text-sm text-[var(--color-noir-light)] leading-relaxed" style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}>
                  SaGa Montana, Yash Villas A1/2,<br />
                  Dahivali, Near Ekvira Temple, Karla,<br />
                  Lonavala, Maharashtra 410405
                </p>
              </div>

              <div>
                <h4 className="text-[0.55rem] tracking-[0.25em] uppercase text-[var(--color-ash)] mb-3" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>
                  Reservations & Inquiries
                </h4>
                <p className="text-lg text-[var(--color-noir)] mb-1" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400 }}>
                  +91 85919 94866
                </p>
                <p className="text-sm text-[var(--color-noir-light)]" style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}>
                  sagamontana8@gmail.com
                </p>
              </div>

              <div>
                <h4 className="text-[0.55rem] tracking-[0.25em] uppercase text-[var(--color-ash)] mb-3" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>
                  Availability
                </h4>
                <p className="text-sm text-[var(--color-noir-light)]" style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}>
                  Open 24/7 for booking assistance
                </p>
              </div>
            </div>

            <div className="flex gap-4 mt-12">
              <a
                href="https://wa.me/918591994866"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 text-[0.65rem] tracking-[0.3em] uppercase text-white hover:text-[var(--color-noir)] transition-colors duration-500"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  backgroundColor: '#25D366',
                }}
              >
                WhatsApp
              </a>
              <a
                href="tel:+918591994866"
                className="px-8 py-3 text-[0.65rem] tracking-[0.3em] uppercase transition-all duration-500 hover:bg-[var(--color-noir)] hover:text-white"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  border: '1px solid var(--color-noir)',
                  color: 'var(--color-noir)',
                }}
              >
                Call
              </a>
            </div>
          </div>

          {/* Map / Image */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="w-full h-[400px] md:h-[600px] overflow-hidden"
              style={{ border: '1px solid var(--color-stone)' }}
            >
              <img
                src="/images/community-exterior.jpeg"
                alt="SaGa Montana Exterior"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
