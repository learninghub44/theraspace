'use client'

import { motion } from 'framer-motion'
import { useCountUp } from '@/hooks/use-count-up'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import { Users, Calendar, FileText, Clock, Globe } from 'lucide-react'

const stats = [
  { label: 'Clients Managed', value: 12500, suffix: '+', icon: Users, color: 'primary' },
  { label: 'Appointments', value: 48000, suffix: '+', icon: Calendar, color: 'secondary' },
  { label: 'AI Notes Generated', value: 89000, suffix: '+', icon: FileText, color: 'accent' },
  { label: 'Hours Saved', value: 15600, suffix: '+', icon: Clock, color: 'success' },
  { label: 'Countries', value: 12, suffix: '', icon: Globe, color: 'warning' },
]

const trustBadges = [
  'Therapists',
  'Clinics',
  'Counselors',
  'Psychologists',
  'Mental Health Teams',
]

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const { count, ref } = useCountUp(stat.value, 2500)
  const Icon = stat.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative group"
    >
      <div className="relative rounded-2xl border border-white/5 bg-card/50 backdrop-blur-sm p-6 text-center hover:bg-card/80 transition-all duration-300 hover:border-white/10 hover:-translate-y-1">
        <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-${stat.color}/10`}>
          <Icon className={`h-6 w-6 text-${stat.color}`} />
        </div>
        <div className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          {count.toLocaleString()}{stat.suffix}
        </div>
        <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
      </div>
    </motion.div>
  )
}

export function TrustSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">
            Trusted by professionals across Kenya and beyond
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {trustBadges.map((badge, i) => (
              <motion.div
                key={badge}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-foreground hover:bg-white/10 transition-colors"
              >
                {badge}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
