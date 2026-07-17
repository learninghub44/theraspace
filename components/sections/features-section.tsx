'use client'

import { motion } from 'framer-motion'
import {
  Users,
  Calendar,
  Brain,
  FileText,
  MessageSquare,
  TrendingUp,
  Shield,
  Video,
  Mic,
  FolderOpen,
  BarChart3,
  UserCog,
  Building2,
  FileBarChart,
  Bell,
  Moon,
  Layers,
  Lock,
  Stethoscope,
  BookOpen,
  ClipboardList,
  HeartPulse,
  CheckCircle2,
} from 'lucide-react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

const features = [
  {
    id: 'client-management',
    title: 'Client Management',
    description: 'Comprehensive client profiles with intake forms, treatment history, emergency contacts, and personalized notes. Keep everything organized in one secure place.',
    icon: Users,
    color: 'primary',
    category: 'Core',
  },
  {
    id: 'appointments',
    title: 'Smart Appointments',
    description: 'Intelligent scheduling with automated reminders, recurring sessions, buffer times, and conflict detection. Reduce no-shows by 40%.',
    icon: Calendar,
    color: 'secondary',
    category: 'Core',
  },
  {
    id: 'ai-assistant',
    title: 'AI Assistant',
    description: 'Powered by Groq AI to generate SOAP notes, summarize sessions, draft treatment plans, and suggest homework assignments. Never replaces the therapist.',
    icon: Brain,
    color: 'accent',
    category: 'AI',
    highlighted: true,
  },
  {
    id: 'soap-notes',
    title: 'SOAP Notes',
    description: 'Structured Subjective, Objective, Assessment, and Plan documentation with AI-assisted generation and customizable templates.',
    icon: FileText,
    color: 'primary',
    category: 'Documentation',
  },
  {
    id: 'dap-notes',
    title: 'DAP Notes',
    description: 'Data, Assessment, and Plan format for concise session documentation. Perfect for quick note-taking during busy schedules.',
    icon: ClipboardList,
    color: 'secondary',
    category: 'Documentation',
  },
  {
    id: 'birp-notes',
    title: 'BIRP Notes',
    description: 'Behavior, Intervention, Response, and Plan documentation for behavioral therapy sessions. Track progress with structured data.',
    icon: BookOpen,
    color: 'accent',
    category: 'Documentation',
  },
  {
    id: 'secure-messaging',
    title: 'Secure Messaging',
    description: 'End-to-end encrypted messaging between therapists and clients. HIPAA-compliant with message retention policies and audit logs.',
    icon: MessageSquare,
    color: 'primary',
    category: 'Communication',
  },
  {
    id: 'mood-tracking',
    title: 'Mood Tracking',
    description: 'Clients can log daily mood ratings, triggers, and journal entries. Visualize trends over time to inform treatment adjustments.',
    icon: TrendingUp,
    color: 'secondary',
    category: 'Client Tools',
  },
  {
    id: 'journals',
    title: 'Digital Journals',
    description: 'Private and shared journal spaces for clients. AI can summarize entries and suggest reflection questions for upcoming sessions.',
    icon: HeartPulse,
    color: 'accent',
    category: 'Client Tools',
  },
  {
    id: 'treatment-plans',
    title: 'Treatment Plans',
    description: 'Create evidence-based treatment plans with goals, objectives, interventions, and timelines. AI suggests plans based on intake data.',
    icon: Stethoscope,
    color: 'primary',
    category: 'Clinical',
  },
  {
    id: 'homework',
    title: 'Homework Assignments',
    description: 'Assign and track homework with due dates, reminders, and completion status. AI suggests personalized exercises based on client progress.',
    icon: CheckCircle2,
    color: 'secondary',
    category: 'Clinical',
  },
  {
    id: 'assessments',
    title: 'Assessments',
    description: 'Built-in mental health assessments including PHQ-9, GAD-7, and custom forms. Automatic scoring and trend visualization.',
    icon: BarChart3,
    color: 'accent',
    category: 'Clinical',
  },
  {
    id: 'video-sessions',
    title: 'Video Sessions',
    description: 'Integrated video conferencing with screen sharing, session recording (with consent), and virtual waiting rooms. No third-party apps needed.',
    icon: Video,
    color: 'primary',
    category: 'Communication',
  },
  {
    id: 'voice-notes',
    title: 'Voice Notes',
    description: 'Record session notes by voice and let AI transcribe and structure them into proper documentation formats. Save hours of typing.',
    icon: Mic,
    color: 'secondary',
    category: 'Documentation',
  },
  {
    id: 'document-sharing',
    title: 'Document Sharing',
    description: 'Securely share documents, worksheets, and resources with clients. Track views and downloads with full audit trails.',
    icon: FolderOpen,
    color: 'accent',
    category: 'Communication',
  },
  {
    id: 'analytics',
    title: 'Practice Analytics',
    description: 'Deep insights into your practice performance. Track revenue, client retention, session frequency, and outcomes over time.',
    icon: BarChart3,
    color: 'primary',
    category: 'Business',
  },
  {
    id: 'role-management',
    title: 'Role Management',
    description: 'Granular role-based access control. Define permissions for therapists, receptionists, supervisors, and administrators.',
    icon: UserCog,
    color: 'secondary',
    category: 'Admin',
  },
  {
    id: 'clinic-management',
    title: 'Clinic Management',
    description: 'Multi-therapist clinic support with shared calendars, unified billing, and centralized reporting. Perfect for growing practices.',
    icon: Building2,
    color: 'accent',
    category: 'Business',
  },
  {
    id: 'reports',
    title: 'Reports',
    description: 'Generate comprehensive reports for insurance, supervision, and personal review. Export in PDF, CSV, and other formats.',
    icon: FileBarChart,
    color: 'primary',
    category: 'Business',
  },
  {
    id: 'notifications',
    title: 'Smart Notifications',
    description: 'Intelligent alerts for upcoming appointments, overdue notes, client milestones, and system updates. Never miss what matters.',
    icon: Bell,
    color: 'secondary',
    category: 'Core',
  },
  {
    id: 'dark-mode',
    title: 'Dark Mode',
    description: 'Beautiful dark mode designed for long hours of documentation work. Easy on the eyes with carefully calibrated contrast ratios.',
    icon: Moon,
    color: 'accent',
    category: 'Core',
  },
  {
    id: 'multi-tenant',
    title: 'Multi-Tenant',
    description: 'Every therapist gets their own secure workspace. Data isolation powered by Supabase Row Level Security. No data mixing ever.',
    icon: Layers,
    color: 'primary',
    category: 'Security',
  },
  {
    id: 'supabase-security',
    title: 'Supabase Security',
    description: 'Enterprise-grade security with PostgreSQL RLS, encrypted storage, automatic backups, and SOC 2 compliance. Your data is fortress-protected.',
    icon: Lock,
    color: 'secondary',
    category: 'Security',
  },
]

const categories = ['All', ...Array.from(new Set(features.map(f => f.category)))]

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-6"
          >
            <Brain className="h-4 w-4" />
            23 Powerful Features
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground"
          >
            Everything you need to{' '}
            <span className="gradient-text">run your practice</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg text-muted-foreground"
          >
            From client intake to session documentation, billing to analytics—TheraSpace has every tool a modern mental health professional needs.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`group relative rounded-2xl border p-6 transition-all duration-300 ${
                  feature.highlighted
                    ? 'border-primary/30 bg-primary/5 hover:bg-primary/10'
                    : 'border-white/5 bg-card/30 hover:bg-card/50 hover:border-white/10'
                }`}
              >
                {feature.highlighted && (
                  <div className="absolute -top-3 left-4">
                    <span className="rounded-full bg-gradient-to-r from-primary to-secondary px-3 py-1 text-xs font-medium text-white">
                      AI Powered
                    </span>
                  </div>
                )}

                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-${feature.color}/10 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`h-6 w-6 text-${feature.color}`} />
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <span className="text-xs text-muted-foreground bg-white/5 rounded-full px-2 py-1">
                    {feature.category}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
