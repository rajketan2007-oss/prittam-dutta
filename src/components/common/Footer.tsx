"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { SITE_CONTENT } from "@/data/content";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#070707] dark:bg-[#070707] light:bg-[#EFECE6] pt-20 pb-12 px-6 md:px-12 lg:px-20 text-[#A6A29A] dark:text-[#A6A29A] light:text-[#66625B] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Top Grid: Grouped Links (Businesses, Services, Social, Navigation) */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-10 pb-16 border-b border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08]">
          {/* Col 1-4: Bio / Brand summary */}
          <div className="col-span-2 md:col-span-4 lg:col-span-4 space-y-4">
            <span className="text-base font-serif font-bold text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212] tracking-wider block">
              PRITAM DUTTA
            </span>
            <p className="text-xs md:text-sm font-sans leading-relaxed text-[#A6A29A] dark:text-[#A6A29A] light:text-[#66625B] max-w-sm">
              Entrepreneur, founder, and business builder based in India. Turning digital potential
              into business growth across technology, marketing, travel, and education.
            </p>
            <div className="text-[11px] font-mono text-[#E8C877] pt-2">
              CYPTION · OFFROUTE · COURSE TO EXCELLENCE
            </div>
          </div>

          {/* Col 5-6: Businesses */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212] block">
              (BUSINESSES)
            </span>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a
                  href="https://cyption.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#E8C877] transition-colors flex items-center gap-1.5"
                >
                  Cyption <ArrowUpRight className="w-3 h-3 text-[#C9A24B]" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/offroutetourandtravels/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#E8C877] transition-colors flex items-center gap-1.5"
                >
                  Offroute <ArrowUpRight className="w-3 h-3 text-[#C9A24B]" />
                </a>
              </li>
              <li>
                <span className="text-white/60 dark:text-white/60 light:text-black/60">
                  Course to Excellence
                </span>
              </li>
              <li>
                <a href="#upcoming" className="text-[#C9A24B] hover:underline">
                  Upcoming Ventures →
                </a>
              </li>
            </ul>
          </div>

          {/* Col 7-8: Services */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212] block">
              (SERVICES)
            </span>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a href="#services" className="hover:text-[#E8C877] transition-colors">
                  Digital Marketing &amp; Growth
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#E8C877] transition-colors">
                  AI Automation Consulting
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#E8C877] transition-colors">
                  Digital Transformation
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#E8C877] transition-colors">
                  Strategy &amp; Implementation
                </a>
              </li>
            </ul>
          </div>

          {/* Col 9-12: Social & Legal */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212] block">
              (CONNECT)
            </span>
            <ul className="space-y-2 text-xs font-mono">
              {SITE_CONTENT.contact.details.socials.map((s, idx) => (
                <li key={idx}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#E8C877] transition-colors flex items-center gap-1"
                  >
                    {s.name} <ArrowUpRight className="w-3 h-3 text-[#C9A24B]" />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${SITE_CONTENT.contact.details.email}`}
                  className="hover:text-[#E8C877] transition-colors"
                >
                  Direct Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Huge Footer Wordmark */}
        <div className="py-12 md:py-16 overflow-hidden">
          <div className="text-[clamp(3.8rem,14vw,14rem)] font-serif font-bold text-white/[0.04] dark:text-white/[0.04] light:text-black/[0.06] select-none leading-none tracking-tight text-center">
            PRITAM DUTTA
          </div>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="pt-8 border-t border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span>© 2026 Pritam Dutta.</span>
            <span className="hidden sm:inline">All rights reserved.</span>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Back to top of page"
            className="flex items-center gap-2 text-[#E8C877] hover:underline"
            data-cursor="hover"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
