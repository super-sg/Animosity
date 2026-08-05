"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { BAND, LINEUP } from "@/data/band";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Body-to-body pitch as a multiple of body width. Below 1 the bodies overlap,
 *  which is what a band standing shoulder to shoulder actually looks like. */
const AIR = 0.91;

/**
 * A member's slot is only as wide as their BODY — their guitar hangs outside it
 * and is free to overlap whoever is next to them. Sizing slots by the full PNG
 * instead made the wide cut-outs (Harsh's guitar is half his bounding box) eat
 * the row's width budget and shrink everybody.
 */
const slotUnits = (m: (typeof LINEUP)[number]) =>
  m.lineup.scale * m.lineup.aspect * m.lineup.bodyW * AIR;

/** Full drawn width of the PNG, in multiples of --fig. */
const imageUnits = (m: (typeof LINEUP)[number]) => m.lineup.scale * m.lineup.aspect;

/**
 * Row geometry in multiples of --fig, derived from the data so adding a member
 * or swapping in a wider photo can't silently push anyone off screen.
 *
 * `extent` measures the union of the drawn IMAGES, not the slots — the slots
 * only cover bodies, and a guitar hanging off the last member would otherwise
 * be clipped by the viewport. `shift` re-centres the row on that extent, since
 * the overhang isn't symmetrical.
 */
const GEOMETRY = (() => {
  let x = 0;
  let min = Infinity;
  let max = -Infinity;
  for (const m of LINEUP) {
    const sw = slotUnits(m);
    const iw = imageUnits(m);
    const left = x + sw / 2 - m.lineup.headCx * iw + (m.lineup.nudge ?? 0);
    min = Math.min(min, left);
    max = Math.max(max, left + iw);
    x += sw;
  }
  const lead = -Math.min(0, min);
  const trail = Math.max(0, max - x);
  return { extent: max - min, shift: (trail - lead) / 2 };
})();

