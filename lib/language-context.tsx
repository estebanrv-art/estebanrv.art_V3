"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "es" | "en";

// All UI strings and section content, bilingual
const translations = {
  es: {
    // Navbar
    nav_bio: "Biografía",
    nav_works: "Obras",
    nav_recordings: "Grabaciones",
    nav_videos: "Videos",
    nav_spectrograms: "Espectrogramas",
    nav_contact: "Contacto",
    lang_toggle: "EN",

    // Hero
    hero_tagline: "Arte sonoro, música de concierto y multimedia.",
    hero_select_lang: "Selecciona tu idioma",
    hero_lang_es: "Español",
    hero_lang_en: "English",

    // Bio
    bio_heading: "Sobre Esteban",
    bio_p1:
      "Esteban Ruiz-Velasco es un compositor y pianista de música contemporánea, " +
      "con un amplio repertorio que abarca desde obras solistas hasta composiciones " +
      "para ensambles de cámara y proyectos electroacústicos.",
    bio_p2:
      "Formado en conservatorios de México y Europa, ha desarrollado un lenguaje " +
      "musical propio que integra técnicas de composición académica con elementos " +
      "de la música popular y la improvisación.",
    bio_p3:
      "Su obra ha sido interpretada en festivales y salas de concierto en América " +
      "Latina, Europa y Estados Unidos.",

    // Works
    works_heading: "Obras",
    works_listen: "Escuchar",
    works_score: "Partitura",
    works_instrumentation: "Instrumentación",

    // Recordings
    recordings_heading: "Grabaciones",
    recordings_listen: "Escuchar",
    recordings_placeholder: "Próximamente",

    // Videos
    videos_heading: "Videos",
    videos_watch: "Ver",
    videos_placeholder: "Próximamente",

    // Spectrograms
    spectrograms_heading: "Espectrogramas",
    spectrograms_sub:
      "Haz clic en una imagen para verla en pantalla completa y escuchar la obra.",
    spectrograms_close: "Cerrar",

    // Footer
    footer_copy: "© 2026 Esteban Ruiz-Velasco. Todos los derechos reservados.",
  },
  en: {
    // Navbar
    nav_bio: "Biography",
    nav_works: "Works",
    nav_recordings: "Recordings",
    nav_videos: "Videos",
    nav_spectrograms: "Spectrograms",
    nav_contact: "Contact",
    lang_toggle: "ES",

    // Hero
    hero_tagline: "Sound art, concert music and multimedia.",
    hero_select_lang: "Select your language",
    hero_lang_es: "Español",
    hero_lang_en: "English",

    // Bio
    bio_heading: "About Esteban",
    bio_p1:
      "Esteban Ruiz-Velasco is a composer and pianist of contemporary music, " +
      "with a broad repertoire spanning solo works, chamber ensemble compositions, " +
      "and electroacoustic projects.",
    bio_p2:
      "Trained at conservatories in Mexico and Europe, he has developed a personal " +
      "musical language that integrates academic composition techniques with elements " +
      "of popular music and improvisation.",
    bio_p3:
      "His works have been performed at festivals and concert halls across Latin " +
      "America, Europe, and the United States.",

    // Works
    works_heading: "Works",
    works_listen: "Listen",
    works_score: "Score",
    works_instrumentation: "Instrumentation",

    // Recordings
    recordings_heading: "Recordings",
    recordings_listen: "Listen",
    recordings_placeholder: "Coming Soon",

    // Videos
    videos_heading: "Videos",
    videos_watch: "Watch",
    videos_placeholder: "Coming Soon",

    // Spectrograms
    spectrograms_heading: "Spectrograms",
    spectrograms_sub:
      "Click an image to view it fullscreen and listen to the piece.",
    spectrograms_close: "Close",

    // Footer
    footer_copy: "© 2026 Esteban Ruiz-Velasco. All rights reserved.",
  },
};

type TranslationKey = keyof typeof translations.es;

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("es");

  function setLanguage(lang: Language) {
    setLanguageState(lang);
  }

  function toggleLanguage() {
    setLanguage(language === "es" ? "en" : "es");
  }

  function t(key: TranslationKey): string {
    return translations[language][key] ?? key;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
