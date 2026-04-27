"use client";

import { useLanguage } from "@/lib/language-context";

export default function BioSection() {
  const { t } = useLanguage();

  return (
    <section id="bio" className="bg-bg min-h-screen py-20 px-8 md:px-16 pt-32">
      <div className="max-w-7xl mx-auto">

        {/* Section label */}
        <p className="text-[0.75rem] uppercase tracking-[0.28em] text-fg/30 mb-16">
          01 — {t("bio_heading")}
        </p>

        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Text column */}
          <div>
            <h2 className="font-serif italic font-normal text-[clamp(3.5rem,7vw,7rem)] leading-none text-accent mb-12">
              {t("bio_heading")}
            </h2>

            <div className="space-y-6">
              <p className="text-base font-light text-fg/55 leading-relaxed">{t("bio_p1")}</p>
              <p className="text-base font-light text-fg/55 leading-relaxed">{t("bio_p2")}</p>
              <p className="text-base font-light text-fg/55 leading-relaxed">{t("bio_p3")}</p>
            </div>

            {/* Decorative divider */}
            <div className="flex items-center gap-4 mt-12">
              <div className="h-px flex-1 bg-fg/5" />
              <div className="w-1.5 h-1.5 rounded-full bg-accent/40" />
            </div>
          </div>

          {/* Photo column */}
          <div className="flex flex-col items-center gap-4">
            {/*
              TODO: Replace this placeholder with the artist's photo:
                - Place image at /public/images/bio-photo.jpg (or .webp)
                - Update the <img> src below to "/images/bio-photo.jpg"
                - Adjust aspect ratio and object-position as needed
            */}
            <div className="relative w-full aspect-[3/4] max-w-sm mx-auto rounded-[2rem] overflow-hidden border border-[rgba(250,248,245,0.05)] bg-surface">
              {/* Placeholder visual */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-fg/15">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
                <span className="text-[0.65rem] uppercase tracking-[0.2em]">
                  {/* TODO: Remove this label once photo is added */}
                  Photo
                </span>
              </div>

              {/* Subtle corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-accent/20 rounded-tr-[2rem] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-accent/20 rounded-bl-[2rem] pointer-events-none" />
            </div>

            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-fg/30">
              Esteban Ruiz-Velasco
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
