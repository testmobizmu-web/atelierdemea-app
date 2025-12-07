// src/app/policies/shipping/page.tsx
export default function ShippingPolicyPage() {
  return (
    <>
      <p className="text-[11px] uppercase tracking-[0.2em] text-[#e11d70] mb-2">
        Policies
      </p>
      <h1 className="text-2xl sm:text-3xl font-semibold mb-4">
        Delivery & Shipping
      </h1>
      <p className="text-sm sm:text-base text-[#a36d63] mb-6">
        Information about delivery areas, delays and costs in Mauritius.
      </p>

      <div className="space-y-4 text-sm sm:text-base leading-relaxed">
        <p>
          Atelier de Méa currently delivers across Mauritius. Once your payment
          and order are confirmed, parcels are usually prepared within{" "}
          <strong>24–48 hours</strong> (working days).
        </p>
        <p>
          Delivery is done either by our own courier or a trusted delivery
          partner. Typical delivery time is <strong>1–3 working days</strong>{" "}
          after dispatch, depending on your location.
        </p>
        <p>
          Delivery fees and any free-delivery thresholds will be clearly
          indicated at checkout or communicated during your WhatsApp order.
        </p>
        <p className="text-xs text-[#a36d63]">
          Please make sure your delivery details and phone number are correct so
          the driver can contact you if needed.
        </p>
      </div>
    </>
  );
}
