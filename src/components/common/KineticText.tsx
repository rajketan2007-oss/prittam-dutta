"use client";

import React from "react";
import { motion } from "framer-motion";
import { useMotion } from "@/context/MotionContext";
import { playHoverSound } from "@/utils/sound";

interface KineticTextProps {
  text: string;
  className?: string;
  isItalic?: boolean;
  accentColor?: string;
  delayOffset?: number;
  isLoaded?: boolean;
}

export function KineticText({
  text,
  className = "",
  isItalic = false,
  accentColor,
  delayOffset = 0,
  isLoaded = true,
}: KineticTextProps) {
  const { motionEnabled } = useMotion();
  const letters = text.split("");

  return (
    <span className={`inline-flex flex-wrap select-none ${className}`}>
      {letters.map((char, index) => {
        if (char === " ") {
          return <span key={index} className="inline-block w-[0.28em]">&nbsp;</span>;
        }

        return (
          <span
            key={index}
            className="inline-block overflow-hidden py-1"
            style={{ perspective: 1000 }}
          >
            <motion.span
              data-char={char}
              className={`inline-block origin-bottom ${
                isItalic ? "italic font-light" : ""
              }`}
              style={{
                color: accentColor || "currentColor",
              }}
              initial={motionEnabled ? { y: "115%", rotateX: 30, opacity: 0 } : false}
              animate={
                motionEnabled
                  ? isLoaded
                    ? { y: "0%", rotateX: 0, opacity: 1 }
                    : { y: "115%", rotateX: 30, opacity: 0 }
                  : false
              }
              transition={{
                duration: 1.15,
                ease: [0.16, 1, 0.3, 1],
                delay: delayOffset + index * 0.045,
              }}
              onMouseEnter={() => playHoverSound()}
              whileHover={
                motionEnabled
                  ? {
                      y: -12,
                      rotateZ: (index % 2 === 0 ? 1 : -1) * 4,
                      scale: 1.04,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 14,
                      },
                    }
                  : undefined
              }
            >
              {char}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}
