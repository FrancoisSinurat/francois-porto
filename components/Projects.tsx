"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  ExternalLink,
  Github,
  Globe,
  Images,
  Maximize2,
  Monitor,
  RefreshCw,
} from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ImageLightbox from "@/components/ui/ImageLightbox";
import Wobble from "@/components/ui/Wobble";
import { cn } from "@/lib/utils";

type Project = {
  id: number;
  title: string;
  description: string;
  /** ISO month YYYY-MM — drives auto-sort */
  start: string;
  /** ISO month or null = ongoing / Present */
  end: string | null;
  images: string[];
  date: string;
  skills: string[];
  overview: string;
  details: string[];
  githubLink?: string;
  githubLinkBackend?: string;
  liveLink?: string;
  previewUrl?: string;
  featured?: boolean;
  accent: string;
};

const MONTH_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatProjectPeriod(start: string, end: string | null): string {
  const [sy, sm] = start.split("-").map(Number);
  const from = `${MONTH_SHORT[(sm || 1) - 1]} ${sy}`;
  if (!end) return `${from} — Present`;
  const [ey, em] = end.split("-").map(Number);
  const to = `${MONTH_SHORT[(em || 1) - 1]} ${ey}`;
  return from === to ? from : `${from} — ${to}`;
}

/** Ongoing first, then newest by start/end. */
function sortProjects(list: Project[]): Project[] {
  return [...list].sort((a, b) => {
    const aOngoing = a.end === null ? 1 : 0;
    const bOngoing = b.end === null ? 1 : 0;
    if (aOngoing !== bOngoing) return bOngoing - aOngoing;
    const aKey = a.end ?? a.start;
    const bKey = b.end ?? b.start;
    return bKey.localeCompare(aKey) || b.start.localeCompare(a.start);
  });
}

