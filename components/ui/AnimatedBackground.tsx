"use client";

export default function AnimatedBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Subtle architectural grid with radial fade */}
      <div
        className="absolute inset-0 bg-grid-pattern opacity-70 dark:opacity-50"
        style={{
          maskImage:
            "radial-gradient(ellipse 90% 80% at 50% 40%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 80% at 50% 40%, black 30%, transparent 100%)",
        }}
      />

      {/* Ambient Floating Gradient Orbs */}
      <div
        className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full blur-[110px] animate-float-slow opacity-30 dark:opacity-20"
        style={{
          background:
            "radial-gradient(circle, hsl(239 84% 67% / 0.55) 0%, transparent 70%)",
        }}
      />

      <div
        className="absolute top-[35%] -right-40 w-[520px] h-[520px] rounded-full blur-[120px] animate-float-reverse opacity-25 dark:opacity-15"
        style={{
          background:
            "radial-gradient(circle, hsl(190 85% 55% / 0.5) 0%, transparent 70%)",
        }}
      />

      <div
        className="absolute -bottom-40 left-[20%] w-[560px] h-[560px] rounded-full blur-[130px] animate-pulse-glow opacity-25 dark:opacity-15"
        style={{
          background:
            "radial-gradient(circle, hsl(265 80% 65% / 0.45) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
