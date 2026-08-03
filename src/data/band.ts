/**
 * Single source of truth for all Animosity content.
 * Everything here is transcribed from the official Media Kit 2026
 * except where marked `TODO` — those are placeholders for the band to replace.
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

/* ------------------------------------------------------------------ */
/* Songs                                                               */
/* ------------------------------------------------------------------ */

export type Song = {
  slug: string;
  index: string;
  title: string;
  tag: string;
  accent: string;
  /** TODO: replace with the band's own words */
  story: string;
  credits: string[];
  youtubeId?: string;
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
    credits: ["Lyrics — Harsh Roy", "Lead vocals — Arnold Singh", "Music & production — Animosity"],
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
    isPlaceholderStory: true,
  },
];

/* ------------------------------------------------------------------ */
/* Achievements — Battle of Bands                                      */
/* ------------------------------------------------------------------ */

export type Achievement = { place: "1ST" | "2ND"; event: string; venue: string };

export const ACHIEVEMENTS: Achievement[] = [
  { place: "1ST", event: "Synchronicity", venue: "IIT Kanpur" },
  { place: "1ST", event: "Thomso", venue: "IIT Roorkee" },
  { place: "1ST", event: "Schism", venue: "IIIT Delhi" },
  { place: "1ST", event: "Neutron", venue: "Rishihood University" },
  { place: "1ST", event: "Passion", venue: "IIMT Ghaziabad" },
  { place: "1ST", event: "Sankalp", venue: "GLBITM" },
  { place: "2ND", event: "Blitzkreig", venue: "IIT Delhi" },
  { place: "2ND", event: "Pulse", venue: "AIIMS Delhi" },
  { place: "2ND", event: "Sunergoes", venue: "Christ University" },
];

export const STATS = [
  { value: "09", label: "Battle of Bands podiums" },
  { value: "06", label: "First place finishes" },
  { value: "08", label: "Members, five states, three countries" },
  { value: "03", label: "Original compositions" },
];

/* ------------------------------------------------------------------ */
/* Members                                                             */
/* ------------------------------------------------------------------ */

export type Member = {
  slug: string;
  name: string;
  role: string;
  subRole?: string;
  from: string;
  accent: string;
  photo: string;
  bio: string[];
  influences: string[];
};

export const MEMBERS: Member[] = [
  {
    slug: "harsh-roy",
    name: "Harsh Roy",
    role: "Allfather",
    subRole: "Guitar · Vocal Fry · Founder",
    from: "Bihar, India",
    accent: "#E11D2E",
    photo: "/photos/harsh-roy.jpg",
    bio: [
      "Playing guitar since 2018 at a professional level.",
      "Founder of the band and leader of direction, hence christened “Allfather”. Has written the lyrics of the original compositions, as well as music and production. Plays guitar and does vocal fry.",
      "Currently pursuing a PhD in Biotech overseas, while also managing and touring with the band.",
    ],
    influences: ["Avenged Sevenfold", "Bullet For My Valentine", "Shankar–Ehsaan–Loy", "A.R. Rahman"],
  },
  {
    slug: "partho-roy",
    name: "Partho Protim Roy",
    role: "Co-Founder",
    subRole: "Bass",
    from: "Bangladesh",
    accent: "#F97316",
    photo: "/photos/partho-roy.jpg",
    bio: [
      "Years of experience from 2015 in professional music — playing instruments, set design, onstage act and play, live stage executions, event management, stage sound management and console management.",
      "Passionate about music production, writing songs, and concert or show management.",
      "Currently CEO at his tech company, while being deeply involved in the music scene on the side.",
    ],
    influences: ["Animosity", "Lalon Band", "Nagar Baul", "LRB"],
  },
  {
    slug: "mathias-oundo",
    name: "Dr. Mathias Oundo",
    role: "Lead Vocalist",
    subRole: "Assistant Songwriter",
    from: "Kenya · raised in Kenya, India & Lebanon",
    accent: "#E11D2E",
    photo: "/photos/mathias-oundo.jpg",
    bio: [
      "Has been singing since he was maybe 8 years old — starting in choir, then opera, attempted Hindustani classical, and somehow ended up in a metal band.",
      "Lead singer and occasional fry screamer for Animosity. Assistant song writer (is that even a thing?).",
      "Currently pursuing a Masters in Physiotherapy specializing in Neurology.",
    ],
    influences: ["Michael Jackson", "Luther Vandross", "Ice Nine Kills", "Whitney Houston", "Sleep Token"],
  },
  {
    slug: "arnold-singh",
    name: "Hijam Arnold Singh",
    role: "Growler",
    subRole: "Harsh Vocals",
    from: "Manipur, India",
    accent: "#22C55E",
    photo: "/photos/arnold-singh.jpg",
    bio: [
      "Performing since 2015, earlier in the North-Eastern India metal community.",
      "Carried the band through thick and thin with his signature vocal fry and soul-gripping screams. His stage presence is unmatched to this day and his vocal prowess drives the track First and Final.",
      "Currently pursuing management back in his hometown while contributing to the band with some NE-inspirations.",
    ],
    influences: ["Thy Art Is Murder", "Rivers of Nihil", "Gojira", "Sepultura"],
  },
  {
    slug: "riyan-gogoi",
    name: "Riyan Gogoi",
    role: "Guitarist",
    subRole: "Lead · Low Tunings",
    from: "Assam, India",
    accent: "#F43F5E",
    photo: "/photos/riyan-gogoi.jpg",
    bio: [
      "Playing guitar since 2017 in the North-Eastern metal scene.",
      "Brought into the band to lead the music in a heavier direction, experimenting with lower tunings and odd time signatures. Wrote the music for the original composition Kezualty of War.",
      "Currently pursuing a degree in 3D animation on the side while featuring in Animosity shows from time to time.",
    ],
    influences: ["After The Burial", "Periphery", "Death", "All Shall Perish", "Nevermore"],
  },
  {
    slug: "shubhra-ghosh",
    name: "Shubhra Ghosh",
    role: "Guitarist",
    from: "West Bengal, India",
    accent: "#F59E0B",
    photo: "/photos/shubhra-ghosh.jpg",
    bio: [
      "He used to vibe to Rabindra Sangeet and Bengali folk… dunno how that led to playing guitar for Animosity.",
      "Currently trying to carve out a place for himself in the computer sciences.",
      "It's fun, but as soon as interview prep starts he invariably reverts back to listening to some Anupam Roy, Bolpur Bluez, Blink-182, MCR — and if he's really in the mood for it, then some Megadeth, Gojira or Periphery.",
    ],
    influences: ["Anupam Roy", "Bolpur Bluez", "Blink-182", "My Chemical Romance", "Megadeth"],
  },
  {
    slug: "yuvraaj-rawat",
    name: "Yuvraaj Rawat",
    role: "Drummer",
    from: "Uttarakhand, India",
    accent: "#3B82F6",
    photo: "/photos/yuvraaj-rawat.jpg",
    bio: [
      "Has been playing the drums for 15 years, and has received formal training in the musical arts.",
      "Joined Animosity since the very start, and has brought his energetic playing style forward with his drum solos and blasting beats.",
      "Currently pursuing a Bachelor's in C.S. and managing the music society on the side.",
    ],
    influences: ["Gojira", "Bullet For My Valentine", "Avenged Sevenfold", "Folk artists"],
  },
  {
    slug: "aditya-singh",
    name: "Aditya Pawar Singh",
    role: "Bassist",
    subRole: "Youngest Member",
    from: "Uttarakhand, India",
    accent: "#8B5CF6",
    photo: "/photos/aditya-singh.jpg",
    bio: [
      "Youngest member of the team. Playing bass since 2024 and has received formal training in music.",
      "Introduced some experimental bass tones and styles into the band's music, along with lower keys for the songs.",
      "Currently pursuing BBA Media Management and involved in the Pune metal community.",
    ],
    influences: ["Bullet For My Valentine", "Periphery", "Decapitated", "Alesana", "Meshuggah"],
  },
];

