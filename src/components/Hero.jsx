import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { Play, Pause, ArrowUpRight, Disc3, MapPin } from 'lucide-react';

export default function Hero({ onPlayHeroTrack, isHeroTrackPlaying }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Scroll-linked parallax layers
  const bgTextX = useTransform(scrollYProgress, [0, 1], ["0%", "-28%"]);
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.78], [1, 0.15]);

  // 3D interactive mouse tilt for Editorial Portrait
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), { stiffness: 220, damping: 26 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 220, damping: 26 });

  const handleCardMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleCardLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100dvh] flex flex-col justify-between pt-28 sm:pt-36 overflow-hidden bg-[#050505]"
    >
      {/* Ambient Atmospheric Mesh Glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-24 w-[520px] h-[520px] rounded-full bg-[#E2FF32]/[0.05] blur-[130px]" />
        <div className="absolute top-1/3 right-0 w-[480px] h-[480px] rounded-full bg-amber-500/[0.06] blur-[140px]" />
      </div>

      {/* Scroll-Driven Kinetic Background Watermark */}
      <motion.div
        style={{ x: bgTextX }}
        className="pointer-events-none select-none absolute top-[22%] left-0 whitespace-nowrap z-0"
      >
        <span className="font-display font-extrabold text-[22vw] uppercase tracking-tighter text-stroke-subtle leading-none">
          JARDY MALES • AUSTIN TX • ERA 2026 •
        </span>
      </motion.div>

      {/* Main Asymmetric Editorial Split */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 my-auto py-8 lg:py-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Kinetic Headline & Interactive Actions */}
          <div className="lg:col-span-7 space-y-7">
            {/* Eyebrow Pill */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/12"
            >
              <span className="px-2 py-0.5 rounded-full bg-[#E2FF32] text-black text-[9px] font-bold uppercase tracking-[0.2em]">
                OUT NOW
              </span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-300 font-medium">
                Nuevo Sencillo “Noche en Austin”
              </span>
            </motion.div>

            {/* Staggered Display Typography */}
            <div className="space-y-1">
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
                  className="font-display font-extrabold text-6xl sm:text-8xl xl:text-[6.8rem] uppercase tracking-[-0.04em] leading-[0.9]"
                >
                  JARDY
                </motion.h1>
              </div>
              <div className="overflow-hidden flex flex-wrap items-baseline gap-4">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.75, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
                  className="font-display font-extrabold text-6xl sm:text-8xl xl:text-[6.8rem] uppercase tracking-[-0.04em] leading-[0.9] text-stroke cursor-default"
                >
                  MALES
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.65, delay: 0.25, ease: [0.23, 1, 0.32, 1] }}
                  className="font-editorial italic text-2xl sm:text-4xl text-[#E2FF32] tracking-normal"
                >
                  (Austin, TX)
                </motion.span>
              </div>
            </div>

            {/* Editorial Narrative */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.65, delay: 0.18, ease: [0.23, 1, 0.32, 1] }}
              className="text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed font-normal"
            >
              Sonido urbano nocturno, lírica cruda y pulso de estadio. Fusionando la calle latina con la energía underground de Texas en una nueva era visual y sonora.
            </motion.p>

            {/* Nested Button-in-Button CTAs */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.65, delay: 0.26, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                onClick={onPlayHeroTrack}
                className="group flex items-center gap-4 bg-[#E2FF32] text-black pl-6 pr-2 py-2 rounded-full font-bold text-xs uppercase tracking-[0.16em] hover:bg-white active:scale-[0.97] transition-all duration-200 cursor-pointer shadow-[0_0_40px_rgba(226,255,50,0.22)]"
              >
                <span>{isHeroTrackPlaying ? "Pausar Preview" : "Escuchar ‘Noche en Austin’"}</span>
                <span className="w-9 h-9 rounded-full bg-black text-[#E2FF32] group-hover:text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                  {isHeroTrackPlaying ? <Pause size={15} /> : <Play size={15} fill="currentColor" className="ml-0.5" />}
                </span>
              </button>

              <a
                href="#tour"
                className="group flex items-center gap-3.5 bg-white/[0.04] hover:bg-white/[0.09] border border-white/15 text-white pl-6 pr-2 py-2 rounded-full font-semibold text-xs uppercase tracking-[0.16em] active:scale-[0.97] transition-all duration-200"
              >
                <span>Fechas Tour ’26</span>
                <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                  <ArrowUpRight size={16} />
                </span>
              </a>
            </motion.div>

            {/* Live Telemetry Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.38 }}
              className="grid grid-cols-3 gap-4 max-w-lg pt-6 border-t border-white/10"
            >
              <div>
                <p className="font-display font-extrabold text-xl sm:text-2xl text-white">2.2M+</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mt-0.5">Streams Globales</p>
              </div>
              <div>
                <p className="font-display font-extrabold text-xl sm:text-2xl text-white">04</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mt-0.5">Shows Texas ’26</p>
              </div>
              <div>
                <p className="font-display font-extrabold text-xl sm:text-2xl text-[#E2FF32]">DROP 01</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mt-0.5">Merch Limitado</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: 3D Tilt Double-Bezel Editorial Portrait + Vinyl Widget */}
          <div className="lg:col-span-5 relative" style={{ perspective: 1100 }}>
            <motion.div
              style={{ y: portraitY, rotateX, rotateY }}
              onMouseMove={handleCardMove}
              onMouseLeave={handleCardLeave}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
              className="double-bezel-outer relative mx-auto max-w-md"
            >
              <div className="double-bezel-inner relative overflow-hidden aspect-[4/5]">
                <img
                  src="/images/hero-editorial.jpg"
                  alt="Jardy Males — Retrato Editorial Oficial"
                  className="w-full h-full object-cover object-center scale-[1.03] hover:scale-[1.07] transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                />
                {/* Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/25" />

                {/* Top Metadata Tag inside Frame */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] uppercase tracking-[0.2em]">
                  <span className="px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/10 text-zinc-300 flex items-center gap-1.5">
                    <MapPin size={11} className="text-[#E2FF32]" /> 30.2672° N, 97.7431° W
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/10 text-zinc-400">
                    REC // 2026
                  </span>
                </div>

                {/* Floating Interactive Vinyl Single Card inside Portrait Bottom */}
                <div
                  onClick={onPlayHeroTrack}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && onPlayHeroTrack()}
                  className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-black/75 backdrop-blur-xl border border-white/15 flex items-center justify-between gap-3 cursor-pointer group hover:border-[#E2FF32]/50 transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="relative w-12 h-12 shrink-0">
                      <img
                        src="/images/album-noche-austin.jpg"
                        alt="Noche en Austin Cover"
                        className="relative z-10 w-12 h-12 rounded-xl object-cover border border-white/15"
                      />
                      <div
                        className={`absolute -right-3 top-1 w-10 h-10 rounded-full bg-zinc-900 border border-white/20 flex items-center justify-center ${
                          isHeroTrackPlaying ? "animate-spin-vinyl" : "group-hover:translate-x-1 transition-transform"
                        }`}
                      >
                        <Disc3 size={18} className="text-[#E2FF32]" />
                      </div>
                    </div>
                    <div className="pl-2">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#E2FF32] font-semibold">
                        {isHeroTrackPlaying ? "Reproduciendo Beat" : "Lead Single • Click Play"}
                      </p>
                      <p className="font-display font-bold text-sm uppercase tracking-wide text-white">
                        Noche en Austin
                      </p>
                    </div>
                  </div>

                  <span className="w-9 h-9 rounded-full bg-white/10 group-hover:bg-[#E2FF32] group-hover:text-black flex items-center justify-center transition-colors">
                    {isHeroTrackPlaying ? <Pause size={14} /> : <Play size={14} fill="currentColor" className="ml-0.5" />}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* High-Energy Kinetic Marquee Ribbon */}
      <div className="relative z-20 mt-8 border-y border-black bg-[#E2FF32] text-black py-3 overflow-hidden select-none">
        <div className="animate-marquee flex items-center gap-8 text-xs sm:text-sm font-display font-extrabold uppercase tracking-[0.22em]">
          {Array.from({ length: 2 }).map((_, loopIdx) => (
            <div key={loopIdx} className="flex items-center gap-8 shrink-0">
              <span>JARDY MALES</span>
              <span>✦</span>
              <span>NOCHE EN AUSTIN — DISPONIBLE AHORA</span>
              <span>✦</span>
              <span>TEXAS TOUR 2026</span>
              <span>✦</span>
              <span>DROP 001 STREETWEAR CAPSULE</span>
              <span>✦</span>
              <span>DESDE AUSTIN PAL MUNDO</span>
              <span>✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
