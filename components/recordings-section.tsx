"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";

interface Recording {
  id: string;
  // TODO: update titleEs and title with the actual track titles (especially for Spotify tracks)
  titleEs: string;
  title: string;
  // TODO: update year for each recording
  year: string;
  platform: string;
  platformColor: string;
  embedUrl: string;
  listenUrl: string;
}

const recordings: Recording[] = [
  {
    id: "r01",
    titleEs: "Le Dejo La Piel",
    title: "Le Dejo La Piel",
    // TODO: update year
    year: "2024",
    platform: "Spotify",
    platformColor: "#1DB954",
    embedUrl: "https://open.spotify.com/embed/track/4KkwS2wV4ajktn22gsiojq?utm_source=generator&theme=0",
    listenUrl: "https://open.spotify.com/track/4KkwS2wV4ajktn22gsiojq",
  },
  {
    id: "r02",
    titleEs: "Grabación 2",
    title: "Recording 2",
    year: "2024",
    platform: "Spotify",
    platformColor: "#1DB954",
    embedUrl: "https://open.spotify.com/embed/track/0fH2tAbgCcwKGO6Qfu4IuE?utm_source=generator&theme=0",
    listenUrl: "https://open.spotify.com/track/0fH2tAbgCcwKGO6Qfu4IuE",
  },
  {
    id: "r03",
    titleEs: "Grabación 3",
    title: "Recording 3",
    year: "2024",
    platform: "Spotify",
    platformColor: "#1DB954",
    embedUrl: "https://open.spotify.com/embed/track/7fILr1EtLsdFNus15bhcql?utm_source=generator&theme=0",
    listenUrl: "https://open.spotify.com/track/7fILr1EtLsdFNus15bhcql",
  },
  {
    id: "r04",
    titleEs: "Grabación 4",
    title: "Recording 4",
    year: "2024",
    platform: "Spotify",
    platformColor: "#1DB954",
    embedUrl: "https://open.spotify.com/embed/track/2macDZmMw8ZlYyhlbR7cwY?utm_source=generator&theme=0",
    listenUrl: "https://open.spotify.com/track/2macDZmMw8ZlYyhlbR7cwY",
  },
  {
    id: "r05",
    titleEs: "Worlds Apart — Seaboard Improv",
    title: "Worlds Apart — Seaboard Improv",
    year: "2024",
    platform: "SoundCloud",
    platformColor: "#ff5500",
    embedUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/esteban-ruiz-velasco/worlds-apart-seaboard-improv&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false",
    listenUrl: "https://soundcloud.com/esteban-ruiz-velasco/worlds-apart-seaboard-improv",
  },
  {
    id: "r06",
    titleEs: "Rechinido espacializado",
    title: "Rechinido espacializado",
    year: "2024",
    platform: "SoundCloud",
    platformColor: "#ff5500",
    embedUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/esteban-ruiz-velasco/rechinido-espacializado&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false",
    listenUrl: "https://soundcloud.com/esteban-ruiz-velasco/rechinido-espacializado",
  },
];

const WAVEFORM_HEIGHTS = [3, 5, 8, 4, 9, 6, 10, 7, 5, 8, 4, 6, 9, 5, 7, 3, 8, 6, 4, 9, 7, 5, 8, 4, 6];

function WaveformBars({ color }: { color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 32 }}>
      {WAVEFORM_HEIGHTS.map((h, i) => (
        <div
          key={i}
          style={{
            width: 3,
            borderRadius: 2,
            height: h * 3,
            background: color,
            opacity: 0.6,
          }}
        />
      ))}
    </div>
  );
}

export default function RecordingsSection() {
  const { language } = useLanguage();
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="recordings" className="bg-bg min-h-screen px-[clamp(32px,5vw,64px)] pt-[120px] pb-20">
      <div className="max-w-[1280px] mx-auto">

        <h2 className="font-serif italic font-normal text-[clamp(3.5rem,7vw,7rem)] leading-none text-accent mb-12">
          {language === "es" ? "Grabaciones" : "Recordings"}
        </h2>

        <div className="flex flex-col gap-0.5">
          {recordings.map((rec, idx) => {
            const title   = language === "es" ? rec.titleEs : rec.title;
            const isOpen  = expanded === rec.id;
            return (
              <div
                key={rec.id}
                className="border border-[rgba(250,248,245,0.04)] rounded-[1.5rem] overflow-hidden transition-colors duration-200 hover:border-[rgba(67,179,174,0.12)]"
              >
                {/* Row — click to toggle embed */}
                <button
                  onClick={() => setExpanded(isOpen ? null : rec.id)}
                  className="w-full group grid items-center gap-4 sm:gap-6 px-6 py-5 hover:bg-[rgba(67,179,174,0.04)] transition-colors duration-200 [grid-template-columns:32px_1fr_auto] sm:[grid-template-columns:40px_1fr_auto_auto]"
                >
                  <span className="text-[0.65rem] text-fg/20 tracking-[0.1em]">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  <div className="text-left">
                    <p className="font-serif italic text-[1.1rem] text-fg font-normal mb-1">
                      {/* TODO: replace generic title with actual track title */}
                      {title}
                    </p>
                    <span className="text-[0.65rem] uppercase tracking-[0.1em] text-fg/30">
                      {rec.platform}
                    </span>
                  </div>

                  <div className="hidden sm:block">
                    <WaveformBars color={rec.platformColor} />
                  </div>

                  <div className="text-right">
                    <span className="block text-[0.65rem] text-fg/25 tracking-[0.1em]">
                      {rec.year}
                    </span>
                    <span
                      className="text-[0.6rem] uppercase tracking-[0.12em] transition-colors duration-200"
                      style={{ color: isOpen ? rec.platformColor : "rgba(250,248,245,0.18)" }}
                    >
                      {isOpen
                        ? (language === "es" ? "Cerrar" : "Close")
                        : (language === "es" ? "Escuchar" : "Listen")}
                    </span>
                  </div>
                </button>

                {/* Embedded player — expands on click */}
                <div
                  className="overflow-hidden transition-all duration-[350ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                  style={{ maxHeight: isOpen ? 200 : 0 }}
                >
                  <div className="px-6 pb-5">
                    <iframe
                      src={rec.embedUrl}
                      width="100%"
                      height="152"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      title={title}
                      className="rounded-xl"
                      style={{ border: "none", display: "block" }}
                    />
                    <a
                      href={rec.listenUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-[0.6rem] uppercase tracking-[0.15em] text-fg/25 hover:text-fg/60 transition-colors duration-200"
                    >
                      {language === "es" ? "Abrir en" : "Open on"} {rec.platform} →
                    </a>
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
