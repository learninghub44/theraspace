"use client"

import { motion } from "framer-motion"
import { Sparkles, FileText, MessageSquare, Target, Home, TrendingUp, HelpCircle, AlertTriangle, CheckCircle2 } from "lucide-react"

const aiCapabilities = [
  {
    icon: FileText,
    title: "Generate SOAP Notes",
    description: "Automatically generate structured SOAP notes from session transcripts or brief summaries. Save 15+ minutes per session.",
  },
  {
    icon: MessageSquare,
    title: "Summarize Sessions",
    description: "Get concise, clinically relevant summaries of entire therapy sessions. Extract key themes, interventions, and progress markers.",
  },
  {
    icon: FileText,
    title: "Summarize Journals",
    description: "Analyze client journal entries for emotional patterns, recurring themes, and significant changes over time.",
  },
  {
    icon: Target,
    title: "Treatment Plan Drafts",
    description: "Generate evidence-based treatment plan drafts with measurable goals, interventions, and timeline recommendations.",
  },
  {
    icon: Home,
    title: "Homework Suggestions",
    description: "Get personalized homework and intervention suggestions based on session content and client goals.",
  },
  {
    icon: TrendingUp,
    title: "Progress Summaries",
    description: "Create comprehensive progress reports with trend analysis, goal achievement tracking, and clinical recommendations.",
  },
  {
    icon: HelpCircle,
    title: "Reflection Questions",
    description: "Generate thought-provoking reflection questions for clients based on their journal entries and session themes.",
  },
  {
    icon: MessageSquare,
    title: "Meeting Summaries",
    description: "Summarize supervision meetings, team consultations, and case conferences with action items and follow-ups.",
  },
]

const ethicalBoundaries = [
  { icon: AlertTriangle, text: "Never diagnoses conditions", color: "text-thera-warning" },
  { icon: AlertTriangle, text: "Never replaces professional judgment", color: "text-thera-warning" },
  { icon: CheckCircle2, text: "Always requires therapist review", color: "text-thera-success" },
  { icon: CheckCircle2, text: "Privacy-first with local processing", color: "text-thera-success" },
]

function AIChatMockup() {
  const messages = [
    { type: "user", text: "Generate a SOAP note for my session with Sarah today. She discussed anxiety about work performance and practiced breathing exercises." },
    { type: "ai", text: "**Subjective:** Sarah reports increased anxiety related to work performance expectations. She describes feeling overwhelmed by deadlines and fears of not meeting standards.\n\n**Objective:** Client appeared alert and oriented. Practiced diaphragmatic breathing exercises for 10 minutes. Heart rate decreased from 92 to 72 bpm during exercise.\n\n**Assessment:** Generalized anxiety symptoms with somatic manifestations. Client demonstrates good engagement with coping strategies.\n\n**Plan:** Continue weekly CBT sessions. Assign daily breathing practice log. Review work stressors in next session." },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative"
    >
      <div className="rounded-2xl overflow-hidden border border-thera-ink/10 bg-thera-card/80 backdrop-blur-sm">
        {/* Chat Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-thera-ink/5 bg-thera-ink/5">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-thera-primary to-thera-secondary flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-sm">TheraSpace AI</p>
            <p className="text-xs text-thera-success flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-thera-success animate-pulse" />
              Powered by Groq
            </p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="p-5 space-y-4 max-h-[400px] overflow-y-auto">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.3 }}
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                msg.type === "user" 
                  ? "bg-thera-primary/20 rounded-br-md" 
                  : "bg-thera-ink/5 rounded-bl-md border border-thera-ink/5"
              }`}>
                {msg.type === "ai" && (
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-thera-primary" />
                    <span className="text-xs font-medium text-thera-primary">AI Generated</span>
                  </div>
                )}
                <div className="whitespace-pre-line text-thera-muted">{msg.text}</div>
                {msg.type === "ai" && (
                  <div className="flex gap-2 mt-3 pt-3 border-t border-thera-ink/5">
                    <button className="text-xs px-3 py-1.5 rounded-lg bg-thera-primary/20 text-thera-primary hover:bg-thera-primary/30 transition-colors">
                      Copy Note
                    </button>
                    <button className="text-xs px-3 py-1.5 rounded-lg bg-thera-ink/5 text-thera-muted hover:bg-thera-ink/10 transition-colors">
                      Edit
                    </button>
                    <button className="text-xs px-3 py-1.5 rounded-lg bg-thera-ink/5 text-thera-muted hover:bg-thera-ink/10 transition-colors">
                      Regenerate
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-thera-ink/5">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-thera-ink/5 border border-thera-ink/5">
            <input 
              type="text" 
              placeholder="Ask the AI assistant..." 
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-thera-muted"
              readOnly
            />
            <button className="p-2 rounded-lg bg-thera-primary/20 text-thera-primary hover:bg-thera-primary/30 transition-colors">
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Glow */}
      <div className="absolute -inset-4 bg-gradient-to-r from-thera-primary/10 via-thera-secondary/10 to-thera-accent/10 rounded-3xl blur-3xl -z-10" />
    </motion.div>
  )
}

export function AISection() {
  return (
    <section id="ai" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-thera-primary/5 rounded-full blur-3xl" />
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-thera-primary/10 border border-thera-primary/20 text-sm mb-6">
            <Sparkles className="w-4 h-4 text-thera-primary" />
            <span className="text-thera-primary font-medium">Artificial Intelligence</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Your AI Assistant.
            <br />
            <span className="text-thera-muted">Never Your Replacement.</span>
          </h2>
          <p className="text-lg text-thera-muted max-w-2xl mx-auto">
            Groq AI helps therapists work smarter, not harder. Generate notes, summarize sessions, and draft treatment plans — while you focus on what matters most: your clients.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Capabilities Grid */}
          <div className="space-y-4">
            {aiCapabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group flex items-start gap-4 p-4 rounded-xl bg-thera-ink/5 border border-thera-ink/5 hover:border-thera-primary/30 transition-all duration-300 hover:-translate-x-1"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-thera-primary/20 to-thera-secondary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <cap.icon className="w-5 h-5 text-thera-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1 group-hover:text-gradient transition-all">{cap.title}</h3>
                  <p className="text-sm text-thera-muted leading-relaxed">{cap.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Chat Mockup */}
          <div className="lg:sticky lg:top-24">
            <AIChatMockup />
          </div>
        </div>

        {/* Ethical Boundaries */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 p-8 rounded-2xl bg-gradient-to-r from-thera-primary/5 via-thera-secondary/5 to-thera-accent/5 border border-thera-ink/5"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Built with Ethics in Mind</h3>
              <p className="text-thera-muted">Our AI is designed to assist, not replace. Here are our core principles:</p>
            </div>
            <div className="flex flex-wrap gap-4">
              {ethicalBoundaries.map((item, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-thera-ink/5 border border-thera-ink/5">
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
