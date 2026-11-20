"use client";

import type { CSSProperties } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Briefcase01Icon,
  Home01Icon,
  Mail01Icon,
  AnalyticsUpIcon,
  UserIcon,
  Folder01Icon,
} from "@hugeicons/core-free-icons";
import Dock from "@/components/ui/Dock";
import { useTheme } from "@/components/ThemeProvider";

export type MobilePageId =
  | "home"
  | "about"
  | "experience"
  | "activity"
  | "projects"
  | "contact";

/** Space reserved so scroll content clears the floating icons. */
export const DOCK_HEIGHT_PX = 88;

const PAGES: { id: MobilePageId; label: string; icon: typeof Home01Icon }[] = [
  { id: "home", label: "Home", icon: Home01Icon },
  { id: "about", label: "About", icon: UserIcon },
  { id: "experience", label: "Experience", icon: Briefcase01Icon },
  { id: "activity", label: "Activity", icon: AnalyticsUpIcon },
  { id: "projects", label: "Projects", icon: Folder01Icon },
  { id: "contact", label: "Contact", icon: Mail01Icon },
];

export const PAGE_ORDER = PAGES.map((page) => page.id);

type MobileDockProps = {
  active: MobilePageId;
  onChange: (id: MobilePageId) => void;
};

/** Outer pill + dock strip transparent — only icon tiles stay visible. */
const CLEAR_PANEL = {
  "--dock-panel": "transparent",
  "--dock-panel-edge": "transparent",
  "--dock-panel-highlight": "transparent",
  "--dock-panel-shadow": "none",
} as CSSProperties;

export default function MobileDock({ active, onChange }: MobileDockProps) {
  const { theme, mounted } = useTheme();
  const onHero = active === "home";
  const dockTheme = onHero || !mounted || theme === "dark" ? "dark" : "light";

  const glyph = (icon: typeof Home01Icon) => (
    <HugeiconsIcon icon={icon} size="1em" strokeWidth={1.8} />
  );

  const items = PAGES.map((page) => ({
    icon: glyph(page.icon),
    label: page.label,
    active: active === page.id,
    onClick: () => onChange(page.id),
  }));

  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 z-50 bg-transparent"
      style={{ height: DOCK_HEIGHT_PX }}
    >
      <div className="pointer-events-auto absolute inset-0 bg-transparent">
        <Dock
          items={items}
          position="bottom"
          theme={dockTheme}
          baseItemSize={44}
          magnification={58}
          distance={140}
          panelHeight={62}
          gap={8}
          roundness={0.55}
          bounce
          tiles
          showLabels
          showIndicators
          accentColor="#2dd4bf"
          className="dock--clear-panel"
          style={CLEAR_PANEL}
        />
      </div>
    </div>
  );
}

export { PAGES };
