"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Users, Calendar, FileText, Clock, Globe } from "lucide-react"

interface StatItemProps {
  icon: React.ElementType
  value: number
  suffix: string
  label: string
  delay: number
}

function AnimatedCounter({ value, suffix, delay }: { value: number; suffix: string; delay: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return

    const duration = 2000
    const startTime = Date.now() + delay
    const endValue = value

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easeOut = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(easeOut * endValue))

        if (progress >= 1) {
          clearInterval(interval)
          setCount(endValue)
        }
      }, 16)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timer)
  }, [isInView, value, delay])

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  )
}

const stats = [
  { icon: Users, value: 30, suffix: "+", label: "Clients Managed", delay: 0 },
  { icon: Calendar, value: 850, suffix: "+", label: "Appointments", delay: 100 },
  { icon: FileText, value: 300, suffix: "+", label: "AI Notes Generated", delay: 200 },
  { icon: Clock, value: 450, suffix: "+", label: "Hours Saved", delay: 300 },
  { icon: Globe, value: 3, suffix: "", label: "Countries", delay: 400 },
]

const trustedBy = [
  "Therapists", "Clinics", "Counselors", "Psychologists", "Mental Health Teams"
]

export function TrustSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-thera-bg via-thera-card/30 to-thera-bg" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trusted By Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-widest text-thera-muted mb-6">Trusted by</p>
          <div className="flex flex-wrap justify-center gap-4 lg:gap-8">
            {trustedBy.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-thera-muted hover:text-white hover:border-white/20 transition-all cursor-default"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative group"
            >
              <div className="p-6 lg:p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-thera-primary/30 transition-all duration-500 hover:-translate-y-1">
                <div className="w-3 h-3 rounded-xl bg-gradient-to-br from-thera-primary/20 to-thera-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-6 h-6 text-thera-primary" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} delay={stat.delay} />
                </div>
                <p className="text-sm text-thera-muted">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
