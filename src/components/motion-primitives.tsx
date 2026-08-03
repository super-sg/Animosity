"use client";

import { motion, useInView, type Variants } from "motion/react";
import { useRef, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/* Reveal — the workhorse: mask-up entrance on scroll                  */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* MaskLines — display type rising out of a clipped band, line by line  */
/* ------------------------------------------------------------------ */

export function MaskLines({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
  stagger = 0.08,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className={`block ${lineClassName}`}
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : undefined}
            transition={{
              duration: 1.05,
              delay: delay + i * stagger,
              ease: EASE,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Stagger container for lists                                         */
/* ------------------------------------------------------------------ */

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

export function StaggerList({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* SectionLabel — the media kit's small technical caption              */
/* ------------------------------------------------------------------ */

export function SectionLabel({
  index,
  children,
  accent = "var(--color-blood)",
}: {
  index: string;
  children: ReactNode;
  accent?: string;
}) {
  return (
    <Reveal className="flex items-center gap-4">
      <span
        className="label text-blood"
        style={{ color: accent }}
      >
        [{index}]
      </span>
      <span className="label text-dust">{children}</span>
      <span
        className="h-px flex-1 max-w-40"
        style={{ background: `color-mix(in srgb, ${accent} 45%, transparent)` }}
      />
    </Reveal>
  );
}
