import type { MouseEvent } from "react";

const NAV_GAP = 12;

/** Scroll ke section dengan offset navbar fixed */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const header = document.querySelector("header");
  const navHeight = header?.offsetHeight ?? 56;
  const top = el.getBoundingClientRect().top + window.scrollY - navHeight - NAV_GAP;

  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });

  // Update URL hash tanpa jump
  window.history.replaceState(null, "", `#${id}`);
}

export function handleSectionClick(
  e: MouseEvent<HTMLAnchorElement>,
  id: string,
  onAfter?: () => void
) {
  e.preventDefault();
  scrollToSection(id);
  onAfter?.();
}
