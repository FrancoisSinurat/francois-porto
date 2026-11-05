"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Gitlab, Linkedin, MapPin } from "lucide-react";
import { handleSectionClick } from "@/lib/scroll";
import { yearsExperienceLabel } from "@/lib/career";
import MotionName from "@/components/ui/MotionName";
import HeroCursorOrbs from "@/components/ui/HeroCursorOrbs";
import ProfileCard from "@/components/ui/ProfileCard";

export default function Hero() {
  const years = yearsExperienceLabel();

  return (
    <section className="hero-surface relative min-h-screen overflow-x-clip">
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

      <div className="relative z-10 section-container min-h-screen grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center pt-14 md:pt-20 pb-24 md:pb-16">
        {/* Photo first on mobile, right column on desktop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="order-1 lg:order-2 flex justify-center lg:justify-end pt-2 lg:pt-0"
        >
          <ProfileCard
            name="Francois N. Sinurat"
            title="Back End Developer"
            handle="francoisnoval"
            status="Open to freelance"
            statusColor="#34d399"
            contactText="Contact"
            avatarUrl="/images/pp/copy-profile.jpeg"
            miniAvatarUrl="/images/pp/copy-profile.jpeg"
            theme="dark"
            backdropColor="#0C2340"
            holo={0.75}
            glare={0.45}
            tiltStrength={12}
            parallax={8}
            radius={16}
            enableTilt
            intro
            showUserInfo
            enableMobileTilt={false}
            onContactClick={() => {
              const el = document.getElementById("contact");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45 }}
          className="order-2 lg:order-1 text-center lg:text-left"
        >
          <div className="mb-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 lg:justify-start">
            <span className="inline-flex items-center gap-2 text-sm text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Open to freelance
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-[hsl(var(--hero-muted))]">
              <MapPin className="h-3.5 w-3.5" />
              Bekasi, Indonesia
            </span>
          </div>

          <MotionName />

          <p className="mt-5 text-lg font-medium tracking-tight text-[hsl(var(--accent))] sm:text-xl">
            Full Stack Developer
          </p>
          <p className="mt-1 text-sm text-[hsl(var(--hero-muted))]">Backend at Pegadaian</p>

          <div className="mx-auto mt-6 flex items-center justify-center gap-3.5 lg:mx-0 lg:justify-start">
            <span className="text-3xl font-semibold tabular-nums leading-none tracking-tight text-[hsl(var(--hero-fg))]">
              {years.value}
            </span>
            <span className="h-8 w-px bg-white/15" aria-hidden />
            <span className="text-left text-[11px] font-medium uppercase leading-tight tracking-[0.16em] text-[hsl(var(--hero-muted))]">
              {years.suffix}
            </span>
          </div>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <a
              href="#projects"
              onClick={(e) => handleSectionClick(e, "projects")}
              className="inline-flex items-center justify-center rounded-xl bg-[hsl(var(--accent))] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[hsl(var(--accent-hover))]"
            >
              View work
            </a>
            <a
              href="#contact"
              onClick={(e) => handleSectionClick(e, "contact")}
              className="inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-2.5 text-sm font-semibold text-[hsl(var(--hero-fg))] transition-colors hover:bg-white/5"
            >
              Contact
            </a>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 lg:justify-start">
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
