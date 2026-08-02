const WHATSAPP_NUMBER = '918591994866';
const WHATSAPP_MESSAGE = 'Hello, I would like to know more about SaGa Montana and availability.';

export default function WhatsAppChat() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with SaGa Montana on WhatsApp: +91 85919 94866"
      className="group fixed bottom-6 right-5 z-[60] flex items-center gap-3"
    >
      <span
        className="max-w-0 overflow-hidden whitespace-nowrap rounded-full bg-[var(--color-noir)] py-3 text-sm text-[var(--color-warm-white)] opacity-0 shadow-lg transition-all duration-300 group-hover:max-w-64 group-hover:px-5 group-hover:opacity-100 focus-within:max-w-64 focus-within:px-5 focus-within:opacity-100"
        style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
      >
        WhatsApp us · +91 85919 94866
      </span>
      <span
        className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[var(--color-gold-royal)] bg-[var(--color-champagne-dark)] text-white shadow-[0_8px_24px_rgba(139,105,20,0.42)] transition-transform duration-300 group-hover:scale-105"
      >
        <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" aria-hidden="true">
          <path d="M26.7 5.2A14.6 14.6 0 0 0 3.8 22.8L2 30l7.4-1.9a14.7 14.7 0 0 0 17.3-22.9Z" stroke="currentColor" strokeWidth="2.1" strokeLinejoin="round" />
          <path d="M11.6 9.5c-.4-.8-.8-.8-1.2-.8h-1c-.4 0-.9.2-1.2.6-.4.4-1.6 1.6-1.6 4 0 2.3 1.7 4.6 1.9 4.9.2.3 3.3 5.3 8.1 7.2 4 1.6 4.8 1.3 5.7 1.2.8-.1 2.7-1.1 3.1-2.2.4-1 .4-1.9.3-2.1-.1-.2-.3-.3-.7-.5l-2.7-1.3c-.4-.2-.6-.2-.8.2l-1.1 1.3c-.2.3-.4.3-.7.1-2-1-3.3-1.9-4.6-4.2-.3-.5.3-.5 1-1.7.2-.3.1-.6 0-.8l-1.3-3.1Z" fill="currentColor" />
        </svg>
      </span>
    </a>
  );
}
