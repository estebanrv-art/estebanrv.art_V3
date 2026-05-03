"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/language-context";

function InputField({
  label,
  id,
  type = "text",
  required = true,
  placeholder = "",
  multiline = false,
}: {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  multiline?: boolean;
}) {
  const [focused, setFocused] = useState(false);

  const fieldStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(250,248,245,0.04)",
    border: `1px solid ${focused ? "rgba(67,179,174,0.4)" : "rgba(250,248,245,0.08)"}`,
    borderRadius: "1rem",
    padding: multiline ? "16px 20px" : "14px 20px",
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    fontSize: "0.9rem",
    fontWeight: 300,
    color: "#FAF8F5",
    outline: "none",
    transition: "border-color 0.2s",
    resize: multiline ? "vertical" : "none",
    boxSizing: "border-box",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <label
        htmlFor={id}
        style={{
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontSize: "0.7rem",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          color: "rgba(250,248,245,0.35)",
        }}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={id}
          required={required}
          rows={5}
          placeholder={placeholder}
          style={fieldStyle}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          placeholder={placeholder}
          style={fieldStyle}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      )}
    </div>
  );
}

function SubmitButton({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="submit"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "14px 40px",
        borderRadius: "4rem",
        border: "1px solid rgba(67,179,174,0.35)",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        fontSize: "0.75rem",
        textTransform: "uppercase",
        letterSpacing: "0.2em",
        color: hovered ? "#0A0A0B" : "#FAF8F5",
        background: "transparent",
        cursor: "pointer",
        transform: hovered ? "scale(1.03)" : "scale(1)",
        transition: "transform 0.3s ease, color 0.3s ease",
      }}
    >
      <span
        style={{
          position: "absolute",
          inset: 0,
          background: "#43B3AE",
          transform: hovered ? "translateX(0)" : "translateX(-101%)",
          transition: "transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
      />
      <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
    </button>
  );
}

export default function ContactSection() {
  const { language, t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" className="bg-bg min-h-screen px-[clamp(32px,5vw,64px)] pt-[120px] pb-20">
      <div className="max-w-[1280px] mx-auto">

        <p className="text-[0.75rem] uppercase tracking-[0.28em] text-fg/30 mb-16">
          {language === "es" ? "07 — Contacto" : "07 — Contact"}
        </p>

        {/* 4fr / 5fr grid — stacks to single column on mobile */}
        <div
          className="grid items-start gap-[clamp(32px,6vw,96px)]"
          style={{ gridTemplateColumns: isMobile ? "1fr" : "4fr 5fr" }}
        >
          {/* Left — form */}
          <div>
            <h2 className="font-serif italic font-normal text-[clamp(3.5rem,7vw,7rem)] leading-none text-accent mb-5">
              {t("contact_heading")}
            </h2>
            <p className="text-base font-light text-fg/40 leading-[1.6] mb-12">
              {t("contact_sub")}
            </p>

            {submitted ? (
              <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "32px 0" }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: "1px solid rgba(67,179,174,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#43B3AE",
                    flexShrink: 0,
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: "0.9rem", fontWeight: 300, color: "rgba(250,248,245,0.6)", margin: 0 }}>
                  {t("contact_success")}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 }}>
                  <InputField label={t("contact_fname")} id="fname" placeholder={t("contact_fname")} />
                  <InputField label={t("contact_lname")} id="lname" placeholder={t("contact_lname")} />
                </div>
                <InputField label={t("contact_email")} id="email" type="email" placeholder="correo@ejemplo.com" />
                <InputField label={t("contact_subject")} id="subject" placeholder={t("contact_subject")} />
                <InputField label={t("contact_message")} id="message" multiline placeholder={t("contact_message")} />
                <div>
                  <SubmitButton label={t("contact_submit")} />
                </div>
              </form>
            )}

            {/* Decorative divider */}
            <div className="flex items-center gap-4 mt-12">
              <div className="h-px flex-1 bg-fg/5" />
              <div className="w-1.5 h-1.5 rounded-full bg-accent/40" />
            </div>
          </div>

          {/* Right — photo placeholder */}
          <div className="relative">
            <div
              className="relative w-full rounded-[2rem] overflow-hidden border border-[rgba(250,248,245,0.05)] bg-surface"
              style={{ aspectRatio: "2/3", minHeight: isMobile ? 280 : 480 }}
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

              {/* Email caption */}
              <div
                className="absolute bottom-6 left-6 rounded-[1rem] px-4 py-3 border border-[rgba(67,179,174,0.15)]"
                style={{ background: "rgba(10,10,11,0.8)", backdropFilter: "blur(12px)" }}
              >
                <a
                  href="mailto:contacto@estebanrv.art"
                  className="block font-serif italic text-[0.9rem] text-fg hover:text-accent transition-colors duration-200"
                >
                  contacto@estebanrv.art
                </a>
                <span className="block text-[0.6rem] uppercase tracking-[0.2em] text-fg/40 mt-1">
                  {t("contact_email_label")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
