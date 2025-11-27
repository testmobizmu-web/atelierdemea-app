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
      <div className="inline-flex items-center rounded-full border border-pink-200 bg-white">
        <button
          type="button"
          className="px-2 text-sm"
          onClick={dec}
        >
          -
        </button>
        <span className="px-2 text-xs">{qty}</span>
        <button
          type="button"
          className="px-2 text-sm"
          onClick={inc}
        >
          +
        </button>
      </div>
      <button
        type="button"
        onClick={handleAdd}
        className="flex-1 inline-flex items-center justify-center rounded-full bg-[#ec4899] text-white px-3 text-[11px] sm:text-xs hover:bg-[#db2777] transition-colors"
      >
        Add to cart
      </button>
    </div>
  );
}
