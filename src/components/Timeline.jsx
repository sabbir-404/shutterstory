    // eslint-disable-next-line no-unused-vars
    import { motion } from 'framer-motion'

const timeline = [
  {
    year: '2023',
    title: 'The Beginning',
    desc: 'Picked up the camera and fell in love with storytelling.'
  },
    {
    year: '2024',
    title: 'Live Concerts',
    desc: 'Started photographing concerts and live performances.'
  },
  {
    year: '2024',
    title: 'First Wedding',
    desc: 'Captured my first full wedding — emotions changed everything.'
  },
  {
    year: '2025',
    title: 'ShutterStory',
    desc: 'Turning moments into timeless visual stories.'
  }
]

export default function Timeline() {
  return (
    <section className="py-28 bg-panel/40 border-t border-borderSoft">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="font-display text-4xl mb-16 text-center">
          The Journey
        </h2>

        <div className="space-y-14">
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex gap-8 items-start"
            >
              <div className="text-soft text-sm tracking-widest w-20">
                {item.year}
              </div>

              <div>
                <h3 className="text-xl mb-2">
                  {item.title}
                </h3>
                <p className="text-soft max-w-xl">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
