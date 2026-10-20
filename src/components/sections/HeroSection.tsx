"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroCanvas } from "@/components/canvas/HeroCanvas";
import { KineticText } from "@/components/common/KineticText";
import { MagneticButton } from "@/components/common/MagneticButton";
import { HeroShowcaseCard } from "@/components/common/HeroShowcaseCard";
import { SITE_CONTENT } from "@/data/content";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useMotion } from "@/context/MotionContext";
import { playClickSound, playHoverSound } from "@/utils/sound";

export function HeroSection({ isLoaded = true }: { isLoaded?: boolean }) {
  const { motionEnabled } = useMotion();
  const { hero } = SITE_CONTENT;
  const heroRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);

  // Split headline into words for GSAP reveal
  const headlineWords = hero.headline.split(" ");

  // Sequential GSAP Entrance & Parallax on scroll
  useEffect(() => {
    if (!motionEnabled || !heroRef.current || !isLoaded) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.1,
      });

      // 1. Top HUD Eyebrow Meta glides down
      tl.fromTo(
        ".hero-eyebrow",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0 }
      );

      // 2. Main Headline words stagger up smoothly with 3D feel
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll(".hero-word");
        tl.fromTo(
          words,
          {
            y: 45,
            opacity: 0,
            rotateX: 28,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: 0.038,
            duration: 1.1,
          },
          "-=0.65"
        );
      }

      // 3. Right Column: 3D Showcase Card floats up smoothly
      tl.fromTo(
        ".hero-card-col",
        { y: 50, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 1.25, ease: "power3.out" },
        "-=0.8"
      );

      // 4. CTAs fade and slide up
      tl.fromTo(
        ".hero-cta-btn",
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12 },
        "-=0.7"
      );

      // 5. Sub-copy paragraphs
      tl.fromTo(
        ".hero-subcopy-item",
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.95, stagger: 0.14 },
        "-=0.6"
      );

      // 6. Bottom Meta & Scroll cue
      tl.fromTo(
        ".hero-bottom-meta",
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        "-=0.5"
      );

      // Parallax scroll on hero wordmark
      gsap.to(".hero-big-wordmark", {
        y: -40,
        opacity: 0.85,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, [motionEnabled, isLoaded]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-10 px-6 md:px-12 lg:px-20 overflow-hidden border-b border-white/[0.06] dark:border-white/[0.06] light:border-black/[0.06]"
    >
      {/* Abstract Interactive Canvas Background */}
      <HeroCanvas />

      {/* 1minus1 Style Cyber Eyebrow Meta with HUD corners */}
      <div className="hero-eyebrow relative z-10 max-w-7xl w-full mx-auto flex items-center justify-between text-xs font-mono tracking-widest uppercase text-[#F2EFE9]/60 dark:text-[#F2EFE9]/60 light:text-[#121212]/60 pb-4 border-b border-white/[0.06] dark:border-white/[0.06] light:border-black/[0.06]">
        <div className="flex items-center gap-2">
          <span className="text-[#C9A24B]">+</span>
          <span>(PORTFOLIO / ©2026)</span>
        </div>
        <span className="hidden md:inline text-[#C9A24B] font-semibold tracking-wider">
          {hero.tagline}
        </span>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Durgapur, India</span>
          <span className="text-[#C9A24B]">+</span>
        </div>
      </div>

      {/* Main Center Typographic Stage */}
      <div className="relative z-10 max-w-7xl w-full mx-auto my-auto py-8 md:py-12">
        {/* Giant Kinetic Wordmark (Character-by-character interactive physics) */}
        <div
          className="hero-big-wordmark flex flex-col space-y-0 select-none pb-4"
          onMouseEnter={() => playHoverSound()}
        >
          <div className="text-[clamp(3.8rem,13vw,13.5rem)] font-serif tracking-tight text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212] leading-[0.88]">
            <KineticText text="PRITAM" delayOffset={0.12} isLoaded={isLoaded} />{" "}
            <KineticText
              text="DUTTA"
              isItalic={true}
              accentColor="#C9A24B"
              delayOffset={0.42}
              isLoaded={isLoaded}
            />
          </div>
        </div>

        {/* 12-Column Editorial Grid Layout with 1minus1 3D Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mt-8 pt-8 border-t border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08]">
          {/* Main Headline (Cols 1-7) */}
          <div className="lg:col-span-7">
            <h2
              ref={headlineRef}
              className="text-[clamp(2.2rem,4.5vw,4.5rem)] font-serif font-normal leading-[1.04] text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212] tracking-tight"
            >
              {headlineWords.map((word, i) => (
                <span
                  key={i}
                  className={`hero-word inline-block mr-[0.25em] ${
                    word.toLowerCase().includes("ideas") ||
                    word.toLowerCase().includes("possibilities") ||
                    word.toLowerCase().includes("progress")
                      ? "italic font-serif text-[#C9A24B]"
                      : ""
                  }`}
                >
                  {word}
                </span>
              ))}
            </h2>

            {/* CTAs with Magnetic Effect & Sound feedback */}
            <div className="hero-ctas flex flex-wrap items-center gap-4 mt-8 md:mt-10">
              <div className="hero-cta-btn">
                <MagneticButton asAnchor href="#businesses">
                  <span
                    onClick={() => playClickSound()}
                    onMouseEnter={() => playHoverSound()}
                    data-cursor="look"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs font-mono uppercase tracking-widest font-bold bg-gradient-to-r from-[#C9A24B] to-[#E8C877] text-black shadow-lg shadow-[#C9A24B]/20 hover:scale-[1.04] transition-transform duration-300"
                  >
                    {hero.ctaPrimary} →
                  </span>
                </MagneticButton>
              </div>

              <div className="hero-cta-btn">
                <MagneticButton asAnchor href="#contact">
                  <span
                    onClick={() => playClickSound()}
                    onMouseEnter={() => playHoverSound()}
                    data-cursor="say hi"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs font-mono uppercase tracking-widest font-semibold border border-white/20 dark:border-white/20 light:border-black/20 text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212] hover:border-[#C9A24B] hover:text-[#E8C877] transition-all duration-300"
                  >
                    {hero.ctaSecondary}
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#E8C877]" />
                  </span>
                </MagneticButton>
              </div>
            </div>

            {/* Sub-copy paragraphs */}
            <div className="hero-subcopy mt-8 space-y-3 text-sm md:text-base font-sans text-[#A6A29A] dark:text-[#A6A29A] light:text-[#66625B] leading-relaxed max-w-xl">
              <p className="hero-subcopy-item">{hero.subCopy1}</p>
              <p className="hero-subcopy-item">{hero.subCopy2}</p>
            </div>
          </div>

          {/* Right Column: 1minus1 Style 3D Interactive Showcase Card (Cols 8-12) */}
          <div className="hero-card-col lg:col-span-5 flex flex-col justify-center">
            <HeroShowcaseCard />
          </div>
        </div>
      </div>

      {/* 1minus1 Bottom Meta & Scroll Cue with Cyber HUD readout */}
      <div className="hero-bottom-meta relative z-10 max-w-7xl w-full mx-auto flex items-center justify-between pt-4 border-t border-white/[0.06] dark:border-white/[0.06] light:border-black/[0.06] text-xs font-mono text-[#A6A29A] dark:text-[#A6A29A] light:text-[#66625B]">
        <div className="flex items-center gap-2">
          <span className="text-[#C9A24B]">↓</span>
          <span>{hero.microScroll}</span>
        </div>
        <div className="tracking-widest uppercase text-[10px] flex items-center gap-3">
          <span>[ VENTURES ARCHIVE: 03 ACTIVE ]</span>
          <span className="hidden sm:inline">2022 — 2026</span>
        </div>
      </div>
    </section>
  );
}
