"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SONGS } from "@/data/band";
import { Reveal, SectionLabel } from "./motion-primitives";
import LiteYouTube from "./LiteYouTube";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Music() {
  const [openSlug, setOpenSlug] = useState<string | null>(SONGS[0].slug);

  return (
    <section id="music" className="relative scroll-mt-24 py-24 sm:py-36">
      <div className="edge-x">
        <SectionLabel index="02">The originals</SectionLabel>

        <Reveal delay={0.05} className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="display text-[clamp(3rem,10vw,8.5rem)] text-bone">
            Three
            <br />
            <span className="text-blood">Originals</span>
          </h2>
          <div className="max-w-sm pb-3">
            <p className="text-base leading-relaxed text-dust">
              Written in-house — lyrics by Harsh, music built in the room, and one
              official video shot so far. Open a track to read where it came from.
            </p>
            <Link href="/setlist" className="group mt-5 inline-flex items-center gap-3">
              <span className="label text-bone transition-colors group-hover:text-blood">
                Everything we play live
              </span>
              <span className="block h-px w-8 bg-bone/40 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:w-14 group-hover:bg-blood" />
            </Link>
          </div>
        </Reveal>
      </div>

      {/* Track list */}
      <div className="mt-16 border-t border-bone/12 sm:mt-20">
        {SONGS.map((song) => {
          const isOpen = openSlug === song.slug;
          return (
            <div key={song.slug} className="border-b border-bone/12">
              <h3>
                <button
                  type="button"
                  onClick={() => setOpenSlug(isOpen ? null : song.slug)}
                  aria-expanded={isOpen}
                  aria-controls={`panel-${song.slug}`}
                  className="edge-x group relative flex w-full items-center gap-5 py-7 text-left sm:gap-8 sm:py-9"
                >
                  {/* accent wash on hover / open */}
                  <span
                    className="pointer-events-none absolute inset-0 origin-left transition-transform duration-700 ease-[var(--ease-out-expo)]"
                    style={{
                      background: `linear-gradient(90deg, color-mix(in srgb, ${song.accent} 16%, transparent), transparent 65%)`,
                      transform: isOpen ? "scaleX(1)" : "scaleX(0)",
                    }}
                  />
                  <span
                    className="pointer-events-none absolute inset-0 origin-left scale-x-0 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                    style={{
                      background: `linear-gradient(90deg, color-mix(in srgb, ${song.accent} 10%, transparent), transparent 60%)`,
                    }}
                  />

                  <span
                    className="label relative shrink-0 tabular-nums transition-colors duration-500"
                    style={{ color: isOpen ? song.accent : undefined }}
                  >
                    {song.index}
                  </span>

                  <span className="display relative flex-1 text-[clamp(1.85rem,6.4vw,4.75rem)] text-bone transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-2">
                    {song.title}
                  </span>

                  <span className="label relative hidden shrink-0 text-grave lg:block">
                    {song.tag}
                  </span>

                  {/* plus / minus */}
                  <span className="relative flex h-8 w-8 shrink-0 items-center justify-center">
                    <span
                      className="block h-px w-4 transition-colors duration-500"
                      style={{ background: isOpen ? song.accent : "var(--color-dust)" }}
                    />
                    <motion.span
                      className="absolute block h-4 w-px"
                      style={{ background: isOpen ? song.accent : "var(--color-dust)" }}
                      animate={{ scaleY: isOpen ? 0 : 1 }}
                      transition={{ duration: 0.45, ease: EASE }}
                    />
                  </span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`panel-${song.slug}`}
                    key="panel"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: { duration: 0.65, ease: EASE },
                      opacity: { duration: 0.4, ease: "easeOut" },
                    }}
                    className="overflow-hidden"
                  >
                    <div className="edge-x grid gap-10 pt-1 pb-14 lg:grid-cols-12 lg:gap-14">
                      <div className="lg:col-span-7 lg:col-start-2">
                        <p
                          className="label mb-4"
                          style={{ color: song.accent }}
                        >
                          The story
                        </p>
                        <p className="text-lg leading-relaxed text-bone/90 sm:text-xl">
                          {song.story}
                        </p>

                        {song.isPlaceholderStory && (
                          <p className="mt-5 border-l-2 border-amber/60 bg-amber/5 py-2 pl-4 text-xs leading-relaxed text-amber/90">
                            Placeholder — written from the media kit. Swap in the
                            band&rsquo;s own account in{" "}
                            <code className="font-mono">src/data/band.ts</code>.
                          </p>
                        )}
                      </div>

                      <div className="lg:col-span-3">
                        <p className="label mb-4 text-grave">Credits</p>
                        <ul className="space-y-2">
                          {song.credits.map((credit) => (
                            <li key={credit} className="text-sm text-dust">
                              {credit}
                            </li>
                          ))}
                        </ul>

                        {song.youtubeId && (
                          <a
                            href="#video"
                            className="group mt-7 inline-flex items-center gap-3"
                          >
                            <span
                              className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-400"
                              style={{ borderColor: song.accent }}
                            >
                              <span
                                className="ml-0.5 block h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent"
                                style={{ borderLeftColor: song.accent }}
                              />
                            </span>
                            <span className="label text-bone transition-colors group-hover:text-blood">
                              Watch the video
                            </span>
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Featured video */}
      <div id="video" className="edge-x scroll-mt-24 pt-24 sm:pt-32">
        <SectionLabel index="03" accent="var(--color-blood)">
          Official music video
        </SectionLabel>
        <Reveal delay={0.05} className="mt-8">
          <h2 className="display text-[clamp(2.5rem,8vw,6.5rem)] text-bone">
            First and Final
          </h2>
        </Reveal>
        <Reveal delay={0.12} className="mt-10">
          <LiteYouTube
            id="v2oNFCLB11k"
            title="Animosity — First and Final (Official Music Video)"
          />
        </Reveal>
      </div>
    </section>
  );
}
