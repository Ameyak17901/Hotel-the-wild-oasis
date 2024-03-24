
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://tbvofqkyqlsddezzfidy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRidm9mcWt5cWxzZGRlenpmaWR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA2NzY2MTUsImV4cCI6MjAyNjI1MjYxNX0.R2B4MnNywIAjM_dtaAJZHdYbnUSivhxPEoquiC5v8l8'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;