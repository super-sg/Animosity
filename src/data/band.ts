/**
 * Single source of truth for all Animosity content.
 *
 * Transcribed from the official Media Kit 2026 except where marked
 * `isPlaceholder` / `TODO` — those need the band's own words.
 */

export const BAND = {
  name: "Animosity",
  genre: "Hard Rock / Metal Band",
  base: "Greater Noida · Delhi-NCR",
  email: "band.animosity@gmail.com",
  instagram: "https://instagram.com/band.animosity",
  instagramHandle: "@band.animosity",
  youtube: "https://www.youtube.com/watch?v=v2oNFCLB11k",
  mediaKit: "/media-kit/animosity-media-kit-2026.pdf",
  manifesto:
    "Animosity is defined as the feeling of angst, of rebellion — of belonging to a higher cause. We are a highly unique group of people, with our diverse musical backgrounds and technical skill. We drive our love of music to transcend all that stands in our dazzling lights.",
  closing:
    "We promise to give our all for the audience, and you would not find such an electrifying atmosphere anywhere else.",
} as const;

/* ================================================================== */
/* Songs                                                               */
/* ================================================================== */

export type Song = {
  slug: string;
  index: string;
  title: string;
  tag: string;
  accent: string;
  story: string;
  credits: string[];
  /** member slugs who are named on this track */
  players: string[];
  youtubeId?: string;
  /** the band's own footage on Google Drive — see `SetTrack.drive` */
  drive?: string;
  isPlaceholderStory: boolean;
};

export const SONGS: Song[] = [
  {
    slug: "first-and-final",
    index: "01",
    title: "First and Final",
    tag: "Official Music Video",
    accent: "#E11D2E",
    story:
      "The first thing Animosity ever finished, and the song that still opens the set. Written by Harsh in the band's earliest days and carried by Arnold's vocal fry, it is the track that proved the idea could survive contact with a stage — the one they wrote before they knew whether there would be a second.",
    credits: [
      "Lyrics — Harsh Roy",
      "Lead vocals — Hijam Arnold Singh",
      "Music & production — Animosity",
    ],
    players: ["harsh-roy", "arnold-singh"],
    youtubeId: "v2oNFCLB11k",
    isPlaceholderStory: true,
  },
  {
    slug: "mental-distortion",
    index: "02",
    title: "Mental Distortion",
    tag: "Original Composition",
    accent: "#7C3AED",
    story:
      "The band's turn inward. Where First and Final points outward at the world, Mental Distortion sits inside the noise the world leaves behind — the loops, the second-guessing, the version of yourself that argues back. Musically it is the most unstable thing in the catalogue, and deliberately so.",
    credits: ["Lyrics — Harsh Roy", "Music & production — Animosity"],
    players: ["harsh-roy"],
    drive:
      "https://drive.google.com/file/d/1HtgtbAA8PShCOcUlxcg0jh4j8VbXyy38/view?usp=drive_link",
    isPlaceholderStory: true,
  },
  {
    slug: "kezualty-of-war",
    index: "03",
    title: "Kezualty of War",
    tag: "Original Composition",
    accent: "#F97316",
    story:
      "The heaviest thing Animosity has written. Riyan wrote the music after joining specifically to push the band into lower tunings and odd time signatures, and this is the proof of that brief — a track about what is left standing after the fight is over, and who pays for it.",
    credits: ["Music — Riyan Gogoi", "Lyrics — Harsh Roy", "Production — Animosity"],
    players: ["riyan-gogoi", "harsh-roy"],
    drive:
      "https://drive.google.com/file/d/178fkDlymIxCgNv9zulIxH0x-WMUa3zve/view?usp=drive_link",
    isPlaceholderStory: true,
  },
];

/* ================================================================== */
/* Setlist — what actually gets played live                            */
/* ================================================================== */

export type SetTrack = {
  slug: string;
  title: string;
  /** whose song it is — Animosity for the originals, the original act for covers */
  artist: string;
  album?: string;
  year?: string;
  accent: string;
  /** what the song is, on its own terms */
  note: string;
  /** why it's in an Animosity set, and what it does to a room */
  angle: string;
  credits?: string[];
  /** member slugs the track leans on live */
  spotlight?: string[];
  /**
   * Square cover art of the original release. Apple's own artwork CDN — the
   * `/600x600bb.jpg` suffix is swappable for any size. See `next.config.ts`
   * for the `remotePatterns` entry that lets next/image touch it.
   */
  artwork?: string;
  /** 30-second preview of the original recording, straight off Apple Music */
  preview?: string;
  /** the band's own video, if one is on YouTube */
  youtubeId?: string;
  /**
   * The band's own live take, hosted on Google Drive. Paste either the bare
   * file id or the whole "share" URL — `driveEmbedSrc` pulls the id out of
   * both. The file has to be shared as "anyone with the link can view" or
   * the embed renders a sign-in wall.
   */
  drive?: string;
};

export type SetGroup = {
  id: string;
  /** omitted when the section has only one group and needs no sub-heading */
  label?: string;
  badge?: string;
  blurb?: string;
  tracks: SetTrack[];
};

export type SetSection = {
  id: string;
  index: string;
  kicker: string;
  title: string;
  accent: string;
  standfirst: string;
  groups: SetGroup[];
};

/** The originals are already described in `SONGS` — don't restate them here. */
const ORIGINAL_TRACKS: SetTrack[] = SONGS.map((song) => ({
  slug: song.slug,
  title: song.title,
  artist: "Animosity",
  accent: song.accent,
  note: song.story,
  angle:
    song.tag === "Official Music Video"
      ? "Opens the set, every time."
      : "Ours, start to finish — written in the room and played the way it was written.",
  credits: song.credits,
  spotlight: song.players,
  youtubeId: song.youtubeId,
  drive: song.drive,
}));

