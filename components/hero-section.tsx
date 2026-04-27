"use client";

import { useRouter } from "next/navigation";
import { useLanguage, type Language } from "@/lib/language-context";

export default function HeroSection() {
  const { language, setLanguage, t } = useLanguage();
  const router = useRouter();

  function choose(lang: Language) {
    setLanguage(lang);
    router.push("/bio");
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden flex items-end pb-20 px-8 md:px-16 bg-bg"
    >
      {/* ── Background ─────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-[url('/images/chicharra_hero.png')] bg-cover bg-center bg-no-repeat" />

      {/* Gradient overlay — clear on top, black at bottom */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, rgba(10,10,11,0.97) 0%, rgba(10,10,11,0.30) 100%)" }}
      />

      {/* ── Content — bottom-left ──────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-5xl">

        {/* Artist identity */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-accent" />
            <span className="text-[0.75rem] uppercase tracking-[0.28em] text-fg/30 font-sans">
              {language === "es" ? "Compositor · Pianista" : "Composer · Pianist"}
            </span>
          </div>
          <h1 className="font-serif italic font-normal text-[clamp(3.2rem,8.5vw,8rem)] leading-[0.88] tracking-[-0.02em] text-fg">
            Esteban
          </h1>
          <h1 className="font-serif italic font-normal text-[clamp(3.2rem,8.5vw,8rem)] leading-[0.88] tracking-[-0.02em] text-fg">
            Ruiz-Velasco
          </h1>
          <p className="mt-6 text-base font-light text-fg/55 max-w-md leading-relaxed">
            {t("hero_tagline")}
          </p>
        </div>

        {/* Language buttons */}
        <div>
          <p className="text-[0.75rem] uppercase tracking-[0.28em] text-fg/30 mb-4">
            {t("hero_select_lang")}
          </p>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => choose("es")}
              className="relative overflow-hidden group px-7 py-3 rounded-[4rem] border border-accent/35 text-[0.75rem] uppercase tracking-[0.2em] text-fg transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.03]"
            >
              <span className="absolute inset-0 bg-accent -translate-x-full group-hover:translate-x-0 transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" aria-hidden="true" />
              <span className="relative z-10 group-hover:text-bg transition-colors duration-300">
                {t("hero_lang_es")}
              </span>
            </button>
            <button
              onClick={() => choose("en")}
              className="relative overflow-hidden group px-7 py-3 rounded-[4rem] border border-accent/35 text-[0.75rem] uppercase tracking-[0.2em] text-fg transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.03]"
            >
              <span className="absolute inset-0 bg-accent -translate-x-full group-hover:translate-x-0 transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" aria-hidden="true" />
              <span className="relative z-10 group-hover:text-bg transition-colors duration-300">
                {t("hero_lang_en")}
              </span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
