"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Option C: soft mesh gradients + film grain + mouse spotlight.
 * Touch / reduced-motion devices get ambient mesh only (no cursor tracking).
 */
export default function AnimatedBackground() {
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    const mqFine = window.matchMedia("(pointer: fine)");
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      const enabled = mqFine.matches && !mqReduce.matches;
      setInteractive(enabled);
      if (!enabled) {
        document.documentElement.style.setProperty("--spot-x", "50%");
        document.documentElement.style.setProperty("--spot-y", "35%");
      }
    };

    sync();
    mqFine.addEventListener("change", sync);
    mqReduce.addEventListener("change", sync);
    return () => {
      mqFine.removeEventListener("change", sync);
      mqReduce.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!interactive) return;

    let raf = 0;
    let targetX = window.innerWidth * 0.5;
    let targetY = window.innerHeight * 0.35;
    let currentX = targetX;
    let currentY = targetY;
    let lastX = targetX;
    let lastY = targetY;
    let lastT = performance.now();
    let speed = 0;

    const apply = () => {
      // Faster cursor → snappier spotlight catch-up
      const lerp = 0.08 + Math.min(speed, 1) * 0.16;
      currentX += (targetX - currentX) * lerp;
      currentY += (targetY - currentY) * lerp;
      document.documentElement.style.setProperty("--spot-x", `${currentX}px`);
      document.documentElement.style.setProperty("--spot-y", `${currentY}px`);
      document.documentElement.style.setProperty(
        "--spot-size",
        `${440 + speed * 120}px`
      );
      raf = requestAnimationFrame(apply);
    };

    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      const dt = Math.max(now - lastT, 1);
      speed = Math.min(
        Math.hypot(e.clientX - lastX, e.clientY - lastY) / dt / 1.8,
        1
      );
      lastX = e.clientX;
      lastY = e.clientY;
      lastT = now;
      targetX = e.clientX;
      targetY = e.clientY;
    };

    raf = requestAnimationFrame(apply);
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [interactive]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Soft mesh base — brighter teal/cyan, less muddy gray */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 12% 18%, hsl(166 75% 55% / 0.28), transparent 55%),
            radial-gradient(ellipse 70% 55% at 88% 22%, hsl(188 85% 60% / 0.22), transparent 50%),
            radial-gradient(ellipse 75% 60% at 50% 92%, hsl(150 60% 52% / 0.18), transparent 55%),
            radial-gradient(ellipse 60% 45% at 70% 60%, hsl(175 70% 58% / 0.12), transparent 50%)
          `,
        }}
      />

      {/* Floating orbs */}
      <div
        className="absolute -top-28 -left-28 w-[min(520px,90vw)] h-[min(520px,90vw)] rounded-full blur-[100px] animate-float-slow opacity-50 dark:opacity-30"
        style={{
          background:
            "radial-gradient(circle, hsl(166 72% 45% / 0.55) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-[30%] -right-36 w-[min(560px,95vw)] h-[min(560px,95vw)] rounded-full blur-[110px] animate-float-reverse opacity-45 dark:opacity-25"
        style={{
          background:
            "radial-gradient(circle, hsl(188 85% 55% / 0.5) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-36 left-[15%] w-[min(600px,100vw)] h-[min(600px,100vw)] rounded-full blur-[120px] animate-pulse-glow opacity-40 dark:opacity-22"
        style={{
          background:
            "radial-gradient(circle, hsl(150 58% 50% / 0.42) 0%, transparent 70%)",
        }}
      />

      {/* Mouse / ambient spotlight */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          interactive ? "opacity-100" : "opacity-70"
        )}
        style={{
          background:
            "radial-gradient(circle var(--spot-size, 440px) at var(--spot-x, 50%) var(--spot-y, 35%), hsl(var(--accent-glow) / 0.28), transparent 65%)",
        }}
      />

      {/* Subtle grid — fades at edges so no hard cut */}
      <div
        className="absolute inset-0 bg-grid-pattern opacity-[0.28] dark:opacity-[0.22]"
        style={{
          maskImage:
            "radial-gradient(ellipse 95% 85% at 50% 40%, black 25%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 95% 85% at 50% 40%, black 25%, transparent 100%)",
        }}
      />

      {/* Light grain only — heavy grain made everything look ashy */}
      <div className="bg-noise absolute inset-0 opacity-[0.14] dark:opacity-[0.16] mix-blend-soft-light" />
    </div>
  );
}
