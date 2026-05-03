"use client";

import { useState, useEffect } from "react";
import HeroSection from "@/components/hero-section";
import BioSection from "@/components/bio-section";
import WorksSection from "@/components/works-section";
import ScoresSection from "@/components/scores-section";
import RecordingsSection from "@/components/recordings-section";
import VideosSection from "@/components/videos-section";
import SpectrogramsSection from "@/components/spectrograms-section";
import ProjectsSection from "@/components/projects-section";
import ContactSection from "@/components/contact-section";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const SECTIONS: Record<string, React.ComponentType> = {
  bio: BioSection,
  works: WorksSection,
  scores: ScoresSection,
  recordings: RecordingsSection,
  videos: VideosSection,
  spectrograms: SpectrogramsSection,
  projects: ProjectsSection,
  contact: ContactSection,
};

export default function Home() {
  const [atHome, setAtHome] = useState(true);
  const [contentPage, setContentPage] = useState<string | null>(null);
  const [page, setPage] = useState("home");
  const [pageKey, setPageKey] = useState(0);

  useEffect(() => {
    const el = document.documentElement;
    if (atHome) {
      el.style.overflow = "hidden";
    } else {
      el.style.overflow = "";
    }
    return () => { el.style.overflow = ""; };
  }, [atHome]);

  function navigate(p: string) {
    if (p === "home") {
      setAtHome(true);
      setPage("home");
      window.scrollTo({ top: 0, behavior: "instant" });
      setTimeout(() => setContentPage(null), 750);
    } else if (atHome) {
      setContentPage(p);
      setPageKey((k) => k + 1);
      setAtHome(false);
      setPage(p);
      window.scrollTo({ top: 0, behavior: "instant" });
    } else {
      setContentPage(p);
      setPageKey((k) => k + 1);
      setPage(p);
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }

  const ContentSection = contentPage ? SECTIONS[contentPage] : null;

  return (
    <>
      {!atHome && <Navbar onNavigate={navigate} currentPage={page} />}
      <div className={`slide-strip ${atHome ? "at-home" : "at-content"}`}>
        <div className="slide-panel">
          <HeroSection onChoose={() => navigate("bio")} />
        </div>
        <div className="slide-panel" key={pageKey}>
          {ContentSection && (
            <main>
              <ContentSection />
            </main>
          )}
          <Footer />
        </div>
      </div>
    </>
  );
}
