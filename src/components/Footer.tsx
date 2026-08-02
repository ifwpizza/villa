interface FooterProps {
  onOwnerLogin?: () => void;
}

export default function Footer({ onOwnerLogin }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden text-[var(--color-warm-white)] section-royal-dark" style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem) 0 clamp(2rem, 4vw, 3rem)' }}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold-royal)] to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-28 w-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(201,167,74,0.11),_transparent_70%)]" />
      <div className="max-w-7xl mx-auto" style={{ padding: '0 clamp(1.5rem, 5vw, 4rem)' }}>

        {/* Royal wordmark */}
        <div className="relative flex flex-col items-center text-center mb-36">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 mb-14 text-center">
          
          {/* Address */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 md:pl-0 md:pr-12 md:border-r md:border-[rgba(201,167,74,0.22)]">
            <h4 className="text-[0.8rem] md:text-[0.85rem] tracking-[0.28em] uppercase text-[var(--color-champagne-light)]" style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}>Location</h4>
            <p className="text-sm md:text-base leading-[1.8] text-[var(--color-ash-light)]" style={{ fontFamily: 'var(--font-body)', fontWeight: 400 }}>
              Yash Villas A1/2, Dahivali,<br />
              Near Ekvira Temple, Karla,<br />
              Lonavala, Maharashtra 410405
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center text-center gap-4 md:px-12 md:border-r md:border-[rgba(201,167,74,0.22)]">
            <h4 className="text-[0.8rem] md:text-[0.85rem] tracking-[0.28em] uppercase text-[var(--color-champagne-light)]" style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}>Explore</h4>
            <ul className="flex flex-col items-center gap-3 text-sm md:text-base text-[var(--color-ash-light)]" style={{ fontFamily: 'var(--font-body)', fontWeight: 400 }}>
              <li><a href="#villa" className="hover:text-[var(--color-champagne)] transition-colors">The Retreat</a></li>
              <li><a href="#gallery" className="hover:text-[var(--color-champagne)] transition-colors">Gallery</a></li>
              <li><a href="#amenities" className="hover:text-[var(--color-champagne)] transition-colors">Amenities</a></li>
              <li><a href="#booking" className="hover:text-[var(--color-champagne)] transition-colors">Reservations</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right gap-4 md:pl-12 md:pr-0">
            <h4 className="text-[0.8rem] md:text-[0.85rem] tracking-[0.28em] uppercase text-[var(--color-champagne-light)]" style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}>Contact</h4>
            <p className="text-sm md:text-base leading-[1.8] text-[var(--color-ash-light)]" style={{ fontFamily: 'var(--font-body)', fontWeight: 400 }}>
              sagamontana8@gmail.com<br />
              +91 85919 94866
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col justify-center items-center gap-5 text-center" style={{ borderTop: '1px solid', borderImage: 'linear-gradient(90deg, transparent, rgba(201,167,74,0.4), rgba(212,175,55,0.6), rgba(201,167,74,0.4), transparent) 1' }}>
          <p className="text-xs md:text-sm tracking-[0.1em] text-[var(--color-ash)] uppercase" style={{ fontFamily: 'var(--font-body)' }}>
            © {currentYear} SaGa Montana. All Rights Reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-7 gap-y-3 text-xs md:text-sm tracking-[0.1em] text-[var(--color-ash)] uppercase" style={{ fontFamily: 'var(--font-body)' }}>
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
