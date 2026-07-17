"use client"

import { motion } from "framer-motion"
import { Clock, TrendingUp, FolderOpen, Heart, Rocket, FileMinus } from "lucide-react"

const benefits = [
  {
    icon: Clock,
    title: "Save Time",
    description: "Reduce administrative work by 70%. AI-generated notes, automated scheduling, and smart reminders free up hours every week.",
    stat: "15+ min",
    statLabel: "saved per session",
    color: "from-thera-primary to-thera-secondary",
  },
  {
    icon: TrendingUp,
    title: "Increase Productivity",
    description: "See more clients without burning out. Streamlined workflows and intelligent automation help you do more with less.",
    stat: "40%",
    statLabel: "more clients served",
    color: "from-thera-secondary to-thera-accent",
  },
  {
    icon: FolderOpen,
    title: "Organize Everything",
    description: "All your client data, notes, appointments, and documents in one unified platform. Never lose a file again.",
    stat: "100%",
    statLabel: "paperless practice",
    color: "from-thera-accent to-thera-primary",
  },
  {
    icon: Heart,
    title: "Improve Client Experience",
    description: "Clients love the portal. Easy booking, secure messaging, mood tracking, and journal sharing keep them engaged.",
    stat: "4.9/5",
    statLabel: "client satisfaction",
    color: "from-thera-success to-thera-primary",
  },
  {
    icon: Rocket,
    title: "Grow Your Practice",
    description: "Data-driven insights help you identify growth opportunities, optimize scheduling, and increase revenue per client.",
    stat: "3x",
    statLabel: "revenue growth",
    color: "from-thera-warning to-thera-danger",
  },
  {
    icon: FileMinus,
    title: "Reduce Admin Work",
    description: "Automated billing, insurance claims, report generation, and compliance documentation. Focus on therapy, not paperwork.",
    stat: "70%",
    statLabel: "less admin time",
    color: "from-thera-danger to-thera-secondary",
  },
]

export function BenefitsSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-thera-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-thera-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Why therapists love{" "}
            <span className="text-gradient">TheraSpace</span>
          </h2>
          <p className="text-lg text-thera-muted max-w-2xl mx-auto">
            Real results from real practitioners. See how TheraSpace transforms therapy practices across Kenya.
          </p>
        </motion.div>

        {/* Benefits Grid */}
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
              <div className="relative p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-500 h-full">
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                {/* Icon */}
                <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${benefit.color} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <div className="w-full h-full rounded-2xl bg-thera-bg flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="relative text-xl font-bold mb-3 group-hover:text-gradient transition-all">
                  {benefit.title}
                </h3>
                <p className="relative text-sm text-thera-muted leading-relaxed mb-6">
                  {benefit.description}
                </p>

                {/* Stat */}
                <div className="relative flex items-baseline gap-2 pt-4 border-t border-white/5">
                  <span className={`text-2xl font-bold bg-gradient-to-r ${benefit.color} bg-clip-text text-transparent`}>
                    {benefit.stat}
                  </span>
                  <span className="text-xs text-thera-muted">{benefit.statLabel}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
