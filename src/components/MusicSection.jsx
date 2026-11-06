import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, ArrowUpRight, Disc3, Sparkles } from 'lucide-react';
import { RELEASES } from '../data/artistData';

function GenerativeCover({ track }) {
  if (track.cover) {
    return (
      <img
        src={track.cover}
        alt={track.title}
        className="w-full h-full object-cover"
      />
    );
  }
  const [c1, c2, c3] = track.palette || ["#111", "#E2FF32", "#fff"];
  return (
    <div
      className="w-full h-full relative overflow-hidden flex flex-col justify-between p-6"
      style={{
        background: `radial-gradient(circle at 25% 20%, ${c2}55, transparent 60%), radial-gradient(circle at 80% 85%, ${c3}40, ${c1} 75%)`,
        backgroundColor: c1,
      }}
    >
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-white/70 font-semibold">
        <span>JM // {track.year}</span>
        <span>{track.bpm} BPM</span>
      </div>
      <div>
        <p className="font-editorial italic text-2xl text-white/80 leading-none mb-1">
          {track.subtitle}
        </p>
        <p className="font-display font-extrabold text-3xl uppercase tracking-tight text-white leading-none">
          {track.title}
        </p>
      </div>
    </div>
  );
}

export default function MusicSection({ currentTrack, isPlaying, onSelectTrack }) {
  const [filter, setFilter] = useState("Todos");
  const activeTrack = currentTrack || RELEASES[0];

  const filteredReleases =
    filter === "Todos"
      ? RELEASES
      : RELEASES.filter((r) => r.type.toLowerCase() === filter.toLowerCase());

  return (
    <section id="musica" className="relative py-28 sm:py-36 px-4 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header + Filter Pills */}
        <motion.div
          initial={{ y: 32, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] uppercase tracking-[0.22em] text-[#E2FF32] font-semibold mb-4">
              <Sparkles size={11} /> Catálogo Sonoro Oficial
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-6xl uppercase tracking-[-0.03em] leading-[0.95]">
              Música & <span className="font-editorial italic font-normal text-zinc-300">Lanzamientos</span>
            </h2>
          </div>

          {/* Filter Tabs with Spring Shared Pill */}
          <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white/[0.03] border border-white/10 self-start md:self-auto">
            {["Todos", "Single", "EP"].map((tab) => {
              const active = filter === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`relative px-5 py-2 rounded-full text-xs uppercase tracking-[0.16em] font-semibold transition-colors cursor-pointer ${
                    active ? "text-black" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="musicFilterPill"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-[#E2FF32]"
                    />
                  )}
                  <span className="relative z-10">{tab === "Single" ? "Singles" : tab}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Asymmetric Split: Featured Vinyl Deck (Left) + Interactive Tracklist (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Vinyl Spotlight Card */}
          <motion.div
            initial={{ y: 36, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="lg:col-span-5 double-bezel-outer lg:sticky lg:top-28"
          >
            <div className="double-bezel-inner p-6 sm:p-8 relative overflow-hidden">
              {/* Cover + Sliding Vinyl Disc */}
              <div className="relative mx-auto max-w-[290px] sm:max-w-[310px] mb-8">
                {/* Physical Vinyl Record Behind Sleeve */}
                <div
                  className={`hidden sm:flex absolute top-3 bottom-3 aspect-square rounded-full bg-gradient-to-tr from-zinc-950 via-zinc-800 to-zinc-950 border border-white/15 shadow-2xl items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                    isPlaying && currentTrack?.id === activeTrack.id
                      ? "translate-x-14 animate-spin-vinyl"
                      : "translate-x-5"
                  }`}
                  style={{ right: 0 }}
                >
                  <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-[8px] font-bold text-black uppercase"
                      style={{ backgroundColor: activeTrack.accentColor }}
                    >
                      JM
                    </div>
                  </div>
                </div>

                {/* Main Sleeve */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTrack.id}
                    initial={{ opacity: 0.4, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.4, scale: 0.96 }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    className="relative z-10 aspect-square rounded-2xl overflow-hidden border border-white/15 shadow-[0_24px_60px_rgba(0,0,0,0.85)]"
                  >
                    <GenerativeCover track={activeTrack} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Active Track Details */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-zinc-400">
                  <span>{activeTrack.type} • {activeTrack.year}</span>
                  <span className="text-[#E2FF32] font-semibold">{activeTrack.streams} Streams</span>
                </div>

                <h3 className="font-display font-extrabold text-2xl sm:text-3xl uppercase tracking-tight">
                  {activeTrack.title}
                </h3>

                <p className="font-editorial italic text-lg text-zinc-400 leading-snug">
                  {activeTrack.lyricSnippet}
                </p>

                {/* Play Button + External Streaming Links */}
                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onSelectTrack(activeTrack)}
                    className="group flex-1 flex items-center justify-between bg-white hover:bg-[#E2FF32] text-black pl-5 pr-2 py-2 rounded-full text-xs font-bold uppercase tracking-[0.16em] active:scale-[0.97] transition-all cursor-pointer"
                  >
                    <span>
                      {isPlaying && currentTrack?.id === activeTrack.id ? "Pausar Beat" : "Escuchar Preview"}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                      {isPlaying && currentTrack?.id === activeTrack.id ? (
                        <Pause size={14} />
                      ) : (
                        <Play size={14} fill="currentColor" className="ml-0.5" />
                      )}
                    </span>
                  </button>
                </div>

                {/* Streaming Platforms */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2 text-[11px] uppercase tracking-[0.16em] text-zinc-400">
                  <a
                    href={activeTrack.platforms.spotify}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#E2FF32] flex items-center gap-1 transition-colors"
                  >
                    Spotify <ArrowUpRight size={13} />
                  </a>
                  <a
                    href={activeTrack.platforms.apple}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white flex items-center gap-1 transition-colors"
                  >
                    Apple Music <ArrowUpRight size={13} />
                  </a>
                  <a
                    href={activeTrack.platforms.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white flex items-center gap-1 transition-colors"
                  >
                    YouTube <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Interactive Tracklist */}
          <div className="lg:col-span-7 space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredReleases.map((track, index) => {
                const isCurrent = currentTrack?.id === track.id;
                const isTrackPlaying = isCurrent && isPlaying;

                return (
                  <motion.div
                    layout
                    key={track.id}
                    initial={{ y: 24, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    exit={{ scale: 0.96, opacity: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.06,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    onClick={() => onSelectTrack(track)}
                    className={`double-bezel-outer cursor-pointer group ${
                      isCurrent ? "!border-[#E2FF32]/50" : ""
                    }`}
                  >
                    <div className="double-bezel-inner p-4 sm:p-6 flex items-center justify-between gap-4 relative overflow-hidden">
                      {/* Subtle Hover Glow */}
                      <div
                        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: `radial-gradient(400px circle at 15% 50%, ${track.accentColor}14, transparent 70%)`,
                        }}
                      />

                      <div className="relative z-10 flex items-center gap-4 sm:gap-6 min-w-0">
                        {/* Track Index or Animated EQ */}
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/[0.04] border border-white/10 group-hover:border-white/25 flex items-center justify-center shrink-0 transition-colors">
                          {isTrackPlaying ? (
                            <div className="flex items-end gap-[3px] h-5">
                              <span className="w-[3px] h-full bg-[#E2FF32] rounded-full eq-bar-1" />
                              <span className="w-[3px] h-full bg-[#E2FF32] rounded-full eq-bar-2" />
                              <span className="w-[3px] h-full bg-[#E2FF32] rounded-full eq-bar-3" />
                              <span className="w-[3px] h-full bg-[#E2FF32] rounded-full eq-bar-4" />
                            </div>
                          ) : (
                            <Play
                              size={18}
                              fill="currentColor"
                              className={`ml-0.5 transition-colors ${
                                isCurrent ? "text-[#E2FF32]" : "text-zinc-400 group-hover:text-white"
                              }`}
                            />
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2.5">
                            <span className="text-[10px] font-mono-tech uppercase tracking-[0.2em] text-zinc-500">
                              0{index + 1}
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-white/[0.05] text-[10px] uppercase tracking-widest text-zinc-300">
                              {track.type}
                            </span>
                            <span className="hidden sm:inline text-[10px] uppercase tracking-widest text-zinc-500">
                              {track.bpm} BPM
                            </span>
                          </div>
                          <h3
                            className={`font-display font-bold text-lg sm:text-2xl uppercase tracking-tight truncate mt-1 transition-colors ${
                              isCurrent ? "text-[#E2FF32]" : "text-white group-hover:text-[#E2FF32]"
                            }`}
                          >
                            {track.title}
                          </h3>
                          <p className="text-xs text-zinc-500 truncate mt-0.5">
                            {track.subtitle} • {track.year}
                          </p>
                        </div>
                      </div>

                      <div className="relative z-10 flex items-center gap-4 shrink-0">
                        <span className="hidden sm:block text-xs font-mono-tech text-zinc-400">
                          {track.duration}
                        </span>
                        <span
                          className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 ${
                            isTrackPlaying
                              ? "bg-[#E2FF32] text-black border-[#E2FF32]"
                              : "border-white/10 text-zinc-400 group-hover:border-white/30 group-hover:text-white"
                          }`}
                        >
                          <Disc3 size={16} className={isTrackPlaying ? "animate-spin-vinyl" : ""} />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
