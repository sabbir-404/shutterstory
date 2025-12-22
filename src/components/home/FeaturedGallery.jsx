import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"

export default function FeaturedGallery() {
  const [images, setImages] = useState([])

  useEffect(() => {
    supabase
      .from("photos")
      .select("url")
      .limit(4)
      .then(({ data }) => setImages(data || []))
  }, [])

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <h2 className="font-display text-4xl mb-16 text-center">
        Selected Works
      </h2>

      <div className="grid md:grid-cols-4 gap-8">
        {images.map((img, i) => (
          <motion.img
            key={i}
            src={img.url}
            className="rounded-xl aspect-[3/4] object-cover"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
        ))}
      </div>
    </section>
  )
}
