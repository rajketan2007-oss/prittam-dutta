"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface LightboxImage {
  src: string;
  alt: string;
  caption: string;
  label?: string;
}

interface LightboxProps {
  images: LightboxImage[];
  currentIndex: number | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: LightboxProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && currentIndex !== null) {
        onNavigate((currentIndex - 1 + images.length) % images.length);
      } else if (e.key === "ArrowRight" && currentIndex !== null) {
        onNavigate((currentIndex + 1) % images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  if (!isOpen || currentIndex === null || !images[currentIndex]) return null;

  const current = images[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[10001] bg-[#0A0A0A]/95 backdrop-blur-xl flex flex-col justify-between p-4 md:p-8"
        onClick={onClose}
      >
        {/* Top bar */}
        <div
          className="flex items-center justify-between w-full max-w-7xl mx-auto z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E8C877]">
              {current.label || "(ARCHIVE PROOF)"}
            </span>
            <span className="text-xs font-mono text-white/40">
              {currentIndex + 1} / {images.length}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close lightbox"
            className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-[#C9A24B] text-white/80 hover:text-white transition-colors duration-200"
            data-cursor="hover"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Center Image Container */}
        <div
          className="relative flex-1 flex items-center justify-center max-w-6xl w-full mx-auto my-4 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            key={current.src}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 260 }}
            className="relative w-full h-full max-h-[78vh] flex items-center justify-center"
          >
            <div className="relative w-full h-full border border-[#C9A24B]/30 rounded-lg overflow-hidden shadow-2xl shadow-black/80">
              <Image
                src={current.src}
                alt={current.alt}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-contain"
              />
            </div>
          </motion.div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={() =>
                  onNavigate((currentIndex - 1 + images.length) % images.length)
                }
                aria-label="Previous image"
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 border border-white/10 hover:border-[#C9A24B] text-white/80 hover:text-[#E8C877] transition-all duration-200 backdrop-blur-md"
                data-cursor="hover"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={() => onNavigate((currentIndex + 1) % images.length)}
                aria-label="Next image"
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 border border-white/10 hover:border-[#C9A24B] text-white/80 hover:text-[#E8C877] transition-all duration-200 backdrop-blur-md"
                data-cursor="hover"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Bottom Caption */}
        <div
          className="w-full max-w-4xl mx-auto text-center z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-sm md:text-base font-serif text-[#F2EFE9] tracking-wide">
            {current.caption}
          </p>
          <p className="text-[11px] font-mono uppercase tracking-widest text-white/40 mt-1">
            Press ESC to exit · Arrow keys to navigate
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
