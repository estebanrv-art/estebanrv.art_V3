"use client";

import { Music } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

// ─── Recording data ───────────────────────────────────────────────────────────
// TODO: Replace placeholder entries with actual recordings.
// Supported platforms: SoundCloud, Spotify, Bandcamp, Apple Music.
interface Recording {
  id: string;
  titleEs: string;
  title: string;
  yearEs: string;
  year: string;
  platform: string;
  // TODO: Replace "" with the actual embed URL or iframe src for the platform
  embedUrl: string;
  // TODO: Replace "" with the direct link to listen on the platform
  listenUrl: string;
}

const recordings: Recording[] = [
  // TODO: Replace all entries below with actual recordings
  {
    id: "r01",
    titleEs: "Grabación 1 — Título de la obra",
    title: "Recording 1 — Work Title",
    yearEs: "2024",
    year: "2024",
    platform: "SoundCloud",
    embedUrl: "",   // TODO: Add SoundCloud embed URL
    listenUrl: "",  // TODO: Add SoundCloud track URL
  },
  {
    id: "r02",
    titleEs: "Grabación 2 — Título de la obra",
    title: "Recording 2 — Work Title",
    yearEs: "2023",
    year: "2023",
    platform: "Bandcamp",
    embedUrl: "",   // TODO: Add Bandcamp embed URL
    listenUrl: "",  // TODO: Add Bandcamp track URL
  },
  {
    id: "r03",
    titleEs: "Grabación 3 — Título de la obra",
    title: "Recording 3 — Work Title",
    yearEs: "2022",
    year: "2022",
    platform: "Spotify",
    embedUrl: "",   // TODO: Add Spotify embed URL
    listenUrl: "",  // TODO: Add Spotify track URL
  },
  {
    id: "r04",
    titleEs: "Grabación 4 — Título de la obra",
    title: "Recording 4 — Work Title",
    yearEs: "2021",
    year: "2021",
    platform: "SoundCloud",
    embedUrl: "",   // TODO: Add SoundCloud embed URL
    listenUrl: "",  // TODO: Add SoundCloud track URL
  },
  {
    id: "r05",
    titleEs: "Grabación 5 — Título de la obra",
    title: "Recording 5 — Work Title",
    yearEs: "2020",
    year: "2020",
    platform: "Bandcamp",
    embedUrl: "",   // TODO: Add Bandcamp embed URL
    listenUrl: "",  // TODO: Add Bandcamp track URL
  },
  {
    id: "r06",
    titleEs: "Grabación 6 — Título de la obra",
    title: "Recording 6 — Work Title",
    yearEs: "2019",
    year: "2019",
    platform: "Spotify",
    embedUrl: "",   // TODO: Add Spotify embed URL
    listenUrl: "",  // TODO: Add Spotify track URL
  },
];

export default function RecordingsSection() {
  const { language, t } = useLanguage();

  return (
    <section id="recordings" className="bg-bg min-h-screen py-20 px-8 md:px-16 pt-32">
      <div className="max-w-7xl mx-auto">

        {/* Section label */}
        <p className="text-[0.75rem] uppercase tracking-[0.28em] text-fg/30 mb-16">
          03 — {t("recordings_heading")}
        </p>

        <h2 className="font-serif italic font-normal text-[clamp(3.5rem,7vw,7rem)] leading-none text-accent mb-12">
          {t("recordings_heading")}
        </h2>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recordings.map((rec) => {
            const title = language === "es" ? rec.titleEs : rec.title;
            const year  = language === "es" ? rec.yearEs  : rec.year;

            return (
              <div
                key={rec.id}
                className="rounded-[2rem] border border-[rgba(250,248,245,0.05)] bg-surface shadow-[var(--shadow-card)] hover:border-[rgba(67,179,174,0.15)] hover:bg-[rgba(17,18,20,0.8)] transition-all duration-300 overflow-hidden"
              >
                {/* Thumbnail placeholder */}
                {/*
                  TODO: When embedUrl is set, replace this placeholder with:
                    <iframe
                      src={rec.embedUrl}
                      width="100%"
                      height="166"
                      allow="autoplay"
                      loading="lazy"
                    />
                  For SoundCloud use height="166", for Spotify use height="152".
                */}
                <div className="relative h-28 bg-surface-2 flex items-center justify-center">
                  <Music size={32} className="text-fg/20" />
                  {/* Platform badge */}
                  <span className="absolute top-3 right-3 text-[0.55rem] uppercase tracking-[0.15em] text-fg/30 bg-fg/5 px-2 py-1 rounded-full">
                    {rec.platform}
                  </span>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <p className="text-sm font-light text-fg/80 leading-snug line-clamp-2">
                      {title}
                    </p>
                    <span className="text-[0.6rem] uppercase tracking-[0.1em] text-fg/25 shrink-0 mt-0.5">
                      {year}
                    </span>
                  </div>

                  {/* Listen button */}
                  <div>
                    {rec.listenUrl ? (
                      // TODO: This link will activate once listenUrl is set
                      <a
                        href={rec.listenUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[0.65rem] uppercase tracking-[0.15em] text-accent hover:text-accent-deep transition-colors duration-200"
                      >
                        {t("recordings_listen")} →
                      </a>
                    ) : (
                      /* TODO: Remove this "coming soon" label once listenUrl is set */
                      <span className="text-[0.65rem] uppercase tracking-[0.15em] text-fg/20">
                        {t("recordings_placeholder")}
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
