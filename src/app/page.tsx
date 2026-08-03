import Link from "next/link";
import HeroLineup from "@/components/HeroLineup";
import Marquee from "@/components/Marquee";
import Manifesto from "@/components/Manifesto";
import Music from "@/components/Music";
import Booking from "@/components/Booking";
import { Reveal } from "@/components/motion-primitives";
import { MEMBERS } from "@/data/band";

/** Cards pointing at the two sections that now live on their own routes. */
function Gateways() {
  const cards = [
    {
      href: "/history",
      eyebrow: "Chapter I — VI",
      title: "The History",
      body: "A name chosen before the first song, two voices that shouldn't fit, and nine trips to a podium across the Delhi-NCR circuit.",
      photo: "/photos/band-live.jpg",
    },
    {
      href: "/members",
      eyebrow: "Eight members",
      title: "The Band",
      body: "Kenya, Bangladesh, Manipur, Assam, Bihar, Bengal and Uttarakhand — each with their own page.",
      photo: "/photos/band-portrait.jpg",
    },
  ];

  return (
    <section className="edge-x py-20 sm:py-28">
      <div className="grid gap-6 lg:grid-cols-2">
        {cards.map((card, i) => (
          <Reveal key={card.href} delay={i * 0.08}>
            <Link
              href={card.href}
              className="group relative flex h-full min-h-[22rem] flex-col justify-end overflow-hidden border border-bone/12 p-8 sm:min-h-[26rem] sm:p-10"
            >
              <span
                className="absolute inset-0 -z-10 bg-cover bg-center opacity-30 grayscale transition-all duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-105 group-hover:opacity-45 group-hover:grayscale-0"
                style={{ backgroundImage: `url(${card.photo})` }}
              />
              <span className="absolute inset-0 -z-10 bg-gradient-to-t from-void via-void/70 to-void/30" />

              <span className="label text-blood">{card.eyebrow}</span>
              <span className="display mt-3 text-[clamp(2rem,5.5vw,3.5rem)] text-bone">
                {card.title}
              </span>
              <span className="mt-3 max-w-md text-sm leading-relaxed text-dust">
                {card.body}
              </span>
              <span className="mt-6 flex items-center gap-3">
                <span className="label text-bone/70 transition-colors group-hover:text-bone">
                  Explore
                </span>
                <span className="block h-px w-8 bg-bone/40 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:w-16 group-hover:bg-blood" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HeroLineup />
      <Marquee
        items={["Animosity", "Hard Rock / Metal", "Delhi-NCR", "Est. Greater Noida"]}
      />
      <Manifesto />
      <Gateways />
      <Music />
      <Marquee
        items={MEMBERS.map((m) => m.name)}
        duration={30}
        reverse
      />
      <Booking />
    </>
  );
}
