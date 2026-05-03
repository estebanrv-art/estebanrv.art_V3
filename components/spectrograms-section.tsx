"use client";

import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

interface SpectrogramItem {
  id: string;
  titleEs: string;
  title: string;
  // TODO: update year for each spectrogram to match the piece's composition/recording year
  year: string;
  imageSrc: string;
  // TODO: update descriptions with accurate program notes for each spectrogram
  descriptionEs: string;
  description: string;
}

interface SpectrogramGroup {
  id: string;
  labelEs: string;
  label: string;
  items: SpectrogramItem[];
  sizeClass?: 'large' | 'medium' | 'small';
}

const BASE = "/images/spectrograms/";

const spectrogramGroups: SpectrogramGroup[] = [
  {
    id: "chicharra",
    labelEs: "Chicharra",
    label: "Chicharra",
    sizeClass: "large",
    items: [
      {
        id: "sg01",
        titleEs: "Chicharra Jiutepec 2",
        title: "Jiutepec Cicada 2",
        year: "2017",
        imageSrc: BASE + "chicharra_zoom2.webp",
        descriptionEs: "Detalle espectral de Chicharra.",
        description: "Spectral detail of Chicharra.",
      },
      {
        id: "sg02",
        titleEs: "Chicharra Jiutepec 4",
        title: "Jiutepec Cicada 4",
        year: "2017",
        imageSrc: BASE + "chiharron_jiute_lejos.webp",
        descriptionEs: "Grabación de campo: chicharra desde lejos en Jiutepec.",
        description: "Field recording: cicada from a distance in Jiutepec.",
      },
    ],
  },
  {
    id: "ecolalia2",
    labelEs: "Ecolalia 2",
    label: "Ecolalia 2",
    sizeClass: "medium",
    items: [
      {
        id: "sg03",
        titleEs: "Mix",
        title: "Mix",
        year: "2021",
        imageSrc: BASE + "Ecolalia_2_Mix.webp",
        descriptionEs: "Canal mixto de Ecolalia 2.",
        description: "Mixed channel of Ecolalia 2.",
      },
      {
        id: "sg04",
        titleEs: "L",
        title: "L",
        year: "2021",
        imageSrc: BASE + "Ecolalia_2_L.webp",
        descriptionEs: "Canal izquierdo de Ecolalia 2.",
        description: "Left channel of Ecolalia 2.",
      },
      {
        id: "sg05",
        titleEs: "R",
        title: "R",
        year: "2021",
        imageSrc: BASE + "Ecolalia_2_R.webp",
        descriptionEs: "Canal derecho de Ecolalia 2.",
        description: "Right channel of Ecolalia 2.",
      },
      {
        id: "sg06",
        titleEs: "Full",
        title: "Full",
        year: "2021",
        imageSrc: BASE + "Ecolalia2_full.webp",
        descriptionEs: "Vista completa del espectrograma.",
        description: "Full spectrogram view.",
      },
      {
        id: "sg07",
        titleEs: "Final",
        title: "Ending",
        year: "2021",
        imageSrc: BASE + "Ecolalia2_final.webp",
        descriptionEs: "Sección final del espectrograma.",
        description: "Final section of the spectrogram.",
      },
      {
        id: "sg08",
        titleEs: "Zoom 1",
        title: "Zoom 1",
        year: "2021",
        imageSrc: BASE + "Ecolalia2_zoom1.webp",
        descriptionEs: "Detalle ampliado — sección 1.",
        description: "Zoomed detail — section 1.",
      },
      {
        id: "sg09",
        titleEs: "Zoom 2",
        title: "Zoom 2",
        year: "2021",
        imageSrc: BASE + "Ecolalia2_zoom2.webp",
        descriptionEs: "Detalle ampliado — sección 2.",
        description: "Zoomed detail — section 2.",
      },
    ],
  },
  {
    id: "semantica",
    labelEs: "Traslación Semántica",
    label: "Semantic Shift",
    sizeClass: "medium",
    items: [
      {
        id: "sg10",
        titleEs: "Guadañas/ambulancias",
        title: "Scythes/Ambulances",
        year: "2018",
        imageSrc: BASE + "semantica1_guadanas_ambulancias.webp",
        descriptionEs: "Análisis semántico del sonido: guadañas y ambulancias.",
        description: "Semantic analysis of sound: scythes and ambulances.",
      },
      {
        id: "sg11",
        titleEs: "Lluvia/Gotas",
        title: "Rain/Drops",
        year: "2018",
        imageSrc: BASE + "semantica2_Lluvia.webp",
        descriptionEs: "Análisis semántico: lluvia.",
        description: "Semantic analysis: rain.",
      },
      {
        id: "sg12",
        titleEs: "Microondas/Artificial",
        title: "Microwave/Artificial",
        year: "2019",
        imageSrc: BASE + "semantica3_microondas.webp",
        descriptionEs: "Análisis semántico: microondas.",
        description: "Semantic analysis: microwaves.",
      },
      {
        id: "sg13",
        titleEs: "Chicharra/Natural",
        title: "Cicada/Natural",
        year: "2017",
        imageSrc: BASE + "semantica4_chicharra_mantenida.webp",
        descriptionEs: "Análisis semántico: chicharra sostenida.",
        description: "Semantic analysis: sustained cicada.",
      },
    ],
  },
  {
    id: "armonicos",
    labelEs: "Armónicos",
    label: "Harmonics",
    sizeClass: "small",
    items: [
      {
        id: "sg14",
        titleEs: "Acid Synth",
        title: "Acid Synth",
        year: "2026",
        imageSrc: BASE + "armonicos1_acid.webp",
        descriptionEs: "Análisis de armónicos: síntesis acid.",
        description: "Harmonic analysis: acid synthesis.",
      },
      {
        id: "sg15",
        titleEs: "Retrologue",
        title: "Retrologue",
        year: "2026",
        imageSrc: BASE + "armonicos2_retrologue.webp",
        descriptionEs: "Análisis de armónicos: sintetizador Retrologue.",
        description: "Harmonic analysis: Retrologue synthesizer.",
      },
      {
        id: "sg16",
        titleEs: "Piano Reverb",
        title: "Reverb Piano",
        year: "2026",
        imageSrc: BASE + "armonicos3_piano.webp",
        descriptionEs: "Análisis de armónicos: piano acústico.",
        description: "Harmonic analysis: acoustic piano.",
      },
      {
        id: "sg17",
        titleEs: "Campanas",
        title: "Bells",
        year: "2026",
        imageSrc: BASE + "armonicos4_bells.webp",
        descriptionEs: "Análisis de armónicos: campanas.",
        description: "Harmonic analysis: bells.",
      },
    ],
  },
];

