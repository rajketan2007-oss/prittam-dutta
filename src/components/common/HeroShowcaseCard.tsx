"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMotion } from "@/context/MotionContext";
import { playHoverSound } from "@/utils/sound";
import { ArrowUpRight, Cpu, Compass, GraduationCap, ShieldCheck, Zap } from "lucide-react";

export function HeroShowcaseCard() {
  const { motionEnabled } = useMotion();
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Live IST Clock
  const [timeString, setTimeString] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 3D Parallax Tilt Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 220, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), springConfig);

  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!motionEnabled || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);

    setMousePos({
      x: Math.round((mouseX / width) * 100),
      y: Math.round((mouseY / height) * 100),
    });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      style={{ perspective: 1200 }}
      className="relative w-full max-w-lg lg:max-w-none mx-auto select-none"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => playHoverSound()}
        style={{
          rotateX: motionEnabled ? rotateX : 0,
          rotateY: motionEnabled ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        className="relative rounded-3xl border border-[#C9A24B]/35 bg-[#0E0E0E]/90 dark:bg-[#0E0E0E]/90 light:bg-[#FFFFFF]/90 backdrop-blur-xl p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] group overflow-hidden transition-shadow duration-500 hover:shadow-[0_30px_70px_-10px_rgba(201,162,75,0.25)]"
        data-cursor="look"
      >
        {/* Dynamic Cursor Spotlight Radial Glow */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-60 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle 320px at ${mousePos.x}% ${mousePos.y}%, rgba(201, 162, 75, 0.2), transparent 70%)`,
          }}
        />

        {/* HUD Corner Plus Marks (1minus1 Cyber aesthetic) */}
        <span className="absolute top-3 left-3 text-[10px] font-mono text-[#C9A24B]/50 leading-none">
          +
        </span>
        <span className="absolute top-3 right-3 text-[10px] font-mono text-[#C9A24B]/50 leading-none">
          +
        </span>
        <span className="absolute bottom-3 left-3 text-[10px] font-mono text-[#C9A24B]/50 leading-none">
          +
        </span>
        <span className="absolute bottom-3 right-3 text-[10px] font-mono text-[#C9A24B]/50 leading-none">
          +
        </span>

        {/* 1minus1 Agency Top HUD Header */}
        <div
          style={{ transform: "translateZ(30px)" }}
          className="relative z-10 flex items-center justify-between pb-5 border-b border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08]"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-semibold">
              STATUS: OPERATIONAL
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono text-[#A6A29A]">
            <span className="text-[#E8C877] font-semibold">{timeString || "IST"}</span>
            <span className="opacity-40">|</span>
            <span>23.52°N, 87.31°E</span>
          </div>
        </div>

        {/* Main Showcase Body */}
        <div
          style={{ transform: "translateZ(45px)" }}
          className="relative z-10 py-6 space-y-5"
        >
          {/* Eyebrow badge */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-[#C9A24B]/15 text-[#E8C877] border border-[#C9A24B]/40">
              <Zap className="w-3 h-3 text-[#C9A24B]" />
              VENTURE STUDIO &amp; GROWTH LAB
            </span>
            <span className="text-xs font-mono text-white/40">©2026</span>
          </div>

          {/* Core Visual: Interactive Network Matrix */}
          <div className="relative rounded-2xl bg-black/60 border border-white/[0.08] p-5 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#C9A24B_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />

            {/* 3 Venture Nodes connected with animated SVG lines */}
            <div className="relative z-10 flex items-center justify-between gap-2">
              {/* Cyption Node */}
              <div className="flex flex-col items-center text-center p-3 rounded-xl bg-white/[0.03] border border-[#C9A24B]/40 hover:scale-105 transition-transform">
                <div className="w-9 h-9 rounded-lg bg-[#C9A24B]/20 flex items-center justify-center text-[#E8C877] mb-2 shadow-inner">
                  <Cpu className="w-4 h-4" />
                </div>
                <span className="text-xs font-serif font-bold text-[#F2EFE9] tracking-wide">
                  CYPTION
                </span>
                <span className="text-[9px] font-mono text-[#A6A29A] uppercase tracking-wider">
                  Agency &amp; Tech
                </span>
              </div>

              {/* Connecting Pulse Line */}
              <div className="flex-1 h-[1px] bg-gradient-to-r from-[#C9A24B]/30 via-[#E8C877] to-[#C9A24B]/30 relative overflow-hidden">
                <div className="w-4 h-full bg-white animate-pulse" />
              </div>

              {/* Offroute Node */}
              <div className="flex flex-col items-center text-center p-3 rounded-xl bg-white/[0.03] border border-emerald-500/30 hover:scale-105 transition-transform">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2 shadow-inner">
                  <Compass className="w-4 h-4" />
                </div>
                <span className="text-xs font-serif font-bold text-[#F2EFE9] tracking-wide">
                  OFFROUTE
                </span>
                <span className="text-[9px] font-mono text-[#A6A29A] uppercase tracking-wider">
                  Experiential
                </span>
              </div>

              {/* Connecting Pulse Line */}
              <div className="flex-1 h-[1px] bg-gradient-to-r from-emerald-500/30 via-[#E8C877] to-amber-500/30 relative overflow-hidden" />

              {/* Course to Excellence Node */}
              <div className="flex flex-col items-center text-center p-3 rounded-xl bg-white/[0.03] border border-amber-500/30 hover:scale-105 transition-transform">
                <div className="w-9 h-9 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 mb-2 shadow-inner">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <span className="text-xs font-serif font-bold text-[#F2EFE9] tracking-wide">
                  EXCELLENCE
                </span>
                <span className="text-[9px] font-mono text-[#A6A29A] uppercase tracking-wider">
                  EdTech &amp; Mentorship
                </span>
              </div>
            </div>
          </div>

          {/* Dynamic 1minus1 Floating Pills Strip */}
          <div
            style={{ transform: "translateZ(55px)" }}
            className="flex flex-wrap gap-2 pt-1"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-mono uppercase tracking-wider bg-white/[0.04] border border-white/[0.08] text-[#F2EFE9]">
              <ShieldCheck className="w-3 h-3 text-[#C9A24B]" />
              Bellebirds Digital Partner
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-mono uppercase tracking-wider bg-white/[0.04] border border-white/[0.08] text-[#F2EFE9]">
              Cross-Industry Strategy
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-mono uppercase tracking-wider bg-white/[0.04] border border-white/[0.08] text-[#E8C877]">
              Performance &amp; ROI
            </span>
          </div>
        </div>

        {/* Bottom Interactive Dock Action */}
        <div
          style={{ transform: "translateZ(25px)" }}
          className="relative z-10 pt-4 border-t border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] flex items-center justify-between text-xs font-mono"
        >
          <span className="text-[#A6A29A] text-[11px] tracking-wider">
            [ ARCHITECTURE · SCALED SYSTEMS ]
          </span>
          <a
            href="#businesses"
            className="inline-flex items-center gap-1 text-[#E8C877] font-semibold hover:underline"
            data-cursor="open"
          >
            Explore Projects
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