const ENGLISH_COVERS: SetTrack[] = [
  {
    slug: "unholy-confessions",
    title: "Unholy Confessions",
    artist: "Avenged Sevenfold",
    album: "Waking the Fallen",
    year: "2003",
    accent: "#E11D2E",
    note: "The track that dragged Avenged Sevenfold out of the underground — a screamed verse bolted onto a sung chorus, over the double-kick figure that everyone recognises from the opening bar.",
    angle:
      "The clearest argument for the way this band is built: a trained clean voice and a growler working the same song. Avenged Sevenfold sits at the top of Harsh's influence list, so this one was never optional.",
    spotlight: ["mathias-oundo", "arnold-singh", "harsh-roy"],
    artwork:
      "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/46/20/cb/4620cb89-d601-98bf-4720-869a384d5f7e/cover.jpg/600x600bb.jpg",
    preview:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/14/e8/18/14e818d5-8b4c-f61b-89b8-66c610481eb4/mzaf_1495383565452300810.plus.aac.p.m4a",
    drive:
      "https://drive.google.com/file/d/1loGm19GZVvsrkq4nvpnkyLegxv6ypASu/view?usp=drive_link",
  },
  {
    slug: "hand-of-blood",
    title: "Hand of Blood",
    artist: "Bullet for My Valentine",
    album: "Bullet for My Valentine EP",
    year: "2005",
    accent: "#F43F5E",
    note: "Two and a half minutes with no run-up. The single that got four lads out of Bridgend and onto every metalcore compilation of the decade — it starts on a scream and never really stops.",
    angle:
      "The opener for a room that needs waking rather than warming. Short enough that nobody has decided what they think of the band yet when it ends.",
    spotlight: ["arnold-singh", "riyan-gogoi"],
    artwork:
      "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/f0/75/fc/f075fcfb-312b-4c12-9ff1-2c49473accf6/196874028872.jpg/600x600bb.jpg",
    preview:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/b4/48/dc/b448dce6-fcca-7dc2-19b2-e3dc0f835c97/mzaf_13909177234716827860.plus.aac.p.m4a",
    drive:
      "https://drive.google.com/file/d/1X48Kq3oyMKDkZcbq6fkp1xfgXDLA84Q1/view?usp=sharing",
  },
  {
    slug: "tears-dont-fall",
    title: "Tears Don't Fall",
    artist: "Bullet for My Valentine",
    album: "The Poison",
    year: "2005",
    accent: "#3B82F6",
    note: "A melodic chorus and a screamed hook trading places over one of the most copied lead riffs British metalcore ever produced. The song most people mean when they say they liked this band at sixteen.",
    angle:
      "The one where the room sings the chorus back without being asked. Mathias takes the melody, the fry comes in underneath, and the crowd handles the rest.",
    spotlight: ["mathias-oundo", "harsh-roy", "shubhra-ghosh"],
    artwork:
      "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/77/12/7a/77127aeb-035f-98ed-94f7-c3e89857931b/196872258479.jpg/600x600bb.jpg",
    preview:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/43/10/c2/4310c269-9091-bdc8-3853-c4314bf45fd6/mzaf_4422473400620439447.plus.aac.p.m4a",
  },
  {
    slug: "roots-bloody-roots",
    title: "Roots Bloody Roots",
    artist: "Sepultura",
    album: "Roots",
    year: "1996",
    accent: "#F97316",
    note: "Barely any notes and all of the weight. Off the album Sepultura part-recorded with the Xavante people in Mato Grosso, it swapped thrash speed for downtuned groove and a percussion section you feel through the floor.",
    angle:
      "Yuvraaj's showcase. Everything in it is rhythm, so the kit runs the song and the guitars just lean on it — the point in the set where the pit stops being polite.",
    spotlight: ["yuvraaj-rawat", "arnold-singh"],
    artwork:
      "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/a2/2f/49/a22f498d-81a9-9d1b-e85c-d5652ec811b6/016861890025.jpg/600x600bb.jpg",
    preview:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/fd/eb/09/fdeb093b-b457-d5ff-44d9-3cbfd12c48ec/mzaf_485707390187128044.plus.aac.p.m4a",
  },
  {
    slug: "silvera",
    title: "Silvera",
    artist: "Gojira",
    album: "Magma",
    year: "2016",
    accent: "#22C55E",
    note: "Four minutes of French technical metal with nothing spare in it — a pinch-harmonic riff, a stop-start groove, and a chorus that lands like a door closing. Nominated for Best Metal Performance at the 2017 Grammys.",
    angle:
      "The hardest thing in the covers set to play cleanly, and the reason Riyan was brought into the band in the first place. Lower tunings, tighter stops, no safety rails.",
    spotlight: ["riyan-gogoi", "yuvraaj-rawat"],
    artwork:
      "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/24/cd/f7/24cdf7d0-279d-316e-a39c-51c35e2cce32/016861747947.jpg/600x600bb.jpg",
    preview:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/78/f9/36/78f936d3-14bb-e6b2-bedf-1478956623f7/mzaf_3831599986626979745.plus.aac.p.m4a",
  },
  {
    slug: "the-trooper",
    title: "The Trooper",
    artist: "Iron Maiden",
    album: "Piece of Mind",
    year: "1983",
    accent: "#3B82F6",
    note: "Steve Harris's gallop under twin lead guitars, with a lyric taken from the Charge of the Light Brigade — Maiden turning a nineteenth-century cavalry disaster into the most recognisable riff in British metal.",
    angle:
      "The one cover in the book written for a line-up shaped like this one: three guitars trading the harmony parts while the bass carries the gallop underneath. It is also the most reliable way there is to get a college crowd's fists in the air.",
    spotlight: ["mathias-oundo", "riyan-gogoi", "shubhra-ghosh", "partho-roy"],
    artwork:
      "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/f8/cd/38/f8cd3816-a840-209a-e9f6-cf3f3e47da21/0881034134455.jpg/600x600bb.jpg",
    preview:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/49/99/81/4999815e-b6f3-7797-61cc-9d8013afe003/mzaf_9926548740505997903.plus.aac.p.m4a",
    drive:
      "https://drive.google.com/file/d/1CSo3OkWfuZBbVIGTu_n6SH2YGaU5OQ2t/view?usp=sharing",
  },
  {
    slug: "dream-on",
    title: "Dream On",
    artist: "Aerosmith",
    album: "Aerosmith",
    year: "1973",
    accent: "#8B5CF6",
    note: "The ballad from Aerosmith's first record, and still the one they are asked for. It climbs for four minutes on a single idea before Steven Tyler takes the last chorus into a scream that has almost nothing to do with the voice that started the song.",
    angle:
      "The tempo drop, placed on purpose. It is also the one point in the night where a decade of choir and opera training gets used for what it was actually trained for.",
    spotlight: ["mathias-oundo"],
    artwork:
      "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/e2/87/d9/e287d987-7b92-7749-737f-b5b8a6913f88/22UM1IM38560.rgb.jpg/600x600bb.jpg",
    preview:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/f8/96/43/f89643b7-3efa-9f43-0a78-394abf12864b/mzaf_3399344087154345151.plus.aac.p.m4a",
  },
  {
    slug: "paradise-city",
    title: "Paradise City",
    artist: "Guns N' Roses",
    album: "Appetite for Destruction",
    year: "1987",
    accent: "#F59E0B",
    note: "Starts as a singalong and ends as a sprint — the last two minutes double the tempo and simply refuse to come back down. Thirty-odd years on, the whistle intro still empties the bar.",
    angle:
      "The encore. Nothing about it is heavy by this band's standards, which is exactly why it works after forty minutes of things that are.",
    spotlight: ["harsh-roy", "shubhra-ghosh", "partho-roy"],
    artwork:
      "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/a0/4d/c4/a04dc484-03cc-02aa-fa82-5334fcb4bc16/18UMGIM24878.rgb.jpg/600x600bb.jpg",
    preview:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/0b/2d/ec/0b2dec08-f03d-8a96-93a8-386a7d7b5091/mzaf_12821402190646617663.plus.aac.p.m4a",
  },
  {
    slug: "until-i-found-you",
    title: "Until I Found You",
    artist: "Stephen Sanchez",
    album: "Single",
    year: "2022",
    accent: "#F43F5E",
    note: "A slow-dance ballad written in a 1950s idiom that had no business charting in 2022, and then did — carried worldwide off the back of a fifteen-second clip.",
    angle:
      "The outlier, and deliberately so. Proof that a band who spend most of the night at maximum volume can also get a hall completely silent.",
    spotlight: ["mathias-oundo", "aditya-singh"],
    artwork:
      "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/64/d2/c5/64d2c511-67f4-ae09-5153-d39c3da413a3/21UMGIM75467.rgb.jpg/600x600bb.jpg",
    preview:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/53/82/c1/5382c1d4-ddba-aa2b-90df-57268895fac9/mzaf_8926201202931541051.plus.aac.p.m4a",
  },
  {
    slug: "mary-on-a-cross",
    title: "Mary On a Cross",
    artist: "Ghost",
    album: "Seven Inches of Satanic Panic",
    year: "2019",
    accent: "#8B5CF6",
    note: "Psychedelic sixties pop wearing occult-rock costume. It was a B-side nobody outside the fanbase noticed until a slowed-down edit found an audience three years later and pushed it onto the charts.",
    angle:
      "The crowd-pleaser that isn't heavy — melody first, theatre second, and a chorus that carries a room that has never heard of the band.",
    spotlight: ["mathias-oundo", "shubhra-ghosh"],
    artwork:
      "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/20/72/d3/2072d3b2-238c-1ac2-1f6f-21f683fdc41b/24CRGIM45902.rgb.jpg/600x600bb.jpg",
    preview:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/d9/38/c1/d938c11c-3bc5-49a5-55ae-164741db1002/mzaf_16760874358478065847.plus.aac.p.m4a",
  },
  {
    slug: "highway-to-hell",
    title: "Highway to Hell",
    artist: "AC/DC",
    album: "Highway to Hell",
    year: "1979",
    accent: "#FF2D40",
    note: "Bon Scott's last studio record with the band. Five chords, no wasted bars, and a title track built entirely out of the space between the notes.",
    angle:
      "The one nobody has to be taught. Play the first three chords and the room does the work — which is why it tends to close the night.",
    spotlight: ["harsh-roy", "partho-roy", "yuvraaj-rawat"],
    artwork:
      "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/b9/c8/ef/b9c8ef42-bbc9-64df-11f8-717571f6730f/886443673458.jpg/600x600bb.jpg",
    preview:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/cb/f4/3f/cbf43f47-747d-bcc2-19cf-6bf2c523f5d8/mzaf_9504019990576453182.plus.aac.p.m4a",
  },
];

