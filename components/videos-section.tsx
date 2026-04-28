"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/language-context";

interface Video {
  id: string;
  titleEs: string;
  title: string;
  year: string;
  platform: "YouTube" | "Vimeo";
  embedUrl: string;
  watchUrl: string;
}

function useViewportWidth() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

const videos: Video[] = [
  {
    id: "v01",
    titleEs: "Ecolalia Cero",
    title: "Ecolalia Cero",
    // TODO: update year
    year: "2024",
    platform: "YouTube",
    embedUrl: "https://www.youtube.com/embed/Qqm42amHNeY?rel=0",
    watchUrl: "https://youtu.be/Qqm42amHNeY",
  },
  {
    id: "v02",
    titleEs: "El Laberinto de los Sentidos",
    title: "El Laberinto de los Sentidos",
    // TODO: update year
    year: "2024",
    platform: "YouTube",
    embedUrl: "https://www.youtube.com/embed/sjwFsYR_1LA?rel=0",
    watchUrl: "https://youtu.be/sjwFsYR_1LA",
  },
  {
    id: "v03",
    titleEs: "Estudio Ygrámul No. 1",
    title: "Estudio Ygrámul No. 1",
    // TODO: update year
    year: "2024",
    platform: "YouTube",
    embedUrl: "https://www.youtube.com/embed/2EYPafOJIXI?rel=0",
    watchUrl: "https://youtu.be/2EYPafOJIXI",
  },
  {
    id: "v04",
    // TODO: confirm full title (thumbnail reads "Estudio Ygrámul 1 - Score Vi…")
    titleEs: "Estudio Ygrámul 1 — Score Video",
    title: "Estudio Ygrámul 1 — Score Video",
    // TODO: update year
    year: "2024",
    platform: "YouTube",
    embedUrl: "https://www.youtube.com/embed/FuOYbE668iU?rel=0",
    watchUrl: "https://youtu.be/FuOYbE668iU",
  },
  {
    id: "v05",
    // TODO: confirm full title (thumbnail reads "Tres Imágenes para Flauta y…")
    titleEs: "Tres Imágenes para Flauta y Piano",
    title: "Tres Imágenes para Flauta y Piano",
    // TODO: update year
    year: "2024",
    platform: "YouTube",
    embedUrl: "https://www.youtube.com/embed/FGnL-Yx_qDA?rel=0",
    watchUrl: "https://youtu.be/FGnL-Yx_qDA",
  },
  {
    id: "v06",
    titleEs: "Árgax Demo",
    title: "Árgax Demo",
    // TODO: update year
    year: "2020",
    platform: "Vimeo",
    embedUrl: "https://player.vimeo.com/video/407293037",
    watchUrl: "https://vimeo.com/407293037",
  },
];

export default function VideosSection() {
  const { language } = useLanguage();
  const viewportWidth = useViewportWidth();
  const isMobile = viewportWidth < 640;
  const isTablet = viewportWidth >= 640 && viewportWidth < 1024;
  const cols = isMobile ? 1 : isTablet ? 2 : 3;

  return (
    <section id="videos" className="bg-bg min-h-screen px-[clamp(32px,5vw,64px)] pt-[120px] pb-20">
      <div className="max-w-[1280px] mx-auto">

        <p className="text-[0.75rem] uppercase tracking-[0.28em] text-fg/30 mb-16">
          {language === "es" ? "05 — Videos" : "05 — Videos"}
        </p>

        <h2 className="font-serif italic font-normal text-[clamp(3.5rem,7vw,7rem)] leading-none text-accent mb-12">
          Videos
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            gap: "1.5rem",
          }}
        >
          {videos.map((vid) => {
            const title = language === "es" ? vid.titleEs : vid.title;
            return (
              <div
                key={vid.id}
                className="rounded-[2rem] border border-[rgba(250,248,245,0.05)] bg-surface-2 overflow-hidden shadow-[var(--shadow-card)] transition-all duration-300 hover:border-[rgba(67,179,174,0.15)] hover:-translate-y-0.5"
              >
                <div className="relative aspect-video">
                  <iframe
                    src={vid.embedUrl}
                    width="100%"
                    height="100%"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    allowFullScreen
                    loading="lazy"
                    title={title}
                    className="absolute inset-0 w-full h-full"
                  />
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-serif italic text-[0.95rem] text-fg/80 leading-snug line-clamp-2">
                      {title}
                    </p>
                    <span className="text-[0.6rem] text-fg/25 shrink-0 mt-0.5">
                      {vid.year}
                    </span>
                  </div>
                  <a
                    href={vid.watchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-[0.65rem] uppercase tracking-[0.15em] text-accent/50 hover:text-accent transition-colors duration-200"
                  >
                    {vid.platform} →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
