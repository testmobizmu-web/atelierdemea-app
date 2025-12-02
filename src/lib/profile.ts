"use client";

import { getSupabaseBrowserClient } from "./supabaseClient";

export async function syncProfileFromAuth() {
  const supabase = getSupabaseBrowserClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const fullName =
    (user.user_metadata && (user.user_metadata.full_name as string)) ||
    (user.user_metadata && (user.user_metadata.name as string)) ||
    "";

  await supabase
    .from("profiles")
    .upsert(
      {
        id: user.id,
        full_name: fullName,
      },
      { onConflict: "id" }
    );
}
