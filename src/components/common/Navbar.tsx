"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { MotionToggle } from "./MotionToggle";
import { SoundToggle } from "./SoundToggle";
import { MagneticButton } from "./MagneticButton";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { playClickSound, playHoverSound } from "@/utils/sound";

const NAV_LINKS = [
  { num: "01", label: "Work", href: "#businesses" },
  { num: "02", label: "About", href: "#about" },
  { num: "03", label: "Journey", href: "#journey" },
  { num: "04", label: "Services", href: "#services" },
  { num: "05", label: "Milestones", href: "#achievements" },
  { num: "06", label: "Contact", href: "#contact" },
];

export function Navbar({ isLoaded = true }: { isLoaded?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={isLoaded ? { y: 0, opacity: 1 } : { y: -30, opacity: 0 }}
        transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className={`fixed top-0 left-0 right-0 z-[900] transition-all duration-500 ${
          scrolled
            ? "py-3 bg-[#0A0A0A]/90 dark:bg-[#0A0A0A]/90 light:bg-[#F8F6F0]/90 backdrop-blur-md border-b border-white/[0.06] dark:border-white/[0.06] light:border-black/[0.06]"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Wordmark with HUD marker */}
          <Link
            href="/"
            onClick={() => playClickSound()}
            onMouseEnter={() => playHoverSound()}
            className="group flex flex-col"
            data-cursor="hover"
            aria-label="Pritam Dutta - Home"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono text-[#C9A24B] font-bold">+</span>
              <span className="text-sm md:text-base font-mono tracking-widest uppercase font-bold text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212] group-hover:text-[#E8C877] transition-colors">
                PRITAM DUTTA
              </span>
            </div>
            <span className="text-[10px] font-mono tracking-wider text-[#A6A29A] dark:text-[#A6A29A] light:text-[#66625B]">
              [ FOUNDER &amp; BUILDER ]
            </span>
          </Link>

          {/* Desktop Nav Items with 1minus1 hover effect */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-mono tracking-wider">
            {NAV_LINKS.map((link) => (
              <a
                key={link.num}
                href={link.href}
                onClick={() => playClickSound()}
                onMouseEnter={() => playHoverSound()}
                className="group relative flex items-center gap-1.5 py-1 text-[#F2EFE9]/70 dark:text-[#F2EFE9]/70 light:text-[#121212]/70 hover:text-[#E8C877] transition-colors duration-200"
                data-cursor="hover"
              >
                <span className="text-[9px] text-[#C9A24B] opacity-70 group-hover:opacity-100">
                  {link.num}
                </span>
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#C9A24B] to-[#E8C877] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Right Action Cluster with Sound Toggle */}
          <div className="hidden sm:flex items-center gap-2.5">
            <SoundToggle />
            <MotionToggle />
            <ThemeToggle />
            <MagneticButton asAnchor href="#contact">
              <span
                onClick={() => playClickSound()}
                onMouseEnter={() => playHoverSound()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider font-semibold bg-gradient-to-r from-[#C9A24B] to-[#E8C877] text-black hover:brightness-110 shadow-sm transition-all duration-300"
              >
                Work With Me
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </MagneticButton>
          </div>

          {/* Mobile Hamburger Trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <SoundToggle />
            <ThemeToggle />
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                playClickSound();
              }}
              aria-label="Toggle mobile navigation menu"
              className="p-2 rounded-full border border-white/10 dark:border-white/10 light:border-black/10 text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212]"
              data-cursor="hover"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full-Screen Animated Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[890] bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#F8F6F0] flex flex-col justify-between p-8 pt-28"
          >
            <div className="flex flex-col gap-6">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#C9A24B]">
                [ NAVIGATION INDEX ]
              </span>
              <nav className="flex flex-col gap-4">
                {NAV_LINKS.map((link, idx) => (
                  <motion.a
                    key={link.num}
                    href={link.href}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      playClickSound();
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.3 }}
                    className="flex items-baseline gap-4 py-2 border-b border-white/[0.06] text-3xl font-serif text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212] hover:text-[#E8C877] transition-colors"
                  >
                    <span className="text-xs font-mono text-[#C9A24B]">{link.num}</span>
                    <span>{link.label}</span>
                  </motion.a>
                ))}
              </nav>
            </div>

            {/* Mobile Bottom Footer */}
            <div className="flex flex-col gap-4 pt-6 border-t border-white/[0.08]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#A6A29A]">Preferences</span>
                <div className="flex items-center gap-2">
                  <SoundToggle />
                  <MotionToggle />
                  <ThemeToggle />
                </div>
              </div>
              <a
                href="#contact"
                onClick={() => {
                  setMobileMenuOpen(false);
                  playClickSound();
                }}
                className="w-full py-3.5 text-center rounded-full font-mono uppercase tracking-widest text-xs font-bold bg-gradient-to-r from-[#C9A24B] to-[#E8C877] text-black"
              >
                Work With Me →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
