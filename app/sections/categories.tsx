"use client"

import { motion } from "framer-motion"
import {
  Wind,
  CloudRain,
  Flame,
  ShieldAlert,
  Heart,
  Home,
  Sparkles,
  Briefcase,
  LifeBuoy,
  HandHeart,
} from "lucide-react"

const categories = [
  { icon: Wind, label: "Anxiety" },
  { icon: CloudRain, label: "Depression" },
  { icon: Flame, label: "Stress" },
  { icon: ShieldAlert, label: "Trauma" },
  { icon: Heart, label: "Relationships" },
  { icon: Home, label: "Family Therapy" },
  { icon: Sparkles, label: "Teen Therapy" },
  { icon: Briefcase, label: "Career Counseling" },
  { icon: LifeBuoy, label: "Addiction" },
  { icon: HandHeart, label: "Grief" },
]

export function CategoriesSection() {
  return (
    <section className="relative py-20 lg:py-24 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-sm uppercase tracking-widest text-thera-primary font-medium">
            Or jump straight to a topic
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-x-3 gap-y-4 max-w-3xl mx-auto">
          {categories.map((cat, i) => (
            <motion.a
              key={cat.label}
              href={`/therapists?category=${encodeURIComponent(cat.label)}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-thera-text/80 hover:text-thera-primary transition-colors"
            >
              <cat.icon className="w-4 h-4 text-thera-primary/70 group-hover:text-thera-primary transition-colors" strokeWidth={1.5} />
              {cat.label}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
