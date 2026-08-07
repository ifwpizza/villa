interface FooterProps {
  onOwnerLogin?: () => void;
}

export default function Footer({ onOwnerLogin }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden text-[var(--color-warm-white)] section-royal-dark pt-16 pb-12">
      {/* Glow Effects */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold-royal)] to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(201,167,74,0.12),_transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <a href="#home" className="inline-block group">
            <span
              className="block text-4xl md:text-6xl tracking-[0.08em] gold-shimmer-text"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 300,
                lineHeight: 1,
              }}
            >
              SaGa
            </span>
            <span
              className="block text-xl md:text-3xl tracking-[0.35em] text-[var(--color-warm-white)] group-hover:text-[var(--color-champagne)] transition-colors mt-1"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 300,
                lineHeight: 1,
              }}
            >
              Montana
            </span>
          </a>

          <p className="mt-4 text-sm text-[var(--color-ash-light)] max-w-lg leading-relaxed font-light">
            An exclusive luxury villa sanctuary in Lonavala offering panoramic mountain views, private pool, and unmatched luxury hospitality.
          </p>

          <div className="gold-divider my-8" style={{ width: '5rem' }} />
        </div>

        {/* 4-Column Balanced Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">
          
          {/* Column 1: About */}
          <div className="flex flex-col gap-4">
            <h4
              className="text-[0.75rem] tracking-[0.25em] uppercase text-[var(--color-champagne-light)] font-semibold"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              The Sanctuary
            </h4>
            <p className="text-sm text-[var(--color-ash-light)] leading-relaxed font-light">
              Nestled amidst the serene Sahyadri mountains, SaGa Montana offers high-ceiling living spaces, private lawn, swimming pool, and 4 luxury bedrooms.
            </p>

            <div className="inline-flex items-center gap-2 pt-2 text-xs text-[var(--color-champagne)]">
              <span>★ 4.9/5 Guest Experience Rating</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-4">
            <h4
              className="text-[0.75rem] tracking-[0.25em] uppercase text-[var(--color-champagne-light)] font-semibold"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Explore
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-[var(--color-ash-light)] font-light">
              <li>
                <a href="#villa" className="hover:text-[var(--color-champagne)] transition-colors inline-block">
                  The Retreat
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[var(--color-champagne)] transition-colors inline-block">
                  Visual Gallery
                </a>
              </li>
              <li>
                <a href="#amenities" className="hover:text-[var(--color-champagne)] transition-colors inline-block">
                  Luxury Amenities
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[var(--color-champagne)] transition-colors inline-block">
                  Guest Reviews
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-[var(--color-champagne)] transition-colors inline-block">
                  Book Reservations
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Location */}
          <div className="flex flex-col gap-4">
            <h4
              className="text-[0.75rem] tracking-[0.25em] uppercase text-[var(--color-champagne-light)] font-semibold"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Location
            </h4>
            <p className="text-sm text-[var(--color-ash-light)] leading-relaxed font-light">
              SaGa Montana, Yash Villas A1/2,<br />
              Dahivali, Near Ekvira Temple, Karla,<br />
              Lonavala, Maharashtra 410405
            </p>
            <a
              href="https://maps.google.com/?q=SaGa+Montana+Lonavala"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[var(--color-champagne)] hover:text-white transition-colors pt-1"
            >
              <span>📍 Open in Google Maps →</span>
            </a>
          </div>

          {/* Column 4: Reservations & Contact */}
          <div className="flex flex-col gap-4">
            <h4
              className="text-[0.75rem] tracking-[0.25em] uppercase text-[var(--color-champagne-light)] font-semibold"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Reservations & Support
            </h4>
            <div className="flex flex-col gap-2 text-sm text-[var(--color-ash-light)] font-light">
              <a href="tel:+918591994866" className="hover:text-[var(--color-champagne)] transition-colors flex items-center gap-2">
                <span>📞</span> +91 85919 94866
              </a>
              <a href="mailto:sagamontana8@gmail.com" className="hover:text-[var(--color-champagne)] transition-colors flex items-center gap-2 truncate">
                <span>✉️</span> sagamontana8@gmail.com
              </a>
              <a
                href="https://wa.me/918591994866?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20SaGa%20Montana%20and%20availability."
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#25D366] transition-colors flex items-center gap-2 text-xs text-white/90 pt-1"
              >
                <span>💬</span> Chat with us on WhatsApp
              </a>
            </div>

            <div className="pt-2 text-[0.65rem] text-[var(--color-ash)] uppercase tracking-wider">
              Check-in: 1:00 PM · Check-out: 11:00 AM
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs text-[var(--color-ash)] tracking-wider uppercase">
            © {currentYear} SaGa Montana. All Rights Reserved.
          </p>

          <div className="flex items-center gap-6 text-xs text-[var(--color-ash)] tracking-wider uppercase">
            <a href="#" className="hover:text-[var(--color-champagne)] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[var(--color-champagne)] transition-colors">
              Terms & Conditions
            </a>
            <button
              onClick={onOwnerLogin}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-[var(--color-champagne)]/30 text-[var(--color-champagne)] hover:bg-[var(--color-champagne)]/10 hover:border-[var(--color-champagne)] transition-all cursor-pointer bg-transparent text-xs"
            >
              <span>Owner Access</span>
              <span>🔒</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
