import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MusicSection from './components/MusicSection';
import VisualWorldSection from './components/VisualWorldSection';
import TourSection from './components/TourSection';
import MerchSection from './components/MerchSection';
import Footer from './components/Footer';
import AudioPlayerBar from './components/AudioPlayerBar';
import CartDrawer from './components/CartDrawer';
import { RELEASES } from './data/artistData';
import { soundEngine } from './utils/soundEngine';

export default function App() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Smooth Scroll Progress Laser Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  // GPU-composited cursor spotlight coordinates (zero React re-renders)
  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty("--spotlight-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--spotlight-y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    return () => soundEngine.stop();
  }, []);

  const handleSelectTrack = (track) => {
    if (currentTrack?.id === track.id) {
      if (isPlaying) {
        soundEngine.stop();
        setIsPlaying(false);
      } else {
        soundEngine.startTrack(track);
        setIsPlaying(true);
      }
    } else {
      setCurrentTrack(track);
      soundEngine.startTrack(track);
      setIsPlaying(true);
    }
  };

  const handleTogglePlay = () => {
    const target = currentTrack || RELEASES[0];
    if (!currentTrack) setCurrentTrack(target);
    if (isPlaying) {
      soundEngine.stop();
      setIsPlaying(false);
    } else {
      soundEngine.startTrack(target);
      setIsPlaying(true);
    }
  };

  const handlePrevTrack = () => {
    if (!currentTrack) return;
    const idx = RELEASES.findIndex((r) => r.id === currentTrack.id);
    const prev = RELEASES[(idx - 1 + RELEASES.length) % RELEASES.length];
    setCurrentTrack(prev);
    soundEngine.startTrack(prev);
    setIsPlaying(true);
  };

  const handleNextTrack = () => {
    if (!currentTrack) return;
    const idx = RELEASES.findIndex((r) => r.id === currentTrack.id);
    const next = RELEASES[(idx + 1) % RELEASES.length];
    setCurrentTrack(next);
    soundEngine.startTrack(next);
    setIsPlaying(true);
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundEngine.setMuted(nextMuted);
  };

  const handleClosePlayer = () => {
    soundEngine.stop();
    setIsPlaying(false);
    setCurrentTrack(null);
  };

  // Merch Bag Actions
  const handleAddToCart = (product, size) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id && i.size === size);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id && i.size === size ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, size, qty: 1 }];
    });
    setCartOpen(true);
  };

  const handleUpdateQty = (id, size, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id, size);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (i.id === id && i.size === size ? { ...i, qty: newQty } : i))
    );
  };

  const handleRemoveItem = (id, size) => {
    setCartItems((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  };

  const totalCartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-[#E2FF32] selection:text-black">
      {/* Top Scroll Progress Laser Indicator */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#E2FF32] origin-left z-50 pointer-events-none shadow-[0_0_12px_#E2FF32]"
      />

      {/* Fixed Analog 35mm Film Grain & Ambient Cursor Spotlight */}
      <div className="film-grain" aria-hidden="true" />
      <div className="fixed inset-0 pointer-events-none z-10 cursor-spotlight" aria-hidden="true" />

      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        isPlaying={isPlaying}
        currentTrack={currentTrack}
        onTogglePlay={handleTogglePlay}
      />

      <main className="relative z-20">
        <Hero
          onPlayHeroTrack={() => handleSelectTrack(RELEASES[0])}
          isHeroTrackPlaying={isPlaying && currentTrack?.id === RELEASES[0].id}
        />
        <MusicSection
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onSelectTrack={handleSelectTrack}
        />
        <VisualWorldSection onPlayFeatured={() => handleSelectTrack(RELEASES[0])} />
        <TourSection />
        <MerchSection onAddToCart={handleAddToCart} />
      </main>

      <Footer />

      <AudioPlayerBar
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        isMuted={isMuted}
        onTogglePlay={handleTogglePlay}
        onPrev={handlePrevTrack}
        onNext={handleNextTrack}
        onToggleMute={handleToggleMute}
        onClose={handleClosePlayer}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemoveItem}
      />
    </div>
  );
}
