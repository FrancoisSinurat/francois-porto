import type { MouseEvent } from "react";

const NAV_GAP = 12;

/** Fired after hash navigation so mobile page-mode can switch panels. */
export const SECTION_NAV_EVENT = "porto:section-nav";

/** Scroll ke section dengan offset navbar fixed */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const header = document.querySelector("header");
    const navHeight = header?.offsetHeight ?? 56;
    const top = el.getBoundingClientRect().top + window.scrollY - navHeight - NAV_GAP;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }

  // Update URL hash tanpa jump
  window.history.replaceState(null, "", `#${id}`);
  window.dispatchEvent(new CustomEvent(SECTION_NAV_EVENT, { detail: { id } }));
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