const HINDI_COVERS: SetTrack[] = [
  {
    slug: "naadan-parindey",
    title: "Naadan Parindey",
    artist: "A.R. Rahman · Mohit Chauhan",
    album: "Rockstar (OST)",
    year: "2011",
    accent: "#F59E0B",
    note: "Rahman writing a rock song rather than a film song. It opens as a folk lament and ends somewhere closer to a shout, with Mohit Chauhan holding a line that keeps climbing past where it should have stopped.",
    angle:
      "The Hindi request that comes in most often, and the one that suits the line-up best — Mathias's run at Hindustani classical finally earns its keep, and the band gets to play the back half at full weight.",
    spotlight: ["mathias-oundo", "harsh-roy"],
    artwork:
      "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/56/ac/41/56ac41f7-99f3-3eae-3b07-443167292c4e/8902894697408_cover.jpg/600x600bb.jpg",
    preview:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/57/52/53/57525390-c18f-7001-8d07-3f0acd0336da/mzaf_16914964021963184197.plus.aac.p.m4a",
  },
  {
    slug: "kurbaan-hua",
    title: "Kurbaan Hua",
    artist: "Salim–Sulaiman · Vishal Dadlani",
    album: "Kurbaan (OST)",
    year: "2009",
    accent: "#F97316",
    note: "Vishal Dadlani — who spends the rest of his time fronting Pentagram — singing a title track with a rock voice over a qawwali-shaped melody and a rhythm section that is quietly a rock band.",
    angle:
      "The closest a Hindi film soundtrack gets to this band's natural register, so almost nothing has to be rearranged to make it fit.",
    spotlight: ["mathias-oundo", "riyan-gogoi", "yuvraaj-rawat"],
    artwork:
      "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/2f/46/a8/2f46a861-e694-80e9-8a31-027977af95c7/884977367751.jpg/600x600bb.jpg",
    preview:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/77/ce/a3/77cea37d-5efe-7cb1-7576-b3195afbc921/mzaf_5055804942054161066.plus.aac.p.m4a",
  },
];

