import { createClient } from '@supabase/supabase-js'

const URL = 'https://yfgvoqybztfacjuzrxfy.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmZ3ZvcXlienRmYWNqdXpyeGZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxODI5MDgsImV4cCI6MjAyOTc1ODkwOH0.Pze2NGjQFocDyvN5srL5LvU02TLZL3lMi3i8YE7HyM8';
export const supabase = createClient(URL, API_KEY);
