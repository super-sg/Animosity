"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { SetTrack } from "@/data/band";

/**
 * Only one preview may sound at a time, anywhere on the page. Module scope
 * rather than context because the accordions mount and unmount constantly and
 * the rule needs to hold across all of them regardless.
 */
let sounding: HTMLAudioElement | null = null;

const clock = (seconds: number) => {
  const s = Math.max(0, Math.floor(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

/**
 * The original recording, with its own sleeve: Apple's cover art over Apple's
 * 30-second preview clip. No SDK, no cookie-dropping embed — just an <audio>
 * tag and a square image, so it can be styled like the rest of the site.
 */
export default function TrackPreview({ track }: { track: SetTrack }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [at, setAt] = useState(0);
  const [length, setLength] = useState(30);
  const [failed, setFailed] = useState(false);

  // Never leave a clip sounding after its row has collapsed.
  useEffect(
    () => () => {
      const el = audioRef.current;
      if (!el) return;
      el.pause();
      if (sounding === el) sounding = null;
    },
    [],
  );

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      if (sounding && sounding !== el) sounding.pause();
      sounding = el;
      el.play().catch(() => setFailed(true));
    } else {
      el.pause();
    }
  };

  const playable = Boolean(track.preview) && !failed;
  const progress = length ? Math.min(1, at / length) : 0;

  return (
    <figure className="border border-bone/12 bg-carbon/50">
      <div className="flex items-stretch gap-4 p-4">
        {/* Sleeve doubles as the play control */}
        <button
          type="button"
          onClick={toggle}
          disabled={!playable}
          aria-label={
            playing
              ? `Pause the preview of ${track.title}`
              : `Play a preview of ${track.title} by ${track.artist}`
          }
          className="group relative h-24 w-24 shrink-0 overflow-hidden border border-bone/12 disabled:cursor-default sm:h-28 sm:w-28"
        >
          {track.artwork && (
            <Image
              src={track.artwork}
              alt={`${track.album ?? track.title} — cover art`}
              fill
              sizes="112px"
              className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-enabled:group-hover:scale-105"
            />
          )}
          <span
            className={`absolute inset-0 bg-void/55 transition-opacity duration-400 ${
              playing ? "opacity-35" : "group-enabled:group-hover:opacity-40 opacity-60"
            }`}
          />
          {playable && (
            <span
              className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-sm transition-colors duration-400"
              style={{
                borderColor: playing ? track.accent : "color-mix(in srgb, #f2f0ee 55%, transparent)",
                background: playing
                  ? `color-mix(in srgb, ${track.accent} 22%, transparent)`
                  : undefined,
              }}
            >
              {playing ? (
                <span className="flex gap-1">
                  <span className="block h-3.5 w-1 bg-bone" />
                  <span className="block h-3.5 w-1 bg-bone" />
                </span>
              ) : (
                <span className="ml-0.5 block h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-bone" />
              )}
            </span>
          )}
        </button>

        <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
          <div>
            <p className="text-base leading-snug font-semibold text-balance text-bone">
              {track.title}
            </p>
            <p className="mt-1 text-sm text-dust">{track.artist}</p>
            {(track.album || track.year) && (
              <p className="label mt-2 text-grave">
                {[track.album, track.year].filter(Boolean).join(" · ")}
              </p>
            )}
          </div>

          {playable && (
            <div className="mt-4">
              <div className="h-px w-full bg-bone/15">
                <div
                  className="h-px origin-left"
                  style={{
                    background: track.accent,
                    transform: `scaleX(${progress})`,
                    transition: playing ? "transform 250ms linear" : "transform 300ms ease-out",
                  }}
                />
              </div>
              <p className="label mt-2 tabular-nums text-grave">
                {clock(at)} / {clock(length)} — preview
              </p>
            </div>
          )}
        </div>
      </div>

      <figcaption className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-bone/10 px-4 py-3">
        <span className="label text-grave">
          {playable ? "Original recording · 30s" : "Original recording"}
        </span>
        <a
          href={`https://music.apple.com/search?term=${encodeURIComponent(
            `${track.artist} ${track.title}`,
          )}`}
          target="_blank"
          rel="noreferrer noopener"
          className="label text-dust underline decoration-bone/25 underline-offset-4 transition-colors hover:text-bone"
        >
          Full track ↗
        </a>
      </figcaption>

      {track.preview && (
        <audio
          ref={audioRef}
          src={track.preview}
          preload="none"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => {
            setPlaying(false);
            setAt(0);
          }}
          onLoadedMetadata={(e) => {
            const d = e.currentTarget.duration;
            if (Number.isFinite(d) && d > 0) setLength(d);
          }}
          onTimeUpdate={(e) => setAt(e.currentTarget.currentTime)}
          onError={() => setFailed(true)}
        />
      )}
    </figure>
  );
}
