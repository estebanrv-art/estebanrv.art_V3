"use client";

import Navbar from "@/components/navbar";
import ScoresSection from "@/components/scores-section";
import Footer from "@/components/footer";

export default function ScoresPage() {
  return (
    <>
      <Navbar />
      <main>
        <ScoresSection />
      </main>
      <Footer />
    </>
  );
}
