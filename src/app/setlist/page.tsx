import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Setlist from "@/components/Setlist";
import Marquee from "@/components/Marquee";
import { Reveal } from "@/components/motion-primitives";
import { BAND, SETLIST_COUNTS } from "@/data/band";

export const metadata: Metadata = {
  title: "Setlist",
  description:
    "Everything Animosity plays live — three originals, ten English covers from Avenged Sevenfold to AC/DC, and two Hindi tracks on special demand. Hear each original recording and read what it does to a room.",
  alternates: { canonical: "/setlist" },
};

export default function SetlistPage() {
  return (
    <>
      <PageHeader
        eyebrow="Live repertoire"
        title={["What we", "play live"]}
        standfirst="Three songs that are ours and twelve that aren't — every one of them opened up below, with the original recording to hear it against and our own footage where we have it."
        photo="/photos/live-cokestudio.jpg"
        accent="var(--color-ember)"
      >
        <div className="mt-12 grid max-w-3xl grid-cols-2 gap-px border border-bone/10 bg-bone/10 sm:grid-cols-4">
          {[
            { value: SETLIST_COUNTS.originals, label: "Originals" },
            { value: SETLIST_COUNTS.english, label: "English covers" },
            { value: SETLIST_COUNTS.hindi, label: "Hindi, on demand" },
            { value: SETLIST_COUNTS.total, label: "Songs in the book" },
          ].map((stat) => (
            <div key={stat.label} className="bg-void p-5">
              <p className="display text-3xl text-bone sm:text-4xl">
                {String(stat.value).padStart(2, "0")}
              </p>
              <p className="label mt-2 text-grave">{stat.label}</p>
            </div>
          ))}
        </div>
      </PageHeader>

      <section className="pb-4">
        <Setlist />
      </section>

      <Marquee items={["Originals", "Covers", "On special demand"]} duration={22} reverse />

      {/* Nothing here is fixed — the set gets cut to the slot */}
      <section className="edge-x py-20 sm:py-28">
        <Reveal>
          <Link
            href="/#booking"
            className="group relative flex flex-col gap-6 overflow-hidden border border-bone/15 p-8 transition-colors duration-500 hover:border-blood/50 sm:flex-row sm:items-center sm:justify-between sm:p-12"
          >
            <div className="relative z-10">
              <p className="label text-blood">Want a different set?</p>
              <p className="display mt-3 text-[clamp(1.75rem,5vw,3.5rem)] text-bone">
                Ask for it
              </p>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-dust">
                The running order gets cut to the slot, and the Hindi tracks go in on request.
                If there is something you want that is not on this page, say so when you write
                to us — most of it is closer to ready than it looks.
              </p>
            </div>
            <div className="relative z-10 shrink-0">
              <span className="label block text-grave">Booking</span>
              <span className="mt-2 block text-base text-bone">{BAND.email}</span>
            </div>
            <span className="absolute inset-0 origin-left scale-x-0 bg-blood/8 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
