"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONTENT, JourneyMilestone } from "@/data/content";
import { ChevronRight, Sparkles } from "lucide-react";
import { GsapTextReveal } from "@/components/common/GsapTextReveal";
import { playClickSound, playHoverSound } from "@/utils/sound";

export function JourneySection() {
  const { journey } = SITE_CONTENT;
  const [activeIdx, setActiveIdx] = useState(2); // Default to 2025 (Building Cyption)
  const [cardSpotlight, setCardSpotlight] = useState({ x: 50, y: 50 });

  const handleCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setCardSpotlight({ x, y });
  };

  return (
    <section
      id="journey"
      className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20 border-b border-white/[0.06] dark:border-white/[0.06] light:border-black/[0.06] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#C9A24B] mb-4">
              <span className="text-[#C9A24B]">+</span>
              <span>({journey.sectionIndex})</span>
              <span>{journey.label}</span>
              <span className="h-[1px] w-12 bg-[#C9A24B]/30" />
            </div>

            <GsapTextReveal>
              <h2 className="reveal-line text-[clamp(2.4rem,5.5vw,5rem)] font-serif font-normal leading-[1.0] text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212] tracking-tight">
                It Started With Curiosity.{" "}
                <span className="italic font-serif text-[#C9A24B]">It Grew Through Action.</span>
              </h2>
            </GsapTextReveal>
          </div>
          <p className="text-sm md:text-base font-sans text-[#A6A29A] dark:text-[#A6A29A] light:text-[#66625B] max-w-md">
            {journey.intro}
          </p>
        </div>

        {/* 1minus1 Interactive Timeline Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 pb-4 border-b border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08]">
          {journey.milestones.map((m: JourneyMilestone, idx: number) => {
            const isActive = activeIdx === idx;
            return (
              <button
                key={m.year}
                onClick={() => {
                  setActiveIdx(idx);
                  playClickSound();
                }}
                onMouseEnter={() => playHoverSound()}
                className={`p-4 md:p-5 rounded-2xl text-left transition-all duration-300 relative border group ${
                  isActive
                    ? "border-[#C9A24B] bg-[#C9A24B]/[0.08] shadow-lg shadow-[#C9A24B]/10 scale-[1.02]"
                    : "border-white/[0.06] dark:border-white/[0.06] light:border-black/[0.06] bg-white/[0.01] hover:border-white/20"
                }`}
                data-cursor="hover"
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[11px] font-mono tracking-widest uppercase transition-colors ${
                      isActive ? "text-[#E8C877] font-bold" : "text-[#A6A29A]"
                    }`}
                  >
                    [ PHASE 0{idx + 1} ]
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isActive ? "bg-emerald-400 animate-ping" : "bg-white/20"
                    }`}
                  />
                </div>
                <div className="text-lg md:text-2xl font-serif font-bold text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212] group-hover:text-[#E8C877] transition-colors">
                  {m.year}
                </div>
                <div className="text-xs font-sans text-[#A6A29A] dark:text-[#A6A29A] light:text-[#66625B] truncate mt-1">
                  {m.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Milestone Spotlight Card with 1minus1 Radial Cursor Glow */}
        <AnimatePresence mode="wait">
          {journey.milestones[activeIdx] && (
            <motion.div
              key={activeIdx}
              onMouseMove={handleCardMove}
              onMouseEnter={() => playHoverSound()}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="p-8 md:p-14 rounded-3xl border border-[#C9A24B]/35 bg-[#121212]/90 dark:bg-[#121212]/90 light:bg-[#FFFFFF]/90 backdrop-blur-xl relative overflow-hidden shadow-2xl group"
            >
              {/* Dynamic Cursor Spotlight Radial Glow */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-60 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle 380px at ${cardSpotlight.x}% ${cardSpotlight.y}%, rgba(201, 162, 75, 0.16), transparent 70%)`,
                }}
              />

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

              {/* Year watermark */}
              <div className="absolute right-4 bottom-2 text-[clamp(6rem,18vw,16rem)] font-serif italic font-extralight text-white/[0.03] dark:text-white/[0.03] light:text-black/[0.04] select-none pointer-events-none leading-none">
                {journey.milestones[activeIdx].year.split("–")[0]}
              </div>

              <div className="relative z-10 max-w-4xl space-y-6">
                <div className="flex items-center gap-3">
                  <span className="px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-[#C9A24B]/20 text-[#E8C877] border border-[#C9A24B]/40">
                    {journey.milestones[activeIdx].period}
                  </span>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#A6A29A]">
                    MILESTONE {activeIdx + 1} OF 4
                  </span>
                </div>

                <h3 className="text-3xl md:text-5xl font-serif text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212] font-semibold tracking-tight">
                  {journey.milestones[activeIdx].title}
                </h3>

                <div className="space-y-4 text-base md:text-lg font-sans text-[#A6A29A] dark:text-[#A6A29A] light:text-[#66625B] leading-relaxed">
                  {journey.milestones[activeIdx].description.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section Closing Banner */}
        <div className="mt-12 p-6 rounded-2xl border border-white/[0.06] dark:border-white/[0.06] light:border-black/[0.06] bg-white/[0.01] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#C9A24B]" />
            <p className="text-sm md:text-base font-serif italic text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212]">
              {journey.closing}
            </p>
          </div>
          <a
            href="#services"
            onClick={() => playClickSound()}
            onMouseEnter={() => playHoverSound()}
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#E8C877] hover:underline"
          >
            Explore Services
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
