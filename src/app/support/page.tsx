import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Support & FAQ – Atelier de Méa",
  description:
    "Need help with your order, delivery or payment? Find answers and contact Atelier de Méa support.",
};

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-[#fff7fb] via-white to-[#ffe4f3] border-b border-[#fde7f1]">
        <div className="max-w-5xl mx-auto px-3 sm:px-6 py-10 sm:py-14">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#47201d]">
            Support & FAQ
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#a36d63] max-w-2xl">
            Questions about your order, delivery or payment? Start here or reach
            out to us directly on WhatsApp.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-3 sm:px-6 py-10 sm:py-12 grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          {/* FAQ */}
          <div className="space-y-6 text-sm">
            <div>
              <h2 className="text-lg font-semibold text-[#47201d] mb-2">
                Frequently asked questions
              </h2>
              <div className="space-y-4 text-[#a36d63] text-[13px]">
                <div>
                  <h3 className="font-semibold text-[#47201d]">
                    How do I place an order?
                  </h3>
                  <p>
                    Add your favourite pieces to the bag, then click “Order
                    now on WhatsApp” in the cart. We will confirm your order,
                    total and delivery details directly on WhatsApp.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-[#47201d]">
                    Which payment methods do you accept?
                  </h3>
                  <p>
                    We accept Cash on Delivery (COD), Juice by MCB and
                    Scan-to-Pay. Details are shared when we confirm your order
                    on WhatsApp.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-[#47201d]">
                    How long does delivery take?
                  </h3>
                  <p>
                    Orders are usually prepared within 24–48h. Delivery time
                    depends on your region in Mauritius, but we’ll share an
                    estimated day when confirming the order.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-[#47201d]">
                    Can I return or exchange an item?
                  </h3>
                  <p>
                    For hygiene and safety reasons, turbans and bandeaux are
                    generally non-returnable once worn. If there is a defect
                    with your order, please contact us within 24h of delivery
                    and we’ll try to help. See our{" "}
                    <Link
                      href="/policies/returns"
                      className="text-[#e11d70] underline"
                    >
                      Return Policy
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact card */}
          <aside className="rounded-3xl border border-[#fde7f1] bg-[#fff7fb] p-5 text-[13px] text-[#47201d] space-y-3">
            <h2 className="text-sm font-semibold">Need personal help?</h2>
            <p className="text-[#a36d63]">
              The fastest way to reach us is on WhatsApp. Send us your name,
              order details and question and we’ll reply as soon as possible.
            </p>
            <div className="space-y-1">
              <p>
                WhatsApp:{" "}
                <a
                  href="https://wa.me/23059117549"
                  target="_blank"
                  className="text-[#e11d70] font-semibold underline"
                >
                  +230 5911 7549
                </a>
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:aureth03@gmail.com"
                  className="text-[#e11d70] underline"
                >
                  aureth03@gmail.com
                </a>
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
