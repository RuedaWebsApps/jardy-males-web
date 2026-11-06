import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, ArrowUpRight } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, items, onUpdateQty, onRemove }) {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleCheckoutWhatsApp = () => {
    const summary = items
      .map((i) => `• ${i.qty}x ${i.name} (Talla ${i.size}) - $${i.price * i.qty}`)
      .join("%0A");
    const url = `https://wa.me/17374316711?text=Hola%20equipo%20Jardy%20Males%2C%20quiero%20ordenar%20del%20Drop%20001%3A%0A${summary}%0ATotal%3A%20%24${subtotal}%20USD`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-[#09090c] border-l border-white/12 p-6 sm:p-8 flex flex-col justify-between shadow-2xl"
          >
            <div className="flex items-center justify-between pb-5 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <ShoppingBag size={18} className="text-[#E2FF32]" />
                <h3 className="font-display font-extrabold text-lg uppercase tracking-wider">
                  Tu Drop Oficial
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-zinc-300 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto py-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-500">
                    <ShoppingBag size={22} />
                  </div>
                  <p className="font-display font-bold text-base uppercase text-zinc-300">
                    Tu bolsa está vacía
                  </p>
                  <p className="text-xs text-zinc-500 max-w-xs">
                    Explora las prendas de alto gramaje de la cápsula Drop 001 antes de que se agoten.
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#E2FF32]">
                        Talla {item.size}
                      </span>
                      <h4 className="font-display font-bold text-sm uppercase text-white truncate mt-0.5">
                        {item.name}
                      </h4>
                      <p className="text-xs text-zinc-400 mt-1">${item.price} USD c/u</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onUpdateQty(item.id, item.size, item.qty - 1)}
                        className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold cursor-pointer"
                      >
                        -
                      </button>
                      <span className="font-mono-tech text-xs font-bold w-5 text-center">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item.id, item.size, item.qty + 1)}
                        className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold cursor-pointer"
                      >
                        +
                      </button>
                      <button
                        onClick={() => onRemove(item.id, item.size)}
                        className="w-7 h-7 rounded-full hover:bg-red-500/20 text-zinc-500 hover:text-red-400 flex items-center justify-center ml-1 cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Checkout */}
            {items.length > 0 && (
              <div className="pt-5 border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                    Subtotal Estimado
                  </span>
                  <span className="font-display font-extrabold text-2xl text-white">
                    ${subtotal} USD
                  </span>
                </div>

                <button
                  onClick={handleCheckoutWhatsApp}
                  className="w-full flex items-center justify-between bg-[#E2FF32] hover:bg-white text-black pl-6 pr-2 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.16em] active:scale-[0.98] transition cursor-pointer"
                >
                  <span>Ordenar vía Directo Oficial</span>
                  <span className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center">
                    <ArrowUpRight size={16} />
                  </span>
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
