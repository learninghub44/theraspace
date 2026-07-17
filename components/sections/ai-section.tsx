'use client'

import { motion } from 'framer-motion'
import { Brain, Sparkles, FileText, MessageSquare, Lightbulb, Target, BookOpen, Clock, AlertTriangle, CheckCircle2, Zap, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const aiCapabilities = [
  {
    icon: FileText,
    title: 'Generate SOAP Notes',
    description: 'AI structures your session observations into professional SOAP format in seconds.',
    color: 'primary',
  },
  {
    icon: MessageSquare,
    title: 'Summarize Sessions',
    description: 'Get concise summaries of long sessions highlighting key themes and progress.',
    color: 'secondary',
  },
  {
    icon: BookOpen,
    title: 'Summarize Journals',
    description: 'Extract insights from client journal entries to inform your next session.',
    color: 'accent',
  },
  {
    icon: Target,
    title: 'Treatment Plan Drafts',
    description: 'AI suggests evidence-based treatment plans based on intake and session data.',
    color: 'primary',
  },
  {
    icon: Lightbulb,
    title: 'Homework Suggestions',
    description: 'Personalized homework recommendations tailored to each client's goals.',
    color: 'secondary',
  },
  {
    icon: Clock,
    title: 'Progress Summaries',
    description: 'Track and summarize client progress over weeks, months, or years.',
    color: 'accent',
  },
  {
    icon: MessageSquare,
    title: 'Reflection Questions',
    description: 'Generate thoughtful questions to deepen client self-awareness.',
    color: 'primary',
  },
  {
    icon: FileText,
    title: 'Meeting Summaries',
    description: 'Summarize supervision meetings and team discussions with action items.',
    color: 'secondary',
  },
]

const safeguards = [
  'Never diagnoses patients',
  'Never replaces professional judgment',
  'Always flags for human review',
  'HIPAA-compliant processing',
  'No data used for model training',
]

export function AISection() {
  return (
    <section id="ai" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm font-medium text-accent mb-6"
            >
              <Zap className="h-4 w-4" />
              Powered by Groq AI
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground"
            >
              Your AI Assistant.
              <br />
              <span className="gradient-text">Never Your Replacement.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg text-muted-foreground leading-relaxed"
            >
              TheraSpace's AI doesn't replace your expertise—it amplifies it. Save hours on documentation while maintaining the human connection that makes therapy effective.
            </motion.p>

            {/* Safeguards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 space-y-3"
            >
              {safeguards.map((safeguard, i) => (
                <motion.div
                  key={safeguard}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-success/10">
                    <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                  </div>
                  <span className="text-sm text-foreground">{safeguard}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-10"
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all hover:shadow-glow-lg"
              >
                <Link href="/signup">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Try AI Features Free
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Right Content - AI Chat Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 40 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="rounded-2xl border border-white/10 bg-card/80 backdrop-blur-xl p-6 shadow-premium">
              {/* Chat Header */}
              <div className="flex items-center gap-3 pb-4 border-b border-white/5 mb-4">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-success border-2 border-card" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">TheraSpace AI</div>
                  <div className="text-xs text-muted-foreground">Powered by Groq</div>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                  <span className="text-xs text-muted-foreground">Online</span>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="space-y-4">
                {/* User Message */}
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <span className="text-xs font-medium text-accent">You</span>
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-white/5 px-4 py-3 text-sm text-foreground max-w-[80%]">
                    Generate a SOAP note for today's session with Sarah. She reported reduced anxiety (3/10 vs 7/10 last week), practiced breathing exercises daily, and wants to focus on social anxiety next.
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-primary/5 border border-primary/10 px-4 py-3 text-sm text-foreground max-w-[85%]">
                    <div className="font-medium text-primary mb-2">SOAP Note Generated</div>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium text-foreground">S:</span> Sarah reports anxiety level reduced to 3/10 (from 7/10). She has been practicing breathing exercises daily and finds them helpful. She expresses readiness to address social anxiety in upcoming sessions.
                      </div>
                      <div>
                        <span className="font-medium text-foreground">O:</span> Client appeared calm, maintained eye contact. Mood improved. No signs of acute distress.
                      </div>
                      <div>
                        <span className="font-medium text-foreground">A:</span> Progress noted in anxiety management. Client demonstrating consistent use of coping skills. Ready to advance treatment goals.
                      </div>
                      <div>
                        <span className="font-medium text-foreground">P:</span> 1. Continue breathing exercises. 2. Introduce social exposure hierarchy next session. 3. Assign social anxiety log. 4. Schedule follow-up in 1 week.
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <button className="text-xs text-primary hover:underline">Edit Note</button>
                      <span className="text-muted-foreground">·</span>
                      <button className="text-xs text-primary hover:underline">Save to Record</button>
                      <span className="text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground">Generated in 2.1s</span>
                    </div>
                  </div>
                </div>

                {/* Typing Indicator */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground ml-11">
                  <div className="flex gap-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span>AI is ready for your next request</span>
                </div>
              </div>

              {/* Input */}
              <div className="mt-4 pt-4 border-t border-white/5">
                <div className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/5 px-4 py-3">
                  <input
                    type="text"
                    placeholder="Ask AI to generate notes, summarize, or suggest..."
                    className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                    readOnly
                  />
                  <button className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Sparkles className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Floating Stats */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-6 -right-6 rounded-xl border border-white/10 bg-card/90 backdrop-blur-xl p-4 shadow-premium"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-success" />
                </div>
                <div>
                  <div className="text-sm font-medium">Save 5+ Hours</div>
                  <div className="text-xs text-muted-foreground">Per week on docs</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* AI Capabilities Grid */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4">
          {aiCapabilities.map((cap, i) => {
            const Icon = cap.icon
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-xl border border-white/5 bg-card/30 p-4 hover:bg-card/50 hover:border-white/10 transition-all duration-300"
              >
                <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-${cap.color}/10 group-hover:scale-110 transition-transform`}>
                  <Icon className={`h-5 w-5 text-${cap.color}`} />
                </div>
                <div className="font-medium text-sm text-foreground mb-1">{cap.title}</div>
                <div className="text-xs text-muted-foreground">{cap.description}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