export default function HeroLineup() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [hovered, setHovered] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const lineupY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduced) {
      video.pause();
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.05 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduced]);

  const active = LINEUP.find((m) => m.slug === hovered);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex h-[100svh] min-h-[660px] flex-col overflow-hidden"
    >
      {/* The band's own stage backdrop */}
      <motion.div className="absolute inset-0 -z-20" style={{ y: bgY, scale: bgScale }}>
        <video
          ref={videoRef}
          className="h-full w-full object-cover object-center"
          src="/video/hero-backdrop.mp4"
          poster="/video/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        />
      </motion.div>

      <div className="absolute inset-0 -z-10 bg-blood/15 mix-blend-color" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-void via-void/45 to-void/55" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_38%,transparent_30%,var(--color-void)_96%)]" />

      {/* Whoever is hovered washes the whole stage in their accent colour */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10"
        animate={{ opacity: active ? 0.42 : 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{
          background: active
            ? `radial-gradient(ellipse 72% 62% at 50% 88%, ${active.accent}, transparent 70%)`
            : undefined,
        }}
      />

      {/* Heading */}
      <motion.div
        className="edge-x relative z-10 pt-[calc(var(--nav-h)+2.5rem)]"
        style={{ opacity: fade }}
      >
        <motion.p
          className="label text-blood-bright"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
        >
          {BAND.genre} — {BAND.base}
        </motion.p>

        <h1 className="mt-4 max-w-4xl">
          {["Angst. Rebellion.", "A higher cause."].map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className={`display block text-[clamp(2rem,6.4vw,5rem)] ${
                  i === 1 ? "text-blood" : "text-bone"
                }`}
                initial={{ y: "112%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.15, delay: 0.4 + i * 0.1, ease: EASE }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
      </motion.div>

      {/* The line-up */}
      <motion.div
        className="relative z-10 mt-auto flex min-h-0 flex-1 items-end [--fig:38svh] sm:[--fig:44svh] lg:[--fig:min(56svh,var(--fig-w))]"
        style={{
          y: lineupY,
          opacity: fade,
          // width-derived cap on --fig; the class above takes whichever of this
          // and the height cap is smaller
          ...({
            "--fig-w": `calc((100vw - 4.5rem) / ${GEOMETRY.extent.toFixed(3)})`,
          } as React.CSSProperties),
        }}
      >
        {/* floor shadow so the cut-outs separate from the busy backdrop */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-void via-void/70 to-transparent" />

        <div
          className="relative flex w-full snap-x snap-mandatory items-end gap-2 overflow-x-auto overflow-y-visible px-3 lg:translate-x-[calc(var(--fig)*var(--shift))] lg:justify-center lg:gap-0 lg:overflow-visible lg:px-6"
          style={
            {
              "--shift": (-GEOMETRY.shift).toFixed(4),
            } as React.CSSProperties
          }
          onMouseLeave={() => setHovered(null)}
        >
          {LINEUP.map((member, i) => {
            const { scale, drop, headCx, nudge = 0 } = member.lineup;
            const slotW = slotUnits(member);
            const imgW = imageUnits(member);
            // put their head on the slot's centre line, i.e. over their name
            const left = slotW / 2 - headCx * imgW + nudge;
            const dimmed = hovered !== null && hovered !== member.slug;
            const lit = hovered === member.slug;

            return (
              <motion.div
                key={member.slug}
                className="relative shrink-0 snap-center"
                style={{ zIndex: lit ? 30 : LINEUP.length - i }}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.55 + i * 0.07, ease: EASE }}
              >
                <Link
                  href={`/members/${member.slug}`}
                  onMouseEnter={() => setHovered(member.slug)}
                  onFocus={() => setHovered(member.slug)}
                  onBlur={() => setHovered(null)}
                  className="group relative flex flex-col items-center"
                  aria-label={`${member.name} — ${member.role}`}
                >
                  {/* The slot is body-width and clips only along the floor, so
                      guitars can hang over the neighbours while the person
                      stays lined up with their name plate. */}
                  <span
                    className="relative block h-[var(--fig)]"
                    style={{
                      width: `calc(var(--fig) * ${slotW})`,
                      clipPath: "inset(-100vh -100vw 0 -100vw)",
                    }}
                  >
                    {/* accent pool at their feet */}
                    <span
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-24 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-80"
                      style={{ background: member.accent }}
                    />

                    {/* pointer-events-none matters: the image spills outside the
                        slot, so without it a wide guitar sits on top of the next
                        member and swallows their hover and click. The hit target
                        stays the body-width slot. */}
                    <span
                      className={`pointer-events-none absolute bottom-0 block transition-all duration-700 ease-[var(--ease-out-expo)] ${
                        dimmed ? "opacity-45" : "opacity-100"
                      }`}
                      style={{
                        width: `calc(var(--fig) * ${imgW})`,
                        height: `calc(var(--fig) * ${scale})`,
                        left: `calc(var(--fig) * ${left})`,
                        transform: `translateY(calc(var(--fig) * ${drop} + ${lit ? "-0.85rem" : "0px"}))`,
                        // dissolve the bottom edge so the shorter crops don't
                        // all end on a hard horizontal cut
                        maskImage:
                          "linear-gradient(to bottom, #000 80%, transparent 100%)",
                      }}
                    >
                      <Image
                        src={member.cutout ?? member.photo}
                        alt={member.name}
                        fill
                        priority={i < 4}
                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 18vw"
                        className={`object-contain object-bottom drop-shadow-[0_16px_34px_rgba(0,0,0,0.85)] transition-all duration-700 ease-[var(--ease-out-expo)] ${
                          lit ? "grayscale-0 brightness-110" : "grayscale-[0.85]"
                        }`}
                      />
                    </span>
                  </span>

                  <span className="pointer-events-none block w-full px-0.5 pt-3 text-center">
                    <span
                      className="block truncate font-mono text-[0.5rem] font-medium tracking-[0.12em] uppercase transition-colors duration-400 sm:text-[0.5625rem] sm:tracking-[0.16em]"
                      style={{
                        color: lit
                          ? member.accent
                          : "color-mix(in srgb, var(--color-bone) 45%, transparent)",
                      }}
                    >
                      {member.role}
                    </span>
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Readout for whoever is hovered */}
      <motion.div
        className="edge-x pointer-events-none relative z-10 flex h-20 items-center justify-between gap-6 border-t border-bone/12 bg-void/40 backdrop-blur-sm"
        style={{ opacity: fade }}
      >
        <div className="min-w-0">
          <p className="display truncate text-xl text-bone sm:text-2xl">
            {active ? active.name : "The Band"}
          </p>
          <p className="mt-0.5 truncate text-xs text-dust sm:text-sm">
            {active ? active.tagline : "Eight of us. Tap anyone to read their story."}
          </p>
        </div>
        <span className="label hidden shrink-0 text-grave sm:block">
          {active ? "Read their story ↗" : "Scroll"}
        </span>
      </motion.div>
    </section>
  );
}
