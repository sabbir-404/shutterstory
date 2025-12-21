import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion"

export default function GalleryHeroSlider() {
  const [heroImages, setHeroImages] = useState([])
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const fetchRandomImages = async () => {
      const { data, error } = await supabase
        .from("photos")
        .select("url")
        .limit(6) // show 6 random images
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Hero images fetch error:", error)
        return
      }

      // shuffle randomly
      const shuffled = data.sort(() => Math.random() - 0.5)
      setHeroImages(shuffled)
    }

    fetchRandomImages()
  }, [])

  // auto cycle slider
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length)
    }, 5000) // 5s interval

    return () => clearInterval(id)
  }, [heroImages])

  if (heroImages.length === 0) return null

  return (
    <section className="relative h-[60vh] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        {heroImages.map((img, idx) =>
          idx === current ? (
            <motion.img
              key={idx}
              src={img.url}
              alt="Gallery hero"
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
            />
          ) : null
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        {/* Overlay text - placeholder for now */}
        <h1 className="text-4xl text-white font-display">
          ShutterStory Gallery
        </h1>
      </div>
    </section>
  )
}
