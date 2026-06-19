"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github, Globe, Maximize2 } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import SectionHeader from "@/components/ui/SectionHeader";
import ImageLightbox from "@/components/ui/ImageLightbox";
import { cn } from "@/lib/utils";

type Project = {
  id: number;
  title: string;
  description: string;
  images: string[];
  date: string;
  skills: string[];
  overview: string;
  details: string[];
  githubLink?: string;
  githubLinkBackend?: string;
  liveLink?: string;
  featured?: boolean;
  accent: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Sinity Finance",
    description: "Personal Finance",
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
    liveLink: "https://sinityspace.my.id/sinify/login/",
    featured: true,
    accent: "from-emerald-500 to-teal-600",
  },
  {
    id: 2,
    title: "Sinity Course",
    description: "Final Thesis — ITERA",
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
    githubLinkBackend: "https://github.com/FrancoisSinurat/fix-model",
    featured: true,
    accent: "from-indigo-500 to-violet-600",
  },
  {
    id: 3,
    title: "Rekomenin",
    description: "Bangkit Capstone",
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
    accent: "from-sky-500 to-blue-600",
  },
  {
    id: 4,
    title: "Asset Management",
    description: "DCKTRP Internship",
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
    id: 5,
    title: "Portfolio",
    description: "This Website",
    images: ["/images/porto/porto.png"],
    date: "Feb 2025 — Present",
    skills: ["Next.js", "React", "Tailwind CSS", "ShadCN UI"],
    overview: "Personal portfolio showcasing projects, skills, and experience.",
    details: [
      "Built with modern web technologies and optimized for performance.",
      "Deployed on Vercel at francois-porto.vercel.app.",
    ],
    githubLink: "https://github.com/FrancoisSinurat/francois-porto",
    accent: "from-violet-500 to-purple-600",
  },
  {
    id: 6,
    title: "Lapduk KKN",
    description: "KKN Tematik ITERA",
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

const layoutClass: Record<number, string> = {
  1: "md:col-span-7 md:row-span-2",
  2: "md:col-span-5",
  3: "md:col-span-5",
  4: "md:col-span-4",
  5: "md:col-span-4",
  6: "md:col-span-4",
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isFeatured = project.featured;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.article
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "group relative card-surface overflow-hidden cursor-pointer text-left h-full flex flex-col",
            "hover:shadow-xl hover:shadow-[hsl(var(--accent)/0.08)] transition-all duration-300",
            layoutClass[project.id]
          )}
        >
          <div className={cn("h-1.5 w-full bg-gradient-to-r", project.accent)} />

          <span className="absolute top-5 right-5 text-5xl font-black text-[hsl(var(--foreground)/0.04)] select-none pointer-events-none">
            {String(index + 1).padStart(2, "0")}
          </span>

          <div
            className={cn(
              "relative overflow-hidden bg-[hsl(var(--page-bg-alt))] mx-4 mt-4 rounded-xl border border-[hsl(var(--surface-border)/0.5)]",
              isFeatured ? "aspect-[16/10]" : "aspect-[16/11]"
            )}
          >
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized={project.images[0].endsWith(".svg")}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-bg)/0.55)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="absolute top-3 left-3 flex gap-2">
              {project.liveLink && (
                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                  Live
                </span>
              )}
            </div>

            <div className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--accent))] text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>

          <div className={cn("p-4 flex flex-col flex-1", isFeatured && "md:p-5")}>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[hsl(var(--accent))]">
              {project.description}
            </p>
            <h3 className={cn("font-bold text-[hsl(var(--foreground))] mt-1", isFeatured ? "text-xl" : "text-lg")}>
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))] line-clamp-2 flex-1">
              {project.overview}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.skills.slice(0, isFeatured ? 4 : 3).map((s) => (
                <span
                  key={s}
                  className="text-[10px] font-semibold px-2 py-1 rounded-md bg-[hsl(var(--accent-soft))] text-[hsl(var(--accent))]"
                >
                  {s}
                </span>
              ))}
            </div>
            <p className="mt-3 text-[11px] font-medium text-[hsl(var(--muted-foreground))]">{project.date}</p>
          </div>
        </motion.article>
      </DialogTrigger>
      <ProjectDialog project={project} />
    </Dialog>
  );
}

function ProjectDialog({ project }: { project: Project }) {
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <DialogContent className="max-w-3xl lg:max-w-4xl max-h-[min(92dvh,900px)] overflow-hidden p-0 gap-0 flex flex-col">
        <div className={cn("h-1 w-full shrink-0 bg-gradient-to-r", project.accent)} />

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 min-h-0">
          {/* Header */}
          <div className="p-5 sm:p-6 pb-4">
            <DialogTitle className="text-xl sm:text-2xl font-bold text-[hsl(var(--foreground))] pr-10">
              {project.title}
            </DialogTitle>
            <DialogDescription className="mt-1.5 text-[hsl(var(--muted-foreground))]">
              {project.description} · {project.date}
            </DialogDescription>
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
            <div className="mt-4 flex flex-wrap gap-4">
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  <Globe className="h-4 w-4" />
                  Live Demo
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--accent))] hover:underline"
                >
                  <Github className="h-4 w-4" />
                  {project.githubLinkBackend ? "GitHub (Frontend)" : "GitHub"}
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
              {project.githubLinkBackend && (
                <a
                  href={project.githubLinkBackend}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--accent))] hover:underline"
                >
                  <Github className="h-4 w-4" />
                  GitHub (Backend)
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>

          {/* Screenshot gallery */}
          <div className="px-5 sm:px-6 pb-5 sm:pb-6">
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

      {lightboxOpen && (
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

export default function Projects() {
  return (
    <section id="projects" className="section-padding page-surface-alt border-y border-[hsl(var(--surface-border)/0.4)] scroll-mt-nav">
      <div className="section-container">
        <div className="grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-16 items-start mb-10">
          <SectionHeader
            label="Projects"
            title="Selected work"
            description="Tap a card for details, screenshots, and live demos."
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-fr">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={layoutClass[project.id]}
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
