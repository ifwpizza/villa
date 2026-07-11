import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const WHATSAPP_NUMBER = '918591994866';

const getMockBookedDates = () => {
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, '0');
  return [
    `${y}-${m}-12`, `${y}-${m}-13`, `${y}-${m}-14`,
    `${y}-${m}-20`, `${y}-${m}-21`, `${y}-${m}-22`, `${y}-${m}-26`,
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
    if (total > 8) setError('Maximum occupancy: 8 guests');
    else if (total < 5) setError('Minimum 5 guests required');
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

  const buildWhatsAppUrl = (message: string) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  const handleSubmit = () => {
    if (!checkIn || !checkOut || error) return;
    setLoading(true);
    const msg = `Hello,\n\nI'd like to reserve SaGa Montana.\n\nCheck-in: ${fmt(checkIn)}\nCheck-out: ${fmt(checkOut)}\nGuests: ${adults} Adults, ${children} Children\nNights: ${nights}\nTotal: ₹${finalPrice.toLocaleString('en-IN')}${discPct ? ` (${discPct}% discount applied)` : ''}\n\nPlease confirm availability and share payment details.\n\nThank you.`;
    setTimeout(() => {
      setLoading(false);
      window.location.href = buildWhatsAppUrl(msg);
    }, 1000);
  };

  const days = getDays(curYear, curMonth);

  return (
    <section id="booking" className="relative min-h-screen overflow-hidden">
      {/* Large background image */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('/images/dusk-pool-villa.jpeg')` }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(22,22,22,0.85) 0%, rgba(22,22,22,0.75) 50%, rgba(22,22,22,0.9) 100%)' }} />

      <div className="relative z-10 section-luxury">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="eyebrow mb-5">Reservation</p>
            <h2 className="heading-luxury-light" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
              Book Your Stay
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Calendar Panel — glass */}
            <div className="lg:col-span-7 glass-dark p-6 md:p-10">
              {/* Month nav */}
              <div className="flex justify-between items-center mb-8">
                <button onClick={() => { if (curMonth === 0) { setCurMonth(11); setCurYear(p => p - 1); } else setCurMonth(p => p - 1); }}
                  className="text-white/40 hover:text-[var(--color-champagne)] transition-colors text-lg">←</button>
                <span className="text-sm tracking-[0.2em] uppercase text-[var(--color-warm-white)]" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, fontSize: '1.1rem' }}>
                  {monthNames[curMonth]} {curYear}
                </span>
                <button onClick={() => { if (curMonth === 11) { setCurMonth(0); setCurYear(p => p + 1); } else setCurMonth(p => p + 1); }}
                  className="text-white/40 hover:text-[var(--color-champagne)] transition-colors text-lg">→</button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 gap-2 mb-3">
                {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
                  <span key={d} className="text-center text-[0.55rem] tracking-[0.2em] uppercase text-[var(--color-ash)]" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>{d}</span>
                ))}
              </div>

              {/* Calendar grid */}
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

                  let bg = 'text-white/60 hover:text-[var(--color-champagne)] hover:bg-white/5';
                  if (past) bg = 'text-white/15 cursor-not-allowed';
                  else if (booked) bg = 'text-[var(--color-burgundy-light)]/60 cursor-not-allowed bg-[var(--color-burgundy)]/8';
                  else if (isStart || isEnd) bg = 'bg-[var(--color-champagne)] text-[var(--color-noir)] font-semibold';
                  else if (inRange) bg = 'bg-[var(--color-champagne-muted)] text-[var(--color-champagne)]';

                  return (
                    <button key={ds} disabled={disabled} onClick={() => handleClick(day)}
                      className={`h-10 md:h-12 text-xs md:text-sm transition-all duration-300 ${bg}`}
                      style={{ fontFamily: 'var(--font-body)' }}>
                      {day.getDate()}
                    </button>
                  );
                })}
              </div>

              {/* Date selectors */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <button onClick={() => setSelecting('in')}
                  className={`p-4 text-left transition-all duration-300 ${selecting === 'in' ? 'bg-white/5 border-[var(--color-champagne)]' : 'border-white/8'}`}
                  style={{ border: '1px solid' }}>
                  <p className="text-[0.55rem] tracking-[0.25em] uppercase text-[var(--color-ash)] mb-1" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>Check-in</p>
                  <p className="text-sm text-[var(--color-warm-white)]" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400 }}>
                    {checkIn ? fmt(checkIn) : 'Select date'}
                  </p>
                </button>
                <button onClick={() => setSelecting('out')}
                  className={`p-4 text-left transition-all duration-300 ${selecting === 'out' ? 'bg-white/5 border-[var(--color-champagne)]' : 'border-white/8'}`}
                  style={{ border: '1px solid' }}>
                  <p className="text-[0.55rem] tracking-[0.25em] uppercase text-[var(--color-ash)] mb-1" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>Check-out</p>
                  <p className="text-sm text-[var(--color-warm-white)]" style={{ fontFamily: 'var(--font-heading)', fontWeight: 400 }}>
                    {checkOut ? fmt(checkOut) : 'Select date'}
                  </p>
                </button>
              </div>

              {/* Guest selectors */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="p-4" style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
                  <p className="text-[0.55rem] tracking-[0.25em] uppercase text-[var(--color-ash)] mb-3" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>Adults</p>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setAdults(p => Math.max(1,p-1))} className="w-8 h-8 text-[var(--color-ash)] hover:text-[var(--color-champagne)] transition-colors text-lg" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>−</button>
                    <span className="text-lg text-[var(--color-warm-white)] w-6 text-center" style={{ fontFamily: 'var(--font-heading)' }}>{adults}</span>
                    <button onClick={() => setAdults(p => Math.min(8,p+1))} className="w-8 h-8 text-[var(--color-ash)] hover:text-[var(--color-champagne)] transition-colors text-lg" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>+</button>
                  </div>
                </div>
                <div className="p-4" style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
                  <p className="text-[0.55rem] tracking-[0.25em] uppercase text-[var(--color-ash)] mb-3" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>Children</p>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setChildren(p => Math.max(0,p-1))} className="w-8 h-8 text-[var(--color-ash)] hover:text-[var(--color-champagne)] transition-colors text-lg" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>−</button>
                    <span className="text-lg text-[var(--color-warm-white)] w-6 text-center" style={{ fontFamily: 'var(--font-heading)' }}>{children}</span>
                    <button onClick={() => setChildren(p => Math.min(3,p+1))} className="w-8 h-8 text-[var(--color-ash)] hover:text-[var(--color-champagne)] transition-colors text-lg" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>+</button>
                  </div>
                </div>
              </div>

              {error && (
                <div className="mt-4 p-3 text-xs text-[var(--color-burgundy-light)] bg-[var(--color-burgundy)]/10" style={{ fontFamily: 'var(--font-body)', border: '1px solid rgba(142,31,31,0.2)' }}>
                  {error}
                </div>
              )}
            </div>

            {/* Floating Summary Panel — glass */}
            <div className="lg:col-span-5">
              <div className="glass-dark p-8 md:p-10 sticky top-28">
                <p className="eyebrow mb-8">Booking Summary</p>

                <div className="flex flex-col gap-5 text-sm mb-8" style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}>
                  <div className="flex justify-between text-[var(--color-ash)]">
                    <span>Check-in</span>
                    <span className="text-[var(--color-warm-white)]">{checkIn ? fmt(checkIn) : '—'}</span>
                  </div>
                  <div className="flex justify-between text-[var(--color-ash)]">
                    <span>Check-out</span>
                    <span className="text-[var(--color-warm-white)]">{checkOut ? fmt(checkOut) : '—'}</span>
                  </div>
                  <div className="flex justify-between text-[var(--color-ash)]">
                    <span>Guests</span>
                    <span className="text-[var(--color-warm-white)]">{adults} Adults{children > 0 ? `, ${children} Children` : ''}</span>
                  </div>

                  <div className="gold-divider-wide my-2" />

                  <div className="flex justify-between text-[var(--color-ash)]">
                    <span>Nights</span>
                    <span className="text-[var(--color-champagne)]" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>{nights || '—'}</span>
                  </div>
                  <div className="flex justify-between text-[var(--color-ash)]">
                    <span>Subtotal</span>
                    <span className="text-[var(--color-warm-white)]">{basePrice > 0 ? `₹${basePrice.toLocaleString('en-IN')}` : '—'}</span>
                  </div>
                  {discPct > 0 && (
                    <div className="flex justify-between text-emerald-400/80">
                      <span>Discount ({discPct}%)</span>
                      <span>− ₹{((basePrice * discPct) / 100).toLocaleString('en-IN')}</span>
                    </div>
                  )}
                </div>

                <div className="gold-divider-wide mb-6" />

                {/* Animated Price */}
                <div className="flex justify-between items-baseline mb-10">
                  <span className="text-[0.6rem] tracking-[0.3em] uppercase text-[var(--color-ash)]" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>Total</span>
                  <motion.span
                    key={finalPrice}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: 'var(--color-champagne)' }}
                  >
                    {finalPrice > 0 ? `₹${finalPrice.toLocaleString('en-IN')}` : '—'}
                  </motion.span>
                </div>

                <button
                  disabled={!checkIn || !checkOut || !!error || loading}
                  onClick={handleSubmit}
                  className="w-full py-5 text-[0.65rem] tracking-[0.35em] uppercase transition-all duration-500 disabled:opacity-20 disabled:cursor-not-allowed"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    background: !checkIn || !checkOut || error ? 'rgba(255,255,255,0.03)' : 'var(--color-burgundy)',
                    color: 'var(--color-warm-white)',
                  }}
                >
                  {loading ? 'Processing...' : 'Confirm Reservation'}
                </button>

                <p className="text-[0.5rem] text-center text-[var(--color-ash)] mt-4 tracking-[0.15em]" style={{ fontFamily: 'var(--font-body)' }}>
                  Reservation confirmed via WhatsApp
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
