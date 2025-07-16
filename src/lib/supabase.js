import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  'https://cnjvkaeaedsifidpbfmo.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuanZrYWVhZWRzaWZpZHBiZm1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxMTM0NDgsImV4cCI6MjA2MDY4OTQ0OH0.vs1DrO6K56vgq96h9JNvPoum-ofULTLhKPEr0RuOpjA'
);

export default supabase;