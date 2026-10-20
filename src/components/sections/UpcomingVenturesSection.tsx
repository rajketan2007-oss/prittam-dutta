"use client";

import React, { useState } from "react";
import { SITE_CONTENT, UpcomingVenture } from "@/data/content";
import { Bot, Users, Clock } from "lucide-react";
import { GsapTextReveal } from "@/components/common/GsapTextReveal";
import { playHoverSound } from "@/utils/sound";

export function UpcomingVenturesSection() {
  const { upcoming } = SITE_CONTENT;
  const [spotlightIdx, setSpotlightIdx] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleCardMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setSpotlightIdx(idx);
    setMousePos({ x, y });
  };

  return (
    <section
      id="upcoming"
      className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20 border-b border-white/[0.06] dark:border-white/[0.06] light:border-black/[0.06] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#C9A24B] mb-4">
              <span className="text-[#C9A24B]">+</span>
              <span>({upcoming.sectionIndex})</span>
              <span>{upcoming.label}</span>
              <span className="h-[1px] w-12 bg-[#C9A24B]/30" />
            </div>

            <GsapTextReveal>
              <h2 className="reveal-line text-[clamp(2.4rem,5.5vw,5rem)] font-serif font-normal leading-[1.0] text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212] tracking-tight">
                What&apos;s Next Is{" "}
                <span className="italic font-serif text-[#C9A24B]">Already Taking Shape.</span>
              </h2>
            </GsapTextReveal>
          </div>
          <p className="text-sm md:text-base font-sans text-[#A6A29A] dark:text-[#A6A29A] light:text-[#66625B] max-w-md">
            {upcoming.intro}
          </p>
        </div>

        {/* 2-Column Ventures Incubator Grid with 1minus1 styling */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          {upcoming.ventures.map((venture: UpcomingVenture, idx: number) => {
            const isFirst = idx === 0;
            const Icon = isFirst ? Bot : Users;

            return (
              <div
                key={venture.id}
                onMouseMove={(e) => handleCardMove(e, idx)}
                onMouseEnter={() => playHoverSound()}
                className="relative rounded-3xl border border-dashed border-[#C9A24B]/40 bg-gradient-to-b from-white/[0.03] to-transparent dark:from-white/[0.03] light:from-black/[0.02] p-8 md:p-12 flex flex-col justify-between group hover:border-[#C9A24B] transition-all duration-300 backdrop-blur-md overflow-hidden shadow-xl"
              >
                {/* 1minus1 Cursor Spotlight Glow */}
                {spotlightIdx === idx && (
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-60 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle 350px at ${mousePos.x}% ${mousePos.y}%, rgba(201, 162, 75, 0.18), transparent 70%)`,
                    }}
                  />
                )}

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

                <div className="relative z-10">
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-widest font-semibold bg-[#C9A24B]/15 text-[#E8C877] border border-[#C9A24B]/30">
                      <Clock className="w-3 h-3 animate-spin" style={{ animationDuration: "8s" }} />
                      {venture.badge}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#E8C877] shadow-inner">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-serif text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212] font-semibold mb-2">
                    {venture.title}
                  </h3>

                  <p className="text-sm md:text-base font-serif italic text-[#C9A24B] mb-6">
                    {venture.tagline}
                  </p>

                  <p className="text-sm md:text-base font-sans text-[#A6A29A] dark:text-[#A6A29A] light:text-[#66625B] leading-relaxed mb-8">
                    {venture.description}
                  </p>
                </div>

                {/* Solutions List */}
                <div className="relative z-10 pt-6 border-t border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08]">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#E8C877] block mb-3 font-semibold">
                    [ DEVELOPMENT SCOPE &amp; SOLUTIONS ]
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {venture.solutions.map((item, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-3 py-1 rounded-lg text-xs font-mono text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212] bg-white/[0.04] dark:bg-white/[0.04] light:bg-black/[0.04] border border-white/[0.08] hover:border-[#C9A24B]/50 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Closing */}
        <p className="mt-12 text-center text-xs md:text-sm font-mono uppercase tracking-widest text-[#A6A29A] dark:text-[#A6A29A] light:text-[#66625B]">
          {upcoming.closing}
        </p>
      </div>
    </section>
  );
}
