import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Ticket, ArrowUpRight, X, CheckCircle2, Clock } from 'lucide-react';
import { TOUR_DATES } from '../data/artistData';

export default function TourSection() {
  const [selectedShow, setSelectedShow] = useState(null);
  const [tier, setTier] = useState("general");
  const [qty, setQty] = useState(2);
  const [reserved, setReserved] = useState(false);

  const openModal = (show) => {
    if (show.status === "Agotado") return;
    setSelectedShow(show);
    setTier("general");
    setQty(2);
    setReserved(false);
  };

  const unitPrice = selectedShow
    ? tier === "vip"
      ? selectedShow.priceVip
      : selectedShow.priceGeneral
    : 0;

  return (
    <section id="tour" className="relative py-28 sm:py-36 px-4 bg-[#050505] border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: 32, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] uppercase tracking-[0.22em] text-[#E2FF32] font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E2FF32] animate-ping" /> Texas Tour 2026
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-6xl uppercase tracking-[-0.03em] leading-[0.95]">
              Fechas <span className="font-editorial italic font-normal text-zinc-300">En Vivo</span>
            </h2>
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            4 Paradas Oficiales • Producción Inmersiva
          </p>
        </motion.div>

        {/* Interactive Tour Rows */}
        <div className="space-y-3">
          {TOUR_DATES.map((show, idx) => {
            const isSoldOut = show.status === "Agotado";
            const isLow = show.status === "Pocas Entradas";

            return (
              <motion.div
                key={show.id}
                initial={{ y: 28, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.07,
                  ease: [0.23, 1, 0.32, 1],
                }}
                onClick={() => openModal(show)}
                className={`double-bezel-outer group ${
                  isSoldOut ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <div className="double-bezel-inner px-5 sm:px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden">
                  {!isSoldOut && (
                    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#E2FF32]/[0.06] via-transparent to-transparent" />
                  )}

                  {/* Left: Date Badge + Venue */}
                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                    <div className="flex sm:flex-col items-baseline sm:items-start gap-2 sm:gap-0 min-w-[100px]">
                      <span className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-white group-hover:text-[#E2FF32] transition-colors">
                        {show.date}
                      </span>
                      <span className="text-[11px] font-mono-tech uppercase tracking-[0.2em] text-zinc-500">
                        {show.year}
                      </span>
                    </div>

                    <div className="sm:border-l sm:border-white/10 sm:pl-8">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="font-display font-bold text-xl sm:text-2xl uppercase tracking-tight text-white">
                          {show.city}
                        </h3>
                        {isLow && (
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-[10px] font-bold uppercase tracking-widest">
                            Últimos Boletos
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-400 flex flex-wrap items-center gap-3 mt-1">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin size={13} className="text-[#E2FF32]" /> {show.venue}
                        </span>
                        <span className="text-zinc-600">•</span>
                        <span className="inline-flex items-center gap-1 text-zinc-500">
                          <Clock size={12} /> {show.doors}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Right: Price & CTA */}
                  <div className="relative z-10 flex items-center justify-between md:justify-end gap-5 pt-3 md:pt-0 border-t md:border-t-0 border-white/10">
                    {!isSoldOut && (
                      <div className="text-left md:text-right">
                        <span className="block text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                          Desde
                        </span>
                        <span className="font-display font-bold text-lg text-white">
                          ${show.priceGeneral} USD
                        </span>
                      </div>
                    )}

                    <button
                      disabled={isSoldOut}
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(show);
                      }}
                      className={`flex items-center gap-3 rounded-full text-xs font-bold uppercase tracking-[0.16em] transition-all duration-200 ${
                        isSoldOut
                          ? "px-6 py-3 bg-zinc-900 text-zinc-500 border border-white/5 cursor-not-allowed"
                          : "pl-5 pr-2 py-2 bg-white text-black group-hover:bg-[#E2FF32] active:scale-[0.97] cursor-pointer"
                      }`}
                    >
                      <span>{isSoldOut ? "Sold Out" : "Boletos"}</span>
                      {!isSoldOut && (
                        <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                          <ArrowUpRight size={15} />
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Interactive Ticket Reservation Stub Modal */}
      <AnimatePresence>
        {selectedShow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedShow(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-2xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 12 }}
              transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="double-bezel-outer w-full max-w-lg"
            >
              <div className="double-bezel-inner p-6 sm:p-8 space-y-6">
                <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-[#E2FF32] font-bold">
                      Taquilla Oficial • {selectedShow.date} {selectedShow.year}
                    </span>
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl uppercase mt-1">
                      {selectedShow.city}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      {selectedShow.venue} • {selectedShow.neighborhood}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedShow(null)}
                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-zinc-300 cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                {reserved ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-6 text-center space-y-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#E2FF32]/15 border border-[#E2FF32]/40 text-[#E2FF32] flex items-center justify-center mx-auto">
                      <CheckCircle2 size={28} />
                    </div>
                    <h4 className="font-display font-bold text-2xl uppercase">
                      ¡Pre-Reserva Registrada!
                    </h4>
                    <p className="text-sm text-zinc-400 max-w-sm mx-auto">
                      Tus {qty} accesos ({tier === "vip" ? "VIP Meet & Greet" : "General Floor"}) para{" "}
                      <strong className="text-white">{selectedShow.venue}</strong> están listos para continuar con el checkout oficial.
                    </p>
                    <button
                      onClick={() => setSelectedShow(null)}
                      className="mt-2 px-6 py-3 rounded-full bg-[#E2FF32] text-black text-xs font-bold uppercase tracking-[0.18em] cursor-pointer"
                    >
                      Listo
                    </button>
                  </motion.div>
                ) : (
                  <>
                    {/* Tier Selector */}
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setTier("general")}
                        className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
                          tier === "general"
                            ? "border-[#E2FF32] bg-[#E2FF32]/10"
                            : "border-white/10 bg-white/[0.02] hover:border-white/25"
                        }`}
                      >
                        <span className="block text-[10px] uppercase tracking-widest text-zinc-400">
                          General Floor
                        </span>
                        <span className="font-display font-extrabold text-2xl text-white mt-1 block">
                          ${selectedShow.priceGeneral}
                        </span>
                        <span className="text-[11px] text-zinc-500">Acceso cancha general</span>
                      </button>

                      <button
                        onClick={() => setTier("vip")}
                        className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
                          tier === "vip"
                            ? "border-[#E2FF32] bg-[#E2FF32]/10"
                            : "border-white/10 bg-white/[0.02] hover:border-white/25"
                        }`}
                      >
                        <span className="block text-[10px] uppercase tracking-widest text-[#E2FF32] font-bold">
                          VIP + Meet & Greet
                        </span>
                        <span className="font-display font-extrabold text-2xl text-white mt-1 block">
                          ${selectedShow.priceVip}
                        </span>
                        <span className="text-[11px] text-zinc-500">Primera fila + Foto backstage</span>
                      </button>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                      <span className="text-xs uppercase tracking-[0.18em] text-zinc-300">
                        Cantidad de Boletos
                      </span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setQty((q) => Math.max(1, q - 1))}
                          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold cursor-pointer"
                        >
                          -
                        </button>
                        <span className="font-mono-tech font-bold text-base w-6 text-center">
                          {qty}
                        </span>
                        <button
                          onClick={() => setQty((q) => Math.min(8, q + 1))}
                          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Total & Confirm */}
                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <span className="block text-[10px] uppercase tracking-widest text-zinc-500">
                          Total Estimado
                        </span>
                        <span className="font-display font-extrabold text-2xl text-white">
                          ${unitPrice * qty} USD
                        </span>
                      </div>

                      <button
                        onClick={() => setReserved(true)}
                        className="flex items-center gap-3 bg-[#E2FF32] hover:bg-white text-black px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.16em] active:scale-[0.97] transition cursor-pointer"
                      >
                        <Ticket size={15} /> Asegurar Boletos
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
