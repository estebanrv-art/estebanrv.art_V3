"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "es" | "en";

// All UI strings and section content, bilingual
const translations = {
  es: {
    // Navbar
    nav_bio: "Bio",
    nav_works: "Obras",
    nav_scores: "Partituras",
    nav_recordings: "Grabaciones",
    nav_videos: "Videos",
    nav_spectrograms: "Espectrogramas",
    // TODO: add labels for future nav sections (e.g. nav_projects, nav_press)
    nav_contact: "Contacto",
    lang_toggle: "EN",

    // Hero
    hero_tagline: "Arte sonoro, música de concierto y multimedia.",
    hero_select_lang: "Selecciona tu idioma",
    hero_lang_es: "Español",
    hero_lang_en: "English",

    // Bio
    bio_heading: "Bio",
    bio_p1:
      "Nacido en la Ciudad de México, realizó estudios superiores de piano en la Escuela Superior de Música del INBA " +
      "bajo la cátedra de Camelia Goila y Naoya Seino, y una Maestría en Composición en la Facultad de Música de la UNAM " +
      "bajo la tutoría de Gabriela Ortiz.",
    bio_p2:
      "Su trabajo como compositor abarca música para ensamble, electrónica, instalaciones multimedia e interactivas " +
      "y música incidental. Entre sus estrenos más recientes destacan Ecolalia 2 para percusiones, interpretada por " +
      "Enrique Nieto en el FARO Cosmos (2021), y Ecolalia Cero con el Ensamble del CEPROMUSIC en el Teatro de las Artes " +
      "(2021), ambas parte del ciclo Ecolalias, que explora la frontera entre el paisaje sonoro y la escritura " +
      "instrumental. También destacan 'El Laberinto de los Sentidos', estrenada bajo la dirección de Gustavo Rivero Weber con la OJUEM " +
      "(2018), y 'Árgax', instalación en entorno de realidad virtual presentada en la Galería Arte Binario del CENART (2018), " +
      "apoyada por el PAPIAM del CENART-INBA. Ha colaborado con ensambles como el CEPROMUSIC, el Cuarteto Aurora y el Dúo México con Brío, " +
      "quienes grabaron sus obras en el disco Invocaciones (Urtext, 2016).",
    bio_p3:
      "Su trayectoria ha sido reconocida con múltiples distinciones, entre ellas dos becas del FONCA/SACPC como " +
      "Joven Creador (2017 y 2020), el programa Virtual Partner Residencies del Goethe Institut Berlin (2020), " +
      "el Programa de Fortalecimiento de Jóvenes Compositores del CEPROMUSIC/INBA (2020) y la Cátedra Extraordinaria " +
      "Arturo Márquez de la UNAM (2017).",
    bio_p4:
      "De manera paralela ha desarrollado una carrera en música incidental para cine, teatro y medios digitales. " +
      "Destaca su música original para el cortometraje 'Lolo' de Ana Salgado (2024), que ha circulado en festivales " +
      "internacionales cosechando reconocimientos como Mejor Cortometraje Mexicano en el Festival Internacional " +
      "Mirada Corta 2025 y el Curators Award en el Davis Feminist Film Festival, entre otros. También son destacables " +
      "sus trabajos para el largometraje 'Las Lágrimas' de Pablo Delgado -ganador del Premio Carte Blanche en el " +
      "Festival de Locarno- y la obra teatral 'Negro de Humo' de Fernando Bueno, premiada en el Festival Internacional " +
      "de Teatro Universitario de la UNAM.",

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

    // Projects
    nav_projects: "Proyectos",
    projects_heading: "Proyectos",
    projects_sub: "Herramientas, librerías y proyectos de software que he desarrollado.",

    // Contact
    contact_heading: "Contacto",
    contact_sub: "Para conciertos, colaboraciones o consultas.",
    contact_fname: "Nombre",
    contact_lname: "Apellido",
    contact_email: "Correo electrónico",
    contact_subject: "Asunto",
    contact_message: "Mensaje",
    contact_submit: "Enviar",
    contact_success: "Mensaje enviado. Gracias por tu interés.",
    contact_email_label: "Correo directo",

    // Footer
    footer_copy: "© 2026 Esteban Ruiz-Velasco",
  },
  en: {
    // Navbar
    nav_bio: "Bio",
    nav_works: "Works",
    nav_scores: "Scores",
    nav_recordings: "Recordings",
    nav_videos: "Videos",
    nav_spectrograms: "Spectrograms",
    // TODO: add labels for future nav sections (e.g. nav_projects, nav_press)
    nav_contact: "Contact",
    lang_toggle: "ES",

    // Hero
    hero_tagline: "Sound art, concert music and multimedia.",
    hero_select_lang: "Select your language",
    hero_lang_es: "Español",
    hero_lang_en: "English",

    // Bio
    bio_heading: "Bio",
    bio_p1:
      "Born in Mexico City, he holds a Bachelor's Degree from the Escuela Superior de Música of INBA under Camelia Goila " +
      "and Naoya Seino, and a Master's degree in Composition at the Facultad de Música of UNAM under the " +
      "mentorship of Gabriela Ortiz.",
    bio_p2:
      "His work as a composer spans music for ensemble, electronics, multimedia/interactive installations, and " +
      "incidental music. Among his most recent premieres are 'Ecolalia 2' for percussion, performed by Enrique Nieto at " +
      "FARO Cosmos (2021), and Ecolalia Cero with the CEPROMUSIC Ensemble at the Teatro de las Artes (2021), both part " +
      "of the 'Ecolalias' cycle, which explores the boundary between soundscape and instrumental writing. 'El Laberinto de " +
      "los Sentidos', premiered under the direction of Gustavo Rivero Weber with the OJUEM (2018), stands as one of the " +
      "most significant works in his catalog. Also notable is 'Árgax', a virtual reality installation presented at the " +
      "Arte Binario Gallery at CENART (2018), supported by the PAPIAM of CENART-INBA. He has collaborated with ensembles " +
      "such as CEPROMUSIC, Cuarteto Aurora, and Dúo México con Brío, who recorded his works on the album Invocaciones " +
      "(Urtext, 2016).",
    bio_p3:
      "His career has been recognized with multiple distinctions, including two 'Jovenes Creadores' FONCA/SACPC grants " +
      "(2017 and 2020), the Virtual Partner Residencies program of the Goethe Institut Berlin (2020), the CEPROMUSIC/INBA " +
      "'Programa de Fortalecimiento de Jóvenes Compositores' (2020), and the Cátedra Extraordinaria Arturo Márquez at UNAM (2017).",
    bio_p4:
      "Alongside his concert work, he has developed a career in incidental music for film, theater, and digital media. " +
      "Highlights include his original score for the short film 'Lolo' by Ana Salgado (2024), which has screened at several " +
      "international festivals earning recognition such as Best Mexican Short Film at the Festival Internacional Mirada " +
      "Corta 2025 and the Curators Award at the Davis Feminist Film Festival, among others. Also notable are his scores " +
      "for the feature film 'Las Lágrimas' by Pablo Delgado — winner of the Carte Blanche Prize at the Locarno Film " +
      "Festival — and the theatrical work 'Negro de Humo' by Fernando Bueno, awarded at the Festival Internacional de " +
      "Teatro Universitario of UNAM.",

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

    // Projects
    nav_projects: "Projects",
    projects_heading: "Projects",
    projects_sub: "Tools, libraries, and software projects I've built.",

    // Contact
    contact_heading: "Contact",
    contact_sub: "For performances, collaborations or enquiries.",
    contact_fname: "First name",
    contact_lname: "Last name",
    contact_email: "Email",
    contact_subject: "Subject",
    contact_message: "Message",
    contact_submit: "Send",
    contact_success: "Message sent. Thank you for your interest.",
    contact_email_label: "Direct email",

    // Footer
    footer_copy: "© 2026 Esteban Ruiz-Velasco",
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
