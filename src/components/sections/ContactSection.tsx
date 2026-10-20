"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONTENT } from "@/data/content";
import { ArrowUpRight, CheckCircle, Mail, MapPin, Send, AlertCircle, Loader2 } from "lucide-react";
import { MagneticButton } from "@/components/common/MagneticButton";
import { GsapTextReveal } from "@/components/common/GsapTextReveal";
import { playClickSound, playHoverSound } from "@/utils/sound";

export function ContactSection() {
  const { contact } = SITE_CONTENT;

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    topic: contact.topics[0],
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message. Please try again.");
      }

      setStatus("success");
      setFormState({
        name: "",
        email: "",
        topic: contact.topics[0],
        message: "",
      });
    } catch (err: unknown) {
      setStatus("error");
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20 border-b border-white/[0.06] dark:border-white/[0.06] light:border-black/[0.06]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-4xl mb-16 md:mb-20">
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#C9A24B] mb-4">
            <span className="text-[#C9A24B]">+</span>
            <span>({contact.sectionIndex})</span>
            <span>{contact.label}</span>
            <span className="h-[1px] w-12 bg-[#C9A24B]/30" />
          </div>
          <GsapTextReveal>
            <h2 className="reveal-line text-[clamp(2.4rem,5.5vw,5rem)] font-serif font-normal leading-[1.0] text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212] tracking-tight mb-6">
              The Next Great Idea{" "}
              <span className="italic font-serif text-[#C9A24B]">Could Start With a Conversation.</span>
            </h2>
          </GsapTextReveal>
          <div className="space-y-4 text-base md:text-lg font-sans text-[#A6A29A] dark:text-[#A6A29A] light:text-[#66625B] leading-relaxed">
            <p>{contact.intro1}</p>
            <p>{contact.intro2}</p>
          </div>
        </div>

        {/* 12-Column Grid: Form (Cols 1-7) & Direct Channels (Cols 8-12) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Working Contact Form */}
          <div className="lg:col-span-7 p-8 md:p-12 rounded-3xl border border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] bg-[#111111] dark:bg-[#111111] light:bg-[#FFFFFF] shadow-2xl">
            <div className="mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#E8C877]">
                {contact.subTitle}
              </span>
              <h3 className="text-xl md:text-2xl font-serif text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212] mt-1">
                {contact.prompt}
              </h3>
            </div>

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 flex flex-col items-center text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#C9A24B]/20 border border-[#C9A24B] flex items-center justify-center text-[#E8C877]">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-serif text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212]">
                    Message Sent Successfully
                  </h4>
                  <p className="text-sm font-sans text-[#A6A29A] dark:text-[#A6A29A] light:text-[#66625B] max-w-md">
                    Thank you for reaching out. Pritam Dutta will review your note and respond
                    promptly.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-4 px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest border border-white/20 text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212] hover:border-[#C9A24B]"
                  >
                    Send Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {status === "error" && (
                    <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 flex items-center gap-3 text-red-200 text-xs font-mono">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Name field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-xs font-mono uppercase tracking-wider text-[#A6A29A] dark:text-[#A6A29A] light:text-[#66625B]"
                    >
                      Your Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Alexander Vance"
                      className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-black/[0.03] border border-white/10 dark:border-white/10 light:border-black/10 focus:border-[#C9A24B] focus:ring-1 focus:ring-[#C9A24B] outline-none text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212] font-sans text-sm transition-colors"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-xs font-mono uppercase tracking-wider text-[#A6A29A] dark:text-[#A6A29A] light:text-[#66625B]"
                    >
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="e.g. alexander@enterprise.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-black/[0.03] border border-white/10 dark:border-white/10 light:border-black/10 focus:border-[#C9A24B] focus:ring-1 focus:ring-[#C9A24B] outline-none text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212] font-sans text-sm transition-colors"
                    />
                  </div>

                  {/* Topic dropdown */}
                  <div className="space-y-2">
                    <label
                      htmlFor="topic"
                      className="text-xs font-mono uppercase tracking-wider text-[#A6A29A] dark:text-[#A6A29A] light:text-[#66625B]"
                    >
                      Discussion Topic *
                    </label>
                    <select
                      id="topic"
                      value={formState.topic}
                      onChange={(e) => setFormState({ ...formState, topic: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#141414] dark:bg-[#141414] light:bg-[#FAFAFA] border border-white/10 dark:border-white/10 light:border-black/10 focus:border-[#C9A24B] focus:ring-1 focus:ring-[#C9A24B] outline-none text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212] font-sans text-sm transition-colors"
                    >
                      {contact.topics.map((t, idx) => (
                        <option key={idx} value={t} className="bg-[#141414] text-white">
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message field */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="message"
                        className="text-xs font-mono uppercase tracking-wider text-[#A6A29A] dark:text-[#A6A29A] light:text-[#66625B]"
                      >
                        Your Message *
                      </label>
                      <span className="text-[10px] font-mono text-white/40">
                        {contact.instructions}
                      </span>
                    </div>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Share your goals, challenges, or collaborative ideas..."
                      className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-black/[0.03] border border-white/10 dark:border-white/10 light:border-black/10 focus:border-[#C9A24B] focus:ring-1 focus:ring-[#C9A24B] outline-none text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212] font-sans text-sm resize-none transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <MagneticButton className="w-full" type="submit" disabled={status === "submitting"}>
                    <div className="w-full py-4 rounded-xl text-xs font-mono uppercase tracking-widest font-bold bg-gradient-to-r from-[#C9A24B] to-[#E8C877] text-black shadow-lg shadow-[#C9A24B]/20 hover:brightness-110 flex items-center justify-center gap-2 transition-all">
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          {contact.ctaButton}
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </div>
                  </MagneticButton>
                </form>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Direct Info & Editorial Quote */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl border border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] bg-white/[0.02] dark:bg-white/[0.02] light:bg-black/[0.02] space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C9A24B] block">
                (DIRECT CHANNELS)
              </span>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#E8C877] flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#A6A29A] block">
                    Inquiries &amp; Projects
                  </span>
                  <a
                    href={`mailto:${contact.details.email}`}
                    className="text-base md:text-lg font-mono text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212] hover:text-[#E8C877] transition-colors"
                  >
                    {contact.details.email}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#E8C877] flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#A6A29A] block">
                    Location &amp; Base
                  </span>
                  <p className="text-sm font-sans text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212]">
                    {contact.details.location}
                  </p>
                </div>
              </div>

              {/* Availability Status */}
              <div className="pt-4 border-t border-white/[0.06]">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-[#E8C877] bg-[#C9A24B]/10 border border-[#C9A24B]/30">
                  <span className="w-2 h-2 rounded-full bg-[#C9A24B] animate-pulse" />
                  {contact.details.status}
                </span>
              </div>
            </div>

            {/* Social Channels Cluster */}
            <div className="p-8 rounded-3xl border border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] bg-white/[0.02] dark:bg-white/[0.02] light:bg-black/[0.02] space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#E8C877] block">
                (NETWORK &amp; PLATFORMS)
              </span>
              <div className="space-y-2">
                {contact.details.socials.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl border border-white/[0.06] hover:border-[#C9A24B]/40 hover:bg-white/[0.02] transition-colors text-sm font-mono text-[#F2EFE9] dark:text-[#F2EFE9] light:text-[#121212]"
                  >
                    <span>{s.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#C9A24B]" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quote Banner */}
            <p className="text-sm font-serif italic text-[#A6A29A] dark:text-[#A6A29A] light:text-[#66625B] px-2">
              “{contact.closingQuote}”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
