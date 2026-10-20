"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONTENT, ServiceItem } from "@/data/content";
import { Plus, Minus, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { MagneticButton } from "@/components/common/MagneticButton";
import { GsapTextReveal } from "@/components/common/GsapTextReveal";
import { playClickSound, playHoverSound } from "@/utils/sound";

export function ServicesSection() {
  const { services } = SITE_CONTENT;
  const [openId, setOpenId] = useState<string>("digital-marketing");

  const toggleAccordion = (id: string) => {
    playClickSound();
    setOpenId(openId === id ? "" : id);
  };

  return (
    <section
      id="services"
      className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20 border-b border-white/[0.06] dark:border-white/[0.06] light:border-black/[0.06]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#C9A24B] mb-4">
              <span className="text-[#C9A24B]">+</span>
              <span>({services.sectionIndex})</span>
              <span>{services.label}</span>
              <span className="h-[1px] w-12 bg-[#C9A24B]/30" />
            </div>

            <GsapTextReveal>
              <h2 className="reveal-line text-[clamp(2.4rem,5.5vw,5rem)] font-serif font-normal leading-[1.0] text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212] tracking-tight">
                Better Marketing.{" "}
                <span className="italic font-serif text-[#C9A24B]">Smarter Systems.</span> More Room
                to Grow.
              </h2>
            </GsapTextReveal>
          </div>
          <p className="text-sm md:text-base font-sans text-[#A6A29A] dark:text-[#A6A29A] light:text-[#66625B] max-w-md">
            {services.intro}
          </p>
        </div>

        {/* Interactive Services Accordion with 1minus1 hover states */}
        <div className="divide-y divide-white/[0.08] dark:divide-white/[0.08] light:divide-black/[0.08] border-y border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08]">
          {services.items.map((item: ServiceItem) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                onMouseEnter={() => playHoverSound()}
                className="group py-6 md:py-8 transition-colors duration-300"
              >
                {/* Header Row */}
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full flex items-center justify-between text-left focus:outline-none"
                  data-cursor="hover"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-6 md:gap-10">
                    <span className="text-xs md:text-sm font-mono text-[#C9A24B] font-semibold">
                      [ {item.number} ]
                    </span>
                    <h3 className="text-xl md:text-3xl lg:text-4xl font-serif text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212] group-hover:text-[#E8C877] transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <div className="p-2.5 rounded-full border border-white/10 dark:border-white/10 light:border-black/10 group-hover:border-[#C9A24B] text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212] transition-colors">
                    {isOpen ? <Minus className="w-5 h-5 text-[#E8C877]" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>

                {/* Collapsible Body */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 pb-2 pl-12 md:pl-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        <div className="lg:col-span-8 space-y-4">
                          <p className="text-base md:text-lg font-sans text-[#A6A29A] dark:text-[#A6A29A] light:text-[#66625B] leading-relaxed">
                            {item.description}
                          </p>

                          {/* Focus areas pills with 1minus1 cyber styling */}
                          <div className="flex flex-wrap gap-2 pt-2">
                            {item.tags.map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono text-[#E8C877] bg-[#C9A24B]/10 border border-[#C9A24B]/30 hover:border-[#E8C877] transition-colors"
                              >
                                <CheckCircle2 className="w-3 h-3 text-[#C9A24B]" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="lg:col-span-4 flex justify-start lg:justify-end">
                          <a
                            href="#contact"
                            onClick={() => playClickSound()}
                            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212] hover:text-[#E8C877] py-2.5 px-5 rounded-full border border-white/15 dark:border-white/15 light:border-black/15 hover:border-[#C9A24B] transition-colors"
                          >
                            Inquire for this
                            <ArrowUpRight className="w-3.5 h-3.5 text-[#E8C877]" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Section Bottom CTA Callout */}
        <div className="mt-16 p-8 md:p-12 rounded-3xl border border-[#C9A24B]/35 bg-gradient-to-r from-[#C9A24B]/[0.08] via-transparent to-transparent flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#C9A24B] block mb-2 font-semibold">
              [ COLLABORATION PROPOSAL ]
            </span>
            <p className="text-xl md:text-2xl font-serif text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212]">
              {services.ctaLine}
            </p>
          </div>
          <MagneticButton asAnchor href="#contact">
            <span
              onClick={() => playClickSound()}
              onMouseEnter={() => playHoverSound()}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs font-mono uppercase tracking-widest font-bold bg-gradient-to-r from-[#C9A24B] to-[#E8C877] text-black shadow-lg shadow-[#C9A24B]/20 hover:brightness-110 transition-all whitespace-nowrap"
            >
              {services.ctaButton}
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
