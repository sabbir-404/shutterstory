// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import HeroSlider from '../components/HeroSlider'
import Achievements from '../components/Achievements'
import Timeline from '../components/Timeline'
import AboutMe from '../components/AboutMe'
import ContactSection from '../components/ContactSection'

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <Achievements />
      <Timeline />
      <AboutMe />
      <ContactSection />
    </main>
  )
}
