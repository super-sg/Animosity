"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { HISTORY, memberBySlug } from "@/data/band";
import { Reveal } from "./motion-primitives";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function HistoryChapters() {
  const [current, setCurrent] = useState(HISTORY[0].id);
  const refs = useRef<Record<string, HTMLElement | null>>({});

  // Scroll-spy for the chapter rail.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setCurrent(visible.target.id);
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0.1, 0.5, 1] },
    );
    Object.values(refs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="edge-x relative grid gap-12 lg:grid-cols-12 lg:gap-16">
      {/* Chapter rail */}
      <nav
        aria-label="Chapters"
        className="hidden lg:col-span-3 lg:block"
      >
        <div className="sticky top-[calc(var(--nav-h)+3rem)]">
          <p className="label mb-6 text-grave">Chapters</p>
          <ol className="space-y-1">
            {HISTORY.map((chapter) => {
              const isCurrent = current === chapter.id;
              return (
                <li key={chapter.id}>
                  <a
                    href={`#${chapter.id}`}
                    className="group flex items-center gap-3 py-2"
                    aria-current={isCurrent ? "true" : undefined}
                  >
                    <span
                      className={`block h-px transition-all duration-500 ease-[var(--ease-out-expo)] ${
                        isCurrent ? "w-8 bg-blood" : "w-3 bg-bone/25 group-hover:w-6"
                      }`}
                    />
                    <span
                      className={`text-sm transition-colors duration-400 ${
                        isCurrent ? "text-bone" : "text-grave group-hover:text-dust"
                      }`}
                    >
                      {chapter.title}
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      </nav>

      {/* Chapters */}
      <div className="lg:col-span-9">
        {HISTORY.map((chapter, i) => (
          <section
            key={chapter.id}
            id={chapter.id}
            ref={(el) => {
              refs.current[chapter.id] = el;
            }}
            className="scroll-mt-32 border-t border-bone/12 py-14 first:border-t-0 first:pt-0 sm:py-20"
          >
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
              <span className="label text-blood">{chapter.marker}</span>
              <span className="label text-grave tabular-nums">
                {String(i + 1).padStart(2, "0")} / {String(HISTORY.length).padStart(2, "0")}
              </span>
            </div>

            <Reveal delay={0.05}>
              <h2 className="display mt-4 text-[clamp(2rem,6vw,4.25rem)] text-bone">
                {chapter.title}
              </h2>
              <p className="mt-3 text-lg text-blood-bright sm:text-xl">
                {chapter.standfirst}
              </p>
            </Reveal>

            {chapter.photo && (
              <Reveal delay={0.1} className="mt-9">
                <div className="group relative aspect-16/9 overflow-hidden border border-bone/12">
                  <Image
                    src={chapter.photo}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover grayscale-[0.5] transition-all duration-1000 ease-[var(--ease-out-expo)] group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent" />
                  <span className="display absolute right-5 -bottom-3 text-[6rem] leading-none text-bone/10 select-none sm:text-[9rem]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </Reveal>
            )}

            <div className="mt-9 max-w-2xl space-y-5">
              {chapter.body.map((para, j) => (
                <Reveal key={j} delay={0.05 + j * 0.05}>
                  <p className="text-base leading-relaxed text-bone/85 sm:text-lg">
                    {para}
                  </p>
                </Reveal>
              ))}
            </div>

            {chapter.cast && chapter.cast.length > 0 && (
              <Reveal delay={0.1} className="mt-9">
                <p className="label mb-4 text-grave">Enter</p>
                <ul className="flex flex-wrap gap-2.5">
                  {chapter.cast.map((slug) => {
                    const member = memberBySlug(slug);
                    if (!member) return null;
                    return (
                      <li key={slug}>
                        <Link
                          href={`/members/${member.slug}`}
                          className="group flex items-center gap-3 border border-bone/15 py-2 pr-4 pl-2 transition-colors duration-400 hover:border-bone/40"
                        >
                          <span className="relative h-9 w-9 shrink-0 overflow-hidden">
                            <Image
                              src={member.photo}
                              alt=""
                              fill
                              sizes="36px"
                              className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                            />
                            <span
                              className="absolute inset-0 opacity-40 mix-blend-color transition-opacity duration-500 group-hover:opacity-0"
                              style={{ background: member.accent }}
                            />
                          </span>
                          <span>
                            <span className="block text-sm text-bone">{member.name}</span>
                            <span
                              className="label block text-[0.6rem]"
                              style={{ color: member.accent }}
                            >
                              {member.role}
                            </span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            )}
          </section>
        ))}

        <motion.p
          className="mt-4 border-l-2 border-amber/60 bg-amber/5 py-3 pl-4 text-xs leading-relaxed text-amber/90"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          These chapters are reconstructed from the media kit — the people and the
          results are real, the ordering and framing are not yet confirmed by the band.
          Dates in particular are missing. Edit <code className="font-mono">HISTORY</code>{" "}
          in <code className="font-mono">src/data/band.ts</code>.
        </motion.p>
      </div>
    </div>
  );
}