/* ------------------------------------------------------------------ */
/* History — TODO: dates and beats to be confirmed by the band          */
/* ------------------------------------------------------------------ */

export type Chapter = {
  id: string;
  marker: string;
  title: string;
  body: string;
  photo?: string;
  isPlaceholder: boolean;
};

export const HISTORY: Chapter[] = [
  {
    id: "origin",
    marker: "CH. I",
    title: "The Founding",
    body: "Harsh and Partho start the band in Greater Noida with Yuvraaj on drums from the very first rehearsal. The name comes first — animosity, the angst, the rebellion, the sense of belonging to a higher cause — and the sound is built to match it.",
    photo: "/photos/hero-stage.jpg",
    isPlaceholder: true,
  },
  {
    id: "voices",
    marker: "CH. II",
    title: "Two Voices",
    body: "Mathias arrives from choir, opera and an attempt at Hindustani classical; Arnold arrives from the North-Eastern metal circuit with a decade of screams behind him. Clean and harsh, sat side by side. It should not work. It becomes the signature.",
    photo: "/photos/mathias-oundo.jpg",
    isPlaceholder: true,
  },
  {
    id: "heavier",
    marker: "CH. III",
    title: "Going Heavier",
    body: "Riyan is brought in to drag the music somewhere darker — lower tunings, odd time signatures, no safety rails. Shubhra brings Bengali folk sensibility to the other guitar, and Aditya, the youngest, starts writing bass parts nobody asks for and everybody keeps.",
    photo: "/photos/riyan-gogoi.jpg",
    isPlaceholder: true,
  },
  {
    id: "circuit",
    marker: "CH. IV",
    title: "The Circuit",
    body: "Nine podium finishes across the Battle of Bands circuit — IIT Kanpur, IIT Roorkee, IIIT Delhi, IIT Delhi, AIIMS Delhi and more. Six of them first place. The band becomes a fixture of the Delhi-NCR college scene.",
    photo: "/photos/live-cokestudio.jpg",
    isPlaceholder: true,
  },
  {
    id: "originals",
    marker: "CH. V",
    title: "Three Originals",
    body: "First and Final, Mental Distortion and Kezualty of War. Lyrics by Harsh, music built by the whole room, and the first official music video shot and released. Covers stop being the point.",
    photo: "/photos/group-collage.jpg",
    isPlaceholder: true,
  },
];

/* ------------------------------------------------------------------ */
/* Technical rider                                                     */
/* ------------------------------------------------------------------ */

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

export const NAV = [
  { label: "The Band", href: "#band" },
  { label: "Music", href: "#music" },
  { label: "History", href: "#history" },
  { label: "Members", href: "#members" },
  { label: "Book Us", href: "#booking" },
];
