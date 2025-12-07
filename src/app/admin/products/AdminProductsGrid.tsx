// src/app/admin/products/AdminProductsGrid.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { Product } from "@/lib/products";

type Props = {
  products: Product[];
};

export default function AdminProductsGrid({ products }: Props) {
  const [items, setItems] = useState(products);
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  async function handleDelete(id: string) {
    if (!confirm("Delete this product? This cannot be undone.")) return;

    setDeletingId(id);

    startTransition(async () => {
      try {
        const res = await fetch(`/api/admin/products/${id}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || res.statusText);
        }

        setItems((prev) => prev.filter((p) => p.id !== id));
        router.refresh();
      } catch (err: any) {
        console.error("Delete product error:", err);
        alert(`Error deleting product: ${err.message || "unknown error"}`);
      } finally {
        setDeletingId(null);
      }
    });
  }

  if (items.length === 0) {
    return (
      <p className="text-sm text-[#a36d63]">
        No products yet. Click &ldquo;Add new product&rdquo; to create your
        first one.
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => {
        const primaryImage =
          Array.isArray(p.images) && p.images.length > 0
            ? p.images[0]
            : null;

        const hasAnyBadge =
          p.is_featured ||
          p.is_new ||
          p.is_best_seller ||
          p.is_on_sale ||
          p.is_limited;

        const isLowStock =
          p.stock != null && p.stock > 0 && p.stock <= 5;

        const isDeleting = isPending && deletingId === p.id;

        return (
          <article
            key={p.id}
            className="flex flex-col rounded-2xl border border-[#fde7f1] bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            {/* IMAGE */}
            <div className="relative w-full aspect-square bg-[#fff1f7]">
              {primaryImage ? (
                <Image
                  src={primaryImage}
                  alt={p.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-[11px] text-[#e5a4bc]">
                  No image
                </div>
              )}

              {p.is_on_sale && (
                <span className="absolute left-2 top-2 rounded-full bg-[#be123c] px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm">
                  On sale
                </span>
              )}

              {isLowStock && (
                <span className="absolute right-2 top-2 rounded-full bg-[#f97316] px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm">
                  Low stock
                </span>
              )}

              {/* EDIT / DELETE */}
              <div className="absolute inset-x-2 bottom-2 flex justify-end gap-2">
                {/* Edit by ID */}
                <Link
                  href={`/admin/products/${p.id}/edit`}
                  className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium text-[#4b5563] shadow-sm hover:bg-white"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(p.id)}
                  disabled={isDeleting}
                  className="rounded-full bg-[#fee2e2]/90 px-3 py-1 text-[11px] font-medium text-[#b91c1c] shadow-sm hover:bg-[#fecaca] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isDeleting ? "Deleting…" : "Delete"}
                </button>
              </div>
            </div>

            {/* CONTENT */}
            <div className="flex flex-1 flex-col px-3 py-3 sm:px-4 sm:py-4 gap-2">
              {/* NAME + PRICE */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h2 className="text-sm sm:text-base font-semibold line-clamp-2">
                    {p.name}
                  </h2>
                  <p className="text-[11px] text-[#a36d63] line-clamp-1">
                    /products/{p.slug}
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-sm sm:text-base font-semibold text-[#e11d70]">
                    Rs {p.sale_price ?? p.price}
                  </div>
                  {p.sale_price && (
                    <div className="text-[11px] line-through text-[#a36d63]">
                      Rs {p.price}
                    </div>
                  )}
                </div>
              </div>

              {/* CATEGORY + STOCK */}
              <div className="flex items-center justify-between gap-2 text-[11px]">
                <span className="inline-flex items-center rounded-full bg-[#fff1f7] px-2 py-1 text-[#a36d63]">
                  {p.category || "Uncategorised"}
                </span>

                <span
                  className={
                    p.stock != null && p.stock <= 0
                      ? "text-red-600 font-medium"
                      : isLowStock
                      ? "text-[#ea580c] font-medium"
                      : "text-[#16a34a] font-medium"
                  }
                >
                  {p.stock == null
                    ? "Stock: n/a"
                    : p.stock <= 0
                    ? "Out of stock"
                    : `Stock: ${p.stock}`}
                </span>
              </div>

              {/* BADGES */}
              {hasAnyBadge && (
                <div className="mt-2 flex flex-wrap gap-1.5 text-[10px]">
                  {p.is_featured && (
                    <span className="inline-flex rounded-full bg-[#fef2f2] text-[#b91c1c] px-2 py-0.5 border border-[#fee2e2]">
                      Featured
                    </span>
                  )}
                  {p.is_new && (
                    <span className="inline-flex rounded-full bg-[#ecfdf3] text-[#166534] px-2 py-0.5 border border-[#bbf7d0]">
                      New arrival
                    </span>
                  )}
                  {p.is_best_seller && (
                    <span className="inline-flex rounded-full bg-[#eff6ff] text-[#1d4ed8] px-2 py-0.5 border border-[#dbeafe]">
                      Best seller
                    </span>
                  )}
                  {p.is_on_sale && (
                    <span className="inline-flex rounded-full bg-[#fef3c7] text-[#92400e] px-2 py-0.5 border border-[#fde68a]">
                      On sale
                    </span>
                  )}
                  {p.is_limited && (
                    <span className="inline-flex rounded-full bg-[#f5f3ff] text-[#6d28d9] px-2 py-0.5 border border-[#e9d5ff]">
                      Limited edition
                    </span>
                  )}
                </div>
              )}

              {/* VIEW LINK – public page by slug */}
              <div className="mt-3 flex justify-end">
                <Link
                  href={`/products/${p.slug}`}
                  className="text-[11px] sm:text-xs font-medium text-[#e11d70] underline underline-offset-4"
                >
                  View in shop →
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
