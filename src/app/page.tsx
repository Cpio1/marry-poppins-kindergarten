import { About } from "@/components/About";
import { Activities } from "@/components/Activities";
import { Contacts } from "@/components/Contacts";
import { Documents } from "@/components/Documents";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Groups } from "@/components/Groups";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Info } from "@/components/Info";
import { Nutrition } from "@/components/Nutrition";
import { WhyUs } from "@/components/WhyUs";
import { getSiteImages } from "@/lib/images";

export default function Home() {
  const { logo, hero, about, gallery } = getSiteImages();

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:font-bold focus:shadow-lg"
      >
        Перейти к содержанию
      </a>
      <Header logo={logo} />
      <main>
        <Hero logo={logo} hero={hero} />
        <About photo={about} />
        <Info />
        <Groups />
        <Activities />
        <WhyUs />
        <Nutrition />
        <Gallery images={gallery} />
        <Documents />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
