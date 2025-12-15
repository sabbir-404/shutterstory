import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

export default function Category() {
  const { category } = useParams()
  const [albums, setAlbums] = useState([])

  useEffect(() => {
    supabase
      .from('albums')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false })
      .then(({ data }) => setAlbums(data || []))
  }, [category])

  return (
    <main className="pt-24 px-6 max-w-7xl mx-auto">
      <h1 className="font-display text-4xl capitalize mb-14">
        {category.replace('-', ' ')}
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {albums.map((album) => (
          <Link
            key={album.id}
            to={`/gallery/${category}/${album.slug}`}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative h-72 rounded-xl overflow-hidden"
            >
              <img
                src={album.cover_bg_url}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-end p-5">
                <h3 className="font-display text-xl">
                  {album.title}
                </h3>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {albums.length === 0 && (
        <p className="text-soft mt-10">
          No events added yet.
        </p>
      )}
    </main>
  )
}
