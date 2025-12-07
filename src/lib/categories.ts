// src/lib/categories.ts
import { supabaseServer } from "./supabaseServer";

export type Category = {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  description: string | null;
  created_at?: string;
  updated_at?: string;
};

export async function getAllCategories(): Promise<Category[]> {
  const { data, error } = await supabaseServer
    .from("categories")
    .select("id, name, slug, image_url, description, created_at, updated_at")
    .order("name", { ascending: true });

  if (error) {
    console.error("getAllCategories error:", error);
    return [];
  }
  return (data || []) as Category[];
}

export async function getCategoryById(id: string): Promise<Category | null> {
  const { data, error } = await supabaseServer
    .from("categories")
    .select("id, name, slug, image_url, description, created_at, updated_at")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("getCategoryById error:", error);
    return null;
  }

  return (data as Category) ?? null;
}
