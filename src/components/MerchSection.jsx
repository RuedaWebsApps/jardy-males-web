import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Check, Lock, ArrowUpRight } from 'lucide-react';
import { MERCH_PRODUCTS } from '../data/artistData';

function CustomGarmentArtwork({ type }) {
  if (type === "tee") {
    return (
      <div className="w-full h-full bg-[#0c0c0f] relative flex items-center justify-center p-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.09),transparent_65%)]" />
        {/* Architectural Boxy Heavyweight Tee Vector Silhouette */}
        <svg viewBox="0 0 260 260" className="w-4/5 h-4/5 drop-shadow-[0_24px_35px_rgba(0,0,0,0.9)]">
          <defs>
            <linearGradient id="teeFabric" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#26262b" />
              <stop offset="50%" stopColor="#17171b" />
              <stop offset="100%" stopColor="#0d0d10" />
            </linearGradient>
          </defs>
          <path
            d="M82 36 C100 48, 160 48, 178 36 L236 68 L214 122 L186 110 L186 226 L74 226 L74 110 L46 122 L24 68 Z"
            fill="url(#teeFabric)"
            stroke="rgba(255,255,255,0.16)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M92 39 C110 52, 150 52, 168 39"
            fill="none"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="4"
          />
          {/* Center Chrome Chest Print */}
          <rect x="98" y="84" width="64" height="74" rx="4" fill="none" stroke="#E2FF32" strokeWidth="1.2" opacity="0.8" />
          <text x="130" y="116" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="800" letterSpacing="3">
            JARDY
          </text>
          <text x="130" y="132" textAnchor="middle" fill="#E2FF32" fontSize="8" fontWeight="700" letterSpacing="2.5">
            AUSTIN TX
          </text>
          <line x1="108" y1="144" x2="152" y2="144" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
        </svg>
      </div>
    );
  }

  // Structured Snapback Cap Vector Render
  return (
    <div className="w-full h-full bg-[#0c0c0f] relative flex items-center justify-center p-8 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(226,255,50,0.08),transparent_65%)]" />
      <svg viewBox="0 0 260 220" className="w-4/5 h-4/5 drop-shadow-[0_24px_35px_rgba(0,0,0,0.9)]">
        <defs>
          <linearGradient id="capCrown" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#28282e" />
            <stop offset="100%" stopColor="#111115" />
          </linearGradient>
        </defs>
        {/* Crown */}
        <path
          d="M52 135 C52 68, 92 44, 134 44 C178 44, 210 72, 210 135 Z"
          fill="url(#capCrown)"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="2"
        />
        {/* Top Button & Panel Seam */}
        <ellipse cx="133" cy="43" rx="6" ry="3" fill="#3f3f46" />
        <path d="M133 45 C128 78, 126 105, 126 135" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" fill="none" />
        {/* Flat Visor / Brim */}
        <path
          d="M36 135 C78 126, 174 128, 232 146 C214 166, 126 170, 26 148 Z"
          fill="#09090c"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="2"
        />
        {/* 3D Metallic Embroidery JM */}
        <text x="132" y="106" textAnchor="middle" fill="#E2FF32" fontSize="24" fontWeight="900" letterSpacing="2">
          JM
        </text>
      </svg>
    </div>
  );
}

