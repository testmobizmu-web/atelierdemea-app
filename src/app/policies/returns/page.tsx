// src/app/policies/returns/page.tsx
import Link from "next/link";

export default function ReturnsPolicyPage() {
  return (
    <>
      <p className="text-[11px] uppercase tracking-[0.2em] text-[#e11d70] mb-2">
        Policies
      </p>
      <h1 className="text-2xl sm:text-3xl font-semibold mb-4">
        Return & Exchange Policy
      </h1>
      <p className="text-sm sm:text-base text-[#a36d63] mb-6">
        Please read our return and exchange conditions for Atelier de Méa
        handmade products.
      </p>

      <div className="space-y-4 text-sm sm:text-base leading-relaxed">
        <p>
          Because our pieces are handmade in small batches, we currently do not
          offer change-of-mind refunds. However, if there is a problem with your
          order (wrong item, damaged on arrival, size issue), please contact us
          within <strong>3 days</strong> of receiving your parcel.
        </p>
        <p>
          To open a request, send your order number and clear photos of the
          issue via WhatsApp at{" "}
          <Link
            href="https://wa.me/23059117549"
            target="_blank"
            className="text-[#e11d70] underline"
          >
            +230 5911 7549
          </Link>{" "}
          or email{" "}
          <a
            href="mailto:aureth03@gmail.com"
            className="text-[#e11d70] underline"
          >
            aureth03@gmail.com
          </a>
          .
        </p>
        <p>
          If your request is accepted, we will propose an exchange, store
          credit, or partial refund depending on the situation. Items must be
          unused, unworn, unwashed and returned with tags and original
          packaging.
        </p>
        <p className="text-xs text-[#a36d63]">
          Atelier de Méa reserves the right to refuse returns that do not meet
          these conditions.
        </p>
      </div>
    </>
  );
}
