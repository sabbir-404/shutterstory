import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import {
  // eslint-disable-next-line no-unused-vars
  motion,
  AnimatePresence,
  useReducedMotion
} from "framer-motion"

export default function GalleryHeroSlider() {
  const [heroImages, setHeroImages] = useState([])
  const [current, setCurrent] = useState(0)
  const reduceMotion = useReducedMotion()

  // =========================
  // Fetch random hero images
  // =========================
  useEffect(() => {
    const fetchRandomImages = async () => {
      const { data, error } = await supabase
        .from("photos")
        .select("url, hero_caption")
        .limit(40) // pull a pool, not just 6

      if (error) {
        console.error("Hero images fetch error:", error)
        return
      }

      // Shuffle client-side for true randomness
      const shuffled = [...data].sort(() => Math.random() - 0.5)

      // Pick first 6
      setHeroImages(shuffled.slice(0, 6))
    }

    fetchRandomImages()
  }, [])

  // =========================
  // Auto slide
  // =========================
  useEffect(() => {
    if (heroImages.length === 0) return

    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length)
    }, 5500)

    return () => clearInterval(id)
  }, [heroImages])

  if (heroImages.length === 0) return null

  return (
    <section className="relative h-[70vh] md:h-[60vh] w-full overflow-hidden">
      {/* ================= IMAGES ================= */}
      <AnimatePresence mode="wait">
        {heroImages.map((img, idx) =>
          idx === current ? (
            <motion.img
              key={idx}
              src={img.url}
              alt="Gallery hero"
              className="absolute inset-0 w-full h-full object-cover"
              initial={{
                opacity: 0,
                scale: reduceMotion ? 1 : 1.05
              }}
              animate={{
                opacity: 1,
                scale: reduceMotion ? 1 : 1.12
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 6,
                ease: "easeOut"
              }}
              draggable={false}
            />
          ) : null
        )}
      </AnimatePresence>

      {/* ================= OVERLAY ================= */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-t
          from-black/85 via-black/45 to-black/15
          flex items-center justify-center
          text-center
        "
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 1 }}
            className="px-6"
          >
            <h1 className="font-display text-3xl md:text-5xl mb-3">
              ShutterStory
            </h1>

            <p className="text-soft max-w-xl mx-auto">
              {heroImages[current]?.hero_caption ||
                "Visual stories captured with emotion and light"}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
