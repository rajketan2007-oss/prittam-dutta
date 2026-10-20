"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotion } from "@/context/MotionContext";

interface GsapCounterProps {
  value: string; // e.g. "4+", "03", "6+", "100%", "20+"
  className?: string;
  duration?: number;
}

export function GsapCounter({ value, className = "", duration = 2 }: GsapCounterProps) {
  const { motionEnabled } = useMotion();
  const counterRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!motionEnabled || !counterRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    // Extract numeric portion and suffix/prefix
    const match = value.match(/^([^\d]*)(\d+)([^\d]*)$/);
    if (!match) {
      if (counterRef.current) counterRef.current.innerText = value;
      return;
    }

    const prefix = match[1] || "";
    const targetNum = parseInt(match[2], 10);
    const suffix = match[3] || "";

    const counterObj = { val: 0 };

    const ctx = gsap.context(() => {
      gsap.to(counterObj, {
        val: targetNum,
        duration,
        ease: "power3.out",
        roundProps: "val",
        scrollTrigger: {
          trigger: counterRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          if (counterRef.current) {
            const formatted =
              match[2].length > 1 && counterObj.val < 10
                ? String(Math.round(counterObj.val)).padStart(match[2].length, "0")
                : String(Math.round(counterObj.val));
            counterRef.current.innerText = `${prefix}${formatted}${suffix}`;
          }
        },
      });
    }, counterRef);

    return () => ctx.revert();
  }, [value, duration, motionEnabled]);

  return (
    <span ref={counterRef} className={className}>
      {value}
    </span>
  );
}
