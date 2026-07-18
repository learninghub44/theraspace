"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Sparkles, MessageCircle, Lock, Users, BookOpen } from "lucide-react"

const benefits = [
  {
    icon: ShieldCheck,
    title: "Verified Professionals",
    description: "Every therapist on TheraSpace is reviewed before their profile goes live, so you know who you're reaching out to.",
  },
  {
    icon: Sparkles,
    title: "Personalized Matching",
    description: "Filter by specialty, location, session type, or language to find someone who fits what you actually need.",
  },
  {
    icon: MessageCircle,
    title: "Direct Contact, No Middleman",
    description: "See a profile you like? Reach out to that therapist yourself — no booking system, no waiting on approval.",
  },
  {
    icon: Lock,
    title: "Private by Design",
    description: "Browsing therapist profiles is anonymous. We don't share your search activity, and there's no account required to look.",
  },
  {
    icon: Users,
    title: "Free, Always",
    description: "There are no fees to browse, no fees to contact a therapist, and no commission taken from your sessions.",
  },
  {
    icon: BookOpen,
    title: "Ongoing Resources",
    description: "Articles on anxiety, stress, relationships, and finding the right kind of support, written for people in Kenya.",
  },
]

export function BenefitsSection() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            <p className="text-sm uppercase tracking-widest text-thera-primary font-medium mb-4">
              Why TheraSpace
            </p>
            <h2 className="font-display font-medium text-3xl lg:text-4xl leading-tight mb-4">
              Your wellbeing comes first
            </h2>
            <p className="text-thera-muted text-lg leading-relaxed">
              A directory built to get you to the right person, quickly and safely — not to
              sell you a subscription.
            </p>
          </motion.div>

          <div className="lg:col-span-8 flex flex-col divide-y divide-thera-ink/5">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="flex items-start gap-5 py-6 first:pt-0"
              >
                <benefit.icon className="w-6 h-6 text-thera-primary shrink-0 mt-1" strokeWidth={1.5} />
                <div>
                  <h3 className="text-lg font-semibold mb-1.5">{benefit.title}</h3>
                  <p className="text-thera-muted leading-relaxed">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
