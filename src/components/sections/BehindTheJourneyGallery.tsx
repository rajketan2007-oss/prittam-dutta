"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { SITE_CONTENT } from "@/data/content";
import { Lightbox, LightboxImage } from "@/components/common/Lightbox";
import { GsapTextReveal } from "@/components/common/GsapTextReveal";
import { MoveRight } from "lucide-react";
import { playClickSound, playHoverSound } from "@/utils/sound";

interface GalleryCard {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  alt: string;
  isRealPhoto?: boolean;
  objectPosition?: string;
  caption: string;
}

export function BehindTheJourneyGallery() {
  const { achievements } = SITE_CONTENT;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const galleryItems: GalleryCard[] = [
    {
      id: "bb-team",
      title: "Bellebirds Honours & Trophy",
      subtitle: "Official Digital Partner Milestone",
      src: "/images/bellebirds-team-certificate.jpg",
      alt: "Official Digital Partner certificate and trophy presentation at Bellebirds: The Fashion Street, Season 1",
      isRealPhoto: true,
      objectPosition: "50% 25%",
      caption:
        "Official Digital Partner certificate and trophy presentation at Bellebirds: The Fashion Street (Season 1).",
    },
    {
      id: "bb-stage",
      title: "Stage Felicitation",
      subtitle: "Cyption Branding Feature",
      src: "/images/bellebirds-stage-trophy.jpg",
      alt: "Award presentation on stage at Bellebirds: The Fashion Street, Season 1 with Cyption branding on the hexagon screen",
      isRealPhoto: true,
      objectPosition: "50% 30%",
      caption:
        "Trophy felicitation on the main stage with Cyption Go Digital logo on the LED screen.",
    },
    {
      id: "strategy-session",
      title: "Strategy & Ideation",
      subtitle: "REPLACE: /public/placeholders/gallery-strategy-session.jpg",
      src: "/placeholders/gallery-strategy-session.svg",
      alt: "Strategy and ideation session placeholder",
      caption: "Behind the scenes at client workshops and strategy ideation sessions.",
    },
    {
      id: "speaking-mentorship",
      title: "Mentorship & Guidance",
      subtitle: "REPLACE: /public/placeholders/gallery-speaking.jpg",
      src: "/placeholders/gallery-speaking.svg",
      alt: "Speaking and youth mentorship placeholder",
      caption: "Course to Excellence academic and institutional mentorship initiatives.",
    },
    {
      id: "cyption-hq",
      title: "Cyption Studio Space",
      subtitle: "REPLACE: /public/placeholders/gallery-cyption-office.jpg",
      src: "/placeholders/gallery-cyption-office.svg",
      alt: "Cyption HQ workspace placeholder",
      caption: "Creative production and technology execution at Cyption.",
    },
    {
      id: "client-collab",
      title: "Cross-Industry Impact",
      subtitle: "REPLACE: /public/placeholders/gallery-client-collab.jpg",
      src: "/placeholders/gallery-client-collab.svg",
      alt: "Multi-industry collaboration placeholder",
      caption: "Working with businesses across travel, healthcare, retail, and education.",
    },
  ];

  const lightboxImages: LightboxImage[] = galleryItems.map((item) => ({
    src: item.src,
    alt: item.alt,
    caption: item.caption,
    label: `(${item.title.toUpperCase()})`,
  }));

  const openItem = (idx: number) => {
    playClickSound();
    setLightboxIdx(idx);
    setLightboxOpen(true);
  };

  return (
    <section
      id="gallery"
      className="relative py-24 md:py-36 border-b border-white/[0.06] dark:border-white/[0.06] light:border-black/[0.06] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#C9A24B] mb-4">
              <span className="text-[#C9A24B]">+</span>
              <span>(GALLERY ARCHIVE)</span>
              <span>{achievements.behindTheJourney.title}</span>
              <span className="h-[1px] w-12 bg-[#C9A24B]/30" />
            </div>

            <GsapTextReveal>
              <h2 className="reveal-line text-[clamp(2.4rem,5vw,4.5rem)] font-serif font-normal leading-[1.0] text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212] tracking-tight">
                Behind the{" "}
                <span className="italic font-serif text-[#C9A24B]">Journey.</span>
              </h2>
            </GsapTextReveal>
          </div>
          <p className="text-sm md:text-base font-sans text-[#A6A29A] dark:text-[#A6A29A] light:text-[#66625B] max-w-md">
            {achievements.behindTheJourney.description}
          </p>
        </div>

        {/* 1minus1 Drag Helper Cue with Pulse */}
        <div className="mt-8 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E8C877]">
          <span>[ DRAG OR SCROLL HORIZONTALLY ]</span>
          <MoveRight className="w-4 h-4 animate-pulse" />
        </div>
      </div>

      {/* Horizontal Drag/Scroll Gallery Track with 1minus1 Tilt Cards */}
      <div
        ref={containerRef}
        className="w-full overflow-x-auto no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing px-6 md:px-12 lg:px-20 py-4"
        data-cursor="drag"
      >
        <div className="flex gap-6 w-max">
          {galleryItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openItem(idx)}
              onMouseEnter={() => playHoverSound()}
              className="group relative w-[300px] sm:w-[360px] md:w-[420px] aspect-[3/4] rounded-2xl overflow-hidden border border-white/[0.1] dark:border-white/[0.1] light:border-black/[0.1] hover:border-[#C9A24B] bg-[#121212] dark:bg-[#121212] light:bg-[#FAFAFA] flex-shrink-0 transition-all duration-500 shadow-xl hover:shadow-[0_20px_50px_rgba(201,162,75,0.2)] hover:-translate-y-2"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                style={{ objectPosition: item.objectPosition || "center" }}
                className={`object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
                  item.isRealPhoto ? "grayscale contrast-105 group-hover:grayscale-0" : ""
                }`}
                sizes="(max-width: 768px) 300px, 420px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

              {/* Top tag with 1minus1 cyber HUD pill */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="text-[10px] font-mono tracking-widest uppercase bg-black/70 border border-white/10 px-2.5 py-1 rounded text-[#E8C877] backdrop-blur-md">
                  {item.isRealPhoto ? "[ VERIFIED ARCHIVE ]" : `[ SLOT 0${idx + 1} ]`}
                </span>
                <span className="text-xs font-mono text-white/50">0{idx + 1}</span>
              </div>

              {/* Bottom Details */}
              <div className="absolute bottom-5 left-5 right-5 z-10 space-y-1">
                <h4 className="text-lg md:text-xl font-serif text-[#F2EFE9] font-medium group-hover:text-[#E8C877] transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs font-mono text-[#A6A29A] truncate">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        images={lightboxImages}
        currentIndex={lightboxIdx}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIdx) => setActivePhotoIdx(newIdx)}
      />
    </section>
  );
}
