import { supabase } from "./supabaseClient";

/**
 * Uploads a product image to the "products" bucket and returns a public URL.
 */
export async function uploadProductImage(file: File, productId?: string) {
  const ext = file.name.split(".").pop() || "jpg";
  const fileName = `${productId ?? Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}.${ext}`;

  const filePath = `images/${fileName}`;

  const { error } = await supabase.storage
    .from("products")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage.from("products").getPublicUrl(filePath);

  return data.publicUrl;
}
