"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ShieldCheck, Handshake, Wallet, UserCheck } from "lucide-react"

const values = [
  {
    icon: UserCheck,
    title: "Every listing is reviewed",
    description:
      "Before a profile goes live, we check it. It's not a rubber stamp — we're putting our name next to it.",
  },
  {
    icon: Handshake,
    title: "No middleman",
    description:
      "We don't sit between you and your therapist. You talk to them directly, book directly, and pay them directly.",
  },
  {
    icon: Wallet,
    title: "One honest price",
    description:
      "Therapists pay KES 950 a month to be listed. That's it — no commission on sessions, no hidden fees, no surprise charges.",
  },
  {
    icon: ShieldCheck,
    title: "Built for trust",
    description:
      "Clients are trusting us with something personal — finding support for their mental health. We take that seriously.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-thera-muted hover:text-thera-text transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-16"
        >
          <div>
            <h1 className="font-display font-medium text-4xl lg:text-6xl mb-6">
              About <span className="text-gradient">TheraSpace</span>
            </h1>
            <p className="text-lg text-thera-muted max-w-2xl leading-relaxed">
              TheraSpace is a directory of therapists in Kenya. That's the whole idea — we
              wanted a simple, honest place where anyone looking for support could find a real,
              qualified therapist and get in touch with them directly, without a booking fee,
              a subscription, or a middleman standing between the two of you.
            </p>
          </div>

          <div className="p-8 lg:p-10 rounded-3xl bg-thera-ink/5 border border-thera-ink/5">
            <h2 className="text-2xl font-bold mb-4">How it works</h2>
            <div className="space-y-4 text-thera-muted leading-relaxed">
              <p>
                Therapists create their own listing — their qualifications, specialties,
                languages, session types, and pricing, written in their own words. We review
                every listing before it goes live, and therapists pay KES 950 a month to stay
                listed.
              </p>
              <p>
                Clients browse and search the directory for free, always. When you find someone
                who fits, you contact them directly — by phone, email, or WhatsApp — and arrange
                sessions and payment between yourselves. We don't take a cut, and we don't
                handle your booking or your payment for sessions.
              </p>
              <p>
                We're based in Nairobi and built this because finding a therapist in Kenya
                shouldn't mean scrolling through outdated Facebook posts or asking around for
                referrals. It should be as easy as searching and reaching out.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-8">What we care about</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {values.map((value, i) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-thera-ink/5 border border-thera-ink/5 hover:border-thera-primary/20 transition-all"
                >
                  <value.icon className="w-6 h-6 text-thera-primary mb-4" />
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-thera-muted">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-thera-primary/10 to-thera-secondary/10 border border-thera-primary/10">
            <h2 className="text-2xl font-bold mb-3">Questions?</h2>
            <p className="text-thera-muted mb-6">We're a small team — reach out and we'll get back to you.</p>
            <Link
              href="/contact"
              className="inline-flex px-6 py-3 rounded-full bg-gradient-to-r from-thera-primary to-thera-secondary text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Contact us
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
