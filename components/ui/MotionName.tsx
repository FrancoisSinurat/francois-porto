"use client";

import { motion } from "framer-motion";

const FIRST = "Francois Novalentino";
const LAST = "Sinurat";
const EASE = [0.22, 1, 0.36, 1] as const;

function AnimatedWord({
  word,
  startIndex,
}: {
  word: string;
  startIndex: number;
}) {
  return (
    <span className="inline-flex">
      {word.split("").map((char, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em]"
        >
          {/* Outer: entrance only. Inner: cheap CSS hover (no Framer spring). */}
          <span
            className="hero-letter-enter inline-block"
            style={{ ["--i" as string]: startIndex + i }}
          >
            <span className="hero-letter-hover inline-block cursor-default">
              {char}
            </span>
          </span>
        </span>
      ))}
    </span>
  );
}

export default function MotionName() {
  const words = FIRST.split(" ");
  let letterIndex = 0;

  return (
    <h1
      className="text-[clamp(2rem,5.5vw,3.75rem)] font-extrabold leading-[1.08] tracking-tight"
      aria-label={`${FIRST} ${LAST}`}
    >
      <span className="block text-[hsl(var(--hero-fg))]">
        {words.map((word, wi) => {
          const start = letterIndex;
          letterIndex += word.length;
          return (
            <span key={word}>
              <AnimatedWord word={word} startIndex={start} />
              {wi < words.length - 1 ? "\u00A0" : null}
            </span>
          );
        })}
      </span>

      <span className="block mt-1 overflow-hidden">
        <motion.span
          className="block text-gradient-motion"
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{
            duration: 0.65,
            delay: 0.1 + letterIndex * 0.028,
            ease: EASE,
          }}
        >
          {LAST}
        </motion.span>
      </span>
    </h1>
  );
}
