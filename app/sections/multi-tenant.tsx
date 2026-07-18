"use client"

import { motion } from "framer-motion"
import { Shield, Lock, Database, Users, Server, Fingerprint } from "lucide-react"

const securityFeatures = [
  { icon: Shield, label: "Row Level Security", description: "Every query filtered by user" },
  { icon: Lock, label: "Encrypted Storage", description: "AES-256 encryption at rest" },
  { icon: Database, label: "Isolated Databases", description: "Complete data separation" },
  { icon: Fingerprint, label: "Auth per Tenant", description: "Independent authentication" },
]

export function MultiTenantSection() {
  return (
    <section id="solutions" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Architecture Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-thera-card/80 to-thera-card/40 border border-thera-ink/10 backdrop-blur-sm">
              {/* Central Hub */}
              <div className="flex items-center justify-center mb-8">
                <div className="relative">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-thera-primary to-thera-secondary flex items-center justify-center shadow-lg shadow-thera-primary/30">
                    <Server className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -inset-2 rounded-2xl bg-thera-primary/20 animate-pulse" />
                </div>
              </div>

              {/* Tenant Nodes */}
              <div className="grid grid-cols-3 gap-4">
                {["Therapist A", "Therapist B", "Clinic 1", "Clinic 2", "Therapist C", "Group Practice"].map((tenant, i) => (
                  <motion.div
                    key={tenant}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative p-4 rounded-xl bg-thera-ink/5 border border-thera-ink/10 text-center group hover:border-thera-primary/30 transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-thera-primary/20 to-thera-secondary/20 flex items-center justify-center mx-auto mb-2">
                      <Users className="w-4 h-4 text-thera-primary" />
                    </div>
                    <p className="text-xs font-medium">{tenant}</p>
                    <div className="absolute inset-0 rounded-xl bg-thera-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                ))}
              </div>

              {/* Connection Lines (SVG) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" style={{ zIndex: -1 }}>
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2B6E64" />
                    <stop offset="100%" stopColor="#7FAE8C" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-thera-primary/10 to-thera-secondary/10 rounded-3xl blur-3xl -z-10" />
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-thera-secondary/10 border border-thera-secondary/20 text-sm mb-6">
                <Shield className="w-4 h-4 text-thera-secondary" />
                <span className="text-thera-secondary font-medium">Multi-Tenant Architecture</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Every therapist has their own{" "}
                <span className="text-gradient">secure workspace</span>
              </h2>
              <p className="text-lg text-thera-muted leading-relaxed">
                Data never mixes. Each tenant operates in complete isolation with dedicated row-level security policies. Powered by Supabase's enterprise-grade multi-tenant architecture.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {securityFeatures.map((feature, i) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 rounded-xl bg-thera-ink/5 border border-thera-ink/5 hover:border-thera-primary/20 transition-all"
                >
                  <feature.icon className="w-5 h-5 text-thera-primary mb-2" />
                  <p className="text-sm font-semibold mb-1">{feature.label}</p>
                  <p className="text-xs text-thera-muted">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
