"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface MotionContextType {
  motionEnabled: boolean;
  toggleMotion: () => void;
  setMotionEnabled: (enabled: boolean) => void;
}

const MotionContext = createContext<MotionContextType>({
  motionEnabled: true,
  toggleMotion: () => {},
  setMotionEnabled: () => {},
});

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [motionEnabled, setMotionState] = useState<boolean>(true);

  useEffect(() => {
    // Check user's OS preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const saved = localStorage.getItem("pritam-portfolio-motion");

    if (saved !== null) {
      setMotionState(saved === "true");
    } else if (mediaQuery.matches) {
      setMotionState(false);
    } else {
      setMotionState(true);
    }

    const handleChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem("pritam-portfolio-motion") === null) {
        setMotionState(!e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const setMotionEnabled = (enabled: boolean) => {
    setMotionState(enabled);
    localStorage.setItem("pritam-portfolio-motion", String(enabled));
  };

  const toggleMotion = () => {
    setMotionEnabled(!motionEnabled);
  };

  return (
    <MotionContext.Provider value={{ motionEnabled, toggleMotion, setMotionEnabled }}>
      {children}
    </MotionContext.Provider>
  );
}

export const useMotion = () => useContext(MotionContext);
