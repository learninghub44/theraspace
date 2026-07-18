"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Menu, X, Moon, Sun, ChevronDown, 
  Shield, Sparkles, Users, Phone, LayoutDashboard
} from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/app/lib/utils"
import { supabase } from "@/app/lib/supabase"
import { useProfile } from "@/app/lib/use-profile"
import { LogoMark } from "@/app/components/logo"
import type { Session } from "@supabase/supabase-js"

const navLinks = [
  { name: "Find Therapist", href: "/therapists", icon: Users },
  { name: "How It Works", href: "#how-it-works", icon: Sparkles },
  { name: "About", href: "/about", icon: null },
  { name: "Contact", href: "/contact", icon: Phone },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [session, setSession] = useState<Session | null>(null)
  const { profile } = useProfile(session)

  useEffect(() => {
    let active = true
    supabase.auth.getSession().then(({ data }) => {
      if (active) setSession(data.session)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (active) setSession(newSession)
    })
    return () => {
      active = false
      listener.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      const sections = ["therapists", "how-it-works"]
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.getElementById(href.slice(1))
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-thera-bg/80 backdrop-blur-2xl border-b border-thera-ink/5 shadow-2xl shadow-black/20"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <LogoMark className="w-8 h-8 lg:w-10 lg:h-10 group-hover:scale-105 transition-transform" />
              <span className="text-xl lg:text-2xl font-display font-medium tracking-tight">
                Thera<span className="text-thera-primary">Space</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    if (link.href.startsWith("#")) {
                      e.preventDefault()
                      scrollToSection(link.href)
                    }
                  }}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                    activeSection === link.href.slice(1)
                      ? "text-thera-text"
                      : "text-thera-muted hover:text-thera-text"
                  )}
                >
                  {link.name}
                  {activeSection === link.href.slice(1) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-thera-ink/10 rounded-lg -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-lg hover:bg-thera-ink/10 transition-colors text-thera-muted hover:text-thera-text"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              )}

              {/* Auth-aware links */}
              {session ? (
                <>
                  {profile?.role === "admin" && (
                    <Link
                      href="/admin"
                      className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-thera-muted hover:text-thera-text transition-colors"
                    >
                      <Shield className="w-4 h-4" /> Admin
                    </Link>
                  )}
                  <Link
                    href="/dashboard"
                    className="hidden sm:flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-thera-primary to-thera-secondary rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-thera-primary/25"
                  >
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="hidden sm:flex px-4 py-2 text-sm font-medium text-thera-muted hover:text-thera-text transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="hidden sm:flex px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-thera-primary to-thera-secondary rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-thera-primary/25"
                  >
                    Get Started
                  </Link>
                </>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-thera-ink/10 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-thera-bg/95 backdrop-blur-2xl pt-20 lg:hidden"
          >
            <div className="px-6 py-8 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith("#")) {
                        e.preventDefault()
                        scrollToSection(link.href)
                      } else {
                        setIsMobileMenuOpen(false)
                      }
                    }}
                    className="flex items-center gap-3 px-4 py-3 text-lg font-medium rounded-xl hover:bg-thera-ink/5 transition-colors"
                  >
                    {link.icon && <link.icon className="w-5 h-5 text-thera-primary" />}
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-6 space-y-3">
                {session ? (
                  <>
                    {profile?.role === "admin" && (
                      <Link
                        href="/admin"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-2 px-4 py-3 text-lg font-medium rounded-xl border border-thera-ink/10 hover:bg-thera-ink/5 transition-colors"
                      >
                        <Shield className="w-5 h-5" /> Admin
                      </Link>
                    )}
                    <Link
                      href="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 px-4 py-3 text-lg font-semibold rounded-xl bg-gradient-to-r from-thera-primary to-thera-secondary"
                    >
                      <LayoutDashboard className="w-5 h-5" /> Dashboard
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center px-4 py-3 text-lg font-medium rounded-xl border border-thera-ink/10 hover:bg-thera-ink/5 transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center px-4 py-3 text-lg font-semibold rounded-xl bg-gradient-to-r from-thera-primary to-thera-secondary"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
