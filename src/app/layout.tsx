import type { Metadata, Viewport } from "next";
import { Anton, Archivo, JetBrains_Mono } from "next/font/google";
import { BAND } from "@/data/band";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono-jb",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://animosity.band"),
  title: {
    default: "Animosity — Hard Rock / Metal Band | Delhi-NCR",
    template: "%s — Animosity",
  },
  description:
    "Animosity is a hard rock / metal band out of Greater Noida, Delhi-NCR. Nine Battle of Bands podiums, three originals, eight members across five states and three countries.",
  keywords: [
    "Animosity",
    "metal band India",
    "Delhi NCR metal",
    "Greater Noida band",
    "battle of bands",
    "First and Final",
  ],
  openGraph: {
    title: "Animosity — Hard Rock / Metal Band",
    description:
      "Angst. Rebellion. A higher cause. Hard rock and metal out of Delhi-NCR.",
    url: "/",
    siteName: "Animosity",
    images: [{ url: "/photos/band-live.jpg", width: 1693, height: 1059 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Animosity — Hard Rock / Metal Band",
    description: "Angst. Rebellion. A higher cause.",
    images: ["/photos/band-live.jpg"],
  },
  alternates: { canonical: "/" },

  /**
   * Tab icon is the band's own "A" animation. Firefox plays the GIF; Chrome and
   * Safari don't animate GIF favicons, so they land on its first frame — which
   * is the clean glyph, not a glitch frame. The PNG/ICO entries are there for
   * anything that won't take a GIF at all. Strokes are dilated at 16/32px
   * because the blackletter A is too thin to read otherwise.
   */
  icons: {
    icon: [
      { url: "/favicon/icon-32.gif", type: "image/gif", sizes: "32x32" },
      { url: "/favicon/icon-48.gif", type: "image/gif", sizes: "48x48" },
      { url: "/favicon/icon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon/icon-16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/favicon/icon-180.png", sizes: "180x180" }],
  },
  manifest: "/favicon/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: BAND.name,
  genre: ["Hard Rock", "Metal"],
  email: BAND.email,
  url: "https://animosity.band",
  sameAs: [BAND.instagram, BAND.youtube],
  foundingLocation: { "@type": "Place", name: "Greater Noida, Delhi-NCR, India" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${archivo.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="grain min-h-full bg-void">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
