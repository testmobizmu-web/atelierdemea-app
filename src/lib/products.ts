// src/lib/products.ts
import { supabase } from "./supabaseClient";
import { supabaseServer } from "./supabaseServer";

// This is the full shape of your "products" table
export type Product = {
  id: string;
  created_at: string | null;

  name: string;
  slug: string;

  price: number;
  sale_price: number | null;

  category: string | null;
  stock: number | null;

  // IMAGE FIELDS
  // main product image (legacy)
  image_url: string | null;
  // new array from Supabase Storage
  images: string[] | null;

  // TEXT FIELDS
  short_description: string | null;
  long_description: string | null;

  // BADGES / FLAGS
  is_featured: boolean | null;
  is_new: boolean | null;
  is_best_seller: boolean | null;
  is_on_sale: boolean | null;
  is_limited: boolean | null;

  // EXTRA FIELDS (if you added any, like color / variant)
  color?: string | null;
  variant?: string | null;
};

// VARIANTS TYPE (for separate variants table)
export type ProductVariant = {
  id: string;
  product_id?: string; // not always present on client side before insert
  label: string;
  size?: string | null;
  color?: string | null;
  stock?: number | null;
  price_diff?: number | null;
};

function normalizeProduct(raw: any): Product {
  return {
    ...raw,
    images: raw.images ?? null,
    image_url: raw.image_url ?? null,
    short_description: raw.short_description ?? null,
    long_description: raw.long_description ?? null,
    is_featured: raw.is_featured ?? false,
    is_new: raw.is_new ?? false,
    is_best_seller: raw.is_best_seller ?? false,
    is_on_sale: raw.is_on_sale ?? false,
    is_limited: raw.is_limited ?? false,
  } as Product;
}

export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getAllProducts error:", error);
    return [];
  }

  return (data ?? []).map(normalizeProduct);
}

// ✅ Server-side fetch by ID (used by admin edit page)
export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabaseServer
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("getProductById error:", error);
    return null;
  }
  if (!data) return null;

  return normalizeProduct(data);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("getProductBySlug error:", error);
    return null;
  }

  if (!data) return null;

  return normalizeProduct(data);
}
