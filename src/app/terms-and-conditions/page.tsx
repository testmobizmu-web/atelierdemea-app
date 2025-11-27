export const metadata = {
  title: "Terms & Conditions | Atelier de Méa",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-white text-[#47201d]">
      <section className="max-w-3xl mx-auto px-4 py-10 sm:py-12">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-3">
          Terms &amp; Conditions
        </h1>
        <p className="text-sm text-[#a36d63] mb-6">
          By placing an order with Atelier de Méa, you agree to the following
          terms and conditions.
        </p>

        <h2 className="text-lg font-semibold mb-2">1. Handmade nature</h2>
        <p className="text-sm mb-4">
          All our products are handmade. Small variations in colour, stitching
          or pattern may occur and are part of the charm of artisanal
          production. These are not considered defects.
        </p>

        <h2 className="text-lg font-semibold mb-2">2. Orders</h2>
        <ul className="list-disc pl-5 text-sm space-y-1 mb-4">
          <li>
            Orders are confirmed once details are agreed via WhatsApp, social
            media or email.
          </li>
          <li>
            Some items may be made to order; preparation time will be indicated
            when you order.
          </li>
          <li>
            Atelier de Méa reserves the right to decline an order (for example,
            in case of stock issues or abusive behaviour).
          </li>
        </ul>

        <h2 className="text-lg font-semibold mb-2">3. Prices &amp; payment</h2>
        <p className="text-sm mb-4">
          All prices are in <strong>Mauritian Rupees (Rs)</strong>. Payment is
          generally due on delivery or via Juice/Scan-to-Pay as agreed at the
          time of order.
        </p>

        <h2 className="text-lg font-semibold mb-2">4. Returns</h2>
        <p className="text-sm mb-4">
          Returns are handled according to our{" "}
          <a
            href="/return-policy"
            className="text-[#e11d70] underline underline-offset-2"
          >
            Return Policy
          </a>
          . Please review it before placing your order.
        </p>

        <h2 className="text-lg font-semibold mb-2">
          5. Intellectual property
        </h2>
        <p className="text-sm mb-4">
          All photos, texts, designs and creations presented by Atelier de Méa
          remain our intellectual property. They may not be copied or reused
          without written permission.
        </p>

        <h2 className="text-lg font-semibold mb-2">
          6. Changes to these terms
        </h2>
        <p className="text-sm mb-4">
          We may update these terms and conditions from time to time. The
          version displayed on this website at the moment of your order will
          apply.
        </p>

        <p className="text-xs text-[#a36d63] mt-6">
          If you have any questions about these terms, please contact us before
          placing an order.
        </p>
      </section>
    </main>
  );
}
