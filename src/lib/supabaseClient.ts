// src/lib/supabaseClient.ts
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// 🔐 Public client – safe for browser & server (uses anon key)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY"
  );
}

/**
 * Default Supabase client (anon key).
 * Use this in public parts of the app (shop, logged-in users, etc.).
 */
export const supabase: SupabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey
);

// 🔐 Admin client – uses service role key (server only!)
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Admin Supabase client (service role).
 * - Bypasses RLS.
 * - MUST be used only on the server: API routes, server utils, etc.
 * - Do NOT import this from any "use client" file.
 */
export const supabaseAdmin: SupabaseClient | null = serviceRoleKey
  ? createClient(supabaseUrl, serviceRoleKey)
  : null;

/**
 * ✅ Compatibility helper for existing code:
 * src/app/account/page.tsx imports `getSupabaseBrowserClient`.
 * Here we simply return the public supabase client.
 */
export function getSupabaseBrowserClient(): SupabaseClient {
  return supabase;
}

