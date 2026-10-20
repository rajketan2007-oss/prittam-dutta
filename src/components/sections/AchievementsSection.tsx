"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotion } from "@/context/MotionContext";
import { SITE_CONTENT } from "@/data/content";
import { Lightbox, LightboxImage } from "@/components/common/Lightbox";
import { GsapTextReveal } from "@/components/common/GsapTextReveal";
import { Award, Eye, Layers, Newspaper } from "lucide-react";
import { playClickSound, playHoverSound } from "@/utils/sound";

export function AchievementsSection() {
  const { achievements } = SITE_CONTENT;
  const { motionEnabled } = useMotion();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Parallax floating on overlapping stage trophy photo
  useEffect(() => {
    if (!motionEnabled || !sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to(".trophy-floating-card", {
        y: -35,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [motionEnabled]);

  const eventPhotos: LightboxImage[] = [
    {
      src: "/images/bellebirds-team-certificate.jpg",
      alt: "Official Digital Partner certificate and trophy presentation at Bellebirds: The Fashion Street, Season 1",
      caption:
        "Official Digital Partner certificate and trophy presentation at Bellebirds: The Fashion Street (Season 1) — Cyption Founder Pritam Dutta with team.",
      label: "(BELLEBIRDS · OFFICIAL DIGITAL PARTNER)",
    },
    {
      src: "/images/bellebirds-stage-trophy.jpg",
      alt: "Award presentation on stage at Bellebirds: The Fashion Street, Season 1 with Cyption branding on the hexagon screen",
      caption:
        "Stage trophy felicitation at Bellebirds: The Fashion Street (Season 1) with Cyption branding showcased on the main stage backdrop.",
      label: "(STAGE FELICITATION · CYPTION GO DIGITAL)",
    },
    {
      src: "/placeholders/biswa-bangla-news.svg",
      alt: "Biswa Bangla News media feature",
      caption:
        "Media feature in Biswa Bangla News highlighting entrepreneurial milestones and digital innovation.",
      label: "(MEDIA ARCHIVE · BISWA BANGLA NEWS)",
    },
  ];

  const openLightbox = (index: number) => {
    playClickSound();
    setActivePhotoIdx(index);
    setLightboxOpen(true);
  };

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20 border-b border-white/[0.06] dark:border-white/[0.06] light:border-black/[0.06] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#C9A24B] mb-4">
              <span className="text-[#C9A24B]">+</span>
              <span>({achievements.sectionIndex})</span>
              <span>{achievements.label}</span>
              <span className="h-[1px] w-12 bg-[#C9A24B]/30" />
            </div>

            <GsapTextReveal>
              <h2 className="reveal-line text-[clamp(2.4rem,5.5vw,5rem)] font-serif font-normal leading-[1.0] text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212] tracking-tight">
                Every Milestone{" "}
                <span className="italic font-serif text-[#C9A24B]">Has a Story.</span>
              </h2>
            </GsapTextReveal>
          </div>
          <p className="text-sm md:text-base font-sans text-[#A6A29A] dark:text-[#A6A29A] light:text-[#66625B] max-w-md">
            {achievements.intro}
          </p>
        </div>

        {/* 1minus1 FEATURE HERO LAYOUT AROUND REAL ATTACHED PHOTOS */}
        <div className="mb-20 p-8 md:p-14 rounded-3xl border border-[#C9A24B]/35 bg-[#0D0D0D]/95 dark:bg-[#0D0D0D]/95 light:bg-[#FFFFFF]/95 shadow-2xl relative overflow-hidden backdrop-blur-xl group">
          {/* Subtle gold ambient glow in background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A24B]/10 rounded-full blur-3xl pointer-events-none" />

          {/* HUD Corner Reticles */}
          <span className="absolute top-3 left-3 text-[10px] font-mono text-[#C9A24B]/40 leading-none">
            +
          </span>
          <span className="absolute top-3 right-3 text-[10px] font-mono text-[#C9A24B]/40 leading-none">
            +
          </span>
          <span className="absolute bottom-3 left-3 text-[10px] font-mono text-[#C9A24B]/40 leading-none">
            +
          </span>
          <span className="absolute bottom-3 right-3 text-[10px] font-mono text-[#C9A24B]/40 leading-none">
            +
          </span>

          {/* Feature Header */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-10 border-b border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08]">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#C9A24B]/15 border border-[#C9A24B]/40 flex items-center justify-center text-[#E8C877] shadow-inner">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#E8C877] font-semibold">
                  OFFICIAL DIGITAL PARTNER · SEASON 1
                </span>
                <h3 className="text-2xl md:text-3xl font-serif text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212] font-semibold">
                  Bellebirds: The Fashion Street
                </h3>
              </div>
            </div>

            <span className="text-xs font-mono uppercase tracking-widest text-[#A6A29A] dark:text-[#A6A29A] light:text-[#66625B]">
              [ ARCHIVED MILESTONE: VERIFIED ]
            </span>
          </div>

          {/* Overlapping Dual Image Editorial Composition with GSAP Parallax */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Large Photo: Certificate & Star Trophy */}
            <div className="lg:col-span-7">
              <div
                onClick={() => openLightbox(0)}
                onMouseEnter={() => playHoverSound()}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#C9A24B]/40 bg-black cursor-pointer shadow-2xl transition-all duration-500 hover:border-[#E8C877] hover:shadow-[0_20px_50px_rgba(201,162,75,0.25)]"
                data-cursor="view"
              >
                <Image
                  src="/images/bellebirds-team-certificate.jpg"
                  alt="Official Digital Partner certificate and trophy presentation at Bellebirds: The Fashion Street, Season 1"
                  fill
                  priority
                  className="object-cover object-center group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 700px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Overlaid Captions */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-[#F2EFE9]">
                  <span className="bg-black/75 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-md">
                    Official Digital Partner Honours
                  </span>
                  <span className="flex items-center gap-1.5 text-[#E8C877] bg-black/75 px-3 py-1.5 rounded-lg border border-[#C9A24B]/40 backdrop-blur-md">
                    <Eye className="w-3.5 h-3.5" />
                    Expand Proof
                  </span>
                </div>
              </div>
            </div>

            {/* Right Offset Overlapping Photo: Stage Felicitation with Cyption on Screen with GSAP Floating Parallax */}
            <div className="trophy-floating-card lg:col-span-5 space-y-6">
              <div
                onClick={() => openLightbox(1)}
                onMouseEnter={() => playHoverSound()}
                className="group relative aspect-[16/10] rounded-2xl overflow-hidden border border-[#C9A24B]/35 bg-black cursor-pointer shadow-2xl lg:-ml-12 lg:translate-y-4 z-20 transition-all duration-500 hover:border-[#E8C877]"
                data-cursor="view"
              >
                <Image
                  src="/images/bellebirds-stage-trophy.jpg"
                  alt="Award presentation on stage at Bellebirds: The Fashion Street, Season 1 with Cyption branding on the hexagon screen"
                  fill
                  className="object-cover object-center group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 500px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-[#F2EFE9]">
                  <span className="bg-black/75 px-3 py-1 rounded-md border border-white/10 backdrop-blur-md">
                    Stage Felicitation · Cyption Logo
                  </span>
                  <span className="text-[#E8C877] font-semibold">Click to View</span>
                </div>
              </div>

              {/* Editorial Description Text */}
              <div className="p-6 rounded-2xl bg-white/[0.02] dark:bg-white/[0.02] light:bg-black/[0.02] border border-white/[0.06] space-y-3">
                <p className="text-sm md:text-base font-sans text-[#A6A29A] dark:text-[#A6A29A] light:text-[#66625B] leading-relaxed">
                  An opportunity to contribute to the branding of a fashion event and participate in
                  a creative, event-focused project.
                </p>
                <p className="text-xs font-mono text-[#E8C877]">
                  Archived: Bellebirds: The Fashion Street (Season 1) Official Digital Partner
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Grid for Biswa Bangla News & Digital Marketing Client Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
          {/* Milestone 1: Featured in Biswa Bangla News (Cols 1-6) */}
          <div
            onMouseEnter={() => playHoverSound()}
            className="lg:col-span-6 p-8 md:p-10 rounded-3xl border border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] bg-white/[0.02] dark:bg-white/[0.02] light:bg-black/[0.02] flex flex-col justify-between group hover:border-[#C9A24B]/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-[#E8C877]">
                  (MEDIA COVERAGE)
                </span>
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#E8C877]">
                  <Newspaper className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-2xl md:text-3xl font-serif text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212] font-semibold mb-4">
                Featured in Biswa Bangla News
              </h3>

              <p className="text-base font-sans text-[#A6A29A] dark:text-[#A6A29A] light:text-[#66625B] leading-relaxed mb-6">
                A meaningful milestone in my professional journey and an opportunity to gain public
                visibility.
              </p>
            </div>

            {/* Clickable Press Feature Thumbnail */}
            <div
              onClick={() => openLightbox(2)}
              className="relative aspect-[16/9] rounded-xl overflow-hidden border border-[#C9A24B]/20 bg-black/60 cursor-pointer group-hover:border-[#C9A24B]/60 transition-colors"
              data-cursor="view"
            >
              <Image
                src="/placeholders/biswa-bangla-news.svg"
                alt="Biswa Bangla News feature presentation"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="px-4 py-2 rounded-full bg-black/80 border border-[#C9A24B] text-xs font-mono text-[#E8C877]">
                  View Press Archive
                </span>
              </div>
            </div>
          </div>

          {/* Milestone 2: Digital Marketing & Client Projects (Cols 7-12) */}
          <div
            onMouseEnter={() => playHoverSound()}
            className="lg:col-span-6 p-8 md:p-10 rounded-3xl border border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] bg-white/[0.02] dark:bg-white/[0.02] light:bg-black/[0.02] flex flex-col justify-between group hover:border-[#C9A24B]/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-[#E8C877]">
                  (CROSS-INDUSTRY DOMAIN DEPTH)
                </span>
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#E8C877]">
                  <Layers className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-2xl md:text-3xl font-serif text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212] font-semibold mb-4">
                Digital Marketing &amp; Client Projects
              </h3>

              <p className="text-base font-sans text-[#A6A29A] dark:text-[#A6A29A] light:text-[#66625B] leading-relaxed mb-6">
                Through Cyption, I&apos;ve worked with businesses across multiple industries,
                including travel, healthcare, education, jewellery, hospitality, and retail. These
                experiences have helped me understand different markets, business objectives,
                customer behaviours, and the role of digital strategy in business growth.
              </p>
            </div>

            {/* Client Industries Tag Cloud with 1minus1 hover pills */}
            <div className="p-6 rounded-2xl bg-white/[0.02] dark:bg-white/[0.02] light:bg-black/[0.02] border border-white/[0.06]">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#E8C877] block mb-3 font-semibold">
                6 INDUSTRIES SERVED THROUGH CYPTION:
              </span>
              <div className="flex flex-wrap gap-2.5">
                {achievements.industries.map((ind, iIdx) => (
                  <span
                    key={iIdx}
                    className="px-4 py-1.5 rounded-full text-xs font-mono text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212] bg-white/[0.04] dark:bg-white/[0.04] light:bg-black/[0.04] border border-[#C9A24B]/30 hover:border-[#C9A24B] hover:text-[#E8C877] transition-colors"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section Closing Record */}
        <p className="text-center text-sm md:text-base font-serif italic text-[#A6A29A] dark:text-[#A6A29A] light:text-[#66625B]">
          {achievements.closing}
        </p>
      </div>

      {/* Interactive Lightbox Modal */}
      <Lightbox
        images={eventPhotos}
        currentIndex={activePhotoIdx}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIdx) => setActivePhotoIdx(newIdx)}
      />
    </section>
  );
}
