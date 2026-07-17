"use client"

import { motion } from "framer-motion"
import { Star, MapPin, CheckCircle2 } from "lucide-react"

interface TherapistCardData {
  id: string
  name: string
  photo: string
  specialty: string
  location: string
  rating: number
  reviewCount: number
  verified: boolean
  priceFrom: number
}

const therapists: TherapistCardData[] = [
  {
    id: "1",
    name: "Dr. Amina Njoroge",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80",
    specialty: "Anxiety & Stress Management",
    location: "Nairobi",
    rating: 4.9,
    reviewCount: 128,
    verified: true,
    priceFrom: 2500,
  },
  {
    id: "2",
    name: "David Otieno",
    photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80",
    specialty: "Couples & Family Therapy",
    location: "Mombasa",
    rating: 4.8,
    reviewCount: 94,
    verified: true,
    priceFrom: 3000,
  },
  {
    id: "3",
    name: "Grace Wanjiru",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
    specialty: "Trauma & PTSD",
    location: "Kisumu",
    rating: 5.0,
    reviewCount: 76,
    verified: true,
    priceFrom: 2800,
  },
  {
    id: "4",
    name: "Samuel Kiptoo",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80",
    specialty: "Adolescent & Teen Counseling",
    location: "Nairobi",
    rating: 4.7,
    reviewCount: 61,
    verified: true,
    priceFrom: 2200,
  },
  {
    id: "5",
    name: "Faith Mutua",
    photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80",
    specialty: "Grief & Loss",
    location: "Nakuru",
    rating: 4.9,
    reviewCount: 53,
    verified: true,
    priceFrom: 2600,
  },
  {
    id: "6",
    name: "Brian Mwangi",
    photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80",
    specialty: "Addiction & Recovery",
    location: "Eldoret",
    rating: 4.8,
    reviewCount: 82,
    verified: true,
    priceFrom: 2700,
  },
]

function TherapistCard({ therapist, index }: { therapist: TherapistCardData; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group rounded-2xl bg-white/5 border border-white/5 hover:border-thera-primary/30 overflow-hidden transition-all duration-500 hover:-translate-y-1"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={therapist.photo}
          alt={therapist.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {therapist.verified && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-thera-bg/80 backdrop-blur-sm border border-white/10 text-xs font-medium text-thera-accent">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Verified
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-lg">{therapist.name}</h3>
        </div>
        <p className="text-sm text-thera-muted mb-3">{therapist.specialty}</p>

        <div className="flex items-center gap-3 text-sm mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-thera-warning text-thera-warning" />
            <span className="font-medium">{therapist.rating}</span>
            <span className="text-thera-muted">({therapist.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1 text-thera-muted">
            <MapPin className="w-3.5 h-3.5" />
            {therapist.location}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-thera-muted">
            From <span className="text-white font-semibold">KES {therapist.priceFrom.toLocaleString()}</span>/session
          </span>
          <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-thera-primary to-thera-secondary text-sm font-medium hover:opacity-90 transition-opacity">
            Book
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export function TherapistMarketplaceSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-thera-bg via-thera-card/30 to-thera-bg" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-sm uppercase tracking-widest text-thera-muted mb-4">Find your therapist</p>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Browse the marketplace
          </h2>
          <p className="text-thera-muted">
            Verified, licensed therapists across Kenya. Filter by specialty, location, and availability to find the right fit.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {therapists.map((therapist, i) => (
            <TherapistCard key={therapist.id} therapist={therapist} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <button className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all">
            View all therapists
          </button>
        </motion.div>
      </div>
    </section>
  )
}
