"use client";

import { Play } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

// ─── Video data ───────────────────────────────────────────────────────────────
// TODO: Replace placeholder entries with actual video data.
// Supported platforms: YouTube, Vimeo.
interface Video {
  id: string;
  titleEs: string;
  title: string;
  year: string;
  platform: "YouTube" | "Vimeo";
  // TODO: Replace "" with the actual embed URL
  //   YouTube: "https://www.youtube.com/embed/VIDEO_ID"
  //   Vimeo:   "https://player.vimeo.com/video/VIDEO_ID"
  embedUrl: string;
  // TODO: Replace "" with the direct URL to the video
  watchUrl: string;
}

const videos: Video[] = [
  // TODO: Replace all entries below with actual videos
  {
    id: "v01",
    titleEs: "Video 1 — Título de la obra",
    title: "Video 1 — Work Title",
    year: "2024",
    platform: "YouTube",
    embedUrl: "",  // TODO: "https://www.youtube.com/embed/..."
    watchUrl: "",  // TODO: "https://www.youtube.com/watch?v=..."
  },
  {
    id: "v02",
    titleEs: "Video 2 — Título de la obra",
    title: "Video 2 — Work Title",
    year: "2023",
    platform: "Vimeo",
    embedUrl: "",  // TODO: "https://player.vimeo.com/video/..."
    watchUrl: "",  // TODO: "https://vimeo.com/..."
  },
  {
    id: "v03",
    titleEs: "Video 3 — Título de la obra",
    title: "Video 3 — Work Title",
    year: "2022",
    platform: "YouTube",
    embedUrl: "",  // TODO: "https://www.youtube.com/embed/..."
    watchUrl: "",  // TODO: "https://www.youtube.com/watch?v=..."
  },
  {
    id: "v04",
    titleEs: "Video 4 — Título de la obra",
    title: "Video 4 — Work Title",
    year: "2021",
    platform: "Vimeo",
    embedUrl: "",  // TODO: "https://player.vimeo.com/video/..."
    watchUrl: "",  // TODO: "https://vimeo.com/..."
  },
  {
    id: "v05",
    titleEs: "Video 5 — Título de la obra",
    title: "Video 5 — Work Title",
    year: "2020",
    platform: "YouTube",
    embedUrl: "",  // TODO: "https://www.youtube.com/embed/..."
    watchUrl: "",  // TODO: "https://www.youtube.com/watch?v=..."
  },
  {
    id: "v06",
    titleEs: "Video 6 — Título de la obra",
    title: "Video 6 — Work Title",
    year: "2019",
    platform: "Vimeo",
    embedUrl: "",  // TODO: "https://player.vimeo.com/video/..."
    watchUrl: "",  // TODO: "https://vimeo.com/..."
  },
];

export default function VideosSection() {
  const { language, t } = useLanguage();

  return (
    <section id="videos" className="bg-surface min-h-screen py-20 px-8 md:px-16 pt-32">
      <div className="max-w-7xl mx-auto">

        {/* Section label */}
        <p className="text-[0.75rem] uppercase tracking-[0.28em] text-fg/30 mb-16">
          04 — {t("videos_heading")}
        </p>

        <h2 className="font-serif italic font-normal text-[clamp(3.5rem,7vw,7rem)] leading-none text-accent mb-12">
          {t("videos_heading")}
        </h2>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((vid) => {
            const title = language === "es" ? vid.titleEs : vid.title;

            return (
              <div
                key={vid.id}
                className="rounded-[2rem] border border-[rgba(250,248,245,0.05)] bg-surface-2 shadow-[var(--shadow-card)] hover:border-[rgba(67,179,174,0.15)] transition-all duration-300 overflow-hidden"
              >
                {/* Video thumbnail / embed area */}
                {vid.embedUrl ? (
                  /*
                    TODO: The iframe below will render once embedUrl is set.
                    Make sure to add the domain to next.config.ts if using Next.js Image Optimization.
                  */
                  <div className="relative aspect-video">
                    <iframe
                      src={vid.embedUrl}
                      width="100%"
                      height="100%"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                      title={title}
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                ) : (
                  /* TODO: Remove this placeholder once embedUrl is set */
                  <div className="relative aspect-video bg-bg flex items-center justify-center overflow-hidden">
                    {/* Simulated widescreen scan lines */}
                    <div
                      className="absolute inset-0"
                      style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(250,248,245,0.015) 2px, rgba(250,248,245,0.015) 4px)" }}
                    />
                    <Play size={36} className="text-fg/20 relative z-10" />
                    {/* Platform badge */}
                    <span className="absolute bottom-3 right-3 text-[0.55rem] uppercase tracking-[0.15em] text-fg/30 bg-fg/5 px-2 py-1 rounded-full">
                      {vid.platform}
                    </span>
                  </div>
                )}

                {/* Card body */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <p className="text-sm font-light text-fg/80 leading-snug line-clamp-2">
                      {title}
                    </p>
                    <span className="text-[0.6rem] uppercase tracking-[0.1em] text-fg/25 shrink-0 mt-0.5">
                      {vid.year}
                    </span>
                  </div>

                  {/* Watch link */}
                  <div>
                    {vid.watchUrl ? (
                      // TODO: This link will activate once watchUrl is set
                      <a
                        href={vid.watchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[0.65rem] uppercase tracking-[0.15em] text-accent hover:text-accent-deep transition-colors duration-200"
                      >
                        {t("videos_watch")} →
                      </a>
                    ) : (
                      /* TODO: Remove this "coming soon" label once watchUrl is set */
                      <span className="text-[0.65rem] uppercase tracking-[0.15em] text-fg/20">
                        {t("videos_placeholder")}
                      </span>
                    )}
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
