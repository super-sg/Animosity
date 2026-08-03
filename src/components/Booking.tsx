"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BAND, RIDER } from "@/data/band";
import { Reveal, SectionLabel } from "./motion-primitives";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Booking() {
  const [riderOpen, setRiderOpen] = useState(false);

  return (
    <section id="booking" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/photos/band-portrait.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-top opacity-25"
        />
        <span className="absolute inset-0 bg-gradient-to-b from-void via-void/80 to-void" />
      </div>

      <div className="edge-x">
        <SectionLabel index="07">Book the band</SectionLabel>

        <Reveal delay={0.05} className="mt-8">
          <h2 className="display max-w-4xl text-[clamp(2.5rem,8.5vw,7rem)] text-bone">
            See you <span className="text-blood">there</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-7 max-w-2xl">
          <p className="text-lg leading-relaxed text-bone/85 sm:text-xl">
            {BAND.closing}
          </p>
        </Reveal>

        {/* Contact rows */}
        <div className="mt-14 border-t border-bone/12">
          {[
            { label: "Email", value: BAND.email, href: `mailto:${BAND.email}` },
            {
              label: "Instagram",
              value: BAND.instagramHandle,
              href: BAND.instagram,
              external: true,
            },
            {
              label: "YouTube",
              value: "First and Final — Official Video",
              href: BAND.youtube,
              external: true,
            },
            { label: "Based in", value: BAND.base },
          ].map((row) => {
            const inner = (
              <>
                <span className="label w-32 shrink-0 text-grave">{row.label}</span>
                <span className="flex-1 text-base text-bone transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5 sm:text-lg">
                  {row.value}
                </span>
                {row.href && (
                  <span className="label shrink-0 text-grave transition-colors duration-500 group-hover:text-blood">
                    ↗
                  </span>
                )}
              </>
            );

            return row.href ? (
              <a
                key={row.label}
                href={row.href}
                {...(row.external
                  ? { target: "_blank", rel: "noreferrer noopener" }
                  : {})}
                className="group flex items-center gap-5 border-b border-bone/12 py-5"
              >
                {inner}
              </a>
            ) : (
              <div
                key={row.label}
                className="group flex items-center gap-5 border-b border-bone/12 py-5"
              >
                {inner}
              </div>
            );
          })}
        </div>

        {/* Technical rider */}
        <div className="mt-12">
          <button
            type="button"
            onClick={() => setRiderOpen((v) => !v)}
            aria-expanded={riderOpen}
            aria-controls="rider-panel"
            className="group flex w-full items-center gap-4 border border-bone/15 px-6 py-5 transition-colors duration-400 hover:border-blood/60 hover:bg-blood/5"
          >
            <span className="label text-blood">[R]</span>
            <span className="label flex-1 text-left text-bone">
              Technical rider
            </span>
            <motion.span
              className="label text-grave"
              animate={{ rotate: riderOpen ? 45 : 0 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              +
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {riderOpen && (
              <motion.div
                id="rider-panel"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  height: { duration: 0.6, ease: EASE },
                  opacity: { duration: 0.35 },
                }}
                className="overflow-hidden"
              >
                <div className="border-x border-b border-bone/15">
                  {/* header row — desktop only */}
                  <div className="hidden grid-cols-12 gap-4 border-b border-bone/15 bg-carbon px-6 py-3 lg:grid">
                    <span className="label col-span-3 text-grave">Description</span>
                    <span className="label col-span-5 text-grave">Requirement</span>
                    <span className="label col-span-4 text-grave">Notes</span>
                  </div>

                  {RIDER.map((row) => (
                    <div
                      key={row.description}
                      className="grid gap-3 border-b border-bone/10 px-6 py-5 last:border-b-0 lg:grid-cols-12 lg:gap-4"
                    >
                      <div className="lg:col-span-3">
                        <p className="text-base font-semibold text-bone">
                          {row.description}
                        </p>
                        <p className="label mt-1 text-grave">{row.who}</p>
                      </div>
                      <ul className="space-y-1 lg:col-span-5">
                        {row.requirement.map((r) => (
                          <li key={r} className="text-sm text-bone/85">
                            {r}
                          </li>
                        ))}
                      </ul>
                      <p className="text-sm text-dust lg:col-span-4">{row.notes}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={BAND.mediaKit}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group relative overflow-hidden border border-bone/25 px-6 py-3.5"
                  >
                    <span className="label relative z-10 text-bone transition-colors duration-400 group-hover:text-void">
                      Download full media kit (PDF)
                    </span>
                    <span className="absolute inset-0 origin-bottom scale-y-0 bg-bone transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Primary CTA */}
        <Reveal delay={0.05} className="mt-14">
          <a
            href={`mailto:${BAND.email}?subject=Booking%20enquiry%20—%20Animosity`}
            className="group relative flex items-center justify-between gap-6 overflow-hidden border border-blood bg-blood px-8 py-10 sm:px-12 sm:py-14"
          >
            <span className="display relative z-10 text-[clamp(1.75rem,5.5vw,4rem)] text-bone transition-colors duration-500 group-hover:text-blood">
              Get in touch
            </span>
            <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-bone transition-all duration-500 group-hover:border-blood sm:h-16 sm:w-16">
              <span className="text-xl text-bone transition-colors duration-500 group-hover:text-blood">
                ↗
              </span>
            </span>
            <span className="absolute inset-0 origin-bottom scale-y-0 bg-bone transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-y-100" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
