"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { BAND, STATS } from "@/data/band";
import { Reveal, SectionLabel, StaggerList, staggerChild } from "./motion-primitives";

/** One word of the manifesto, lit as the scroll head passes over it. */
function Word({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <span className="relative mr-[0.28em] inline-block">
      <motion.span style={{ opacity }}>{word}</motion.span>
    </span>
  );
}

export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.25"],
  });

  const words = BAND.manifesto.split(" ");

  return (
    <section id="band" className="edge-x relative scroll-mt-24 py-24 sm:py-36">
      <SectionLabel index="01">Who we are</SectionLabel>

      <div ref={ref} className="mt-12 max-w-5xl">
        <p className="text-[clamp(1.5rem,3.9vw,3rem)] leading-[1.22] font-medium tracking-tight text-bone">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = (i + 1) / words.length;
            return (
              <Word
                key={i}
                word={word}
                range={[start, end]}
                progress={scrollYProgress}
              />
            );
          })}
        </p>
      </div>

      <Reveal delay={0.1} className="mt-10">
        <p className="max-w-2xl text-base leading-relaxed text-dust sm:text-lg">
          Eight musicians out of Greater Noida, pulled together from Kenya, Bangladesh,
          Manipur, Assam, Bihar, Bengal and the hills of Uttarakhand. Choir singers and
          death-metal growlers in the same line-up. It should not work.
        </p>
      </Reveal>

      {/* Stat row */}
      <StaggerList className="mt-16 grid grid-cols-2 gap-px border border-bone/10 bg-bone/10 sm:mt-20 lg:grid-cols-4">
        {STATS.map((stat) => (
          <motion.div
            key={stat.label}
            variants={staggerChild}
            className="group relative overflow-hidden bg-void p-6 sm:p-8"
          >
            <span className="absolute inset-x-0 bottom-0 h-px w-full origin-left scale-x-0 bg-blood transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
            <p className="display text-5xl text-bone transition-colors duration-500 group-hover:text-blood sm:text-6xl">
              {stat.value}
            </p>
            <p className="mt-3 text-sm leading-snug text-dust">{stat.label}</p>
          </motion.div>
        ))}
      </StaggerList>
    </section>
  );
}
