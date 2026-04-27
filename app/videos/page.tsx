"use client";

import Navbar from "@/components/navbar";
import VideosSection from "@/components/videos-section";
import Footer from "@/components/footer";

export default function VideosPage() {
  return (
    <>
      <Navbar />
      <main>
        <VideosSection />
      </main>
      <Footer />
    </>
  );
}
