"use client"

import { motion } from "framer-motion"

const photos = [
  {
    src: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&q=80",
    alt: "Therapist in a warm consultation room",
    span: "row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
    alt: "Client and therapist in conversation",
    span: "row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1573497491208-6b1acb260507?w=800&q=80",
    alt: "Calm therapy office space",
    span: "row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1590650046871-92c887180603?w=800&q=80",
    alt: "Supportive counseling session",
    span: "row-span-2",
  },
]

export function PhotoShowcaseSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-sm uppercase tracking-widest text-thera-muted mb-4">Real spaces, real care</p>
          <h2 className="text-3xl lg:text-4xl font-bold">
            Where therapy happens
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 auto-rows-[180px]">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative rounded-2xl overflow-hidden border border-thera-ink/10 ${photo.span}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-thera-bg/40 via-transparent to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
