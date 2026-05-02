"use client";

import { useState, useEffect } from "react";
import { useLanguage, type Language } from "@/lib/language-context";

function LangButton({ label, onClick }: { label: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        padding: "4px 0",
        background: "none",
        border: "none",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        fontSize: "0.75rem",
        textTransform: "uppercase",
        letterSpacing: "0.2em",
        color: hovered ? "#FAF8F5" : "rgba(250,248,245,0.5)",
        cursor: "pointer",
        transition: "color 0.25s ease",
      }}
    >
      {label}
      <span
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "#43B3AE",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.25s ease",
        }}
      />
    </button>
  );
}

export default function HeroSection({ onChoose }: { onChoose: () => void }) {
  const { language, setLanguage } = useLanguage();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 50);
    const t2 = setTimeout(() => setPhase(2), 1000);
    const t3 = setTimeout(() => setPhase(3), 2300);
    const t4 = setTimeout(() => setPhase(4), 3700);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  function choose(lang: Language) {
    setLanguage(lang);
    onChoose();
  }

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
        paddingBottom: 80,
        paddingLeft: "clamp(32px, 5vw, 64px)",
        paddingRight: "clamp(32px, 5vw, 64px)",
        background: "#0A0A0B",
      }}
    >
      {/* Background image — fades in at phase 1 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/images/chicharra_hero.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: phase >= 1 ? 1 : 0,
          transition: "opacity 2s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
      />

      {/* Content — bottom-left */}
      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 900 }}>

        {/* "Compositor · Pianista" — phase 3 */}
        <div
          style={{
            opacity: phase >= 3 ? 1 : 0,
            transform: phase >= 3 ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.8s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)",
            marginBottom: 22,
          }}
        >
          <span
            style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontSize: "0.75rem",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.28em",
              color: "rgba(250,248,245,0.45)",
              whiteSpace: "nowrap",
            }}
          >
            {language === "es" ? "Compositor · Pianista" : "Composer · Pianist"}
          </span>
        </div>

        {/* Artist name — phase 2 */}
        <div
          style={{
            marginBottom: 38,
            opacity: phase >= 2 ? 1 : 0,
            transition: "opacity 1.2s cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
        >
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(3.2rem, 8.5vw, 8rem)",
              lineHeight: 0.88,
              letterSpacing: "-0.02em",
              color: "#FAF8F5",
              margin: 0,
            }}
          >
            Esteban
          </h1>
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(3.2rem, 8.5vw, 8rem)",
              lineHeight: 0.88,
              letterSpacing: "-0.02em",
              color: "#FAF8F5",
              margin: 0,
            }}
          >
            Ruiz-Velasco
          </h1>
        </div>

        {/* Tagline — phase 3 */}
        <div
          style={{
            opacity: phase >= 3 ? 1 : 0,
            transform: phase >= 3 ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.8s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)",
            marginBottom: 40,
          }}
        >
          <p
            style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontSize: "0.75rem",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.28em",
              color: "rgba(250,248,245,0.45)",
              whiteSpace: "nowrap",
              margin: 0,
            }}
          >
            {language === "es"
              ? "Arte sonoro · Música de concierto · Multimedia"
              : "Sound art · Concert music · Multimedia"}
          </p>
        </div>

        {/* Language buttons — phase 4 */}
        <div
          style={{
            opacity: phase >= 4 ? 1 : 0,
            transform: phase >= 4 ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.8s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
        >
          <div style={{ display: "flex", gap: 28, flexWrap: "wrap", alignItems: "flex-start" }}>
            <LangButton label="Español" onClick={() => choose("es")} />
            <LangButton label="English" onClick={() => choose("en")} />
          </div>
        </div>

      </div>
    </section>
  );
}
