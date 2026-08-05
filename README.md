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

### Where the cut-outs came from

Five of them (Harsh, Partho, Riyan, Shubhra, Yuvraaj) were supplied hand-cut in
`bg removed pics/`. Those arrived at 408×612, which is only about half the resolution
the line-up needs on a retina display — but four turned out to be exact downscales of
photos already in `band members pics/` at 724×1086. So rather than use them directly,
**their alpha channel is upscaled and applied to the full-resolution original**: the
supplied mask, at full resolution.

```python
mask = Image.open(supplied_png).convert('RGBA').split()[3]
src  = Image.open(full_res_original).convert('RGB')
src.putalpha(mask.resize(src.size, Image.LANCZOS))
```

All five match a full-resolution source, so all five get the treatment above.

Yuvraaj's had a free-standing cymbal stand down his left edge, which widened his slot
for no subject; his PNG is cropped 13% in from the left to drop it.

Mathias, Arnold and Aditya were never re-supplied and still use the rembg cut-outs below.

### Regenerating a cut-out from scratch

Higgsfield's `remove_background` was the plan but the account has no credits, so this
uses [rembg](https://github.com/danielgatis/rembg) locally with the `u2net_human_seg`
model — free, offline, repeatable.

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

The cut-outs are framed inconsistently: some are full-body, some are waist-up, and the
guitars swing out to wildly different widths. Scaling them all to one box height makes a
waist-up crop render the same height as a full-body shot, and the person looks like a
giant. So each member carries a `lineup` block in `MEMBERS`:

```ts
lineup: { scale: 1.02, drop: 0.02, aspect: 0.3766, bodyW: 0.835, headCx: 0.745 }
```

| Field | Meaning |
|---|---|
| `scale` | height multiplier that equalises **head WIDTH** across the line-up |
| `drop` | vertical slide applied after scaling. `scale − 1` puts their crown on the common line; raise it above that to sit someone lower on purpose. Arnold is at `0.0` against a scale of `0.9` — he's crouching, so aligning his crown left him floating. |
| `aspect` | the PNG's width ÷ height |
| `bodyW` | width of the person — torso plus instrument body, *excluding* the neck and headstock — as a fraction of the PNG width. Sets how much floor they occupy. |
| `headCx` | where their head sits across the PNG, 0–1. The figure is positioned so this lands on the slot's centre, i.e. directly over their name. |
| `nudge` | optional manual offset in `--fig` units, applied after centring. Positive moves right. Arnold leans with his knee out to the left, so head-centring left his mass sitting left of his name. |
| `gapBefore` | optional extra space before this member, in `--fig` units, for when one pair needs air but the row doesn't. Mathias has one so the two singers aren't shoulder to shoulder; Aditya has one so Partho's headstock clears his face. |
| `layer` | optional stacking override. Members default to drawing left-over-right at `(count − index) × 10`. Raise it to lift someone above a neighbour. Currently unused — the drummer's face is cleared by moving him rather than restacking, so Partho's headstock stays visible. |
| `fadeFrom` | where the bottom fade starts, as a percentage of the figure. Default `80`. Lower it to dissolve something the cut-out ends abruptly on — Yuvraaj's drum kit is cut mid-shell in the source, so his is `46`. |

**Measure the head-width band from image WIDTH, never from image height.** A band sized
as a fraction of height shrinks when you crop the legs off, which shrinks the measured
head, which makes you scale the person *up* — Harsh was pushed to 1.3 that way when he
belonged at 1.0. Width is untouched by a vertical crop, so a width-derived band gives
the same answer at any framing. With that fixed, matching someone's framing to the rest
is one step: crop them to `headW / target(headW/H)` tall.

**Measure head WIDTH, not head height.** Head height was tried and produced two
visibly wrong passes. It's inflated by hair (Riyan's covers his face entirely) and by
leaning toward camera (Arnold is bent double screaming, Mathias leans back) — which made
the two singers scale to 0.82 and 0.80 when they should have been 1.02 and 0.97, and
they looked squashed between everyone else. Head *width* barely moves with tilt or hair,
and measured that way the whole band lands in a 0.13–0.20 band.

All five values can be derived from the cut-out's alpha channel; see the measurement
scripts in the git history for this commit. Head band = the widest opaque run across
the top 9% of the figure. Body band = the widest run of columns that are *densely*
opaque, which excludes guitar necks because a diagonal neck fills very little of any
one column.

### The slot model

Each member's slot is only as wide as their **body**. Their guitar hangs outside it and
is free to overlap whoever is beside them — which is what a real band photo looks like,
and is why figures are far bigger than when slots were sized by the full PNG. Harsh's
guitar is half his bounding box; charging him for that width shrank everybody.

`AIR` sets the body-to-body pitch as a multiple of body width. It is **below 1**, so the
bodies themselves overlap and there is no dead space anywhere in the row — a band stands
shoulder to shoulder, not evenly spaced. Raising it above 1 opens gaps between people.

Three things this model requires, all of which broke something when missing:

- **`pointer-events-none` on the image.** It spills outside the slot, so without this a
  wide guitar sits on top of the next member and swallows their hover and click. Harsh's
  guitar made Arnold unhoverable.
- **Clip only along the floor.** `overflow: hidden` would cut the guitars off too, so
  the slot uses `clip-path: inset(-100vh -100vw 0 -100vw)` — bottom edge only.
- **Size `--fig` by image extent, not slot extent.** `GEOMETRY` in `HeroLineup.tsx`
  walks the row and unions the drawn images; otherwise the last member's bass runs off
  the right edge. `shift` re-centres, because the overhang isn't symmetrical.

### Two different orders

The landing-page line-up is **not** in the same order as everything else:

- **`LINEUP_ORDER`** — left-to-right on the landing page only, roughly where they'd
  stand on a stage.
- **`MEMBERS`** — the canonical order used everywhere else: the members grid, the
  origins list, the `01 of 08` counters and the prev/next rings.

Only `HeroLineup.tsx` imports `LINEUP`. If you add a member to `MEMBERS`, add their slug
to `LINEUP_ORDER` too — it throws at build time on an unknown slug, but it won't notice
one you left out.

**`drop` is derived, not guessed.** The cut-outs are cropped to their bounding box, so
the top of the image *is* the crown — head-tops line up exactly when `drop = scale − 1`.
Keep that relationship when you change a `scale`, or the heads drift apart.

Two automated approaches were tried and are not worth repeating: OpenCV Haar cascades
fire constantly on stage lighting (Arnold's best-scoring "face" box landed on his
shoulder), and finding the shoulder line from the alpha mask breaks on raised arms and
big hair. Measuring the head band off the alpha, as above, is what works.

Each slot **clips at the floor**, so anyone whose photo runs longer than the others
(Partho) is cut there rather than spilling over the name plates. The bottom 20% of each
figure is masked to a fade so the shorter crops dissolve into the dark instead of ending
on a hard line.

**Overlap is proportional to each figure's own width** (`OVERLAP` in `HeroLineup.tsx`),
not a flat fraction of `--fig`. A flat overlap ate nearly half of a narrow figure like
Arnold while barely touching a wide one like Harsh with his guitar out. Note that wider
cut-outs cost height: the newer ones include the full guitars, which pushed `ROW_UNITS`
from 3.6 to 4.1 and shrank every figure — more overlap buys some of it back.

`--fig` is capped by viewport width as well as height via `ROW_UNITS`, computed from the
data — so adding a member or swapping in a wider photo can't silently push the end of
the row off screen.

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
