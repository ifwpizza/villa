import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section id="contact" className="relative bg-[var(--color-charcoal)] text-[var(--color-warm-white)] py-24 md:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url('/images/community-exterior.jpeg')` }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-charcoal)] via-black/80 to-[var(--color-charcoal)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Contact Copy (5 cols) */}
          <div className="lg:col-span-5 flex flex-col pt-4">
            <p className="eyebrow mb-4">CONNECT</p>
            <h2 className="heading-luxury-light text-3xl md:text-5xl font-light mb-8">
              Stay in Touch
            </h2>
            <div className="gold-divider mb-10" />

            <div className="flex flex-col gap-10">
              <div>
                <h4 className="text-[0.6rem] tracking-[0.25em] uppercase text-[var(--color-gold)] mb-3" style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}>
                  Estate Address
                </h4>
                <p className="text-sm text-white/70 leading-relaxed font-light" style={{ fontFamily: 'var(--font-body)' }}>
                  SaGa Montana, Yash Villas A1/2,<br />
                  Dahivali, Near Ekvira Devi Temple, Karla,<br />
                  Lonavala, Maharashtra 410405
                </p>
              </div>

              <div>
                <h4 className="text-[0.6rem] tracking-[0.25em] uppercase text-[var(--color-gold)] mb-3" style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}>
                  Immediate Inquiries
                </h4>
                <p className="text-xl font-light text-[var(--color-warm-white)] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                  +91 85919 94866
                </p>
                <p className="text-sm text-white/50 font-light" style={{ fontFamily: 'var(--font-body)' }}>
                  sagamontana8@gmail.com
                </p>
              </div>

              <div>
                <h4 className="text-[0.6rem] tracking-[0.25em] uppercase text-[var(--color-gold)] mb-3" style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}>
                  Concierge Availability
                </h4>
                <p className="text-sm text-white/60 font-light" style={{ fontFamily: 'var(--font-body)' }}>
                  Active booking assistance available 24/7.
                </p>
              </div>
            </div>

            {/* Premium action buttons */}
            <div className="flex gap-4 mt-12">
              <a
                href="https://wa.me/918591994866"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 text-[0.65rem] tracking-[0.3em] uppercase text-white rounded-full hover:opacity-90 transition-opacity font-semibold shadow-lg hover:shadow-emerald-950/20"
                style={{
                  fontFamily: 'var(--font-body)',
                  backgroundColor: '#25D366',
                }}
              >
                WhatsApp Concierge
              </a>
              <a
                href="tel:+918591994866"
                className="px-10 py-4 text-[0.65rem] tracking-[0.3em] uppercase transition-all duration-500 rounded-full hover:bg-[var(--color-gold)] hover:text-[var(--color-charcoal)] text-[var(--color-gold)] border border-[var(--color-gold)] font-semibold"
                style={{
                  fontFamily: 'var(--font-body)',
                }}
              >
                Direct Call
              </a>
            </div>
          </div>

          {/* Interactive Google Map Frame (7 cols) */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="w-full h-[400px] md:h-[550px] overflow-hidden rounded-[28px] shadow-2xl relative"
              style={{ border: '1px solid rgba(255,255,255,0.05)' }}
            >
              {/* Google Maps Iframe */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3779.6277150965315!2d73.4549233!3d18.7297926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be801b764c676d1%3A0xe5a3c004c8fbf4cd!2sKarla%20Caves!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SaGa Montana Map Location"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
