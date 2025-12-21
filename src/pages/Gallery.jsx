/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const categories = [
  { slug: 'wedding', title: 'Wedding' },
  { slug: 'concert', title: 'Concert' },
  { slug: 'seminar', title: 'Seminar' },
  { slug: 'travel', title: 'Travel' },
  { slug: 'conference', title: 'Conference' },
  { slug: 'cultural', title: 'Cultural Programs' }
]

export default function Gallery() {
  return (
    <main className="pt-24 px-6 max-w-7xl mx-auto">
      <h1 className="font-display text-4xl mb-14 text-center">
        Gallery
      </h1>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="font-display text-4xl mb-12 text-center">
          Event Categories
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Link key={cat.slug} to={`/gallery/${cat.slug}`}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="
                  h-48 rounded-xl bg-panel
                  flex items-center justify-center
                  border border-borderSoft
                "
              >
                <h3 className="text-2xl font-display">
                  {cat.title}
                </h3>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
