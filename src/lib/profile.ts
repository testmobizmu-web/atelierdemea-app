// src/lib/profile.ts
"use client";

import { supabase } from "./supabaseClient";

export async function syncProfileFromAuth() {
  // Get current authenticated user
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    if (error) {
      console.error("syncProfileFromAuth: getUser error", error);
    }
    return;
  }

  const fullName =
    (user.user_metadata?.full_name as string) ||
    (user.user_metadata?.name as string) ||
    null;

  const { error: upsertError } = await supabase.from("profiles").upsert(
    {
      id: user.id,
      email: user.email,
      full_name: fullName,
      updated_at: new Date().toISOString(),
    },
    {
      // depending on your schema this might be "id" or a composite key
      onConflict: "id",
    }
  );

  if (upsertError) {
    console.error("syncProfileFromAuth: upsert error", upsertError);
  }
}
