import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import 'swiper/css'
import 'swiper/css/effect-fade'

import hero1 from '../assets/hero/hero1.jpg'
import hero2 from '../assets/hero/hero2.jpg'
import hero3 from '../assets/hero/hero3.jpg'

const slides = [hero1, hero2, hero3]

export default function HeroSlider() {
  return (
    <section className="h-screen relative overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="h-full"
      >
        {slides.map((img, i) => (
          <SwiperSlide key={i}>
            <img
              src={img}
              className="w-full h-full object-cover"
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: 'easeOut' }}
          className="text-center px-6"
        >
          <h1 className="font-display text-6xl md:text-7xl mb-4">
            ShutterStory
          </h1>
          <p className="text-soft tracking-widest uppercase text-sm">
            Weddings · Concerts · Travel · Seminars
          </p>
        </motion.div>
      </div>
    </section>
  )
}
