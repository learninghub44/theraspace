"use client"

import { motion } from "framer-motion"
import {
  User,
  Users2,
  Home,
  Baby,
  UsersRound,
  Building2,
  Video,
  Stethoscope,
} from "lucide-react"

const services = [
  { icon: User, title: "Individual Therapy", description: "One-on-one sessions tailored to your personal goals." },
  { icon: Users2, title: "Couples Therapy", description: "Strengthen communication and rebuild connection together." },
  { icon: Home, title: "Family Therapy", description: "Work through challenges as a family, guided by a professional." },
  { icon: Baby, title: "Child Therapy", description: "Age-appropriate support for children's emotional wellbeing." },
  { icon: UsersRound, title: "Group Therapy", description: "Shared healing in a supportive, facilitated group setting." },
  { icon: Building2, title: "Corporate Wellness", description: "Mental health support programs for teams and workplaces." },
  { icon: Video, title: "Online Counseling", description: "Secure video sessions from wherever you feel comfortable." },
  { icon: Stethoscope, title: "Psychiatric Consultation", description: "Medical evaluation and treatment planning with licensed psychiatrists." },
]

export function ServicesSection() {
  return (
    <section id="services" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-thera-secondary/[0.04]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-sm uppercase tracking-widest text-thera-primary font-medium mb-3">
            Services
          </p>
          <h2 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl">
            Care for every stage of life
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="p-6 rounded-2xl bg-thera-card border border-thera-ink/10 hover:border-thera-primary/30 hover:-translate-y-1 transition-all duration-300 shadow-sm"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-thera-primary to-thera-secondary flex items-center justify-center mb-4">
                <service.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-thera-muted leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
