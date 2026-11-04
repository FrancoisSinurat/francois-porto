"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/components/ThemeProvider";
import GooeyNav from "@/components/ui/GooeyNav";
import { handleSectionClick, scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const navItems = ["About", "Experience", "Activity", "Projects", "Contact"];

const gooeyItems = navItems.map((label) => ({ label }));

/** Keep scroll-spy from thrashing the gooey pill mid click-scroll. */
const SCROLL_LOCK_MS = 1100;
const BOTTOM_PIN_PX = 120;

export default function Navbar() {
  const { theme, mounted } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollLockUntil = useRef(0);

  const lockScrollSpy = () => {
    scrollLockUntil.current = performance.now() + SCROLL_LOCK_MS;
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const timer = window.setTimeout(() => {
      const idx = navItems.findIndex((item) => item.toLowerCase() === hash);
      if (idx >= 0) {
        lockScrollSpy();
        setActiveIndex(idx);
      }
      scrollToSection(hash);
    }, 150);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const ids = navItems.map((item) => item.toLowerCase());

    const updateActive = () => {
      if (performance.now() < scrollLockUntil.current) return;

      const doc = document.documentElement;
      const atBottom =
        window.innerHeight + window.scrollY >= doc.scrollHeight - BOTTOM_PIN_PX;

      // Short last section never crosses the spy line — pin Contact at page end.
      if (atBottom) {
        setActiveIndex((prev) => (prev === ids.length - 1 ? prev : ids.length - 1));
        return;
      }

      const header = document.querySelector("header");
      const offset = (header?.offsetHeight ?? 56) + 24;
      let current = 0;

      for (let i = 0; i < ids.length; i++) {
        const el = document.getElementById(ids[i]);
        if (!el) continue;
        if (el.getBoundingClientRect().top - offset <= 0) current = i;
      }

      setActiveIndex((prev) => (prev === current ? prev : current));
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  const onHero = !scrolled;
  const gooeyTheme = onHero || (mounted && theme === "dark") ? "dark" : "light";

  const onNavChange = (index: number) => {
    lockScrollSpy();
    setActiveIndex(index);
    scrollToSection(navItems[index].toLowerCase());
    setIsOpen(false);
  };

  const navLink = (item: string, className: string) => {
    const id = item.toLowerCase();
    return (
      <a
        href={`#${id}`}
        onClick={(e) =>
          handleSectionClick(e, id, () => {
            setIsOpen(false);
            const idx = navItems.indexOf(item);
            if (idx >= 0) {
              lockScrollSpy();
              setActiveIndex(idx);
            }
          })
        }
        className={className}
      >
        {item}
      </a>
    );
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <nav
        className={cn(
          "transition-colors duration-200 border-b",
          onHero
            ? "bg-[hsl(var(--hero-bg))] border-[hsl(222_20%_18%)]"
            : "bg-[hsl(var(--page-bg))] border-[hsl(var(--surface-border)/0.6)]"
        )}
      >
        <div className="section-container flex items-center justify-between h-14 gap-3">
          <Link
            href="/"
            className={cn(
              "text-base font-bold tracking-tight shrink-0",
              onHero ? "text-[hsl(var(--hero-fg))]" : "text-[hsl(var(--foreground))]"
            )}
          >
            Francois<span className="text-[hsl(var(--accent))]">.</span>
          </Link>

          <div className="hidden md:flex flex-1 justify-center min-w-0">
            <GooeyNav
              items={gooeyItems}
              activeIndex={activeIndex}
              onChange={onNavChange}
              theme={gooeyTheme}
              size="sm"
              frame
              particleCount={11}
              spread={40}
              animationTime={820}
              timeVariance={140}
              gooeyness={0.82}
              wobble={0.28}
              hoverEffect
            />
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <ThemeToggle onHero={onHero} />
            <a
              href="#contact"
              onClick={(e) =>
                handleSectionClick(e, "contact", () => {
                  lockScrollSpy();
                  setActiveIndex(navItems.indexOf("Contact"));
                })
              }
              className="hidden md:inline-flex text-sm font-semibold px-4 py-2 rounded-lg transition-colors ml-1 bg-[hsl(var(--accent))] text-white hover:bg-[hsl(var(--accent-hover))]"
            >
              Get in touch
            </a>
            <button
              type="button"
              className={cn(
                "md:hidden p-2 rounded-lg",
                onHero ? "text-[hsl(var(--hero-fg))]" : "text-[hsl(var(--foreground))]"
              )}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-[hsl(var(--surface-border)/0.5)] bg-[hsl(var(--surface))]"
            >
              <ul className="section-container py-3 space-y-0.5">
                {navItems.map((item) => (
                  <li key={item}>
                    {navLink(
                      item,
                      "block py-2.5 text-[hsl(var(--muted-foreground))] font-medium hover:text-[hsl(var(--accent))]"
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
