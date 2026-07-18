"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { BookOpen, PlayCircle, Wind, Mic, FileText, ArrowRight } from "lucide-react"

const resources = [
  { icon: BookOpen, title: "Articles", description: "Practical guides on anxiety, stress, relationships, and more." },
  { icon: PlayCircle, title: "Videos", description: "Short, expert-led videos on everyday mental health topics." },
  { icon: Wind, title: "Meditation", description: "Guided sessions to help you slow down and reset." },
  { icon: Wind, title: "Breathing Exercises", description: "Simple techniques to calm your body in the moment." },
  { icon: Mic, title: "Podcasts", description: "Conversations with therapists on the topics that matter." },
  { icon: FileText, title: "Guides", description: "Step-by-step resources for common life challenges." },
]

export function ResourcesSection() {
  return (
    <section id="resources" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14"
        >
          <div>
            <p className="text-sm uppercase tracking-widest text-thera-primary font-medium mb-3">
              Resources
            </p>
            <h2 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl">
              Free support, any time you need it
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-thera-primary hover:gap-3 transition-all"
          >
            Browse all resources <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {resources.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="p-6 rounded-2xl bg-thera-card border border-thera-ink/10 hover:border-thera-primary/30 transition-all duration-300 shadow-sm"
            >
              <div className="w-11 h-11 rounded-xl bg-thera-accent/10 flex items-center justify-center mb-4">
                <r.icon className="w-5 h-5 text-thera-accent" />
              </div>
              <h3 className="font-semibold mb-2">{r.title}</h3>
              <p className="text-sm text-thera-muted leading-relaxed">{r.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
