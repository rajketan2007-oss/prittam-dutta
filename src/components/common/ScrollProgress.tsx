"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useMotion } from "@/context/MotionContext";

export function ScrollProgress() {
  const { motionEnabled } = useMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setPercentage(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[9995] pointer-events-none bg-white/[0.04]">
      <motion.div
        className="h-full bg-gradient-to-r from-[#C9A24B] via-[#E8C877] to-[#C9A24B] origin-left"
        style={{ scaleX: motionEnabled ? scaleX : scrollYProgress }}
      />
    </div>
  );
}
