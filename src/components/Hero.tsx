"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { BAND } from "@/data/band";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Photo drifts slower than the page; type lifts and fades out ahead of it.
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.22]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-38%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.62], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex h-[100svh] min-h-[620px] flex-col justify-end overflow-hidden"
    >
      {/* Stage photograph */}
      <motion.div
        className="absolute inset-0 -z-20"
        style={{ y: photoY, scale: photoScale }}
      >
        <Image
          src="/photos/hero-stage.jpg"
          alt="Animosity performing live"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Grade: crush the photo toward the kit's blood-red cover */}
      <div className="absolute inset-0 -z-10 bg-blood/22 mix-blend-color" />

      {/* The stage backdrop in this photo already carries the wordmark. Sink
          that patch into the dark so it doesn't ghost behind the real logo,
          while the players either side of it stay lit. */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_58%_34%_at_50%_30%,var(--color-void)_0%,var(--color-void)_42%,transparent_80%)]" />

      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-void via-void/50 to-void/65" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_45%,transparent_35%,var(--color-void)_96%)]" />

      <motion.div
        className="edge-x relative w-full pb-14 sm:pb-20"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Wordmark */}
        <div className="overflow-hidden pb-2">
          <motion.div
            initial={{ y: "112%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.4, delay: 0.25, ease: EASE }}
          >
            <Image
              src="/brand/animosity-logo-glyph.png"
              alt="Animosity"
              width={1752}
              height={542}
              priority
              className="logo-glow w-full max-w-[min(92vw,1180px)]"
            />
          </motion.div>
        </div>

        <motion.div
          className="mt-8 flex flex-col gap-6 border-t border-bone/12 pt-6 sm:mt-10 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: EASE }}
        >
          <div className="max-w-xl">
            <p className="label mb-3 text-blood-bright">{BAND.genre}</p>
            <p className="text-lg leading-snug text-bone/85 sm:text-xl">
              Angst. Rebellion.{" "}
              <span className="text-bone">A higher cause.</span>
            </p>
            <p className="label mt-3 text-grave">{BAND.base}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#music"
              className="group relative overflow-hidden border border-blood bg-blood px-7 py-4"
            >
              <span className="label relative z-10 text-bone transition-colors duration-400 group-hover:text-blood">
                Hear the originals
              </span>
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-bone transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100" />
            </a>
            <a
              href="#booking"
              className="group relative overflow-hidden border border-bone/25 px-7 py-4"
            >
              <span className="label relative z-10 text-bone transition-colors duration-400 group-hover:text-void">
                Book the band
              </span>
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-bone transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100" />
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        style={{ opacity: contentOpacity }}
      >
        <span className="label text-grave">Scroll</span>
        <span className="relative block h-10 w-px overflow-hidden bg-bone/15">
          <motion.span
            className="absolute inset-x-0 top-0 block h-1/2 bg-blood"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
