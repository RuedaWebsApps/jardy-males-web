import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, Copy, Check, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const email = "redesnegocios011@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contacto" className="relative pt-24 pb-16 px-4 bg-[#040405] border-t border-white/[0.08] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10"
        >
          {/* Booking Callout */}
          <div className="lg:col-span-7 space-y-5">
            <span className="inline-block px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] uppercase tracking-[0.22em] text-[#E2FF32] font-bold">
              Management & Booking Internacional
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight leading-none">
              Lleva el show de <span className="font-editorial italic font-normal text-zinc-300">Jardy Males</span> a tu ciudad
            </h2>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/12 text-xs font-mono-tech text-white transition active:scale-[0.98] cursor-pointer"
              >
                <Mail size={14} className="text-[#E2FF32]" />
                <span>{email}</span>
                {copied ? (
                  <span className="inline-flex items-center gap-1 text-[#E2FF32] font-bold">
                    <Check size={13} /> Copiado
                  </span>
                ) : (
                  <Copy size={13} className="text-zinc-400" />
                )}
              </button>

              <a
                href="tel:+17374316711"
                className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/12 text-xs font-mono-tech text-white transition"
              >
                <Phone size={14} className="text-[#E2FF32]" />
                <span>+1 (737) 431-6711</span>
              </a>
            </div>
          </div>

          {/* Social Ecosystem Links */}
          <div className="lg:col-span-5 flex flex-col justify-between lg:items-end gap-6">
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Instagram", href: "https://www.instagram.com/jardymales" },
                { label: "TikTok", href: "https://www.tiktok.com/@jardymales" },
                { label: "Spotify", href: "https://open.spotify.com" },
                { label: "YouTube", href: "https://youtube.com" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.03] hover:bg-[#E2FF32] hover:text-black border border-white/10 text-xs font-bold uppercase tracking-[0.15em] transition-all duration-200"
                >
                  <span>{social.label}</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              ))}
            </div>

            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Austin, Texas • Estados Unidos
            </p>
          </div>
        </motion.div>

        {/* Monumental Display Wordmark */}
        <div className="py-8 select-none overflow-hidden text-center">
          <p className="font-display font-extrabold text-[13vw] leading-[0.85] tracking-[-0.04em] uppercase text-white/[0.06] hover:text-white/[0.12] transition-colors duration-500">
            JARDY MALES
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] uppercase tracking-[0.2em] text-zinc-500 pt-4">
          <span>© 2026 Jardy Males. Todos los derechos reservados.</span>
          <span>
            Desarrollado por <strong className="text-zinc-300">Rueda la Rola Media</strong>
          </span>
        </div>
      </div>
    </footer>
  );
}