const projectsRaw: Project[] = [
  {
    id: 1,
    title: "Sinity Finance",
    description: "Personal Finance Web App",
    start: "2025-03",
    end: "2025-08",
    images: [
      "/images/project-sinity-finance/login.png",
      "/images/project-sinity-finance/dashboard.png",
    ],
    date: "2025",
    skills: ["Next.js", "Golang", "ShadCN UI", "Tailwind CSS", "Vercel"],
    overview:
      "Personal finance management web app for tracking income, expenses, budgeting, savings, and account balances with mock/demo mode.",
    details: [
      "Built a responsive modern dashboard using Next.js and ShadCN UI.",
      "Developed backend services using Golang for financial data management.",
      "Implemented mock/demo mode that allows users to explore without real financial data.",
      "Deployed on Vercel for fast and reliable hosting.",
    ],
    liveLink: "https://sinityfinance.vercel.app",
    previewUrl: "https://sinityfinance.vercel.app",
    featured: true,
    accent: "from-emerald-500 to-teal-600",
  },
  {
    id: 2,
    title: "HCIS Admin Dashboard",
    description: "HR & Recruitment Portal — HireBoard",
    start: "2026-01",
    end: "2026-03",
    images: [],
    date: "2026",
    skills: ["Vue 3", "TypeScript", "Pinia", "Tailwind CSS", "Vite", "Vercel"],
    overview:
      "Human Capital Information System (HCIS) & company hiring portal for managing job orders, recruitment pipelines, candidate screening, interviews, and onboarding.",
    details: [
      "Built an interactive multi-tenant HR & hiring dashboard using Vue 3",
      "Designed end-to-end recruitment workflows: job orders, applicant tracking, interview scheduling, and onboarding.",
      "Implemented multi-company demo switching (Acme Staffing, Nusa Care, Pacific Factory) with scoped state.",
      "Crafted responsive, modern SaaS UI components with Tailwind CSS and custom design tokens.",
    ],
    liveLink: "https://hcis-template.vercel.app/login?redirect=/",
    previewUrl: "https://hcis-template.vercel.app/",
    featured: true,
    accent: "from-cyan-500 to-blue-600",
  },
  {
    id: 3,
    title: "Sinity Course",
    description: "Final Thesis — ITERA",
    start: "2024-12",
    end: "2025-06",
    images: ["/images/project-1/sinity.png", "/images/project-1/sinity-2.png"],
    date: "Dec 2024 — Jun 2025",
    skills: ["Next.js", "FastAPI", "Tailwind CSS", "ShadCN UI", "GCP", "Cloud Run"],
    overview:
      "Course recommendation platform with Hybrid Content-Based and Collaborative Filtering.",
    details: [
      "Developed personalized course discovery using hybrid recommendation methods.",
      "Built responsive frontend with Next.js, Tailwind CSS, and ShadCN UI.",
      "Designed and deployed RESTful API using FastAPI on Google Cloud Run.",
      "Deployed on GCP for scalable backend infrastructure.",
    ],
    githubLink: "https://github.com/FrancoisSinurat/sinity-course",
    githubLinkBackend: "https://github.com/FrancoisSinurat/Bag-model",
    featured: true,
    accent: "from-indigo-500 to-violet-600",
  },
  {
    id: 4,
    title: "Rekomenin",
    description: "Bangkit Capstone",
    start: "2024-02",
    end: "2024-07",
    images: [
      "/images/project-3/rekomenin.png",
      "/images/project-3/rekomenin-2.png",
      "/images/project-3/rekomenin-3.png",
    ],
    date: "2024",
    skills: ["Next.js", "Node.js", "GCP", "Cloud Run", "Cloud SQL"],
    overview: "Recommendation system platform from Bangkit Academy capstone project.",
    details: [
      "Contributed to Rekomenin developed with Google, GoTo, and Traveloka.",
      "Frontend development and deployment using Next.js and GCP.",
      "Built responsive interfaces and integrated with backend APIs.",
      "Managed cloud deployment for scalability and performance.",
    ],
    githubLink: "https://github.com/FrancoisSinurat/rekomenin-fe",
    featured: true,
    accent: "from-sky-500 to-blue-600",
  },
  {
    id: 5,
    title: "Asset Management",
    description: "DCKTRP Internship",
    start: "2024-06",
    end: "2024-08",
    images: ["/images/project-5/dcktrp.png"],
    date: "Jun — Aug 2024",
    skills: ["Laravel", "MySQL", "Bootstrap"],
    overview: "Web application for managing company assets efficiently.",
    details: [
      "Implemented Asset Group CRUD with Laravel MVC architecture.",
      "Integrated AssetGroup Model with Laravel Eloquent ORM.",
      "Utilized Laravel, MySQL, and Bootstrap for a responsive system.",
    ],
    githubLink: "https://github.com/FrancoisSinurat/project-laravel-app",
    accent: "from-amber-500 to-orange-600",
  },
  {
    id: 6,
    title: "Portfolio",
    description: "This Website",
    start: "2025-02",
    end: null,
    images: ["/images/porto/porto.png"],
    date: "Feb 2025 — Present",
    skills: ["Next.js", "React", "Tailwind CSS", "ShadCN UI"],
    overview: "Personal portfolio showcasing projects, skills, and experience.",
    details: [
      "Built with modern web technologies and optimized for performance.",
      "Deployed on Vercel at francois-porto.vercel.app.",
    ],
    liveLink: "https://francois-porto.vercel.app",
    previewUrl: "https://francois-porto.vercel.app",
    githubLink: "https://github.com/FrancoisSinurat/francois-porto",
    featured: true,
    accent: "from-violet-500 to-purple-600",
  },
  {
    id: 7,
    title: "Lapduk KKN",
    description: "KKN Tematik ITERA",
    start: "2023-12",
    end: "2024-01",
    images: ["/images/project-2/ss2-a.png"],
    date: "Dec 2023 — Jan 2024",
    skills: ["PHP", "Bootstrap", "SQL"],
    overview: "Web system for managing village population circulation.",
    details: [
      "Implemented secure login system.",
      "Designed responsive UI with Bootstrap.",
      "Managed structured data storage with SQL.",
    ],
    githubLink: "https://github.com/FrancoisSinurat/Lapduk-KKN",
    accent: "from-rose-500 to-pink-600",
  },
];

