"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SETLIST, memberBySlug, type SetGroup, type SetSection, type SetTrack } from "@/data/band";
import LiteYouTube from "./LiteYouTube";
import TrackPreview from "./TrackPreview";
import DriveVideo from "./DriveVideo";

const EASE = [0.16, 1, 0.3, 1] as const;

const two = (n: number) => String(n).padStart(2, "0");

/* ------------------------------------------------------------------ */
/* Plus / minus, shared by all three tiers of the accordion            */
/* ------------------------------------------------------------------ */

function Toggle({ open, color, size = 8 }: { open: boolean; color: string; size?: number }) {
  return (
    <span
      className="relative flex shrink-0 items-center justify-center"
      style={{ height: `${size * 0.25}rem`, width: `${size * 0.25}rem` }}
      aria-hidden
    >
      <span
        className="block h-px transition-colors duration-500"
        style={{ width: `${size * 0.125}rem`, background: color }}
      />
      <motion.span
        className="absolute block w-px"
        style={{ height: `${size * 0.125}rem`, background: color }}
        animate={{ scaleY: open ? 0 : 1 }}
        transition={{ duration: 0.45, ease: EASE }}
      />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Panel — height-auto collapse, used at every tier                    */
/* ------------------------------------------------------------------ */

function Panel({
  id,
  open,
  children,
}: {
  id: string;
  open: boolean;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          id={id}
          key="panel"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{
            height: { duration: 0.6, ease: EASE },
            opacity: { duration: 0.35, ease: "easeOut" },
          }}
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* One track                                                           */
/* ------------------------------------------------------------------ */

function Track({
  track,
  position,
  open,
  onToggle,
  level,
}: {
  track: SetTrack;
  position: number;
  open: boolean;
  onToggle: () => void;
  /** h3 when the section has no group tier above this row, h4 when it does */
  level: 3 | 4;
}) {
  const isOriginal = track.artist === "Animosity";
  const panelId = `track-${track.slug}`;
  const Heading = level === 3 ? "h3" : "h4";

  return (
    <div className="border-b border-bone/10">
      <Heading>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="edge-x group relative flex w-full items-center gap-4 py-5 text-left sm:gap-7 sm:py-6"
        >
          {/* accent wash — held while open, brushed in on hover */}
          <span
            className="pointer-events-none absolute inset-0 origin-left transition-transform duration-700 ease-[var(--ease-out-expo)]"
            style={{
              background: `linear-gradient(90deg, color-mix(in srgb, ${track.accent} 14%, transparent), transparent 62%)`,
              transform: open ? "scaleX(1)" : "scaleX(0)",
            }}
          />
          <span
            className="pointer-events-none absolute inset-0 origin-left scale-x-0 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
            style={{
              background: `linear-gradient(90deg, color-mix(in srgb, ${track.accent} 9%, transparent), transparent 55%)`,
            }}
          />

          <span
            className="label relative shrink-0 tabular-nums transition-colors duration-500"
            style={{ color: open ? track.accent : undefined }}
          >
            {two(position)}
          </span>

          <span className="relative min-w-0 flex-1">
            <span className="display block truncate text-[clamp(1.35rem,4.4vw,2.75rem)] text-bone transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-2">
              {track.title}
            </span>
            <span className="label mt-1.5 block truncate text-grave lg:hidden">
              {isOriginal ? "Animosity original" : track.artist}
            </span>
          </span>

          <span className="label relative hidden shrink-0 text-grave lg:block">
            {isOriginal ? "Animosity original" : track.artist}
          </span>

          <Toggle open={open} color={open ? track.accent : "var(--color-dust)"} />
        </button>
      </Heading>

      <Panel id={panelId} open={open}>
        <div className="edge-x grid gap-9 pt-1 pb-12 lg:grid-cols-12 lg:gap-12">
          {/* Originals carry no sleeve alongside them, so the prose takes the room back. */}
          <div
            className={`lg:col-start-2 ${track.artwork ? "lg:col-span-6" : "lg:col-span-8"}`}
          >
            <p className="label mb-3" style={{ color: track.accent }}>
              {isOriginal ? "The story" : "The song"}
            </p>
            <p className="text-base leading-relaxed text-bone/90 sm:text-lg">{track.note}</p>

            <p className="label mt-8 mb-3 text-grave">What it brings</p>
            <p className="text-base leading-relaxed text-dust">{track.angle}</p>

            {track.credits && track.credits.length > 0 && (
              <>
                <p className="label mt-8 mb-3 text-grave">Credits</p>
                <ul className="space-y-1.5">
                  {track.credits.map((credit) => (
                    <li key={credit} className="text-sm text-dust">
                      {credit}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {track.spotlight && track.spotlight.length > 0 && (
              <>
                <p className="label mt-8 mb-3 text-grave">Carried by</p>
                <ul className="flex flex-wrap gap-2">
                  {track.spotlight.map((slug) => {
                    const member = memberBySlug(slug);
                    if (!member) return null;
                    return (
                      <li key={slug}>
                        <Link
                          href={`/members/${member.slug}`}
                          className="flex items-center gap-2.5 border border-bone/15 py-1.5 pr-3.5 pl-3 transition-colors duration-400 hover:border-bone/40"
                        >
                          <span
                            className="block h-1.5 w-1.5 rotate-45"
                            style={{ background: member.accent }}
                          />
                          <span className="text-sm whitespace-nowrap text-bone">
                            {member.name}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </div>

          {track.artwork && (
            <div className="lg:col-span-4">
              <p className="label mb-3 text-grave">Hear the original</p>
              <TrackPreview track={track} />
            </div>
          )}

          <div className="lg:col-span-10 lg:col-start-2">
            <p className="label mb-3 text-grave">
              {track.youtubeId ? "Our video" : "Us playing it"}
            </p>
            {track.youtubeId ? (
              <LiteYouTube
                id={track.youtubeId}
                title={`Animosity — ${track.title} (Official Music Video)`}
              />
            ) : (
              <DriveVideo share={track.drive} title={track.title} accent={track.accent} />
            )}
          </div>
        </div>
      </Panel>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* One group — the English / Hindi tier inside Covers                  */
/* ------------------------------------------------------------------ */

function Group({
  group,
  sectionAccent,
  open,
  onToggle,
  openTrack,
  setOpenTrack,
}: {
  group: SetGroup;
  sectionAccent: string;
  open: boolean;
  onToggle: () => void;
  openTrack: string | null;
  setOpenTrack: (key: string | null) => void;
}) {
  const tracks = group.tracks.map((track, i) => (
    <Track
      key={track.slug}
      track={track}
      position={i + 1}
      level={group.label ? 4 : 3}
      open={openTrack === `${group.id}:${track.slug}`}
      onToggle={() =>
        setOpenTrack(
          openTrack === `${group.id}:${track.slug}` ? null : `${group.id}:${track.slug}`,
        )
      }
    />
  ));

  // A section with a single unlabelled group drops this tier entirely.
  if (!group.label) return <div className="border-t border-bone/12">{tracks}</div>;

  const panelId = `group-${group.id}`;

  return (
    <div className="border-t border-bone/12">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="edge-x group flex w-full items-center gap-4 py-6 text-left sm:gap-6"
        >
          <span
            className="block h-px shrink-0 transition-all duration-600 ease-[var(--ease-out-expo)]"
            style={{
              width: open ? "3rem" : "1.25rem",
              background: open ? sectionAccent : "var(--color-grave)",
            }}
            aria-hidden
          />
          <span className="display text-[clamp(1.5rem,3.8vw,2.5rem)] text-bone">
            {group.label}
          </span>
          {group.badge && (
            <span
              className="label hidden shrink-0 border px-2.5 py-1 sm:block"
              style={{
                color: sectionAccent,
                borderColor: `color-mix(in srgb, ${sectionAccent} 40%, transparent)`,
              }}
            >
              {group.badge}
            </span>
          )}
          <span className="ml-auto flex items-center gap-4 sm:gap-6">
            <span className="label tabular-nums text-grave">{two(group.tracks.length)}</span>
            <Toggle open={open} color={open ? sectionAccent : "var(--color-dust)"} size={7} />
          </span>
        </button>
      </h3>

      {group.badge && (
        <p className="edge-x label -mt-2 pb-4 sm:hidden" style={{ color: sectionAccent }}>
          {group.badge}
        </p>
      )}

      <Panel id={panelId} open={open}>
        {group.blurb && (
          <p className="edge-x max-w-2xl pb-7 text-sm leading-relaxed text-dust">{group.blurb}</p>
        )}
        <div className="border-t border-bone/10">{tracks}</div>
      </Panel>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* One section — Originals / Covers                                    */
/* ------------------------------------------------------------------ */

function Section({
  section,
  open,
  onToggle,
  openGroups,
  toggleGroup,
  openTrack,
  setOpenTrack,
}: {
  section: SetSection;
  open: boolean;
  onToggle: () => void;
  openGroups: string[];
  toggleGroup: (id: string) => void;
  openTrack: string | null;
  setOpenTrack: (key: string | null) => void;
}) {
  const count = section.groups.reduce((n, g) => n + g.tracks.length, 0);
  const panelId = `section-${section.id}`;

  return (
    <section id={section.id} className="scroll-mt-24 border-t border-bone/20">
      <h2>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="edge-x group relative flex w-full items-center gap-5 py-9 text-left sm:gap-8 sm:py-12"
        >
          <span
            className="pointer-events-none absolute inset-0 origin-left transition-transform duration-800 ease-[var(--ease-out-expo)]"
            style={{
              background: `linear-gradient(90deg, color-mix(in srgb, ${section.accent} 12%, transparent), transparent 55%)`,
              transform: open ? "scaleX(1)" : "scaleX(0)",
            }}
          />

          <span
            className="label relative hidden shrink-0 tabular-nums sm:block"
            style={{ color: section.accent }}
          >
            [{section.index}]
          </span>

          <span className="relative min-w-0 flex-1">
            <span className="label block" style={{ color: section.accent }}>
              {section.kicker}
            </span>
            <span className="display mt-2 block text-[clamp(2.5rem,9vw,6.5rem)] text-bone transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-2">
              {section.title}
            </span>
          </span>

          <span className="relative flex shrink-0 items-center gap-5 sm:gap-8">
            <span className="hidden text-right sm:block">
              <span className="display block text-3xl tabular-nums text-bone/80">{two(count)}</span>
              <span className="label mt-1 block text-grave">tracks</span>
            </span>
            <Toggle open={open} color={open ? section.accent : "var(--color-dust)"} size={10} />
          </span>
        </button>
      </h2>

      <Panel id={panelId} open={open}>
        <p className="edge-x max-w-2xl pb-9 text-base leading-relaxed text-dust sm:text-lg">
          {section.standfirst}
        </p>
        {section.groups.map((group) => (
          <Group
            key={group.id}
            group={group}
            sectionAccent={section.accent}
            open={openGroups.includes(group.id)}
            onToggle={() => toggleGroup(group.id)}
            openTrack={openTrack}
            setOpenTrack={setOpenTrack}
          />
        ))}
      </Panel>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export default function Setlist() {
  // Both sections and the standing English set start open; the Hindi set is
  // request-only, so it starts folded away.
  const [openSections, setOpenSections] = useState<string[]>(SETLIST.map((s) => s.id));
  const [openGroups, setOpenGroups] = useState<string[]>(["covers-english"]);
  const [openTrack, setOpenTrack] = useState<string | null>(null);

  const flip = (list: string[], id: string) =>
    list.includes(id) ? list.filter((x) => x !== id) : [...list, id];

  return (
    <div className="border-b border-bone/20">
      {SETLIST.map((section) => (
        <Section
          key={section.id}
          section={section}
          open={openSections.includes(section.id)}
          onToggle={() => setOpenSections((prev) => flip(prev, section.id))}
          openGroups={openGroups}
          toggleGroup={(id) => setOpenGroups((prev) => flip(prev, id))}
          openTrack={openTrack}
          setOpenTrack={setOpenTrack}
        />
      ))}
    </div>
  );
}
