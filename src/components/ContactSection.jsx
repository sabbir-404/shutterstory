import { motion } from 'framer-motion'

export default function ContactSection() {
  return (
    <section id="contact" className="py-28 bg-panel">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-xl mx-auto px-6"
      >
        <h2 className="font-display text-3xl mb-6 text-center">
          Let’s Work Together
        </h2>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full bg-bg border border-white/10 px-4 py-3 rounded-md"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full bg-bg border border-white/10 px-4 py-3 rounded-md"
          />
          <textarea
            rows="4"
            placeholder="Your Message"
            className="w-full bg-bg border border-white/10 px-4 py-3 rounded-md"
          />

          <button
            type="submit"
            className="w-full py-3 border border-white/20 hover:bg-white hover:text-black transition"
          >
            Send Message
          </button>
        </form>
      </motion.div>
    </section>
  )
}