const projects = sortProjects(
  projectsRaw.map((p) => ({
    ...p,
    date: formatProjectPeriod(p.start, p.end),
  }))
);

function cleanDisplayUrl(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

/** Wider virtual desktop = more zoomed-out preview in the card */
const CARD_PREVIEW_WIDTH = 1600;
const CARD_PREVIEW_HEIGHT = 1000;
/** Slight zoom-out for the interactive modal iframe */
const MODAL_PREVIEW_ZOOM = 0.82;

function LiveSiteThumbnail({
  previewUrl,
  displayUrl,
  title,
  fallbackImage,
}: {
  previewUrl: string;
  displayUrl: string;
  title: string;
  fallbackImage?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.28);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateScale = () => {
      const w = el.clientWidth;
      if (w > 0) {
        setScale(w / CARD_PREVIEW_WIDTH);
      }
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col bg-[hsl(var(--page-bg))]">
      {/* Mini Browser Chrome Header */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[hsl(var(--surface))] border-b border-[hsl(var(--surface-border)/0.6)] shrink-0 z-10">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <div className="flex-1 min-w-0 flex items-center justify-center gap-1.5 rounded-md bg-[hsl(var(--page-bg-alt)/0.8)] border border-[hsl(var(--surface-border)/0.5)] px-2.5 py-0.5 text-[10px] font-medium text-[hsl(var(--muted-foreground))] truncate">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
          <span className="truncate">{cleanDisplayUrl(displayUrl)}</span>
        </div>
        <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 shrink-0">
          Live
        </span>
      </div>

      {/* Scaled Live Viewport */}
      <div ref={containerRef} className="relative flex-1 w-full overflow-hidden bg-slate-950/5">
        {!loaded && fallbackImage && (
          <Image
            src={fallbackImage}
            alt={title}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}

        {!loaded && !fallbackImage && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[hsl(var(--page-bg-alt))] text-[hsl(var(--muted-foreground))]">
            <div className="h-6 w-6 rounded-full border-2 border-[hsl(var(--accent))] border-t-transparent animate-spin" />
            <span className="text-[11px] font-medium">Loading live preview...</span>
          </div>
        )}

        <div
          className={cn(
            "absolute top-0 left-0 origin-top-left pointer-events-none select-none transition-opacity duration-500",
            loaded ? "opacity-100" : "opacity-0"
          )}
          style={{
            width: `${CARD_PREVIEW_WIDTH}px`,
            height: `${CARD_PREVIEW_HEIGHT}px`,
            transform: `scale(${scale})`,
          }}
        >
          <iframe
            src={previewUrl}
            title={`${title} live preview`}
            className="w-full h-full border-0 bg-white"
            loading="lazy"
            tabIndex={-1}
            onLoad={() => setLoaded(true)}
            sandbox="allow-scripts allow-same-origin"
          />
        </div>

        {/* Subtle bottom hover gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-bg)/0.5)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </div>
  );
}

function StaticImageThumbnail({
  image,
  title,
}: {
  image: string;
  title: string;
}) {
  return (
    <div className="relative w-full h-full flex flex-col bg-[hsl(var(--page-bg))]">
      {/* Subtle Window Top Bar for visual consistency */}
      <div className="flex items-center justify-between px-3 py-2 bg-[hsl(var(--surface))] border-b border-[hsl(var(--surface-border)/0.6)] shrink-0 z-10">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--surface-border))]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--surface-border))]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--surface-border))]" />
        </div>
        <span className="text-[10px] font-medium text-[hsl(var(--muted-foreground))] truncate max-w-[180px]">
          {title}
        </span>
        <span className="w-8" />
      </div>

      <div className="relative flex-1 w-full overflow-hidden bg-[hsl(var(--page-bg-alt))]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 50vw"
          unoptimized={image.endsWith(".svg")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-bg)/0.55)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const hasLivePreview = Boolean(project.previewUrl || project.liveLink);
  const previewSrc = project.previewUrl || project.liveLink || "";
  const displayUrl = project.liveLink || project.previewUrl || "";
  const skillLimit = 4;

  return (
    <Wobble intensity="medium" className="h-full">
      <Dialog>
        <DialogTrigger asChild>
          <motion.article
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "group relative card-surface overflow-hidden cursor-pointer text-left h-full flex flex-col",
              "hover:shadow-xl hover:shadow-[hsl(var(--accent)/0.08)] hover:border-[hsl(var(--accent)/0.4)] transition-all duration-300"
            )}
          >
            <div className={cn("h-1.5 w-full bg-gradient-to-r shrink-0", project.accent)} />

            <span className="absolute top-3 right-3 text-3xl font-black text-[hsl(var(--foreground)/0.04)] select-none pointer-events-none z-0">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="relative overflow-hidden mx-3 sm:mx-4 mt-3 sm:mt-4 rounded-xl border border-[hsl(var(--surface-border)/0.65)] shadow-sm aspect-[16/10] shrink-0">
              {hasLivePreview ? (
                <LiveSiteThumbnail
                  previewUrl={previewSrc}
                  displayUrl={displayUrl}
                  title={project.title}
                  fallbackImage={project.images[0]}
                />
              ) : (
                <StaticImageThumbnail
                  image={project.images[0]}
                  title={project.title}
                />
              )}

              <div className="absolute bottom-2.5 right-2.5 z-20 flex items-center gap-1.5 rounded-full bg-[hsl(var(--accent))] px-2.5 py-1 text-[11px] font-semibold text-white shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                <span>{hasLivePreview ? "Preview" : "Details"}</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </div>

            <div className="p-3.5 sm:p-5 flex flex-col flex-1 relative z-10 min-h-0">
              <div className="flex items-start justify-between gap-2 min-h-[1.25rem]">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[hsl(var(--accent))] line-clamp-1">
                  {project.description}
                </p>
                {project.end === null && (
                  <span className="shrink-0 rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Ongoing
                  </span>
                )}
              </div>

              <p className="mt-1 text-[11px] font-medium text-[hsl(var(--muted-foreground))] tabular-nums">
                {project.date}
              </p>

              <div className="mt-2 flex items-start gap-2">
                <h3 className="flex-1 min-w-0 text-base sm:text-lg font-bold text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--accent))] transition-colors leading-snug line-clamp-2">
                  {project.title}
                </h3>
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-[10px] sm:text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors shrink-0 mt-0.5"
                    title="Open live website"
                  >
                    <Globe className="h-3 w-3" />
                    <span className="hidden min-[380px]:inline">Visit</span>
                    <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                )}
              </div>

              <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))] line-clamp-2 leading-relaxed min-h-[2.75rem]">
                {project.overview}
              </p>

              <div className="mt-auto pt-3 border-t border-[hsl(var(--surface-border)/0.45)]">
                <div className="flex flex-wrap gap-1.5">
                  {project.skills.slice(0, skillLimit).map((s) => (
                    <span
                      key={s}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[hsl(var(--accent-soft))] text-[hsl(var(--accent))]"
                    >
                      {s}
                    </span>
                  ))}
                  {project.skills.length > skillLimit && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md text-[hsl(var(--muted-foreground))]">
                      +{project.skills.length - skillLimit}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.article>
        </DialogTrigger>
        <ProjectDialog project={project} />
      </Dialog>
    </Wobble>
  );
}