function useViewportWidth() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

function getGridMinmax(sizeClass: string | undefined, viewportWidth: number): string {
  const isMobile = viewportWidth < 640;

  if (isMobile) {
    return "minmax(100%, 1fr)";
  }

  switch (sizeClass) {
    case "large":
      return "minmax(calc(50% - 0.75rem), 1fr)";
    case "small":
      return "minmax(calc(25% - 0.75rem), 1fr)";
    case "medium":
    default:
      return "minmax(calc(33.333% - 0.75rem), 1fr)";
  }
}

function Lightbox({
  item,
  onClose,
}: {
  item: SpectrogramItem;
  onClose: () => void;
}) {
  const { language } = useLanguage();
  const title       = language === "es" ? item.titleEs       : item.title;
  const description = language === "es" ? item.descriptionEs : item.description;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "rgba(10,10,11,0.97)", backdropFilter: "blur(12px)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full flex flex-col overflow-hidden"
        style={{
          maxWidth: 1100,
          maxHeight: "90vh",
          margin: 16,
          background: "#13132C",
          borderRadius: "2rem",
          border: "1px solid rgba(250,248,245,0.05)",
        }}
      >
        <div
          className="flex items-center justify-between px-6 py-4 shrink-0"
          style={{ borderBottom: "1px solid rgba(250,248,245,0.05)" }}
        >
          <div className="flex items-baseline gap-3 min-w-0">
            <span className="font-serif italic text-fg text-base truncate">{title}</span>
            <span className="text-[0.65rem] uppercase tracking-[0.15em] text-fg/30 shrink-0">
              {item.year}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-fg/50 hover:text-fg shrink-0 transition-colors duration-200"
            style={{ border: "1px solid rgba(250,248,245,0.1)" }}
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-auto min-h-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.imageSrc} alt={title} className="w-full h-auto" />
        </div>

        <div
          className="px-6 py-4 shrink-0"
          style={{ borderTop: "1px solid rgba(250,248,245,0.05)" }}
        >
          <p className="text-[0.875rem] font-light text-fg/50">{description}</p>
        </div>
      </div>
    </div>
  );
}

