import HomeHeroSlider from "../components/home/HomeHero"
import FeaturedAlbumsRow from "../components/home/FeaturedAlbumsRow"
import AboutMe from "../components/home/AboutMe"
import Timeline from "../components/Timeline"
import ContactSection from "../components/home/ContactSection"

export default function Home() {
  return (
    <main>
      <HomeHeroSlider />
      <FeaturedAlbumsRow />
      <AboutMe />
      <Timeline />
      <ContactSection />
    </main>
  )
}
