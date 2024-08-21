import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://dgyuwphgedvnfymiqzga.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRneXV3cGhnZWR2bmZ5bWlxemdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcwNjAzMjQsImV4cCI6MjAzMjYzNjMyNH0.J2eioWQ3gzHn93WlpJvmXpiF83q9xfQ64urStHediS0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;