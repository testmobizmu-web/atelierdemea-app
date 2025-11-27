"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";
import { AddToCartControls } from "@/components/cart/AddToCartControls";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const description =
    product.short_description ||
    product.long_description ||
    "Handmade piece by Atelier de Méa.";

  const isSoldOut =
    product.stock !== null && product.stock !== undefined && product.stock <= 0;

  return (
    <article className="flex flex-col bg-white rounded-3xl border border-[#fde7f1] shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <Link href={`/products/${product.slug}`} className="relative block w-full aspect-[4/5] bg-[#fff1f7]">
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

        {product.is_featured && (
          <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-[#e11d70] shadow-sm">
            Featured
          </span>
        )}

        {isSoldOut && (
          <span className="absolute right-2 top-2 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-semibold text-white">
            Sold out
          </span>
        )}
      </Link>

      <div className="flex flex-col flex-1 px-3 pt-3 pb-3 sm:px-4 sm:pt-4 sm:pb-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-xs sm:text-sm font-semibold text-[#47201d] line-clamp-2">
            {product.name}
          </h3>
        </Link>

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

        <div className="mt-3">
          <AddToCartControls
            productId={product.id}       // ✅ id from Product
            slug={product.slug}
            name={product.name}
            price={product.price}
            imageUrl={product.image_url} // ✅ camelCase for CartItem.imageUrl
          />
        </div>
      </div>
    </article>
  );
}
