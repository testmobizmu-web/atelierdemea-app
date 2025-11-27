"use client";

import { useState, useTransition } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  category?: string | null;
  created_at?: string | null;
  is_featured?: boolean | null;
  is_new?: boolean | null;
  is_best_seller?: boolean | null;
  is_on_sale?: boolean | null;
  sale_badge_label?: string | null;
};

export default function ProductBadgesTable({ products }: { products: Product[] }) {
  const [rows, setRows] = useState<Product[]>(products);
  const [isPending, startTransition] = useTransition();
  const [savingId, setSavingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function updateBadges(
    productId: string,
    patch: Partial<Product>
  ) {
    setSavingId(productId);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/products/update-badges", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          ...patch,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Failed to save");
      }

      // Update local state optimistically
      startTransition(() => {
        setRows((prev) =>
          prev.map((p) =>
            p.id === productId ? { ...p, ...patch } : p
          )
        );
      });
      setMessage("Saved ✅");
    } catch (err: any) {
      console.error("updateBadges error", err);
      setMessage(`Error: ${err.message || "Failed to save"}`);
    } finally {
      setSavingId(null);
      setTimeout(() => setMessage(null), 3000);
    }
  }

  function handleToggle(productId: string, key: keyof Product, current: boolean | null | undefined) {
    updateBadges(productId, { [key]: !current } as Partial<Product>);
  }

  function handleSaleLabelChange(productId: string, value: string) {
    // Update local field immediately
    setRows((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, sale_badge_label: value } : p
      )
    );
  }

  function handleSaleLabelBlur(productId: string, value: string) {
    updateBadges(productId, { sale_badge_label: value });
  }

  return (
    <div className="border border-[#fde7f1] rounded-2xl overflow-hidden bg-[#fff7fb]">
      <div className="flex items-center justify-between px-4 py-3 sm:px-5 sm:py-4 border-b border-[#fde7f1]">
        <div className="text-xs sm:text-sm text-[#a36d63]">
          Toggle badges to control homepage sections and product labels.
        </div>
        <div className="text-[11px] sm:text-xs text-[#a36d63]">
          {isPending || savingId ? "Saving…" : message || "Ready"}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-[11px] sm:text-xs text-[#47201d]">
          <thead className="bg-white/70 border-b border-[#fde7f1]">
            <tr>
              <th className="text-left px-3 sm:px-4 py-2">Product</th>
              <th className="text-left px-3 sm:px-4 py-2">Category</th>
              <th className="text-left px-3 sm:px-4 py-2">Price (Rs)</th>
              <th className="text-center px-3 sm:px-4 py-2">Featured</th>
              <th className="text-center px-3 sm:px-4 py-2">New</th>
              <th className="text-center px-3 sm:px-4 py-2">Best Seller</th>
              <th className="text-center px-3 sm:px-4 py-2">On Sale</th>
              <th className="text-left px-3 sm:px-4 py-2">Sale badge label</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {rows.map((p) => {
              const featured = Boolean(p.is_featured);
              const isNew = Boolean(p.is_new);
              const best = Boolean(p.is_best_seller);
              const onSale = Boolean(p.is_on_sale);

              return (
                <tr
                  key={p.id}
                  className="border-b last:border-b-0 border-[#fde7f1] hover:bg-[#fff7fb]"
                >
                  <td className="px-3 sm:px-4 py-2 align-top">
                    <div className="font-semibold text-[11px] sm:text-xs">
                      {p.name}
                    </div>
                    <div className="text-[10px] text-[#a36d63]">
                      {p.created_at
                        ? new Date(p.created_at).toLocaleDateString()
                        : "—"}
                    </div>
                  </td>
                  <td className="px-3 sm:px-4 py-2 align-top text-[#a36d63]">
                    {p.category || "—"}
                  </td>
                  <td className="px-3 sm:px-4 py-2 align-top">
                    {p.price?.toFixed ? p.price.toFixed(0) : p.price}
                  </td>

                  {/* Featured */}
                  <td className="px-3 sm:px-4 py-2 text-center align-top">
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={() =>
                        handleToggle(p.id, "is_featured", p.is_featured)
                      }
                      className="h-3.5 w-3.5 accent-[#ec4899]"
                    />
                  </td>

                  {/* New */}
                  <td className="px-3 sm:px-4 py-2 text-center align-top">
                    <input
                      type="checkbox"
                      checked={isNew}
                      onChange={() =>
                        handleToggle(p.id, "is_new", p.is_new)
                      }
                      className="h-3.5 w-3.5 accent-[#ec4899]"
                    />
                  </td>

                  {/* Best seller */}
                  <td className="px-3 sm:px-4 py-2 text-center align-top">
                    <input
                      type="checkbox"
                      checked={best}
                      onChange={() =>
                        handleToggle(p.id, "is_best_seller", p.is_best_seller)
                      }
                      className="h-3.5 w-3.5 accent-[#ec4899]"
                    />
                  </td>

                  {/* On sale */}
                  <td className="px-3 sm:px-4 py-2 text-center align-top">
                    <input
                      type="checkbox"
                      checked={onSale}
                      onChange={() =>
                        handleToggle(p.id, "is_on_sale", p.is_on_sale)
                      }
                      className="h-3.5 w-3.5 accent-[#ec4899]"
                    />
                  </td>

                  {/* Sale badge label */}
                  <td className="px-3 sm:px-4 py-2 align-top">
                    <input
                      type="text"
                      defaultValue={p.sale_badge_label || ""}
                      onChange={(e) =>
                        handleSaleLabelChange(p.id, e.target.value)
                      }
                      onBlur={(e) =>
                        handleSaleLabelBlur(p.id, e.target.value.trim())
                      }
                      placeholder="e.g. -20% • Eid Offer"
                      className="w-full rounded-full border border-[#f9a8d4] px-3 py-1.5 outline-none focus:ring-2 focus:ring-[#f9a8d4] text-[11px]"
                    />
                  </td>
                </tr>
              );
            })}

            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-3 sm:px-4 py-4 text-center text-[#a36d63]"
                >
                  No products found. Add products in Supabase first.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
