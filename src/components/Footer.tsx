import Image from "next/image";
import { BAND, NAV } from "@/data/band";

export default function Footer() {
  return (
    <footer className="edge-x relative border-t border-bone/12 pt-16 pb-10">
      <div className="dotfield pointer-events-none absolute inset-0 -z-10 opacity-15" />

      <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
        <div className="max-w-md">
          <Image
            src="/brand/animosity-logo-glyph.png"
            alt="Animosity"
            width={1752}
            height={542}
            className="h-10 w-auto"
          />
          <p className="label mt-5 text-grave">{BAND.genre}</p>
          <p className="label mt-1 text-grave">{BAND.base}</p>
        </div>

        <div className="flex flex-wrap gap-12 sm:gap-20">
          <nav>
            <p className="label mb-4 text-grave">Sections</p>
            <ul className="space-y-2.5">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-dust transition-colors duration-300 hover:text-bone"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label mb-4 text-grave">Elsewhere</p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={BAND.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm text-dust transition-colors duration-300 hover:text-bone"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={BAND.youtube}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm text-dust transition-colors duration-300 hover:text-bone"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BAND.email}`}
                  className="text-sm text-dust transition-colors duration-300 hover:text-bone"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href={BAND.mediaKit}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm text-dust transition-colors duration-300 hover:text-bone"
                >
                  Media kit
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-3 border-t border-bone/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="label text-grave">
          © {new Date().getFullYear()} Animosity
        </p>
        <p className="label text-grave">Angst · Rebellion · A higher cause</p>
      </div>
    </footer>
  );
}
