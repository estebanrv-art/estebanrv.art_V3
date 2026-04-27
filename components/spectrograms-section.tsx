"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { X, Volume2, VolumeX, ZoomIn } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

// ─── Spectrogram data ─────────────────────────────────────────────────────────
// Each entry pairs a spectrogram image with its corresponding audio file.
// Click a card → fullscreen lightbox opens and audio auto-plays.
interface SpectrogramItem {
  id: string;
  titleEs: string;
  title: string;
  descriptionEs: string;
  description: string;
  // TODO: Replace "" with the path to the spectrogram image.
  //   Recommended: place .jpg/.webp files in /public/images/spectrograms/
  //   Example: "/images/spectrograms/work-01.jpg"
  imageSrc: string;
  // TODO: Replace "" with the path or URL to the audio file.
  //   Option A — local file: place .mp3/.ogg in /public/audio/ and use "/audio/work-01.mp3"
  //   Option B — external URL: use a direct link (must allow cross-origin)
  //   The audio element's `crossOrigin` attribute is set to "anonymous" for external URLs.
  audioSrc: string;
  year: string;
}

const spectrograms: SpectrogramItem[] = [
  // TODO: Replace all entries below with actual spectrogram + audio pairs
  {
    id: "sg01",
    titleEs: "Espectrograma 1 — Título de la obra",
    title: "Spectrogram 1 — Work Title",
    year: "2024",
    descriptionEs: "Descripción breve de la obra representada.",
    description: "Brief description of the represented work.",
    imageSrc: "",   // TODO: "/images/spectrograms/work-01.jpg"
    audioSrc: "",   // TODO: "/audio/work-01.mp3"
  },
  {
    id: "sg02",
    titleEs: "Espectrograma 2 — Título de la obra",
    title: "Spectrogram 2 — Work Title",
    year: "2023",
    descriptionEs: "Descripción breve de la obra representada.",
    description: "Brief description of the represented work.",
    imageSrc: "",   // TODO: "/images/spectrograms/work-02.jpg"
    audioSrc: "",   // TODO: "/audio/work-02.mp3"
  },
  {
    id: "sg03",
    titleEs: "Espectrograma 3 — Título de la obra",
    title: "Spectrogram 3 — Work Title",
    year: "2022",
    descriptionEs: "Descripción breve de la obra representada.",
    description: "Brief description of the represented work.",
    imageSrc: "",   // TODO: "/images/spectrograms/work-03.jpg"
    audioSrc: "",   // TODO: "/audio/work-03.mp3"
  },
  {
    id: "sg04",
    titleEs: "Espectrograma 4 — Título de la obra",
    title: "Spectrogram 4 — Work Title",
    year: "2021",
    descriptionEs: "Descripción breve de la obra representada.",
    description: "Brief description of the represented work.",
    imageSrc: "",   // TODO: "/images/spectrograms/work-04.jpg"
    audioSrc: "",   // TODO: "/audio/work-04.mp3"
  },
  {
    id: "sg05",
    titleEs: "Espectrograma 5 — Título de la obra",
    title: "Spectrogram 5 — Work Title",
    year: "2020",
    descriptionEs: "Descripción breve de la obra representada.",
    description: "Brief description of the represented work.",
    imageSrc: "",   // TODO: "/images/spectrograms/work-05.jpg"
    audioSrc: "",   // TODO: "/audio/work-05.mp3"
  },
  {
    id: "sg06",
    titleEs: "Espectrograma 6 — Título de la obra",
    title: "Spectrogram 6 — Work Title",
    year: "2019",
    descriptionEs: "Descripción breve de la obra representada.",
    description: "Brief description of the represented work.",
    imageSrc: "",   // TODO: "/images/spectrograms/work-06.jpg"
    audioSrc: "",   // TODO: "/audio/work-06.mp3"
  },
];

