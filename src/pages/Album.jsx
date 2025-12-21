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

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const fetchAlbumAndPhotos = async () => {
      // Fetch album by slug
      const { data: albumData } = await supabase
        .from('albums')
        .select('*')
        .eq('slug', slug)
        .single()

      setAlbum(albumData)

      // Fetch photos only if album exists
      if (albumData?.id) {
        const { data: photoData } = await supabase
          .from('photos')
          .select('*')
          .eq('album_id', albumData.id)
          .order('created_at')

        setPhotos(photoData || [])
        console.log('Album:', albumData)
        console.log('Photos:', photoData)
      }
    }

    fetchAlbumAndPhotos()
  }, [slug])

  /* ================= KEYBOARD CONTROLS ================= */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeIndex === null) return

      if (e.key === 'Escape') setActiveIndex(null)
      if (e.key === 'ArrowLeft') {
        setActiveIndex((i) => Math.max(i - 1, 0))
      }
      if (e.key === 'ArrowRight') {
        setActiveIndex((i) => Math.min(i + 1, photos.length - 1))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex, photos.length])

  if (!album) return null

  return (
    <main>
      {/* ================= HERO ================= */}
      <section className="relative h-[60vh] sm:h-[65vh]">
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
              className="font-display text-4xl sm:text-5xl mb-4"
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

      {/* ================= PHOTO GRID ================= */}
      <section
        className="
          px-4 sm:px-6 py-16 sm:py-20
          columns-1 sm:columns-2 lg:columns-3
          gap-4
        "
        onContextMenu={(e) => e.preventDefault()}
      >
        {photos.map((photo, index) => (
          <img
            key={photo.id}
            src={photo.url}
            alt={photo.alt || album.title}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="
              mb-4 rounded-lg cursor-zoom-in
              transition-opacity duration-700
              opacity-0
            "
            onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </section>

      {/* ================= LIGHTBOX ================= */}
      <Lightbox
        images={photos.map((p) => p.url)}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onPrev={() => setActiveIndex((i) => i - 1)}
        onNext={() => setActiveIndex((i) => i + 1)}
      />
    </main>
  )
}
