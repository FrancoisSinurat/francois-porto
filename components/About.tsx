"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaJs, FaPhp, FaDatabase, FaNodeJs, FaReact, FaCloud, FaLaravel, FaPython,
} from "react-icons/fa";
import {
  SiNextdotjs, SiPostgresql, SiRedis, SiRabbitmq, SiTailwindcss,
} from "react-icons/si";
import SectionHeader from "@/components/ui/SectionHeader";
import Wobble from "@/components/ui/Wobble";
import { yearsExperienceLabel } from "@/lib/career";
import { skillYearsLabel, skills, type SkillDef } from "@/lib/skills";

function SkillIcon({ iconKey }: { iconKey: SkillDef["iconKey"] }) {
  switch (iconKey) {
    case "golang":
      return (
        <Image
          src="/images/go-logo-fuchsia.png"
          alt="Go"
          width={20}
          height={20}
          className="h-5 w-5 object-contain"
        />
      );
    case "nodejs":
      return <FaNodeJs className="text-green-700" />;
    case "javascript":
      return <FaJs className="text-amber-600" />;
    case "php":
      return <FaPhp className="text-indigo-700" />;
    case "python":
      return <FaPython className="text-blue-600" />;
    case "nextjs":
      return <SiNextdotjs />;
    case "react":
      return <FaReact className="text-sky-600" />;
    case "laravel":
      return <FaLaravel className="text-red-600" />;
    case "fastapi":
      return <FaPython className="text-emerald-700" />;
    case "tailwind":
      return <SiTailwindcss className="text-sky-500" />;
    case "postgresql":
      return <SiPostgresql className="text-blue-700" />;
    case "mysql":
      return <FaDatabase className="text-orange-700" />;
    case "redis":
      return <SiRedis className="text-red-600" />;
    case "rabbitmq":
      return <SiRabbitmq className="text-orange-600" />;
    case "gcp":
      return <FaCloud className="text-blue-600" />;
    default:
      return null;
  }
}

export default function About() {
  const career = yearsExperienceLabel();
  const sortedSkills = [...skills].sort((a, b) => b.since - a.since || a.name.localeCompare(b.name));

  return (
    <div className="section-padding section-container">
      <div className="grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-16 items-start">
        <SectionHeader
          label="About"
          title="Full-stack engineer with a backend core"
          description={`ITERA graduate with ${career.value.toLowerCase()} ${career.suffix.toLowerCase()} — production backends by day, end-to-end delivery for freelance.`}
        />

        <div className="space-y-8">
          <Wobble intensity="medium">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-surface p-6 sm:p-8"
            >
              <p className="text-[hsl(var(--muted-foreground))] leading-relaxed text-base sm:text-lg">
                I ship full-stack products: scalable APIs and integrations with Golang,
                Node.js, PHP, and Python — plus modern web UIs with Next.js, React, and
                Tailwind. Comfortable owning the path from database to polished interface.
              </p>
              <p className="mt-4 text-[hsl(var(--muted-foreground))] leading-relaxed">
                Professionally, I&apos;m a Back End Developer at Neekosa Pakar Service,
                placed full-time at PT Pegadaian — building Golang microservices for Rahn
                (Islamic gold pawn) and TEFS gold deposit conversion on SPRINT. Open to
                full-stack freelance work alongside that role.
              </p>
            </motion.div>
          </Wobble>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[hsl(var(--muted-foreground))] mb-4">
              Tech I work with
            </p>
            <div className="flex flex-wrap gap-2">
              {sortedSkills.map((skill, i) => (
                <Wobble key={skill.name} intensity="soft" className="inline-flex">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.02 }}
                    className="inline-flex items-center gap-2 bg-[hsl(var(--surface))] border border-[hsl(var(--surface-border)/0.7)] rounded-md px-3 py-2 text-sm font-medium text-[hsl(var(--foreground))]"
                    title={`Using ${skill.name} since ${skill.since}`}
                  >
                    <span className="text-base">
                      <SkillIcon iconKey={skill.iconKey} />
                    </span>
                    {skill.name}
                    <span className="text-[11px] font-semibold text-[hsl(var(--accent))] tabular-nums">
                      {skillYearsLabel(skill.since)}
                    </span>
                  </motion.span>
                </Wobble>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
