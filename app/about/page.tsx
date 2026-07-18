"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Target, Eye, Heart, Shield, Users, Zap } from "lucide-react"

const values = [
  { icon: Heart, title: "Client First", description: "Every decision we make starts with the wellbeing of therapy clients and the professionals who serve them." },
  { icon: Shield, title: "Privacy by Design", description: "Data protection is not an afterthought. It is woven into every layer of our architecture." },
  { icon: Zap, title: "AI for Good", description: "We build AI that amplifies human capability, never replacing the irreplaceable therapist-client bond." },
  { icon: Users, title: "Community Driven", description: "We listen to therapists, iterate based on feedback, and grow alongside the mental health community." },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-thera-muted hover:text-thera-text transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-20">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              About <span className="text-gradient">TheraSpace</span>
            </h1>
            <p className="text-lg text-thera-muted max-w-2xl mx-auto">
              Built by therapists, for therapists. We are on a mission to modernize mental health practice management across Africa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-thera-ink/5 border border-thera-ink/5">
              <div className="w-12 h-12 rounded-xl bg-thera-primary/20 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-thera-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-thera-muted leading-relaxed">
                To empower every therapist and mental health professional with world-class technology that reduces administrative burden, enhances clinical outcomes, and makes quality mental healthcare more accessible across Africa.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-thera-ink/5 border border-thera-ink/5">
              <div className="w-12 h-12 rounded-xl bg-thera-secondary/20 flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-thera-secondary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-thera-muted leading-relaxed">
                A future where every therapist in Africa runs a thriving, technology-enabled practice. Where AI assists but never replaces human connection. Where quality mental health care is accessible to all.
              </p>
            </div>
          </div>

          <div className="p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-thera-ink/5 to-transparent border border-thera-ink/5">
            <h2 className="text-2xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-thera-muted leading-relaxed">
              <p>TheraSpace was born from a simple observation: therapists in Kenya and across Africa were spending more time on paperwork than on their clients. The available practice management tools were either too expensive, too complex, or not designed for the unique needs of mental health professionals.</p>
              <p>We started with a small team of developers and mental health practitioners who believed that technology could be a force for good in therapy. After months of research, prototyping, and testing with real clinics, TheraSpace emerged as a platform that truly understands the workflow of modern therapy practices.</p>
              <p>Today, TheraSpace serves hundreds of therapists across Kenya and beyond. Our AI-powered features, built on Groq, help practitioners save hours every week while maintaining the highest standards of clinical documentation and client privacy.</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {values.map((value, i) => (
                <motion.div key={value.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-6 rounded-2xl bg-thera-ink/5 border border-thera-ink/5 hover:border-thera-primary/20 transition-all">
                  <value.icon className="w-6 h-6 text-thera-primary mb-4" />
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-thera-muted">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
