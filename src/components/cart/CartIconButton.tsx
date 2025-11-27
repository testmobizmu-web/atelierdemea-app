"use client";

import { useCart } from "./CartContext";

export function CartIconButton() {
  const { openCart, totalQuantity } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label="Cart"
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#fde7f1] hover:bg-[#fff1f7] transition"
    >
      <span className="text-lg">🛒</span>
      {totalQuantity > 0 && (
        <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#e11d70] text-[10px] font-semibold text-white">
          {totalQuantity}
        </span>
      )}
    </button>
  );
}
