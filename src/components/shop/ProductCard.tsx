"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import type { Product } from "@/lib/products";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        slug: product.slug,
        image_url: product.image_url,
      },
      qty
    );
  };

  const increment = () => setQty((q) => Math.min(q + 1, 99));
  const decrement = () => setQty((q) => Math.max(1, q - 1));

  const description =
    product.short_description ||
    product.long_description ||
    "Handmade piece by Atelier de Méa.";

  const isSoldOut =
    product.stock !== null && product.stock !== undefined && product.stock <= 0;

  // Simple badges: featured / new (last 14 days)
  const createdAt = new Date(product.created_at);
  const isNew =
    Date.now() - createdAt.getTime() < 14 * 24 * 60 * 60 * 1000;

  return (
    <article className="flex flex-col bg-white rounded-3xl border border-[#fde7f1] shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="relative w-full aspect-[4/5] bg-[#fff1f7]">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[10px] text-[#e5a4bc]">
            No image
          </div>
        )}

        {/* Badges */}
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {product.is_featured && (
            <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-[#e11d70] shadow-sm">
              Featured
            </span>
          )}
          {isNew && (
            <span className="rounded-full bg-[#ec4899] px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm">
              New
            </span>
          )}
        </div>

        {isSoldOut && (
          <span className="absolute right-2 top-2 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-semibold text-white">
            Sold out
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 px-3 pt-3 pb-3 sm:px-4 sm:pt-4 sm:pb-4">
        <h2 className="text-xs sm:text-sm font-semibold text-[#47201d] line-clamp-2">
          {product.name}
        </h2>

        <p className="mt-1 text-[11px] sm:text-xs text-[#a36d63] line-clamp-2">
          {description}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <div className="text-sm sm:text-base font-semibold text-[#e11d70]">
            Rs {product.price}
          </div>
          {product.category && (
            <span className="text-[10px] px-2 py-1 rounded-full bg-[#fff1f7] text-[#a36d63]">
              {product.category}
            </span>
          )}
        </div>

        {/* Quantity + actions */}
        <div className="mt-3 flex items-center gap-2">
          <div className="inline-flex items-center rounded-full border border-[#f9a8d4]">
            <button
              type="button"
              onClick={decrement}
              className="px-2 text-[11px] text-[#47201d]"
            >
              −
            </button>
            <span className="px-2 text-[11px]">{qty}</span>
            <button
              type="button"
              onClick={increment}
              className="px-2 text-[11px] text-[#47201d]"
            >
              +
            </button>
          </div>

          <button
            type="button"
            disabled={isSoldOut}
            onClick={handleAddToCart}
            className={`flex-1 inline-flex items-center justify-center rounded-full px-3 text-[11px] sm:text-xs font-semibold shadow-sm transition-colors ${
              isSoldOut
                ? "bg-[#fecdd3] text-white cursor-not-allowed"
                : "bg-[#ec4899] text-white hover:bg-[#db2777]"
            }`}
          >
            Add to cart
          </button>
        </div>

        <div className="mt-2 flex justify-between items-center">
          <Link
            href={`/products/${product.slug}`}
            className="text-[11px] text-[#a36d63] hover:text-[#e11d70]"
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}
