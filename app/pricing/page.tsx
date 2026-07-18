"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Check, ArrowRight, HelpCircle, Sparkles } from "lucide-react"

const features = [
  "Public marketplace listing",
  "Photo, bio & qualifications",
  "Set your own session pricing",
  "Direct client contact, no commission",
  "Edit your listing anytime",
  "Admin-verified badge",
  "M-Pesa & card payment",
  "Cancel anytime, no penalties",
]

const faqs = [
  {
    q: "What payment methods do you accept?",
    a: "M-Pesa and cards via Paystack, billed in Kenyan Shillings (KES).",
  },
  {
    q: "Is there a setup fee?",
    a: "No setup fees, no hidden charges — KES 950 per month to be listed.",
  },
  {
    q: "What happens if I don't renew?",
    a: "Your listing simply stops showing in the public marketplace once your paid period ends. Your profile and details stay saved, so paying again brings you straight back online.",
  },
  {
    q: "Do you offer refunds?",
    a: "Approval and listing review happen after payment, so we handle refund requests case-by-case — reach out via the contact page.",
  },
]

export default function PricingPage() {
  const monthlyPrice = 950

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-thera-muted hover:text-thera-text transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-thera-primary/10 border border-thera-primary/20 text-sm mb-6">
            <Sparkles className="w-4 h-4 text-thera-primary" />
            <span className="text-thera-primary font-medium">Simple & Transparent</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            One plan. <span className="text-gradient">Everything.</span>
          </h1>
          <p className="text-lg text-thera-muted max-w-2xl mx-auto">
            One flat price to appear in the marketplace. No feature gates, no commission on sessions.
          </p>
        </motion.div>

        {/* Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mb-16"
        >
          <div className="p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-thera-card/80 to-thera-card/40 border border-thera-ink/10 backdrop-blur-sm">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-6">
                  <span className="text-6xl lg:text-7xl font-bold text-gradient">
                    KES {monthlyPrice.toLocaleString()}
                  </span>
                  <span className="text-xl text-thera-muted ml-2">/month</span>
                </div>
                <p className="text-thera-muted mb-8">
                  Billed monthly via Paystack. No contracts, cancel anytime.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/signup"
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-thera-primary to-thera-secondary rounded-2xl font-semibold hover:shadow-lg hover:shadow-thera-primary/25 transition-all"
                  >
                    Get Listed
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold border border-thera-ink/10 hover:bg-thera-ink/5 transition-all"
                  >
                    Talk to us first
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-thera-success/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-thera-success" />
                    </div>
                    <span className="text-sm text-thera-muted">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute -inset-px bg-gradient-to-r from-thera-primary/20 via-thera-secondary/20 to-thera-accent/20 rounded-3xl blur-sm -z-10" />
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
            <HelpCircle className="w-6 h-6 text-thera-primary" />
            Subscription FAQs
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="p-6 rounded-2xl bg-thera-ink/5 border border-thera-ink/5">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-sm text-thera-muted">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
