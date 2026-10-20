"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useMotion } from "@/context/MotionContext";
import { SITE_CONTENT } from "@/data/content";
import { playHoverSound } from "@/utils/sound";

interface MarqueeProps {
  items?: string[];
  direction?: "left" | "right";
  speed?: number;
  className?: string;
}

export function Marquee({
  items = SITE_CONTENT.marqueeKeywords,
  direction = "left",
  speed = 32,
  className = "",
}: MarqueeProps) {
  const { motionEnabled } = useMotion();
  const [isHovered, setIsHovered] = useState(false);

  // Duplicated for seamless infinite ticker
  const duplicated = [...items, ...items, ...items, ...items];

  return (
    <div
      onMouseEnter={() => {
        setIsHovered(true);
        playHoverSound();
      }}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full overflow-hidden border-y border-[#C9A24B]/30 bg-[#0A0A0A]/95 dark:bg-[#0A0A0A]/95 light:bg-[#F8F6F0]/95 backdrop-blur-md py-4 md:py-5 select-none transition-colors duration-300 ${className}`}
      data-cursor="look"
    >
      <motion.div
        className="flex w-max items-center whitespace-nowrap"
        animate={
          motionEnabled
            ? {
                x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
              }
            : { x: "0%" }
        }
        transition={
          motionEnabled
            ? {
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: isHovered ? speed * 0.7 : speed,
                  ease: "linear",
                },
              }
            : {}
        }
      >
        {duplicated.map((item, index) => (
          <div key={index} className="flex items-center space-x-6 md:space-x-10 px-4 md:px-6">
            <span className="text-sm md:text-base lg:text-lg font-mono uppercase tracking-widest text-[#F2EFE9]/90 dark:text-[#F2EFE9]/90 light:text-[#121212]/90 hover:text-[#E8C877] transition-colors duration-300 font-medium">
              [ {item} ]
            </span>

            {/* 1minus1 Cyber Accent Gold Diamond */}
            <span
              className="inline-block w-2 h-2 rotate-45 bg-gradient-to-tr from-[#C9A24B] to-[#E8C877] shadow-[0_0_8px_rgba(201,162,75,0.7)]"
              aria-hidden="true"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
