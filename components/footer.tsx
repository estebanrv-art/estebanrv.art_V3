"use client";

import { useLanguage } from "@/lib/language-context";

// Social link icons as inline SVGs to avoid extra dependencies
function YoutubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
    </svg>
  );
}

function SpotifyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.52 17.28c-.24.36-.66.48-1.02.24-2.82-1.74-6.36-2.1-10.56-1.14-.42.12-.78-.18-.9-.54-.12-.42.18-.78.54-.9 4.56-1.02 8.52-.6 11.64 1.26.42.18.48.66.3 1.08zm1.44-3.3c-.3.42-.84.54-1.26.24-3.24-1.98-8.16-2.58-11.94-1.38-.48.12-.99-.12-1.14-.6-.12-.48.12-.99.6-1.14 4.38-1.32 9.78-.66 13.5 1.62.36.3.48.84.24 1.26zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.3c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38C8.88 5.94 15.96 6.18 20.1 8.76c.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.44.3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-surface border-t border-[rgba(250,248,245,0.05)] py-12 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Site tagline */}
          <p className="text-sm font-light text-fg/35 tracking-wide">
            {language === "es"
              ? "Arte sonoro, música de concierto y multimedia"
              : "Sound Art, Concert and Multimedia Music"}
          </p>

          {/* Social links */}
          <div className="flex items-center gap-5">
            {/*
              TODO: Replace "#" with actual social media profile URLs:
                - YouTube:   "https://www.youtube.com/@..."
                - Spotify:   "https://open.spotify.com/artist/..."
                - Instagram: "https://www.instagram.com/..."
            */}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-fg/35 hover:text-[#FF0000] hover:-translate-y-0.5 transition-all duration-200"
            >
              <YoutubeIcon />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Spotify"
              className="text-fg/35 hover:text-[#1DB954] hover:-translate-y-0.5 transition-all duration-200"
            >
              <SpotifyIcon />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-fg/35 hover:text-[#E1306C] hover:-translate-y-0.5 transition-all duration-200"
            >
              <InstagramIcon />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-fg/20">
            {t("footer_copy")}
          </p>
        </div>
      </div>
    </footer>
  );
}
