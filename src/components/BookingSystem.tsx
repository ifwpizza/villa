import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const WHATSAPP_NUMBER = '918779944251';

const getMockBookedDates = () => {
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, '0');
  return [
    `${y}-${m}-14`, `${y}-${m}-15`, `${y}-${m}-16`,
    `${y}-${m}-22`, `${y}-${m}-23`, `${y}-${m}-24`, `${y}-${m}-29`,
  ];
};

const bookedDates = getMockBookedDates();
const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export default function BookingSystem() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(5);
  const [children, setChildren] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [curYear, setCurYear] = useState(new Date().getFullYear());
  const [curMonth, setCurMonth] = useState(new Date().getMonth());
  const [selecting, setSelecting] = useState<'in' | 'out'>('in');

  const total = adults + children;
  const [nights, setNights] = useState(0);
  const [basePrice, setBasePrice] = useState(0);
  const [discPct, setDiscPct] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    if (total > 8) setError('Maximum occupancy is 8 guests (including children)');
    else if (total < 5) setError('Minimum 5 guests required to reserve');
    else setError('');
  }, [total]);

  useEffect(() => {
    if (!checkIn || !checkOut) { setNights(0); setBasePrice(0); setFinalPrice(0); return; }
    const s = new Date(checkIn), e = new Date(checkOut);
    if (e <= s) { setNights(0); setBasePrice(0); setFinalPrice(0); return; }
    const n = Math.ceil(Math.abs(e.getTime() - s.getTime()) / 86400000);
    setNights(n);
    let price = 0;
    const d = new Date(s);
    for (let i = 0; i < n; i++) { price += d.getDay() === 6 ? 12000 : 8000; d.setDate(d.getDate() + 1); }
    setBasePrice(price);
    const pct = total === 8 ? 20 : total >= 6 ? 5 : 0;
    setDiscPct(pct);
    setFinalPrice(price - (price * pct) / 100);
  }, [checkIn, checkOut, total]);

  const isBooked = (ds: string) => bookedDates.includes(ds);
  const isPast = (d: Date) => { const t = new Date(); t.setHours(0,0,0,0); return d < t; };

  const getDays = (y: number, m: number) => {
    const d = new Date(y, m, 1);
    const days: (Date | null)[] = [];
    for (let i = 0; i < d.getDay(); i++) days.push(null);
    while (d.getMonth() === m) { days.push(new Date(d)); d.setDate(d.getDate() + 1); }
    return days;
  };

  const handleClick = (d: Date) => {
    const ds = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    if (selecting === 'in') { setCheckIn(ds); setCheckOut(''); setSelecting('out'); }
    else {
      if (d > new Date(checkIn)) {
        let cur = new Date(checkIn); let blocked = false;
        while (cur < d) {
          const cs = `${cur.getFullYear()}-${String(cur.getMonth()+1).padStart(2,'0')}-${String(cur.getDate()).padStart(2,'0')}`;
          if (isBooked(cs)) { blocked = true; break; }
          cur.setDate(cur.getDate() + 1);
        }
        if (blocked) setError('Range contains booked dates');
        else { setCheckOut(ds); setSelecting('in'); setError(''); }
      } else { setCheckIn(ds); setCheckOut(''); }
    }
  };

  const fmt = (ds: string) => ds ? new Date(ds).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '';

  const handleSubmit = () => {
    if (!checkIn || !checkOut || error) return;
    setLoading(true);
    const msg = `Hello,\n\nI would like to reserve SaGa Montana.\n\nCheck-in: ${fmt(checkIn)}\nCheck-out: ${fmt(checkOut)}\nGuests: ${adults} Adults, ${children} Children\nNights: ${nights}\nTotal: ₹${finalPrice.toLocaleString('en-IN')}${discPct ? ` (${discPct}% discount applied)` : ''}\n\nPlease confirm availability.\n\nThank you.`;
    setTimeout(() => { setLoading(false); window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank'); }, 1000);
  };

  const days = getDays(curYear, curMonth);

  return (
    <section id="booking" className="relative min-h-screen overflow-hidden bg-[var(--color-charcoal)] py-24 md:py-32">
      {/* Parallax Dusk Pool Background */}
      <div className="absolute inset-0 bg-cover bg-center opacity-65" style={{ backgroundImage: `url('/images/dusk-pool-villa.jpeg')` }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-charcoal)] via-[var(--color-charcoal)]/80 to-[var(--color-charcoal)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Editorial Heading */}
        <div className="text-center mb-20">
          <p className="eyebrow mb-4">RESERVATIONS LOUNGE</p>
          <h2 className="heading-luxury-light text-3xl md:text-5xl font-light">
            Secure Your Sanctuary
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Calendar Deck - Glassmorphism */}
          <div className="lg:col-span-7 glass-dark p-6 md:p-10 rounded-[28px] shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <button onClick={() => { if (curMonth === 0) { setCurMonth(11); setCurYear(p => p - 1); } else setCurMonth(p => p - 1); }}
                className="text-[var(--color-gold)] hover:text-white transition-colors text-xl p-2 cursor-pointer">←</button>
              <span className="text-lg tracking-[0.2em] uppercase text-[var(--color-warm-white)] font-light" style={{ fontFamily: 'var(--font-heading)' }}>
                {monthNames[curMonth]} {curYear}
              </span>
              <button onClick={() => { if (curMonth === 11) { setCurMonth(0); setCurYear(p => p + 1); } else setCurMonth(p => p + 1); }}
                className="text-[var(--color-gold)] hover:text-white transition-colors text-xl p-2 cursor-pointer">→</button>
            </div>

            {/* Calendar Guides */}
            <div className="flex gap-4 justify-center mb-8 text-[0.6rem] tracking-[0.1em] uppercase font-medium" style={{ fontFamily: 'var(--font-body)' }}>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-white/60">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--color-gold)]" />
                <span className="text-white/60">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                <span className="text-white/60">Booked</span>
              </div>
            </div>

            {/* Calendar Headers */}
            <div className="grid grid-cols-7 gap-2 mb-3">
              {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
                <span key={d} className="text-center text-[0.6rem] tracking-[0.15em] uppercase text-white/40" style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}>{d}</span>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {days.map((day, i) => {
                if (!day) return <span key={`e-${i}`} />;
                const ds = `${day.getFullYear()}-${String(day.getMonth()+1).padStart(2,'0')}-${String(day.getDate()).padStart(2,'0')}`;
                const booked = isBooked(ds);
                const past = isPast(day);
                const isStart = checkIn === ds;
                const isEnd = checkOut === ds;
                const inRange = checkIn && checkOut && day > new Date(checkIn) && day < new Date(checkOut);
                const disabled = past || booked;

                let btnStyles = 'text-white/65 hover:bg-white/5 border border-white/5 hover:border-[var(--color-gold)]/20';
                if (past) btnStyles = 'text-white/10 cursor-not-allowed border border-transparent';
                else if (booked) btnStyles = 'text-rose-400/50 cursor-not-allowed bg-rose-950/15 border border-rose-950/20';
                else if (isStart || isEnd) btnStyles = 'bg-[var(--color-gold)] text-[var(--color-charcoal)] font-semibold border border-[var(--color-gold)] shadow-[0_4px_15px_rgba(212,175,55,0.3)]';
                else if (inRange) btnStyles = 'bg-[var(--color-gold-muted)] text-[var(--color-gold)] border border-[var(--color-gold)]/25';

                return (
                  <button
                    key={ds}
                    disabled={disabled}
                    onClick={() => handleClick(day)}
                    className={`h-11 md:h-13 rounded-full text-xs transition-all duration-300 cursor-pointer ${btnStyles}`}
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {day.getDate()}
                  </button>
                );
              })}
            </div>

            {/* Date Picker Form fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <button
                onClick={() => setSelecting('in')}
                className={`p-4 rounded-[20px] text-left transition-all duration-300 bg-white/2 cursor-pointer ${selecting === 'in' ? 'border-[var(--color-gold)] bg-white/5' : 'border-white/5'}`}
                style={{ border: '1px solid' }}
              >
                <p className="text-[0.55rem] tracking-[0.25em] uppercase text-white/40 mb-1" style={{ fontFamily: 'var(--font-body)' }}>Check-in</p>
                <p className="text-sm text-[var(--color-warm-white)] font-light" style={{ fontFamily: 'var(--font-heading)' }}>
                  {checkIn ? fmt(checkIn) : 'Select check-in'}
                </p>
              </button>
              <button
                onClick={() => setSelecting('out')}
                className={`p-4 rounded-[20px] text-left transition-all duration-300 bg-white/2 cursor-pointer ${selecting === 'out' ? 'border-[var(--color-gold)] bg-white/5' : 'border-white/5'}`}
                style={{ border: '1px solid' }}
              >
                <p className="text-[0.55rem] tracking-[0.25em] uppercase text-white/40 mb-1" style={{ fontFamily: 'var(--font-body)' }}>Check-out</p>
                <p className="text-sm text-[var(--color-warm-white)] font-light" style={{ fontFamily: 'var(--font-heading)' }}>
                  {checkOut ? fmt(checkOut) : 'Select check-out'}
                </p>
              </button>
            </div>

            {/* Occupants setup */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-white/2 rounded-[20px]" style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
                <p className="text-[0.55rem] tracking-[0.25em] uppercase text-white/40 mb-3.5" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>Adults</p>
                <div className="flex items-center gap-4">
                  <button onClick={() => setAdults(p => Math.max(1,p-1))} className="w-8 h-8 rounded-full border border-white/10 text-white/60 hover:text-[var(--color-gold)] hover:border-[var(--color-gold)] transition-colors cursor-pointer flex items-center justify-center">−</button>
                  <span className="text-lg text-[var(--color-warm-white)] w-6 text-center" style={{ fontFamily: 'var(--font-heading)' }}>{adults}</span>
                  <button onClick={() => setAdults(p => Math.min(8,p+1))} className="w-8 h-8 rounded-full border border-white/10 text-white/60 hover:text-[var(--color-gold)] hover:border-[var(--color-gold)] transition-colors cursor-pointer flex items-center justify-center">+</button>
                </div>
              </div>
              <div className="p-4 bg-white/2 rounded-[20px]" style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
                <p className="text-[0.55rem] tracking-[0.25em] uppercase text-white/40 mb-3.5" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>Children</p>
                <div className="flex items-center gap-4">
                  <button onClick={() => setChildren(p => Math.max(0,p-1))} className="w-8 h-8 rounded-full border border-white/10 text-white/60 hover:text-[var(--color-gold)] hover:border-[var(--color-gold)] transition-colors cursor-pointer flex items-center justify-center">−</button>
                  <span className="text-lg text-[var(--color-warm-white)] w-6 text-center" style={{ fontFamily: 'var(--font-heading)' }}>{children}</span>
                  <button onClick={() => setChildren(p => Math.min(3,p+1))} className="w-8 h-8 rounded-full border border-white/10 text-white/60 hover:text-[var(--color-gold)] hover:border-[var(--color-gold)] transition-colors cursor-pointer flex items-center justify-center">+</button>
                </div>
              </div>
            </div>

            {error && (
              <div className="mt-4 p-4 text-xs text-rose-300 bg-rose-950/20 rounded-[12px] border border-rose-900/35" style={{ fontFamily: 'var(--font-body)' }}>
                {error}
              </div>
            )}
          </div>

          {/* Booking Summary - Sticky Card */}
          <div className="lg:col-span-5">
            <div className="glass-dark p-8 md:p-10 rounded-[28px] shadow-2xl sticky top-28">
              <p className="eyebrow mb-8">Reservation Summary</p>

              <div className="flex flex-col gap-5 text-sm mb-8 font-light" style={{ fontFamily: 'var(--font-body)' }}>
                <div className="flex justify-between text-white/50">
                  <span>Selected Check-in</span>
                  <span className="text-[var(--color-warm-white)]">{checkIn ? fmt(checkIn) : '—'}</span>
                </div>
                <div className="flex justify-between text-white/50">
                  <span>Selected Check-out</span>
                  <span className="text-[var(--color-warm-white)]">{checkOut ? fmt(checkOut) : '—'}</span>
                </div>
                <div className="flex justify-between text-white/50">
                  <span>Total Occupants</span>
                  <span className="text-[var(--color-warm-white)]">{adults} Adults{children > 0 ? `, ${children} Children` : ''}</span>
                </div>

                <div className="gold-divider-wide my-2" />

                <div className="flex justify-between text-white/50">
                  <span>Duration</span>
                  <span className="text-[var(--color-gold)] font-medium" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem' }}>
                    {nights > 0 ? `${nights} Night${nights > 1 ? 's' : ''}` : '—'}
                  </span>
                </div>
                <div className="flex justify-between text-white/50">
                  <span>Base Accommodation</span>
                  <span className="text-[var(--color-warm-white)]">{basePrice > 0 ? `₹${basePrice.toLocaleString('en-IN')}` : '—'}</span>
                </div>
                {discPct > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Loyalty Discount ({discPct}%)</span>
                    <span>− ₹{((basePrice * discPct) / 100).toLocaleString('en-IN')}</span>
                  </div>
                )}
              </div>

              <div className="gold-divider-wide mb-8" />

              {/* Dynamic Price Calculation display */}
              <div className="flex justify-between items-baseline mb-10">
                <span className="text-[0.6rem] tracking-[0.3em] uppercase text-white/40" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>Estimated Bill</span>
                <motion.span
                  key={finalPrice}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-[var(--color-gold)]"
                  style={{ fontFamily: 'var(--font-heading)', fontWeight: 300, fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)' }}
                >
                  {finalPrice > 0 ? `₹${finalPrice.toLocaleString('en-IN')}` : '—'}
                </motion.span>
              </div>

              {/* Confirm Reservation CTA */}
              <button
                disabled={!checkIn || !checkOut || !!error || loading}
                onClick={handleSubmit}
                className="w-full py-5 text-[0.65rem] tracking-[0.35em] uppercase transition-all duration-500 rounded-full cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed text-white bg-[var(--color-burgundy)] hover:bg-[var(--color-burgundy-light)] shadow-lg hover:shadow-[var(--color-burgundy)]/20"
                style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}
              >
                {loading ? 'Securing Stay...' : 'Confirm Availability'}
              </button>

              <p className="text-[0.55rem] text-center text-white/35 mt-4 tracking-[0.15em]" style={{ fontFamily: 'var(--font-body)' }}>
                * Redirects to official WhatsApp concierge
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