export default function MerchSection({ onAddToCart }) {
  const [selectedSizes, setSelectedSizes] = useState({
    "drop-hoodie": "L",
    "drop-tee": "L",
    "drop-cap": "ÚNICA",
  });
  const [justAddedId, setJustAddedId] = useState(null);
  const [vaultEmail, setVaultEmail] = useState("");
  const [vaultJoined, setVaultJoined] = useState(false);

  const handleAdd = (product) => {
    const size = selectedSizes[product.id] || product.sizes[0];
    onAddToCart(product, size);
    setJustAddedId(product.id);
    setTimeout(() => setJustAddedId(null), 1300);
  };

  const handleVaultSubmit = (e) => {
    e.preventDefault();
    if (!vaultEmail.trim()) return;
    setVaultJoined(true);
    setVaultEmail("");
  };

  return (
    <section id="tienda" className="relative py-28 sm:py-36 px-4 bg-[#070709] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: 32, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#E2FF32]/10 border border-[#E2FF32]/30 text-[10px] uppercase tracking-[0.22em] text-[#E2FF32] font-bold mb-4">
              Capsule 001 • Cantidades Limitadas
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-6xl uppercase tracking-[-0.03em] leading-[0.95]">
              Merch & <span className="text-stroke">Streetwear</span>
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-sm">
            Prendas de alto gramaje diseñadas en Austin. Envío directo a todo EE. UU., México y Latinoamérica.
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {MERCH_PRODUCTS.map((product, idx) => {
            const activeSize = selectedSizes[product.id];
            const isAdded = justAddedId === product.id;

            return (
              <motion.div
                key={product.id}
                initial={{ y: 36, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.08,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="double-bezel-outer group flex flex-col"
              >
                <div className="double-bezel-inner p-5 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Visual Container */}
                    <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 mb-5 bg-[#0c0c0f]">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                        />
                      ) : (
                        <div className="w-full h-full group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]">
                          <CustomGarmentArtwork type={product.type} />
                        </div>
                      )}

                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-bold uppercase tracking-[0.18em] text-[#E2FF32]">
                        {product.badge}
                      </span>
                    </div>

                    {/* Specs & Title */}
                    <p className="text-[10px] font-mono-tech uppercase tracking-[0.18em] text-zinc-500">
                      {product.spec}
                    </p>
                    <h3 className="font-display font-bold text-xl uppercase tracking-tight text-white mt-1">
                      {product.name}
                    </h3>
                  </div>

                  {/* Size Selector & Add CTA */}
                  <div className="pt-5 mt-5 border-t border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                        Talla
                      </span>
                      <div className="flex items-center gap-1.5">
                        {product.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() =>
                              setSelectedSizes((prev) => ({ ...prev, [product.id]: size }))
                            }
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono-tech font-bold transition cursor-pointer ${
                              activeSize === size
                                ? "bg-white text-black"
                                : "bg-white/[0.04] text-zinc-400 hover:text-white border border-white/10"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <span className="font-display font-extrabold text-2xl text-white">
                        ${product.price}
                      </span>

                      <button
                        onClick={() => handleAdd(product)}
                        className={`flex items-center gap-2.5 pl-5 pr-2 py-2 rounded-full text-xs font-bold uppercase tracking-[0.15em] active:scale-[0.97] transition-all cursor-pointer ${
                          isAdded
                            ? "bg-[#E2FF32] text-black"
                            : "bg-white text-black hover:bg-[#E2FF32]"
                        }`}
                      >
                        <span>{isAdded ? "Agregado" : "Añadir"}</span>
                        <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center">
                          {isAdded ? <Check size={14} className="text-[#E2FF32]" /> : <Plus size={14} />}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* The Vault // Secret Fan Club Drop Banner */}
        <motion.div
          initial={{ y: 32, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
          className="mt-14 double-bezel-outer"
        >
          <div className="double-bezel-inner p-7 sm:p-10 bg-gradient-to-r from-[#0e0e12] via-[#12130c] to-[#0b0b0e] flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[#E2FF32] font-bold">
                <Lock size={12} /> Private Club • Acceso Anticipado
              </div>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl uppercase tracking-tight">
                Desbloquea el Vault Secreto de Jardy Males
              </h3>
              <p className="text-sm text-zinc-400">
                Recibe contraseñas para drops privados, demos inéditos desde el estudio y preventas de boletos antes que nadie.
              </p>
            </div>

            {vaultJoined ? (
              <div className="px-6 py-4 rounded-2xl bg-[#E2FF32]/15 border border-[#E2FF32]/40 text-[#E2FF32] text-xs font-bold uppercase tracking-[0.18em]">
                ✓ Estás dentro de la lista VIP oficial
              </div>
            ) : (
              <form onSubmit={handleVaultSubmit} className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <input
                  type="email"
                  required
                  value={vaultEmail}
                  onChange={(e) => setVaultEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  className="px-5 py-3.5 rounded-full bg-black/70 border border-white/15 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#E2FF32] min-w-[250px]"
                />
                <button
                  type="submit"
                  className="group flex items-center justify-center gap-3 bg-[#E2FF32] hover:bg-white text-black pl-6 pr-2 py-2 rounded-full text-xs font-bold uppercase tracking-[0.16em] active:scale-[0.97] transition cursor-pointer"
                >
                  <span>Unirme</span>
                  <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                    <ArrowUpRight size={15} />
                  </span>
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
