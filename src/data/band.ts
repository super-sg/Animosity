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
    isPlaceholderStory: true,
  },
];

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
    title: "The Founding",
    standfirst: "A name before a song.",
    body: [
      "Animosity starts in Greater Noida with Harsh on guitar and Partho on bass — one a guitarist since 2018 with a clear idea of the direction, the other already five years deep in professional live music, set design and console work. Yuvraaj is behind the kit from the very first rehearsal.",
      "The name comes first. Animosity: the feeling of angst, of rebellion, of belonging to a higher cause. Everything after that is an attempt to build a sound that earns it.",
    ],
    photo: "/photos/band-live.jpg",
    cast: ["harsh-roy", "partho-roy", "yuvraaj-rawat"],
    isPlaceholder: true,
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
    photo: "/photos/band-portrait.jpg",
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
  { label: "History", href: "/history" },
  { label: "Members", href: "/members" },
  { label: "Book Us", href: "/#booking" },
];