export const SETLIST: SetSection[] = [
  {
    id: "originals",
    index: "01",
    kicker: "Written in the room",
    title: "Originals",
    accent: "#E11D2E",
    standfirst:
      "Three songs that belong to nobody else. Lyrics by Harsh, music built across eight people in five states, and one official video shot so far.",
    groups: [{ id: "originals-all", tracks: ORIGINAL_TRACKS }],
  },
  {
    id: "covers",
    index: "02",
    kicker: "Everything else we'll play",
    title: "Covers",
    accent: "#F97316",
    standfirst:
      "Thirteen songs the band has taken apart and put back together — the ones that built everyone's playing in the first place, plus two in Hindi that only come out when a room asks for them.",
    groups: [
      {
        id: "covers-english",
        label: "English",
        blurb:
          "The standing set. Metalcore, groove metal, classic British metal, and three rock songs old enough to be nobody's guilty pleasure.",
        tracks: ENGLISH_COVERS,
      },
      {
        id: "covers-hindi",
        label: "Hindi",
        badge: "On special demand",
        blurb:
          "Not in the standard set. Ask for them at the booking stage and they go in — both are rehearsed and ready.",
        tracks: HINDI_COVERS,
      },
    ],
  },
];

export const SETLIST_COUNTS = {
  originals: ORIGINAL_TRACKS.length,
  english: ENGLISH_COVERS.length,
  hindi: HINDI_COVERS.length,
  total: ORIGINAL_TRACKS.length + ENGLISH_COVERS.length + HINDI_COVERS.length,
};

/**
 * Google Drive share links come in several shapes (`/file/d/<id>/view`,
 * `?id=<id>`, or just the id pasted on its own). Every one of them contains
 * the id as the only long run of URL-safe characters, so one pattern covers
 * the lot.
 */
export const driveEmbedSrc = (ref: string) => {
  const id = ref.match(/[-\w]{25,}/)?.[0] ?? ref;
  return `https://drive.google.com/file/d/${id}/preview`;
};

/* ================================================================== */
/* Achievements                                                        */
/* ================================================================== */

export type Achievement = { place: "1ST" | "2ND"; event: string; venue: string; city?: string };

export const ACHIEVEMENTS: Achievement[] = [
  { place: "1ST", event: "Synchronicity", venue: "IIT Kanpur", city: "Kanpur" },
  { place: "1ST", event: "Thomso", venue: "IIT Roorkee", city: "Roorkee" },
  { place: "1ST", event: "Schism", venue: "IIIT Delhi", city: "New Delhi" },
  { place: "1ST", event: "Neutron", venue: "Rishihood University", city: "Sonipat" },
  { place: "1ST", event: "Passion", venue: "IIMT Ghaziabad", city: "Ghaziabad" },
  { place: "1ST", event: "Sankalp", venue: "GLBITM", city: "Greater Noida" },
  { place: "2ND", event: "Blitzkreig", venue: "IIT Delhi", city: "New Delhi" },
  { place: "2ND", event: "Pulse", venue: "AIIMS Delhi", city: "New Delhi" },
  { place: "2ND", event: "Sunergoes", venue: "Christ University", city: "Bengaluru" },
];

export const STATS = [
  { value: "09", label: "Battle of Bands podiums" },
  { value: "06", label: "First place finishes" },
  { value: "08", label: "Members, five states, three countries" },
  { value: "03", label: "Original compositions" },
];

/* ================================================================== */
/* Members                                                             */
/* ================================================================== */

export type Member = {
  slug: string;
  name: string;
  /** the name they go by on stage */
  role: string;
  subRole?: string;
  instrument: string;
  from: string;
  country: string;
  accent: string;
  /** photo as extracted from the media kit */
  photo: string;
  /** background-removed PNG for the landing-page lineup; falls back to `photo` */
  cutout?: string;
  /**
   * Landing-page line-up geometry. Cut-outs are framed inconsistently — some
   * full-body, some waist-up — so scaling them all to one box height makes a
   * waist-up crop look the same size as a full-body shot. `scale` normalises
   * everyone by HEAD SIZE instead, and `drop` then slides them vertically so
   * the heads line up. Re-measure both if you swap a photo.
   */
  lineup: {
    /** height multiplier that equalises HEAD WIDTH across the line-up */
    scale: number;
    /** vertical slide applied after scaling. `scale − 1` puts their crown on the
     *  common line; raise it above that to deliberately sit someone lower, as
     *  Arnold is — he's crouching, so lining his crown up made him float. */
    drop: number;
    /** the PNG's width ÷ height */
    aspect: number;
    /** width of the person (torso + instrument body, excluding the neck/headstock)
     *  as a fraction of the PNG width. Sets how much floor they take up. */
    bodyW: number;
    /** where their head sits across the PNG, 0–1. The figure is positioned so
     *  this lands on the slot's centre, i.e. directly over their name. */
    headCx: number;
    /** optional manual horizontal offset in --fig units, added after centring.
     *  Positive moves right. For subjects whose mass sits well off to one side
     *  of their head — Arnold leans with his knee out to the left. */
    nudge?: number;
    /** optional extra space before this member, in --fig units. Used to give
     *  the three guitarists a little air rather than spacing the whole row. */
    gapBefore?: number;
    /** optional stacking override. Members default to drawing left-over-right
     *  (×10, so there's room between them). */
    layer?: number;
    /** per-member brightness multiplier, default 1. Some cut-outs were shot far
     *  darker than the rest — Harsh's stage lighting is much lower than Riyan's. */
    tone?: number;
    /** where the bottom fade starts, as a percentage of the figure. Default 80.
     *  Lower it to dissolve something the cut-out ends abruptly on — Yuvraaj's
     *  drum kit is cut mid-shell in the source, and it's his face that matters. */
    fadeFrom?: number;
  };
  /** every other supplied shot of them, shown as a strip on their page */
  gallery: string[];
  /** one line, used on cards and as the page's standfirst */
  tagline: string;
  bio: string[];
  influences: string[];
  /** from the technical rider */
  gear: string[];
  /** what they put into the band, drawn from the kit and the song credits */
  contributions: string[];
  /** small facts rendered as a spec table */
  facts: { label: string; value: string }[];
  /** day job / what they're doing away from the band */
  offstage: string;
};

