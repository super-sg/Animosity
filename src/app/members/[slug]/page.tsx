import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MEMBERS, SONGS, memberBySlug } from "@/data/band";
import { Reveal } from "@/components/motion-primitives";
import MemberIntro from "@/components/MemberIntro";
import MemberGallery from "@/components/MemberGallery";

type Params = { slug: string };

export function generateStaticParams() {
  return MEMBERS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = memberBySlug(slug);
  if (!member) return { title: "Member not found" };

  return {
    title: `${member.name} — ${member.role}`,
    description: member.tagline,
    openGraph: {
      title: `${member.name} — ${member.role} | Animosity`,
      description: member.tagline,
      images: [{ url: member.photo }],
    },
  };
}

export default async function MemberPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const member = memberBySlug(slug);
  if (!member) notFound();

  const index = MEMBERS.findIndex((m) => m.slug === member.slug);
  const prev = MEMBERS[(index - 1 + MEMBERS.length) % MEMBERS.length];
  const next = MEMBERS[(index + 1) % MEMBERS.length];
  const bandmates = MEMBERS.filter((m) => m.slug !== member.slug);
  const tracks = SONGS.filter((s) => s.players.includes(member.slug));

  return (
    <>
      <MemberIntro member={member} index={index} total={MEMBERS.length} />

      {/* Biography */}
      <section className="edge-x py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="label mb-6 text-grave">About</p>
            <div className="space-y-6">
              {member.bio.map((para, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p
                    className={
                      i === 0
                        ? "text-xl leading-relaxed text-bone sm:text-2xl"
                        : "text-base leading-relaxed text-bone/80 sm:text-lg"
                    }
                  >
                    {para}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1} className="mt-10 border-l-2 pl-5" >
              <div style={{ borderColor: member.accent }}>
                <p className="label mb-2 text-grave">Away from the band</p>
                <p className="text-base text-bone/85">{member.offstage}</p>
              </div>
            </Reveal>
          </div>

          {/* Spec table */}
          <aside className="lg:col-span-5">
            <div className="border border-bone/12">
              <p
                className="label border-b border-bone/12 px-5 py-4"
                style={{ color: member.accent }}
              >
                At a glance
              </p>
              <dl>
                {member.facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex items-baseline justify-between gap-4 border-b border-bone/10 px-5 py-4 last:border-b-0"
                  >
                    <dt className="label text-grave">{fact.label}</dt>
                    <dd className="text-right text-sm text-bone">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Gear, from the rider */}
            <div className="mt-6 border border-bone/12">
              <p className="label border-b border-bone/12 px-5 py-4 text-grave">
                On stage
              </p>
              <ul className="space-y-3 px-5 py-5">
                {member.gear.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-bone/85">
                    <span
                      className="mt-1.5 block h-1.5 w-1.5 shrink-0 rotate-45"
                      style={{ background: member.accent }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Contributions */}
      <section className="edge-x py-16 sm:py-20">
        <p className="label mb-8 text-grave">What they bring</p>
        <ul className="grid gap-px border border-bone/10 bg-bone/10 sm:grid-cols-2">
          {member.contributions.map((item, i) => (
            <li key={item} className="group relative overflow-hidden bg-void p-7">
              <span
                className="display block text-2xl tabular-nums opacity-30"
                style={{ color: member.accent }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 text-base leading-relaxed text-bone/90">{item}</p>
              <span
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                style={{ background: member.accent }}
              />
            </li>
          ))}
        </ul>
      </section>

      <MemberGallery
        images={member.gallery}
        name={member.name}
        accent={member.accent}
      />

      {/* Tracks they're named on */}
      {tracks.length > 0 && (
        <section className="edge-x py-16 sm:py-20">
          <p className="label mb-8 text-grave">Credited on</p>
          <ul className="border-t border-bone/12">
            {tracks.map((song) => (
              <li key={song.slug} className="border-b border-bone/12">
                <Link href="/#music" className="group flex items-baseline gap-6 py-6">
                  <span
                    className="label shrink-0 tabular-nums"
                    style={{ color: song.accent }}
                  >
                    {song.index}
                  </span>
                  <span className="display flex-1 text-[clamp(1.35rem,4vw,2.5rem)] text-bone transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-2">
                    {song.title}
                  </span>
                  <span className="label hidden shrink-0 text-grave sm:block">
                    {song.credits.find((c) => c.includes(member.name.split(" ").pop() ?? "")) ??
                      song.tag}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Influences */}
      <section className="edge-x py-16 sm:py-20">
        <p className="label mb-8 text-grave">Listens to</p>
        <ul className="flex flex-wrap gap-3">
          {member.influences.map((influence) => (
            <li
              key={influence}
              className="border px-5 py-3 text-base text-bone/85 transition-colors duration-400 hover:text-bone"
              style={{
                borderColor: `color-mix(in srgb, ${member.accent} 40%, transparent)`,
              }}
            >
              {influence}
            </li>
          ))}
        </ul>
      </section>

      {/* Prev / next */}
      <section className="edge-x py-16">
        <div className="grid gap-px border border-bone/10 bg-bone/10 sm:grid-cols-2">
          {[
            { member: prev, dir: "Previous", align: "" },
            { member: next, dir: "Next", align: "sm:text-right sm:items-end" },
          ].map(({ member: m, dir, align }) => (
            <Link
              key={dir}
              href={`/members/${m.slug}`}
              className={`group flex flex-col gap-2 bg-void p-8 transition-colors duration-500 ${align}`}
            >
              <span className="label text-grave">{dir}</span>
              <span className="display text-2xl text-bone transition-colors duration-500 sm:text-3xl">
                {m.name}
              </span>
              <span className="label" style={{ color: m.accent }}>
                {m.role}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Rest of the band */}
      <section className="edge-x pb-24 sm:pb-32">
        <p className="label mb-8 text-grave">The rest of them</p>
        <ul className="grid grid-cols-3 gap-px border border-bone/10 bg-bone/10 sm:grid-cols-4 lg:grid-cols-7">
          {bandmates.map((m) => (
            <li key={m.slug}>
              <Link
                href={`/members/${m.slug}`}
                className="group relative block aspect-3/4 overflow-hidden bg-void"
                aria-label={m.name}
              >
                <Image
                  src={m.photo}
                  alt={m.name}
                  fill
                  sizes="(max-width: 640px) 33vw, 14vw"
                  className="object-cover grayscale transition-all duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105 group-hover:grayscale-0"
                />
                <span
                  className="absolute inset-0 opacity-50 mix-blend-color transition-opacity duration-500 group-hover:opacity-0"
                  style={{ background: m.accent }}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-void/90 to-transparent" />
                <span className="label absolute inset-x-0 bottom-2 px-2 text-center text-[0.55rem] text-bone/70">
                  {m.role}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
