"use client"

import { motion } from "framer-motion"
import { 
  Shield, Lock, Database, Eye, FileCheck, UserCheck, 
  Clock, Cloud, Fingerprint, CheckCircle2 
} from "lucide-react"

const securityFeatures = [
  {
    icon: Shield,
    title: "Supabase Authentication",
    description: "Enterprise-grade auth with email verification, password policies, and session management. Built on GoTrue.",
  },
  {
    icon: Lock,
    title: "Email & Password Auth",
    description: "Secure email-based authentication with bcrypt password hashing, rate limiting, and brute force protection.",
  },
  {
    icon: Database,
    title: "Row Level Security",
    description: "PostgreSQL RLS policies ensure users can only access their own data. Every query is automatically filtered.",
  },
  {
    icon: Lock,
    title: "Encrypted Storage",
    description: "All data encrypted at rest using AES-256. Files uploaded through secure presigned URLs with time-limited access.",
  },
  {
    icon: Eye,
    title: "Audit Logs",
    description: "Comprehensive audit trail of all data access, modifications, and administrative actions. Exportable for compliance.",
  },
  {
    icon: FileCheck,
    title: "Secure File Uploads",
    description: "Virus scanning, file type validation, and size limits. All files stored in isolated buckets with signed URLs.",
  },
  {
    icon: UserCheck,
    title: "Role Permissions",
    description: "Granular RBAC with therapist, supervisor, receptionist, and admin roles. Custom permission sets per clinic.",
  },
  {
    icon: Clock,
    title: "Session Security",
    description: "Short-lived JWT tokens with automatic refresh. Session invalidation on logout or security events.",
  },
  {
    icon: Cloud,
    title: "Automatic Backups",
    description: "Daily automated backups with point-in-time recovery. Geographic redundancy across multiple availability zones.",
  },
  {
    icon: Fingerprint,
    title: "Privacy First",
    description: "GDPR and Kenya Data Protection Act compliant. Data minimization, purpose limitation, and right to deletion.",
  },
]

export function SecuritySection() {
  return (
    <section id="security" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-thera-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-thera-success/10 border border-thera-success/20 text-sm mb-6">
            <Shield className="w-4 h-4 text-thera-success" />
            <span className="text-thera-success font-medium">Enterprise Grade</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Security you can{" "}
            <span className="text-gradient">trust</span>
          </h2>
          <p className="text-lg text-thera-muted max-w-2xl mx-auto">
            Built on Supabase with enterprise-grade security. Your client data is protected by the same infrastructure used by Fortune 500 companies.
          </p>
        </motion.div>

        {/* Security Shield Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-16"
        >
          <div className="relative">
            <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br from-thera-primary/20 to-thera-secondary/20 flex items-center justify-center">
              <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-thera-primary/30 to-thera-secondary/30 flex items-center justify-center animate-pulse">
                <Shield className="w-12 h-12 lg:w-16 lg:h-16 text-thera-primary" />
              </div>
            </div>
            {/* Orbiting dots */}
            {[0, 60, 120, 180, 240, 300].map((deg, i) => (
              <motion.div
                key={deg}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2"
                style={{ transformOrigin: "0 0" }}
              >
                <div 
                  className="w-3 h-3 rounded-full bg-thera-primary/60"
                  style={{ 
                    transform: `rotate(${deg}deg) translateX(80px)`,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {securityFeatures.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group p-6 rounded-2xl bg-thera-ink/5 border border-thera-ink/5 hover:border-thera-primary/20 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-thera-primary/20 to-thera-secondary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-5 h-5 text-thera-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-2 group-hover:text-gradient transition-all">{feature.title}</h3>
                  <p className="text-sm text-thera-muted leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Compliance Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 flex flex-wrap justify-center gap-4"
        >
          {["GDPR Compliant", "Kenya DPA Ready", "ISO 27001", "SOC 2 Type II", "HIPAA Ready"].map((badge) => (
            <div key={badge} className="flex items-center gap-2 px-4 py-2 rounded-full bg-thera-ink/5 border border-thera-ink/10">
              <CheckCircle2 className="w-4 h-4 text-thera-success" />
              <span className="text-sm font-medium">{badge}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
