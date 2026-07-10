export default function Footer() {
  const currentYear = new Date().getFullYear();

  const instaImages = [
    '/images/pool-daytime.jpeg',
    '/images/living-room-night.jpeg',
    '/images/balcony-mountain-view.jpeg',
    '/images/bedroom-tv-curtains.jpeg',
  ];

  return (
    <footer className="bg-[var(--color-charcoal)] text-[var(--color-warm-white)] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Instagram Grid Section */}
        <div className="mb-24">
          <div className="flex justify-between items-end mb-8">
            <div className="flex flex-col">
              <span className="text-[0.6rem] tracking-[0.35em] uppercase text-[var(--color-gold)] font-semibold mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                VISUAL DIARY
              </span>
              <h4 className="text-xl md:text-2xl font-light text-[var(--color-warm-white)]" style={{ fontFamily: 'var(--font-heading)' }}>
                @sagamontana
              </h4>
            </div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.65rem] tracking-[0.2em] uppercase text-[var(--color-ash)] hover:text-white transition-colors duration-300 font-semibold"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Follow Feed
            </a>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {instaImages.map((src, i) => (
              <a
                key={i}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden rounded-[20px] group aspect-square shadow-lg"
              >
                <img
                  src={src}
                  alt="Instagram preview"
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-70 group-hover:opacity-100"
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Large Cinematic Title */}
        <div className="flex flex-col items-center text-center mb-20">
          <a href="#home" className="inline-block hover:opacity-85 transition-opacity group">
            <span
              className="text-[4rem] md:text-[6.5rem] tracking-[0.05em] text-[var(--color-gold)] leading-none"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 300,
              }}
            >
              SaGa
            </span>
            <span
              className="block text-[2rem] md:text-[3.2rem] tracking-[0.3em] text-[var(--color-warm-white)] leading-none mt-1 font-light"
              style={{
                fontFamily: 'var(--font-heading)',
              }}
            >
              Montana
            </span>
          </a>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 text-center md:text-left border-t border-white/5 pt-16">
          
          {/* Address info */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[0.6rem] tracking-[0.25em] uppercase text-[var(--color-gold)] font-semibold" style={{ fontFamily: 'var(--font-body)' }}>
              Location
            </h4>
            <p className="text-[0.75rem] leading-[2] text-[var(--color-ash-light)] font-light" style={{ fontFamily: 'var(--font-body)' }}>
              Yash Villas A1/2, Dahivali,<br />
              Near Ekvira Temple, Karla,<br />
              Lonavala, Maharashtra 410405
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[0.6rem] tracking-[0.25em] uppercase text-[var(--color-gold)] font-semibold" style={{ fontFamily: 'var(--font-body)' }}>
              Navigation
            </h4>
            <ul className="flex flex-col gap-3 text-[0.75rem] text-[var(--color-ash-light)] font-light" style={{ fontFamily: 'var(--font-body)' }}>
              <li><a href="#villa" className="hover:text-[var(--color-gold)] transition-colors duration-300">The Retreat</a></li>
              <li><a href="#villa-experience" className="hover:text-[var(--color-gold)] transition-colors duration-300">Spaces & Rates</a></li>
              <li><a href="#gallery" className="hover:text-[var(--color-gold)] transition-colors duration-300">Gallery</a></li>
              <li><a href="#booking" className="hover:text-[var(--color-gold)] transition-colors duration-300">Reservations</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[0.6rem] tracking-[0.25em] uppercase text-[var(--color-gold)] font-semibold" style={{ fontFamily: 'var(--font-body)' }}>
              Concierge
            </h4>
            <p className="text-[0.75rem] leading-[2] text-[var(--color-ash-light)] font-light" style={{ fontFamily: 'var(--font-body)' }}>
              sagamontana8@gmail.com<br />
              +91 85919 94866
            </p>
            
            {/* Social SVGs */}
            <div className="flex justify-center md:justify-start gap-6 mt-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-ash)] hover:text-[var(--color-gold)] transition-colors duration-300" aria-label="Instagram">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-ash)] hover:text-[var(--color-gold)] transition-colors duration-300" aria-label="Facebook">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright details */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/5" style={{ borderColor: 'rgba(212,175,55,0.1)' }}>
          <p className="text-[0.65rem] tracking-[0.15em] text-[var(--color-ash)] uppercase" style={{ fontFamily: 'var(--font-body)' }}>
            © {currentYear} SaGa Montana. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-[0.65rem] tracking-[0.15em] text-[var(--color-ash)] uppercase" style={{ fontFamily: 'var(--font-body)' }}>
            <a href="#" className="hover:text-[var(--color-gold)] transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-[var(--color-gold)] transition-colors duration-300">Terms of Use</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
