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

const allSkills = [
  {
    name: "Golang",
    icon: (
      <Image
        src="/images/go-logo-fuchsia.png"
        alt="Go"
        width={20}
        height={20}
        className="h-5 w-5 object-contain"
      />
    ),
  },
  { name: "Node.js", icon: <FaNodeJs className="text-green-700" /> },
  { name: "JavaScript", icon: <FaJs className="text-amber-600" /> },
  { name: "PHP", icon: <FaPhp className="text-indigo-700" /> },
  { name: "Python", icon: <FaPython className="text-blue-600" /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "React", icon: <FaReact className="text-sky-600" /> },
  { name: "Laravel", icon: <FaLaravel className="text-red-600" /> },
  { name: "FastAPI", icon: <FaPython className="text-emerald-700" /> },
  { name: "Tailwind", icon: <SiTailwindcss className="text-sky-500" /> },
  { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-700" /> },
  { name: "MySQL", icon: <FaDatabase className="text-orange-700" /> },
  { name: "Redis", icon: <SiRedis className="text-red-600" /> },
  { name: "RabbitMQ", icon: <SiRabbitmq className="text-orange-600" /> },
  { name: "GCP", icon: <FaCloud className="text-blue-600" /> },
];

export default function About() {
  return (
    <div className="section-padding section-container">
      <div className="grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-16 items-start">
        <SectionHeader
          label="About"
          title="Engineer who ships reliable systems"
          description="ITERA graduate with production experience in fintech and enterprise backends."
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
                I build scalable web applications, RESTful APIs, and system integrations
                using Golang, Node.js, PHP, Python, Next.js, and React. Experienced in
                financial systems with PostgreSQL, MySQL, Redis, RabbitMQ, and GCP.
              </p>
              <p className="mt-4 text-[hsl(var(--muted-foreground))] leading-relaxed">
                Currently a Back End Developer at Neekosa Pakar Service, placed full-time
                at PT Pegadaian — building Golang microservices for Rahn (Islamic gold pawn)
                and TEFS gold deposit conversion on the SPRINT platform.
              </p>
            </motion.div>
          </Wobble>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[hsl(var(--muted-foreground))] mb-4">
              Tech I work with
            </p>
            <div className="flex flex-wrap gap-2">
              {allSkills.map((skill, i) => (
                <Wobble key={skill.name} intensity="soft" className="inline-flex">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.02 }}
                    className="inline-flex items-center gap-2 bg-[hsl(var(--surface))] border border-[hsl(var(--surface-border)/0.7)] rounded-md px-3 py-2 text-sm font-medium text-[hsl(var(--foreground))]"
                  >
                    <span className="text-base">{skill.icon}</span>
                    {skill.name}
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
