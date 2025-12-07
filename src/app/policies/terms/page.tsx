// src/app/policies/terms/page.tsx
export default function TermsPage() {
  return (
    <>
      <p className="text-[11px] uppercase tracking-[0.2em] text-[#e11d70] mb-2">
        Policies
      </p>
      <h1 className="text-2xl sm:text-3xl font-semibold mb-4">
        Terms & Conditions
      </h1>
      <p className="text-sm sm:text-base text-[#a36d63] mb-6">
        Please read these terms carefully before ordering from Atelier de Méa.
      </p>

      <div className="space-y-4 text-sm sm:text-base leading-relaxed">
        <p>
          By placing an order with Atelier de Méa, you confirm that all
          information provided is accurate and that you are authorised to use
          the selected payment method.
        </p>
        <p>
          Because our items are handmade in small batches, colours and prints
          may vary slightly from photos. This is part of the charm of artisanal
          production and does not constitute a defect.
        </p>
        <p>
          Prices are indicated in Mauritian Rupees (Rs) and may change without
          prior notice. The price applicable to your order is the one displayed
          at the time of purchase.
        </p>
        <p>
          Atelier de Méa reserves the right to refuse or cancel an order in
          case of stock issues, payment problems or suspected fraud. If this
          happens, any amount already paid will be refunded.
        </p>
      </div>
    </>
  );
}
