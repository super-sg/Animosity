"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { BAND, MEMBERS } from "@/data/band";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const EASE = [0.16, 1, 0.3, 1] as const;

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

  const active = MEMBERS.find((m) => m.slug === hovered);

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

      {/* Whoever is hovered washes the whole stage in their colour */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10"
        animate={{ opacity: active ? 0.3 : 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{
          background: active
            ? `radial-gradient(ellipse 70% 60% at 50% 85%, ${active.accent}, transparent 72%)`
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
        className="relative z-10 mt-auto flex min-h-0 flex-1 items-end"
        style={{ y: lineupY, opacity: fade }}
      >
        {/* floor shadow so the cut-outs separate from the busy backdrop */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-void via-void/70 to-transparent" />

        <div
          className="relative flex w-full snap-x snap-mandatory items-end gap-0.5 overflow-x-auto overflow-y-hidden px-3 pb-0 sm:gap-1 lg:justify-center lg:overflow-visible lg:px-6"
          onMouseLeave={() => setHovered(null)}
        >
          {MEMBERS.map((member, i) => (
            <motion.div
              key={member.slug}
              className="relative shrink-0 snap-center"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.55 + i * 0.07, ease: EASE }}
            >
              <Link
                href={`/members/${member.slug}`}
                onMouseEnter={() => setHovered(member.slug)}
                onFocus={() => setHovered(member.slug)}
                onBlur={() => setHovered(null)}
                className="group relative block"
                aria-label={`${member.name} — ${member.role}`}
              >
                {/* accent pool at their feet */}
                <span
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-24 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-70"
                  style={{ background: member.accent }}
                />

                <div
                  className={`relative h-[38svh] w-[36vw] transition-all duration-700 ease-[var(--ease-out-expo)] sm:h-[46svh] sm:w-[24vw] lg:h-[54svh] lg:w-[11.2vw] ${
                    hovered && hovered !== member.slug
                      ? "opacity-55"
                      : "opacity-100"
                  } ${hovered === member.slug ? "-translate-y-3" : ""}`}
                >
                  <Image
                    src={member.cutout ?? member.photo}
                    alt={member.name}
                    fill
                    priority={i < 4}
                    sizes="(max-width: 640px) 36vw, (max-width: 1024px) 24vw, 12vw"
                    className={`object-contain object-bottom drop-shadow-[0_12px_28px_rgba(0,0,0,0.75)] transition-all duration-700 ease-[var(--ease-out-expo)] ${
                      hovered === member.slug ? "grayscale-0" : "grayscale-[0.75]"
                    }`}
                  />
                </div>

                {/* name plate — sits below the figure, clear of their feet */}
                <span className="pointer-events-none block px-1 pt-3 text-center">
                  <span
                    className="label block truncate transition-colors duration-400"
                    style={{
                      color:
                        hovered === member.slug
                          ? member.accent
                          : "color-mix(in srgb, var(--color-bone) 45%, transparent)",
                    }}
                  >
                    {member.role}
                  </span>
                </span>
              </Link>
            </motion.div>
          ))}
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
