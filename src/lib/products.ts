import { supabase } from "./supabaseClient";

export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  short_description: string | null;
  long_description: string | null;
  description?: string | null;
  category: string | null;
  color: string | null;
  variant: string | null;
  stock: number | null;
  image_url: string | null;
  is_featured: boolean;
  is_new: boolean;
  is_best_seller: boolean;
  is_on_sale: boolean;
  sale_badge_label: string | null;
  created_at: string;
};

/**
 * Get all products ordered by newest first.
 */
export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("DEBUG getAllProducts – error:", error);
    return [];
  }

  console.log(
    "DEBUG getAllProducts – count:",
    (data ?? []).length
  );

  return (data ?? []).map((p: any) => ({
    ...p,
    description: p.description ?? p.short_description ?? null,
    is_new: p.is_new ?? false,
    is_best_seller: p.is_best_seller ?? false,
    is_on_sale: p.is_on_sale ?? false,
    sale_badge_label: p.sale_badge_label ?? null,
  })) as Product[];
}

/**
 * Get single product by slug.
 */
export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  console.log("DEBUG getProductBySlug – incoming slug:", slug);

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("DEBUG getProductBySlug – Supabase error:", error);
    return null;
  }

  console.log("DEBUG getProductBySlug – data:", data);

  if (!data) return null;

  return {
    ...data,
    description:
      (data as any).description ??
      (data as any).short_description ??
      null,
    is_new: data.is_new ?? false,
    is_best_seller: data.is_best_seller ?? false,
    is_on_sale: data.is_on_sale ?? false,
    sale_badge_label: data.sale_badge_label ?? null,
  } as Product;
}
