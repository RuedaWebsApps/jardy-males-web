import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, X, Disc3 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AudioPlayerBar({
  currentTrack,
  isPlaying,
  isMuted,
  onTogglePlay,
  onPrev,
  onNext,
  onToggleMute,
  onClose,
}) {
  const { lang, t } = useLanguage();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
  }, [currentTrack?.id]);

  useEffect(() => {
    if (!isPlaying || !currentTrack) return;
    const id = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
    }, 250);
    return () => clearInterval(id);
  }, [isPlaying, currentTrack]);

  return (
    <AnimatePresence>
      {currentTrack && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          className="fixed bottom-4 inset-x-4 z-40 flex justify-center pointer-events-none"
        >
          <div className="pointer-events-auto w-full max-w-3xl rounded-3xl bg-[#0b0b0f]/90 backdrop-blur-2xl border border-white/15 shadow-[0_24px_70px_rgba(0,0,0,0.85)] overflow-hidden">
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pct = ((e.clientX - rect.left) / rect.width) * 100;
                setProgress(Math.max(0, Math.min(100, pct)));
              }}
              className="h-1 w-full bg-white/10 cursor-pointer relative"
            >
              <div
                className="h-full bg-[#E2FF32] transition-[width] duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className={`w-10 h-10 rounded-xl bg-zinc-900 border border-white/15 flex items-center justify-center shrink-0 overflow-hidden ${
                    isPlaying ? "border-[#E2FF32]/60" : ""
                  }`}
                >
                  {currentTrack.cover ? (
                    <img src={currentTrack.cover} alt={currentTrack.title} className="w-full h-full object-cover" />
                  ) : (
                    <Disc3 size={18} className={`text-[#E2FF32] ${isPlaying ? "animate-spin-vinyl" : ""}`} />
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-xs sm:text-sm uppercase truncate text-white">
                      {currentTrack.title}
                    </span>
                    <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-[#E2FF32]/15 text-[#E2FF32] text-[9px] font-bold uppercase tracking-widest">
                      {currentTrack.bpm} BPM Synth
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 truncate">
                    Jardy Males • {currentTrack.subtitle[lang]}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <button
                  onClick={onPrev}
                  aria-label={t.player.prev}
                  className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition cursor-pointer"
                >
                  <SkipBack size={15} />
                </button>

                <button
                  onClick={onTogglePlay}
                  aria-label={isPlaying ? t.player.pause : t.player.play}
                  className="w-10 h-10 rounded-full bg-[#E2FF32] text-black flex items-center justify-center hover:scale-105 active:scale-95 transition cursor-pointer"
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} fill="black" className="ml-0.5" />}
                </button>

                <button
                  onClick={onNext}
                  aria-label={t.player.next}
                  className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition cursor-pointer"
                >
                  <SkipForward size={15} />
                </button>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={onToggleMute}
                  aria-label={t.player.mute}
                  className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition cursor-pointer"
                >
                  {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                </button>
                <button
                  onClick={onClose}
                  aria-label={t.player.close}
                  className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-zinc-500 hover:text-white transition cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
