import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const galleryItems = [
  { src: '/images/hero-sunset-pool.jpeg', title: 'Sunset & Pool', tall: true },
  { src: '/images/living-room-day.jpeg', title: 'Living Room' },
  { src: '/images/lawn-pool-mountain.jpeg', title: 'Pool & Mountains', tall: true },
  { src: '/images/entrance-hallway.jpeg', title: 'Grand Entrance' },
  { src: '/images/second-bedroom.jpeg', title: 'Master Suite' },
  { src: '/images/community-pool-mountains.jpeg', title: 'Community Vista', tall: true },
  { src: '/images/kitchen-full.jpeg', title: 'Designer Kitchen' },
  { src: '/images/mezzanine-bedroom.jpeg', title: 'Mezzanine Loft' },
  { src: '/images/balcony-mountain-view.jpeg', title: 'Panoramic View', tall: true },
  { src: '/images/living-room-night.jpeg', title: 'Evening Glow' },
  { src: '/images/master-bedroom-headboard.jpeg', title: 'Bedroom Details' },
  { src: '/images/pool-night.jpeg', title: 'Pool at Night', tall: true },
  { src: '/images/bathroom-sink.jpeg', title: 'Modern Bath' },
  { src: '/images/garden-night-lighting.jpeg', title: 'Garden Lighting' },
  { src: '/images/balcony-sitout.jpeg', title: 'Private Sitout' },
  { src: '/images/dusk-pool-villa.jpeg', title: 'Dusk Exterior', tall: true },
  { src: '/images/kitchen-appliances.jpeg', title: 'Kitchen Detail' },
  { src: '/images/pool-mountain-monsoon.jpeg', title: 'Monsoon Mist' },
  { src: '/images/community-exterior.jpeg', title: 'Villa Grounds' },
  { src: '/images/bedroom-tv-curtains.jpeg', title: 'Bedroom Comfort' },
];

export default function Gallery() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const openLightbox = (idx: number) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const showPrev = () => setLightboxIdx(prev => (prev === 0 ? galleryItems.length - 1 : prev! - 1));
  const showNext = () => setLightboxIdx(prev => (prev === galleryItems.length - 1 ? 0 : prev! + 1));

  return (
    <section id="gallery" className="section-luxury bg-[var(--color-parchment)]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <p className="eyebrow-dark mb-5">Visual Journey</p>
            <h2
              className="heading-luxury"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
            >
              The Gallery
            </h2>
          </div>
          <p
            className="text-sm max-w-md text-[var(--color-ash)] leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
          >
            A curated visual exploration of SaGa Montana — from morning light
            flooding the living room to the turquoise glow of the pool at night.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="masonry-gallery">
          {galleryItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i % 5) * 0.08 }}
              className="overflow-hidden cursor-pointer group relative"
              onClick={() => openLightbox(i)}
            >
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className={`w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110 ${
                  item.tall ? 'h-[450px] md:h-[550px]' : 'h-[280px] md:h-[350px]'
                }`}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-700 flex items-end p-6">
                <span
                  className="text-white/0 group-hover:text-white/90 transition-all duration-700 text-sm tracking-[0.1em]"
                  style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, fontSize: '1.1rem' }}
                >
                  {item.title}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(22,22,22,0.97)' }}
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-8 right-8 text-white/50 hover:text-[var(--color-champagne)] transition-colors text-2xl z-50"
            >
              ✕
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); showPrev(); }}
              className="absolute left-6 md:left-12 text-white/40 hover:text-[var(--color-champagne)] transition-colors"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIdx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="max-w-5xl max-h-[80vh] flex flex-col items-center gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryItems[lightboxIdx].src}
                alt={galleryItems[lightboxIdx].title}
                className="max-w-full max-h-[72vh] object-contain"
              />
              <div className="text-center">
                <p
                  className="text-lg text-white/80"
                  style={{ fontFamily: 'var(--font-heading)', fontWeight: 400 }}
                >
                  {galleryItems[lightboxIdx].title}
                </p>
                <p className="text-[0.55rem] tracking-[0.35em] uppercase text-[var(--color-ash)] mt-2" style={{ fontFamily: 'var(--font-body)' }}>
                  {lightboxIdx + 1} / {galleryItems.length}
                </p>
              </div>
            </motion.div>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); showNext(); }}
              className="absolute right-6 md:right-12 text-white/40 hover:text-[var(--color-champagne)] transition-colors"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
