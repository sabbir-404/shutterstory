import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import { motion } from 'framer-motion'
import 'swiper/css'
import 'swiper/css/effect-fade'

const slides = [
  '/hero/hero1.jpg',
  '/hero/hero2.jpg',
  '/hero/hero3.jpg'
]

export default function HeroSlider() {
  return (
    <section className="h-screen relative">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000 }}
        loop
        className="h-full"
      >
        {slides.map((img, i) => (
          <SwiperSlide key={i}>
            <img
              src={img}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
          className="text-center"
        >
          <h1 className="font-display text-6xl mb-4">
            ShutterStory
          </h1>
          <p className="text-muted tracking-wide">
            Weddings · Concerts · Travel · Seminars
          </p>
        </motion.div>
      </div>
    </section>
  )
}
