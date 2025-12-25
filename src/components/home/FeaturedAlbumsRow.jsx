import { useEffect, useRef, useState } from "react"
import { supabase } from "../../lib/supabase"
import { Link } from "react-router-dom"
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"

export default function FeaturedAlbumsRow() {
  const [albums, setAlbums] = useState([])
  const sliderRef = useRef(null)

  // Fetch + RANDOMIZE albums
  useEffect(() => {
    const fetchAlbums = async () => {
      const { data, error } = await supabase
        .from("albums")
        .select("id, slug, title, cover_thumb_url, cover_bg_url")
        .limit(12)

      if (error) {
        console.error("Album fetch error:", error)
        return
      }

      // Shuffle for true randomness
      const shuffled = [...data].sort(() => Math.random() - 0.5)
      setAlbums(shuffled)
    }

    fetchAlbums()
  }, [])

  // Auto sliding logic (FIXED)
  useEffect(() => {
    const slider = sliderRef.current
    if (!slider || albums.length === 0) return

    const cardWidth = 300 // must match card width + gap
    let index = 0

    const interval = setInterval(() => {
      index += 1
      slider.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      })

      // Reset when reaching end
      if (
        slider.scrollLeft + slider.clientWidth >=
        slider.scrollWidth - cardWidth
      ) {
        index = 0
        setTimeout(() => {
          slider.scrollTo({ left: 0, behavior: "smooth" })
        }, 800)
      }
    }, 3500)

    return () => clearInterval(interval)
  }, [albums])

  return (
    <section className="py-28">
      <h2 className="font-display text-4xl mb-14 text-center">
        Featured Stories
      </h2>

      <div
        ref={sliderRef}
        className="
          flex gap-8 px-6
          overflow-x-auto
          scroll-smooth
          no-scrollbar
        "
      >
        {albums.map((album) => (
          <Link
            key={album.id}
            to={`/gallery/${album.slug}`}
            className="shrink-0"
          >
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="
                w-[280px]
                bg-panel
                rounded-2xl
                overflow-hidden
                border border-borderSoft
              "
            >
              {/* IMAGE */}
              <div className="aspect-[4/5] overflow-hidden bg-black/20">
                <img
                  src={
                    album.cover_thumb_url ||
                    album.cover_bg_url ||
                    "/fallback.jpg"
                  }
                  alt={album.title}
                  className="
                    w-full h-full object-cover
                    transition-transform duration-700
                    hover:scale-105
                  "
                  draggable={false}
                  onError={(e) => {
                    e.currentTarget.src = "/fallback.jpg"
                  }}
                />
              </div>

              {/* TITLE */}
              <div className="p-4">
                <h3 className="font-display text-lg leading-snug">
                  {album.title}
                </h3>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  )
}
