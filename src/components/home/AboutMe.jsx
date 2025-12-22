// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import profile from "../../assets/profile.jpg"

export default function AboutMe() {
  return (
    <section className="py-32 px-6 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.img
          src={profile}
          alt="Photographer"
          className="rounded-2xl w-full object-cover"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="font-display text-4xl mb-6">
            About Me
          </h2>

          <p className="text-soft leading-relaxed">
            I am a photographer focused on capturing honest moments,
            emotions, and atmosphere. From weddings to live events,
            my goal is to tell stories that feel timeless and real.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
