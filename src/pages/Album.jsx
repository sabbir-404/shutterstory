import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import Lightbox from '../components/Lightbox'

export default function Album() {
  const { slug } = useParams()

  const [album, setAlbum] = useState(null)
  const [photos, setPhotos] = useState([])
  const [activeIndex, setActiveIndex] = useState(null)

  // Fetch album + photos
  useEffect(() => {
    const fetchData = async () => {
      const { data: albumData } = await supabase
        .from('albums')
        .select('*')
        .eq('slug', slug)
        .single()

      setAlbum(albumData)

      if (albumData?.id) {
        const { data: photoData } = await supabase
          .from('photos')
          .select('*')
          .eq('album_id', albumData.id)
          .order('created_at')

        setPhotos(photoData || [])
      }
    }

    fetchData()
  }, [slug])

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKey = (e) => {
      if (activeIndex === null) return
      if (e.key === 'Escape') setActiveIndex(null)
      if (e.key === 'ArrowLeft') {
        setActiveIndex(i => Math.max(i - 1, 0))
      }
      if (e.key === 'ArrowRight') {
        setActiveIndex(i => Math.min(i + 1, photos.length - 1))
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [activeIndex, photos.length])

  if (!album) return null

  return (
    <main>
      {/* ================= HERO ================= */}
      <section className="h-[65vh] relative">
        <img
          src={album.cover_bg_url}
          alt={album.title}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />

        <div className="absolute inset-0 bg-black/55 flex items-center">
          <div className="max-w-4xl px-6">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="font-display text-5xl mb-4"
            >
              {album.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-soft max-w-xl"
            >
              A cinematic wedding story capturing emotions,
              rituals, and unforgettable moments.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ================= GRID ================= */}
      <section
        className="px-6 py-20 columns-1 sm:columns-2 md:columns-3 gap-4"
        onContextMenu={(e) => e.preventDefault()}
      >
        {photos.map((p, i) => (
          <img
            key={p.id}
            src={p.url}
            alt={p.alt || album.title}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="
              mb-4 rounded-lg cursor-zoom-in
              transition-opacity duration-700
              opacity-0
            "
            onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </section>

      {/* ================= LIGHTBOX ================= */}
      <Lightbox
        images={photos.map(p => p.url)}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onPrev={() => setActiveIndex(i => i - 1)}
        onNext={() => setActiveIndex(i => i + 1)}
      />
    </main>
  )
}
