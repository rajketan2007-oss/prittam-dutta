"use client";

import React from "react";
import { useMotion } from "@/context/MotionContext";
import { Play, Pause } from "lucide-react";

export function MotionToggle({ className = "" }: { className?: string }) {
  const { motionEnabled, toggleMotion } = useMotion();

  return (
    <button
      onClick={toggleMotion}
      aria-label={motionEnabled ? "Pause all site animations" : "Resume site animations"}
      title={motionEnabled ? "Pause motion" : "Resume motion"}
      className={`group relative flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 dark:border-white/10 light:border-black/10 bg-white/[0.03] hover:border-[#C9A24B]/50 transition-all duration-300 text-xs font-mono uppercase tracking-wider text-[#F2EFE9]/80 dark:text-[#F2EFE9]/80 light:text-[#121212]/80 ${className}`}
      data-cursor="hover"
    >
      {motionEnabled ? (
        <>
          <Pause className="w-3 h-3 text-[#E8C877]" />
          <span className="hidden sm:inline">(Motion: On)</span>
        </>
      ) : (
        <>
          <Play className="w-3 h-3 text-[#C9A24B]" />
          <span className="hidden sm:inline">(Motion: Off)</span>
        </>
      )}
    </button>
  );
}
