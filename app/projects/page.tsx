"use client";

import Navbar from "@/components/navbar";
import ProjectsSection from "@/components/projects-section";
import Footer from "@/components/footer";

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main>
        <ProjectsSection />
      </main>
      <Footer />
    </>
  );
}
