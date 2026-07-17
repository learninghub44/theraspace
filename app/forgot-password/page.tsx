"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, ArrowLeft, Sparkles, CheckCircle2, AlertCircle } from "lucide-react"
import { supabase, getSiteUrl } from "@/app/lib/supabase"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      // Must be added to the "Redirect URLs" allow list in
      // Supabase → Authentication → URL Configuration.
      redirectTo: `${getSiteUrl()}/reset-password`,
    })

    setIsLoading(false)

    if (resetError) {
      setError(resetError.message)
      return
    }

    // Always show success, even if the email doesn't exist, so we don't
    // leak which emails are registered.
    setIsSuccess(true)
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 rounded-full bg-thera-success/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-thera-success" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Check your email</h1>
          <p className="text-thera-muted mb-6">
            If an account exists for <span className="text-white">{email}</span>, we&apos;ve sent a link to reset your password.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-thera-primary to-thera-secondary rounded-xl font-semibold"
          >
            Back to Login
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-thera-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-thera-secondary/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm text-thera-muted hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to login
        </Link>

        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-thera-primary to-thera-secondary mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Reset your password</h1>
            <p className="text-sm text-thera-muted">
              Enter your email and we&apos;ll send you a link to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-thera-danger/10 border border-thera-danger/30 text-sm text-thera-danger">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-thera-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-thera-muted focus:outline-none focus:border-thera-primary/50 focus:ring-2 focus:ring-thera-primary/20 transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-thera-primary to-thera-secondary rounded-xl font-semibold hover:shadow-lg hover:shadow-thera-primary/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending link...
                </span>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
