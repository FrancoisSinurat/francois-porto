"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Github, Gitlab, Linkedin, MapPin } from "lucide-react";
import { handleSectionClick } from "@/lib/scroll";
import MotionName from "@/components/ui/MotionName";
import HeroCursorOrbs from "@/components/ui/HeroCursorOrbs";
import Wobble from "@/components/ui/Wobble";

export default function Hero() {
  return (
    <section className="hero-surface relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-hero-grid opacity-80"
        style={{
          maskImage:
            "radial-gradient(ellipse 85% 75% at 50% 45%, black 35%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 75% at 50% 45%, black 35%, transparent 100%)",
        }}
      />
      <HeroCursorOrbs />

      <div className="relative z-10 section-container min-h-screen grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45 }}
          className="text-center lg:text-left"
        >
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--open-badge)/0.4)] bg-[hsl(var(--open-badge)/0.12)] px-3.5 py-1.5 text-sm font-medium text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Open to work
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-[hsl(var(--hero-muted))]">
              <MapPin className="h-3.5 w-3.5 text-[hsl(var(--accent))]" />
              Bekasi City, Indonesia
            </span>
          </div>

          <MotionName />

          <p className="mt-4 text-xl sm:text-2xl font-semibold text-[hsl(var(--accent))]">
            Software Developer
          </p>

          <p className="mt-4 max-w-xl mx-auto lg:mx-0 text-[hsl(var(--hero-muted))] leading-relaxed text-base sm:text-lg">
            Building scalable APIs, mobile banking backends, and system integrations
            with Golang, Node.js, and modern web stacks.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
            <a
              href="#projects"
              onClick={(e) => handleSectionClick(e, "projects")}
              className="inline-flex items-center justify-center rounded-xl bg-[hsl(var(--accent))] px-7 py-3 text-sm font-semibold text-white hover:bg-[hsl(var(--accent-hover))] transition-colors shadow-lg shadow-teal-500/25"
            >
              View My Work
            </a>
            <a
              href="#contact"
              onClick={(e) => handleSectionClick(e, "contact")}
              className="inline-flex items-center justify-center rounded-xl border border-[hsl(222_20%_28%)] px-7 py-3 text-sm font-semibold text-[hsl(var(--hero-fg))] hover:bg-[hsl(222_20%_16%)] transition-colors"
            >
              Contact Me
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center lg:justify-start gap-3">
            {[
              { href: "https://github.com/FrancoisSinurat", icon: Github, label: "GitHub" },
              { href: "https://gitlab.com/novalsinurat28", icon: Gitlab, label: "GitLab" },
              { href: "https://www.linkedin.com/in/francoisnoval", icon: Linkedin, label: "LinkedIn" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2.5 rounded-xl border border-[hsl(222_20%_26%)] text-[hsl(var(--hero-muted))] hover:text-[hsl(var(--hero-fg))] hover:border-[hsl(var(--accent)/0.5)] hover:bg-[hsl(222_20%_14%)] transition-colors"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex justify-center lg:justify-end"
        >
          <Wobble intensity="strong" className="relative">
            <div className="absolute -inset-3 rounded-3xl border-2 border-[hsl(var(--accent)/0.35)] rotate-3" />
            <div className="absolute -inset-3 rounded-3xl border border-[hsl(222_20%_28%)] -rotate-2" />
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden border-2 border-[hsl(222_20%_30%)]">
              <Image
                src="/images/pp/copy-profile.jpeg"
                alt="Francois Novalentino Sinurat"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="absolute -bottom-4 -left-4 sm:-left-8 card-surface px-4 py-3 shadow-lg">
              <p className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--accent))]">
                Role
              </p>
              <p className="text-sm font-semibold text-[hsl(var(--foreground))] mt-0.5">
                Software Developer
              </p>
            </div>

            <div className="absolute -top-3 -right-3 sm:-right-6 rounded-xl bg-[hsl(var(--accent))] px-3 py-2 text-xs font-bold text-white shadow-lg">
              Bekasi, ID
            </div>
          </Wobble>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:block"
      >
        <a
          href="#about"
          onClick={(e) => handleSectionClick(e, "about")}
          className="flex flex-col items-center gap-1 text-[hsl(var(--hero-muted))] hover:text-[hsl(var(--hero-fg))] transition-colors"
          aria-label="Scroll down"
        >
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
