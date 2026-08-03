import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import MemberGrid from "@/components/MemberGrid";
import { Reveal, SectionLabel } from "@/components/motion-primitives";
import { MEMBERS, RIDER } from "@/data/band";

export const metadata: Metadata = {
  title: "Members",
  description:
    "The eight members of Animosity — a physiotherapist, a biotech PhD, a CEO and an animator, out of Kenya, Bangladesh and five Indian states.",
};

/** Group the line-up by what they actually do on stage. */
const SECTIONS = [
  { title: "Vocals", instruments: ["Lead Vocals", "Harsh Vocals"] },
  { title: "Guitars", instruments: ["Guitar"] },
  { title: "Low end", instruments: ["Bass"] },
  { title: "Drums", instruments: ["Drums"] },
];

export default function MembersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Member gallery"
        title={["Eight", "of us"]}
        standfirst="Choir singers and death-metal growlers in the same line-up. A physiotherapist, a biotech PhD, a tech CEO and a 3D animator. It should not work."
        photo="/photos/band-portrait.jpg"
      >
        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4">
          {SECTIONS.map((section) => {
            const count = MEMBERS.filter((m) =>
              section.instruments.includes(m.instrument),
            ).length;
            return (
              <div key={section.title} className="flex items-baseline gap-2.5">
                <span className="display text-2xl text-blood tabular-nums">
                  {String(count).padStart(2, "0")}
                </span>
                <span className="label text-grave">{section.title}</span>
              </div>
            );
          })}
        </div>
      </PageHeader>

      <section className="pb-20 sm:pb-28">
        <MemberGrid />
      </section>

      {/* Where everyone comes from */}
      <section className="edge-x pb-20 sm:pb-28">
        <SectionLabel index="02">Origins</SectionLabel>
        <Reveal delay={0.05} className="mt-8">
          <h2 className="display text-[clamp(2rem,6vw,4.5rem)] text-bone">
            Five states,
            <br />
            <span className="text-blood">three countries</span>
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-px border border-bone/10 bg-bone/10 sm:grid-cols-2 lg:grid-cols-4">
          {MEMBERS.map((member) => (
            <li key={member.slug} className="bg-void p-6">
              <Link href={`/members/${member.slug}`} className="group block">
                <span
                  className="block h-1 w-8 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:w-16"
                  style={{ background: member.accent }}
                />
                <span className="mt-4 block text-base font-semibold text-bone">
                  {member.from}
                </span>
                <span className="label mt-1.5 block text-grave">{member.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Stage plot */}
      <section className="edge-x pb-24 sm:pb-32">
        <SectionLabel index="03">Stage plot</SectionLabel>
        <Reveal delay={0.05} className="mt-8">
          <h2 className="display text-[clamp(2rem,6vw,4.5rem)] text-bone">
            What we need
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-dust">
            Straight out of the technical rider. Full version lives in the media kit.
          </p>
        </Reveal>

        <div className="mt-10 border border-bone/12">
          {RIDER.map((row) => (
            <div
              key={row.description}
              className="grid gap-3 border-b border-bone/10 p-6 last:border-b-0 lg:grid-cols-12 lg:gap-6"
            >
              <div className="lg:col-span-3">
                <p className="text-base font-semibold text-bone">{row.description}</p>
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
      </section>
    </>
  );
}
