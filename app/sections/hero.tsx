"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ArrowRight, Search, MapPin, ChevronDown } from "lucide-react"
import { fadeInUp, staggerContainer } from "@/app/lib/animations"
import { KENYA_LOCATIONS, REMOTE_OPTION } from "@/app/lib/locations"

function BreathingRings() {
  return (
    <motion.div
      animate={{ scale: [1, 1.04, 1], opacity: [0.6, 0.9, 0.6] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full breathing-rings pointer-events-none"
    />
  )
}

export function HeroSection() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [location, setLocation] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (search.trim()) params.set("q", search.trim())
    if (location) params.set("location", location)
    const qs = params.toString()
    router.push(`/therapists${qs ? `?${qs}` : ""}`)
  }

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 overflow-hidden">
        <BreathingRings />
        <div className="absolute top-24 left-10 w-[28rem] h-[28rem] bg-thera-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-[24rem] h-[24rem] bg-thera-accent/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#F7F7F2_72%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid place-items-center">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-8 max-w-3xl text-center"
          >
            <motion.div variants={fadeInUp} className="space-y-4">
              <h1 className="font-display font-medium text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.08] tracking-tight">
                Find the right{" "}
                <span className="text-gradient italic">therapist</span>
                <br />
                for you.
              </h1>
              <p className="text-lg lg:text-xl text-thera-muted max-w-xl mx-auto leading-relaxed">
                Every therapist here has written their own profile — their qualifications,
                specialties, and pricing, in their own words. Find someone who fits, then reach
                out to them directly. No forms, no waiting list, no middleman.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex justify-center">
              <form
                onSubmit={handleSearch}
                className="flex flex-col sm:flex-row gap-2 p-2 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm max-w-xl w-full"
              >
                <div className="relative flex items-center gap-2 px-3 sm:border-r border-thera-ink/10 shrink-0">
                  <MapPin className="w-4 h-4 text-thera-muted shrink-0" />
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="appearance-none bg-transparent py-2.5 pr-5 text-sm text-thera-text focus:outline-none max-w-[9.5rem] sm:max-w-[8rem]"
                  >
                    <option value="">Any location</option>
                    <option value={REMOTE_OPTION}>{REMOTE_OPTION}</option>
                    {KENYA_LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-thera-muted absolute right-2.5 pointer-events-none" />
                </div>
                <div className="flex-1 flex items-center gap-2 px-3">
                  <Search className="w-4 h-4 text-thera-muted shrink-0" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="Search by issue, therapist, or language"
                    className="w-full bg-transparent py-2.5 text-sm text-thera-text placeholder:text-thera-muted focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-thera-primary text-white rounded-xl font-medium text-sm hover:bg-thera-primary/90 transition-colors"
                >
                  Search
                </button>
              </form>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/therapists"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-thera-primary to-thera-secondary text-white rounded-2xl font-semibold text-lg hover:shadow-lg hover:shadow-thera-primary/25 transition-all duration-300 hover:-translate-y-0.5"
              >
                Browse Therapists
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/signup"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg border border-thera-ink/10 hover:bg-thera-ink/5 transition-all duration-300 hover:-translate-y-0.5"
              >
                Get seen — for only KES 950/mo
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-thera-bg to-transparent" />
    </section>
  )
}
