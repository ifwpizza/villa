interface FooterProps {
  onOwnerLogin?: () => void;
}

export default function Footer({ onOwnerLogin }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const instaImages = [
    '/images/pool-daytime.jpeg',
    '/images/living-room-night.jpeg',
    '/images/balcony-mountain-view.jpeg',
    '/images/bedroom-tv-curtains.jpeg',
  ];

  return (
    <footer className="text-[var(--color-warm-white)] pt-20 pb-10 section-royal-dark">
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
              className="text-[3rem] md:text-[5rem] tracking-[0.05em] gold-shimmer-text"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 300,
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
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: '1px solid', borderImage: 'linear-gradient(90deg, transparent, rgba(201,167,74,0.4), rgba(212,175,55,0.6), rgba(201,167,74,0.4), transparent) 1' }}>
          <p className="text-[0.6rem] tracking-[0.1em] text-[var(--color-ash)] uppercase" style={{ fontFamily: 'var(--font-body)' }}>
            © {currentYear} SaGa Montana. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-[0.6rem] tracking-[0.1em] text-[var(--color-ash)] uppercase" style={{ fontFamily: 'var(--font-body)' }}>
            <a href="#" className="hover:text-[var(--color-champagne)] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[var(--color-champagne)] transition-colors">Terms</a>
            <button
              onClick={onOwnerLogin}
              className="hover:text-[var(--color-champagne)] transition-colors cursor-pointer bg-transparent border-none"
              style={{ fontFamily: 'inherit', fontSize: 'inherit', letterSpacing: 'inherit', textTransform: 'inherit' as const, color: 'inherit', padding: 0 }}
            >
              Owner Login 🔒
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
