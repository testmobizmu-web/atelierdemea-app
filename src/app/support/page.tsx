// src/app/support/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support & FAQ – Atelier de Méa",
  description:
    "Find answers about orders, delivery, payment methods and returns for Atelier de Méa. Need help? Contact us on WhatsApp.",
};

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-white text-[#47201d]">
      {/* HERO */}
      <section className="border-b border-[#fde7f1] bg-gradient-to-br from-[#fff1f7] via-white to-[#ffe4f3]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-10 sm:py-14 lg:py-16 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-center">
          <div className="space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#e11d70]">
              <span className="inline-block h-1 w-6 rounded-full bg-[#e11d70]" />
              <span>Support</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">
              Support & Frequently Asked Questions
            </h1>
            <p className="text-sm sm:text-base text-[#a36d63] max-w-xl">
              Need help with an order, delivery or payment? Find quick answers
              below or contact us directly on WhatsApp. We do our best to reply
              as soon as possible.
            </p>
          </div>

          {/* Quick contact card */}
          <div className="rounded-3xl border border-[#fde7f1] bg-white/80 shadow-sm p-5 sm:p-6 space-y-3 text-[12px] sm:text-sm text-[#a36d63]">
            <h2 className="text-sm sm:text-base font-semibold text-[#47201d]">
              Contact Atelier de Méa
            </h2>
            <p>
              If you don’t find your answer in the FAQ, you can message us
              directly:
            </p>
            <ul className="space-y-1">
              <li>
                <span className="font-semibold text-[#47201d]">WhatsApp:</span>{" "}
                <a
                  href="https://wa.me/23059117549"
                  target="_blank"
                  className="text-[#e11d70] underline underline-offset-2"
                >
                  +230 5911 7549
                </a>
              </li>
              <li>
                <span className="font-semibold text-[#47201d]">Email:</span>{" "}
                <a
                  href="mailto:aureth03@gmail.com"
                  className="text-[#e11d70] underline underline-offset-2"
                >
                  aureth03@gmail.com
                </a>
              </li>
              <li>
                <span className="font-semibold text-[#47201d]">Location:</span>{" "}
                Roche Bois, Port-Louis, Mauritius
              </li>
            </ul>
            <p className="text-[11px] sm:text-xs text-[#a36d63]">
              Typical reply time: within a few hours during the day.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ SECTIONS */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-10 sm:py-12 space-y-8 sm:space-y-10">
          {/* Orders & Delivery */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-3">
              Orders & Delivery
            </h2>
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 text-[12px] sm:text-sm text-[#a36d63]">
              <FaqItem
                question="How do I place an order?"
                answer="Add your favourite pieces to the bag and use the WhatsApp checkout button. We will confirm stock, delivery area and final amount with you directly on WhatsApp before preparing your parcel."
              />
              <FaqItem
                question="Do you deliver everywhere in Mauritius?"
                answer="We deliver to most regions in Mauritius. When you send your order on WhatsApp, please share your exact location. We will confirm if delivery is possible and the delivery fee for your area."
              />
              <FaqItem
                question="How long does delivery take?"
                answer="We usually prepare orders within 24–48 hours (working days). Delivery time then depends on your region and our delivery partner."
              />
              <FaqItem
                question="Can I pick up my order?"
                answer="In some cases, we can arrange a meet-up or pick-up point, depending on your location and our schedule. Please ask us on WhatsApp for availability."
              />
            </div>
          </div>

          {/* Payment */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-3">
              Payment Methods
            </h2>
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 text-[12px] sm:text-sm text-[#a36d63]">
              <FaqItem
                question="Which payment methods do you accept?"
                answer="We currently accept Cash on Delivery (COD) in Mauritius, and digital payments via Juice by MCB and Scan-to-Pay. Details will be shared with you on WhatsApp when confirming your order."
              />
              <FaqItem
                question="Is payment required before delivery?"
                answer="For most orders, you can pay Cash on Delivery. For some custom or special orders, we may request a partial payment in advance – we will always confirm this with you first."
              />
            </div>
          </div>

          {/* Products & Sizes */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-3">
              Products, Sizes & Care
            </h2>
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 text-[12px] sm:text-sm text-[#a36d63]">
              <FaqItem
                question="How do I know if a turban will fit me?"
                answer="Our turbans are designed with flexible fits to suit most head sizes. If you have a specific concern (very long hair, special styling, etc.), send us a message and we’ll guide you with the best models."
              />
              <FaqItem
                question="How should I wash and care for my pieces?"
                answer="We recommend gentle hand wash or delicate machine wash (if the fabric allows), in cold water, and air drying. Avoid harsh chemicals and very hot ironing directly on the fabric. For more details, see our care guide on the blog."
              />
              <FaqItem
                question="Are colours exactly as shown in the photos?"
                answer="We try to photograph our products in natural light, but small differences may appear due to screen settings and lighting. If a colour is very important for you, message us and we can send extra photos or videos."
              />
              <FaqItem
                question="Can you make custom colours or sets?"
                answer="Sometimes we can create custom sets depending on fabric availability and timing. Share your idea on WhatsApp and we’ll let you know what’s possible."
              />
            </div>
          </div>

          {/* Returns / Exchanges */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-3">
              Returns & Exchanges
            </h2>
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 text-[12px] sm:text-sm text-[#a36d63]">
              <FaqItem
                question="Do you accept returns or exchanges?"
                answer="For hygiene reasons, we generally do not accept returns on worn turbans or hair accessories. However, if there is a clear defect or issue with your order, please contact us within 24–48 hours of receiving your parcel and we will do our best to help."
              />
              <FaqItem
                question="What if my item arrives damaged?"
                answer="Please take clear photos of the parcel and the item as soon as you receive it and contact us on WhatsApp. We will review the situation and discuss the best solution with you."
              />
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CONTACT BLOCK */}
      <section className="bg-[#fff7fb] border-t border-[#fde7f1]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-10 sm:py-12 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] items-center">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-2">
              Still need help?
            </h2>
            <p className="text-xs sm:text-sm text-[#a36d63] mb-4 max-w-xl">
              If your question is not covered above, send us a quick message
              and we’ll be happy to assist you with sizes, colours, delivery or
              anything else related to your order.
            </p>
            <a
              href="https://wa.me/23059117549"
              target="_blank"
              className="inline-flex items-center rounded-full bg-[#ec4899] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#db2777] transition"
            >
              Chat with us on WhatsApp
            </a>
          </div>

          <div className="rounded-3xl border border-[#fde7f1] bg-white p-5 sm:p-6 text-[12px] sm:text-sm text-[#a36d63]">
            <h3 className="text-sm font-semibold text-[#47201d] mb-2">
              Quick summary
            </h3>
            <ul className="space-y-1.5">
              <li>• Cash on Delivery available in Mauritius</li>
              <li>• Juice &amp; Scan-to-Pay accepted</li>
              <li>• Orders usually prepared within 24–48 hours</li>
              <li>• Friendly support via WhatsApp &amp; email</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

type FaqItemProps = {
  question: string;
  answer: string;
};

function FaqItem({ question, answer }: FaqItemProps) {
  return (
    <div className="rounded-3xl border border-[#fde7f1] bg-[#fff7fb] p-4 sm:p-5">
      <h3 className="text-sm font-semibold text-[#47201d] mb-1">
        {question}
      </h3>
      <p>{answer}</p>
    </div>
  );
}