export const MEMBERS: Member[] = [
  {
    slug: "harsh-roy",
    name: "Harsh Roy",
    role: "Allfather",
    subRole: "Guitar · Vocal Fry · Founder",
    instrument: "Guitar",
    from: "Bihar, India",
    country: "India",
    accent: "#E11D2E",
    photo: "/photos/harsh-roy.jpg",
    cutout: "/cutouts/harsh-roy.png",
    lineup: { scale: 1.0, drop: 0.0, aspect: 0.7451, bodyW: 0.4336, headCx: 0.373, nudge: 0.06, gapBefore: 0.05, tone: 1.22 },
    gallery: [
      "/photos/gallery/harsh-roy/01.jpg",
      "/photos/gallery/harsh-roy/02.jpg",
      "/photos/gallery/harsh-roy/03.jpg",
      "/photos/gallery/harsh-roy/04.jpg",
      "/photos/gallery/harsh-roy/05.jpg",
    ],
    tagline:
      "Founded the band, named the direction, and wrote the words to every original.",
    bio: [
      "Playing guitar since 2018 at a professional level.",
      "Founder of the band and leader of direction, hence christened “Allfather”. Has written the lyrics of the original compositions, as well as music and production. Plays guitar and does vocal fry.",
      "Currently pursuing a PhD in Biotech overseas, while also managing and touring with the band.",
    ],
    influences: ["Avenged Sevenfold", "Bullet For My Valentine", "Shankar–Ehsaan–Loy", "A.R. Rahman"],
    gear: ["Electric guitar into a DI box", "Flat EQ, maximum volume — controlled at the pedal", "Wired mic for growl vocals, high gain"],
    contributions: [
      "Founded Animosity and set its musical direction",
      "Wrote the lyrics to all three original compositions",
      "Music and production across the catalogue",
      "Manages and tours with the band from overseas",
    ],
    facts: [
      { label: "Playing since", value: "2018" },
      { label: "Role", value: "Founder" },
      { label: "Doubles on", value: "Vocal fry" },
      { label: "From", value: "Bihar, India" },
    ],
    offstage: "Pursuing a PhD in Biotech overseas.",
  },
  {
    slug: "partho-roy",
    name: "Partho Protim Roy",
    role: "Co-Founder",
    subRole: "Bass",
    instrument: "Bass",
    from: "Bangladesh",
    country: "Bangladesh",
    accent: "#F97316",
    photo: "/photos/partho-roy.jpg",
    cutout: "/cutouts/partho-roy.png",
    lineup: { scale: 1.0, drop: 0.0, aspect: 0.6826, bodyW: 0.484, headCx: 0.386, nudge: -0.05, layer: 25 },
    gallery: [
      "/photos/gallery/partho-roy/01.jpg",
      "/photos/gallery/partho-roy/02.jpg",
      "/photos/gallery/partho-roy/03.jpg",
      "/photos/gallery/partho-roy/04.jpg",
    ],
    tagline:
      "Co-founded the band and runs the parts of a show the audience never sees.",
    bio: [
      "Years of experience from 2015 in professional music — playing instruments, set design, onstage act and play, live stage executions, event management, stage sound management and console management.",
      "Passionate about music production, writing songs, and concert or show management.",
      "Currently CEO at his tech company, while being deeply involved in the music scene on the side.",
    ],
    influences: ["Animosity", "Lalon Band", "Nagar Baul", "LRB"],
    gear: ["Electric bass into a bass amp", "Wired mic to stage monitors and console address"],
    contributions: [
      "Co-founded Animosity",
      "Live stage execution, set design and console management",
      "Event and show management",
      "Music production and songwriting",
    ],
    facts: [
      { label: "In music since", value: "2015" },
      { label: "Role", value: "Co-founder" },
      { label: "Also handles", value: "Live sound" },
      { label: "From", value: "Bangladesh" },
    ],
    offstage: "CEO at his own tech company.",
  },
  {
    slug: "mathias-oundo",
    name: "Dr. Mathias Oundo",
    role: "Lead Vocalist",
    subRole: "Assistant Songwriter",
    instrument: "Lead Vocals",
    from: "Kenya · raised in Kenya, India & Lebanon",
    country: "Kenya",
    accent: "#E11D2E",
    photo: "/photos/mathias-oundo.jpg",
    cutout: "/cutouts/mathias-oundo.png",
    lineup: { scale: 0.99, drop: -0.01, aspect: 0.6629, bodyW: 0.62, headCx: 0.512, gapBefore: 0.04 },
    gallery: [
      "/photos/gallery/mathias-oundo/01.jpg",
      "/photos/gallery/mathias-oundo/02.jpg",
      "/photos/gallery/mathias-oundo/03.jpg",
      "/photos/gallery/mathias-oundo/04.jpg",
      "/photos/gallery/mathias-oundo/05.jpg",
    ],
    tagline:
      "Choir, opera, an attempt at Hindustani classical — and somehow a metal band.",
    bio: [
      "Has been singing since he was maybe 8 years old — starting in choir, then opera, attempted Hindustani classical, and somehow ended up in a metal band.",
      "Lead singer and occasional fry screamer for Animosity. Assistant song writer (is that even a thing?).",
      "Currently pursuing a Masters in Physiotherapy specializing in Neurology.",
    ],
    influences: ["Michael Jackson", "Luther Vandross", "Ice Nine Kills", "Whitney Houston", "Sleep Token"],
    gear: ["One wireless mic with stand", "Low gain"],
    contributions: [
      "Lead clean vocals",
      "Occasional fry screams",
      "Assistant songwriter",
    ],
    facts: [
      { label: "Singing since", value: "Age 8" },
      { label: "Trained in", value: "Choir & opera" },
      { label: "Mic", value: "Wireless, low gain" },
      { label: "From", value: "Kenya" },
    ],
    offstage: "Pursuing a Masters in Physiotherapy, specialising in Neurology.",
  },
  {
    slug: "arnold-singh",
    name: "Hijam Arnold Singh",
    role: "Growler",
    subRole: "Harsh Vocals",
    instrument: "Harsh Vocals",
    from: "Manipur, India",
    country: "India",
    accent: "#22C55E",
    photo: "/photos/arnold-singh.jpg",
    cutout: "/cutouts/arnold-singh.png",
    lineup: { scale: 0.9, drop: 0.0, aspect: 0.5211, bodyW: 0.677, headCx: 0.736, nudge: 0.13, gapBefore: 0.04 },
    gallery: [],
    tagline:
      "A decade of screams out of the North-East, and the voice that drives First and Final.",
    bio: [
      "Performing since 2015, earlier in the North-Eastern India metal community.",
      "Carried the band through thick and thin with his signature vocal fry and soul-gripping screams. His stage presence is unmatched to this day and his vocal prowess drives the track First and Final.",
      "Currently pursuing management back in his hometown while contributing to the band with some NE-inspirations.",
    ],
    influences: ["Thy Art Is Murder", "Rivers of Nihil", "Gojira", "Sepultura"],
    gear: ["One wireless mic for vocals", "One wired to stage monitors and console address", "High gain"],
    contributions: [
      "Harsh vocals and signature vocal fry",
      "Drives the vocal on First and Final",
      "Brings North-Eastern metal influence into the writing",
    ],
    facts: [
      { label: "Performing since", value: "2015" },
      { label: "Scene", value: "NE India metal" },
      { label: "Mic", value: "Wireless, high gain" },
      { label: "From", value: "Manipur, India" },
    ],
    offstage: "Pursuing management back in his hometown.",
  },
  {
    slug: "riyan-gogoi",
    name: "Riyan Gogoi",
    role: "Guitarist",
    subRole: "Lead · Low Tunings",
    instrument: "Guitar",
    from: "Assam, India",
    country: "India",
    accent: "#F43F5E",
    photo: "/photos/riyan-gogoi.jpg",
    cutout: "/cutouts/riyan-gogoi.png",
    lineup: { scale: 1.0, drop: 0.0, aspect: 0.6677, bodyW: 0.523, headCx: 0.33 },
    gallery: [
      "/photos/gallery/riyan-gogoi/01.jpg",
      "/photos/gallery/riyan-gogoi/02.jpg",
      "/photos/gallery/riyan-gogoi/03.jpg",
      "/photos/gallery/riyan-gogoi/04.jpg",
      "/photos/gallery/riyan-gogoi/05.jpg",
    ],
    tagline:
      "Brought in to drag the music somewhere darker. Wrote Kezualty of War.",
    bio: [
      "Playing guitar since 2017 in the North-Eastern metal scene.",
      "Brought into the band to lead the music in a heavier direction, experimenting with lower tunings and odd time signatures. Wrote the music for the original composition Kezualty of War.",
      "Currently pursuing a degree in 3D animation on the side while featuring in Animosity shows from time to time.",
    ],
    influences: ["After The Burial", "Periphery", "Death", "All Shall Perish", "Nevermore"],
    gear: ["Electric guitar into a DI box", "Flat EQ, maximum volume — controlled at the pedal", "Lower tunings"],
    contributions: [
      "Wrote the music for Kezualty of War",
      "Pushed the band into lower tunings and odd time signatures",
      "Lead guitar",
    ],
    facts: [
      { label: "Playing since", value: "2017" },
      { label: "Specialty", value: "Odd time signatures" },
      { label: "Wrote", value: "Kezualty of War" },
      { label: "From", value: "Assam, India" },
    ],
    offstage: "Pursuing a degree in 3D animation.",
  },
  {
    slug: "shubhra-ghosh",
    name: "Shubhra Ghosh",
    role: "Guitarist",
    instrument: "Guitar",
    from: "West Bengal, India",
    country: "India",
    accent: "#F59E0B",
    photo: "/photos/shubhra-ghosh.jpg",
    cutout: "/cutouts/shubhra-ghosh.png",
    lineup: { scale: 1.02, drop: 0.02, aspect: 0.447, bodyW: 0.747, headCx: 0.271, gapBefore: 0.05 },
    gallery: [
      "/photos/gallery/shubhra-ghosh/01.jpg",
      "/photos/gallery/shubhra-ghosh/02.jpg",
      "/photos/gallery/shubhra-ghosh/03.jpg",
    ],
    tagline:
      "Rabindra Sangeet and Bengali folk in, metal guitar out. Nobody is quite sure how.",
    bio: [
      "He used to vibe to Rabindra Sangeet and Bengali folk… dunno how that led to playing guitar for Animosity.",
      "Currently trying to carve out a place for himself in the computer sciences.",
      "It's fun, but as soon as interview prep starts he invariably reverts back to listening to some Anupam Roy, Bolpur Bluez, Blink-182, MCR — and if he's really in the mood for it, then some Megadeth, Gojira or Periphery.",
    ],
    influences: ["Anupam Roy", "Bolpur Bluez", "Blink-182", "My Chemical Romance", "Megadeth"],
    gear: ["Electric guitar into a DI box", "Flat EQ, maximum volume — controlled at the pedal"],
    contributions: [
      "Rhythm and lead guitar",
      "Brings Bengali folk sensibility to the guitar writing",
    ],
    facts: [
      { label: "Raised on", value: "Rabindra Sangeet" },
      { label: "Instrument", value: "Guitar" },
      { label: "Studying", value: "Computer science" },
      { label: "From", value: "West Bengal, India" },
    ],
    offstage: "Carving out a place for himself in the computer sciences.",
  },
  {
    slug: "yuvraaj-rawat",
    name: "Yuvraaj Rawat",
    role: "Drummer",
    instrument: "Drums",
    from: "Uttarakhand, India",
    country: "India",
    accent: "#3B82F6",
    photo: "/photos/yuvraaj-rawat.jpg",
    cutout: "/cutouts/yuvraaj-rawat.png",
    lineup: { scale: 1.16, drop: 0.16, aspect: 0.4955, bodyW: 0.8144, headCx: 0.4185, fadeFrom: 46 },
    gallery: [
      "/photos/gallery/yuvraaj-rawat/01.jpg",
      "/photos/gallery/yuvraaj-rawat/02.jpg",
      "/photos/gallery/yuvraaj-rawat/03.jpg",
      "/photos/gallery/yuvraaj-rawat/04.jpg",
    ],
    tagline:
      "Fifteen years behind a kit, and in the room from the very first rehearsal.",
    bio: [
      "Has been playing the drums for 15 years, and has received formal training in the musical arts.",
      "Joined Animosity since the very start, and has brought his energetic playing style forward with his drum solos and blasting beats.",
      "Currently pursuing a Bachelor's in C.S. and managing the music society on the side.",
    ],
    influences: ["Gojira", "Bullet For My Valentine", "Avenged Sevenfold", "Folk artists"],
    gear: [
      "5-piece drumkit with cymbals + china",
      "Full drum mic kit",
      "In-ear / stage monitors — the rest of the band must be audible over the kit",
    ],
    contributions: [
      "In the band from the very first rehearsal",
      "Drum solos and blast beats",
      "Runs his college music society",
    ],
    facts: [
      { label: "Playing since", value: "15 years" },
      { label: "Training", value: "Formal" },
      { label: "Kit", value: "5-piece + china" },
      { label: "From", value: "Uttarakhand, India" },
    ],
    offstage: "Reading for a Bachelor's in Computer Science and running the music society.",
  },
  {
    slug: "aditya-singh",
    name: "Aditya Pawar Singh",
    role: "Bassist",
    subRole: "Youngest Member",
    instrument: "Bass",
    from: "Uttarakhand, India",
    country: "India",
    accent: "#8B5CF6",
    photo: "/photos/aditya-singh.jpg",
    cutout: "/cutouts/aditya-singh.png",
    lineup: { scale: 0.8, drop: -0.2, aspect: 0.7689, bodyW: 0.603, headCx: 0.356, gapBefore: 0.05 },
    gallery: [],
    tagline:
      "The youngest in the room, writing bass parts nobody asked for and everybody kept.",
    bio: [
      "Youngest member of the team. Playing bass since 2024 and has received formal training in music.",
      "Introduced some experimental bass tones and styles into the band's music, along with lower keys for the songs.",
      "Currently pursuing BBA Media Management and involved in the Pune metal community.",
    ],
    influences: ["Bullet For My Valentine", "Periphery", "Decapitated", "Alesana", "Meshuggah"],
    gear: ["Electric bass into a bass amp", "Wired mic to stage monitors and console address"],
    contributions: [
      "Experimental bass tones and styles",
      "Pushed the songs into lower keys",
      "Connects the band to the Pune metal community",
    ],
    facts: [
      { label: "Playing since", value: "2024" },
      { label: "Training", value: "Formal" },
      { label: "Scene", value: "Pune metal" },
      { label: "From", value: "Uttarakhand, India" },
    ],
    offstage: "Reading BBA Media Management.",
  },
];

