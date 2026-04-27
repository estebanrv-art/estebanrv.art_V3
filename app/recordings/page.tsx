"use client";

import Navbar from "@/components/navbar";
import RecordingsSection from "@/components/recordings-section";
import Footer from "@/components/footer";

export default function RecordingsPage() {
  return (
    <>
      <Navbar />
      <main>
        <RecordingsSection />
      </main>
      <Footer />
    </>
  );
}
