"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { cn } from "@/app/lib/utils"

const testimonials = [
  {
    name: "Dr. Sarah Kimani",
    role: "Clinical Psychologist",
    clinic: "Nairobi Mind & Wellness",
    image: "SK",
    rating: 5,
    text: "TheraSpace has completely transformed how I run my practice. The AI note generation alone saves me 2 hours every day. I can finally focus on what I love — helping my clients heal.",
  },
  {
    name: "Dr. James Ochieng",
    role: "Counseling Psychologist",
    clinic: "Hope Therapy Center",
    image: "JO",
    rating: 5,
    text: "The multi-tenant architecture is exactly what we needed for our group practice. Each therapist has their own secure space, and I can oversee everything from one dashboard. Brilliant.",
  },
  {
    name: "Dr. Amina Wanjiku",
    role: "Mental Health Therapist",
    clinic: "Serenity Clinic",
    image: "AW",
    rating: 5,
    text: "My clients love the portal. They can book appointments, track their mood, and share journal entries with me. The engagement has increased by 60% since we switched to TheraSpace.",
  },
  {
    name: "Dr. David Mwangi",
    role: "Child Psychologist",
    clinic: "Little Minds Kenya",
    image: "DM",
    rating: 5,
    text: "The treatment plan features and homework assignments are incredibly well-designed. The AI suggestions for interventions are evidence-based and actually useful. Best investment for my practice.",
  },
  {
    name: "Grace Odhiambo",
    role: "Clinic Administrator",
    clinic: "Healing Hands Clinic",
    image: "GO",
    rating: 5,
    text: "As an admin, I appreciate the role management and analytics. I can see exactly how each therapist is performing, manage billing, and generate reports for insurance in minutes.",
  },
]

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length)
  const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-thera-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Loved by therapists{" "}
            <span className="text-gradient">everywhere</span>
          </h2>
          <p className="text-lg text-thera-muted max-w-2xl mx-auto">
            Hear from practitioners who have transformed their practices with TheraSpace.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: `-${activeIndex * 100}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex"
            >
              {testimonials.map((testimonial, i) => (
                <div key={i} className="w-full flex-shrink-0 px-4">
                  <div className="max-w-3xl mx-auto">
                    <div className="relative p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm">
                      {/* Quote Icon */}
                      <Quote className="w-10 h-10 text-thera-primary/30 mb-6" />

                      {/* Stars */}
                      <div className="flex gap-1 mb-6">
                        {Array.from({ length: testimonial.rating }).map((_, j) => (
                          <Star key={j} className="w-5 h-5 text-thera-warning fill-thera-warning" />
                        ))}
                      </div>

                      {/* Text */}
                      <p className="text-lg lg:text-xl leading-relaxed mb-8 text-thera-muted">
                        "{testimonial.text}"
                      </p>

                      {/* Author */}
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-thera-primary to-thera-secondary flex items-center justify-center text-white font-bold">
                          {testimonial.image}
                        </div>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-thera-muted">{testimonial.role}</p>
                          <p className="text-xs text-thera-primary">{testimonial.clinic}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    i === activeIndex ? "w-8 bg-thera-primary" : "bg-white/20 hover:bg-white/40"
                  )}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
