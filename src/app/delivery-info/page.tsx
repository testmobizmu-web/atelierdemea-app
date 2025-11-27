export const metadata = {
  title: "Delivery & Shipping | Atelier de Méa",
};

export default function DeliveryInfoPage() {
  return (
    <main className="min-h-screen bg-white text-[#47201d]">
      <section className="max-w-3xl mx-auto px-4 py-10 sm:py-12">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-3">
          Delivery &amp; Shipping
        </h1>
        <p className="text-sm text-[#a36d63] mb-6">
          Atelier de Méa offers delivery across Mauritius. Below you’ll find our
          standard delivery information.
        </p>

        <h2 className="text-lg font-semibold mb-2">1. Delivery zones</h2>
        <p className="text-sm mb-4">
          We currently deliver across <strong>Mauritius</strong>. For Rodrigues
          or international deliveries, please contact us first for a custom
          quote.
        </p>

        <h2 className="text-lg font-semibold mb-2">2. Delivery fees</h2>
        <p className="text-sm mb-4">
          Delivery fees may vary depending on your location and the number of
          items ordered. We will confirm the exact delivery fee when you place
          your order via WhatsApp.
        </p>

        <h2 className="text-lg font-semibold mb-2">3. Delivery time</h2>
        <ul className="list-disc pl-5 text-sm space-y-1 mb-4">
          <li>Orders are usually prepared within 24–48 hours.</li>
          <li>
            Standard delivery delay: approximately 2–5 working days, depending
            on area and courier availability.
          </li>
          <li>
            For urgent orders or gifts, please mention it when ordering and we
            will do our best to help.
          </li>
        </ul>

        <h2 className="text-lg font-semibold mb-2">4. Payment methods</h2>
        <ul className="list-disc pl-5 text-sm space-y-1 mb-4">
          <li>Cash on Delivery (COD).</li>
          <li>Juice by MCB or Scan-to-Pay (where available).</li>
        </ul>

        <h2 className="text-lg font-semibold mb-2">
          5. Delivery issues &amp; address
        </h2>
        <p className="text-sm mb-4">
          Please provide a complete and correct delivery address and a reachable
          phone number. If delivery fails due to an incorrect address or
          repeated absence, additional delivery charges may apply.
        </p>

        <p className="text-xs text-[#a36d63] mt-6">
          If you have any questions about delivery or need a special
          arrangement, contact us on WhatsApp (+230&nbsp;5911&nbsp;7549).
        </p>
      </section>
    </main>
  );
}
