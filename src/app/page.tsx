"use client";

import React, { useState } from "react";
import { Preloader } from "@/components/common/Preloader";
import { Navbar } from "@/components/common/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { Marquee } from "@/components/common/Marquee";
import { AboutSection } from "@/components/sections/AboutSection";
import { BusinessesSection } from "@/components/sections/BusinessesSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { UpcomingVenturesSection } from "@/components/sections/UpcomingVenturesSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { BehindTheJourneyGallery } from "@/components/sections/BehindTheJourneyGallery";
import { ContactSection } from "@/components/sections/ContactSection";
import { ClosingSection } from "@/components/sections/ClosingSection";
import { Footer } from "@/components/common/Footer";

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#F8F6F0] text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212] transition-colors duration-500">
      {/* 0-100% Preloader Curtain Reveal */}
      <Preloader onComplete={() => setPreloaderDone(true)} />

      {/* Main Experience Layout */}
      <div
        className={`transition-opacity duration-1000 ${
          preloaderDone ? "opacity-100" : "opacity-0"
        }`}
      >
        <Navbar isLoaded={preloaderDone} />

        <main id="main-content">
          {/* 1. Hero */}
          <HeroSection isLoaded={preloaderDone} />

          {/* Infinite Marquee Keywords Strip */}
          <Marquee />

          {/* 2. About Me */}
          <AboutSection />

          {/* 3. My Businesses (Sticky Stacking Cards) */}
          <BusinessesSection />

          {/* 4. My Journey (Timeline) */}
          <JourneySection />

          {/* 5. Consultancy Services */}
          <ServicesSection />

          {/* 6. Upcoming Ventures (In the Works / Coming Soon) */}
          <UpcomingVenturesSection />

          {/* 7. Achievements & Milestones (Bellebirds real photos feature & press) */}
          <AchievementsSection />

          {/* Horizontal Drag Gallery: Behind the Journey */}
          <BehindTheJourneyGallery />

          {/* 8. Contact Section */}
          <ContactSection />

          {/* 9. Closing Statement */}
          <ClosingSection />
        </main>

        {/* Closing Footer with Grouped Links & Wordmark */}
        <Footer />
      </div>
    </div>
  );
}
