"use client";

import { useEffect, useState } from "react";
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
          key={`${word}-${char}-${i}`}
          className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em]"
        >
          <motion.span
            className="inline-block will-change-transform cursor-default"
            custom={startIndex + i}
            variants={{
              hidden: { y: "115%", rotateX: 40, opacity: 0 },
              visible: (idx: number) => ({
                y: "0%",
                rotateX: 0,
                opacity: 1,
                transition: {
                  duration: 0.62,
                  delay: 0.1 + idx * 0.03,
                  ease: EASE,
                },
              }),
            }}
            whileHover={{
              y: -7,
              color: "hsl(166 70% 72%)",
              transition: { type: "spring", stiffness: 520, damping: 18 },
            }}
          >
            {char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function MotionName() {
  const [play, setPlay] = useState(false);
  const words = FIRST.split(" ");

  useEffect(() => {
    setPlay(true);
  }, []);

  let letterIndex = 0;

  return (
    <h1
      className="text-[clamp(2rem,5.5vw,3.75rem)] font-extrabold leading-[1.08] tracking-tight [perspective:800px]"
      aria-label={`${FIRST} ${LAST}`}
    >
      <motion.span
        className="block text-[hsl(var(--hero-fg))]"
        initial="hidden"
        animate={play ? "visible" : "hidden"}
      >
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
      </motion.span>

      <span className="block mt-1 overflow-hidden">
        <motion.span
          className="block text-gradient-motion"
          initial={{ y: "110%", opacity: 0 }}
          animate={play ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
          transition={{
            duration: 0.72,
            delay: 0.12 + letterIndex * 0.03,
            ease: EASE,
          }}
        >
          {LAST}
        </motion.span>
      </span>
    </h1>
  );
}
