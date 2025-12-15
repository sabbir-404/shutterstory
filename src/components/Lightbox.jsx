// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'

export default function Lightbox({ images, index, onClose, onPrev, onNext }) {
  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
          onClick={onClose}
          onContextMenu={(e) => e.preventDefault()}
        >
          {/* Image */}
          <motion.img
            key={images[index]}
            src={images[index]}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
            draggable={false}
          />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-soft text-3xl hover:text-accent transition"
          >
            ✕
          </button>

          {/* Navigation */}
          {index > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); onPrev() }}
              className="absolute left-6 text-soft text-4xl hover:text-accent"
            >
              ‹
            </button>
          )}

          {index < images.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); onNext() }}
              className="absolute right-6 text-soft text-4xl hover:text-accent"
            >
              ›
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
