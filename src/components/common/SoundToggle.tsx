"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getSoundEnabled, setSoundEnabled, playClickSound } from "@/utils/sound";

export function SoundToggle() {
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setEnabled(getSoundEnabled());
  }, []);

  const handleToggle = () => {
    const nextState = !enabled;
    setEnabled(nextState);
    setSoundEnabled(nextState);
    if (nextState) {
      setTimeout(() => playClickSound(), 50);
    }
  };

  if (!mounted) return null;

  return (
    <button
      onClick={handleToggle}
      className="group relative flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 dark:border-white/10 light:border-black/10 bg-white/[0.03] dark:bg-white/[0.03] light:bg-black/[0.03] hover:border-[#C9A24B]/50 transition-colors text-xs font-mono select-none"
      title={enabled ? "Mute interactive audio" : "Enable interactive audio"}
      aria-label="Toggle sound feedback"
      data-cursor="hover"
    >
      {/* Equalizer Waveform bars using Framer Motion */}
      <div className="flex items-center gap-[2px] h-3">
        {[
          { color: "#E8C877", heights: [4, 12, 6, 12] },
          { color: "#C9A24B", heights: [8, 4, 10, 4] },
          { color: "#E8C877", heights: [3, 14, 8, 3] },
          { color: "#C9A24B", heights: [10, 5, 11, 6] },
        ].map((bar, i) => (
          <motion.span
            key={i}
            className="w-[2px] rounded-full"
            style={{ backgroundColor: bar.color }}
            animate={
              enabled
                ? { height: bar.heights, opacity: 1 }
                : { height: 4, opacity: 0.4 }
            }
            transition={
              enabled
                ? {
                    repeat: Infinity,
                    duration: 0.6 + i * 0.15,
                    ease: "easeInOut",
                  }
                : { duration: 0.2 }
            }
          />
        ))}
      </div>

      <span className="text-[10px] uppercase tracking-widest text-[#A6A29A] dark:text-[#A6A29A] light:text-[#66625B] group-hover:text-[#E8C877] transition-colors">
        {enabled ? "SFX: ON" : "SFX: OFF"}
      </span>
    </button>
  );
}
