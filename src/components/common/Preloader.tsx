"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMotion } from "@/context/MotionContext";
import { playSwooshSound } from "@/utils/sound";

export function Preloader({ onComplete }: { onComplete?: () => void }) {
  const { motionEnabled } = useMotion();
  const [count, setCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (!motionEnabled) {
      setCount(100);
      setIsFinished(true);
      if (onComplete) onComplete();
      return;
    }

    // Smooth progressive counter
    let current = 0;
    const interval = setInterval(() => {
      // realistic luxury loading increments
      const increment = Math.floor(Math.random() * 8) + 3;
      current = Math.min(100, current + increment);
      setCount(current);

      if (current >= 100) {
        clearInterval(interval);
        playSwooshSound();
        setTimeout(() => {
          setIsFinished(true);
          if (onComplete) onComplete();
        }, 350);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [motionEnabled, onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[10000] flex flex-col justify-between pointer-events-auto"
        >
          {/* Top Curtain */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-0 left-0 w-full h-1/2 bg-[#0A0A0A] border-b border-[#C9A24B]/20"
          />

          {/* Bottom Curtain */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
            className="absolute bottom-0 left-0 w-full h-1/2 bg-[#0A0A0A] border-t border-[#C9A24B]/20"
          />

          {/* Central Counter & Typography Content */}
          <div className="relative z-10 w-full h-full flex flex-col justify-between p-8 md:p-14 select-none">
            {/* Top header row */}
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#F2EFE9]/60">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                [ INITIALIZING 1MINUS1 ANIMATION ENGINE ]
              </span>
              <span>PRITAM DUTTA · 2022 → 2026</span>
            </div>

            {/* Huge Counter */}
            <div className="flex flex-col items-center justify-center">
              <div className="text-[clamp(5rem,15vw,13rem)] font-serif italic font-light tracking-tighter text-[#F2EFE9] leading-none">
                {count.toString().padStart(2, "0")}
                <span className="text-2xl md:text-4xl not-italic font-mono text-[#C9A24B] ml-2 font-normal">
                  %
                </span>
              </div>
              <div className="w-48 h-[1px] bg-white/10 mt-6 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#C9A24B] to-[#E8C877]"
                  style={{ width: `${count}%` }}
                />
              </div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#A6A29A] mt-3">
                {count < 40
                  ? "LOADING ASSETS & SHADERS..."
                  : count < 80
                  ? "SYNCING GSAP SCROLLTRIGGERS..."
                  : "SYSTEMS NOMINAL · READY"}
              </span>
            </div>

            {/* Bottom row */}
            <div className="flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-[#F2EFE9]/50">
              <span>CYPTION · OFFROUTE · COURSE TO EXCELLENCE</span>
              <span>[ STAND BY ]</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
