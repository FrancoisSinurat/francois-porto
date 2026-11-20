"use client";

import { useEffect, useRef, useState, type TouchEvent } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Hero from "@/components/Hero";
import WorkExp from "@/components/Experience";
import DevActivity from "@/components/DevActivity";
import Contact from "@/components/Contact";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import ThemeToggle from "@/components/ThemeToggle";
import MobileDock, {
  DOCK_HEIGHT_PX,
  PAGE_ORDER,
  type MobilePageId,
} from "@/components/MobileDock";
import { SECTION_NAV_EVENT } from "@/lib/scroll";

const PAGE_FROM_HASH: Record<string, MobilePageId> = {
  about: "about",
  experience: "experience",
  activity: "activity",
  projects: "projects",
  contact: "contact",
};

const SWIPE_MIN_DX = 56;
const SWIPE_MAX_RATIO = 1.15;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isMobile;
}

function DesktopHome() {
  return (
    <div className="relative min-h-full flex flex-col overflow-x-clip">
      <AnimatedBackground />
      <Navbar />
      <main className="relative z-10 flex-1">
        <Hero />
        <section
          id="about"
          className="relative scroll-mt-nav border-t border-[hsl(var(--surface-border)/0.35)]"
        >
          <About />
        </section>
        <section
          id="experience"
          className="relative scroll-mt-nav border-t border-[hsl(var(--surface-border)/0.35)]"
        >
          <WorkExp />
        </section>
        <section
          id="activity"
          className="relative scroll-mt-nav border-t border-[hsl(var(--surface-border)/0.35)]"
        >
          <DevActivity />
        </section>
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function MobilePage({ active }: { active: MobilePageId }) {
  switch (active) {
    case "home":
      return <Hero compact />;
    case "about":
      return (
        <section className="relative border-t border-[hsl(var(--surface-border)/0.35)]">
          <About />
        </section>
      );
    case "experience":
      return (
        <section className="relative border-t border-[hsl(var(--surface-border)/0.35)]">
          <WorkExp />
        </section>
      );
    case "activity":
      return (
        <section className="relative border-t border-[hsl(var(--surface-border)/0.35)]">
          <DevActivity />
        </section>
      );
    case "projects":
      return <Projects />;
    case "contact":
      return <Contact />;
    default:
      return <Hero compact />;
  }
}

function MobileHome() {
  const [page, setPage] = useState<MobilePageId>("home");
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace("#", "").toLowerCase();
      if (hash && PAGE_FROM_HASH[hash]) setPage(PAGE_FROM_HASH[hash]);
    };
    const onSectionNav = (event: Event) => {
      const id = (event as CustomEvent<{ id?: string }>).detail?.id?.toLowerCase();
      if (id && PAGE_FROM_HASH[id]) setPage(PAGE_FROM_HASH[id] as MobilePageId);
      if (id === "home") setPage("home");
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    window.addEventListener(SECTION_NAV_EVENT, onSectionNav);
    return () => {
      window.removeEventListener("hashchange", applyHash);
      window.removeEventListener(SECTION_NAV_EVENT, onSectionNav);
    };
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, []);

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0 });
  }, [page]);

  const go = (id: MobilePageId) => {
    setPage(id);
    const next = id === "home" ? window.location.pathname : `#${id}`;
    window.history.replaceState(null, "", next);
  };

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    if (!touch) return;
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const touch = event.changedTouches[0];
    if (!touch) return;

    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) < SWIPE_MIN_DX) return;
    if (Math.abs(dx) < Math.abs(dy) * SWIPE_MAX_RATIO) return;

    const index = PAGE_ORDER.indexOf(page);
    if (index < 0) return;
    if (dx < 0 && index < PAGE_ORDER.length - 1) go(PAGE_ORDER[index + 1]);
    if (dx > 0 && index > 0) go(PAGE_ORDER[index - 1]);
  };

  const lockHero = page === "home";

  return (
    <div
      className={
        lockHero
          ? "relative h-dvh w-full min-w-0 overflow-hidden bg-[hsl(210_40%_8%)]"
          : "relative h-dvh w-full min-w-0 overflow-hidden bg-[hsl(var(--page-bg))]"
      }
    >
      {/* Mesh only on hero — content pages stay clean so cards don't clash. */}
      {lockHero ? <AnimatedBackground /> : null}
      <div className="absolute right-3 top-3 z-50">
        <ThemeToggle onHero={page === "home"} />
      </div>

      {/* Full-screen content; padding keeps scroll end above the floating icons. */}
      <div
        ref={contentRef}
        className={
          lockHero
            ? "absolute inset-0 z-10 overflow-hidden overscroll-none"
            : "absolute inset-0 z-10 overflow-y-auto overscroll-contain"
        }
        style={lockHero ? undefined : { paddingBottom: DOCK_HEIGHT_PX }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <MobilePage active={page} />
      </div>

      {/* Floating dock — outer strip + pill transparent, only tiles show. */}
      <MobileDock active={page} onChange={go} />
    </div>
  );
}

export default function HomeShell() {
  const isMobile = useIsMobile();

  if (isMobile === null) {
    return <div className="min-h-dvh bg-[hsl(var(--page-bg))]" aria-hidden />;
  }

  return isMobile ? <MobileHome /> : <DesktopHome />;
}
