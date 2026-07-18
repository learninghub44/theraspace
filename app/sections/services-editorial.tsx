"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Users2, HeartHandshake, HomeIcon, Wind } from "lucide-react"

const services = [
  {
    icon: Users2,
    title: "Individual Therapy",
    description:
      "One-on-one sessions with a therapist who specializes in what you're carrying — anxiety, stress, grief, self-esteem, or simply the weight of everyday life.",
    href: "/therapists?category=Anxiety",
  },
  {
    icon: HeartHandshake,
    title: "Couples & Relationships",
    description:
      "Support for partners navigating conflict, trust, communication breakdowns, or simply wanting to understand each other better.",
    href: "/therapists?category=Relationships",
  },
  {
    icon: HomeIcon,
    title: "Family & Teen Therapy",
    description:
      "Therapists experienced in family dynamics and adolescent development, for households working through change together.",
    href: "/therapists?category=Family Therapy",
  },
  {
    icon: Wind,
    title: "Stress, Trauma & Recovery",
    description:
      "Specialists in trauma-informed care, addiction recovery, and stress management — evidence-based support at your own pace.",
    href: "/therapists?category=Trauma",
  },
]

export function ServicesSection() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm uppercase tracking-widest text-thera-primary font-medium mb-4"
        >
          How we help
        </motion.p>

        <div className="flex flex-col divide-y divide-thera-ink/5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className={`grid md:grid-cols-12 gap-6 md:gap-10 items-center py-12 lg:py-16 ${
                i % 2 === 1 ? "md:text-right" : ""
              }`}
            >
              <div
                className={`md:col-span-4 flex ${
                  i % 2 === 1 ? "md:order-2 md:justify-end" : "md:justify-start"
                }`}
              >
                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-thera-primary/10 to-thera-accent/10 flex items-center justify-center">
                  <service.icon className="w-7 h-7 lg:w-8 lg:h-8 text-thera-primary" strokeWidth={1.5} />
                </div>
              </div>

              <div className={`md:col-span-8 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                <h3 className="font-display font-medium text-2xl lg:text-3xl mb-3">
                  {service.title}
                </h3>
                <p className="text-thera-muted text-lg leading-relaxed max-w-xl md:ml-auto md:mr-0 mb-4">
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className={`inline-flex items-center gap-1.5 text-sm font-medium text-thera-primary hover:gap-2.5 transition-all ${
                    i % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  Learn more <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
