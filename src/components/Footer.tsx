export default function Footer() {
  const currentYear = new Date().getFullYear();

  const instaImages = [
    '/images/pool-daytime.jpeg',
    '/images/living-room-night.jpeg',
    '/images/balcony-mountain-view.jpeg',
    '/images/bedroom-tv-curtains.jpeg',
  ];

  return (
    <footer className="bg-[var(--color-noir)] text-[var(--color-warm-white)] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        
        {/* Instagram Gallery Strip */}
        <div className="mb-20">
          <div className="flex justify-between items-end mb-6">
            <h4 className="text-[0.6rem] tracking-[0.3em] uppercase text-[var(--color-champagne)]" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>
              @sagamontana
            </h4>
            <a href="#" className="text-[0.55rem] tracking-[0.2em] uppercase text-[var(--color-ash)] hover:text-white transition-colors" style={{ fontFamily: 'var(--font-body)' }}>
              Follow Us
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {instaImages.map((src, i) => (
              <a key={i} href="#" className="block overflow-hidden group aspect-square">
                <img
                  src={src}
                  alt="Instagram snippet"
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-70 group-hover:opacity-100"
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Huge Logo */}
        <div className="flex flex-col items-center text-center mb-16">
          <a href="#home" className="inline-block hover:opacity-80 transition-opacity">
            <span
              className="text-[3rem] md:text-[5rem] tracking-[0.05em]"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 300,
                color: 'var(--color-champagne)',
                lineHeight: 1,
              }}
            >
              SaGa
            </span>
            <span
              className="block text-[1.5rem] md:text-[2.5rem] tracking-[0.3em]"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 300,
                color: 'var(--color-warm-white)',
                lineHeight: 1,
                marginTop: '0.2rem',
              }}
            >
              Montana
            </span>
          </a>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 text-center md:text-left">
          
          {/* Address */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[0.55rem] tracking-[0.25em] uppercase text-[var(--color-ash)]" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>Location</h4>
            <p className="text-[0.7rem] leading-[1.8] text-[var(--color-ash-light)]" style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}>
              Yash Villas A1/2, Dahivali,<br />
              Near Ekvira Temple, Karla,<br />
              Lonavala, Maharashtra 410405
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[0.55rem] tracking-[0.25em] uppercase text-[var(--color-ash)]" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>Explore</h4>
            <ul className="flex flex-col gap-3 text-[0.7rem] text-[var(--color-ash-light)]" style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}>
              <li><a href="#villa" className="hover:text-[var(--color-champagne)] transition-colors">The Retreat</a></li>
              <li><a href="#gallery" className="hover:text-[var(--color-champagne)] transition-colors">Gallery</a></li>
              <li><a href="#amenities" className="hover:text-[var(--color-champagne)] transition-colors">Amenities</a></li>
              <li><a href="#booking" className="hover:text-[var(--color-champagne)] transition-colors">Reservations</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[0.55rem] tracking-[0.25em] uppercase text-[var(--color-ash)]" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>Contact</h4>
            <p className="text-[0.7rem] leading-[1.8] text-[var(--color-ash-light)]" style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}>
              sagamontana8@gmail.com<br />
              +91 85919 94866
            </p>
            {/* Social Icons SVGs */}
            <div className="flex justify-center md:justify-start gap-5 mt-2">
              <a href="#" className="text-[var(--color-ash)] hover:text-[var(--color-champagne)] transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
              <a href="#" className="text-[var(--color-ash)] hover:text-[var(--color-champagne)] transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 border-t" style={{ borderColor: 'rgba(201,167,74,0.15)' }}>
          <p className="text-[0.6rem] tracking-[0.1em] text-[var(--color-ash)] uppercase" style={{ fontFamily: 'var(--font-body)' }}>
            © {currentYear} SaGa Montana. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-[0.6rem] tracking-[0.1em] text-[var(--color-ash)] uppercase" style={{ fontFamily: 'var(--font-body)' }}>
            <a href="#" className="hover:text-[var(--color-champagne)] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[var(--color-champagne)] transition-colors">Terms</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
