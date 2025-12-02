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
    <div className="mt-3 flex items-center justify-between">
      {/* LEFT: icon-only add-to-cart */}
      <button
        type="button"
        onClick={handleAdd}
        aria-label="Add to cart"
        className="p-1.5 sm:p-2 text-black/80 hover:text-black transition-colors
                   hover:scale-[1.03] active:scale-[0.97]"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M3 3h2l2.4 12.3a1 1 0 0 0 1 .8h11.2a1 1 0 0 0 1-.8L22 7H7" />
        </svg>
      </button>

      {/* RIGHT: quantity pill, keeping your soft atelier style */}
      <div className="inline-flex items-center rounded-full border border-pink-100 bg-white px-2 text-xs sm:text-[13px] text-[#47201d]">
        <button
          type="button"
          onClick={dec}
          className="px-1.5 text-xs text-[#a36d63]"
        >
          –
        </button>
        <span className="px-2 font-medium">{qty}</span>
        <button
          type="button"
          onClick={inc}
          className="px-1.5 text-xs text-[#a36d63]"
        >
          +
        </button>
      </div>
    </div>
  );
}
