import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"

export default function HeroSection() {
  const [image, setImage] = useState(null)

  useEffect(() => {
    supabase
      .from("photos")
      .select("url")
      .limit(1)
      .order("created_at", { ascending: false })
      .then(({ data }) => setImage(data?.[0]?.url))
  }, [])

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center">
      {image && (
        <motion.img
          src={image}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 6 }}
        />
      )}

      <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <h1 className="font-display text-6xl mb-6">
            ShutterStory
          </h1>
          <p className="text-soft text-xl max-w-2xl">
            Capturing timeless moments through cinematic storytelling
          </p>
        </motion.div>
      </div>
    </section>
  )
}
