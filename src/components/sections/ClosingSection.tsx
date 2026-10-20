"use client";

import React from "react";
import Image from "next/image";
import { SITE_CONTENT } from "@/data/content";
import { GsapTextReveal } from "@/components/common/GsapTextReveal";

export function ClosingSection() {
  const { closing } = SITE_CONTENT;

  return (
    <section className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20 border-b border-white/[0.06] dark:border-white/[0.06] light:border-black/[0.06] overflow-hidden">
      {/* Low-opacity duotone event photo backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.09] mix-blend-luminosity">
        <Image
          src="/images/bellebirds-team-certificate.jpg"
          alt="Atmospheric backdrop - Bellebirds ceremony"
          fill
          style={{ objectPosition: "50% 30%" }}
          className="object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A] dark:from-[#0A0A0A] dark:to-[#0A0A0A] light:from-[#F8F6F0] light:to-[#F8F6F0]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest text-[#E8C877] bg-[#C9A24B]/10 border border-[#C9A24B]/30">
          <span className="text-[#C9A24B]">+</span>
          [ FOUNDER&apos;S REFLECTION ]
          <span className="text-[#C9A24B]">+</span>
        </div>

        <GsapTextReveal>
          <h2 className="reveal-line text-[clamp(2.6rem,6.5vw,6rem)] font-serif font-normal leading-[0.98] text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212] tracking-tight">
            I&apos;m Not Just Building Businesses.{" "}
            <span className="italic font-serif text-[#C9A24B]">I&apos;m Building a Vision.</span>
          </h2>
        </GsapTextReveal>

        <div className="max-w-3xl mx-auto space-y-6 text-base md:text-xl font-sans text-[#A6A29A] dark:text-[#A6A29A] light:text-[#66625B] leading-relaxed">
          {closing.paragraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        <div className="pt-6">
          <p className="text-2xl md:text-4xl font-serif italic text-gradient-gold font-light tracking-wide">
            {closing.finalPunch}
          </p>
        </div>
      </div>
    </section>
  );
}
