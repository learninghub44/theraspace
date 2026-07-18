"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Check, ArrowRight, HelpCircle, Sparkles } from "lucide-react"

const features = [
  "Unlimited Clients",
  "Unlimited Notes (SOAP, DAP, BIRP)",
  "Unlimited Appointments",
  "Unlimited AI Features (Groq)",
  "Unlimited Secure Storage",
  "Unlimited Secure Messaging",
  "Unlimited Reports & Analytics",
  "Multi-Clinic Support",
  "Unlimited Receptionist Accounts",
  "Email Support (24h response)",
  "All Future Updates Included",
  "Cancel Anytime, No Penalties",
]

const faqs = [
  {
    q: "Can I switch from monthly to annual billing?",
    a: "Yes, you can switch anytime. Annual billing gives you 2 months free. We'll prorate any remaining time.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept M-Pesa, Visa/Mastercard, and bank transfers via Paystack. All in Kenyan Shillings (KES).",
  },
  {
    q: "Is there a setup fee?",
    a: "No setup fees. No hidden charges. Just KES 1,000 per month for everything.",
  },
  {
    q: "Do you offer refunds?",
    a: "We offer a 14-day free trial so you can evaluate before paying. After subscription, we handle refunds on a case-by-case basis.",
  },
]

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")

  const monthlyPrice = 1000
  const annualPrice = 10000
  const savings = monthlyPrice * 12 - annualPrice

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
            No confusing tiers. No feature gates. Get complete access to every tool for one affordable price.
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center gap-4 p-1.5 rounded-2xl bg-thera-ink/5 border border-thera-ink/10">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
                billingCycle === "monthly"
                  ? "bg-thera-primary/20 text-thera-primary"
                  : "text-thera-muted hover:text-thera-text"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                billingCycle === "annual"
                  ? "bg-thera-primary/20 text-thera-primary"
                  : "text-thera-muted hover:text-thera-text"
              }`}
            >
              Annual
              <span className="px-2 py-0.5 rounded-full bg-thera-success/20 text-thera-success text-xs">
                Save KES {savings.toLocaleString()}
              </span>
            </button>
          </div>
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
                    KES {billingCycle === "monthly" ? monthlyPrice.toLocaleString() : annualPrice.toLocaleString()}
                  </span>
                  <span className="text-xl text-thera-muted ml-2">
                    /{billingCycle === "monthly" ? "month" : "year"}
                  </span>
                </div>
                {billingCycle === "annual" && (
                  <p className="text-sm text-thera-success mb-4">
                    You save KES {savings.toLocaleString()} compared to monthly billing
                  </p>
                )}
                <p className="text-thera-muted mb-8">
                  14-day free trial. No credit card required. Cancel anytime.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/signup"
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-thera-primary to-thera-secondary rounded-2xl font-semibold hover:shadow-lg hover:shadow-thera-primary/25 transition-all"
                  >
                    Start Free Trial
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold border border-thera-ink/10 hover:bg-thera-ink/5 transition-all"
                  >
                    Book a Demo
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {features.map((feature, i) => (
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
