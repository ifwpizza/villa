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
import OwnerLogin from './components/OwnerLogin';
import OwnerPanel from './components/OwnerPanel';

function App() {
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showGlow, setShowGlow] = useState(false);

  // Owner mode state
  const [showOwnerLogin, setShowOwnerLogin] = useState(false);
  const [ownerToken, setOwnerToken] = useState<string | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const storedToken = sessionStorage.getItem('ownerToken');
    if (storedToken) {
      // Verify the token is still valid
      fetch('/api/verify', {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
        .then((res) => {
          if (res.ok) {
            setOwnerToken(storedToken);
          } else {
            sessionStorage.removeItem('ownerToken');
          }
        })
        .catch(() => {
          sessionStorage.removeItem('ownerToken');
        });
    }
  }, []);

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

  const handleOwnerLogin = (token: string) => {
    setOwnerToken(token);
    setShowOwnerLogin(false);
  };

  const handleOwnerLogout = () => {
    setOwnerToken(null);
    sessionStorage.removeItem('ownerToken');
  };

  // If owner is authenticated, show the owner panel
  if (ownerToken) {
    return <OwnerPanel token={ownerToken} onLogout={handleOwnerLogout} />;
  }

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
                <span className="gold-shimmer-text">SaGa</span>{' '}
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
        <Footer onOwnerLogin={() => setShowOwnerLogin(true)} />
      </motion.div>

      {/* Owner Login Modal */}
      <AnimatePresence>
        {showOwnerLogin && (
          <OwnerLogin
            onLogin={handleOwnerLogin}
            onClose={() => setShowOwnerLogin(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
