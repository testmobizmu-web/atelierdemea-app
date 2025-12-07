// src/app/admin/products/[id]/edit/EditProductForm.tsx
"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";

type EditFormState = {
  name: string;
  slug: string;
  price: number;
  sale_price: number | null;
  category: string;
  stock: number | null;

  short_description: string;
  long_description: string;

  // just edit the first image URL for now
  primary_image_url: string;

  is_featured: boolean;
  is_new: boolean;
  is_best_seller: boolean;
  is_on_sale: boolean;
  is_limited: boolean;
};

export default function EditProductForm({ product }: { product: Product }) {
  const [form, setForm] = useState<EditFormState>(() => ({
    name: product.name,
    slug: product.slug,
    price: product.price,
    sale_price: product.sale_price ?? null,
    category: product.category ?? "",
    stock: product.stock ?? null,

    short_description: product.short_description ?? "",
    long_description: product.long_description ?? "",

    primary_image_url: product.images?.[0] ?? "",

    is_featured: !!product.is_featured,
    is_new: !!product.is_new,
    is_best_seller: !!product.is_best_seller,
    is_on_sale: !!product.is_on_sale,
    is_limited: !!product.is_limited,
  }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // For now, we keep images as:
    // [primary_image_url, ...existingOtherImages]
    const otherImages = (product.images || []).slice(1);
    const images = [form.primary_image_url, ...otherImages].filter(Boolean);

    const payload = {
      name: form.name,
      slug: form.slug,
      price: form.price,
      sale_price: form.sale_price,
      category: form.category || null,
      stock: form.stock,
      short_description: form.short_description,
      long_description: form.long_description,
      images,
      is_featured: form.is_featured,
      is_new: form.is_new,
      is_best_seller: form.is_best_seller,
      is_on_sale: form.is_on_sale,
      is_limited: form.is_limited,
    };

    const res = await fetch(`/api/admin/products/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(`Error updating product: ${data.error || res.statusText}`);
      return;
    }

    alert("Product updated ✅");
    // optional: redirect to /admin/products
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 text-sm sm:text-base">
      {/* BASIC INFO */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-medium mb-1">Product name</label>
          <input
            className="w-full rounded-lg border border-[#fde7f1] px-3 py-2"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Slug (URL)</label>
          <input
            className="w-full rounded-lg border border-[#fde7f1] px-3 py-2"
            value={form.slug}
            onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
          />
        </div>
      </div>

      {/* PRICE / STOCK */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-xs font-medium mb-1">Price (Rs)</label>
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
                sale_price: e.target.value ? Number(e.target.value) : null,
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

      {/* CATEGORY */}
      <div>
        <label className="block text-xs font-medium mb-1">Category</label>
        <input
          className="w-full rounded-lg border border-[#fde7f1] px-3 py-2"
          value={form.category}
          onChange={(e) =>
            setForm((p) => ({ ...p, category: e.target.value }))
          }
        />
      </div>

      {/* DESCRIPTIONS */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium mb-1">
            Short description (card)
          </label>
          <textarea
            className="w-full rounded-lg border border-[#fde7f1] px-3 py-2 text-sm min-h-[60px]"
            maxLength={180}
            value={form.short_description}
            onChange={(e) =>
              setForm((p) => ({ ...p, short_description: e.target.value }))
            }
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
              setForm((p) => ({ ...p, long_description: e.target.value }))
            }
          />
        </div>
      </div>

      {/* MAIN IMAGE URL (simple edit) */}
      <div>
        <label className="block text-xs font-medium mb-1">
          Primary image URL
        </label>
        <input
          className="w-full rounded-lg border border-[#fde7f1] px-3 py-2 text-sm"
          value={form.primary_image_url}
          onChange={(e) =>
            setForm((p) => ({ ...p, primary_image_url: e.target.value }))
          }
        />
        {form.primary_image_url && (
          <div className="mt-3 w-32 h-32 rounded-xl overflow-hidden border border-[#fde7f1] bg-[#fff7fb]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={form.primary_image_url}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* BADGE TOGGLES */}
      <div className="grid gap-4 sm:grid-cols-4">
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
      </div>

      <div>
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

      <button
        type="submit"
        className="inline-flex items-center rounded-full bg-[#ec4899] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#db2777]"
      >
        Save changes
      </button>
    </form>
  );
}

