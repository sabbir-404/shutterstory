// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"

const images = [
  "/placeholder1.jpg",
  "/placeholder2.jpg",
  "/placeholder3.jpg"
]

export default function FeaturedGallery() {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="font-display text-4xl mb-16 text-center"
      >
        Selected Works
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-10">
        {images.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className="aspect-[3/4] rounded-xl bg-panel"
          />
        ))}
      </div>
    </section>
  )
}
