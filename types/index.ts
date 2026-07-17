export interface User {
  id: string
  email: string
  full_name: string | null
  role: 'therapist' | 'client' | 'receptionist' | 'admin'
  clinic_id: string | null
  avatar_url: string | null
  created_at: string
}

export interface Clinic {
  id: string
  name: string
  owner_id: string
  subscription_status: 'active' | 'trial' | 'expired' | 'cancelled'
  subscription_ends_at: string | null
  created_at: string
}

export interface Client {
  id: string
  therapist_id: string
  full_name: string
  email: string | null
  phone: string | null
  date_of_birth: string | null
  emergency_contact: string | null
  notes: string | null
  created_at: string
}

export interface Appointment {
  id: string
  therapist_id: string
  client_id: string
  client_name?: string
  start_time: string
  end_time: string
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show'
  notes: string | null
  created_at: string
}

export interface Note {
  id: string
  therapist_id: string
  client_id: string
  type: 'soap' | 'dap' | 'birp' | 'progress' | 'intake'
  content: string
  ai_generated: boolean
  created_at: string
}

export interface Message {
  id: string
  sender_id: string
  recipient_id: string
  content: string
  encrypted: boolean
  read_at: string | null
  created_at: string
}

export interface Feature {
  id: string
  title: string
  description: string
  icon: string
  category: string
  highlighted?: boolean
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  category: string
  tags: string[]
  published_at: string
  read_time: number
  image: string
  slug: string
}

export interface PricingPlan {
  id: string
  name: string
  price: number
  currency: string
  interval: 'month' | 'year'
  description: string
  features: string[]
  highlighted?: boolean
  cta: string
}

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export interface StatItem {
  label: string
  value: number
  suffix: string
  prefix?: string
}

export interface Step {
  number: number
  title: string
  description: string
}

export interface Benefit {
  id: string
  title: string
  description: string
  icon: string
}

export interface SecurityFeature {
  id: string
  title: string
  description: string
  icon: string
}
