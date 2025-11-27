"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProductImageUploader from "@/components/ProductImageUploader";

type Product = {
  id: number;
  name: string;
  price: number;
  description: string | null;
  image_url: string | null;
  is_featured?: boolean;
};

export default function EditProductForm({ product }: { product: Product }) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: product.name,
    price: product.price,
    description: product.description ?? "",
    image_url: product.image_url ?? "",
    is_featured: !!product.is_featured,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to update product");
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to save product");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#fff7fb] border border-[#fde7f1] rounded-3xl p-5 sm:p-6 space-y-5"
    >
      <div className="grid gap-5 md:grid-cols-[2fr_1.2fr]">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#47201d] mb-1">
              Product name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full rounded-xl border border-[#f9a8d4] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ec4899]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#47201d] mb-1">
              Price (Rs)
            </label>
            <input
              type="number"
              min={0}
              step="1"
              value={form.price}
              onChange={(e) =>
                setForm((f) => ({ ...f, price: Number(e.target.value) }))
              }
              className="w-full rounded-xl border border-[#f9a8d4] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ec4899]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#47201d] mb-1">
              Description
            </label>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              className="w-full rounded-xl border border-[#f9a8d4] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ec4899]"
              placeholder="Short description of this handmade piece..."
            />
          </div>

          <label className="inline-flex items-center gap-2 text-xs text-[#47201d]">
            <input
              type="checkbox"
              checked={form.is_featured}
              onChange={(e) =>
                setForm((f) => ({ ...f, is_featured: e.target.checked }))
              }
              className="rounded border-[#f9a8d4] text-[#ec4899] focus:ring-[#ec4899]"
            />
            Mark as featured on homepage
          </label>
        </div>

        <div className="space-y-4">
          <ProductImageUploader
            label="Product image"
            initialUrl={form.image_url || null}
            onChange={(url) =>
              setForm((f) => ({
                ...f,
                image_url: url ?? "",
              }))
            }
          />
        </div>
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <div className="flex flex-wrap justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="inline-flex items-center rounded-full border border-[#f9a8d4] px-4 py-2 text-xs font-medium text-[#47201d] hover:bg-[#fff1f7]"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center rounded-full bg-[#ec4899] px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#db2777] disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </form>
  );
}
