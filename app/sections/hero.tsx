"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Play, Shield, Users, Zap, Star } from "lucide-react"
import { fadeInUp, staggerContainer, viewportConfig } from "@/app/lib/animations"

function AnimatedBlob({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        x: [0, 30, -20, 0],
        y: [0, -50, 20, 0],
      }}
      transition={{
        duration: 7,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
      className={className}
    />
  )
}

function DashboardMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative perspective-1000"
    >
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-thera-card/80 backdrop-blur-sm shadow-2xl shadow-thera-primary/10">
        {/* Browser Chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-thera-danger/80" />
            <div className="w-3 h-3 rounded-full bg-thera-warning/80" />
            <div className="w-3 h-3 rounded-full bg-thera-success/80" />
          </div>
          <div className="flex-1 mx-4">
            <div className="bg-white/5 rounded-md px-3 py-1 text-xs text-thera-muted text-center">
              mytherapist.christech.co.ke/dashboard
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 grid grid-cols-12 gap-4">
          {/* Sidebar */}
          <div className="col-span-3 space-y-3">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-thera-primary to-thera-secondary" />
              <span className="font-semibold text-sm">TheraSpace</span>
            </div>
            {["Dashboard", "Clients", "Calendar", "AI Notes", "Messages", "Analytics"].map((item, i) => (
              <div key={item} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs ${i === 0 ? "bg-thera-primary/20 text-thera-primary" : "text-thera-muted"}`}>
                <div className={`w-4 h-4 rounded ${i === 0 ? "bg-thera-primary/40" : "bg-white/10"}`} />
                {item}
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className="col-span-9 space-y-4">
            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: "Total Clients", value: "248", change: "+12%", color: "thera-primary" },
                { label: "Appointments", value: "1,429", change: "+8%", color: "thera-accent" },
                { label: "AI Notes", value: "3,892", change: "+24%", color: "thera-secondary" },
                { label: "Hours Saved", value: "156", change: "+18%", color: "thera-success" },
              ].map((stat) => (
                <div key={stat.label} className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-xs text-thera-muted mb-1">{stat.label}</p>
                  <p className="text-lg font-bold">{stat.value}</p>
                  <p className={`text-xs text-${stat.color}`}>{stat.change}</p>
                </div>
              ))}
            </div>

            {/* Chart Area */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium">Appointment Trends</span>
                <div className="flex gap-2">
                  <span className="text-xs px-2 py-1 rounded bg-thera-primary/20 text-thera-primary">Weekly</span>
                  <span className="text-xs px-2 py-1 rounded bg-white/5 text-thera-muted">Monthly</span>
                </div>
              </div>
              <div className="h-24 flex items-end gap-2">
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 80].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.8, delay: 0.6 + i * 0.05 }}
                    className="flex-1 rounded-t bg-gradient-to-t from-thera-primary/60 to-thera-accent/40"
                  />
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <p className="text-sm font-medium mb-3">Recent Clients</p>
                {["Sarah M.", "James K.", "Amina W."].map((name, i) => (
                  <div key={name} className="flex items-center gap-2 py-2">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br from-thera-primary/${(i+1)*20} to-thera-secondary/${(i+1)*20}`} />
                    <div className="flex-1">
                      <p className="text-xs font-medium">{name}</p>
                      <p className="text-xs text-thera-muted">Session today</p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-thera-success animate-pulse" />
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <p className="text-sm font-medium mb-3">AI Assistant</p>
                <div className="space-y-2">
                  <div className="p-2 rounded-lg bg-thera-primary/10 text-xs">
                    Generated SOAP note for Session #1429
                  </div>
                  <div className="p-2 rounded-lg bg-thera-secondary/10 text-xs">
                    Treatment plan draft ready for review
                  </div>
                  <div className="p-2 rounded-lg bg-thera-accent/10 text-xs">
                    3 journal summaries completed
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Glow Effects */}
      <div className="absolute -inset-4 bg-gradient-to-r from-thera-primary/20 via-thera-secondary/10 to-thera-accent/20 rounded-3xl blur-3xl -z-10" />
    </motion.div>
  )
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatedBlob 
          className="absolute top-20 left-10 w-96 h-96 bg-thera-primary/20 rounded-full blur-3xl" 
          delay={0}
        />
        <AnimatedBlob 
          className="absolute top-40 right-10 w-80 h-80 bg-thera-secondary/20 rounded-full blur-3xl" 
          delay={2}
        />
        <AnimatedBlob 
          className="absolute bottom-20 left-1/3 w-72 h-72 bg-thera-accent/15 rounded-full blur-3xl" 
          delay={4}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#030712_70%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-thera-primary/10 border border-thera-primary/20 text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-thera-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-thera-primary" />
                </span>
                <span className="text-thera-primary font-medium">Built for African Therapists</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div variants={fadeInUp} className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight">
                Run Your Therapy{" "}
                <span className="text-gradient">Practice.</span>
                <br />
                Not Your{" "}
                <span className="text-thera-muted">Paperwork.</span>
              </h1>
              <p className="text-lg lg:text-xl text-thera-muted max-w-xl leading-relaxed">
                Manage appointments, clients, notes, journals, AI documentation, secure messaging, and subscriptions — all in one beautiful platform.
              </p>
            </motion.div>

            {/* Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Link
                href="/signup"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-thera-primary to-thera-secondary rounded-2xl font-semibold text-lg hover:shadow-lg hover:shadow-thera-primary/25 transition-all duration-300 hover:-translate-y-0.5"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg border border-white/10 hover:bg-white/5 transition-all duration-300 hover:-translate-y-0.5"
              >
                <Play className="w-5 h-5" />
                Book Demo
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-thera-muted">
                <Shield className="w-4 h-4 text-thera-success" />
                <span>HIPAA Ready</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-thera-muted">
                <Users className="w-4 h-4 text-thera-primary" />
                <span>50+ Therapists</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-thera-muted">
                <Zap className="w-4 h-4 text-thera-accent" />
                <span>KES 1,000/month</span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 text-thera-warning fill-thera-warning" />
                ))}
                <span className="text-sm text-thera-muted ml-1">4.2/5</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Dashboard Mockup */}
          <div className="relative">
            <DashboardMockup />

            {/* Floating Cards */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="absolute -right-4 top-1/4 p-4 rounded-xl glass glow-accent hidden xl:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-thera-accent to-thera-primary flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold">AI Note Ready</p>
                  <p className="text-xs text-thera-muted">Session #1429</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="absolute -left-4 bottom-1/4 p-4 rounded-xl glass glow-primary hidden xl:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-thera-primary to-thera-secondary flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold">New Client</p>
                  <p className="text-xs text-thera-muted">Sarah M. joined</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-thera-bg to-transparent" />
    </section>
  )
}
