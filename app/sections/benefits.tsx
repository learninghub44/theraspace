"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Sparkles, MessageCircle, Lock, Users, BookOpen } from "lucide-react"

const benefits = [
  {
    icon: ShieldCheck,
    title: "Verified Professionals",
    description: "Every therapist on TheraSpace is reviewed before their profile goes live, so you know who you're reaching out to.",
    color: "from-thera-primary to-thera-secondary",
  },
  {
    icon: Sparkles,
    title: "Personalized Matching",
    description: "Filter by specialty, location, session type, or language to find someone who fits what you actually need.",
    color: "from-thera-secondary to-thera-accent",
  },
  {
    icon: MessageCircle,
    title: "Direct Contact, No Middleman",
    description: "See a profile you like? Reach out to that therapist yourself — no booking system, no waiting on approval.",
    color: "from-thera-accent to-thera-primary",
  },
  {
    icon: Lock,
    title: "Private by Design",
    description: "Browsing therapist profiles is anonymous. We don't share your search activity, and there's no account required to look.",
    color: "from-thera-success to-thera-primary",
  },
  {
    icon: Users,
    title: "Free, Always",
    description: "There are no fees to browse, no fees to contact a therapist, and no commission taken from your sessions.",
    color: "from-thera-warning to-thera-danger",
  },
  {
    icon: BookOpen,
    title: "Ongoing Resources",
    description: "Articles on anxiety, stress, relationships, and finding the right kind of support, written for people in Kenya.",
    color: "from-thera-danger to-thera-secondary",
  },
]

export function BenefitsSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-thera-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-thera-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Your wellbeing comes <span className="text-gradient">first</span>
          </h2>
          <p className="text-lg text-thera-muted max-w-2xl mx-auto">
            A directory built to get you to the right person, quickly and safely — not to sell
            you a subscription.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative"
            >
              <div className="relative p-8 rounded-2xl bg-thera-ink/5 border border-thera-ink/5 hover:border-thera-ink/10 transition-all duration-500 h-full">
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${benefit.color} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <div className="w-full h-full rounded-2xl bg-thera-bg flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                <h3 className="relative text-xl font-bold mb-3 group-hover:text-gradient transition-all">
                  {benefit.title}
                </h3>
                <p className="relative text-sm text-thera-muted leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
