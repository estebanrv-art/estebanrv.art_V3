"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

// ─── Work data ───────────────────────────────────────────────────────────────
// TODO: Replace placeholder works with actual composition data.
// Each entry supports bilingual title, description, and optional links.
interface Work {
  id: string;
  titleEs: string;
  title: string;
  year: string;
  instrumentationEs: string;
  instrumentation: string;
  descriptionEs: string;
  description: string;
  // TODO: Add a link to listen to this work (SoundCloud, Bandcamp, etc.)
  listenUrl?: string;
  // TODO: Add a link to the score/sheet music (PDF or external)
  scoreUrl?: string;
  // Category for potential filtering
  category: "chamber" | "solo" | "orchestral" | "electroacoustic" | "film";
}

const works: Work[] = [
  // TODO: Replace all entries below with actual works by Esteban Ruiz-Velasco
  {
    id: "w01",
    titleEs: "Obra para piano solo",
    title: "Work for Solo Piano",
    year: "2024",
    instrumentationEs: "Piano solo",
    instrumentation: "Solo piano",
    descriptionEs: "Descripción de la obra — se añadirá próximamente.",
    description: "Description of the work — to be added soon.",
    // TODO: listenUrl: "https://soundcloud.com/...",
    // TODO: scoreUrl: "https://...",
    category: "solo",
  },
  {
    id: "w02",
    titleEs: "Trío de cuerdas",
    title: "String Trio",
    year: "2023",
    instrumentationEs: "Violín, viola y violonchelo",
    instrumentation: "Violin, viola and cello",
    descriptionEs: "Descripción de la obra — se añadirá próximamente.",
    description: "Description of the work — to be added soon.",
    category: "chamber",
  },
  {
    id: "w03",
    titleEs: "Piezas electroacústicas",
    title: "Electroacoustic Pieces",
    year: "2022",
    instrumentationEs: "Piano y electrónica",
    instrumentation: "Piano and electronics",
    descriptionEs: "Descripción de la obra — se añadirá próximamente.",
    description: "Description of the work — to be added soon.",
    category: "electroacoustic",
  },
  {
    id: "w04",
    titleEs: "Cuarteto de cuerdas",
    title: "String Quartet",
    year: "2021",
    instrumentationEs: "Dos violines, viola y violonchelo",
    instrumentation: "Two violins, viola and cello",
    descriptionEs: "Descripción de la obra — se añadirá próximamente.",
    description: "Description of the work — to be added soon.",
    category: "chamber",
  },
  {
    id: "w05",
    titleEs: "Música de cine",
    title: "Film Score",
    year: "2020",
    instrumentationEs: "Orquesta de cámara",
    instrumentation: "Chamber orchestra",
    descriptionEs: "Descripción de la obra — se añadirá próximamente.",
    description: "Description of the work — to be added soon.",
    category: "film",
  },
  {
    id: "w06",
    titleEs: "Sonata para piano",
    title: "Piano Sonata",
    year: "2019",
    instrumentationEs: "Piano solo",
    instrumentation: "Solo piano",
    descriptionEs: "Descripción de la obra — se añadirá próximamente.",
    description: "Description of the work — to be added soon.",
    category: "solo",
  },
];

export default function WorksSection() {
  const { language, t } = useLanguage();
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="works" className="bg-surface min-h-screen py-20 px-8 md:px-16 pt-32">
      <div className="max-w-7xl mx-auto">

        {/* Section label */}
        <p className="text-[0.75rem] uppercase tracking-[0.28em] text-fg/30 mb-16">
          02 — {t("works_heading")}
        </p>

        <h2 className="font-serif italic font-normal text-[clamp(3.5rem,7vw,7rem)] leading-none text-accent mb-12">
          {t("works_heading")}
        </h2>

        {/* Works list */}
        <div className="divide-y divide-[rgba(250,248,245,0.05)]">
          {works.map((work) => {
            const title    = language === "es" ? work.titleEs    : work.title;
            const instrum  = language === "es" ? work.instrumentationEs : work.instrumentation;
            const desc     = language === "es" ? work.descriptionEs     : work.description;
            const isOpen   = expanded === work.id;

            return (
              <div key={work.id} className="group">
                {/* Row — clickable to expand */}
                <button
                  onClick={() => setExpanded(isOpen ? null : work.id)}
                  className="w-full flex items-center justify-between gap-4 py-6 text-left -mx-2 px-2 rounded-lg hover:bg-fg/[0.02] transition-colors duration-200"
                >
                  <div className="flex items-baseline gap-5 min-w-0">
                    {/* Year */}
                    <span className="text-[0.65rem] uppercase tracking-[0.15em] text-fg/25 font-sans shrink-0">
                      {work.year}
                    </span>

                    {/* Title */}
                    <span className="text-fg font-light text-base md:text-lg leading-snug">
                      {title}
                    </span>
                  </div>

                  {/* Instrumentation */}
                  <span className="hidden md:block text-[0.7rem] uppercase tracking-[0.08em] text-fg/30 shrink-0">
                    {instrum}
                  </span>

                  {/* Expand icon */}
                  <span className="text-accent/50 group-hover:text-accent transition-colors duration-200 shrink-0">
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </span>
                </button>

                {/* Expandable detail */}
                <div className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${isOpen ? "max-h-64 pb-6" : "max-h-0"}`}>
                  <div className="pl-[3.5rem] ml-[3.5rem] border-l border-accent/20">
                    {/* Mobile instrumentation */}
                    <p className="md:hidden text-[0.7rem] uppercase tracking-[0.08em] text-fg/30 mb-3">
                      {t("works_instrumentation")}: {instrum}
                    </p>

                    <p className="text-sm font-light text-fg/50 leading-relaxed mb-4">
                      {desc}
                    </p>

                    {/* Action links */}
                    <div className="flex gap-5">
                      {work.listenUrl ? (
                        // TODO: Update href when listenUrl is set
                        <a
                          href={work.listenUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[0.65rem] uppercase tracking-[0.15em] text-accent hover:text-accent-deep transition-colors duration-200"
                        >
                          {t("works_listen")}
                        </a>
                      ) : (
                        /* TODO: Remove this disabled placeholder once listenUrl is set */
                        <span className="text-[0.65rem] uppercase tracking-[0.15em] text-fg/20 cursor-not-allowed">
                          {t("works_listen")}
                        </span>
                      )}

                      {work.scoreUrl ? (
                        // TODO: Update href when scoreUrl is set
                        <a
                          href={work.scoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[0.65rem] uppercase tracking-[0.15em] text-accent hover:text-accent-deep transition-colors duration-200"
                        >
                          {t("works_score")}
                        </a>
                      ) : (
                        /* TODO: Remove this disabled placeholder once scoreUrl is set */
                        <span className="text-[0.65rem] uppercase tracking-[0.15em] text-fg/20 cursor-not-allowed">
                          {t("works_score")}
                        </span>
                      )}
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
