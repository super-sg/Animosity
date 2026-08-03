"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { MEMBERS } from "@/data/band";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function MemberGrid() {
  return (
    <div className="edge-x grid grid-cols-1 gap-px border border-bone/10 bg-bone/10 sm:grid-cols-2 xl:grid-cols-4">
      {MEMBERS.map((member, i) => (
        <motion.div
          key={member.slug}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ duration: 0.8, delay: (i % 4) * 0.06, ease: EASE }}
        >
          <Link
            href={`/members/${member.slug}`}
            className="group relative flex h-full flex-col bg-void"
          >
            <div className="relative aspect-4/5 overflow-hidden">
              <Image
                src={member.photo}
                alt={member.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                className="object-cover grayscale transition-all duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.05] group-hover:grayscale-0"
              />
              <span
                className="absolute inset-0 opacity-45 mix-blend-color transition-opacity duration-700 group-hover:opacity-0"
                style={{ background: member.accent }}
              />
              <span className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent" />
              <span
                className="absolute inset-y-0 left-0 w-0.5 origin-bottom scale-y-0 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-y-100"
                style={{ background: member.accent }}
              />
              <span className="display absolute top-4 right-4 text-3xl text-bone/15 tabular-nums select-none">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <p className="label" style={{ color: member.accent }}>
                {member.role}
              </p>
              <p className="display mt-2 text-2xl leading-none text-bone">
                {member.name}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-dust">{member.tagline}</p>

              <span className="mt-auto flex items-center gap-3 pt-6">
                <span className="label text-bone/70 transition-colors duration-400 group-hover:text-bone">
                  Read their story
                </span>
                <span className="block h-px w-6 bg-bone/40 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:w-12 group-hover:bg-blood" />
              </span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
