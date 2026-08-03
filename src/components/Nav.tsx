"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { BAND, NAV } from "@/data/band";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Nav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 40));

  // Only the landing page has a full-bleed hero to sit transparently over.
  const overHero = pathname === "/";

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) =>
    href.startsWith("/#") ? false : pathname.startsWith(href);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-100 h-[var(--nav-h)]"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 0.15, ease: EASE }}
      >
        <div
          className={`absolute inset-0 -z-10 transition-all duration-500 ${
            solid || !overHero
              ? "border-b border-bone/10 bg-void/85 backdrop-blur-xl"
              : "border-b border-transparent bg-transparent"
          }`}
        />

        <nav className="edge-x flex h-full items-center justify-between gap-6">
          <Link href="/" aria-label="Animosity — home" className="relative block shrink-0">
            <Image
              src="/brand/animosity-logo-glyph.png"
              alt="Animosity"
              width={1752}
              height={542}
              priority
              className="h-6 w-auto sm:h-7"
            />
          </Link>

          <ul className="hidden items-center gap-9 lg:flex">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="group relative block py-2">
                  <span
                    className={`label transition-colors duration-300 group-hover:text-bone ${
                      isActive(item.href) ? "text-bone" : "text-dust"
                    }`}
                  >
                    {item.label}
                  </span>
                  <span
                    className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-blood transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100 ${
                      isActive(item.href) ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={BAND.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="hidden items-center gap-2 border border-bone/15 px-4 py-2.5 transition-colors duration-300 hover:border-blood hover:bg-blood/10 sm:flex"
            >
              <span className="label text-bone">Follow</span>
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative z-110 flex h-11 w-11 flex-col items-center justify-center gap-1.5 border border-bone/15 transition-colors hover:border-blood lg:hidden"
            >
              <motion.span
                className="block h-px w-5 bg-bone"
                animate={open ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
              />
              <motion.span
                className="block h-px w-5 bg-bone"
                animate={open ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-90 flex flex-col justify-center bg-void lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="dotfield pointer-events-none absolute inset-0 opacity-25" />
            <ul className="edge-x relative space-y-2">
              {NAV.map((item, i) => (
                <li key={item.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.75, delay: 0.12 + i * 0.06, ease: EASE }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="display block py-2 text-[clamp(2.75rem,13vw,5rem)] text-bone transition-colors hover:text-blood"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
            <div className="edge-x relative mt-14 space-y-1">
              <a href={`mailto:${BAND.email}`} className="label block text-dust">
                {BAND.email}
              </a>
              <a
                href={BAND.instagram}
                target="_blank"
                rel="noreferrer noopener"
                className="label block text-dust"
              >
                {BAND.instagramHandle}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
