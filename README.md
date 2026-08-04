# Animosity — band site

Portfolio site for **Animosity**, a hard rock / metal band out of Greater Noida, Delhi-NCR.
Built with Next.js 16 (App Router), Tailwind v4, Motion and Lenis.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Routes

| Route | What's on it |
|---|---|
| `/` | Clickable band line-up, manifesto, the three originals, video, booking |
| `/history` | Six chapters with a sticky chapter rail, the competition record, the originals |
| `/members` | All eight, plus origins and the stage plot |
| `/members/[slug]` | One page per member — statically generated, eight of them |

Nav lives in the root layout, so it's shared across every route. Links to sections on
the landing page use `/#music` form so they work from any route.

## Editing content

**Almost everything lives in one file: [`src/data/band.ts`](src/data/band.ts).**
Change it there and every route follows — no component edits needed.

| What | Export |
|---|---|
| Name, genre, email, socials, manifesto | `BAND` |
| The three originals + stories + who played on them | `SONGS` |
| Battle of Bands results | `ACHIEVEMENTS` |
| The eight members — bio, gear, contributions, facts, accent colour | `MEMBERS` |
| History chapters + which members enter in each | `HISTORY` |
| Technical rider | `RIDER` |
| Nav links | `NAV` |

Adding a member to `MEMBERS` automatically creates their page, adds them to the
line-up, the grid, the origins list and the prev/next rings.

### ⚠️ Still needs the band

1. **Arnold and Aditya have no photos.** Their folders in `band members pics/` were
   empty, so both still use the lower-quality stills pulled out of the media kit PDF.
   Drop photos in and re-run the cutout step below.
2. **Song stories** — `SONGS[].story` is written from the media kit, not by the band.
   Flagged in amber in the UI. Set `isPlaceholderStory: false` once replaced.
3. **History chapters** — `HISTORY[].body`. The people and results are real; the
   ordering and framing are not confirmed, and there are no dates anywhere in the kit.
   Flagged in amber. Set `isPlaceholder: false` once confirmed.
4. **Song title spelling** — the kit says *"Casualty of War"*, the site says
   **"Kezualty of War"** as supplied. Pick one.

## Assets

Every supplied photograph is used, each in one deliberate place — 32 member shots
(8 portraits + 26 gallery frames), 6 band shots, and the 8 cut-outs derived from them.

| Path | What |
|---|---|
| `public/cutouts/*.png` | background-removed PNGs for the landing-page line-up |
| `public/photos/<slug>.jpg` | member portraits — line-up readout, grid card, page masthead |
| `public/photos/gallery/<slug>/NN.jpg` | that member's other shots, as a lightbox strip on their page |
| `public/photos/band-*.jpg` | the six band shots, one per job (see below) |

The band photographs are placed by what they actually show, so none of them repeat:

| File | Where |
|---|---|
| `band-live` | `/history` masthead + the History card on the landing page |
| `band-portrait` | `/members` masthead + the Band card + history's closing chapter |
| `band-stage-red` | history chapter I, *The Founding* |
| `band-cokestudio-wide` | behind the Battle of Bands record |
| `band-depot` | history chapter V, *Three Originals* |
| `band-crowd` | behind the booking section — shot from behind, into the crowd |
| `public/video/hero-backdrop.mp4` | the band's own stage LED backdrop |
| `public/brand/animosity-logo-glyph.png` | wordmark, sticker outline stripped so the neon glow traces the letterforms |
| `public/media-kit/…pdf` | the full kit, linked from booking |
| `band members pics/`, `full band pics/`, `media-kit/` | originals — not served, not committed |

### Regenerating the cut-outs

