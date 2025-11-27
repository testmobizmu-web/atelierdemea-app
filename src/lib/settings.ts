import { supabase } from "./supabaseClient";

export type ShopSettings = {
  id: string;
  site_name: string | null;
  logo_url: string | null;
  favicon_url: string | null;
  hero_title: string | null;
  hero_subtitle: string | null;
  hero_primary_image_url: string | null;
  hero_secondary_image_url: string | null;
  blog_default_image_url: string | null;
  created_at: string;
  updated_at: string;
};

/**
 * Get the single settings row.
 */
export async function getShopSettings(): Promise<ShopSettings | null> {
  const { data, error } = await supabase
    .from("shop_settings")
    .select("*")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("getShopSettings error:", error.message);
    return null;
  }

  return data as ShopSettings | null;
}
