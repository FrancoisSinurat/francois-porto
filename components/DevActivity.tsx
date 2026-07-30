"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpFromLine,
  ExternalLink,
  FolderGit2,
  GitCommitHorizontal,
  Github,
  Gitlab,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

type Platform = "gitlab" | "github";

type PlatformActivity = {
  username: string;
  profileUrl: string;
  projects: number;
  commits: number;
  pushes: number;
  calendar: Record<string, number>;
  lastUpdated: string;
};

type LoadState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; data: PlatformActivity };

const WEEKDAYS = ["", "Mon", "", "Wed", "", "Fri", ""];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const PLATFORMS: {
  id: Platform;
  label: string;
  endpoint: string;
  icon: typeof Gitlab;
}[] = [
  { id: "gitlab", label: "GitLab", endpoint: "/api/gitlab/activity", icon: Gitlab },
  { id: "github", label: "GitHub", endpoint: "/api/github/activity", icon: Github },
];

function toDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function buildHeatmapWeeks(calendar: Record<string, number>) {
  const today = startOfDay(new Date());
  const end = new Date(today);
  const day = end.getDay();
  end.setDate(end.getDate() + (6 - day));

  const start = new Date(end);
  start.setDate(start.getDate() - 52 * 7 + 1);
  start.setDate(start.getDate() - start.getDay());

  const weeks: { date: Date; key: string; count: number }[][] = [];
  const cursor = new Date(start);

  while (cursor <= end) {
    const week: { date: Date; key: string; count: number }[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(cursor);
      const key = toDateKey(date);
      week.push({ date, key, count: calendar[key] ?? 0 });
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(week);
  }

  return weeks;
}

function scaleMax(counts: number[]): number {
  const nonzero = counts.filter((c) => c > 0).sort((a, b) => a - b);
  if (!nonzero.length) return 1;
  const p90 = nonzero[Math.floor((nonzero.length - 1) * 0.9)] ?? 1;
  return Math.max(p90, 1);
}

function intensity(count: number, max: number): number {
  if (count <= 0 || max <= 0) return 0;
  const ratio = Math.log1p(count) / Math.log1p(max);
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}

const levelClass = [
  "bg-[hsl(var(--surface-border)/0.45)]",
  "bg-[hsl(var(--accent)/0.28)]",
  "bg-[hsl(var(--accent)/0.48)]",
  "bg-[hsl(var(--accent)/0.72)]",
  "bg-[hsl(var(--accent))]",
] as const;

function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

function StatCard({
  label,
  value,
  icon: Icon,
  delay,
}: {
  label: string;
  value: number;
  icon: typeof FolderGit2;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="card-surface p-4 sm:p-6"
    >
      <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
        <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] text-[hsl(var(--muted-foreground))]">
          {label}
        </p>
        <span className="inline-flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-[hsl(var(--accent-soft))] text-[hsl(var(--accent))]">
          <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </span>
      </div>
      <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[hsl(var(--foreground))] tabular-nums">
        {formatNumber(value)}
      </p>
    </motion.div>
  );
}

function Heatmap({ calendar }: { calendar: Record<string, number> }) {
  const weeks = useMemo(() => buildHeatmapWeeks(calendar), [calendar]);
  const max = useMemo(
    () => scaleMax(weeks.flatMap((w) => w.map((d) => d.count))),
    [weeks]
  );

  const monthLabels = useMemo(() => {
    const labels: { weekIndex: number; label: string }[] = [];
    let lastMonth = -1;
    weeks.forEach((week, i) => {
      const month = week[0]?.date.getMonth() ?? -1;
      if (month !== lastMonth) {
        labels.push({ weekIndex: i, label: MONTHS[month] });
        lastMonth = month;
      }
    });
    return labels;
  }, [weeks]);

  const cell = "h-[10px] w-[10px] sm:h-[11px] sm:w-[11px]";
  const gap = "gap-[2px] sm:gap-[3px]";
  const weekStep = 12; // approx for month label positioning on mobile
  const weekStepSm = 14;

  return (
    <div className="overflow-x-auto scrollbar-thin -mx-1 px-1 touch-pan-x">
      <div className="inline-block min-w-[520px] sm:min-w-[640px]">
        <div className="relative h-4 mb-1.5 ml-7 sm:ml-8">
          {monthLabels.map((m) => (
            <span
              key={`${m.label}-${m.weekIndex}`}
              className="absolute top-0 text-[9px] sm:text-[10px] text-[hsl(var(--muted-foreground))] sm:hidden"
              style={{ left: m.weekIndex * weekStep }}
            >
              {m.label}
            </span>
          ))}
          {monthLabels.map((m) => (
            <span
              key={`sm-${m.label}-${m.weekIndex}`}
              className="absolute top-0 text-[10px] text-[hsl(var(--muted-foreground))] hidden sm:block"
              style={{ left: m.weekIndex * weekStepSm }}
            >
              {m.label}
            </span>
          ))}
        </div>

        <div className={cn("flex", gap)}>
          <div className={cn("flex flex-col pr-1.5 sm:pr-2 shrink-0", gap)}>
            {WEEKDAYS.map((d, i) => (
              <div
                key={i}
                className="h-[10px] sm:h-[11px] w-5 sm:w-6 text-[9px] sm:text-[10px] leading-[10px] sm:leading-[11px] text-[hsl(var(--muted-foreground))]"
              >
                {d}
              </div>
            ))}
          </div>

          {weeks.map((week, wi) => (
            <div key={wi} className={cn("flex flex-col", gap)}>
              {week.map((day) => {
                const level = intensity(day.count, max);
                const future = day.date > startOfDay(new Date());
                return (
                  <div
                    key={day.key}
                    title={
                      future
                        ? undefined
                        : `${day.key}: ${day.count} contribution${day.count === 1 ? "" : "s"}`
                    }
                    className={cn(
                      cell,
                      "rounded-[2px] transition-colors",
                      future ? "bg-transparent" : levelClass[level]
                    )}
                  />
                );
              })}
            </div>
          ))}
        </div>

        <div className="mt-3 sm:mt-4 flex items-center justify-end gap-1.5 text-[9px] sm:text-[10px] text-[hsl(var(--muted-foreground))]">
          <span>Less</span>
          {levelClass.map((cls, i) => (
            <span key={i} className={cn(cell, "rounded-[2px]", cls)} />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="space-y-4 sm:space-y-6 animate-pulse">
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="card-surface h-[88px] sm:h-[108px]" />
        ))}
      </div>
      <div className="card-surface h-36 sm:h-40" />
    </div>
  );
}

