"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMotion } from "@/context/MotionContext";

export function Cursor() {
  const { motionEnabled } = useMotion();
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "pill">("default");
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Velocity tracking for 1minus1 style cursor stretch
  const lastMousePos = useRef({ x: 0, y: 0, time: 0 });
  const [cursorAngle, setCursorAngle] = useState(0);
  const [cursorScaleX, setCursorScaleX] = useState(1);
  const [cursorScaleY, setCursorScaleY] = useState(1);

  const springConfig = { damping: 24, stiffness: 300, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const hasPointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasPointer) return;

    let timeoutId: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dt = lastMousePos.current.time > 0 ? Math.max(1, now - lastMousePos.current.time) : 16;
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy) / dt;

      // Stretch cursor in the direction of travel when moving fast (1minus1 dynamic feel)
      if (speed > 0.4) {
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        setCursorAngle(angle);
        const stretch = Math.min(1.4, 1 + speed * 0.15);
        const squish = Math.max(0.75, 1 - speed * 0.08);
        setCursorScaleX(stretch);
        setCursorScaleY(squish);

        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setCursorScaleX(1);
          setCursorScaleY(1);
        }, 120);
      }

      lastMousePos.current = { x: e.clientX, y: e.clientY, time: now };

      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        const type = cursorTarget.getAttribute("data-cursor")?.toLowerCase() || "";
        if (type === "view") {
          setCursorVariant("pill");
          setCursorText("VIEW");
        } else if (type === "drag") {
          setCursorVariant("pill");
          setCursorText("DRAG");
        } else if (type === "look") {
          setCursorVariant("pill");
          setCursorText("LOOK");
        } else if (type === "say hi" || type === "contact") {
          setCursorVariant("pill");
          setCursorText("SAY HI");
        } else if (type === "open") {
          setCursorVariant("pill");
          setCursorText("OPEN");
        } else {
          setCursorVariant("hover");
          setCursorText("");
        }
      } else if (target.closest("a, button, input, select, textarea, [role='button']")) {
        setCursorVariant("hover");
        setCursorText("");
      } else {
        setCursorVariant("default");
        setCursorText("");
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timeoutId);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!motionEnabled || !isVisible) return null;

  return (
    <>
      {/* Precision Core Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#E8C877] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          opacity: cursorVariant === "pill" ? 0 : 1,
        }}
      />

      {/* Trailing 1minus1 Kinetic Elastic Pill / Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center rounded-full -translate-x-1/2 -translate-y-1/2 backdrop-blur-md shadow-lg shadow-black/40"
        style={{
          x: smoothX,
          y: smoothY,
          rotate: cursorVariant === "pill" ? 0 : cursorAngle,
          scaleX: cursorVariant === "pill" ? 1 : cursorScaleX,
          scaleY: cursorVariant === "pill" ? 1 : cursorScaleY,
        }}
        animate={{
          width: cursorVariant === "pill" ? 84 : cursorVariant === "hover" ? 44 : 26,
          height: cursorVariant === "pill" ? 84 : cursorVariant === "hover" ? 44 : 26,
          backgroundColor:
            cursorVariant === "pill"
              ? "rgba(14, 14, 14, 0.88)"
              : cursorVariant === "hover"
              ? "rgba(201, 162, 75, 0.1)"
              : "rgba(201, 162, 75, 0.04)",
          borderColor:
            cursorVariant === "pill"
              ? "rgba(201, 162, 75, 0.6)"
              : cursorVariant === "hover"
              ? "rgba(201, 162, 75, 0.4)"
              : "rgba(201, 162, 75, 0.25)",
          borderWidth: 1.5,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 350 }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[11px] font-mono tracking-widest font-semibold text-[#C9A24B] uppercase select-none pointer-events-none"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
