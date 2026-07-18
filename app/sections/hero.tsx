"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Search, MapPin, CheckCircle2, Star } from "lucide-react"
import { fadeInUp, staggerContainer } from "@/app/lib/animations"

function BreathingRings() {
  return (
    <motion.div
      animate={{ scale: [1, 1.04, 1], opacity: [0.6, 0.9, 0.6] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full breathing-rings pointer-events-none"
    />
  )
}

// A single, real profile card — showing exactly what a visitor finds on
// the marketplace, instead of a fabricated analytics dashboard.
function ProfilePreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative max-w-sm mx-auto lg:mx-0"
    >
      <div className="rounded-3xl overflow-hidden border border-thera-ink/10 bg-thera-card shadow-xl shadow-thera-primary/10">
        <div className="h-56 bg-gradient-to-br from-thera-primary/20 to-thera-secondary/20 relative">
          <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-thera-bg/90 backdrop-blur-sm border border-thera-ink/10 text-xs font-medium text-thera-accent">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Verified
          </div>
        </div>
        <div className="p-6">
          <h3 className="font-semibold text-lg">Dr. Amina Njoroge</h3>
          <p className="text-sm text-thera-muted mb-3">Anxiety &amp; Stress Management</p>
          <div className="flex items-center gap-3 text-sm mb-4">
            <div className="flex items-center gap-1 text-thera-muted">
              <MapPin className="w-3.5 h-3.5" /> Nairobi
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-3.5 h-3.5 text-thera-warning fill-thera-warning" />
              ))}
            </div>
          </div>
          <div className="w-full py-2.5 rounded-xl bg-thera-primary/10 text-thera-primary text-sm font-medium text-center">
            Contact directly
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="absolute -right-6 -bottom-6 p-4 rounded-2xl glass hidden sm:block"
      >
        <p className="text-xs text-thera-muted mb-0.5">Therapists list themselves</p>
        <p className="text-sm font-semibold">No middleman, no fees</p>
      </motion.div>
    </motion.div>
  )
}

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 overflow-hidden">
        <BreathingRings />
        <div className="absolute top-24 left-10 w-[28rem] h-[28rem] bg-thera-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-[24rem] h-[24rem] bg-thera-accent/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#F7F7F2_72%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-8"
          >
            <motion.div variants={fadeInUp}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-thera-primary/10 border border-thera-primary/20 text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-thera-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-thera-primary" />
                </span>
                <span className="text-thera-primary font-medium">Free to browse, not a booking platform</span>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-4">
              <h1 className="font-display font-medium text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.08] tracking-tight">
                Find the right{" "}
                <span className="text-gradient italic">therapist</span>
                <br />
                for you.
              </h1>
              <p className="text-lg lg:text-xl text-thera-muted max-w-xl leading-relaxed">
                Therapists list themselves — qualifications, specialties, their own price. Reach out and book directly with them.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <form
                action="#therapists"
                className="flex flex-col sm:flex-row gap-2 p-2 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm max-w-xl"
              >
                <div className="flex-1 flex items-center gap-2 px-3">
                  <Search className="w-4 h-4 text-thera-muted shrink-0" />
                  <input
                    type="text"
                    placeholder="Search by issue, therapist, or language"
                    className="w-full bg-transparent py-2.5 text-sm text-thera-text placeholder:text-thera-muted focus:outline-none"
                  />
                </div>
                <a
                  href="#therapists"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-thera-primary text-white rounded-xl font-medium text-sm hover:bg-thera-primary/90 transition-colors"
                >
                  Search
                </a>
              </form>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <a
                href="#therapists"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-thera-primary to-thera-secondary text-white rounded-2xl font-semibold text-lg hover:shadow-lg hover:shadow-thera-primary/25 transition-all duration-300 hover:-translate-y-0.5"
              >
                Browse Therapists
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                href="/signup"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg border border-thera-ink/10 hover:bg-thera-ink/5 transition-all duration-300 hover:-translate-y-0.5"
              >
                List yourself — KES 1,000/mo
              </Link>
            </motion.div>
          </motion.div>

          <ProfilePreview />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-thera-bg to-transparent" />
    </section>
  )
}
