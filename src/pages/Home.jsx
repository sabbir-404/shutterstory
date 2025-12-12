import { motion } from 'framer-motion'
import HeroSlider from '../components/HeroSlider'
import Achievements from '../components/Achievements'
import AboutMe from '../components/AboutMe'
import ContactSection from '../components/ContactSection'

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <Achievements />
      <AboutMe />
      <ContactSection />
    </main>
  )
}
