"use client"

import { motion } from "framer-motion"
import {
  Users, Calendar, Brain, FileText, MessageSquare, Heart,
  BookOpen, Target, Home, ClipboardCheck, Video, Mic,
  Share2, BarChart3, Shield, Bell, Moon, Building2,
  FileBarChart, Sparkles, Lock, LayoutDashboard
} from "lucide-react"
import { cn } from "@/app/lib/utils"

interface Feature {
  icon: React.ElementType
  title: string
  description: string
  color: string
}

const features: Feature[] = [
  {
    icon: Users,
    title: "Client Management",
    description: "Comprehensive client profiles with intake forms, treatment history, progress tracking, and secure document storage all in one place.",
    color: "from-thera-primary to-thera-secondary",
  },
  {
    icon: Calendar,
    title: "Smart Calendar",
    description: "Intelligent scheduling with automated reminders, conflict detection, recurring appointments, and multi-clinic support.",
    color: "from-thera-accent to-thera-primary",
  },
  {
    icon: Brain,
    title: "AI Assistant (Groq)",
    description: "Generate SOAP, DAP, and BIRP notes in seconds. Summarize sessions, draft treatment plans, and get homework suggestions powered by Groq AI.",
    color: "from-thera-secondary to-thera-accent",
  },
  {
    icon: FileText,
    title: "Clinical Notes",
    description: "Structured note templates for SOAP, DAP, and BIRP formats. Voice-to-text support, auto-save, and version history.",
    color: "from-thera-primary to-thera-accent",
  },
  {
    icon: MessageSquare,
    title: "Secure Messaging",
    description: "HIPAA-compliant messaging between therapists and clients. End-to-end encrypted with read receipts and message scheduling.",
    color: "from-thera-success to-thera-primary",
  },
  {
    icon: Heart,
    title: "Mood Tracking",
    description: "Real-time mood and symptom tracking for clients. Visualize trends over time with beautiful charts and automated alerts.",
    color: "from-thera-danger to-thera-secondary",
  },
  {
    icon: BookOpen,
    title: "Journals",
    description: "Guided journaling with AI-powered reflection prompts. Clients can share entries with their therapist for deeper insights.",
    color: "from-thera-warning to-thera-primary",
  },
  {
    icon: Target,
    title: "Treatment Plans",
    description: "Create evidence-based treatment plans with measurable goals. Track progress with automated milestone alerts.",
    color: "from-thera-primary to-thera-success",
  },
  {
    icon: Home,
    title: "Homework Assignments",
    description: "Assign and track homework with due dates, reminders, and completion tracking. Integrate with popular therapy worksheets.",
    color: "from-thera-accent to-thera-secondary",
  },
  {
    icon: ClipboardCheck,
    title: "Assessments",
    description: "Built-in mental health assessments (PHQ-9, GAD-7, etc.) with automated scoring and trend analysis.",
    color: "from-thera-secondary to-thera-danger",
  },
  {
    icon: Video,
    title: "Video Sessions",
    description: "Built-in secure video conferencing with screen sharing, session recording, and automatic transcription.",
    color: "from-thera-primary to-thera-warning",
  },
  {
    icon: Mic,
    title: "Voice Notes",
    description: "Record session notes with voice-to-text transcription. AI-powered summarization and key point extraction.",
    color: "from-thera-accent to-thera-success",
  },
  {
    icon: Share2,
    title: "Document Sharing",
    description: "Secure file sharing with granular permissions. Share resources, worksheets, and reports with clients and team members.",
    color: "from-thera-success to-thera-primary",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Deep practice analytics including client retention, no-show rates, revenue trends, and AI-powered insights.",
    color: "from-thera-primary to-thera-secondary",
  },
  {
    icon: Shield,
    title: "Role Management",
    description: "Granular role-based access control. Define permissions for therapists, receptionists, supervisors, and administrators.",
    color: "from-thera-secondary to-thera-accent",
  },
  {
    icon: Building2,
    title: "Clinic Management",
    description: "Multi-location clinic management with centralized reporting, staff scheduling, and resource allocation.",
    color: "from-thera-warning to-thera-danger",
  },
  {
    icon: LayoutDashboard,
    title: "Receptionist Dashboard",
    description: "Dedicated dashboard for front desk staff with check-in management, waiting room display, and payment processing.",
    color: "from-thera-primary to-thera-accent",
  },
  {
    icon: FileBarChart,
    title: "Reports",
    description: "Generate comprehensive reports for insurance, supervision, and accreditation. Export to PDF, Excel, and more.",
    color: "from-thera-accent to-thera-primary",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Intelligent notification system with customizable triggers, delivery channels, and quiet hours.",
    color: "from-thera-danger to-thera-warning",
  },
  {
    icon: Moon,
    title: "Dark Mode",
    description: "Beautiful dark mode designed for long hours of use. Reduces eye strain with carefully calibrated contrast ratios.",
    color: "from-thera-muted to-thera-primary",
  },
]

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className={cn(
        "group relative p-6 lg:p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-500 hover:-translate-y-1 overflow-hidden",
        isEven ? "lg:col-span-1" : "lg:col-span-1"
      )}
    >
      {/* Hover Gradient */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500",
        feature.color
      )} />

      {/* Icon */}
      <div className={cn(
        "relative w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500",
        feature.color
      )}>
        <feature.icon className="w-6 h-6 text-white" />
      </div>

      {/* Content */}
      <h3 className="relative text-lg font-semibold mb-3 group-hover:text-gradient transition-all">
        {feature.title}
      </h3>
      <p className="relative text-sm text-thera-muted leading-relaxed">
        {feature.description}
      </p>

      {/* Corner Accent */}
      <div className={cn(
        "absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-bl-full",
        feature.color
      )} />
    </motion.div>
  )
}

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-thera-primary/10 border border-thera-primary/20 text-sm mb-6">
            <Sparkles className="w-4 h-4 text-thera-primary" />
            <span className="text-thera-primary font-medium">Everything you need</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            A complete platform for{" "}
            <span className="text-gradient">modern therapy</span>
          </h2>
          <p className="text-lg text-thera-muted max-w-2xl mx-auto">
            From client intake to session notes, from AI assistance to analytics — TheraSpace handles every aspect of your practice.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
