"use client";

import { useLanguage } from "@/lib/language-context";

export default function BioSection() {
  const { language, t } = useLanguage();

  return (
    <section id="bio" className="bg-bg min-h-screen px-[clamp(32px,5vw,64px)] pt-[120px] pb-20">
      <div className="max-w-[1280px] mx-auto">

        {/* Single column on mobile, 4fr/5fr on md+ */}
        <div className="grid items-start gap-[clamp(32px,6vw,96px)] grid-cols-1 md:[grid-template-columns:4fr_5fr]">
          {/* Text column */}
          <div>
            <h2 className="font-serif italic font-normal text-[clamp(3.5rem,7vw,7rem)] leading-none text-accent mb-12">
              {t("bio_heading")}
            </h2>

            <div className="flex flex-col gap-6">
              <p className="text-base font-light text-fg/55 leading-[1.7]">{t("bio_p1")}</p>
              <p className="text-base font-light text-fg/55 leading-[1.7]">{t("bio_p2")}</p>
              <p className="text-base font-light text-fg/55 leading-[1.7]">{t("bio_p3")}</p>
              <p className="text-base font-light text-fg/55 leading-[1.7]">{t("bio_p4")}</p>
            </div>

            {/* Decorative divider */}
            <div className="flex items-center gap-4 mt-12">
              <div className="h-px flex-1 bg-fg/5" />
              <div className="w-1.5 h-1.5 rounded-full bg-accent/40" />
            </div>
          </div>

          {/* Photo column — tall with overlay caption */}
          <div className="relative">
            <div
              className="relative w-full rounded-[2rem] overflow-hidden border border-[rgba(250,248,245,0.05)] bg-surface"
              style={{ aspectRatio: "2/3" }}
            >
              {/* Placeholder */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-fg/[0.12]">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
                <span className="text-[0.6rem] uppercase tracking-[0.2em]">Photo</span>
              </div>

              {/* Corner accents */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-accent/20 rounded-tr-[2rem] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-accent/20 rounded-bl-[2rem] pointer-events-none" />

              {/* Overlay caption */}
              <div
                className="absolute bottom-6 left-6 rounded-[1rem] px-4 py-3 border border-[rgba(67,179,174,0.15)]"
                style={{ background: "rgba(10,10,11,0.8)", backdropFilter: "blur(12px)" }}
              >
                <span className="block font-serif italic text-[0.9rem] text-fg">
                  Esteban Ruiz-Velasco
                </span>
                <span className="block text-[0.6rem] uppercase tracking-[0.2em] text-fg/40 mt-1">
                  {language === "es" ? "Compositor · Pianista" : "Composer · Pianist"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
