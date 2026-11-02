"use client";

import {
  useEffect,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type Intensity = "soft" | "medium" | "strong";

const PRESETS: Record<
  Intensity,
  { maxTilt: number; maxShift: number; speedBoost: number; lerp: number }
> = {
  soft: { maxTilt: 3.5, maxShift: 3, speedBoost: 0.35, lerp: 0.12 },
  medium: { maxTilt: 7.5, maxShift: 6, speedBoost: 0.55, lerp: 0.14 },
  strong: { maxTilt: 11, maxShift: 9, speedBoost: 0.8, lerp: 0.16 },
};

type WobbleProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  intensity?: Intensity;
  disabled?: boolean;
};

/**
 * Subtle 3D tilt + shift that follows the cursor.
 * Faster cursor → stronger wobble. Disabled on touch / reduced-motion.
 */
export default function Wobble({
  children,
  className,
  intensity = "medium",
  disabled = false,
  ...rest
}: WobbleProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || disabled) return;

    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    const preset = PRESETS[intensity];
    let raf = 0;
    let active = false;
    let lastX = 0;
    let lastY = 0;
    let lastT = 0;
    let speed = 0;
    let tx = 0;
    let ty = 0;
    let rx = 0;
    let ry = 0;
    let targetTx = 0;
    let targetTy = 0;
    let targetRx = 0;
    let targetRy = 0;

    const tick = () => {
      tx += (targetTx - tx) * preset.lerp;
      ty += (targetTy - ty) * preset.lerp;
      rx += (targetRx - rx) * preset.lerp;
      ry += (targetRy - ry) * preset.lerp;

      el.style.transform = `perspective(900px) translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;

      const settling =
        Math.abs(targetTx - tx) +
          Math.abs(targetTy - ty) +
          Math.abs(targetRx - rx) +
          Math.abs(targetRy - ry) >
        0.04;

      if (active || settling) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
        el.style.transform = "";
      }
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return;

      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      const now = performance.now();
      const dt = Math.max(now - (lastT || now), 1);
      const vx = (e.clientX - lastX) / dt;
      const vy = (e.clientY - lastY) / dt;
      speed = Math.min(Math.hypot(vx, vy) / 1.7, 1);
      lastX = e.clientX;
      lastY = e.clientY;
      lastT = now;
      active = true;

      const boost = 1 + speed * preset.speedBoost;
      targetRx = -ny * preset.maxTilt * boost;
      targetRy = nx * preset.maxTilt * boost;
      targetTx = nx * preset.maxShift * boost;
      targetTy = ny * preset.maxShift * boost;
      kick();
    };

    const onLeave = () => {
      active = false;
      speed = 0;
      targetTx = 0;
      targetTy = 0;
      targetRx = 0;
      targetRy = 0;
      kick();
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.style.transform = "";
    };
  }, [intensity, disabled]);

  return (
    <div
      ref={ref}
      className={cn(
        "will-change-transform [transform-style:preserve-3d]",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
