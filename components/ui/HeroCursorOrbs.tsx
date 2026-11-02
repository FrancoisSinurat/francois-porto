"use client";

import { useEffect, useRef } from "react";

type OrbMode = "parallax" | "follow";

type OrbConfig = {
  size: number;
  blur: number;
  color: string;
  mode: OrbMode;
  lag: number;
  speedGain: number;
  trail: number;
  restX: number;
  restY: number;
  orbit: number;
  phase: number;
  glow?: boolean;
};

const ORBS: OrbConfig[] = [
  {
    size: 460,
    blur: 110,
    color: "hsl(173 58% 42% / 0.32)",
    mode: "parallax",
    lag: 0.045,
    speedGain: 0.08,
    trail: 14,
    restX: 0.16,
    restY: 0.1,
    orbit: 0,
    phase: 0.2,
  },
  {
    size: 420,
    blur: 110,
    color: "hsl(190 75% 50% / 0.26)",
    mode: "parallax",
    lag: 0.035,
    speedGain: 0.07,
    trail: 18,
    restX: 0.84,
    restY: 0.82,
    orbit: 0,
    phase: 1.4,
  },
  {
    size: 180,
    blur: 46,
    color: "hsl(173 70% 48% / 0.38)",
    mode: "follow",
    lag: 0.055,
    speedGain: 0.14,
    trail: 16,
    restX: 0.22,
    restY: 0.78,
    orbit: 72,
    phase: 0.6,
  },
  {
    size: 78,
    blur: 10,
    color: "hsl(188 82% 58% / 0.5)",
    mode: "follow",
    lag: 0.11,
    speedGain: 0.2,
    trail: 9,
    restX: 0.8,
    restY: 0.22,
    orbit: 96,
    phase: 2.1,
  },
  {
    size: 14,
    blur: 0,
    color: "hsl(166 80% 68% / 0.95)",
    mode: "follow",
    lag: 0.28,
    speedGain: 0.22,
    trail: 3,
    restX: 0.72,
    restY: 0.38,
    orbit: 18,
    phase: 3.4,
    glow: true,
  },
];

const SPEED_REF = 1.85;

export default function HeroCursorOrbs() {
  const rootRef = useRef<HTMLDivElement>(null);
  const orbRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) {
      orbRefs.current.forEach((el) => {
        if (el) el.style.opacity = "1";
      });
      return;
    }

    const positions = ORBS.map(() => ({ x: 0, y: 0, ready: false }));
    let width = 1;
    let height = 1;
    let mouseX = 0;
    let mouseY = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let velX = 0;
    let velY = 0;
    let inside = false;
    let pull = 0;
    let raf = 0;
    let lastTime = performance.now();
    let elapsed = 0;

    const measure = () => {
      const rect = root.getBoundingClientRect();
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
    };

    const restOf = (orb: OrbConfig) => ({
      x: orb.restX * width,
      y: orb.restY * height,
    });

    const onPointerMove = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const onPointerLeaveWindow = () => {
      inside = false;
    };

    const tick = (now: number) => {
      const dt = Math.min(now - lastTime, 32);
      lastTime = now;
      elapsed += dt;

      const invDt = dt > 0 ? 1 / dt : 0;
      velX = velX * 0.72 + (mouseX - lastMouseX) * invDt * 0.28;
      velY = velY * 0.72 + (mouseY - lastMouseY) * invDt * 0.28;
      lastMouseX = mouseX;
      lastMouseY = mouseY;

      const speed = Math.hypot(velX, velY);
      const speedNorm = Math.min(speed / SPEED_REF, 1);
      pull += ((inside ? 1 : 0) - pull) * (inside ? 0.14 : 0.06);

      ORBS.forEach((orb, i) => {
        const el = orbRefs.current[i];
        if (!el) return;

        const rest = restOf(orb);
        const t = elapsed * 0.001;
        const floatX = Math.cos(t * 0.55 + orb.phase) * 16;
        const floatY = Math.sin(t * 0.7 + orb.phase) * 14;
        const orbitBoost = 1 + speedNorm * 0.7;
        const orbitAngle = t * (0.5 + i * 0.11) + orb.phase;
        const orbitX = Math.cos(orbitAngle) * orb.orbit * orbitBoost;
        const orbitY = Math.sin(orbitAngle) * orb.orbit * orbitBoost;

        let targetX: number;
        let targetY: number;

        if (orb.mode === "follow") {
          const followX = mouseX - velX * orb.trail + orbitX;
          const followY = mouseY - velY * orb.trail + orbitY;
          targetX = rest.x + floatX + (followX - rest.x) * pull;
          targetY = rest.y + floatY + (followY - rest.y) * pull;
        } else {
          const parallax = (0.16 + speedNorm * 0.22) * pull;
          targetX =
            rest.x + floatX + (mouseX - rest.x) * parallax - velX * orb.trail * pull;
          targetY =
            rest.y + floatY + (mouseY - rest.y) * parallax - velY * orb.trail * pull;
        }

        const lerp = Math.min(
          1,
          (orb.lag + speedNorm * orb.speedGain) * (dt / 16.67)
        );

        const pos = positions[i];
        if (!pos.ready) {
          pos.x = rest.x;
          pos.y = rest.y;
          pos.ready = true;
          el.style.left = "0px";
          el.style.top = "0px";
          el.style.margin = "0";
          if (orb.mode === "parallax") el.style.opacity = "1";
        }

        pos.x += (targetX - pos.x) * lerp;
        pos.y += (targetY - pos.y) * lerp;

        const stretch = 1 + speedNorm * (orb.mode === "follow" ? 0.32 : 0.08);
        const angle = speed > 0.02 ? Math.atan2(velY, velX) : 0;

        el.style.transform = `translate3d(${pos.x - orb.size / 2}px, ${pos.y - orb.size / 2}px, 0) rotate(${angle}rad) scale(${stretch}, ${2 - stretch})`;

        if (orb.mode === "follow") {
          el.style.opacity = String(0.4 + pull * (0.45 + speedNorm * 0.15));
        }
      });

      raf = requestAnimationFrame(tick);
    };

    measure();
    mouseX = width * 0.5;
    mouseY = height * 0.4;
    lastMouseX = mouseX;
    lastMouseY = mouseY;

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeaveWindow);
    window.addEventListener("resize", measure);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeaveWindow);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {ORBS.map((orb, i) => (
        <div
          key={i}
          ref={(node) => {
            orbRefs.current[i] = node;
          }}
          className="absolute top-0 left-0 rounded-full will-change-transform"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.restX * 100}%`,
            top: `${orb.restY * 100}%`,
            marginLeft: -orb.size / 2,
            marginTop: -orb.size / 2,
            background: orb.glow
              ? orb.color
              : `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: orb.blur ? `blur(${orb.blur}px)` : undefined,
            boxShadow: orb.glow
              ? "0 0 18px 6px hsl(166 80% 60% / 0.45), 0 0 40px 12px hsl(173 70% 50% / 0.25)"
              : undefined,
            mixBlendMode: orb.mode === "follow" ? "screen" : "normal",
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}
