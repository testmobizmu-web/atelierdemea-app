// src/lib/reviews.ts
import { supabase } from "./supabaseClient";

export type Review = {
  id: string;
  created_at: string;
  name: string | null;
  rating: number | null;
  message: string | null;
  product_id?: string | null;
};

export async function getApprovedReviewsForProduct(
  productId: string
): Promise<Review[]> {
  if (!productId) return [];

  const { data, error } = await supabase
    .from("reviews")
    .select("id, created_at, name, rating, message, product_id")
    .eq("approved", true)
    .eq("product_id", productId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }

  return data ?? [];
}
