import { createClient } from '@supabase/supabase-js';

export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    const errorMsg = 'CRITICAL CONFIGURATION ERROR: Supabase server environment variables (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY) are missing. Check your .env file or Vercel environment settings.';
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

export function getSupabasePublic() {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!url || !anonKey) {
    const errorMsg = 'CRITICAL CONFIGURATION ERROR: Supabase public environment variables (SUPABASE_URL, SUPABASE_ANON_KEY) are missing.';
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  return createClient(url, anonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true
    }
  });
}

