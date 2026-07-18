"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Loader2, ArrowRight } from "lucide-react"
import { supabase } from "@/app/lib/supabase"
import { cachedQuery } from "@/app/lib/query-cache"
import { TherapistCard } from "@/app/components/therapist-card"
import type { TherapistProfile } from "@/types"

const PREVIEW_COUNT = 6

export function TherapistMarketplaceSection() {
  const [therapists, setTherapists] = useState<TherapistProfile[]>([])
  const [totalCount, setTotalCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    setError(null)
    cachedQuery(`featured-therapists:${PREVIEW_COUNT}`, async () =>
      supabase
        .from("therapist_profiles")
        .select("*", { count: "exact" })
        .eq("status", "approved")
        .order("created_at", { ascending: false })
        .limit(PREVIEW_COUNT)
    )
      .then(({ data, error: queryError, count }) => {
        if (!active) return
        if (queryError) {
          setError("Couldn't load therapists right now. Please try again shortly.")
        } else if (data) {
          setTherapists(data as TherapistProfile[])
        }
        setTotalCount(count ?? null)
        setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <section id="therapists" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-thera-bg via-thera-card/30 to-thera-bg" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="text-sm uppercase tracking-widest text-thera-muted mb-4">Find your therapist</p>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {totalCount !== null && totalCount > 0
              ? `${totalCount} therapist${totalCount === 1 ? "" : "s"} on the marketplace`
              : "Browse the marketplace"}
          </h2>
          <p className="text-thera-muted">
            Every therapist here has written their own profile — qualifications, specialties,
            and their own pricing. Find one who fits and reach out directly.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center gap-2 text-thera-muted text-sm py-12">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading therapists...
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-thera-danger">{error}</p>
          </div>
        ) : therapists.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-thera-muted mb-4">No listings yet — be the first therapist on TheraSpace.</p>
            <a
              href="/signup"
              className="inline-flex px-6 py-3 rounded-full bg-gradient-to-r from-thera-primary to-thera-secondary text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Get seen — for only KES 950/mo
            </a>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {therapists.map((therapist, i) => (
                <TherapistCard key={therapist.id} therapist={therapist} index={i} />
              ))}
            </div>
            <div className="text-center">
              <Link
                href="/therapists"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold border border-thera-ink/10 hover:bg-thera-ink/5 transition-all duration-300"
              >
                View all therapists, search & filter
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
