"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

const NAV_SECTIONS = [
  { key: "nav_bio",          href: "/bio" },
  { key: "nav_works",        href: "/works" },
  { key: "nav_scores",       href: "/scores" },
  { key: "nav_recordings",   href: "/recordings" },
  { key: "nav_videos",       href: "/videos" },
  { key: "nav_spectrograms", href: "/spectrograms" },
  { key: "nav_projects",     href: "/projects" },
  { key: "nav_contact",      href: "/contact" },
] as const;

export default function Navbar() {
  const { t, language, toggleLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[rgba(17,18,20,0.88)] backdrop-blur-[16px] border-b border-[rgba(67,179,174,0.18)] shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between px-8 py-5">

          {/* Logo — links back to landing page */}
          <Link href="/" className="flex flex-col group shrink-0">
            <span className="font-serif italic text-[1.05rem] leading-none text-fg tracking-[-0.01em] group-hover:text-accent transition-colors duration-200 whitespace-nowrap">
              Esteban Ruiz-Velasco
            </span>
            <span className="text-[0.6rem] uppercase tracking-[0.18em] text-fg/30 mt-0.5 whitespace-nowrap">
              {language === "es" ? "Compositor · Pianista" : "Composer · Pianist"}
            </span>
          </Link>

          {/* Desktop nav links ─────────────────────── */}
          <nav className="hidden 2xl:flex items-center gap-5">
            {NAV_SECTIONS.map(({ key, href }) => (
              <Link
                key={href}
                href={href}
                className="text-[0.65rem] uppercase tracking-[0.06em] text-fg/50 hover:text-fg hover:-translate-y-px transition-all duration-200 whitespace-nowrap"
              >
                {t(key as Parameters<typeof t>[0])}
              </Link>
            ))}
          </nav>

          {/* Language toggle + mobile burger ──────────── */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={toggleLanguage}
              aria-label="Toggle language"
              className="relative overflow-hidden group text-[0.65rem] uppercase tracking-[0.15em] px-3 py-1.5 rounded-full border border-fg/10 transition-colors duration-300"
              style={{ color: undefined }}
            >
              <span
                className="absolute inset-0 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              />
              <span className="relative z-10 text-fg/40 group-hover:text-bg transition-colors duration-300">
                {t("lang_toggle")}
              </span>
            </button>

            {/* Hamburger — visible below 2xl */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="2xl:hidden text-fg/50 hover:text-fg transition-colors duration-200"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* ── Mobile dropdown menu ───────────────────────────────────── */}
        <div
          className={`2xl:hidden overflow-hidden transition-all duration-300 border-t border-[rgba(250,248,245,0.05)] ${
            menuOpen
              ? "max-h-96 bg-[rgba(17,18,20,0.95)] backdrop-blur-[20px]"
              : "max-h-0"
          }`}
        >
          <nav className="flex flex-col px-8 py-6 gap-5">
            {NAV_SECTIONS.map(({ key, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="text-[0.8rem] uppercase tracking-[0.1em] text-fg/50 hover:text-fg transition-colors duration-200"
              >
                {t(key as Parameters<typeof t>[0])}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
