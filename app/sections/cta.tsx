"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Search } from "lucide-react"

export function CTASection() {
  return (
    <section className="relative py-24 lg:py-28 overflow-hidden">
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
          <h2 className="text-3xl lg:text-5xl font-bold leading-tight">
            Looking for support, or offering it?
          </h2>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/therapists"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-thera-primary to-thera-secondary text-white rounded-2xl font-semibold text-lg hover:shadow-lg hover:shadow-thera-primary/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              <Search className="w-5 h-5" />
              Browse Therapists
            </Link>
            <Link
              href="/signup"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg border border-thera-ink/10 hover:bg-thera-ink/5 transition-all duration-300 hover:-translate-y-0.5"
            >
              List Yourself — KES 950/mo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