The line-up needs transparent PNGs. Higgsfield's `remove_background` was the plan but
the account has no credits, so this uses [rembg](https://github.com/danielgatis/rembg)
locally with the `u2net_human_seg` model — free, offline, repeatable.

```bash
python3 -m venv /tmp/rembg-venv
/tmp/rembg-venv/bin/pip install "rembg[cpu]" pillow
/tmp/rembg-venv/bin/python - <<'PY'
from rembg import remove, new_session
from PIL import Image
session = new_session("u2net_human_seg")
im = Image.open("SOURCE.jpeg").convert("RGBA")
out = remove(im, session=session, alpha_matting=True,
             alpha_matting_foreground_threshold=250,
             alpha_matting_background_threshold=15,
             alpha_matting_erode_size=8)
out.crop(out.getbbox()).save("public/cutouts/SLUG.png")
PY
```

Pick **full-body, standing, front-on** shots where the subject is clear of other
people. Drummers are the hard case — a shot from behind the kit keeps chunks of snare
in the cutout; a clear upper-body shot works far better.

### Line-up proportions — read this before swapping a photo

The cut-outs are framed inconsistently: some are full-body, some are waist-up. If you
just scale them all to one box height, a waist-up crop renders the same height as a
full-body shot and the person looks like a giant. So each member carries a `lineup`
block in `MEMBERS`:

```ts
lineup: { scale: 1.02, drop: 0.025, aspect: 0.5347 }
```

| Field | Meaning |
|---|---|
| `scale` | height multiplier that makes everyone's **head the same size**. Bigger = drawn larger. A tight crop needs a *smaller* scale. |
| `drop` | vertical nudge as a fraction of the base height, applied after scaling, so the **heads line up**. Negative moves up. |
| `aspect` | the PNG's width ÷ height. Sets the slot width so nothing is squashed. Just read it off the file. |

To re-measure after swapping a photo, render everyone at equal height and compare head
sizes by eye — that's what the numbers were derived from:

```bash
# all figures at one height, ruler overlaid; measure head top → chin for each
python3 /tmp/preview2.py     # see git history for the script
```

`scale = (median head height) ÷ (this member's head height)`. Then set `drop` so their
head top sits level with everyone else's. The bottom 20% of each figure is masked to a
fade, so mismatched crops dissolve into the dark instead of ending on a hard cut.

The row is `SUM(scale × aspect)` ≈ 3.64 figures wide, which is why `--fig` in
`HeroLineup.tsx` is capped by viewport width as well as height — otherwise the end
members fall off screen. Adjust the divisor if you add or remove a member.

### The hero video

Encoded from the stage visual. The source has the wordmark burned into its top third,
which ghosted behind the real logo, so **the top 270px are cropped off**. The eyes then
sit along the top edge of the frame — which is why the parallax starts at `scale: 1`
rather than zoomed in. Audio stripped, H.264 crf 32, 24fps, faststart: 13MB → 974KB.
VP9 came out larger on this grainy source, so there's no webm.

```bash
ffmpeg -i "source.mp4" -an -r 24 -vf "crop=1280:450:0:270" \
  -c:v libx264 -crf 32 -preset veryslow -pix_fmt yuv420p \
  -movflags +faststart public/video/hero-backdrop.mp4
```

### The tab icon

The favicon is the band's own `Animosity Animation.gif` — the "A" glyph with embers and
a glitch burst. Generated into `public/favicon/`:

| File | Notes |
|---|---|
| `icon-32.gif`, `icon-48.gif` | animated, every 3rd/4th frame, ~60KB each |
| `icon-16/32/48.png` | static, from frame 0 (a clean glyph, not a glitch frame) |
| `icon-180/192/512.png` | apple-touch + PWA |
| `favicon.ico` | 16/32/48 multi-size; a copy sits at `public/favicon.ico` for clients that request it blindly |

Three things worth knowing if you regenerate it:

1. **Only Firefox animates GIF favicons.** Chrome and Safari show the first frame. That's
   why frame 0 is used for every static size — land on the glyph, never on a glitch frame.
2. **The strokes are dilated at 16 and 32px.** The blackletter A is outlined and far too
   thin to read at tab size otherwise; a `MaxFilter` pass twice at ≤32px and once at 48px
   fixes it without filling in the counters. No dilation above that.
3. **Don't put a `favicon.ico` in `src/app/`.** Next auto-injects that as a 256×256 `<link>`
   *ahead* of everything in `metadata.icons`, and browsers then prefer it over the GIF.
   Declaring the icons explicitly in `layout.tsx` and keeping the file in `public/` avoids it.

### The media kit PDF

The original is 38MB. The served copy is rasterised at 150dpi and rebuilt as
JPEG-backed pages: **38MB → 4MB**, text still crisp on screen. Trade-off: its text is
no longer selectable. Original untouched in `media-kit/`.

## Design language

From the Media Kit 2026 rather than invented: near-black `#050505`, blood red
`#E11D2E`, bone `#F2F0EE`, and per-member accent colours taken from each member's page
in the kit — they drive the line-up wash, member cards, detail pages and song rows.
Anton for display, Archivo for body, JetBrains Mono for the technical labels that echo
the rider table. Tokens in [`globals.css`](src/app/globals.css) under `@theme`.

## Gotcha: stale images in dev

Next 16 caches optimised images at **`.next/dev/cache/images`** — *not*
`.next/cache/images`. It keys on the request URL, so replacing a file at the same path
leaves the old one being served, and it serves different formats to different clients
(WebP to browsers, JPEG to curl), so curl can look correct while the browser is stale.
If a swapped image doesn't update:

```bash
rm -rf .next && npm run dev
```

## Deploying

Fully static.

```bash
npx vercel        # or: npm run build && npm start
```

Set the real domain in `metadataBase` in [`layout.tsx`](src/app/layout.tsx)
(currently `https://animosity.band`) so Open Graph images resolve.
