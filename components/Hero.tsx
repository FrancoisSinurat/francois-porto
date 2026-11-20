"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Gitlab, Linkedin, MapPin } from "lucide-react";
import { handleSectionClick, scrollToSection } from "@/lib/scroll";
import { yearsExperienceLabel } from "@/lib/career";
import MotionName from "@/components/ui/MotionName";
import HeroCursorOrbs from "@/components/ui/HeroCursorOrbs";
import ProfileCard from "@/components/ui/ProfileCard";

type HeroProps = {
  /** Mobile page mode: fill viewport, no scroll overflow. */
  compact?: boolean;
};

export default function Hero({ compact = false }: HeroProps) {
  const years = yearsExperienceLabel();

  return (
    <section
      className={
        compact
          ? "hero-surface relative h-full min-h-0 overflow-hidden"
          : "hero-surface relative min-h-screen overflow-x-clip"
      }
    >
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

      <div
        className={
          compact
            ? "relative z-10 mx-auto flex h-full min-h-0 w-full flex-col items-center justify-center gap-3 overflow-hidden px-5 pb-[88px] pt-3"
            : "relative z-10 section-container min-h-screen grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center pt-14 md:pt-20 pb-24 md:pb-16"
        }
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={
            compact
              ? "order-1 flex w-full justify-center"
              : "order-1 lg:order-2 flex justify-center lg:justify-end pt-2 lg:pt-0"
          }
        >
          <ProfileCard
            className={compact ? "profile-card--compact" : undefined}
            name={compact ? "" : "Francois Novalentino S"}
            title={compact ? "" : "Back End Developer"}
            handle={compact ? "" : "francoisnoval"}
            status={compact ? "" : "Open to collab"}
            statusColor="#34d399"
            contactText={compact ? "" : "Contact"}
            avatarUrl="/images/pp/copy-profile.jpeg"
            theme="dark"
            backdropColor="#0C2340"
            holo={compact ? 0 : 0.75}
            glare={compact ? 0 : 0.45}
            tiltStrength={compact ? 0 : 12}
            parallax={compact ? 0 : 8}
            radius={16}
            enableTilt={!compact}
            intro={!compact}
            showUserInfo={!compact}
            enableMobileTilt={false}
            onContactClick={() => scrollToSection("contact")}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45 }}
          className={
            compact
              ? "order-2 w-full text-center"
              : "order-2 lg:order-1 text-center lg:text-left"
          }
        >
          <div
            className={
              compact
                ? "mb-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1"
                : "mb-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 lg:justify-start"
            }
          >
            <span className="inline-flex items-center gap-2 text-xs text-emerald-300 sm:text-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Open to collab
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-[hsl(var(--hero-muted))] sm:text-sm">
              <MapPin className="h-3.5 w-3.5" />
              Bekasi, Indonesia
            </span>
          </div>

          <MotionName
            className={
              compact
                ? "text-[clamp(1.55rem,7vw,2.35rem)] font-extrabold leading-[1.08] tracking-tight"
                : undefined
            }
          />

          <p
            className={
              compact
                ? "mt-2 text-base font-medium tracking-tight text-[hsl(var(--accent))]"
                : "mt-5 text-lg font-medium tracking-tight text-[hsl(var(--accent))] sm:text-xl"
            }
          >
            Full Stack Developer
          </p>
          <p className="mt-0.5 text-xs text-[hsl(var(--hero-muted))] sm:text-sm">
            Backend at Pegadaian
          </p>

          <div
            className={
              compact
                ? "mx-auto mt-3 flex items-center justify-center gap-3"
                : "mx-auto mt-6 flex items-center justify-center gap-3.5 lg:mx-0 lg:justify-start"
            }
          >
            <span className="text-2xl font-semibold tabular-nums leading-none tracking-tight text-[hsl(var(--hero-fg))] sm:text-3xl">
              {years.value}
            </span>
            <span className="h-7 w-px bg-white/15 sm:h-8" aria-hidden />
            <span className="text-left text-[10px] font-medium uppercase leading-tight tracking-[0.16em] text-[hsl(var(--hero-muted))] sm:text-[11px]">
              {years.suffix}
            </span>
          </div>

          <div
            className={
              compact
                ? "mt-3.5 flex items-center justify-center gap-2.5"
                : "mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
            }
          >
            <a
              href="#projects"
              onClick={(e) => handleSectionClick(e, "projects")}
              className="inline-flex items-center justify-center rounded-xl bg-[hsl(var(--accent))] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[hsl(var(--accent-hover))]"
            >
              View work
            </a>
            <a
              href="#contact"
              onClick={(e) => handleSectionClick(e, "contact")}
              className="inline-flex items-center justify-center rounded-xl border border-white/15 px-5 py-2 text-sm font-semibold text-[hsl(var(--hero-fg))] transition-colors hover:bg-white/5"
            >
              Contact
            </a>
          </div>

          <div
            className={
              compact
                ? "mt-3 flex items-center justify-center gap-1.5"
                : "mt-6 flex items-center justify-center gap-2 lg:justify-start"
            }
          >
            {[
              { href: "https://github.com/FrancoisSinurat", icon: Github, label: "GitHub" },
              { href: "https://gitlab.com/novalsinurat28", icon: Gitlab, label: "GitLab" },
              {
                href: "https://www.linkedin.com/in/francoisnoval",
                icon: Linkedin,
                label: "LinkedIn",
              },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-xl border border-[hsl(222_20%_26%)] p-2 text-[hsl(var(--hero-muted))] transition-colors hover:border-[hsl(var(--accent)/0.5)] hover:bg-[hsl(222_20%_14%)] hover:text-[hsl(var(--hero-fg))]"
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {!compact ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block"
        >
          <a
            href="#about"
            onClick={(e) => handleSectionClick(e, "about")}
            className="flex flex-col items-center gap-1 text-[hsl(var(--hero-muted))] transition-colors hover:text-[hsl(var(--hero-fg))]"
            aria-label="Scroll down"
          >
            <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </a>
        </motion.div>
      ) : null}
    </section>
  );
}
