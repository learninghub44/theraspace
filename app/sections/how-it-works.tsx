"use client"

import { motion } from "framer-motion"
import { Search, UserCheck, MessageCircle } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Browse listings",
    description: "Filter by concern, location, or language to find therapists who fit.",
  },
  {
    icon: UserCheck,
    title: "Check their profile",
    description: "Qualifications, specialties, and pricing — set by the therapist, not us.",
  },
  {
    icon: MessageCircle,
    title: "Contact directly",
    description: "Reach out by phone or email and book with them yourself. No middleman.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 lg:py-28 overflow-hidden">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl">
            How it works
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-thera-primary/10 flex items-center justify-center mb-4">
                <step.icon className="w-6 h-6 text-thera-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-thera-muted leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
