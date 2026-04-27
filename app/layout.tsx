import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";

export const metadata: Metadata = {
  title: "Esteban Ruiz-Velasco — Compositor · Pianista",
  description:
    "Sitio oficial de Esteban Ruiz-Velasco, compositor y pianista de música contemporánea.",
  keywords: ["compositor", "pianista", "música contemporánea", "composer", "pianist"],
  icons: {
    icon: "/images/thumbnail.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // lang is set dynamically in client components via context;
    // default to "es" here for SEO
    <html lang="es">
      <body className="font-sans antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
