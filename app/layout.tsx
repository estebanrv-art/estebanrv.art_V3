import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Esteban Ruiz-Velasco — Compositor · Pianista",
  description:
    "Sitio oficial de Esteban Ruiz-Velasco, compositor y pianista de música contemporánea.",
  keywords: ["compositor", "pianista", "música contemporánea", "composer", "pianist"],
  icons: {
    icon: "/images/thumbnail.webp",
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
    <html lang="es" className={playfair.variable}>
      <body className="font-sans antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
