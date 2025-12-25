import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import { motion, AnimatePresence } from "framer-motion"

export default function HomeHero() {
  const [albums, setAlbums] = useState([])
  const [current, setCurrent] = useState(0)

  // Fetch featured albums
  useEffect(() => {
    const fetchAlbums = async () => {
      const { data, error } = await supabase
        .from("albums")
        .select("id, title, cover_bg_url, hero_story")
        .eq("is_featured", true)
        .order("created_at", { ascending: false })
        .limit(6)

      if (!error && data?.length) {
        setAlbums(data)
      }
    }

    fetchAlbums()
  }, [])

  // Auto slide
  useEffect(() => {
    if (albums.length <= 1) return

    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % albums.length)
    }, 7000)

    return () => clearInterval(id)
  }, [albums])

  if (!albums.length) return null

  const active = albums[current]

  return (
    <section className="relative h-[85vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={active.id}
          src={active.cover_bg_url}
          alt={active.title}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1.12 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 8, ease: "easeOut" }}
          draggable={false}
        />
      </AnimatePresence>

      {/* Gradient overlay */}
      <div className="
        absolute inset-0
        bg-gradient-to-t
        from-black/80
        via-black/40
        to-black/10
        flex items-center
      ">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id + "-text"}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1.1 }}
            className="max-w-4xl px-6 md:px-12"
          >
            <h1 className="font-display text-4xl md:text-6xl mb-4">
              {active.title}
            </h1>
            {active.hero_story && (
              <p className="text-soft max-w-xl text-lg leading-relaxed">
                {active.hero_story}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {albums.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`
              w-2.5 h-2.5 rounded-full
              transition-all
              ${i === current ? "bg-white scale-110" : "bg-white/40"}
            `}
          />
        ))}
      </div>
    </section>
  )
}
