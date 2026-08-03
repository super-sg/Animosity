"use client";

import { useState } from "react";
import { motion } from "motion/react";

/**
 * Click-to-load YouTube facade. Shows the poster frame until the user
 * actually wants the video, so the page doesn't pull in the YouTube
 * player (and its cookies) on first paint.
 */
export default function LiteYouTube({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const [active, setActive] = useState(false);

  return (
    <div className="group relative aspect-video w-full overflow-hidden border border-bone/12 bg-carbon">
      {active ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="absolute inset-0 h-full w-full cursor-pointer"
          aria-label={`Play ${title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-[var(--ease-out-expo)] group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-void/85 via-void/25 to-void/40 transition-opacity duration-500 group-hover:opacity-80" />

          <motion.span
            className="absolute top-1/2 left-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-bone/40 backdrop-blur-sm transition-colors duration-500 group-hover:border-blood group-hover:bg-blood/25 sm:h-24 sm:w-24"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="ml-1.5 block h-0 w-0 border-y-[11px] border-l-[18px] border-y-transparent border-l-bone" />
          </motion.span>

          <span className="label absolute bottom-5 left-5 text-bone/80 sm:bottom-7 sm:left-7">
            Play — Official Music Video
          </span>
        </button>
      )}
    </div>
  );
}