export const memberBySlug = (slug: string) => MEMBERS.find((m) => m.slug === slug);

/**
 * Left-to-right order the band stands in on the landing-page line-up only —
 * roughly where they'd be on a stage. Everything else (the members grid, the
 * origins list, the "01 of 08" counters, prev/next) follows MEMBERS order.
 */
export const LINEUP_ORDER = [
  "riyan-gogoi",
  "shubhra-ghosh",
  "harsh-roy",
  "arnold-singh",
  "mathias-oundo",
  "yuvraaj-rawat",
  "partho-roy",
] as const;

export const LINEUP: Member[] = LINEUP_ORDER.map((slug) => {
  const member = memberBySlug(slug);
  if (!member) throw new Error(`LINEUP_ORDER references unknown member: ${slug}`);
  return member;
});

/* ================================================================== */
/* Stand-ins                                                           */
/* ================================================================== */

/**
 * People who filled in with the band for brief periods. Deliberately NOT in
 * `MEMBERS`: that list drives the member pages, the line-up, the origins list
 * and the prev/next rings, and a stand-in with no bio would land in all of it.
 * They get a named credit on /members instead.
 *
 * TODO: instrument, dates and a line each — none of that was supplied.
 */
export type StandIn = {
  name: string;
  /** what they covered, e.g. "Bass" — blank until the band confirms */
  role?: string;
  /** when, e.g. "2024" — blank until the band confirms */
  period?: string;
};

