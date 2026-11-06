import React, { createContext, useContext, useState, useEffect } from 'react';

const TRANSLATIONS = {
  es: {
    nav: {
      music: "Música",
      universe: "Universo",
      tour: "Tour '26",
      merch: "Drop 001",
      booking: "Booking",
      dropBtn: "Drop",
      mobileHeader: "Navegación Oficial • Austin TX",
      pauseAudio: "Pausar audio",
      playAudio: "Reproducir audio",
    },
    hero: {
      outNow: "OUT NOW",
      eyebrow: "Nuevo Sencillo “Noche en Austin”",
      description:
        "Sonido urbano nocturno, lírica cruda y pulso de estadio. Fusionando la calle latina con la energía underground de Texas en una nueva era visual y sonora.",
      ctaPlay: "Escuchar ‘Noche en Austin’",
      ctaPause: "Pausar Preview",
      ctaTour: "Fechas Tour ’26",
      statStreams: "Streams Globales",
      statShows: "Shows Texas ’26",
      statMerch: "Merch Limitado",
      playingBeat: "Reproduciendo Beat",
      leadSingleClick: "Lead Single • Click Play",
      marquee: [
        "JARDY MALES",
        "NOCHE EN AUSTIN — DISPONIBLE AHORA",
        "TEXAS TOUR 2026",
        "DROP 001 STREETWEAR CAPSULE",
        "DESDE AUSTIN PAL MUNDO",
      ],
    },
    music: {
      eyebrow: "Catálogo Sonoro Oficial",
      titleMain: "Música &",
      titleAccent: "Lanzamientos",
      filterAll: "Todos",
      filterSingles: "Singles",
      filterEP: "EP",
      streamsSuffix: "Streams",
      playPreview: "Escuchar Preview",
      pauseBeat: "Pausar Beat",
    },
    visual: {
      eyebrow: "Dirección Creativa & Visuales",
      titleMain: "Universo",
      titleStroke: "Nocturno",
      description:
        "Cada lanzamiento se construye como un cortometraje urbano: asfalto mojado, sesiones de madrugada en Austin y estética cruda sin filtros.",
      visualizerBadge: "Visualizer Oficial • 4K",
      chapter: "Capítulo I",
      filmTitle: "Noche en Austin (Film)",
      card1Tag: "01 // ADN Sonoro",
      card1Title: "De la libreta al sub-bajo 808",
      card1Body:
        "Composición de autor fusionada con percusión urbana pesada, sintetizadores analógicos oscuros y melodías que conectan en vivo.",
      card1Footer: "Frecuencia Base • 432Hz / 94 BPM",
      card2Tag: "En Rotación Continua",
      card2Title: "Texas Urban Wave",
      modalActive: "Visualizer Canvas Activo",
      modalQuote: "“Luces rojas en el vidrio empañado...”",
      modalCta: "Activar Audio Sintetizado en Vivo",
    },
    tour: {
      eyebrow: "Texas Tour 2026",
      titleMain: "Fechas",
      titleAccent: "En Vivo",
      subtitle: "4 Paradas Oficiales • Producción Inmersiva",
      lowTickets: "Últimos Boletos",
      from: "Desde",
      ticketsBtn: "Boletos",
      soldOutBtn: "Sold Out",
      modalEyebrow: "Taquilla Oficial",
      reservedTitle: "¡Pre-Reserva Registrada!",
      reservedBody1: "Tus",
      reservedBody2: "accesos",
      reservedBody3: "para",
      reservedBody4: "están listos para continuar con el checkout oficial.",
      doneBtn: "Listo",
      generalDesc: "Acceso cancha general",
      vipDesc: "Primera fila + Foto backstage",
      qtyLabel: "Cantidad de Boletos",
      totalLabel: "Total Estimado",
      confirmBtn: "Asegurar Boletos",
    },
    merch: {
      eyebrow: "Capsule 001 • Cantidades Limitadas",
      titleMain: "Merch &",
      titleStroke: "Streetwear",
      description:
        "Prendas de alto gramaje diseñadas en Austin. Envío directo a todo EE. UU., México y Latinoamérica.",
      sizeLabel: "Talla",
      oneSize: "ÚNICA",
      addBtn: "Añadir",
      addedBtn: "Agregado",
      vaultEyebrow: "Private Club • Acceso Anticipado",
      vaultTitle: "Desbloquea el Vault Secreto de Jardy Males",
      vaultDesc:
        "Recibe contraseñas para drops privados, demos inéditos desde el estudio y preventas de boletos antes que nadie.",
      vaultSuccess: "✓ Estás dentro de la lista VIP oficial",
      vaultPlaceholder: "tu@correo.com",
      vaultBtn: "Unirme",
    },
    cart: {
      title: "Tu Drop Oficial",
      emptyTitle: "Tu bolsa está vacía",
      emptyDesc:
        "Explora las prendas de alto gramaje de la cápsula Drop 001 antes de que se agoten.",
      sizePrefix: "Talla",
      unitSuffix: "USD c/u",
      subtotal: "Subtotal Estimado",
      checkoutBtn: "Ordenar vía Directo Oficial",
      waIntro: "Hola equipo Jardy Males, quiero ordenar del Drop 001:",
      waSize: "Talla",
      waTotal: "Total",
    },
    player: {
      prev: "Anterior",
      next: "Siguiente",
      pause: "Pausar",
      play: "Reproducir",
      mute: "Silenciar",
      close: "Cerrar reproductor",
    },
    footer: {
      eyebrow: "Management & Booking Internacional",
      titlePart1: "Lleva el show de",
      titlePart2: "a tu ciudad",
      copied: "Copiado",
      location: "Austin, Texas • Estados Unidos",
      rights: "© 2026 Jardy Males. Todos los derechos reservados.",
      developedBy: "Desarrollado por",
    },
  },
  en: {
    nav: {
      music: "Music",
      universe: "Universe",
      tour: "Tour '26",
      merch: "Drop 001",
      booking: "Booking",
      dropBtn: "Drop",
      mobileHeader: "Official Navigation • Austin TX",
      pauseAudio: "Pause audio",
      playAudio: "Play audio",
    },
    hero: {
      outNow: "OUT NOW",
      eyebrow: "New Official Single “Noche en Austin”",
      description:
        "Late-night urban sound, raw lyricism, and stadium energy. Merging Latin street culture with Texas underground grit into a bold new sonic and visual era.",
      ctaPlay: "Stream ‘Noche en Austin’",
      ctaPause: "Pause Preview",
      ctaTour: "Tour Dates ’26",
      statStreams: "Global Streams",
      statShows: "Texas ’26 Shows",
      statMerch: "Limited Merch",
      playingBeat: "Playing Live Beat",
      leadSingleClick: "Lead Single • Click Play",
      marquee: [
        "JARDY MALES",
        "NOCHE EN AUSTIN — STREAMING NOW",
        "TEXAS TOUR 2026",
        "DROP 001 STREETWEAR CAPSULE",
        "FROM AUSTIN TO THE WORLD",
      ],
    },
    music: {
      eyebrow: "Official Sound Catalog",
      titleMain: "Music &",
      titleAccent: "Releases",
      filterAll: "All",
      filterSingles: "Singles",
      filterEP: "EP",
      streamsSuffix: "Streams",
      playPreview: "Play Preview",
      pauseBeat: "Pause Beat",
    },
    visual: {
      eyebrow: "Creative Direction & Visuals",
      titleMain: "Nocturnal",
      titleStroke: "Universe",
      description:
        "Every release is crafted like an urban short film: rain-slicked asphalt, 4 AM Austin studio sessions, and unfiltered raw aesthetics.",
      visualizerBadge: "Official Visualizer • 4K",
      chapter: "Chapter I",
      filmTitle: "Noche en Austin (Film)",
      card1Tag: "01 // Sonic DNA",
      card1Title: "From the notebook to the 808 sub-bass",
      card1Body:
        "Signature songwriting fused with heavy urban percussion, dark analog synths, and hooks built to erupt live on stage.",
      card1Footer: "Base Frequency • 432Hz / 94 BPM",
      card2Tag: "In Heavy Rotation",
      card2Title: "Texas Urban Wave",
      modalActive: "Visualizer Canvas Live",
      modalQuote: "“Red lights on the fogged-up glass...”",
      modalCta: "Trigger Live Synthesized Beat",
    },
    tour: {
      eyebrow: "Texas Tour 2026",
      titleMain: "Live",
      titleAccent: "Tour Dates",
      subtitle: "4 Official Stops • Full Stage Production",
      lowTickets: "Low Tickets",
      from: "From",
      ticketsBtn: "Tickets",
      soldOutBtn: "Sold Out",
      modalEyebrow: "Official Box Office",
      reservedTitle: "Pre-Reservation Locked!",
      reservedBody1: "Your",
      reservedBody2: "passes",
      reservedBody3: "for",
      reservedBody4: "are ready to proceed to official checkout.",
      doneBtn: "Done",
      generalDesc: "General standing floor access",
      vipDesc: "Front row + Backstage photo op",
      qtyLabel: "Ticket Quantity",
      totalLabel: "Estimated Total",
      confirmBtn: "Lock In Tickets",
    },
    merch: {
      eyebrow: "Capsule 001 • Limited Quantities",
      titleMain: "Merch &",
      titleStroke: "Streetwear",
      description:
        "Heavyweight garments engineered in Austin. Direct shipping across the US, Mexico, and Latin America.",
      sizeLabel: "Size",
      oneSize: "ONE SIZE",
      addBtn: "Add to Bag",
      addedBtn: "Added",
      vaultEyebrow: "Private Club • Early Access",
      vaultTitle: "Unlock the Jardy Males Secret Vault",
      vaultDesc:
        "Get private drop passwords, unreleased studio demos, and early-bird tour presale codes before anyone else.",
      vaultSuccess: "✓ You’re on the official VIP list",
      vaultPlaceholder: "you@email.com",
      vaultBtn: "Join Vault",
    },
    cart: {
      title: "Your Official Drop",
      emptyTitle: "Your bag is empty",
      emptyDesc:
        "Explore heavyweight pieces from Capsule Drop 001 before they sell out.",
      sizePrefix: "Size",
      unitSuffix: "USD ea",
      subtotal: "Estimated Subtotal",
      checkoutBtn: "Order via Official Direct",
      waIntro: "Hi Jardy Males team, I want to order from Drop 001:",
      waSize: "Size",
      waTotal: "Total",
    },
    player: {
      prev: "Previous",
      next: "Next",
      pause: "Pause",
      play: "Play",
      mute: "Mute",
      close: "Close player",
    },
    footer: {
      eyebrow: "International Management & Booking",
      titlePart1: "Bring the",
      titlePart2: "live show to your city",
      copied: "Copied",
      location: "Austin, Texas • United States",
      rights: "© 2026 Jardy Males. All rights reserved.",
      developedBy: "Developed by",
    },
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem("jm_lang");
      return saved === "en" || saved === "es" ? saved : "es";
    } catch {
      return "es";
    }
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem("jm_lang", lang);
    } catch {
      // ignore storage restrictions
    }
  }, [lang]);

  const t = TRANSLATIONS[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
