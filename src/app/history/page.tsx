import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import HistoryChapters from "@/components/HistoryChapters";
import Achievements from "@/components/Achievements";
import Marquee from "@/components/Marquee";
import { SONGS, MEMBERS } from "@/data/band";
import { Reveal, SectionLabel } from "@/components/motion-primitives";

export const metadata: Metadata = {
  title: "History",
  description:
    "How Animosity came together — from a name chosen before the first song to nine Battle of Bands podiums across the Delhi-NCR circuit.",
};

export default function HistoryPage() {
  return (
    <>
      <PageHeader
        eyebrow="The story so far"
        title={["How it", "came together"]}
        standfirst="A name chosen before there was a single song to put behind it, eight people pulled in from five states and three countries, and nine trips to a podium."
        photo="/photos/band-live.jpg"
      >
        <div className="mt-12 grid max-w-3xl grid-cols-2 gap-px border border-bone/10 bg-bone/10 sm:grid-cols-4">
          {[
            { value: "08", label: "Members" },
            { value: "03", label: "Countries" },
            { value: "09", label: "Podiums" },
            { value: "03", label: "Originals" },
          ].map((stat) => (
            <div key={stat.label} className="bg-void p-5">
              <p className="display text-3xl text-bone sm:text-4xl">{stat.value}</p>
              <p className="label mt-2 text-grave">{stat.label}</p>
            </div>
          ))}
        </div>
      </PageHeader>

      <section className="py-8 sm:py-14">
        <HistoryChapters />
      </section>

      <Marquee
        items={["Angst", "Rebellion", "A higher cause"]}
        duration={24}
      />

      <Achievements />

      {/* The originals, as a chronology */}
      <section className="edge-x py-20 sm:py-28">
        <SectionLabel index="06">What came out of it</SectionLabel>
        <Reveal delay={0.05} className="mt-8">
          <h2 className="display text-[clamp(2.25rem,7vw,5.5rem)] text-bone">
            Three <span className="text-blood">originals</span>
          </h2>
        </Reveal>

        <ol className="mt-12 border-t border-bone/12">
          {SONGS.map((song) => (
            <li key={song.slug} className="border-b border-bone/12">
              <Link
                href={`/#music`}
                className="group flex flex-col gap-3 py-7 sm:flex-row sm:items-baseline sm:gap-8"
              >
                <span
                  className="label shrink-0 tabular-nums"
                  style={{ color: song.accent }}
                >
                  {song.index}
                </span>
                <span className="display flex-1 text-[clamp(1.5rem,4.5vw,3rem)] text-bone transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-2">
                  {song.title}
                </span>
                <span className="label shrink-0 text-grave">{song.tag}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* Onward to the members */}
      <section className="edge-x pb-24 sm:pb-32">
        <Reveal>
          <Link
            href="/members"
            className="group relative flex flex-col gap-6 overflow-hidden border border-bone/15 p-8 transition-colors duration-500 hover:border-blood/50 sm:flex-row sm:items-center sm:justify-between sm:p-12"
          >
            <div className="relative z-10">
              <p className="label text-blood">Next</p>
              <p className="display mt-3 text-[clamp(1.75rem,5vw,3.5rem)] text-bone">
                Meet the eight
              </p>
              <p className="mt-2 max-w-md text-sm text-dust">
                Kenya, Bangladesh, Manipur, Assam, Bihar, Bengal and Uttarakhand — each
                with their own page.
              </p>
            </div>
            <div className="relative z-10 flex -space-x-3">
              {MEMBERS.slice(0, 5).map((member) => (
                <span
                  key={member.slug}
                  className="block h-12 w-12 shrink-0 rounded-full border-2 border-void"
                  style={{ background: member.accent }}
                />
              ))}
              <span className="label flex h-12 items-center pl-6 text-grave">+3</span>
            </div>
            <span className="absolute inset-0 origin-left scale-x-0 bg-blood/8 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
