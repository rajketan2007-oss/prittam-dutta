"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE_CONTENT, Business } from "@/data/content";
import { ArrowUpRight, Compass, Cpu, GraduationCap, Pause, Play, Sparkles } from "lucide-react";
import { useMotion } from "@/context/MotionContext";
import { playClickSound, playHoverSound } from "@/utils/sound";

const BUSINESS_ICONS: Record<string, React.ElementType> = {
  cyption: Cpu,
  offroute: Compass,
  "course-to-excellence": GraduationCap,
};

const FILTER_CATEGORIES = [
  { id: "all", label: "ALL VENTURES (03)" },
  { id: "cyption", label: "CYPTION · AGENCY" },
  { id: "offroute", label: "OFFROUTE · TRAVEL" },
  { id: "course-to-excellence", label: "COURSE TO EXCELLENCE" },
];

export function BusinessesSection() {
  const { businesses } = SITE_CONTENT;
  const { motionEnabled, toggleMotion } = useMotion();
  const [activeIdx, setActiveIdx] = useState(0);
  const [filterId, setFilterId] = useState("all");
  const sectionRef = useRef<HTMLElement | null>(null);

  // Dynamic Cursor Spotlight coordinates for preview dock
  const [dockSpotlight, setDockSpotlight] = useState({ x: 50, y: 50 });

  const filteredItems =
    filterId === "all"
      ? businesses.items
      : businesses.items.filter((item) => item.id === filterId);

  const activeVenture =
    filteredItems[activeIdx] || businesses.items[0];
  const Icon = BUSINESS_ICONS[activeVenture.id] || Cpu;

  // GSAP ScrollTrigger for Venture rows entrance
  useEffect(() => {
    if (!motionEnabled || !sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".venture-row-item",
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".ventures-list-container",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [motionEnabled]);

  const handleDockMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setDockSpotlight({ x, y });
  };

  return (
    <section
      ref={sectionRef}
      id="businesses"
      className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20 border-b border-white/[0.06] dark:border-white/[0.06] light:border-black/[0.06] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* 1minus1 Agency Work Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-12 border-b border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08]">
          <div className="flex items-center gap-3">
            <span className="text-[#C9A24B] font-mono text-sm">+</span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#C9A24B] font-semibold">
              ({businesses.sectionIndex})
            </span>
            <h2 className="text-xl md:text-2xl font-serif text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212] font-semibold">
              Selected Ventures (03)
            </h2>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono tracking-widest text-[#A6A29A] dark:text-[#A6A29A] light:text-[#66625B]">
            {/* Inline Pause Motion Button */}
            <button
              type="button"
              onClick={toggleMotion}
              className="hover:text-[#E8C877] transition-colors flex items-center gap-1.5"
              data-cursor="look"
            >
              {motionEnabled ? (
                <>
                  <Pause className="w-3 h-3 text-[#C9A24B]" />
                  <span>(Pause motion)</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-[#E8C877]" />
                  <span>(Resume motion)</span>
                </>
              )}
            </button>

            <span>2022 — 2026</span>
            <span className="text-[#C9A24B] font-mono text-sm">+</span>
          </div>
        </div>

        {/* Headline & Sub copy */}
        <div className="max-w-3xl mb-10">
          <h3 className="text-[clamp(2.4rem,5.5vw,5rem)] font-serif font-normal leading-[1.0] text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212] tracking-tight mb-4">
            Different Ventures.{" "}
            <span className="italic font-serif text-[#C9A24B]">One Entrepreneurial Vision.</span>
          </h3>
          <p className="text-base font-sans text-[#A6A29A] dark:text-[#A6A29A] light:text-[#66625B]">
            {businesses.sub}
          </p>
        </div>

        {/* 1minus1 Signature Interactive Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-12">
          {FILTER_CATEGORIES.map((cat) => {
            const isSelected = filterId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setFilterId(cat.id);
                  setActiveIdx(0);
                  playClickSound();
                }}
                onMouseEnter={() => playHoverSound()}
                className={`relative px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 border ${
                  isSelected
                    ? "border-[#C9A24B] text-black font-bold shadow-md shadow-[#C9A24B]/20"
                    : "border-white/10 dark:border-white/10 light:border-black/10 text-[#A6A29A] hover:border-white/30 hover:text-[#F2EFE9]"
                }`}
                data-cursor="hover"
              >
                {/* Active Sliding Background Pill */}
                {isSelected && (
                  <motion.span
                    layoutId="ventureFilterPill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#C9A24B] to-[#E8C877] -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* 1minus1 Selected Work Interactive Split Grid */}
        <div className="ventures-list-container grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Interactive Numbered Rows (Cols 1-7) */}
          <div className="lg:col-span-7 divide-y divide-white/[0.08] dark:divide-white/[0.08] light:divide-black/[0.08] border-y border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08]">
            {filteredItems.map((item: Business, index: number) => {
              const isActive = activeIdx === index;

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => {
                    setActiveIdx(index);
                    playHoverSound();
                  }}
                  onClick={() => {
                    setActiveIdx(index);
                    playClickSound();
                  }}
                  className={`venture-row-item group py-8 md:py-10 transition-all duration-300 cursor-pointer ${
                    isActive ? "opacity-100" : "opacity-60 hover:opacity-100"
                  }`}
                  data-cursor="view"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex items-baseline gap-6 md:gap-8">
                      {/* Number with 1minus1 Cyber Accent */}
                      <span
                        className={`text-sm md:text-base font-mono transition-colors ${
                          isActive ? "text-[#E8C877] font-bold" : "text-white/40"
                        }`}
                      >
                        [ 0{index + 1} ]
                      </span>

                      {/* Venture Name & Tagline */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h4 className="text-2xl md:text-4xl font-serif text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212] group-hover:text-[#E8C877] transition-colors font-medium">
                            {item.name}
                          </h4>
                          {isActive && (
                            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                              <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-mono uppercase tracking-wider text-[#A6A29A] dark:text-[#A6A29A] light:text-[#66625B]">
                          {item.category}
                        </p>
                        <p className="text-sm font-serif italic text-[#C9A24B]">
                          “{item.tagline}”
                        </p>
                      </div>
                    </div>

                    {/* View Project Arrow Button */}
                    <div
                      className={`p-3 rounded-full border transition-all duration-300 flex-shrink-0 ${
                        isActive
                          ? "border-[#C9A24B] bg-[#C9A24B]/20 text-[#E8C877] scale-110 shadow-lg shadow-[#C9A24B]/20"
                          : "border-white/10 text-white/40 group-hover:border-white/30 group-hover:text-white"
                      }`}
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Expanded Description on Active */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="pt-6 pl-12 md:pl-20 space-y-4 text-sm font-sans text-[#A6A29A] dark:text-[#A6A29A] light:text-[#66625B] leading-relaxed"
                    >
                      <p>{item.description}</p>
                      <p>{item.details}</p>

                      {item.link && (
                        <div className="pt-2">
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              e.stopPropagation();
                              playClickSound();
                            }}
                            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#E8C877] hover:underline"
                            data-cursor="open"
                          >
                            Launch {item.linkLabel || item.name} ↗
                          </a>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: 1minus1 Floating Sticky Preview Dock (Cols 8-12) */}
          <div className="lg:col-span-5 sticky top-28">
            <div
              onMouseMove={handleDockMouseMove}
              className="relative aspect-[4/5] rounded-3xl border border-[#C9A24B]/35 bg-[#121212]/95 dark:bg-[#121212]/95 light:bg-[#FFFFFF]/95 p-8 md:p-10 flex flex-col justify-between overflow-hidden shadow-2xl backdrop-blur-xl group"
            >
              {/* Dynamic Cursor Spotlight Radial Glow */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-70 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle 350px at ${dockSpotlight.x}% ${dockSpotlight.y}%, rgba(201, 162, 75, 0.18), transparent 70%)`,
                }}
              />

              {/* HUD Reticle Corners */}
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

              {/* Giant Watermark Background Number */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeVenture.id}
                  initial={{ opacity: 0, scale: 0.85, y: 20 }}
                  animate={{ opacity: 0.12, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.1, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="absolute right-4 bottom-0 text-[14rem] font-serif font-bold text-white dark:text-white light:text-black select-none pointer-events-none leading-none"
                >
                  0{activeIdx + 1}
                </motion.div>
              </AnimatePresence>

              {/* Ambient Venture Lighting */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none blur-3xl transition-colors duration-700"
                style={{ backgroundColor: activeVenture.accent }}
              />

              {/* Top Dock Bar */}
              <div className="relative z-10 flex items-center justify-between pb-6 border-b border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08]">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center border shadow-inner transition-transform group-hover:scale-105 duration-300"
                    style={{
                      backgroundColor: `${activeVenture.accent}25`,
                      borderColor: `${activeVenture.accent}60`,
                      color: activeVenture.accent,
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8C877] block font-semibold">
                      [ VENTURE DOCK 0{activeIdx + 1} ]
                    </span>
                    <span className="text-xl font-serif font-bold text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212]">
                      {activeVenture.name}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-mono text-[#E8C877]">
                  <Sparkles className="w-3 h-3 text-[#C9A24B]" />
                  <span>0{activeIdx + 1} / 03</span>
                </div>
              </div>

              {/* Center Details */}
              <div className="relative z-10 my-auto py-6 space-y-4">
                <span className="inline-block text-xs font-mono uppercase tracking-widest text-[#E8C877] px-3 py-1 rounded bg-[#C9A24B]/10 border border-[#C9A24B]/30">
                  {activeVenture.category}
                </span>
                <p className="text-xl md:text-2xl font-serif italic text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212] leading-snug">
                  “{activeVenture.tagline}”
                </p>
              </div>

              {/* Bottom Tags Strip with 1minus1 Badge Styling */}
              <div className="relative z-10 pt-6 border-t border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#A6A29A] block mb-3 font-semibold">
                  {activeVenture.id === "cyption" ? "CORE CAPABILITIES" : "VENTURE MATRIX"}
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeVenture.tags.slice(0, 5).map((t, tidx) => (
                    <span
                      key={tidx}
                      className="px-3 py-1 rounded-lg text-[11px] font-mono text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212] bg-white/[0.05] dark:bg-white/[0.05] light:bg-black/[0.05] border border-white/[0.1] hover:border-[#C9A24B]/50 hover:text-[#E8C877] transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
