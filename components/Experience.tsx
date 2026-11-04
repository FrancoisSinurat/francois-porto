"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import Wobble from "@/components/ui/Wobble";
import { getSortedExperiences, yearsExperienceLabel } from "@/lib/career";

export default function WorkExp() {
  const items = getSortedExperiences();
  const career = yearsExperienceLabel();

  return (
    <div className="section-padding section-container">
      <div className="grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-16 items-start">
        <SectionHeader
          label="Experience"
          title="Where I've worked"
          description={`${career.value} ${career.suffix.toLowerCase()} across industry programs and production fintech systems — sorted newest first.`}
        />

        <div className="space-y-6">
          {items.map((exp, index) => (
            <Wobble key={`${exp.company}-${exp.start}`} intensity="medium">
              <motion.article
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="card-surface overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 p-5 sm:p-6 border-b border-[hsl(var(--surface-border)/0.6)] bg-[hsl(var(--page-bg-alt)/0.5)]">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-bold text-[hsl(var(--foreground))]">
                        {exp.title}
                      </h3>
                      {exp.ongoing && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/35 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Ongoing
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1 leading-relaxed">
                      {exp.company}
                      {exp.client ? (
                        <>
                          {" · "}
                          <span className="text-[hsl(var(--foreground))] font-medium">
                            Client: {exp.client}
                          </span>
                        </>
                      ) : null}
                    </p>
                  </div>
                  <div className="flex flex-col sm:items-end gap-1 shrink-0">
                    <span className="text-sm font-semibold text-[hsl(var(--foreground))]">
                      {exp.periodLabel}
                    </span>
                    <span className="text-xs font-medium text-[hsl(var(--accent))]">
                      {exp.durationLabel}
                      <span className="text-[hsl(var(--muted-foreground))]"> · </span>
                      {exp.type}
                    </span>
                  </div>
                </div>

                <ul className="p-5 sm:p-6 space-y-3">
                  {exp.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm text-[hsl(var(--muted-foreground))] leading-relaxed"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--accent))]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            </Wobble>
          ))}
        </div>
      </div>
    </div>
  );
}
