"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useMotion } from "@/context/MotionContext";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  asAnchor?: boolean;
  href?: string;
}

export function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  asAnchor = false,
  href,
  ...props
}: MagneticButtonProps) {
  const { motionEnabled } = useMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!motionEnabled || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * strength, y: middleY * strength });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.2 }}
      className="inline-block"
    >
      {asAnchor && href ? (
        <a href={href} className={className} data-cursor="hover">
          {children}
        </a>
      ) : (
        <button className={className} data-cursor="hover" {...props}>
          {children}
        </button>
      )}
    </motion.div>
  );

  return content;
}
