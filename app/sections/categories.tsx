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
    <section className="relative py-24 lg:py-28 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-sm uppercase tracking-widest text-thera-primary font-medium mb-3">
            What&apos;s on your mind
          </p>
          <h2 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl">
            Find support for what you&apos;re facing
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <motion.a
              key={cat.label}
              href="#therapists"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-thera-card border border-thera-ink/10 hover:border-thera-primary/30 hover:-translate-y-1 transition-all duration-300 shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-thera-primary/10 flex items-center justify-center group-hover:bg-thera-primary/15 transition-colors">
                <cat.icon className="w-6 h-6 text-thera-primary" />
              </div>
              <span className="text-sm font-medium text-center">{cat.label}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
