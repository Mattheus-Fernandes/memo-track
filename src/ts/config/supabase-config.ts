import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://xxdjmhqimtdznpmlvibo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4ZGptaHFpbXRkem5wbWx2aWJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc5MTMyNzgsImV4cCI6MjA0MzQ4OTI3OH0.1GIoYR9dFjM_wLRxqZr8Z8hRUPT9Swdxi8nOh5_6dBc'


export const supabase = createClient(supabaseUrl, supabaseKey)
