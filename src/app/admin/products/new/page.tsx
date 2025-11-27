"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AdminNewProductPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState<string>("");
  const [imageUrl, setImageUrl] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");

  const [isFeatured, setIsFeatured] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [isOnSale, setIsOnSale] = useState(false);
  const [saleBadgeLabel, setSaleBadgeLabel] = useState("");

  function autoSlugFromName(value: string) {
    setName(value);
    if (!slug) {
      const generated = value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setSlug(generated);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !slug || !price) {
      alert("Name, slug and price are required.");
      return;
    }

    setSaving(true);

    const { error } = await supabase.from("products").insert({
      name,
      slug,
      price: Number(price),
      category: category || null,
      stock: stock ? Number(stock) : null,
      image_url: imageUrl || null,
      short_description: shortDescription || null,
      long_description: longDescription || null,
      is_featured: isFeatured,
      is_new: isNew,
      is_best_seller: isBestSeller,
      is_on_sale: isOnSale,
      sale_badge_label: isOnSale
        ? saleBadgeLabel || "Sale"
        : null,
    });

    setSaving(false);

    if (error) {
      alert("Error saving product: " + error.message);
      return;
    }

    router.push("/admin/products");
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-semibold text-[#3B2A24]">
            New Product
          </h1>
          <p className="text-xs text-[#7A6058]">
            Create a new Atelier de Méa product and set its badges.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white border border-[#F3E3EC] rounded-xl p-4 md:p-6"
      >
        {/* Basic info */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-[#3B2A24]">
              Name *
            </label>
            <input
              value={name}
              onChange={(e) => autoSlugFromName(e.target.value)}
              className="w-full rounded-lg border border-[#F3E3EC] px-3 py-2 text-sm outline-none focus:border-[#C74382]"
              placeholder="Ex: Turban 'Everyday Queen' – Rose"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-[#3B2A24]">
              Slug * (URL)
            </label>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full rounded-lg border border-[#F3E3EC] px-3 py-2 text-sm outline-none focus:border-[#C74382]"
              placeholder="ex: turban-everyday-queen-rose"
              required
            />
            <p className="text-[11px] text-[#7A6058]">
              Appears as /products/{slug || "your-slug"}.
            </p>
          </div>
        </div>

        {/* Price / category / stock */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-[#3B2A24]">
              Price (Rs) *
            </label>
            <input
              type="number"
              step="1"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-lg border border-[#F3E3EC] px-3 py-2 text-sm outline-none focus:border-[#C74382]"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-[#3B2A24]">
              Category
            </label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-[#F3E3EC] px-3 py-2 text-sm outline-none focus:border-[#C74382]"
              placeholder="Ex: Turbans, Bandeaux, Bags…"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-[#3B2A24]">
              Stock (optional)
            </label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full rounded-lg border border-[#F3E3EC] px-3 py-2 text-sm outline-none focus:border-[#C74382]"
              placeholder="Ex: 10"
            />
          </div>
        </div>

        {/* Image URL */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-[#3B2A24]">
            Image URL
          </label>
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full rounded-lg border border-[#F3E3EC] px-3 py-2 text-sm outline-none focus:border-[#C74382]"
            placeholder="https://…"
          />
        </div>

        {/* Descriptions */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-[#3B2A24]">
            Short description
          </label>
          <textarea
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            className="w-full rounded-lg border border-[#F3E3EC] px-3 py-2 text-sm outline-none focus:border-[#C74382] min-h-[60px]"
            placeholder="Appears on product cards and overview."
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-[#3B2A24]">
            Long description
          </label>
          <textarea
            value={longDescription}
            onChange={(e) => setLongDescription(e.target.value)}
            className="w-full rounded-lg border border-[#F3E3EC] px-3 py-2 text-sm outline-none focus:border-[#C74382] min-h-[100px]"
            placeholder="More detailed story / info shown on the product page."
          />
        </div>

        {/* Badges */}
        <div className="border border-[#F3E3EC] rounded-xl p-3 md:p-4 bg-[#FFF7FC] space-y-3">
          <h2 className="text-sm font-semibold text-[#3B2A24]">
            Badges & highlights
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            <label className="inline-flex items-center gap-2 text-xs text-[#3B2A24]">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="rounded border-[#F3E3EC]"
              />
              Featured collection
            </label>
            <label className="inline-flex items-center gap-2 text-xs text-[#3B2A24]">
              <input
                type="checkbox"
                checked={isNew}
                onChange={(e) => setIsNew(e.target.checked)}
                className="rounded border-[#F3E3EC]"
              />
              New arrival
            </label>
            <label className="inline-flex items-center gap-2 text-xs text-[#3B2A24]">
              <input
                type="checkbox"
                checked={isBestSeller}
                onChange={(e) => setIsBestSeller(e.target.checked)}
                className="rounded border-[#F3E3EC]"
              />
              Best seller
            </label>
            <div className="space-y-1">
              <label className="inline-flex items-center gap-2 text-xs text-[#3B2A24]">
                <input
                  type="checkbox"
                  checked={isOnSale}
                  onChange={(e) => setIsOnSale(e.target.checked)}
                  className="rounded border-[#F3E3EC]"
                />
                On sale
              </label>
              {isOnSale && (
                <input
                  value={saleBadgeLabel}
                  onChange={(e) => setSaleBadgeLabel(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#F3E3EC] px-3 py-1.5 text-xs outline-none focus:border-[#C74382]"
                  placeholder='Badge label (ex: "-20%", "Promo")'
                />
              )}
            </div>
          </div>
          <p className="text-[11px] text-[#7A6058]">
            These badges control what appears on the homepage sections and on
            the product cards (sale chip, new chip, best seller, etc.).
          </p>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => router.push("/admin/products")}
            className="px-4 py-2 rounded-full border border-[#F3E3EC] text-xs text-[#7A6058] hover:bg-[#FFF5FA]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 rounded-full bg-[#C74382] hover:bg-[#d75b96] text-xs font-medium text-white shadow-sm shadow-[#C74382]/30 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save product"}
          </button>
        </div>
      </form>
    </div>
  );
}
