// src/components/shop/ProductCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";
import { AddToCartControls } from "@/components/cart/AddToCartControls";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const {
    id,
    slug,
    name,
    price,
    sale_price,
    category,
    stock,
    images,
    short_description,
    long_description,
    is_featured,
    is_new,
    is_limited,
    // is_on_sale, // optional – not needed for badge logic anymore
  } = product;

  const isSoldOut =
    stock !== null && stock !== undefined && stock <= 0;

  const hasSale =
    sale_price !== null &&
    sale_price !== undefined &&
    sale_price < price;

  const mainImage =
    images && images.length > 0 ? images[0] : undefined;

  const description =
    short_description ||
    long_description ||
    "Handmade piece by Atelier de Méa.";

  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#fde7f1] bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* soft pink glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-pink-100/80 blur-3xl opacity-60 animate-[atelier-pulse_7s_ease-in-out_infinite]"
      />

      <div className="relative flex h-full flex-col">
        {/* IMAGE AREA */}
        <Link
          href={`/products/${slug}`}
          className="relative block w-full aspect-square bg-[#fff1f7]"
        >
          {mainImage ? (
            <Image
              src={mainImage}
              alt={name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[10px] text-[#e5a4bc]">
              No image
            </div>
          )}

          {/* BADGES */}
          {is_featured && (
            <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-[#e11d70] shadow-sm">
              Featured
            </span>
          )}

          {hasSale && (
            <span className="absolute right-2 top-2 rounded-full bg-[#b91c1c] px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm">
              Sale
            </span>
          )}

          {isSoldOut && (
            <span className="absolute right-2 bottom-2 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-semibold text-white">
              Sold out
            </span>
          )}

          {is_new && (
            <span className="absolute left-2 bottom-2 rounded-full bg-[#f97316] px-2 py-0.5 text-[9px] font-semibold text-white shadow-sm">
              New
            </span>
          )}

          {is_limited && (
            <span className="absolute left-2 bottom-7 rounded-full bg-[#0f766e] px-2 py-0.5 text-[9px] font-semibold text-white shadow-sm">
              Limited
            </span>
          )}
        </Link>

        {/* TEXT + CONTROLS */}
        <div className="flex flex-1 flex-col px-3 pt-3 pb-3 sm:px-4 sm:pt-4 sm:pb-4">
          <Link href={`/products/${slug}`}>
            <h3 className="text-xs sm:text-sm font-semibold text-[#47201d] line-clamp-2">
              {name}
            </h3>
          </Link>

          {/* fixed height so bottoms align */}
          <p className="mt-1 min-h-[34px] sm:min-h-[40px] text-[11px] sm:text-xs text-[#a36d63] line-clamp-2">
            {description}
          </p>

          <div className="mt-3 flex items-center justify-between gap-2">
            <div className="flex flex-col">
              {hasSale ? (
                <>
                  <span className="text-sm sm:text-base font-semibold text-[#b91c1c]">
                    Rs {sale_price}
                  </span>
                  <span className="text-[11px] text-[#a36d63] line-through">
                    Rs {price}
                  </span>
                </>
              ) : (
                <span className="text-sm sm:text-base font-semibold text-[#e11d70]">
                  Rs {price}
                </span>
              )}
            </div>
            {category && (
              <span className="rounded-full bg-[#fff1f7] px-2 py-1 text-[10px] text-[#a36d63]">
                {category}
              </span>
            )}
          </div>

          {/* pushes controls to bottom so all cards align */}
          <div className="mt-auto">
            <AddToCartControls
              productId={id}
              slug={slug}
              name={name}
              price={hasSale ? sale_price ?? price : price}
              imageUrl={mainImage}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

