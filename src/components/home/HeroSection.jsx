// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"

export default function HeroSection() {
  return (
    <section className="min-h-[90vh] flex items-center justify-center text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="max-w-4xl"
      >
        <h1 className="font-display text-5xl md:text-7xl mb-6">
          ShutterStory
        </h1>

        <p className="text-soft text-lg md:text-xl max-w-2xl mx-auto">
          Cinematic photography capturing moments, emotions,
          and stories through light.
        </p>
      </motion.div>
    </section>
  )
}
