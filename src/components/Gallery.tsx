import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const galleryPhotos = [
  { src: '/images/hero-sunset-pool.jpeg', title: 'Sunset Pool Reflection', height: 'h-[400px] md:h-[550px]' },
  { src: '/images/living-room-day.jpeg', title: 'Sunlit Living Lounge', height: 'h-[300px] md:h-[380px]' },
  { src: '/images/lawn-pool-mountain.jpeg', title: 'Panoramic Lawn & Vista', height: 'h-[400px] md:h-[600px]' },
  { src: '/images/entrance-hallway.jpeg', title: 'Entrance Pathway', height: 'h-[300px] md:h-[350px]' },
  { src: '/images/second-bedroom.jpeg', title: 'Master Bed Details', height: 'h-[400px] md:h-[550px]' },
  { src: '/images/community-pool-mountains.jpeg', title: 'Hillside Pool Landscape', height: 'h-[400px] md:h-[620px]' },
  { src: '/images/kitchen-full.jpeg', title: 'Designer Kitchen Overview', height: 'h-[300px] md:h-[350px]' },
  { src: '/images/mezzanine-bedroom.jpeg', title: 'Cozy Mezzanine Loft', height: 'h-[300px] md:h-[400px]' },
  { src: '/images/balcony-mountain-view.jpeg', title: 'Mountain Balcony View', height: 'h-[400px] md:h-[580px]' },
  { src: '/images/living-room-night.jpeg', title: 'Dusk Indoors Accent', height: 'h-[300px] md:h-[380px]' },
  { src: '/images/master-bedroom-headboard.jpeg', title: 'Custom Headboard Detail', height: 'h-[300px] md:h-[400px]' },
  { src: '/images/pool-night.jpeg', title: 'Illuminated Pool At Dusk', height: 'h-[400px] md:h-[560px]' },
];

export default function Gallery() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const openLightbox = (idx: number) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const showPrev = () => setLightboxIdx(prev => (prev === 0 ? galleryPhotos.length - 1 : prev! - 1));
  const showNext = () => setLightboxIdx(prev => (prev === galleryPhotos.length - 1 ? 0 : prev! + 1));

  return (
    <section id="gallery" className="section-luxury bg-[var(--color-ivory)]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-24 gap-6">
          <div>
            <p className="eyebrow-dark mb-5">Visual Essay</p>
            <h2 className="heading-luxury" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}>
              The Gallery
            </h2>
          </div>
          <p
            className="text-sm max-w-md text-[var(--color-ash)] leading-relaxed font-light"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            A high-definition catalog of SaGa Montana — capturing daylight reflection across the pool, detailed bedroom design accents, and majestic mountain horizons.
          </p>
        </div>

        {/* Pinterest-style Masonry */}
        <div className="masonry-gallery">
          {galleryPhotos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.1 }}
              className="overflow-hidden cursor-pointer group relative shadow-md rounded-[24px]"
              onClick={() => openLightbox(i)}
            >
              <img
                src={photo.src}
                alt={photo.title}
                loading="lazy"
                className={`w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 ${photo.height}`}
              />
              
              {/* Luxury Minimal Caption Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-[0.7s] flex items-end p-8">
                <span
                  className="text-white opacity-0 group-hover:opacity-90 transform translate-y-3 group-hover:translate-y-0 transition-all duration-500 text-sm tracking-[0.1em]"
                  style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, fontSize: '1.2rem' }}
                >
                  {photo.title}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Luxury Lightbox Window */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: 'rgba(17,17,17,0.98)' }}
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-8 right-8 text-white/50 hover:text-[var(--color-gold)] transition-colors text-2xl z-50 cursor-pointer"
            >
              ✕
            </button>

            {/* Prev arrow */}
            <button
              onClick={(e) => { e.stopPropagation(); showPrev(); }}
              className="absolute left-6 md:left-12 text-white/40 hover:text-[var(--color-gold)] transition-colors cursor-pointer"
            >
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            {/* Main Picture Frame */}
            <motion.div
              key={lightboxIdx}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="max-w-6xl max-h-[80vh] flex flex-col items-center gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryPhotos[lightboxIdx].src}
                alt={galleryPhotos[lightboxIdx].title}
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
              />
              <div className="text-center">
                <p
                  className="text-xl text-[var(--color-warm-white)] font-light"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {galleryPhotos[lightboxIdx].title}
                </p>
                <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[var(--color-ash)] mt-2.5" style={{ fontFamily: 'var(--font-body)' }}>
                  {lightboxIdx + 1} / {galleryPhotos.length}
                </p>
              </div>
            </motion.div>

            {/* Next arrow */}
            <button
              onClick={(e) => { e.stopPropagation(); showNext(); }}
              className="absolute right-6 md:right-12 text-white/40 hover:text-[var(--color-gold)] transition-colors cursor-pointer"
            >
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
