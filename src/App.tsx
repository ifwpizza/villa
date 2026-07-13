import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import VillaExperience from './components/VillaExperience';
import Gallery from './components/Gallery';
import Amenities from './components/Amenities';
import NearbyAttractions from './components/NearbyAttractions';
import Reviews from './components/Reviews';
import BookingSystem from './components/BookingSystem';
import FloatingCTA from './components/FloatingCTA';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showGlow, setShowGlow] = useState(false);

  // Loading screen
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  // Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse glow follow
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setShowGlow(true);
    };
    const handleLeave = () => setShowGlow(false);
    window.addEventListener('mousemove', handleMouse);
    document.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouse);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <>
      {/* Luxury Loading Screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="loading-screen"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="loading-logo">
                <span style={{ color: '#C9A74A' }}>SaGa</span>{' '}
                <span style={{ fontWeight: 300 }}>Montana</span>
              </div>
              <div className="loading-bar" />
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.6rem',
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                color: '#999590',
              }}>
                Nature Awaits
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress Bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Mouse Glow */}
      {showGlow && (
        <div
          className="glow-follow"
          style={{ left: mousePos.x, top: mousePos.y, opacity: showGlow ? 1 : 0 }}
        />
      )}

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative"
      >
        <Navbar />
        <Hero />
        <About />
        <VillaExperience />
        <Gallery />
        <Amenities />
        <Reviews />
        <BookingSystem />
        <NearbyAttractions />
        <FloatingCTA />
        <Contact />
        <Footer />
      </motion.div>
    </>
  );
}

export default App;