function PlatformPanel({ platform }: { platform: Platform }) {
  const meta = PLATFORMS.find((p) => p.id === platform)!;
  const [state, setState] = useState<LoadState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading" });

    (async () => {
      try {
        const res = await fetch(meta.endpoint);
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || `Failed to load ${meta.label} activity`);
        if (!cancelled) setState({ status: "ready", data: json as PlatformActivity });
      } catch (err) {
        if (!cancelled) {
          setState({
            status: "error",
            message: err instanceof Error ? err.message : "Failed to load activity",
          });
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [meta.endpoint, meta.label]);

  if (state.status === "loading") return <Skeleton />;

  if (state.status === "error") {
    return (
      <div className="card-surface p-5 sm:p-8">
        <p className="text-sm sm:text-base text-[hsl(var(--muted-foreground))] leading-relaxed">
          Couldn&apos;t load {meta.label} activity. Check{" "}
          <code className="text-[hsl(var(--foreground))]">
            {platform === "gitlab" ? "GITLAB_TOKEN" : "GITHUB_TOKEN"}
          </code>{" "}
          in <code className="text-[hsl(var(--foreground))]">.env.local</code>, then restart the
          server.
        </p>
        <p className="mt-3 text-xs sm:text-sm text-[hsl(var(--muted-foreground))] break-words">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <StatCard label="Projects" value={state.data.projects} icon={FolderGit2} delay={0} />
        <StatCard
          label="Commits"
          value={state.data.commits}
          icon={GitCommitHorizontal}
          delay={0.05}
        />
        <StatCard label="Pushes" value={state.data.pushes} icon={ArrowUpFromLine} delay={0.1} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.12 }}
        className="card-surface p-4 sm:p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 mb-4 sm:mb-5">
          <div>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] text-[hsl(var(--muted-foreground))]">
              Contribution activity
            </p>
            <p className="mt-1 text-xs sm:text-sm text-[hsl(var(--muted-foreground))]">
              Last 12 months on {meta.label}
            </p>
          </div>
          <a
            href={state.data.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[hsl(var(--accent))] hover:text-[hsl(var(--accent-hover))] transition-colors"
          >
            @{state.data.username}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
        <Heatmap calendar={state.data.calendar} />
      </motion.div>
    </div>
  );
}

export default function DevActivity() {
  const [platform, setPlatform] = useState<Platform>("gitlab");

  return (
    <div className="section-padding section-container">
      <div className="grid lg:grid-cols-[280px_1fr] gap-8 sm:gap-10 lg:gap-16 items-start">
        <SectionHeader
          label="Activity"
          title="Shipping on Git"
          description="Live metrics from GitLab and GitHub — projects, commits, and contribution rhythm."
        />

        <div className="space-y-4 sm:space-y-6 min-w-0">
          <div
            role="tablist"
            aria-label="Activity platform"
            className="flex p-1 rounded-xl bg-[hsl(var(--page-bg-alt))] border border-[hsl(var(--surface-border)/0.6)]"
          >
            {PLATFORMS.map((p) => {
              const Icon = p.icon;
              const active = platform === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setPlatform(p.id)}
                  className={cn(
                    "flex-1 inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors",
                    active
                      ? "bg-[hsl(var(--surface))] text-[hsl(var(--foreground))] shadow-sm"
                      : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {p.label}
                </button>
              );
            })}
          </div>

          <PlatformPanel key={platform} platform={platform} />
        </div>
      </div>
    </div>
  );
}
