"use client"

import { motion } from "framer-motion"
import { UserPlus, CreditCard, Users, Settings, TrendingUp, ArrowDown, CheckCircle2 } from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    title: "Create your account",
    description: "Sign up in under 2 minutes. No credit card required for the free trial. Verify your email and you're ready to go.",
    color: "from-thera-primary to-thera-secondary",
  },
  {
    icon: CreditCard,
    title: "Subscribe using Paystack",
    description: "Choose your plan and pay securely via Paystack. M-Pesa, card, and bank transfer supported. Cancel anytime.",
    color: "from-thera-secondary to-thera-accent",
  },
  {
    icon: Users,
    title: "Invite clients",
    description: "Add clients manually or send invitation links. Clients get their own secure portal to book appointments and track progress.",
    color: "from-thera-accent to-thera-primary",
  },
  {
    icon: Settings,
    title: "Manage your practice",
    description: "Set up your calendar, configure AI preferences, customize note templates, and start seeing clients efficiently.",
    color: "from-thera-primary to-thera-success",
  },
  {
    icon: TrendingUp,
    title: "Grow your business",
    description: "Use analytics to understand your practice. Reduce no-shows, increase retention, and scale with confidence.",
    color: "from-thera-success to-thera-warning",
  },
]

export function HowItWorksSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-thera-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-thera-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-thera-success/10 border border-thera-success/20 text-sm mb-6">
            <CheckCircle2 className="w-4 h-4 text-thera-success" />
            <span className="text-thera-success font-medium">Simple Setup</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Get started in{" "}
            <span className="text-gradient">5 minutes</span>
          </h2>
          <p className="text-lg text-thera-muted max-w-2xl mx-auto">
            No complex onboarding. No lengthy training. Just sign up, subscribe, and start managing your practice like a pro.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-thera-primary via-thera-secondary to-thera-accent hidden sm:block" />

          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center ${
                    index > 0 ? "lg:mt-16" : ""
                  }`}
                >
                  {/* Content */}
                  <div className={`pl-20 sm:pl-0 ${isEven ? "lg:pr-16 lg:text-right" : "lg:col-start-2 lg:pl-16"}`}>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs mb-4 ${
                      isEven ? "lg:flex-row-reverse" : ""
                    }`}>
                      <span className="text-thera-primary font-semibold">Step {index + 1}</span>
                    </div>
                    <h3 className="text-xl lg:text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-thera-muted leading-relaxed">{step.description}</p>
                  </div>

                  {/* Icon Node */}
                  <div className={`absolute left-0 sm:left-1/2 sm:-translate-x-1/2 top-0 lg:static lg:translate-x-0 ${
                    isEven ? "lg:col-start-2 lg:flex lg:justify-start" : "lg:col-start-1 lg:flex lg:justify-end"
                  }`}>
                    <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} p-0.5`}>
                      <div className="w-full h-full rounded-2xl bg-thera-bg flex items-center justify-center">
                        <step.icon className="w-7 h-7 text-white" />
                      </div>
                      {/* Pulse Ring */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-thera-primary/30 to-thera-secondary/30 animate-ping opacity-20" />
                    </div>
                  </div>

                  {/* Arrow (between steps) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-8">
                      <ArrowDown className="w-6 h-6 text-thera-primary/50 animate-bounce" />
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