function ProjectDialog({ project }: { project: Project }) {
  const hasLivePreview = Boolean(project.previewUrl || project.liveLink);
  const hasScreenshots = project.images.length > 0;
  const previewSrc = project.previewUrl || project.liveLink || "";
  const displayUrl = project.liveLink || project.previewUrl || "";

  const [viewMode, setViewMode] = useState<"live" | "screenshots">(
    hasLivePreview ? "live" : "screenshots"
  );
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  return (
    <>
      <DialogContent className="max-w-3xl lg:max-w-5xl max-h-[min(92dvh,920px)] overflow-hidden p-0 gap-0 flex flex-col">
        <div className={cn("h-1.5 w-full shrink-0 bg-gradient-to-r", project.accent)} />

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 min-h-0">
          {/* Header */}
          <div className="p-5 sm:p-6 pb-4">
            <div className="flex flex-wrap items-start justify-between gap-4 pr-8">
              <div>
                <DialogTitle className="text-xl sm:text-2xl font-bold text-[hsl(var(--foreground))]">
                  {project.title}
                </DialogTitle>
                <DialogDescription className="mt-1 text-[hsl(var(--muted-foreground))]">
                  {project.description} · {project.date}
                </DialogDescription>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm transition-colors"
                  >
                    <Globe className="h-4 w-4" />
                    Open Live Website
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--surface-border))] bg-[hsl(var(--page-bg))] hover:bg-[hsl(var(--page-bg-alt))] px-3.5 py-2 text-xs sm:text-sm font-semibold text-[hsl(var(--foreground))] transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    {project.githubLinkBackend ? "Frontend Repo" : "GitHub"}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
                {project.githubLinkBackend && (
                  <a
                    href={project.githubLinkBackend}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--surface-border))] bg-[hsl(var(--page-bg))] hover:bg-[hsl(var(--page-bg-alt))] px-3.5 py-2 text-xs sm:text-sm font-semibold text-[hsl(var(--foreground))] transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    Backend Repo
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>

            <p className="mt-3 text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
              {project.overview}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs font-medium px-2.5 py-1 rounded-md bg-[hsl(var(--accent-soft))] text-[hsl(var(--accent))]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Live Preview / Screenshot Gallery */}
          <div className="px-5 sm:px-6 pb-5 sm:pb-6">
            {/* Mode Switcher if both Live Preview and Screenshots exist */}
            {hasLivePreview && hasScreenshots && (
              <div className="flex items-center gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setViewMode("live")}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
                    viewMode === "live"
                      ? "bg-[hsl(var(--accent))] text-white shadow-sm"
                      : "bg-[hsl(var(--page-bg-alt))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                  )}
                >
                  <Monitor className="h-3.5 w-3.5" />
                  Interactive Live Preview
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("screenshots")}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
                    viewMode === "screenshots"
                      ? "bg-[hsl(var(--accent))] text-white shadow-sm"
                      : "bg-[hsl(var(--page-bg-alt))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                  )}
                >
                  <Images className="h-3.5 w-3.5" />
                  Screenshots ({project.images.length})
                </button>
              </div>
            )}

            {viewMode === "live" && hasLivePreview ? (
              <div className="rounded-xl border border-[hsl(var(--surface-border)/0.7)] bg-[hsl(var(--page-bg))] overflow-hidden shadow-inner">
                {/* Interactive Browser Toolbar */}
                <div className="flex items-center justify-between gap-2 px-3.5 py-2.5 bg-[hsl(var(--page-bg-alt))] border-b border-[hsl(var(--surface-border)/0.6)]">
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-rose-400" />
                    <span className="h-3 w-3 rounded-full bg-amber-400" />
                    <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  </div>

                  <div className="flex-1 max-w-md flex items-center justify-between gap-2 rounded-lg bg-[hsl(var(--surface))] border border-[hsl(var(--surface-border)/0.6)] px-3 py-1 text-xs text-[hsl(var(--muted-foreground))]">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                      <span className="truncate">{displayUrl}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIframeKey((k) => k + 1)}
                      className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
                      title="Reload preview"
                    >
                      <RefreshCw className="h-3 w-3" />
                    </button>
                  </div>

                  <a
                    href={project.liveLink || previewSrc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[hsl(var(--accent))] hover:underline shrink-0"
                  >
                    Full Tab
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                {/* Live Interactive Iframe — slightly zoomed out for easier overview */}
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] min-h-[280px] sm:min-h-[420px] bg-white overflow-hidden">
                  <iframe
                    key={iframeKey}
                    src={previewSrc}
                    title={`${project.title} interactive demo`}
                    className="w-full h-full border-0 origin-top-left"
                    style={{
                      width: `${100 / MODAL_PREVIEW_ZOOM}%`,
                      height: `${100 / MODAL_PREVIEW_ZOOM}%`,
                      transform: `scale(${MODAL_PREVIEW_ZOOM})`,
                    }}
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  />
                </div>
              </div>
            ) : (
              hasScreenshots && (
                <div className="rounded-xl border border-[hsl(var(--surface-border)/0.6)] bg-[hsl(var(--page-bg-alt))] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setLightboxOpen(true)}
                    className="group/preview relative w-full aspect-[16/10] sm:aspect-[16/9] min-h-[200px] sm:min-h-[280px] cursor-zoom-in bg-[hsl(var(--page-bg))]"
                    aria-label="Enlarge screenshot"
                  >
                    <Image
                      src={project.images[activeImage]}
                      alt={`${project.title} screenshot`}
                      fill
                      className="object-contain p-1 sm:p-2 transition-transform duration-300 group-hover/preview:scale-[1.005]"
                      sizes="(max-width: 768px) 100vw, 800px"
                      unoptimized={project.images[activeImage].endsWith(".svg")}
                    />
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-[hsl(var(--hero-bg)/0.85)] px-2.5 py-1.5 text-xs font-medium text-[hsl(var(--hero-fg))] opacity-0 group-hover/preview:opacity-100 transition-opacity">
                      <Maximize2 className="h-3.5 w-3.5" />
                      Enlarge
                    </div>
                  </button>

                  {project.images.length > 1 && (
                    <div className="flex gap-2 p-3 sm:p-4 pt-0 overflow-x-auto scrollbar-thin">
                      {project.images.map((img, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setActiveImage(i)}
                          className={cn(
                            "relative shrink-0 w-[72px] h-[52px] sm:w-24 sm:h-[68px] rounded-lg overflow-hidden border-2 transition-all",
                            i === activeImage
                              ? "border-[hsl(var(--accent))]"
                              : "border-transparent opacity-60 hover:opacity-100"
                          )}
                        >
                          <Image
                            src={img}
                            alt=""
                            fill
                            className="object-cover object-top"
                            unoptimized={img.endsWith(".svg")}
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            )}
          </div>

          {/* Contributions */}
          <div className="px-5 sm:px-6 pb-6 border-t border-[hsl(var(--surface-border)/0.4)] pt-5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[hsl(var(--muted-foreground))] mb-3">
              Key Contributions
            </h4>
            <ul className="space-y-2.5">
              {project.details.map((d, i) => (
                <li
                  key={i}
                  className="text-sm text-[hsl(var(--muted-foreground))] flex gap-2.5 leading-relaxed"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--accent))]" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>

      {lightboxOpen && hasScreenshots && (
        <ImageLightbox
          images={project.images}
          currentIndex={activeImage}
          alt={project.title}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setActiveImage}
        />
      )}
    </>
  );
}

/** Collapsed viewport shows this many cards; expanded scrolls inside the same height. */
const PAGE_SIZE = 6;

export default function Projects() {
  const [expanded, setExpanded] = useState(false);
  const [lockHeight, setLockHeight] = useState<number | null>(null);
  const blockRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasMore = projects.length > PAGE_SIZE;
  const visible = expanded ? projects : projects.slice(0, PAGE_SIZE);

  const collapse = () => {
    setExpanded(false);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  };

  // Lock height to the collapsed "6 cards" footprint so expand doesn't grow the page
  useLayoutEffect(() => {
    if (expanded || !scrollRef.current) return;
    const h = Math.ceil(scrollRef.current.getBoundingClientRect().height);
    if (h > 0) setLockHeight(h);
  }, [expanded]);

  // Recapture height on resize while collapsed
  useEffect(() => {
    if (expanded) return;
    const onResize = () => {
      if (!scrollRef.current) return;
      const h = Math.ceil(scrollRef.current.getBoundingClientRect().height);
      if (h > 0) setLockHeight(h);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [expanded]);

  // Modal-like dismiss: click outside block or Escape → back to 6
  useEffect(() => {
    if (!expanded) return;

    const onPointerDown = (e: PointerEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el) return;
      // Keep open when interacting inside the projects block
      if (blockRef.current?.contains(el)) return;
      // Project dialog / lightbox portal to body — don't treat as outside click
      if (
        el.closest('[role="dialog"]') ||
        el.closest("[data-radix-portal]") ||
        el.closest("[data-lightbox]")
      ) {
        return;
      }
      collapse();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      // Don't steal Esc from an open dialog
      if (e.key !== "Escape") return;
      if (document.querySelector('[role="dialog"][data-state="open"]')) return;
      collapse();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [expanded]);

  return (
    <section
      id="projects"
      className="relative section-padding border-t border-[hsl(var(--surface-border)/0.35)] scroll-mt-nav overflow-hidden"
    >
      <div className="section-container relative z-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8 sm:mb-10">
          <div className="max-w-xl">
            <div className="accent-line mb-4 sm:mb-5" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2 text-[hsl(var(--accent))]">
              Projects
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight text-[hsl(var(--foreground))]">
              Selected work
            </h2>
            <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-[hsl(var(--muted-foreground))]">
              Full-stack demos and production work — newest and ongoing first.
            </p>
          </div>
          <div className="inline-flex self-start sm:self-auto items-center gap-2 rounded-full border border-[hsl(var(--surface-border)/0.8)] bg-[hsl(var(--surface)/0.85)] px-3.5 py-2 text-[11px] sm:text-xs font-medium text-[hsl(var(--muted-foreground))]">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            Live badge = real-time preview
          </div>
        </div>

        <div
          ref={blockRef}
          className={cn(
            "relative rounded-2xl transition-[box-shadow,background-color] duration-300",
            expanded &&
              "bg-[hsl(var(--surface)/0.35)] shadow-[0_0_0_1px_hsl(var(--accent)/0.2),0_20px_50px_-28px_hsl(var(--accent)/0.35)]"
          )}
        >
          <div
            ref={scrollRef}
            className={cn(
              "relative",
              expanded
                ? "overflow-y-auto overscroll-contain scrollbar-thin pr-1"
                : "overflow-hidden"
            )}
            style={
              expanded
                ? {
                    height: lockHeight ?? undefined,
                    maxHeight: lockHeight ?? "min(85vh, 920px)",
                  }
                : undefined
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 items-stretch p-0.5">
              <AnimatePresence initial={false}>
                {visible.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={expanded && index >= PAGE_SIZE ? { opacity: 0, y: 12 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.25,
                      delay: expanded && index >= PAGE_SIZE
                        ? Math.min((index - PAGE_SIZE) * 0.03, 0.2)
                        : Math.min(index * 0.03, 0.15),
                    }}
                    className="h-full min-w-0"
                  >
                    <ProjectCard project={project} index={index} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Soft fade when collapsed and more exist */}
          {!expanded && hasMore && (
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[hsl(var(--page-bg))] to-transparent"
              aria-hidden
            />
          )}
        </div>

        {hasMore && (
          <div className="mt-6 sm:mt-8 flex flex-col items-center gap-2">
            {!expanded ? (
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className={cn(
                  "group inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors",
                  "border-[hsl(var(--accent)/0.35)] bg-[hsl(var(--accent)/0.1)]",
                  "text-[hsl(var(--foreground))] hover:bg-[hsl(var(--accent)/0.18)]"
                )}
              >
                Show more
                <ChevronDown className="h-4 w-4 text-[hsl(var(--accent))]" />
              </button>
            ) : (
              <p className="text-xs text-[hsl(var(--muted-foreground))] text-center px-4">
                Scroll inside the block · click outside or press Esc to collapse
              </p>
            )}
            <p className="text-xs text-[hsl(var(--muted-foreground))] tabular-nums">
              {expanded
                ? `${projects.length} projects · scrollable`
                : `Showing ${PAGE_SIZE} of ${projects.length}`}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
