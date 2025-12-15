import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import { motion } from 'framer-motion'
import 'swiper/css'
import 'swiper/css/effect-fade'

const slides = [
  {
    img: 'https://rehivhbkyaopgsvaibdu.supabase.co/storage/v1/object/public/portfolio-images/weddings/farabi-tisha/thumbnail.jpg',
    text: 'Stories Worth Remembering'
  },
  {
    img: 'https://rehivhbkyaopgsvaibdu.supabase.co/storage/v1/object/public/portfolio-images/concerts/sample.jpg',
    text: 'Moments That Move'
  }
]

export default function GalleryHero() {
  return (
    <section className="h-[70vh] relative">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000 }}
        loop
        className="h-full"
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <img
              src={s.img}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-display text-5xl text-center px-6"
        >
          Visual Stories From Real Moments
        </motion.h1>
      </div>
    </section>
  )
}
