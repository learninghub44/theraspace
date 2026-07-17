import { createClient } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
})

export function createServerSupabaseClient() {
  const cookieStore = cookies()
  return createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'therapist' | 'client' | 'receptionist' | 'admin'
          clinic_id: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: 'therapist' | 'client' | 'receptionist' | 'admin'
          clinic_id?: string | null
          avatar_url?: string | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: 'therapist' | 'client' | 'receptionist' | 'admin'
          clinic_id?: string | null
          avatar_url?: string | null
        }
      }
      clinics: {
        Row: {
          id: string
          name: string
          owner_id: string
          subscription_status: 'active' | 'trial' | 'expired' | 'cancelled'
          subscription_ends_at: string | null
          created_at: string
        }
      }
      appointments: {
        Row: {
          id: string
          therapist_id: string
          client_id: string
          start_time: string
          end_time: string
          status: 'scheduled' | 'completed' | 'cancelled' | 'no_show'
          notes: string | null
          created_at: string
        }
      }
      clients: {
        Row: {
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
      }
      notes: {
        Row: {
          id: string
          therapist_id: string
          client_id: string
          type: 'soap' | 'dap' | 'birp' | 'progress' | 'intake'
          content: string
          ai_generated: boolean
          created_at: string
        }
      }
      messages: {
        Row: {
          id: string
          sender_id: string
          recipient_id: string
          content: string
          encrypted: boolean
          read_at: string | null
          created_at: string
        }
      }
    }
  }
}
