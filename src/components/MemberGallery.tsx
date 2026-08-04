"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The rest of a member's supplied photographs. Grayscale until hovered, in the
 * same hairline grid the rest of the site uses; clicking opens a lightbox that
 * steps through with the arrow keys.
 */
export default function MemberGallery({
  images,
  name,
  accent,
}: {
  images: string[];
  name: string;
  accent: string;
}) {
  const [open, setOpen] = useState<number | null>(null);

  const step = useCallback(
    (dir: number) =>
      setOpen((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, step]);

  if (images.length === 0) return null;

  return (
    <section className="edge-x py-16 sm:py-20">
      <div className="mb-8 flex items-baseline justify-between gap-4">
        <p className="label text-grave">On stage</p>
        <p className="label text-grave tabular-nums">
          {String(images.length).padStart(2, "0")} frames
        </p>
      </div>

      <div className="grid grid-cols-2 gap-px border border-bone/10 bg-bone/10 sm:grid-cols-3 lg:grid-cols-5">
        {images.map((src, i) => (
          <motion.button
            key={src}
            type="button"
            onClick={() => setOpen(i)}
            className="group relative aspect-4/5 overflow-hidden bg-void"
            aria-label={`${name} — photo ${i + 1} of ${images.length}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.7, delay: (i % 5) * 0.05, ease: EASE }}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className="object-cover grayscale transition-all duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-105 group-hover:grayscale-0"
            />
            <span
              className="absolute inset-0 opacity-40 mix-blend-color transition-opacity duration-700 group-hover:opacity-0"
              style={{ background: accent }}
            />
            <span
              className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
              style={{ background: accent }}
            />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-130 flex items-center justify-center p-4 sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${name} — photo ${open + 1}`}
          >
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Close"
              className="absolute inset-0 cursor-default bg-void/92 backdrop-blur-md"
            />

            <motion.div
              key={open}
              className="relative max-h-full w-auto"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <Image
                src={images[open]}
                alt={`${name} on stage`}
                width={1100}
                height={1650}
                sizes="90vw"
                className="max-h-[82svh] w-auto object-contain"
              />
              <span
                className="absolute inset-x-0 -bottom-px h-0.5"
                style={{ background: accent }}
              />
            </motion.div>

            {/* controls */}
            <div className="edge-x pointer-events-none absolute inset-x-0 bottom-6 flex items-center justify-between">
              <button
                type="button"
                onClick={() => step(-1)}
                className="pointer-events-auto label border border-bone/20 px-5 py-3 text-bone transition-colors hover:border-blood hover:bg-blood/15"
              >
                ← Prev
              </button>
              <span className="label text-dust tabular-nums">
                {String(open + 1).padStart(2, "0")} /{" "}
                {String(images.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={() => step(1)}
                className="pointer-events-auto label border border-bone/20 px-5 py-3 text-bone transition-colors hover:border-blood hover:bg-blood/15"
              >
                Next →
              </button>
            </div>

            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Close"
              className="absolute top-5 right-5 flex h-11 w-11 items-center justify-center border border-bone/20 bg-void/60 backdrop-blur transition-colors hover:border-blood hover:bg-blood/20"
            >
              <span className="relative block h-4 w-4">
                <span className="absolute top-1/2 left-0 block h-px w-full rotate-45 bg-bone" />
                <span className="absolute top-1/2 left-0 block h-px w-full -rotate-45 bg-bone" />
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
