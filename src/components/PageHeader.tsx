"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Masthead for the inner routes — /history, /members, /members/[slug]. */
export default function PageHeader({
  eyebrow,
  title,
  standfirst,
  photo,
  accent = "var(--color-blood)",
  children,
}: {
  eyebrow: string;
  title: string[];
  standfirst?: string;
  photo?: string;
  accent?: string;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden pt-[calc(var(--nav-h)+4rem)] pb-16 sm:pb-24">
      {photo && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={photo}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-25 grayscale"
          />
          <span className="absolute inset-0 bg-gradient-to-b from-void/80 via-void/85 to-void" />
          <span
            className="absolute inset-0 opacity-25 mix-blend-color"
            style={{ background: accent }}
          />
        </div>
      )}
      <div className="crossfield pointer-events-none absolute inset-0 -z-10 opacity-30" />

      <div className="edge-x">
        <motion.p
          className="label"
          style={{ color: accent }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          {eyebrow}
        </motion.p>

        <h1 className="mt-5">
          {title.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className={`display block text-[clamp(2.75rem,9.5vw,8rem)] ${
                  i % 2 ? "text-blood" : "text-bone"
                }`}
                style={i % 2 ? { color: accent } : undefined}
                initial={{ y: "112%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, delay: 0.08 + i * 0.09, ease: EASE }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        {standfirst && (
          <motion.p
            className="mt-7 max-w-2xl text-lg leading-relaxed text-dust sm:text-xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
          >
            {standfirst}
          </motion.p>
        )}

        {children}
      </div>
    </header>
  );
}
