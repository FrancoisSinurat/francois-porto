"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type LanyardBadgeProps = {
  src: string;
  alt: string;
  name?: string;
  roleValue?: string;
  company?: string;
  className?: string;
};

const MAX_PULL = 150;
const SPRING = 210;
const DAMPING = 16;
/** Resting top of the buckle, in stage pixels. Straps meet here. */
const JOIN_Y = 128;

const NAVY = "#0C2340";
const NAVY_DEEP = "#071525";
const NAVY_RIB = "#16365A";

/**
 * Neck lanyard in a real V: fixed collar, two straps, buckle, ID.
 * Drag moves the badge only (translate). Release springs back.
 */
export default function LanyardBadge({
  src,
  alt,
  name = "Francois N. Sinurat",
  roleValue = "Back End Developer",
  company = "Pegadaian",
  className,
}: LanyardBadgeProps) {
  const uid = useId().replace(/:/g, "");
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<SVGPathElement>(null);
  const rightRef = useRef<SVGPathElement>(null);
  const leftEdgeRef = useRef<SVGPathElement>(null);
  const rightEdgeRef = useRef<SVGPathElement>(null);
  const [interactive, setInteractive] = useState(false);
  const [draggingUi, setDraggingUi] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setInteractive(fine.matches && !reduce.matches);
    sync();
    fine.addEventListener("change", sync);
    reduce.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    const card = cardRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    const leftEdge = leftEdgeRef.current;
    const rightEdge = rightEdgeRef.current;
    if (!stage || !card || !left || !right) return;

    let x = 0;
    let y = 0;
    let vx = 0;
    let vy = 0;
    let dragging = false;
    let offX = 0;
    let offY = 0;
    let prevX = 0;
    let prevY = 0;
    let prevT = 0;
    let raf = 0;
    let last = performance.now();
    let t = 0;

    const limit = (px: number, py: number) => {
      const cy = Math.max(py, -28);
      const d = Math.hypot(px, cy);
      if (d <= MAX_PULL || d === 0) return { x: px, y: cy };
      const s = MAX_PULL / d;
      return { x: px * s, y: cy * s };
    };

    const setStrap = (node: SVGPathElement | null, d: string) => {
      node?.setAttribute("d", d);
    };

    const paint = () => {
      const w = stage.clientWidth;
      const leftX = 20;
      const rightX = w - 20;
      const neckY = 18;
      const joinX = w / 2 + x;
      const joinY = JOIN_Y + y + 6;
      const sag = 10;

      const leftD = `M ${leftX} ${neckY} Q ${(leftX + joinX) / 2} ${(neckY + joinY) / 2 + sag} ${joinX} ${joinY}`;
      const rightD = `M ${rightX} ${neckY} Q ${(rightX + joinX) / 2} ${(neckY + joinY) / 2 + sag} ${joinX} ${joinY}`;

      setStrap(leftEdge, leftD);
      setStrap(rightEdge, rightD);
      setStrap(left, leftD);
      setStrap(right, rightD);

      card.style.transform = `translate3d(calc(-50% + ${x}px), ${y}px, 0)`;
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.033);
      last = now;
      t += dt;

      if (!dragging && interactive) {
        const idleX = Math.sin(t * 1.1) * 2.4;
        const idleY = Math.cos(t * 0.85) * 1.2;
        vx += (-SPRING * (x - idleX) - DAMPING * vx) * dt;
        vy += (-SPRING * (y - idleY) - DAMPING * vy) * dt;
        x += vx * dt;
        y += vy * dt;
      } else if (!dragging) {
        x *= 0.9;
        y *= 0.9;
        vx = 0;
        vy = 0;
      }

      paint();
      raf = requestAnimationFrame(tick);
    };

    const onDown = (e: PointerEvent) => {
      if (!interactive) return;
      e.preventDefault();
      dragging = true;
      setDraggingUi(true);
      card.setPointerCapture(e.pointerId);
      const sr = stage.getBoundingClientRect();
      offX = e.clientX - (sr.left + stage.clientWidth / 2 + x);
      offY = e.clientY - (sr.top + JOIN_Y + y);
      vx = 0;
      vy = 0;
      prevX = x;
      prevY = y;
      prevT = performance.now();
    };

    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const sr = stage.getBoundingClientRect();
      const next = limit(
        e.clientX - sr.left - offX - stage.clientWidth / 2,
        e.clientY - sr.top - offY - JOIN_Y
      );
      x = next.x;
      y = next.y;
      const now = performance.now();
      const dtp = Math.max((now - prevT) / 1000, 0.001);
      vx = (x - prevX) / dtp;
      vy = (y - prevY) / dtp;
      prevX = x;
      prevY = y;
      prevT = now;
    };

    const onUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      setDraggingUi(false);
      try {
        card.releasePointerCapture(e.pointerId);
      } catch {
        /* already released */
      }
      const spd = Math.hypot(vx, vy);
      if (spd > 2400) {
        const s = 2400 / spd;
        vx *= s;
        vy *= s;
      }
    };

    paint();
    raf = requestAnimationFrame(tick);

    if (interactive) {
      card.addEventListener("pointerdown", onDown);
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
    }

    return () => {
      cancelAnimationFrame(raf);
      card.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [interactive]);

  return (
    <div className={cn("relative w-full max-w-[19rem] select-none", className)}>
      <div ref={stageRef} className="relative mx-auto h-[25.5rem] w-full">
        <svg
          className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible"
          aria-hidden
        >
          <defs>
            <pattern
              id={`rib-${uid}`}
              width="7"
              height="7"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(32)"
            >
              <rect width="7" height="7" fill={NAVY} />
              <rect width="2.2" height="7" fill={NAVY_RIB} />
            </pattern>
          </defs>
          <path
            ref={leftEdgeRef}
            d="M 20 18 Q 80 80 150 134"
            fill="none"
            stroke={NAVY_DEEP}
            strokeWidth="22"
            strokeLinecap="butt"
          />
          <path
            ref={rightEdgeRef}
            d="M 280 18 Q 220 80 150 134"
            fill="none"
            stroke={NAVY_DEEP}
            strokeWidth="22"
            strokeLinecap="butt"
          />
          <path
            ref={leftRef}
            d="M 20 18 Q 80 80 150 134"
            fill="none"
            stroke={`url(#rib-${uid})`}
            strokeWidth="16"
            strokeLinecap="butt"
          />
          <path
            ref={rightRef}
            d="M 280 18 Q 220 80 150 134"
            fill="none"
            stroke={`url(#rib-${uid})`}
            strokeWidth="16"
            strokeLinecap="butt"
          />
        </svg>

        {/* Fixed collar — the top of the V */}
        <div
          className="pointer-events-none absolute left-2.5 right-2.5 top-0 z-10 flex h-7 items-center justify-center rounded-[3px]"
          style={{
            background: `linear-gradient(180deg, #14365C 0%, ${NAVY} 55%, ${NAVY_DEEP} 100%)`,
            boxShadow: "0 8px 16px -10px rgba(0,0,0,0.7)",
          }}
        >
          <span className="text-[9px] font-semibold uppercase tracking-[0.32em] text-white/80">
            {company}
          </span>
        </div>

        <div
          ref={cardRef}
          className={cn(
            "absolute left-1/2 z-20 w-[10.75rem] touch-none will-change-transform",
            interactive && "cursor-grab active:cursor-grabbing",
            draggingUi && "cursor-grabbing"
          )}
          style={{ top: JOIN_Y, transform: "translate3d(-50%, 0, 0)" }}
        >
          {/* Side-release buckle */}
          <div className="relative z-20 mx-auto flex w-11 flex-col items-center" aria-hidden>
            <div className="h-1.5 w-5 rounded-t-[2px]" style={{ background: NAVY_DEEP }} />
            <div
              className="relative flex h-[22px] w-11 items-center justify-center rounded-[3px]"
              style={{
                background: "linear-gradient(180deg, #3a3f44 0%, #1a1d20 60%, #0e1012 100%)",
                boxShadow: "0 2px 4px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.14)",
              }}
            >
              <span className="absolute -left-[3px] top-1/2 h-3 w-[5px] -translate-y-1/2 rounded-l-[2px] bg-[#121416]" />
              <span className="absolute -right-[3px] top-1/2 h-3 w-[5px] -translate-y-1/2 rounded-r-[2px] bg-[#121416]" />
              <span className="h-[3px] w-3.5 rounded-full bg-[#4a5158]" />
            </div>
            <div
              className="h-3 w-4"
              style={{
                background: `linear-gradient(90deg, ${NAVY_DEEP}, ${NAVY_RIB} 50%, ${NAVY_DEEP})`,
              }}
            />
          </div>

          {/* ID holder */}
          <div
            className="-mt-px overflow-hidden rounded-[5px] p-[5px]"
            style={{
              background:
                "linear-gradient(165deg, rgba(214,226,236,0.55), rgba(150,170,188,0.28) 55%, rgba(190,205,216,0.4))",
              boxShadow:
                "0 18px 32px -16px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.55)",
              border: "1px solid rgba(255,255,255,0.35)",
            }}
          >
            <div
              className="mx-auto mb-1.5 h-[3px] w-7 rounded-full"
              style={{ background: "linear-gradient(180deg, #d5dde6, #9aa8b6)" }}
              aria-hidden
            />
            <article className="overflow-hidden rounded-[3px] bg-white text-[#122033]">
              <div className="relative h-[8.25rem] bg-[#d7dee6]">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  priority
                  sizes="180px"
                  className="object-cover object-[center_12%]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#071525] via-[#071525]/75 to-transparent px-2.5 pb-2 pt-8">
                  <p className="text-[12px] font-semibold leading-tight tracking-tight text-white">
                    {name}
                  </p>
                  <p className="mt-0.5 text-[10px] text-white/75">{roleValue}</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 px-2.5 py-2">
                <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#5c6b7c]">
                  {company}
                </p>
                <p className="font-mono text-[10px] tracking-wide text-[#1c3348]">915</p>
              </div>
            </article>
          </div>
        </div>
      </div>

      {interactive && (
        <p
          className={cn(
            "mt-1 text-center text-[10px] tracking-wide text-[hsl(var(--hero-muted))] transition-opacity",
            draggingUi ? "opacity-25" : "opacity-40"
          )}
        >
          {draggingUi ? "release" : "drag"}
        </p>
      )}
    </div>
  );
}
