import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Manifesto from "@/components/Manifesto";
import Music from "@/components/Music";
import History from "@/components/History";
import Achievements from "@/components/Achievements";
import Members from "@/components/Members";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee
          items={[
            "Animosity",
            "Hard Rock / Metal",
            "Delhi-NCR",
            "Est. Greater Noida",
          ]}
        />
        <Manifesto />
        <Music />
        <History />
        <Achievements />
        <Marquee
          items={["First and Final", "Mental Distortion", "Kezualty of War"]}
          duration={22}
          reverse
        />
        <Members />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
