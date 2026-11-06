import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';

const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const TikTokIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const NAV_LINKS = [
  { href: "#musica", label: "Música" },
  { href: "#galeria", label: "Universo" },
  { href: "#tour", label: "Tour '26" },
  { href: "#tienda", label: "Drop 001" },
  { href: "#contacto", label: "Booking" },
];

export default function Navbar({ cartCount = 0, onOpenCart, isPlaying, currentTrack, onTogglePlay }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["hero", "musica", "galeria", "tour", "tienda", "contacto"];
    const observers = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-35% 0px -50% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      <header className="fixed top-4 sm:top-6 inset-x-0 z-40 px-4 flex justify-center pointer-events-none">
        <motion.nav
          initial={{ y: -32, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
          className={`pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 rounded-full border transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            scrolled
              ? "w-full max-w-4xl px-4 sm:px-5 py-2.5 bg-[#08080a]/85 backdrop-blur-2xl border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.75)]"
              : "w-full max-w-6xl px-5 sm:px-7 py-3.5 bg-[#08080a]/60 backdrop-blur-xl border-white/10"
          }`}
        >
          {/* Brand Identity */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E2FF32] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E2FF32]" />
            </span>
            <span className="font-display font-extrabold text-sm sm:text-base tracking-[0.22em] uppercase text-white group-hover:text-[#E2FF32] transition-colors duration-200">
              JARDY MALES
            </span>
          </a>

          {/* Desktop Navigation Pills */}
          <div className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-full p-1">
            {NAV_LINKS.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-1.5 rounded-full text-[11px] uppercase tracking-[0.16em] font-medium transition-colors duration-200 ${
                    isActive ? "text-black" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navActivePill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-[#E2FF32]"
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </div>

          {/* Right Controls: Live EQ + Socials + Bag Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {currentTrack && (
              <button
                onClick={onTogglePlay}
                title={isPlaying ? "Pausar audio" : "Reproducir audio"}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-[10px] uppercase tracking-widest text-zinc-300 active:scale-[0.97] transition"
              >
                <span className="flex items-end gap-[2px] h-3">
                  <span className={`w-[2px] h-full bg-[#E2FF32] rounded-full ${isPlaying ? "eq-bar-1" : "scale-y-30"}`} />
                  <span className={`w-[2px] h-full bg-[#E2FF32] rounded-full ${isPlaying ? "eq-bar-2" : "scale-y-50"}`} />
                  <span className={`w-[2px] h-full bg-[#E2FF32] rounded-full ${isPlaying ? "eq-bar-3" : "scale-y-25"}`} />
                </span>
                <span className="max-w-[90px] truncate">{currentTrack.title}</span>
              </button>
            )}

            <div className="hidden md:flex items-center gap-1.5">
              <a
                href="https://www.instagram.com/jardymales"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition duration-200"
              >
                <InstagramIcon size={16} />
              </a>
              <a
                href="https://www.tiktok.com/@jardymales"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition duration-200"
              >
                <TikTokIcon size={16} />
              </a>
            </div>

            {/* Button-in-Button Merch Bag Trigger */}
            <button
              onClick={onOpenCart}
              className="group relative flex items-center gap-2.5 bg-white text-black pl-4 pr-1.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.14em] hover:bg-[#E2FF32] active:scale-[0.97] transition-all duration-200 cursor-pointer"
            >
              <span>Drop</span>
              <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold group-hover:scale-105 transition-transform">
                {cartCount > 0 ? cartCount : <ShoppingBag size={12} strokeWidth={2} />}
              </span>
            </button>

            {/* Morphing Hamburger Button (Mobile) */}
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label="Menú"
              className="lg:hidden relative w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white active:scale-95 transition"
            >
              <div className="w-4 h-3 relative flex flex-col justify-between">
                <span
                  className={`block h-[1.5px] w-full bg-white rounded-full transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] origin-center ${
                    isOpen ? "translate-y-[5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-full bg-white rounded-full transition-opacity duration-200 ${
                    isOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-full bg-white rounded-full transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] origin-center ${
                    isOpen ? "-translate-y-[5.5px] -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Fullscreen Glass Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-30 bg-[#050505]/95 backdrop-blur-2xl flex flex-col justify-between px-6 pt-28 pb-10 lg:hidden"
          >
            <div className="space-y-3">
              <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-500 mb-6">
                Navegación Oficial • Austin TX
              </p>
              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ y: 28, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 16, opacity: 0 }}
                  transition={{
                    delay: 0.05 * idx,
                    duration: 0.4,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                >
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="group flex items-center justify-between py-3 border-b border-white/10 font-display text-3xl font-extrabold uppercase tracking-tight text-white hover:text-[#E2FF32] transition-colors"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="text-zinc-500 group-hover:text-[#E2FF32] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={24} />
                  </a>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-white/10 text-xs uppercase tracking-widest text-zinc-400">
              <a href="https://www.instagram.com/jardymales" target="_blank" rel="noreferrer" className="hover:text-white">
                Instagram ↗
              </a>
              <a href="https://www.tiktok.com/@jardymales" target="_blank" rel="noreferrer" className="hover:text-white">
                TikTok ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
