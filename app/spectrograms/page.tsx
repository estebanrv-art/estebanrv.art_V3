"use client";

import Navbar from "@/components/navbar";
import SpectrogramsSection from "@/components/spectrograms-section";
import Footer from "@/components/footer";

export default function SpectrogramsPage() {
  return (
    <>
      <Navbar />
      <main>
        <SpectrogramsSection />
      </main>
      <Footer />
    </>
  );
}