export const STANDINS: StandIn[] = [
  { name: "Kiwinda Ose Ilboundo" },
  { name: "Shailesh Padala" },
];

/* ================================================================== */
/* History                                                             */
/* ================================================================== */

export type Chapter = {
  id: string;
  marker: string;
  title: string;
  standfirst: string;
  body: string[];
  photo?: string;
  /** member slugs introduced in this chapter */
  cast?: string[];
  isPlaceholder: boolean;
};

export const HISTORY: Chapter[] = [
  {
    id: "origin",
    marker: "Chapter I",
    title: "Named on the Bus",
    standfirst: "A name before there was a band, and a debut that got what it deserved.",
    body: [
      "Sharda University's music club is going to Antaragni at IIT Kanpur. The funding for the trip stays uncertain almost to the day it leaves, so nobody prepares anything and nobody is told much in advance. They simply get on the bus.",
      "Somewhere on the road, an invitation comes through: Synchronicity, the fest's metal competition. Whoever happens to be on that bus is now a band, and a band needs a name before it reaches the stage. The name is Animosity — angst, rebellion, belonging to a higher cause. Then they walk on without a single rehearsal between them and take the set apart. Predictably.",
      "The fallout splits the group. The Allfather spends Revelations '23 looking for fresh blood and rebuilds Animosity around one stated target: win the same competition the following year.",
      "The second decision is the one that lasts. No more fusing genres and hoping something sticks — pick one heavy genre and do it better than anyone else in the room, a hot knife through butter. The first call goes to the most gifted musician ever to set foot in Greater Noida, by the Allfather's reckoning, and a man the university's own music club never made room for. Mathias used to hang around the arcade outside it; the Allfather used to play pool with him. A few off-ramp jam sessions settled it. Before the bus ever left for Kanpur, he had already been told: when I'm back, we're forming a band.",
    ],
    photo: "/photos/band-stage-red.jpg",
    cast: ["harsh-roy", "partho-roy"],
    isPlaceholder: false,
  },
  {
    id: "voices",
    marker: "Chapter II",
    title: "Two Voices",
    standfirst: "Clean and harsh, sat side by side.",
    body: [
      "Mathias arrives by an unlikely route — choir, then opera, then an attempt at Hindustani classical, singing since he was about eight. Arnold arrives from the opposite end entirely: a decade in the North-Eastern India metal circuit, with the vocal fry and the screams to show for it.",
      "Putting a trained clean singer next to a death-metal growler should not work. It becomes the thing people remember about the band.",
    ],
    photo: "/photos/mathias-oundo.jpg",
    cast: ["mathias-oundo", "arnold-singh"],
    isPlaceholder: true,
  },
  {
    id: "heavier",
    marker: "Chapter III",
    title: "Going Heavier",
    standfirst: "Lower tunings, odd time signatures, no safety rails.",
    body: [
      "Riyan is brought in from the Assam metal scene with an explicit brief: take the music somewhere darker. He starts writing in lower tunings and odd time signatures, and the band follows him there.",
      "Shubhra comes at the other guitar from Rabindra Sangeet and Bengali folk, which nobody can quite explain but everybody can hear. Aditya, the youngest by some distance, starts writing experimental bass parts and dropping the songs into lower keys.",
    ],
    photo: "/photos/riyan-gogoi.jpg",
    cast: ["riyan-gogoi", "shubhra-ghosh", "aditya-singh"],
    isPlaceholder: true,
  },
  {
    id: "circuit",
    marker: "Chapter IV",
    title: "The Circuit",
    standfirst: "Nine podiums, six of them first.",
    body: [
      "The Delhi-NCR college circuit becomes the proving ground. Synchronicity at IIT Kanpur. Thomso at IIT Roorkee. Schism at IIIT Delhi. Blitzkreig at IIT Delhi, Pulse at AIIMS, and down to Christ University in Bengaluru for Sunergoes.",
      "Nine podium finishes in total, six of them first place. The band stops being a college act and becomes a fixture.",
    ],
    photo: "/photos/live-cokestudio.jpg",
    isPlaceholder: true,
  },
  {
    id: "originals",
    marker: "Chapter V",
    title: "Three Originals",
    standfirst: "Covers stop being the point.",
    body: [
      "First and Final comes first, lyrics by Harsh and carried by Arnold's fry. Mental Distortion turns the same anger inward. Kezualty of War, written musically by Riyan, is the heaviest thing in the catalogue.",
      "A music video is shot and released for First and Final. Three songs is not a lot. Three songs that are entirely theirs is a different thing altogether.",
    ],
    photo: "/photos/band-depot.jpg",
    isPlaceholder: true,
  },
  {
    id: "now",
    marker: "Chapter VI",
    title: "Where It Stands",
    standfirst: "Eight people, five states, three countries.",
    body: [
      "Harsh manages and tours from overseas while finishing a PhD in biotech. Partho runs a tech company. Mathias is training as a neurological physiotherapist, Arnold is studying management in Manipur, Riyan is doing 3D animation, Yuvraaj and Shubhra are in computer science, Aditya is reading media management in Pune.",
      "None of them do this full time. All of them keep showing up.",
    ],
    photo: "/photos/band-portrait.jpg",
    isPlaceholder: true,
  },
];

