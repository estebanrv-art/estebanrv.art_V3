"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

interface Work {
  id: string;
  titleEs: string;
  title: string;
  year: string;
  instrumentationEs: string;
  instrumentation: string;
  descriptionEs: string;
  description: string;
  listenUrl?: string;
  scoreUrl?: string;
  category: "chamber" | "solo" | "orchestral" | "electroacoustic" | "film";
}

const works: Work[] = [
  {
    id: "w01",
    titleEs: "Chicharra",
    title: "Chicharra",
    year: "2024",
    instrumentationEs: "Piano y electrónica en vivo",
    instrumentation: "Piano and live electronics",
    descriptionEs: "Obra para piano y electrónica en vivo inspirada en el canto de la chicharra.",
    description: "Work for piano and live electronics inspired by the cicada's song.",
    category: "electroacoustic",
  },
  {
    id: "w02",
    titleEs: "Trío de cuerdas núm. 1",
    title: "String Trio No. 1",
    year: "2023",
    instrumentationEs: "Violín, viola y violonchelo",
    instrumentation: "Violin, viola and cello",
    descriptionEs: "Exploración tímbrica a través de técnicas extendidas.",
    description: "Timbral exploration through extended techniques.",
    category: "chamber",
  },
  {
    id: "w03",
    titleEs: "Piezas microtonales",
    title: "Microtonal Pieces",
    year: "2022",
    instrumentationEs: "Piano preparado",
    instrumentation: "Prepared piano",
    descriptionEs: "Serie de piezas breves que exploran la microtonalidad.",
    description: "Series of short pieces exploring microtonality.",
    category: "solo",
  },
  {
    id: "w04",
    titleEs: "Cuarteto de cuerdas núm. 1",
    title: "String Quartet No. 1",
    year: "2021",
    instrumentationEs: "Dos violines, viola y violonchelo",
    instrumentation: "Two violins, viola and cello",
    descriptionEs: "Obra en un movimiento para cuarteto de cuerdas.",
    description: "Single-movement work for string quartet.",
    category: "chamber",
  },
  {
    id: "w05",
    titleEs: "Música para película",
    title: "Film Score",
    year: "2020",
    instrumentationEs: "Orquesta de cámara",
    instrumentation: "Chamber orchestra",
    descriptionEs: "Banda sonora original para largometraje.",
    description: "Original soundtrack for feature film.",
    category: "film",
  },
  {
    id: "w06",
    titleEs: "Sonata para piano núm. 1",
    title: "Piano Sonata No. 1",
    year: "2019",
    instrumentationEs: "Piano solo",
    instrumentation: "Solo piano",
    descriptionEs: "Sonata en tres movimientos influenciada por la música mexicana.",
    description: "Sonata in three movements influenced by Mexican music.",
    category: "solo",
  },
];

export default function WorksSection() {
  const { language, t } = useLanguage();
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="works" className="bg-bg min-h-screen px-[clamp(32px,5vw,64px)] pt-[120px] pb-20">
      <div className="max-w-[1280px] mx-auto">

        <p className="text-[0.75rem] uppercase tracking-[0.28em] text-fg/30 mb-16">
          {language === "es" ? "02 — Obras" : "02 — Works"}
        </p>

        <h2 className="font-serif italic font-normal text-[clamp(3.5rem,7vw,7rem)] leading-none text-accent mb-12">
          {t("works_heading")}
        </h2>

        <div className="border-t border-[rgba(250,248,245,0.05)]">
          {works.map((work) => {
            const title   = language === "es" ? work.titleEs   : work.title;
            const instrum = language === "es" ? work.instrumentationEs : work.instrumentation;
            const desc    = language === "es" ? work.descriptionEs     : work.description;
            const isOpen  = expanded === work.id;

            return (
              <div key={work.id} className="border-b border-[rgba(250,248,245,0.05)]">
                <button
                  onClick={() => setExpanded(isOpen ? null : work.id)}
                  className="w-full flex items-center justify-between gap-4 py-6 px-2 text-left rounded-lg transition-colors duration-200 hover:bg-fg/[0.02]"
                >
                  <div className="flex items-baseline gap-5 min-w-0">
                    <span className="text-[0.65rem] uppercase tracking-[0.15em] text-fg/25 shrink-0 min-w-[40px]">
                      {work.year}
                    </span>
                    <span className="font-serif italic font-normal text-[clamp(1rem,2vw,1.35rem)] text-fg">
                      {title}
                    </span>
                  </div>

                  <div className="flex items-center gap-6 shrink-0">
                    <span className="hidden md:block text-[0.7rem] uppercase tracking-[0.08em] text-fg/30">
                      {instrum}
                    </span>
                    <span className={isOpen ? "text-accent" : "text-accent/40"} style={{ transition: "color 0.2s" }}>
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  </div>
                </button>

                <div
                  className="overflow-hidden transition-all duration-[350ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                  style={{ maxHeight: isOpen ? 200 : 0 }}
                >
                  <div className="pl-[60px] pr-10 pb-6 ml-[60px] border-l border-accent/20">
                    <p className="text-[0.9rem] font-light text-fg/50 leading-[1.7] mb-4">
                      {desc}
                    </p>
                    <div className="flex gap-5">
                      <span className="text-[0.65rem] uppercase tracking-[0.15em] text-fg/20">
                        {language === "es" ? "Escuchar →" : "Listen →"}
                      </span>
                      <span className="text-[0.65rem] uppercase tracking-[0.15em] text-fg/20">
                        {language === "es" ? "Partitura →" : "Score →"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
