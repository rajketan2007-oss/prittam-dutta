"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotion } from "@/context/MotionContext";

interface GsapTextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  threshold?: number;
}

export function GsapTextReveal({
  children,
  className = "",
  delay = 0,
  duration = 1.0,
  stagger = 0.08,
}: GsapTextRevealProps) {
  const { motionEnabled } = useMotion();
  const elRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!motionEnabled || !elRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const targets = elRef.current.querySelectorAll(".reveal-line");
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        {
          yPercent: 115,
          opacity: 0,
          rotateZ: 1.5,
        },
        {
          yPercent: 0,
          opacity: 1,
          rotateZ: 0,
          duration,
          delay,
          stagger,
          ease: "power4.out",
          scrollTrigger: {
            trigger: elRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    }, elRef);

    return () => ctx.revert();
  }, [motionEnabled, delay, duration, stagger]);

  return (
    <div ref={elRef} className={`overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
