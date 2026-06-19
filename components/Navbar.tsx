"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import { handleSectionClick, scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const navItems = ["About", "Experience", "Projects", "Contact"];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const timer = window.setTimeout(() => scrollToSection(hash), 150);
    return () => window.clearTimeout(timer);
  }, []);

  const onHero = !scrolled;

  const navLink = (item: string, className: string) => {
    const id = item.toLowerCase();
    return (
      <a
        href={`#${id}`}
        onClick={(e) => handleSectionClick(e, id, () => setIsOpen(false))}
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
        <div className="section-container flex items-center justify-between h-14">
          <Link
            href="/"
            className={cn(
              "text-base font-bold tracking-tight",
              onHero ? "text-[hsl(var(--hero-fg))]" : "text-[hsl(var(--foreground))]"
            )}
          >
            Francois<span className="text-[hsl(var(--accent))]">.</span>
          </Link>

          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item}>
                {navLink(
                  item,
                  cn(
                    "px-3.5 py-1.5 text-sm font-medium rounded-lg transition-colors",
                    onHero
                      ? "text-[hsl(var(--hero-muted))] hover:text-[hsl(var(--hero-fg))] hover:bg-[hsl(222_20%_16%)]"
                      : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--surface))]"
                  )
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <ThemeToggle onHero={onHero} />
            <a
              href="#contact"
              onClick={(e) => handleSectionClick(e, "contact")}
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