// ─── Lightbox component ───────────────────────────────────────────────────────
function Lightbox({
  item,
  onClose,
}: {
  item: SpectrogramItem;
  onClose: () => void;
}) {
  const { language, t } = useLanguage();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);

  const title       = language === "es" ? item.titleEs       : item.title;
  const description = language === "es" ? item.descriptionEs : item.description;

  // Auto-play on open
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !item.audioSrc) return;
    audio.load();
    audio.play().then(() => setPlaying(true)).catch(() => {
      // Autoplay may be blocked by the browser — user can unmute/play manually
      setPlaying(false);
    });
    return () => {
      audio.pause();
    };
  }, [item.audioSrc]);

  // ESC to close
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Prevent body scroll while lightbox is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  function toggleMute() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(10,10,11,0.97)] backdrop-blur-[10px]"
    >
      {/* Inner panel — click inside does not close */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[90vh] mx-4 bg-surface-2 rounded-[2rem] border border-[rgba(250,248,245,0.05)] shadow-[0_0_0_1px_rgba(250,248,245,0.05)] flex flex-col overflow-hidden"
      >
        {/* Controls row */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(250,248,245,0.05)] shrink-0">
          <div className="flex items-baseline gap-3 min-w-0">
            <span className="font-serif italic text-fg text-base truncate">
              {title}
            </span>
            <span className="text-[0.65rem] uppercase tracking-[0.15em] text-fg/30 shrink-0">
              {item.year}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0 ml-4">
            {/* Mute toggle — only shown when there's an audio source */}
            {item.audioSrc && (
              <button
                onClick={toggleMute}
                aria-label={muted ? "Unmute" : "Mute"}
                className="w-8 h-8 rounded-full flex items-center justify-center text-fg/50 hover:text-fg border border-fg/10 hover:border-fg/20 transition-all duration-200"
              >
                {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            )}

            {/* Close */}
            <button
              onClick={onClose}
              aria-label={t("spectrograms_close")}
              className="w-8 h-8 rounded-full flex items-center justify-center text-fg/50 hover:text-fg border border-fg/10 hover:border-fg/20 transition-all duration-200"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Spectrogram image */}
        <div className="flex-1 overflow-auto min-h-0">
          {item.imageSrc ? (
            /*
              TODO: Once imageSrc is set, this <img> will display the actual spectrogram.
              For Next.js Image optimization, consider switching to <Image> from "next/image"
              after adding the domain/path to next.config.ts.
            */
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.imageSrc}
              alt={title}
              className="w-full h-auto"
            />
          ) : (
            /* TODO: Remove this placeholder block once imageSrc is set */
            <div className="relative h-48 md:h-64 bg-surface flex items-center justify-center">
              {/* Animated placeholder simulating a spectrogram */}
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 800 200"
                preserveAspectRatio="none"
              >
                {Array.from({ length: 80 }, (_, i) => (
                  <rect
                    key={i}
                    x={i * 10}
                    y={200 - Math.random() * 160 - 20}
                    width={8}
                    height={Math.random() * 160 + 20}
                    fill={`oklch(0.72 0.12 ${80 + i * 2})`}
                  />
                ))}
              </svg>
              <span className="absolute text-[0.7rem] uppercase tracking-[0.15em] text-fg/20">
                {/* TODO: Remove this label once the image is added */}
                Spectrogram Image
              </span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="px-6 py-4 text-sm font-light text-fg/50 border-t border-[rgba(250,248,245,0.05)] shrink-0">
          {description}
        </p>

        {/* Audio player — hidden native element for programmatic control */}
        {/*
          TODO: Once audioSrc is set on the item, audio will auto-play on open.
          The audio element is intentionally hidden; use the mute button above.
          Add crossOrigin="anonymous" if using an external URL.
        */}
        <audio
          ref={audioRef}
          src={item.audioSrc || undefined}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          // Uncomment if using external audio URLs:
          // crossOrigin="anonymous"
        />

        {/* Playback indicator */}
        {item.audioSrc && (
          <div className="flex items-center gap-2 px-6 pb-4 text-[0.65rem] uppercase tracking-[0.15em] text-fg/30 shrink-0">
            <span className={`w-1.5 h-1.5 rounded-full ${playing ? "bg-accent animate-pulse" : "bg-fg/20"}`} />
            {playing ? (language === "es" ? "Reproduciendo" : "Playing") : (language === "es" ? "Pausado" : "Paused")}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Card component ───────────────────────────────────────────────────────────
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
    <div className="rounded-[2rem] border border-[rgba(250,248,245,0.05)] bg-surface overflow-hidden hover:border-[rgba(67,179,174,0.15)] transition-all duration-300 shadow-[var(--shadow-card)]">
      <button
        onClick={onClick}
        aria-label={`Open spectrogram: ${title}`}
        className="w-full group"
      >
        {/* Image area */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {item.imageSrc ? (
            /*
              TODO: Once imageSrc is set, this displays the spectrogram thumbnail.
            */
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.imageSrc}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            /* TODO: Remove this placeholder once imageSrc is set */
            <div className="absolute inset-0 bg-surface-2 flex items-center justify-center">
              {/* Placeholder spectrogram bars */}
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 200 120"
                preserveAspectRatio="none"
              >
                {Array.from({ length: 20 }, (_, i) => (
                  <rect
                    key={i}
                    x={i * 10}
                    y={120 - (30 + ((i * 37 + 13) % 70))}
                    width={8}
                    height={30 + ((i * 37 + 13) % 70)}
                    fill={`oklch(0.72 0.12 ${80 + i * 5})`}
                  />
                ))}
              </svg>
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-bg/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border border-accent/50 flex items-center justify-center">
              <ZoomIn size={20} className="text-accent" />
            </div>
          </div>

          {/* Year badge */}
          <span className="absolute top-3 left-3 text-[0.55rem] uppercase tracking-[0.15em] text-fg/60 bg-bg/60 backdrop-blur-sm px-2 py-1 rounded-full">
            {item.year}
          </span>
        </div>

        {/* Card label */}
        <div className="px-5 py-4">
          <p className="text-sm font-light text-fg/70 text-left line-clamp-2 leading-snug">
            {title}
          </p>
        </div>
      </button>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function SpectrogramsSection() {
  const { t } = useLanguage();
  const [active, setActive] = useState<SpectrogramItem | null>(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <>
      <section id="spectrograms" className="bg-bg min-h-screen py-20 px-8 md:px-16 pt-32">
        <div className="max-w-7xl mx-auto">

          {/* Section label */}
          <p className="text-[0.75rem] uppercase tracking-[0.28em] text-fg/30 mb-16">
            05 — {t("spectrograms_heading")}
          </p>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <h2 className="font-serif italic font-normal text-[clamp(3.5rem,7vw,7rem)] leading-none text-accent">
              {t("spectrograms_heading")}
            </h2>
            <p className="text-sm font-light text-fg/40 max-w-sm hidden md:block">
              {t("spectrograms_sub")}
            </p>
          </div>

          {/* Mobile subtitle */}
          <p className="text-sm font-light text-fg/40 mb-10 md:hidden">
            {t("spectrograms_sub")}
          </p>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spectrograms.map((item) => (
              <SpectrogramCard
                key={item.id}
                item={item}
                onClick={() => setActive(item)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Fullscreen lightbox — rendered outside section for proper z-index */}
      {active && <Lightbox item={active} onClose={close} />}
    </>
  );
}
