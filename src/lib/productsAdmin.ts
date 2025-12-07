// src/lib/productsAdmin.ts
import { supabaseServer } from "./supabaseServer";
import type { Product } from "./products";

// ✅ Fetch all products for the dashboard (server-side, no RLS issues)
export async function adminGetAllProducts(): Promise<Product[]> {
  const { data, error } = await supabaseServer
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("adminGetAllProducts error:", error);
    return [];
  }

  return (data ?? []).map((p) => ({
    ...p,
    images: (p as any).images ?? null,
    image_url: (p as any).image_url ?? null,
    short_description: (p as any).short_description ?? null,
    long_description: (p as any).long_description ?? null,
    is_featured: (p as any).is_featured ?? false,
    is_new: (p as any).is_new ?? false,
    is_best_seller: (p as any).is_best_seller ?? false,
    is_on_sale: (p as any).is_on_sale ?? false,
    is_limited: (p as any).is_limited ?? false,
  })) as Product[];
}

// ✅ Fetch ONE product by ID for the edit screen
export async function adminGetProductById(
  id: string
): Promise<Product | null> {
  const { data, error } = await supabaseServer
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("adminGetProductById error:", error);
    return null;
  }

  if (!data) return null;

  return {
    ...data,
    images: (data as any).images ?? null,
    image_url: (data as any).image_url ?? null,
    short_description: (data as any).short_description ?? null,
    long_description: (data as any).long_description ?? null,
    is_featured: (data as any).is_featured ?? false,
    is_new: (data as any).is_new ?? false,
    is_best_seller: (data as any).is_best_seller ?? false,
    is_on_sale: (data as any).is_on_sale ?? false,
    is_limited: (data as any).is_limited ?? false,
  } as Product;
}
