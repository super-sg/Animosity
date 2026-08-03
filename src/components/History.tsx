"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { HISTORY, type Chapter } from "@/data/band";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Reveal, SectionLabel } from "./motion-primitives";

/* ------------------------------------------------------------------ */

function ChapterCard({ chapter, index }: { chapter: Chapter; index: number }) {
  return (
    <article className="group relative flex h-full w-[86vw] shrink-0 flex-col border border-bone/12 bg-ink sm:w-[62vw] lg:w-[46vw] xl:w-[38vw]">
      {chapter.photo && (
        <div className="relative aspect-16/10 overflow-hidden">
          <Image
            src={chapter.photo}
            alt=""
            fill
            sizes="(max-width: 1024px) 86vw, 46vw"
            className="object-cover grayscale-[0.45] transition-all duration-1000 ease-[var(--ease-out-expo)] group-hover:scale-105 group-hover:grayscale-0"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
          <span className="display absolute right-4 -bottom-2 text-[7rem] leading-none text-bone/8 select-none">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-7 sm:p-9">
        <p className="label text-blood">{chapter.marker}</p>
        <h3 className="display mt-3 text-3xl text-bone sm:text-4xl">
          {chapter.title}
        </h3>
        <p className="mt-4 text-[0.95rem] leading-relaxed text-dust">
          {chapter.body}
        </p>
        <span className="mt-auto block h-px w-full origin-left scale-x-0 bg-blood pt-6 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Desktop: pinned section, chapters travel horizontally               */
/* ------------------------------------------------------------------ */

function HorizontalTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  // Travel far enough to bring the last card fully into view.
  const x = useTransform(smooth, [0, 1], ["0%", "-72%"]);
  const barScale = useTransform(smooth, [0, 1], [0.04, 1]);

  return (
    <div ref={ref} style={{ height: `${HISTORY.length * 78}vh` }}>
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <motion.div className="edge-x flex gap-6" style={{ x }}>
          {HISTORY.map((chapter, i) => (
            <ChapterCard key={chapter.id} chapter={chapter} index={i} />
          ))}

          {/* tail card — pushes the reader on to the achievements */}
          <div className="flex w-[46vw] shrink-0 flex-col justify-center pl-4 xl:w-[38vw]">
            <p className="label text-grave">Next</p>
            <p className="display mt-3 text-5xl text-bone/25 xl:text-6xl">
              And the
              <br />
              silverware
            </p>
          </div>
        </motion.div>

        {/* progress rail */}
        <div className="edge-x absolute inset-x-0 bottom-12">
          <div className="h-px w-full bg-bone/12">
            <motion.div
              className="h-full origin-left bg-blood"
              style={{ scaleX: barScale }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile: plain vertical stack                                        */
/* ------------------------------------------------------------------ */

function VerticalTimeline() {
  return (
    <div className="edge-x mt-14 space-y-6">
      {HISTORY.map((chapter, i) => (
        <Reveal key={chapter.id} delay={0.04 * i}>
          <ChapterCard chapter={chapter} index={i} />
        </Reveal>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */

export default function History() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  return (
    <section id="history" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="edge-x">
        <SectionLabel index="04">How it came together</SectionLabel>
        <Reveal delay={0.05} className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="display text-[clamp(3rem,10vw,8.5rem)] text-bone">
            The
            <br />
            <span className="text-blood">History</span>
          </h2>
          <p className="max-w-sm pb-3 text-base leading-relaxed text-dust">
            Five chapters, eight people, and a name chosen before there was a
            single song to put behind it.
          </p>
        </Reveal>
      </div>

      {isDesktop && !reduced ? <HorizontalTimeline /> : <VerticalTimeline />}

      {/* Cards above are placeholders until the band confirms the real beats. */}
      <div className="edge-x mt-10">
        <p className="inline-block border-l-2 border-amber/60 bg-amber/5 py-2 pl-4 text-xs leading-relaxed text-amber/90">
          Chapter text is a placeholder reconstructed from the media kit — real
          dates and beats to be confirmed by the band.
        </p>
      </div>
    </section>
  );
}
