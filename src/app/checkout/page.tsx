// src/app/checkout/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart/CartContext";
import {
  createOrderInSupabase,
  buildWhatsAppOrderMessage,
  CartItem as OrderCartItem,
} from "@/lib/orders";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalAmount, clearCart } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "JUICE">("COD");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasItems = items && items.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasItems) {
      setError("Your cart is empty.");
      return;
    }

    if (!customerName || !customerPhone || !customerAddress) {
      setError("Please fill in your name, phone and address.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // Map cart items (CartContext) -> order items (orders.ts)
      const orderItems: OrderCartItem[] = items.map((item) => ({
        product_id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));

      // 1) Save to Supabase
      await createOrderInSupabase({
        customer_name: customerName,
        customer_phone: customerPhone,
        customer_address: customerAddress,
        notes,
        payment_method: paymentMethod,
        items: orderItems,
      });

      // 2) Build WhatsApp message
      const message = buildWhatsAppOrderMessage({
        items: orderItems,
        customer_name: customerName,
        customer_phone: customerPhone,
        customer_address: customerAddress,
        notes,
      });

      // 3) Open WhatsApp chat with message
      const whatsappNumber = "23059117549"; // Atelier de Méa WhatsApp
      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        message
      )}`;
      window.open(url, "_blank");

      // 4) Clear cart and redirect
      clearCart();
      router.push("/");

    } catch (err: any) {
      console.error("Checkout error:", err);
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!hasItems) {
    return (
      <div className="min-h-screen bg-[#fff7fb] px-4 py-10 flex items-center justify-center">
        <div className="max-w-md w-full text-center rounded-3xl border border-[#fde7f1] bg-white shadow-sm p-6">
          <h1 className="text-lg sm:text-xl font-semibold text-[#47201d] mb-2">
            Your cart is empty
          </h1>
          <p className="text-xs sm:text-sm text-[#a36d63] mb-4">
            Add some beautiful pieces to your cart before checking out.
          </p>
          <a
            href="/shop"
            className="inline-flex items-center justify-center rounded-full bg-[#ec4899] px-5 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#db2777] transition"
          >
            Browse the shop
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff7fb] px-4 py-10">
      <div className="max-w-4xl mx-auto grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        {/* LEFT: Checkout form */}
        <section className="rounded-3xl border border-[#fde7f1] bg-white shadow-sm p-5 sm:p-7">
          <h1 className="text-lg sm:text-xl font-semibold text-[#47201d] mb-1">
            Checkout
          </h1>
          <p className="text-xs sm:text-sm text-[#a36d63] mb-4">
            Please confirm your details. We&apos;ll process your order and contact you on WhatsApp.
          </p>

          {error && (
            <div className="mb-3 rounded-2xl bg-red-50 border border-red-200 px-3 py-2 text-[11px] text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Customer info */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium text-[#47201d]">
                  Full name *
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                  className="rounded-full border border-[#f9a8d4] px-3 py-2 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#f9a8d4]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium text-[#47201d]">
                  WhatsApp number *
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  required
                  className="rounded-full border border-[#f9a8d4] px-3 py-2 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#f9a8d4]"
                  placeholder="+230..."
                />
              </div>
            </div>

            {/* Address */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-[#47201d]">
                Delivery address *
              </label>
              <textarea
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                required
                rows={3}
                className="rounded-2xl border border-[#f9a8d4] px-3 py-2 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#f9a8d4] resize-vertical"
                placeholder="House number, street, locality…"
              />
            </div>

            {/* Payment method */}
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-medium text-[#47201d]">
                Payment method
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("COD")}
                  className={`rounded-full border px-3 py-1.5 text-[11px] sm:text-xs ${
                    paymentMethod === "COD"
                      ? "border-[#ec4899] bg-[#fff1f7] text-[#47201d]"
                      : "border-[#f9a8d4] bg-white text-[#a36d63]"
                  }`}
                >
                  Cash on Delivery
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("JUICE")}
                  className={`rounded-full border px-3 py-1.5 text-[11px] sm:text-xs ${
                    paymentMethod === "JUICE"
                      ? "border-[#ec4899] bg-[#fff1f7] text-[#47201d]"
                      : "border-[#f9a8d4] bg-white text-[#a36d63]"
                  }`}
                >
                  Juice / Scan-to-Pay
                </button>
              </div>
            </div>

            {/* Notes */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-[#47201d]">
                Notes (optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="rounded-2xl border border-[#f9a8d4] px-3 py-2 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#f9a8d4] resize-vertical"
                placeholder="Sizing preferences, delivery instructions…"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-[#ec4899] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#db2777] transition disabled:opacity-60"
            >
              {submitting ? "Placing your order…" : "Place order via WhatsApp"}
            </button>
          </form>
        </section>

        {/* RIGHT: Order summary */}
        <aside className="rounded-3xl border border-[#fde7f1] bg-white shadow-sm p-5 sm:p-6 h-fit">
          <h2 className="text-sm sm:text-base font-semibold text-[#47201d] mb-3">
            Order summary
          </h2>

          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-2 text-[11px] sm:text-xs text-[#47201d]"
              >
                <div className="flex-1">
                  <div className="font-medium line-clamp-2">{item.name}</div>
                  <div className="text-[#a36d63]">
                    Qty: {item.quantity} × Rs {item.price}
                  </div>
                </div>
                <div className="font-semibold text-[#e11d70] whitespace-nowrap">
                  Rs {item.quantity * item.price}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t border-[#fde7f1] pt-3 flex items-center justify-between text-xs sm:text-sm">
            <span className="font-medium text-[#47201d]">Total</span>
            <span className="font-semibold text-[#e11d70]">
              Rs {totalAmount}
            </span>
          </div>

          <p className="mt-3 text-[10px] sm:text-[11px] text-[#a36d63]">
            You will receive a WhatsApp message from Atelier de Méa to confirm
            your order, payment and delivery details.
          </p>
        </aside>
      </div>
    </div>
  );
}
