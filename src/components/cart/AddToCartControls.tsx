"use client";

import { useState } from "react";
import { useCart } from "./CartContext";

type Props = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  imageUrl?: string | null;
};

export function AddToCartControls({
  productId,
  slug,
  name,
  price,
  imageUrl,
}: Props) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  const dec = () => setQty((q) => (q > 1 ? q - 1 : 1));
  const inc = () => setQty((q) => q + 1);

  const handleAdd = () => {
    addItem(
      {
        id: productId,
        slug,
        name,
        price,
        imageUrl,
      },
      qty
    );
  };

  return (
    <div className="flex items-center gap-2">
      {/* Quantity pill */}
      <div className="inline-flex items-center rounded-full border border-pink-200 bg-white px-1">
        <button
          type="button"
          className="px-2 text-xs sm:text-sm text-[#a36d63]"
          onClick={dec}
        >
          –
        </button>
        <span className="px-2 text-[11px] sm:text-xs font-medium text-[#47201d]">
          {qty}
        </span>
        <button
          type="button"
          className="px-2 text-xs sm:text-sm text-[#a36d63]"
          onClick={inc}
        >
          +
        </button>
      </div>

      {/* Add-to-cart icon button */}
      <button
        type="button"
        onClick={handleAdd}
        aria-label="Add to cart"
        className="flex-1 inline-flex items-center justify-center rounded-full bg-[#ec4899] px-3 py-2 shadow-sm shadow-pink-200
                   hover:bg-[#db2777] active:scale-[0.97] transition-all"
      >
        <svg
          aria-hidden="true"
          className="h-4 w-4 sm:h-5 sm:w-5 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M3 3h2l2.4 12.3a1 1 0 0 0 1 .8h11.2a1 1 0 0 0 1-.8L22 7H7" />
        </svg>
      </button>
    </div>
  );
}
