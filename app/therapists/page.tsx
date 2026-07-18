"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, Loader2, SlidersHorizontal, X } from "lucide-react"
import { supabase } from "@/app/lib/supabase"
import { TherapistCard } from "@/app/components/therapist-card"
import type { TherapistProfile } from "@/types"

const PAGE_SIZE = 12

const CATEGORIES = [
  "Anxiety",
  "Depression",
  "Stress",
  "Trauma",
  "Relationships",
  "Family Therapy",
  "Teen Therapy",
  "Career Counseling",
  "Addiction",
  "Grief",
]

const SESSION_MODE_OPTIONS = [
  { value: "video", label: "Video" },
  { value: "in_person", label: "In-person" },
  { value: "phone", label: "Phone" },
]

/** Strip the one character that's structurally significant to PostgREST's
 * .or() filter syntax, so a search term can never break out of the filter
 * or be interpreted as extra conditions. */
function sanitizeForOr(term: string) {
  return term.replace(/,/g, " ").trim()
}

export default function TherapistsDirectoryPage() {
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [category, setCategory] = useState<string | null>(null)
  const [location, setLocation] = useState("")
  const [debouncedLocation, setDebouncedLocation] = useState("")
  const [sessionMode, setSessionMode] = useState<string | null>(null)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const [therapists, setTherapists] = useState<TherapistProfile[]>([])
  const [totalCount, setTotalCount] = useState<number | null>(null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Pick up ?q= and ?category= from the homepage search bar / category tiles.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const q = params.get("q")
    const cat = params.get("category")
    if (q) {
      setQuery(q)
      setDebouncedQuery(q)
    }
    if (cat) setCategory(cat)
  }, [])

  // Debounce free-text inputs so we're not querying on every keystroke.
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 350)
    return () => clearTimeout(t)
  }, [query])
  useEffect(() => {
    const t = setTimeout(() => setDebouncedLocation(location), 350)
    return () => clearTimeout(t)
  }, [location])

  const runQuery = useCallback(
    async (targetPage: number) => {
      let q = supabase
        .from("therapist_profiles")
        .select("*", { count: "exact" })
        .eq("status", "approved")

      const term = sanitizeForOr(debouncedQuery)
      if (term) {
        q = q.or(
          `full_name.ilike.%${term}%,specialty.ilike.%${term}%,bio.ilike.%${term}%,languages.ilike.%${term}%,qualifications.ilike.%${term}%`
        )
      }
      if (category) {
        q = q.ilike("specialty", `%${category}%`)
      }
      if (debouncedLocation.trim()) {
        q = q.ilike("location", `%${debouncedLocation.trim()}%`)
      }
      if (sessionMode) {
        q = q.contains("session_modes", [sessionMode])
      }

      const from = 0
      const to = targetPage * PAGE_SIZE - 1
      q = q.order("created_at", { ascending: false }).range(from, to)

      const { data, error: queryError, count } = await q
      return { data: (data ?? []) as TherapistProfile[], error: queryError, count: count ?? 0 }
    },
    [debouncedQuery, category, debouncedLocation, sessionMode]
  )

  // Re-run from page 1 whenever a filter changes.
  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)
    setPage(1)
    runQuery(1).then(({ data, error: queryError, count }) => {
      if (!active) return
      if (queryError) setError(queryError.message)
      setTherapists(data)
      setTotalCount(count)
      setLoading(false)
    })
    return () => {
      active = false
    }
  }, [runQuery])

  const handleLoadMore = async () => {
    setLoadingMore(true)
    const nextPage = page + 1
    const { data, error: queryError, count } = await runQuery(nextPage)
    setLoadingMore(false)
    if (queryError) {
      setError(queryError.message)
      return
    }
    setTherapists(data)
    setTotalCount(count)
    setPage(nextPage)
  }

  const hasMore = totalCount !== null && therapists.length < totalCount
  const activeFilterCount = [category, debouncedLocation.trim(), sessionMode].filter(Boolean).length

  const clearFilters = () => {
    setCategory(null)
    setLocation("")
    setDebouncedLocation("")
    setSessionMode(null)
  }

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
          <h1 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl mb-3">
            Browse therapists
          </h1>
          <p className="text-thera-muted max-w-2xl">
            {totalCount !== null
              ? `${totalCount} listed therapist${totalCount === 1 ? "" : "s"} across Kenya. `
              : ""}
            Contact anyone directly — no booking fees, no middleman.
          </p>
        </motion.div>

        {/* Search bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-2xl bg-thera-card border border-thera-ink/10 shadow-sm">
            <Search className="w-4 h-4 text-thera-muted shrink-0" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search by issue, name, or language"
              className="w-full bg-transparent text-sm focus:outline-none placeholder:text-thera-muted"
            />
            {query && (
              <button onClick={() => setQuery("")} aria-label="Clear search">
                <X className="w-4 h-4 text-thera-muted hover:text-thera-text" />
              </button>
            )}
          </div>
          <button
            onClick={() => setFiltersOpen((o) => !o)}
            className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl border text-sm font-medium transition-colors ${
              filtersOpen || activeFilterCount > 0
                ? "border-thera-primary/40 bg-thera-primary/10 text-thera-primary"
                : "border-thera-ink/10 hover:bg-thera-ink/5"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
          </button>
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(category === cat ? null : cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                category === cat
                  ? "bg-thera-primary text-white border-thera-primary"
                  : "bg-thera-card border-thera-ink/10 hover:bg-thera-ink/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Extra filters */}
        {filtersOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="flex flex-col sm:flex-row gap-3 p-4 rounded-2xl bg-thera-ink/5 border border-thera-ink/5 mb-6"
          >
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location (e.g. Nairobi)"
              className="flex-1 px-4 py-2.5 rounded-xl bg-thera-card border border-thera-ink/10 text-sm focus:outline-none focus:border-thera-primary/50"
            />
            <div className="flex gap-2 flex-wrap">
              {SESSION_MODE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSessionMode(sessionMode === opt.value ? null : opt.value)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                    sessionMode === opt.value
                      ? "bg-thera-primary text-white border-thera-primary"
                      : "bg-thera-card border-thera-ink/10 hover:bg-thera-ink/10"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {activeFilterCount > 0 && (
              <button onClick={clearFilters} className="text-sm text-thera-muted hover:text-thera-danger underline">
                Clear filters
              </button>
            )}
          </motion.div>
        )}

        {error && (
          <p className="text-sm text-thera-danger bg-thera-danger/10 border border-thera-danger/20 rounded-xl px-4 py-3 mb-6">
            {error}
          </p>
        )}

        {/* Results */}
        {loading ? (
          <div className="flex items-center justify-center gap-2 text-thera-muted text-sm py-20">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading therapists...
          </div>
        ) : therapists.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-thera-muted mb-4">No therapists match those filters yet.</p>
            {activeFilterCount > 0 || query ? (
              <button
                onClick={() => {
                  setQuery("")
                  clearFilters()
                }}
                className="inline-flex px-6 py-3 rounded-full border border-thera-ink/10 text-sm font-medium hover:bg-thera-ink/5 transition-colors"
              >
                Clear search & filters
              </button>
            ) : (
              <Link
                href="/signup"
                className="inline-flex px-6 py-3 rounded-full bg-gradient-to-r from-thera-primary to-thera-secondary text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Be the first therapist listed
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {therapists.map((therapist, i) => (
                <TherapistCard key={therapist.id} therapist={therapist} index={i} />
              ))}
            </div>
            {hasMore && (
              <div className="text-center">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl border border-thera-ink/10 font-medium hover:bg-thera-ink/5 transition-colors disabled:opacity-50"
                >
                  {loadingMore && <Loader2 className="w-4 h-4 animate-spin" />}
                  Load more
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
