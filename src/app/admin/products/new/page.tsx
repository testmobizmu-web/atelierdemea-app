// src/app/admin/products/new/page.tsx
"use client";

import type React from "react";
import { useState } from "react";
import type { ProductVariant } from "@/lib/products";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

// ✅ Category options for dropdown
const CATEGORY_OPTIONS = [
  "Turbans",
  "Bandeaux",
  "Bonnets",
  "Bags",
  "Sets",
  "Accessories",
];

// ✅ Local admin-only variant type (adds priceDiff)
type AdminVariant = ProductVariant & {
  priceDiff?: number | null;
};

type ProductFormState = {
  name: string;
  slug: string;
  price: number;
  sale_price?: number | null;
  category?: string;
  stock?: number | null;

  images: File[];

  short_description: string;
  long_description: string;

  is_featured: boolean; // Featured collection
  is_new: boolean; // New arrival
  is_best_seller: boolean; // Best seller
  is_on_sale: boolean; // On sale
  is_limited: boolean; // Limited edition

  variants: AdminVariant[];
};

export default function NewProductPage() {
  const [form, setForm] = useState<ProductFormState>({
    name: "",
    slug: "",
    price: 0,
    sale_price: null,
    category: "",
    stock: null,

    images: [],

    short_description: "",
    long_description: "",

    is_featured: false,
    is_new: false,
    is_best_seller: false,
    is_on_sale: false,
    is_limited: false,

    variants: [],
  });

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    // ✅ Merge with existing and cap at 9 total
    setForm((prev) => {
      const merged = [...prev.images, ...files].slice(0, 9);
      return { ...prev, images: merged };
    });
  }

  function handleAddVariant() {
    setForm((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          id: crypto.randomUUID(),
          label: "",
          size: "",
          color: "",
          stock: null,
          priceDiff: 0,
        },
      ],
    }));
  }

  function handleVariantChange(
    idx: number,
    field: keyof AdminVariant,
    value: string | number | null
  ) {
    setForm((prev) => {
      const next = [...prev.variants];
      next[idx] = { ...next[idx], [field]: value };

      // auto label for convenience
      if (field === "size" || field === "color") {
        const v = next[idx];
        const size = v.size ?? "";
        const color = v.color ?? "";
        next[idx].label = [color, size].filter(Boolean).join(" / ");
      }

      return { ...prev, variants: next };
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      // 1) Upload images to Supabase Storage
      const uploadedUrls: string[] = [];

      for (const file of form.images) {
        const ext = file.name.split(".").pop() || "jpg";
        const folder = form.slug || crypto.randomUUID();
        const filePath = `products/${folder}/${Date.now()}-${file.name.replace(
          /\s+/g,
          "-"
        )}`;

        const { data, error } = await supabaseBrowser.storage
          .from("product-images")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (error) {
          console.error("Upload error:", error);
          throw new Error(`Failed to upload ${file.name}`);
        }

        const { data: publicData } = supabaseBrowser.storage
          .from("product-images")
          .getPublicUrl(data.path);

        uploadedUrls.push(publicData.publicUrl);
      }

      // 2) Build payload for your API
      const payload = {
        name: form.name,
        slug: form.slug,
        price: form.price,
        sale_price: form.sale_price,
        category: form.category,
        stock: form.stock,
        images: uploadedUrls, // ✅ public URLs from Supabase
        short_description: form.short_description,
        long_description: form.long_description,

        is_featured: form.is_featured,
        is_new: form.is_new,
        is_best_seller: form.is_best_seller,
        is_on_sale: form.is_on_sale,
        is_limited: form.is_limited,

        // ✅ strip priceDiff before sending, so it matches ProductVariant
        variants: form.variants.map((v) => ({
          id: v.id,
          label: v.label,
          size: v.size ?? null,
          color: v.color ?? null,
          stock: v.stock ?? null,
        })),
      };

      // 3) Send to your API route
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || res.statusText);
      }

      alert("Product saved with Supabase Storage ✅");
      // Optionally redirect:
      // window.location.href = "/admin/products";
    } catch (err: any) {
      console.error(err);
      alert(`Error saving product: ${err.message || "unknown error"}`);
    }
  }

  return (
    <main className="min-h-screen bg-white text-[#47201d]">
      <section className="max-w-4xl mx-auto px-3 sm:px-6 py-8 sm:py-10">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-6">
          Add new product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 text-sm sm:text-base"
        >
          {/* BASIC INFO */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium mb-1">
                Product name
              </label>
              <input
                className="w-full rounded-lg border border-[#fde7f1] px-3 py-2"
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">
                Slug (URL)
              </label>
              <input
                className="w-full rounded-lg border border-[#fde7f1] px-3 py-2"
                value={form.slug}
                onChange={(e) =>
                  setForm((p) => ({ ...p, slug: e.target.value }))
                }
                placeholder="e.g. satin-bonnet-rose"
              />
            </div>
          </div>

          {/* CATEGORY (dropdown) */}
          <div>
            <label className="block text-xs font-medium mb-1">Category</label>
            <select
              className="w-full rounded-lg border border-[#fde7f1] px-3 py-2 text-sm bg-white"
              value={form.category || ""}
              onChange={(e) =>
                setForm((p) => ({ ...p, category: e.target.value || "" }))
              }
            >
              <option value="">Select category…</option>
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <p className="mt-1 text-[11px] text-[#a36d63]">
              These categories power the filters and featured collections on the
              homepage.
            </p>
          </div>

          {/* PRICE / STOCK */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-medium mb-1">
                Price (Rs)
              </label>
              <input
                type="number"
                className="w-full rounded-lg border border-[#fde7f1] px-3 py-2"
                value={form.price}
                onChange={(e) =>
                  setForm((p) => ({ ...p, price: Number(e.target.value) }))
                }
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">
                Sale price (optional)
              </label>
              <input
                type="number"
                className="w-full rounded-lg border border-[#fde7f1] px-3 py-2"
                value={form.sale_price ?? ""}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    sale_price: e.target.value
                      ? Number(e.target.value)
                      : null,
                  }))
                }
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Stock</label>
              <input
                type="number"
                className="w-full rounded-lg border border-[#fde7f1] px-3 py-2"
                value={form.stock ?? ""}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    stock: e.target.value ? Number(e.target.value) : null,
                  }))
                }
              />
            </div>
          </div>

          {/* DESCRIPTIONS */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1">
                Short description (shown on cards)
              </label>
              <textarea
                className="w-full rounded-lg border border-[#fde7f1] px-3 py-2 text-sm min-h-[60px]"
                maxLength={180}
                value={form.short_description}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    short_description: e.target.value,
                  }))
                }
                placeholder="e.g. Handmade satin bonnet, soft lining to protect curls overnight."
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">
                Long description (product page)
              </label>
              <textarea
                className="w-full rounded-lg border border-[#fde7f1] px-3 py-2 text-sm min-h-[140px]"
                value={form.long_description}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    long_description: e.target.value,
                  }))
                }
                placeholder="Full details, care instructions, sizing info, etc."
              />
            </div>
          </div>

          {/* IMAGES (MAX 9, 1:1) */}
          <div>
            <label className="block text-xs font-medium mb-1">
              Product images (max 9) – upload 1:1 square if possible
            </label>

            <div className="flex flex-wrap items-center gap-3">
              <label className="inline-flex items-center gap-2 rounded-full border border-[#fde7f1] bg-[#fff7fb] px-4 py-2 text-xs font-medium text-[#47201d] cursor-pointer hover:bg-[#ffe4f3]">
                <span>📸 Choose images</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {form.images.length > 0 && (
                <span className="text-[11px] text-[#a36d63]">
                  {form.images.length} / 9 selected
                </span>
              )}
            </div>

            <p className="mt-1 text-[11px] text-[#a36d63]">
              Tip: export images in square format (1:1) like 1000×1000 for best
              display in the shop.
            </p>

            {form.images.length > 0 && (
              <div className="mt-3 grid grid-cols-3 sm:grid-cols-6 gap-2">
                {form.images.map((file, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square rounded-xl border border-[#fde7f1] overflow-hidden bg-[#fff1f7]"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute left-1 top-1 rounded-full bg-white/80 px-1.5 py-0.5 text-[10px]">
                      {idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* BADGES / FLAGS */}
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="inline-flex items-center gap-2 text-xs">
              <input
                type="checkbox"
                checked={form.is_featured}
                onChange={(e) =>
                  setForm((p) => ({ ...p, is_featured: e.target.checked }))
                }
              />
              <span>Featured collection</span>
            </label>
            <label className="inline-flex items-center gap-2 text-xs">
              <input
                type="checkbox"
                checked={form.is_new}
                onChange={(e) =>
                  setForm((p) => ({ ...p, is_new: e.target.checked }))
                }
              />
              <span>New arrival</span>
            </label>
            <label className="inline-flex items-center gap-2 text-xs">
              <input
                type="checkbox"
                checked={form.is_best_seller}
                onChange={(e) =>
                  setForm((p) => ({ ...p, is_best_seller: e.target.checked }))
                }
              />
              <span>Best seller</span>
            </label>
            <label className="inline-flex items-center gap-2 text-xs">
              <input
                type="checkbox"
                checked={form.is_on_sale}
                onChange={(e) =>
                  setForm((p) => ({ ...p, is_on_sale: e.target.checked }))
                }
              />
              <span>On sale</span>
            </label>
            <label className="inline-flex items-center gap-2 text-xs">
              <input
                type="checkbox"
                checked={form.is_limited}
                onChange={(e) =>
                  setForm((p) => ({ ...p, is_limited: e.target.checked }))
                }
              />
              <span>Limited edition</span>
            </label>
          </div>

          {/* VARIANTS */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">Variants (size / color)</h2>
              <button
                type="button"
                onClick={handleAddVariant}
                className="text-xs rounded-full border border-[#fde7f1] px-3 py-1 hover:bg-[#fff7fb]"
              >
                + Add variant
              </button>
            </div>

            {form.variants.length === 0 ? (
              <p className="text-[11px] text-[#a36d63]">
                Optional: add variants if this product has different sizes or
                colours.
              </p>
            ) : (
              <div className="space-y-2">
                {form.variants.map((variant, idx) => (
                  <div
                    key={variant.id}
                    className="grid gap-2 sm:grid-cols-4 items-center"
                  >
                    <input
                      className="rounded-lg border border-[#fde7f1] px-2 py-1 text-xs"
                      placeholder="Size (e.g. S, M, L)"
                      value={variant.size ?? ""}
                      onChange={(e) =>
                        handleVariantChange(idx, "size", e.target.value)
                      }
                    />
                    <input
                      className="rounded-lg border border-[#fde7f1] px-2 py-1 text-xs"
                      placeholder="Color (e.g. Rose, Noir)"
                      value={variant.color ?? ""}
                      onChange={(e) =>
                        handleVariantChange(idx, "color", e.target.value)
                      }
                    />
                    <input
                      type="number"
                      className="rounded-lg border border-[#fde7f1] px-2 py-1 text-xs"
                      placeholder="Stock"
                      value={variant.stock ?? ""}
                      onChange={(e) =>
                        handleVariantChange(
                          idx,
                          "stock",
                          e.target.value ? Number(e.target.value) : null
                        )
                      }
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          variants: prev.variants.filter(
                            (_, i) => i !== idx
                          ),
                        }))
                      }
                      className="text-[11px] text-red-600 hover:underline justify-self-start sm:justify-self-end"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SUBMIT */}
          <div className="pt-4">
            <button
              type="submit"
              className="inline-flex items-center rounded-full bg-[#ec4899] px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#db2777]"
            >
              Save product
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
