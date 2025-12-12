import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Gallery() {
  const [albums, setAlbums] = useState([])

  useEffect(() => {
    supabase
      .from('albums')
      .select('*')
      .eq('category', 'weddings')
      .then(({ data }) => setAlbums(data))
  }, [])

  return (
    <main className="pt-24 px-6 max-w-7xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="font-display text-4xl mb-12"
      >
        Weddings
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-8">
        {albums.map(album => (
          <Link key={album.id} to={`/weddings/${album.slug}`}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
              className="relative h-[420px] rounded-xl overflow-hidden"
            >
              <img
                src={album.cover_bg_url}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                <h2 className="font-display text-2xl">
                  {album.title}
                </h2>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </main>
  )
}
