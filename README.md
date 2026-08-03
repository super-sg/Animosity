# Animosity — band site

Portfolio site for **Animosity**, a hard rock / metal band out of Greater Noida, Delhi-NCR.
Built with Next.js 16 (App Router), Tailwind v4, Motion and Lenis.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Editing content

**Almost everything lives in one file: [`src/data/band.ts`](src/data/band.ts).**
Change it there and the whole site follows — no component edits needed.

| What | Export | Notes |
|---|---|---|
| Name, genre, email, socials, manifesto | `BAND` | |
| The three originals + their stories | `SONGS` | see below |
| Battle of Bands results | `ACHIEVEMENTS` | auto-splits into 1st / 2nd groups |
| Headline numbers | `STATS` | |
| The eight members | `MEMBERS` | each has its own `accent` colour |
| History chapters | `HISTORY` | see below |
| Technical rider | `RIDER` | |
| Nav links | `NAV` | |

### ⚠️ Placeholder copy to replace

Three things were written from the media kit rather than supplied by the band, and are
flagged in the UI with an amber note so nobody ships them by accident:

1. **Song stories** — `SONGS[].story`. Replace with the band's own account of each track,
   then set `isPlaceholderStory: false` to remove the warning.
2. **History chapters** — `HISTORY[].body` and `.title`. Real dates and beats need
   confirming. Set `isPlaceholder: false` once they're right.
3. **Song title spelling** — the media kit spells the third track *"Casualty of War"*; the
   site uses **"Kezualty of War"** as supplied. Pick one and make it consistent.

`Mental Distortion` and `Kezualty of War` have no video yet. Add a `youtubeId` to either
entry in `SONGS` and a play link appears automatically.

## Design language

Taken from the Media Kit 2026 rather than invented:

- **Ground** near-black `#050505`, **primary** blood red `#E11D2E`, type in bone `#F2F0EE`.
- **Per-member accents** — red, green, orange, blue, violet — pulled from each member's
  page in the kit. They drive the member cards, detail sheets and song rows.
- **Type** — Anton for display (the kit's heavy condensed headers), Archivo for body,
  JetBrains Mono for the small technical labels that echo the rider table.
- **Texture** — film grain, halftone dot fields and hairline rules, standing in for the
  kit's grunge and cross-hatch layers.

Tokens are defined in [`src/app/globals.css`](src/app/globals.css) under `@theme`.

## Assets

| Path | Source |
|---|---|
| `public/video/hero-backdrop.mp4` | the band's own stage LED backdrop — see below |
| `public/photos/*.jpg` | extracted from the media kit PDF; colour grading is done in CSS, not baked in |
| `public/brand/animosity-logo-glyph.png` | wordmark with the sticker outline stripped, so the neon glow traces the letterforms |
| `public/brand/animosity-logo-white.png` | wordmark with its white sticker outline inverted (alternative treatment) |
| `public/media-kit/…pdf` | the full kit, linked from the booking section |
| `media-kit/` | untouched originals — not served, not committed |

### The hero video

Encoded from `Animosity Backdrop Normal 16_9 .mp4` (the stage visual). Three things
were done to it, and they matter if you ever re-cut it:

1. **The top 270px are cropped off.** The source has the wordmark burned into its top
   third, which would ghost behind the real logo. Cropping leaves the eyes along the top
   edge of the frame — that's why the hero's parallax starts at `scale: 1` rather than
   zoomed in, so they aren't clipped at rest.
2. **The audio track is stripped.** It's dead weight on a muted background loop and some
   browsers are fussier about autoplaying video that carries one.
3. **H.264 only, crf 32, 24fps, faststart.** 13MB → 974KB with no visible loss once
   darkened. VP9/WebM was tried and came out *larger* on this grainy source, so there's
   no webm to keep in sync.

To regenerate after editing the source:

```bash
ffmpeg -i "source.mp4" -an -r 24 -vf "crop=1280:450:0:270" \
  -c:v libx264 -crf 32 -preset veryslow -pix_fmt yuv420p \
  -movflags +faststart public/video/hero-backdrop.mp4
ffmpeg -i public/video/hero-backdrop.mp4 -frames:v 1 -q:v 3 public/video/hero-poster.jpg
```

The poster is the video's own first frame, so there's no jump when playback starts. An
`IntersectionObserver` in [`Hero.tsx`](src/components/Hero.tsx) pauses decoding once the
hero scrolls out of view, and `prefers-reduced-motion` holds it on the poster.

### The media kit PDF

The original is 38MB — too big to hand a promoter on mobile. The served copy is
rasterised at 150dpi and rebuilt as JPEG-backed pages: **38MB → 4MB**, text still crisp
at screen size. The trade-off is that its text is no longer selectable or searchable.
The original is untouched in `media-kit/` if you need it. To redo:

```bash
pdftoppm -r 150 -jpeg -jpegopt quality=82 "media-kit/<original>.pdf" /tmp/pg
# then combine /tmp/pg-*.jpg into a PDF (PIL: Image.save(..., save_all=True))
```

## Motion

Lenis drives inertial scrolling ([`SmoothScroll.tsx`](src/components/SmoothScroll.tsx));
anchor links are routed through it so they ease rather than snap. Shared entrance
animations live in [`motion-primitives.tsx`](src/components/motion-primitives.tsx).

The history timeline is a pinned section that travels horizontally as you scroll
([`History.tsx`](src/components/History.tsx)). Below `lg`, or when the visitor asks for
reduced motion, it falls back to a plain vertical stack.

`prefers-reduced-motion` disables Lenis and collapses transitions throughout.

## Deploying

Fully static — no server needed at runtime.

```bash
npx vercel        # or: npm run build && npm start
```

Set the real domain in `metadataBase` in [`src/app/layout.tsx`](src/app/layout.tsx)
(currently `https://animosity.band`) so Open Graph images resolve.
