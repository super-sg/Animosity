"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ACHIEVEMENTS } from "@/data/band";
import { Reveal, SectionLabel, StaggerList, staggerChild } from "./motion-primitives";

export default function Achievements() {
  const firsts = ACHIEVEMENTS.filter((a) => a.place === "1ST");
  const seconds = ACHIEVEMENTS.filter((a) => a.place === "2ND");

  return (
    <section id="achievements" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      {/* Backing photograph, pushed way down */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/photos/band-cokestudio-wide.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-18 grayscale"
        />
        <span className="absolute inset-0 bg-gradient-to-b from-void via-void/85 to-void" />
        <span className="absolute inset-0 bg-blood/10 mix-blend-color" />
      </div>

      <div className="edge-x">
        <SectionLabel index="05">Battle of bands</SectionLabel>

        <Reveal delay={0.05} className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="display text-[clamp(3rem,10vw,8.5rem)] text-bone">
            Nine
            <br />
            <span className="text-blood">Podiums</span>
          </h2>
          <p className="max-w-sm pb-3 text-base leading-relaxed text-dust">
            Six firsts and three seconds across the Delhi-NCR college circuit —
            IIT Kanpur, IIT Roorkee, IIIT Delhi, IIT Delhi, AIIMS and more.
          </p>
        </Reveal>

        <div className="mt-16 space-y-12 sm:mt-20">
          {[
            { place: "1ST", label: "First place", items: firsts, accent: "var(--color-blood)" },
            { place: "2ND", label: "Second place", items: seconds, accent: "var(--color-dust)" },
          ].map((group) => (
            <div key={group.place}>
              <div className="mb-5 flex items-baseline gap-4">
                <span
                  className="display text-3xl sm:text-4xl"
                  style={{ color: group.accent }}
                >
                  {group.place}
                </span>
                <span className="label text-grave">{group.label}</span>
                <span className="label ml-auto text-grave tabular-nums">
                  {String(group.items.length).padStart(2, "0")}
                </span>
              </div>

              <StaggerList className="grid gap-px border border-bone/10 bg-bone/10 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item) => (
                  <motion.div
                    key={`${item.event}-${item.venue}`}
                    variants={staggerChild}
                    className="group relative flex items-center gap-5 overflow-hidden bg-void p-6"
                  >
                    <span
                      className="absolute inset-0 origin-left scale-x-0 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                      style={{
                        background: `linear-gradient(90deg, color-mix(in srgb, ${group.accent} 14%, transparent), transparent)`,
                      }}
                    />
                    <span
                      className="display relative shrink-0 text-2xl tabular-nums"
                      style={{ color: group.accent }}
                    >
                      {item.place}
                    </span>
                    <span className="relative">
                      <span className="block text-base font-semibold text-bone">
                        {item.event}
                      </span>
                      <span className="label mt-1 block text-grave">
                        {item.venue}
                      </span>
                    </span>
                  </motion.div>
                ))}
              </StaggerList>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
