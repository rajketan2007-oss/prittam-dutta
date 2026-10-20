"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE_CONTENT } from "@/data/content";
import { GsapCounter } from "@/components/common/GsapCounter";
import { GsapTextReveal } from "@/components/common/GsapTextReveal";
import { useMotion } from "@/context/MotionContext";
import { playHoverSound } from "@/utils/sound";

export function AboutSection() {
  const { about } = SITE_CONTENT;
  const { motionEnabled } = useMotion();
  const aboutRef = useRef<HTMLElement | null>(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (!motionEnabled || !aboutRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Portrait Card smooth upward glide
      gsap.fromTo(
        ".about-portrait-card",
        { y: 50, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-portrait-card",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // 2. Stats cards stagger in
      gsap.fromTo(
        ".about-stat-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-stats-grid",
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );

      // 3. Bio paragraphs & Pull quote smooth fade up
      gsap.fromTo(
        ".about-bio-item",
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-bio-container",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".about-pull-quote",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-pull-quote",
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    }, aboutRef);

    return () => ctx.revert();
  }, [motionEnabled]);

  const handlePortraitMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setSpotlight({ x, y });
  };

  return (
    <section
      ref={aboutRef}
      id="about"
      className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20 border-b border-white/[0.06] dark:border-white/[0.06] light:border-black/[0.06] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header Micro-label with 1minus1 HUD Bracket */}
        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#C9A24B] mb-8">
          <span className="text-[#C9A24B]">+</span>
          <span>({about.sectionIndex})</span>
          <span>{about.label}</span>
          <span className="h-[1px] w-12 bg-[#C9A24B]/30" />
        </div>

        {/* 12-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Portrait & Live GSAP Counters (Cols 1-5) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Portrait Frame with 1minus1 Spotlight & Corner Accents */}
            <div
              onMouseMove={handlePortraitMove}
              onMouseEnter={() => playHoverSound()}
              className="about-portrait-card group relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#C9A24B]/35 bg-neutral-900 shadow-2xl shadow-black/50 transition-all duration-500 hover:border-[#C9A24B] hover:shadow-[0_20px_50px_rgba(201,162,75,0.2)]"
              data-cursor="view"
            >
              {/* Dynamic Cursor Spotlight Radial Glow */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-10"
                style={{
                  background: `radial-gradient(circle 280px at ${spotlight.x}% ${spotlight.y}%, rgba(201, 162, 75, 0.25), transparent 70%)`,
                }}
              />

              <Image
                src="/images/pritam-dutta-portrait.jpg"
                alt="Pritam Dutta - Founder of Cyption receiving Bellebirds award"
                fill
                priority
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, 450px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Corner framing cues & HUD readouts */}
              <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-[#E8C877] uppercase bg-black/75 px-3 py-1 rounded-md border border-white/10 backdrop-blur-md z-20">
                [ ARCHIVE ENTRY · PRITAM ]
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-[#F2EFE9] z-20">
                <span className="font-semibold">PRITAM DUTTA</span>
                <span className="text-[#C9A24B] font-bold">EST. 2022</span>
              </div>
            </div>

            {/* GSAP Rollup Stat Cards */}
            <div className="about-stats-grid grid grid-cols-3 gap-3 pt-2">
              {about.stats.map((stat, i) => (
                <div
                  key={i}
                  className="about-stat-item p-4 rounded-xl border border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] bg-white/[0.02] dark:bg-white/[0.02] light:bg-black/[0.02] hover:border-[#C9A24B]/40 transition-colors flex flex-col justify-between"
                  onMouseEnter={() => playHoverSound()}
                >
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#A6A29A]">
                    {stat.label}
                  </span>
                  <div className="text-xl md:text-3xl font-serif text-[#E8C877] font-bold my-1 tracking-tight">
                    <GsapCounter value={stat.value} duration={2.2} />
                  </div>
                  <span className="text-[9px] font-mono text-white/50 dark:text-white/50 light:text-black/50">
                    {stat.micro}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Editorial Bio + Pull Quote (Cols 6-12) */}
          <div className="lg:col-span-7 space-y-10">
            {/* Main Section Headline with GSAP Reveal */}
            <GsapTextReveal>
              <h2 className="reveal-line text-[clamp(2.4rem,5vw,4.8rem)] font-serif font-normal leading-[1.02] text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212] tracking-tight">
                I&apos;m Pritam. I <span className="italic font-serif text-[#C9A24B]">Build</span>,{" "}
                <span className="italic font-serif text-[#E8C877]">Experiment</span>, and Grow.
              </h2>
            </GsapTextReveal>

            {/* Bio Paragraphs */}
            <div className="about-bio-container space-y-6 text-base md:text-lg font-sans text-[#A6A29A] dark:text-[#A6A29A] light:text-[#66625B] leading-relaxed">
              {about.paragraphs.map((p, idx) => (
                <p key={idx} className="about-bio-item">{p}</p>
              ))}
            </div>

            {/* High-Impact Pull Quote with 1minus1 Corner Marks */}
            <div
              className="about-pull-quote relative p-8 md:p-10 rounded-2xl border-l-2 border-[#C9A24B] bg-gradient-to-r from-[#C9A24B]/[0.08] via-transparent to-transparent border-y border-r border-white/[0.04]"
              onMouseEnter={() => playHoverSound()}
            >
              <span className="text-4xl md:text-5xl font-serif text-[#C9A24B]/40 leading-none select-none block mb-2">
                “
              </span>
              <blockquote className="text-xl md:text-2xl lg:text-3xl font-serif italic text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212] leading-snug">
                {about.pullQuote}
              </blockquote>
              <div className="mt-4 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E8C877]">
                <span>— PRITAM DUTTA</span>
                <span className="text-[#A6A29A]">· FOUNDER&apos;S MANIFESTO</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
