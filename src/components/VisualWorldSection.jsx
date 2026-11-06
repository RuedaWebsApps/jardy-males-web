import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Play, X, Radio, Flame, Mic2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function VisualWorldSection({ onPlayFeatured }) {
  const { t } = useLanguage();
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const parallaxSlow = useTransform(scrollYProgress, [0, 1], [35, -35]);
  const parallaxFast = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  return (
    <section
      ref={containerRef}
      id="galeria"
      className="relative py-28 sm:py-36 px-4 bg-[#070709] border-t border-white/[0.06] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 32, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16"
        >
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] uppercase tracking-[0.22em] text-zinc-400 mb-4">
              {t.visual.eyebrow}
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-6xl uppercase tracking-[-0.03em] leading-[0.95]">
              {t.visual.titleMain} <span className="text-stroke">{t.visual.titleStroke}</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-zinc-400 max-w-md leading-relaxed">
            {t.visual.description}
          </p>
        </motion.div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <motion.div
            style={{ y: parallaxSlow }}
            className="lg:col-span-8 double-bezel-outer group cursor-pointer"
            onClick={() => setVideoModalOpen(true)}
          >
            <div className="double-bezel-inner relative overflow-hidden min-h-[360px] sm:min-h-[440px] flex flex-col justify-between p-6 sm:p-10">
              <img
                src="/images/album-noche-austin.jpg"
                alt="Noche en Austin Official Visualizer"
                className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/25" />

              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] uppercase tracking-[0.2em] text-[#E2FF32] font-bold">
                  {t.visual.visualizerBadge}
                </span>
                <span className="text-xs font-mono-tech text-zinc-300 bg-black/60 px-3 py-1 rounded-full border border-white/10">
                  RED RIVER DISTRICT, ATX
                </span>
              </div>

              <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div>
                  <p className="font-editorial italic text-2xl text-[#E2FF32]">{t.visual.chapter}</p>
                  <h3 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-white mt-1">
                    {t.visual.filmTitle}
                  </h3>
                </div>

                <div className="w-16 h-16 rounded-full bg-[#E2FF32] text-black flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_40px_rgba(226,255,50,0.4)]">
                  <Play size={24} fill="black" className="ml-1" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{ y: parallaxFast }}
            className="lg:col-span-4 flex flex-col gap-6"
          >
            <div className="double-bezel-outer flex-1">
              <div className="double-bezel-inner h-full p-7 flex flex-col justify-between bg-gradient-to-br from-[#111115] to-[#08080a]">
                <div className="w-11 h-11 rounded-2xl bg-[#E2FF32]/10 border border-[#E2FF32]/30 flex items-center justify-center text-[#E2FF32]">
                  <Mic2 size={20} />
                </div>
                <div className="my-6">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-zinc-500 mb-2">
                    {t.visual.card1Tag}
                  </p>
                  <h4 className="font-display font-bold text-2xl uppercase tracking-tight mb-3">
                    {t.visual.card1Title}
                  </h4>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {t.visual.card1Body}
                  </p>
                </div>
                <div className="text-[11px] font-mono-tech uppercase tracking-widest text-zinc-500 pt-4 border-t border-white/10">
                  {t.visual.card1Footer}
                </div>
              </div>
            </div>

            <div className="double-bezel-outer">
              <div className="double-bezel-inner p-7 flex items-center justify-between gap-4 bg-[#0d0d10]">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#E2FF32] font-semibold">
                    {t.visual.card2Tag}
                  </p>
                  <p className="font-display font-extrabold text-xl uppercase mt-1">
                    {t.visual.card2Title}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-white">
                  <Flame size={20} className="text-[#E2FF32]" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Interactive Visualizer Experience Modal */}
      <AnimatePresence>
        {videoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVideoModalOpen(false)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 12 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="double-bezel-outer w-full max-w-3xl"
            >
              <div className="double-bezel-inner relative overflow-hidden aspect-video flex flex-col justify-between p-6 sm:p-10">
                <img
                  src="/images/album-noche-austin.jpg"
                  alt="Visualizer Scene"
                  className="absolute inset-0 w-full h-full object-cover opacity-55 scale-105 animate-pulse"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/60" />

                <div className="relative z-10 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E2FF32] text-black text-[10px] font-bold uppercase tracking-widest">
                    <Radio size={12} /> {t.visual.modalActive}
                  </span>
                  <button
                    onClick={() => setVideoModalOpen(false)}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="relative z-10 text-center space-y-4 my-auto">
                  <p className="font-editorial italic text-2xl sm:text-3xl text-zinc-200">
                    {t.visual.modalQuote}
                  </p>
                  <button
                    onClick={() => onPlayFeatured()}
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white text-black font-bold text-xs uppercase tracking-[0.18em] hover:bg-[#E2FF32] transition cursor-pointer"
                  >
                    <Play size={15} fill="black" /> {t.visual.modalCta}
                  </button>
                </div>

                <div className="relative z-10 flex items-center justify-between text-[10px] font-mono-tech uppercase tracking-[0.2em] text-zinc-400">
                  <span>DIR. RUEDA LA ROLA MEDIA</span>
                  <span>AUSTIN, TEXAS • 2026</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
