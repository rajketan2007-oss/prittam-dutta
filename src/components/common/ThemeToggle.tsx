"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 dark:border-white/10 light:border-black/10 bg-white/[0.03] hover:border-[#C9A24B]/50 transition-all duration-300 text-xs font-mono uppercase tracking-wider text-[#F2EFE9]/80 dark:text-[#F2EFE9]/80 light:text-[#121212]/80 ${className}`}
      data-cursor="hover"
    >
      {theme === "dark" ? (
        <>
          <Sun className="w-3.5 h-3.5 text-[#E8C877] group-hover:rotate-45 transition-transform duration-500" />
          <span className="hidden sm:inline">(Light)</span>
        </>
      ) : (
        <>
          <Moon className="w-3.5 h-3.5 text-[#C9A24B] group-hover:-rotate-12 transition-transform duration-500" />
          <span className="hidden sm:inline">(Dark)</span>
        </>
      )}
    </button>
  );
}
