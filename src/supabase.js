import { createClient } from '@supabase/supabase-js'

const supabaseUrl = String(import.meta.env.VITE_SUPABASE_URL)
const supabasePublishableKey = String(import.meta.env.VITE_SUPABASE_PUBLISHABLEKEY)

export const supabase = createClient(supabaseUrl, supabasePublishableKey)