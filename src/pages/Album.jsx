import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion'

export default function Album() {
  const { slug } = useParams()
  const [album, setAlbum] = useState(null)
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    supabase
      .from('albums')
      .select('*')
      .eq('slug', slug)
      .single()
      .then(({ data }) => setAlbum(data))

    supabase
      .from('photos')
      .select('*')
      .eq('album_id', '46a6e739-f3ab-4f23-938e-49dfd230023f')
      .order('created_at')
      .then(({ data }) => setPhotos(data))
  }, [slug])

  if (!album) return null

  return (
    <main>
      {/* Hero */}
      <section className="h-[70vh] relative">
        <img
          src={album.cover_bg_url}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="font-display text-5xl"
          >
            {album.title}
          </motion.h1>
        </div>
      </section>

      {/* Instagram-style grid */}
      <section className="px-6 py-20 columns-1 sm:columns-2 md:columns-3 gap-4">
        {photos.map(p => (
          <motion.img
            key={p.id}
            src={p.url}
            alt={p.alt}
            className="mb-4 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
        ))}
      </section>
    </main>
  )
}
