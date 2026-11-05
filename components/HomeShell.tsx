"use client";

import { useEffect, useState } from "react";
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
import MobileDock, { type MobilePageId } from "@/components/MobileDock";
import { SECTION_NAV_EVENT } from "@/lib/scroll";

const PAGE_FROM_HASH: Record<string, MobilePageId> = {
  about: "about",
  experience: "experience",
  activity: "activity",
  projects: "projects",
  contact: "contact",
};

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
      return <Hero />;
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
      return <Hero />;
  }
}

function MobileHome() {
  const [page, setPage] = useState<MobilePageId>("home");

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace("#", "").toLowerCase();
      if (hash && PAGE_FROM_HASH[hash]) setPage(PAGE_FROM_HASH[hash]);
    };
    const onSectionNav = (event: Event) => {
      const id = (event as CustomEvent<{ id?: string }>).detail?.id?.toLowerCase();
      if (id && PAGE_FROM_HASH[id]) setPage(PAGE_FROM_HASH[id]);
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

  const go = (id: MobilePageId) => {
    setPage(id);
    const next = id === "home" ? window.location.pathname : `#${id}`;
    window.history.replaceState(null, "", next);
  };

  return (
    <div className="relative h-dvh overflow-hidden">
      <AnimatedBackground />
      <div className="absolute right-3 top-3 z-50">
        <ThemeToggle onHero={page === "home"} />
      </div>
      <div className="relative z-10 h-full overflow-y-auto overscroll-contain pb-[92px]">
        <MobilePage active={page} />
      </div>
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