/* ================================================================== */
/* Technical rider                                                     */
/* ================================================================== */

export const RIDER = [
  {
    description: "Lead Vocals",
    who: "Mathias",
    requirement: ["1 wireless mic with stand"],
    notes: "Low gain",
  },
  {
    description: "Growl Vocals",
    who: "Arnold / Harsh",
    requirement: ["1 wireless for vocals", "1 wired to stage monitors and to console address*", "With stands"],
    notes: "High gain",
  },
  {
    description: "Electric Guitars",
    who: "Shubhra / Harsh / Riyan",
    requirement: ["3× DI boxes for effects pedal outputs"],
    notes: "Flat EQ, maximum volume (controlled by effects pedal)",
  },
  {
    description: "Electric Bass",
    who: "Partho / Aditya",
    requirement: ["1× bass amp", "1 wired mic to stage monitors and to console address*", "With stand"],
    notes: "*The address mic is only for directing the band/console",
  },
  {
    description: "Drumkit",
    who: "Yuvraaj",
    requirement: ["5-piece drumkit with cymbals + china", "Drum mic kit", "In-ear / stage monitors"],
    notes: "Rest of the band must be audible in the drummer's monitor, over the loudness of the whole drumkit",
  },
];

/* ================================================================== */
/* Navigation                                                          */
/* ================================================================== */

export const NAV = [
  { label: "Music", href: "/#music" },
  { label: "Setlist", href: "/setlist" },
  { label: "History", href: "/history" },
  { label: "Members", href: "/members" },
  { label: "Book Us", href: "/#booking" },
];
