"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Play, Sparkles } from "lucide-react"

export function CTASection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-thera-primary/10 via-thera-secondary/10 to-thera-accent/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#F7F7F2_70%)]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-thera-primary/10 border border-thera-primary/20 text-sm">
            <Sparkles className="w-4 h-4 text-thera-primary" />
            <span className="text-thera-primary font-medium">Start your free trial today</span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl lg:text-6xl font-bold leading-tight">
            Ready to modernize your{" "}
            <span className="text-gradient">therapy practice?</span>
          </h2>

          <p className="text-lg lg:text-xl text-thera-muted max-w-2xl mx-auto">
            Join 500+ therapists who have transformed their practice with TheraSpace. Start your 14-day free trial — no credit card required.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/signup"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-thera-primary to-thera-secondary rounded-2xl font-semibold text-lg hover:shadow-lg hover:shadow-thera-primary/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg border border-thera-ink/10 hover:bg-thera-ink/5 transition-all duration-300 hover:-translate-y-0.5"
            >
              <Play className="w-5 h-5" />
              Book a Demo
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 pt-4 text-sm text-thera-muted">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-thera-success" />
              14-day free trial
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-thera-success" />
              No credit card required
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-thera-success" />
              Cancel anytime
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
