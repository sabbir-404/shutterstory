import { motion } from 'framer-motion'

export default function AboutMe() {
  return (
    <section id="about" className="py-28">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="font-display text-4xl mb-8"
        >
          About Me
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-muted leading-relaxed"
        >
          I believe photography is not about perfection —
          it’s about emotion, light, and truth.
          <br /><br />
          Through weddings, concerts, travels, and seminars,
          I document moments as they naturally unfold —
          timeless, cinematic, and deeply human.
        </motion.p>
      </div>
    </section>
  )
}
