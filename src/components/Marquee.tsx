"use client";

import { motion } from "motion/react";

/**
 * Endless ticker strip — the band name repeating across a hairline band,
 * echoing the vertical spine text ("MEMBER GALLERY", "BATTLE OF BANDS")
 * running down every page of the media kit.
 */
export default function Marquee({
  items,
  duration = 26,
  reverse = false,
  className = "",
}: {
  items: string[];
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  const track = [...items, ...items];

  return (
    <div
      className={`relative flex overflow-hidden border-y border-bone/10 py-4 select-none ${className}`}
      aria-hidden
    >
      <motion.div
        className="flex shrink-0 items-center gap-10 pr-10"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {track.map((item, i) => (
          <span key={i} className="flex shrink-0 items-center gap-10">
            <span className="display text-2xl whitespace-nowrap text-bone/70 sm:text-3xl">
              {item}
            </span>
            <span className="block h-1.5 w-1.5 rotate-45 bg-blood" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
