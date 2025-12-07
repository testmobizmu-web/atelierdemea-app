// src/lib/supabaseServer.ts
import { supabase, supabaseAdmin } from "./supabaseClient";

// Use admin on server if available, otherwise fall back to public client
export const supabaseServer = supabaseAdmin ?? supabase;

export default supabaseServer;

