import { Link } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import GalleryHero from '../components/GalleryHero'

const categories = [
  { slug: 'wedding', title: 'Wedding' },
  { slug: 'concert', title: 'Concert' },
  { slug: 'seminar', title: 'Seminars' },
  { slug: 'travel', title: 'Travel' },
  { slug: 'conference', title: 'Conference' },
  { slug: 'cultural', title: 'Cultural Programs' }
]

export default function Gallery() {
  return (
    <main>
      {/* Hero */}
      <GalleryHero />

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