function SpectrogramCard({
  item,
  onClick,
}: {
  item: SpectrogramItem;
  onClick: () => void;
}) {
  const { language } = useLanguage();
  const title = language === "es" ? item.titleEs : item.title;

  return (
    <div
      className="rounded-[2rem] border border-[rgba(250,248,245,0.05)] bg-surface overflow-hidden shadow-[var(--shadow-card)] cursor-pointer transition-all duration-300 hover:border-[rgba(67,179,174,0.15)] hover:-translate-y-0.5"
      onClick={onClick}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.imageSrc}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-bg/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ border: "1px solid rgba(67,179,174,0.5)" }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(67,179,174,0.9)"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </div>
        </div>

      </div>

      <div className="px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <p className="font-serif italic text-[0.9rem] text-fg/70 leading-snug line-clamp-2">
            {title}
          </p>
          <span className="font-serif italic text-[0.9rem] text-fg/40 shrink-0">
            {item.year}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function SpectrogramsSection() {
  const { language, t } = useLanguage();
  const [active, setActive] = useState<SpectrogramItem | null>(null);
  const close = useCallback(() => setActive(null), []);
  const viewportWidth = useViewportWidth();

  return (
    <>
      <section
        id="spectrograms"
        className="bg-bg min-h-screen px-[clamp(32px,5vw,64px)] pt-[120px] pb-20"
      >
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <h2 className="font-serif italic font-normal text-[clamp(3.5rem,7vw,7rem)] leading-none text-accent">
              {t("spectrograms_heading")}
            </h2>
            <p className="text-[0.875rem] font-light text-fg/40 max-w-[300px] text-right leading-[1.6] shrink-0 hidden md:block">
              {t("spectrograms_sub")}
            </p>
          </div>

          <p className="text-sm font-light text-fg/40 mb-10 md:hidden">
            {t("spectrograms_sub")}
          </p>

          <div className="flex flex-col gap-12">
            {spectrogramGroups.map((group) => {
              const label = language === "es" ? group.labelEs : group.label;
              const minmax = getGridMinmax(group.sizeClass, viewportWidth);

              return (
                <div key={group.id}>
                  {/* Group header */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-[0.7rem] uppercase tracking-[0.22em] text-accent/60">
                      {label}
                    </span>
                    <div
                      className="flex-1 h-px"
                      style={{ background: "rgba(67,179,174,0.12)" }}
                    />
                  </div>

                  {/* Cards grid for this group — responsive with auto-fit */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: `repeat(auto-fit, ${minmax})`,
                      gap: "1.5rem",
                    }}
                  >
                    {group.items.map((item) => (
                      <SpectrogramCard
                        key={item.id}
                        item={item}
                        onClick={() => setActive(item)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {active && <Lightbox item={active} onClose={close} />}
    </>
  );
}
