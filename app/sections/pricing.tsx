"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Check, ArrowRight, Sparkles } from "lucide-react"

const features = [
  "Unlimited Clients",
  "Unlimited Notes",
  "Unlimited Appointments",
  "Unlimited AI Features",
  "Unlimited Storage",
  "Unlimited Messaging",
  "Unlimited Reports",
  "Unlimited Clinics",
  "Unlimited Receptionists",
  "Email Support",
  "Updates Included",
  "Cancel Anytime",
]

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-thera-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-thera-primary/10 border border-thera-primary/20 text-sm mb-6">
            <Sparkles className="w-4 h-4 text-thera-primary" />
            <span className="text-thera-primary font-medium">Simple Pricing</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            One plan.{" "}
            <span className="text-gradient">Everything included.</span>
          </h2>
          <p className="text-lg text-thera-muted max-w-2xl mx-auto">
            No tiers, no limits, no hidden fees. Get full access to every feature for one flat monthly price.
          </p>
        </motion.div>

        {/* Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-thera-card/80 to-thera-card/40 border border-thera-ink/10 backdrop-blur-sm overflow-hidden">
            {/* Glow Effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-thera-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-thera-secondary/10 rounded-full blur-3xl" />

            <div className="relative grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Price */}
              <div className="text-center lg:text-left">
                <div className="mb-6">
                  <span className="text-6xl lg:text-7xl font-bold text-gradient">KES 1,000</span>
                  <span className="text-xl text-thera-muted ml-2">/month</span>
                </div>
                <p className="text-thera-muted mb-8">
                  Billed monthly via Paystack. No contracts, cancel anytime. 14-day free trial.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    href="/signup"
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-thera-primary to-thera-secondary rounded-2xl font-semibold text-lg hover:shadow-lg hover:shadow-thera-primary/25 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Start Free Trial
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg border border-thera-ink/10 hover:bg-thera-ink/5 transition-all duration-300"
                  >
                    Book a Demo
                  </Link>
                </div>
                <p className="text-xs text-thera-muted mt-4">
                  Secure payment via Paystack. M-Pesa, cards & bank transfers accepted.
                </p>
              </div>

              {/* Right - Features */}
              <div className="grid grid-cols-2 gap-3">
                {features.map((feature, i) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-5 h-5 rounded-full bg-thera-success/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-thera-success" />
                    </div>
                    <span className="text-sm text-thera-muted">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Outer Glow */}
          <div className="absolute -inset-px bg-gradient-to-r from-thera-primary/20 via-thera-secondary/20 to-thera-accent/20 rounded-3xl blur-sm -z-10" />
        </motion.div>

        {/* FAQ Teaser */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-thera-muted">
            Have questions? Check our{" "}
            <Link href="#faq" className="text-thera-primary hover:underline">
              FAQ section
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="text-thera-primary hover:underline">
              contact us
            </Link>
            .
          </p>
        </motion.div>
      </div>
    </section>
  )
}
