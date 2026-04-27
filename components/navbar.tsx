"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

const NAV_SECTIONS = [
  { key: "nav_bio",          href: "/bio" },
  { key: "nav_works",        href: "/works" },
  { key: "nav_recordings",   href: "/recordings" },
  { key: "nav_videos",       href: "/videos" },
  { key: "nav_spectrograms", href: "/spectrograms" },
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
            ? "bg-[rgba(17,18,20,0.78)] backdrop-blur-[20px] saturate-[1.8] border-b border-[rgba(67,179,174,0.18)] shadow-[0_8px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(67,179,174,0.08)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between px-8 py-5">

          {/* Logo — links back to landing page */}
          <Link href="/" className="flex flex-col group">
            <span className="font-serif italic text-[1.05rem] leading-none text-fg tracking-[-0.01em] group-hover:text-accent transition-colors duration-200">
              Esteban Ruiz-Velasco
            </span>
            <span className="text-[0.6rem] uppercase tracking-[0.18em] text-fg/30 mt-0.5">
              {language === "es" ? "Compositor · Pianista" : "Composer · Pianist"}
            </span>
          </Link>

          {/* Desktop nav links ─────────────────────── */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_SECTIONS.map(({ key, href }) => (
              <Link
                key={href}
                href={href}
                className="text-[0.7rem] uppercase tracking-[0.08em] text-fg/50 hover:text-fg hover:-translate-y-px transition-all duration-200"
              >
                {t(key as Parameters<typeof t>[0])}
              </Link>
            ))}
            {/* Contact — mailto link */}
            <a
              href="mailto:contacto@estebanrv.art"
              className="text-[0.7rem] uppercase tracking-[0.08em] text-fg/50 hover:text-fg hover:-translate-y-px transition-all duration-200"
            >
              {t("nav_contact")}
            </a>
          </nav>

          {/* Language toggle + mobile burger ──────────── */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              aria-label="Toggle language"
              className="text-[0.65rem] uppercase tracking-[0.15em] text-fg/40 hover:text-accent px-3 py-1.5 rounded-full border border-fg/10 hover:border-accent/35 transition-all duration-200"
            >
              {t("lang_toggle")}
            </button>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="md:hidden text-fg/50 hover:text-fg transition-colors duration-200"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* ── Mobile dropdown menu ───────────────────────────────────── */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 border-t border-[rgba(250,248,245,0.05)] bg-[rgba(17,18,20,0.95)] backdrop-blur-[20px] ${
            menuOpen ? "max-h-96" : "max-h-0"
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
            <a
              href="mailto:contacto@estebanrv.art"
              onClick={() => setMenuOpen(false)}
              className="text-[0.8rem] uppercase tracking-[0.1em] text-fg/50 hover:text-fg transition-colors duration-200"
            >
              {t("nav_contact")}
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}
