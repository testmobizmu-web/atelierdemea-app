"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "./CartContext";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    clearCart,
    updateQuantity,
    removeItem,
  } = useCart();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  async function handleOrderOnWhatsApp() {
    if (!items.length || submitting) return;

    try {
      setSubmitting(true);
      setError(null);

      const payload = {
        // later we’ll extend with address / name / phone
        items: items.map((item) => ({
          product_id: item.id,        // ✅ use id from CartItem
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          slug: item.slug,
        })),
        payment_method: "COD",
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not create order");
      }

      const data = await res.json();
      if (data.whatsappUrl) {
        // Open WhatsApp chat in new tab
        window.open(data.whatsappUrl, "_blank");
      }

      // Optional: clear cart & close drawer
      clearCart();
      closeCart();
    } catch (err: any) {
      console.error("Order error:", err);
      setError(err.message ?? "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-sm bg-white shadow-2xl border-l border-[#fde7f1] flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="px-4 py-4 border-b border-[#fde7f1] flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-[#47201d]">
              Your bag
            </h2>
            <p className="text-[11px] text-[#a36d63]">
              Review your Atelier de Méa pieces.
            </p>
          </div>
          <button
            onClick={closeCart}
            className="h-8 w-8 rounded-full border border-[#fde7f1] flex items-center justify-center text-sm hover:bg-[#fff1f7]"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {items.length === 0 ? (
            <p className="text-xs text-[#a36d63]">
              Your bag is empty. Start by adding a turban, outfit or bag.
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item.id} {/* ✅ use id as key */}
                className="flex gap-3 rounded-2xl border border-[#fde7f1] bg-[#fff7fb] p-3"
              >
                <div className="relative h-16 w-16 rounded-2xl overflow-hidden bg-[#fff1f7] border border-[#fde7f1] shrink-0">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] text-[#e5a4bc]">
                      No image
                    </div>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-semibold text-[#47201d] line-clamp-2">
                      {item.name}
                    </div>
                    <div className="text-[11px] text-[#a36d63] mt-0.5">
                      Rs {item.price}
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    {/* quantity controls */}
                    <div className="inline-flex items-center rounded-full border border-[#f9a8d4] bg-white text-[11px]">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.id,                        // ✅ id
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        className="px-2 py-1 rounded-l-full hover:bg-[#fff1f7]"
                      >
                        −
                      </button>
                      <span className="px-2 py-1 min-w-[32px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1) // ✅ id
                        }
                        className="px-2 py-1 rounded-r-full hover:bg-[#fff1f7]"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.id)} // ✅ id
                      className="text-[11px] text-[#b91c1c] hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / summary */}
        <div className="border-t border-[#fde7f1] px-4 py-4 space-y-3 bg-white">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#7a6058]">Subtotal</span>
            <span className="text-sm font-semibold text-[#47201d]">
              Rs {subtotal}
            </span>
          </div>
          <p className="text-[11px] text-[#a36d63]">
            Cash on Delivery in Mauritius. Final total (incl. delivery) will be
            confirmed on WhatsApp.
          </p>

          {error && (
            <p className="text-[11px] text-[#b91c1c] bg-[#fee2e2] rounded-full px-3 py-1">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={handleOrderOnWhatsApp}
            disabled={!items.length || submitting}
            className="w-full inline-flex items-center justify-center rounded-full bg-[#ec4899] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#db2777] transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Preparing WhatsApp…" : "Order now on WhatsApp"}
          </button>
        </div>
      </aside>
    </>
  );
}

