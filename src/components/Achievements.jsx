import { motion } from 'framer-motion'

const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '300+', label: 'Weddings Covered' },
  { value: '50+', label: 'Concerts Shot' },
  { value: '1000+', label: 'Stories Captured' }
]

export default function Achievements() {
  return (
    <section className="py-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10 text-center">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <h2 className="font-display text-4xl">{s.value}</h2>
            <p className="text-muted mt-2">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
