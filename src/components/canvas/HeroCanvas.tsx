"use client";

import React, { useEffect, useRef } from "react";
import { useMotion } from "@/context/MotionContext";
import { useTheme } from "@/context/ThemeContext";

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { motionEnabled } = useMotion();
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Particle nodes for ambient gold web
    const particleCount = 42;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      phase: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.8,
        alpha: Math.random() * 0.16 + 0.05,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      time += 0.004;

      // Soft ambient radiant gradients
      const isDark = theme === "dark";
      const primaryGold = isDark ? "rgba(201, 162, 75, " : "rgba(184, 137, 44, ";

      // First radial light pool (top right - very soft ambient atmosphere)
      const grad1 = ctx.createRadialGradient(
        width * 0.75 + Math.sin(time) * 30,
        height * 0.25 + Math.cos(time * 0.8) * 20,
        0,
        width * 0.75,
        height * 0.25,
        width * 0.45
      );
      grad1.addColorStop(0, `${primaryGold}0.035)`);
      grad1.addColorStop(0.6, `${primaryGold}0.008)`);
      grad1.addColorStop(1, "transparent");

      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      // Second subtle radial light pool (bottom left)
      const grad2 = ctx.createRadialGradient(
        width * 0.25 - Math.cos(time * 0.6) * 40,
        height * 0.75 + Math.sin(time * 0.7) * 30,
        0,
        width * 0.25,
        height * 0.75,
        width * 0.4
      );
      grad2.addColorStop(0, `${primaryGold}0.025)`);
      grad2.addColorStop(0.6, `${primaryGold}0.005)`);
      grad2.addColorStop(1, "transparent");

      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Draw subtle interconnected geometric nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (motionEnabled) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }

        // Draw node
        const pulse = Math.sin(time * 2 + p.phase) * 0.12 + 0.88;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${primaryGold}${p.alpha * pulse})`;
        ctx.fill();

        // Connect nearby nodes with delicate hairlines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const lineAlpha = (1 - dist / 150) * 0.06;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `${primaryGold}${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      if (motionEnabled) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [motionEnabled, theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
