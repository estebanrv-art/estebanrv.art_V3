"use client";

import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

interface Score {
  id: string;
  titleEs: string;
  title: string;
  // TODO: update year for each score to match composition date
  year: string;
  // TODO: update instrumentationEs and instrumentation with actual forces
  instrumentationEs: string;
  instrumentation: string;
  // Path to the trimmed/watermarked excerpt PDF in public/scores/.
  // Leave empty ("") until the excerpt is ready — a "coming soon" placeholder is shown.
  pdfSrc: string;
}

const scores: Score[] = [
  {
    id: "sc01",
    titleEs: "Ecolalia Cero",
    title: "Ecolalia Cero",
    year: "2023",
    // TODO: replace "—" with actual instrumentation (e.g. "Piano y electrónica en vivo")
    instrumentationEs: "—",
    instrumentation: "—",
    pdfSrc: "/scores/ecolalia-cero-excerpt.pdf",
  },
  {
    id: "sc02",
    titleEs: "Fanfarria para una presencia",
    title: "Fanfarria para una presencia",
    year: "2022",
    // TODO: replace "—" with actual instrumentation (e.g. "Piano y electrónica en vivo")
    instrumentationEs: "—",
    instrumentation: "—",
    pdfSrc: "/scores/fanfarria-excerpt.pdf",
  },
  {
    id: "sc03",
    titleEs: "El Laberinto de los Sentidos",
    title: "El Laberinto de los Sentidos",
    year: "2021",
    // TODO: replace "—" with actual instrumentation (e.g. "Piano y electrónica en vivo")
    instrumentationEs: "—",
    instrumentation: "—",
    pdfSrc: "/scores/laberinto-excerpt.pdf",
  },
  {
    id: "sc04",
    titleEs: "Estudio No. 1",
    title: "Estudio No. 1",
    year: "2020",
    // TODO: replace "—" with actual instrumentation (e.g. "Piano y electrónica en vivo")
    instrumentationEs: "—",
    instrumentation: "—",
    // TODO: process this PDF (10 pages total — "5-20 pages" rule in CLAUDE.md requires
    //   asking how many pages to keep). Once decided, run the trim+watermark script
    //   and drop the file at public/scores/estudio-no1-excerpt.pdf, then set pdfSrc below.
    pdfSrc: "",
  },
  {
    id: "sc05",
    titleEs: "Cuantas veces sea necesario",
    title: "Cuantas veces sea necesario",
    year: "2019",
    // TODO: replace "—" with actual instrumentation (e.g. "Piano y electrónica en vivo")
    instrumentationEs: "—",
    instrumentation: "—",
    // TODO: process this PDF (6 pages total — "5-20 pages" rule in CLAUDE.md requires
    //   asking how many pages to keep). Once decided, run the trim+watermark script
    //   and drop the file at public/scores/cuantas-veces-excerpt.pdf, then set pdfSrc below.
    pdfSrc: "",
  },
  {
    id: "sc06",
    titleEs: "Estudio Ygramul No. 1",
    title: "Estudio Ygramul No. 1",
    year: "2021",
    // TODO: replace "—" with actual instrumentation (e.g. "Piano y electrónica en vivo")
    instrumentationEs: "—",
    instrumentation: "—",
    pdfSrc: "/scores/estudio-ygramul-excerpt.pdf",
  },
];

function PdfLightbox({
  score,
  onClose,
}: {
  score: Score;
  onClose: () => void;
}) {
  const { language } = useLanguage();
  const title        = language === "es" ? score.titleEs : score.title;

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
          maxWidth: 860,
          height: "90vh",
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
              {score.year}
            </span>
            <span className="text-[0.55rem] uppercase tracking-[0.1em] text-accent/40 shrink-0">
              {language === "es" ? "extracto" : "excerpt"}
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

        <div className="flex-1 min-h-0">
          <iframe
            src={score.pdfSrc}
            width="100%"
            height="100%"
            title={title}
            className="block w-full h-full"
            style={{ border: "none" }}
          />
        </div>
      </div>
    </div>
  );
}

export default function ScoresSection() {
  const { language } = useLanguage();
  const [active, setActive] = useState<Score | null>(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <>
      <section
        id="scores"
        className="bg-bg min-h-screen px-[clamp(32px,5vw,64px)] pt-[120px] pb-20"
      >
        <div className="max-w-[1280px] mx-auto">
          <p className="text-[0.75rem] uppercase tracking-[0.28em] text-fg/30 mb-16">
            {language === "es" ? "03 — Partituras" : "03 — Scores"}
          </p>

          <h2 className="font-serif italic font-normal text-[clamp(3.5rem,7vw,7rem)] leading-none text-accent mb-12">
            {language === "es" ? "Partituras" : "Scores"}
          </h2>

          <div className="border-t border-[rgba(250,248,245,0.05)]">
            {scores.map((score, idx) => {
              const title   = language === "es" ? score.titleEs   : score.title;
              const instrum = language === "es" ? score.instrumentationEs : score.instrumentation;
              const ready   = score.pdfSrc !== "";

              return (
                <div
                  key={score.id}
                  className="border-b border-[rgba(250,248,245,0.05)]"
                >
                  <div className="w-full flex items-center justify-between gap-4 py-6 px-2">
                    <div className="flex items-baseline gap-5 min-w-0">
                      <span className="text-[0.65rem] uppercase tracking-[0.15em] text-fg/25 shrink-0 min-w-[40px]">
                        {score.year}
                      </span>
                      <span className="font-serif italic font-normal text-[clamp(1rem,2vw,1.35rem)] text-fg">
                        {title}
                      </span>
                    </div>

                    <div className="flex items-center gap-6 shrink-0">
                      <span className="hidden md:block text-[0.7rem] uppercase tracking-[0.08em] text-fg/30">
                        {/* TODO: replace with actual instrumentation */}
                        {instrum}
                      </span>

                      {ready ? (
                        <button
                          onClick={() => setActive(score)}
                          className="text-[0.65rem] uppercase tracking-[0.15em] text-accent/60 hover:text-accent transition-colors duration-200"
                        >
                          {language === "es" ? "Ver extracto →" : "View excerpt →"}
                        </button>
                      ) : (
                        <span className="text-[0.6rem] uppercase tracking-[0.15em] text-fg/20">
                          {language === "es" ? "Próximamente" : "Coming soon"}
                        </span>
                      )}

                      <span className="text-[0.55rem] uppercase tracking-[0.1em] text-accent/30 hidden md:block">
                        PDF
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {active && <PdfLightbox score={active} onClose={close} />}
    </>
  );
}
