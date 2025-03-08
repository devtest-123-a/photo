import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://glkqxancfyhgkmqaxauc.supabase.co";  
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdsa3F4YW5jZnloZ2ttcWF4YXVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0MjEyMTksImV4cCI6MjA1Njk5NzIxOX0.nvPDBwm7-zqvyspsWjeOmH7B3zDkVCI_ww3a-lRqVto";  

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
