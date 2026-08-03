"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { Member } from "@/data/band";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Full-bleed masthead for a single member, keyed to their accent colour. */
export default function MemberIntro({
  member,
  index,
  total,
}: {
  member: Member;
  index: number;
  total: number;
}) {
  return (
    <header className="relative overflow-hidden pt-[calc(var(--nav-h)+2rem)]">
      {/* accent bleed */}
      <div
        className="absolute inset-0 -z-10 opacity-20"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 70% 20%, ${member.accent}, transparent 70%)`,
        }}
      />
      <div className="crossfield pointer-events-none absolute inset-0 -z-10 opacity-25" />

      <div className="edge-x">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex items-center gap-3"
        >
          <Link href="/members" className="label text-grave transition-colors hover:text-bone">
            Members
          </Link>
          <span className="label text-grave">/</span>
          <span className="label" style={{ color: member.accent }}>
            {String(index + 1).padStart(2, "0")} of {String(total).padStart(2, "0")}
          </span>
        </motion.div>

        <div className="mt-8 grid items-end gap-10 pb-12 lg:grid-cols-12 lg:gap-14 lg:pb-16">
          {/* Portrait */}
          <motion.div
            className="relative lg:col-span-5"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <div className="relative aspect-4/5 overflow-hidden border border-bone/12">
              <Image
                src={member.photo}
                alt={member.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <span
                className="absolute inset-0 opacity-25 mix-blend-color"
                style={{ background: member.accent }}
              />
              <span className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent" />
              <span
                className="absolute inset-x-0 bottom-0 h-1"
                style={{ background: member.accent }}
              />
            </div>
            <span className="display pointer-events-none absolute -top-6 -right-2 text-[5rem] leading-none text-bone/8 tabular-nums select-none lg:text-[7rem]">
              {String(index + 1).padStart(2, "0")}
            </span>
          </motion.div>

          {/* Titles */}
          <div className="lg:col-span-7">
            <motion.p
              className="label"
              style={{ color: member.accent }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            >
              {member.role}
              {member.subRole ? ` — ${member.subRole}` : ""}
            </motion.p>

            {/* Two lines: everything up to the surname, then the surname.
                The display face has 0.82 leading, which collides once each
                line is clipped for the mask animation — hence the override. */}
            <h1 className="mt-4">
              {(() => {
                const parts = member.name.split(" ");
                const lines =
                  parts.length > 1
                    ? [parts.slice(0, -1).join(" "), parts[parts.length - 1]]
                    : parts;
                return lines.map((line, i) => (
                  <span key={`${line}-${i}`} className="block overflow-hidden pb-[0.08em]">
                    <motion.span
                      className="display block text-[clamp(2.25rem,7vw,5.25rem)] leading-[0.95] text-bone"
                      initial={{ y: "112%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 1.05, delay: 0.2 + i * 0.07, ease: EASE }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ));
              })()}
            </h1>

            <motion.p
              className="mt-6 max-w-xl text-lg leading-relaxed text-dust sm:text-xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
            >
              {member.tagline}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-x-8 gap-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.6 }}
            >
              <div>
                <p className="label text-grave">Instrument</p>
                <p className="mt-1 text-base text-bone">{member.instrument}</p>
              </div>
              <div>
                <p className="label text-grave">From</p>
                <p className="mt-1 text-base text-bone">{member.from}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
}
