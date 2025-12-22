import HeroSection from "../components/home/HeroSection"
import FeaturedGallery from "../components/home/FeaturedGallery"
import AboutMe from "../components/home/AboutMe"
import Timeline from "../components/Timeline"
import ContactSection from "../components/home/ContactSection"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedGallery />
      <AboutMe />
      <Timeline />
      <ContactSection />
    </main>
  )
}
