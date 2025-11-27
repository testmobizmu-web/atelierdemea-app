export const metadata = {
  title: "Return Policy | Atelier de Méa",
};

export default function ReturnPolicyPage() {
  return (
    <main className="min-h-screen bg-white text-[#47201d]">
      <section className="max-w-3xl mx-auto px-4 py-10 sm:py-12">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-3">
          Return &amp; Exchange Policy
        </h1>
        <p className="text-sm text-[#a36d63] mb-6">
          We want you to love your Atelier de Méa pieces. Please read our return
          and exchange conditions carefully.
        </p>

        <h2 className="text-lg font-semibold mb-2">1. Eligibility</h2>
        <p className="text-sm mb-3">
          Because our items are handmade fashion accessories worn close to the
          body (turbans, headbands, clothing and bags), returns are accepted
          only in the following cases:
        </p>
        <ul className="list-disc pl-5 text-sm space-y-1 mb-4">
          <li>Wrong product received (different from the order).</li>
          <li>Item received damaged or with a major defect.</li>
          <li>
            Size or model error caused by us (wrong colour, size or variant).
          </li>
        </ul>

        <h2 className="text-lg font-semibold mb-2">
          2. Time limit for claims
        </h2>
        <p className="text-sm mb-4">
          You must contact us within <strong>48 hours</strong> after delivery
          with clear photos of the issue, your order reference and WhatsApp
          number.
        </p>

        <h2 className="text-lg font-semibold mb-2">3. Non-returnable items</h2>
        <ul className="list-disc pl-5 text-sm space-y-1 mb-4">
          <li>Items used, washed or damaged after delivery.</li>
          <li>Custom or personalised orders (special colours, sizes, etc.).</li>
          <li>Items purchased during clearance or “final sale” promotions.</li>
        </ul>

        <h2 className="text-lg font-semibold mb-2">4. Process</h2>
        <ol className="list-decimal pl-5 text-sm space-y-1 mb-4">
          <li>Send us a message on WhatsApp: <strong>+230 5911 7549</strong>.</li>
          <li>Share your name, order details and photos of the issue.</li>
          <li>
            We will review and confirm if a replacement, repair or partial
            refund is applicable.
          </li>
        </ol>

        <h2 className="text-lg font-semibold mb-2">
          5. Refunds &amp; replacements
        </h2>
        <p className="text-sm mb-4">
          Where a claim is approved, we may offer:
        </p>
        <ul className="list-disc pl-5 text-sm space-y-1 mb-4">
          <li>Replacement of the same item (subject to stock).</li>
          <li>Exchange for another product of equal value.</li>
          <li>
            Partial or full refund via Juice by MCB / bank transfer, where
            applicable.
          </li>
        </ul>

        <p className="text-xs text-[#a36d63] mt-6">
          Atelier de Méa reserves the right to update this policy at any time.
        </p>
      </section>
    </main>
  );
}
