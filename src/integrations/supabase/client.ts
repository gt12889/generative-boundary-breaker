// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://qkcfeqpsipvkriazbgpx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrY2ZlcXBzaXB2a3JpYXpiZ3B4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5NzkyMzYsImV4cCI6MjA1NDU1NTIzNn0.lmh84s1tqdvaxXh2V-ssklUYrnbnbAAzZBKc4wCK_WU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);