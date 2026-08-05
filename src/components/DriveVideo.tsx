"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { driveEmbedSrc } from "@/data/band";

/**
 * The band's own footage of a track, hosted on Google Drive.
 *
 * Drive gives no public thumbnail without an API key, so the facade is drawn
 * rather than fetched — which is fine, since the point of the facade is to
 * keep a dozen Drive iframes off the page until one is actually wanted.
 *
 * Pass `share` as either the bare file id or the whole share URL. The file
 * must be set to "anyone with the link can view", otherwise the embed renders
 * a Google sign-in wall instead of the video.
 */
export default function DriveVideo({
  share,
  title,
  accent,
}: {
  share?: string;
  title: string;
  accent: string;
}) {
  const [active, setActive] = useState(false);

  // Deliberately not aspect-video: an empty 16:9 well reads as a broken player
  // rather than as a slot waiting to be filled.
  if (!share) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-3 border border-dashed border-bone/20 bg-carbon/30 px-6 py-10 text-center">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-full border border-bone/20"
          aria-hidden
        >
          <span className="ml-0.5 block h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-bone/35" />
        </span>
        <p className="label text-grave">Our take — not up yet</p>
        <p className="max-w-md text-xs leading-relaxed text-grave">
          Live footage of {title} goes here. Drop the Google Drive share link into{" "}
          <code className="font-mono">drive:</code> on this track in{" "}
          <code className="font-mono">src/data/band.ts</code>.
        </p>
      </div>
    );
  }

  return (
    <div className="group relative aspect-video w-full overflow-hidden border border-bone/12 bg-carbon">
      {active ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={driveEmbedSrc(share)}
          title={`Animosity — ${title} (live)`}
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label={`Play Animosity's ${title}`}
          className="absolute inset-0 h-full w-full cursor-pointer"
        >
          <span
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 50% 45%, color-mix(in srgb, ${accent} 22%, transparent), transparent 68%)`,
            }}
          />
          <span className="dotfield absolute inset-0 opacity-20" />

          <motion.span
            className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-bone/40 backdrop-blur-sm transition-colors duration-500 sm:h-20 sm:w-20"
            style={{ borderColor: `color-mix(in srgb, ${accent} 70%, transparent)` }}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="ml-1 block h-0 w-0 border-y-[9px] border-l-[15px] border-y-transparent border-l-bone" />
          </motion.span>

          <span className="label absolute bottom-5 left-5 text-bone/75 transition-colors group-hover:text-bone">
            Play — {title}, live
          </span>
        </button>
      )}
    </div>
  );
}
