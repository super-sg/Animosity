"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MEMBERS, type Member } from "@/data/band";
import { Reveal, SectionLabel } from "./motion-primitives";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/* Detail overlay                                                      */
/* ------------------------------------------------------------------ */

function MemberSheet({ member, onClose }: { member: Member; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-120 flex items-end justify-center sm:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${member.name} — ${member.role}`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute inset-0 cursor-default bg-void/85 backdrop-blur-md"
      />

      <motion.div
        className="relative max-h-[92svh] w-full overflow-y-auto border-t border-bone/15 bg-ink sm:max-w-4xl sm:border"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <span
          className="absolute inset-x-0 top-0 h-0.5"
          style={{ background: member.accent }}
        />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center border border-bone/20 bg-void/60 backdrop-blur transition-colors hover:border-blood hover:bg-blood/20"
        >
          <span className="relative block h-4 w-4">
            <span className="absolute top-1/2 left-0 block h-px w-full rotate-45 bg-bone" />
            <span className="absolute top-1/2 left-0 block h-px w-full -rotate-45 bg-bone" />
          </span>
        </button>

        <div className="grid sm:grid-cols-5">
          <div className="relative aspect-4/5 sm:col-span-2 sm:aspect-auto">
            <Image
              src={member.photo}
              alt={member.name}
              fill
              sizes="(max-width: 640px) 100vw, 40vw"
              className="object-cover"
            />
            <span
              className="absolute inset-0 mix-blend-color"
              style={{ background: member.accent, opacity: 0.22 }}
            />
            <span className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-ink/80" />
          </div>

          <div className="p-7 sm:col-span-3 sm:p-10">
            <p className="label" style={{ color: member.accent }}>
              {member.role}
            </p>
            <h3 className="display mt-2 text-4xl text-bone sm:text-5xl">
              {member.name}
            </h3>
            {member.subRole && (
              <p className="mt-2 text-sm text-dust">{member.subRole}</p>
            )}
            <p className="label mt-4 text-grave">{member.from}</p>

            <div className="mt-7 space-y-4 border-t border-bone/12 pt-7">
              {member.bio.map((para, i) => (
                <p key={i} className="text-[0.95rem] leading-relaxed text-bone/85">
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-7 border-t border-bone/12 pt-6">
              <p className="label mb-3 text-grave">Inspirations</p>
              <ul className="flex flex-wrap gap-2">
                {member.influences.map((inf) => (
                  <li
                    key={inf}
                    className="border px-3 py-1.5 text-xs text-dust"
                    style={{
                      borderColor: `color-mix(in srgb, ${member.accent} 35%, transparent)`,
                    }}
                  >
                    {inf}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */

export default function Members() {
  const [active, setActive] = useState<Member | null>(null);

  return (
    <section id="members" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="edge-x">
        <SectionLabel index="06">Member gallery</SectionLabel>

        <Reveal delay={0.05} className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="display text-[clamp(3rem,10vw,8.5rem)] text-bone">
            Eight
            <br />
            <span className="text-blood">Of Us</span>
          </h2>
          <p className="max-w-sm pb-3 text-base leading-relaxed text-dust">
            Kenya, Bangladesh, Manipur, Assam, Bihar, Bengal, Uttarakhand. A
            physiotherapist, a biotech PhD, a CEO and an animator. Tap anyone.
          </p>
        </Reveal>
      </div>

      <div className="edge-x mt-14 grid grid-cols-2 gap-px border border-bone/10 bg-bone/10 sm:mt-16 md:grid-cols-3 xl:grid-cols-4">
        {MEMBERS.map((member, i) => (
          <motion.button
            key={member.slug}
            type="button"
            onClick={() => setActive(member)}
            className="group relative aspect-3/4 overflow-hidden bg-void text-left"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.75, delay: (i % 4) * 0.06, ease: EASE }}
          >
            <Image
              src={member.photo}
              alt={member.name}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
              className="object-cover grayscale transition-all duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.06] group-hover:grayscale-0"
            />

            {/* member accent wash, lifts on hover */}
            <span
              className="absolute inset-0 opacity-45 mix-blend-color transition-opacity duration-700 group-hover:opacity-0"
              style={{ background: member.accent }}
            />
            <span className="absolute inset-0 bg-gradient-to-t from-void via-void/25 to-transparent" />

            {/* accent bar wipes in from the left edge */}
            <span
              className="absolute inset-y-0 left-0 w-0.5 origin-bottom scale-y-0 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-y-100"
              style={{ background: member.accent }}
            />

            <span className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <span
                className="label block transition-colors duration-500"
                style={{ color: member.accent }}
              >
                {member.role}
              </span>
              <span className="display mt-1.5 block text-lg leading-none text-bone sm:text-xl">
                {member.name}
              </span>
              <span className="mt-2.5 flex items-center gap-2 opacity-0 transition-all duration-500 group-hover:opacity-100">
                <span className="label text-bone/70">Read bio</span>
                <span className="block h-px w-5 bg-bone/70" />
              </span>
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <MemberSheet member={active} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
