// src/app/about/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Atelier de Méa – Handmade Turbans, Clothing & Bags in Mauritius",
  description:
    "Discover the story behind Atelier de Méa – feminine handmade turbans, outfits and bags crafted with love in Roche Bois, Mauritius.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-[#47201d]">
      {/* HERO */}
      <section className="border-b border-[#fde7f1] bg-gradient-to-br from-[#fff1f7] via-white to-[#ffe4f3]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-10 sm:py-14 lg:py-16 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] items-center">
          <div className="space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#e11d70]">
              <span className="inline-block h-1 w-6 rounded-full bg-[#e11d70]" />
              <span>About Us</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">
              The story behind Atelier de Méa
            </h1>
            <p className="text-sm sm:text-base text-[#a36d63] max-w-xl">
              Atelier de Méa is a small Mauritian brand born from a simple idea:
              help everyday queens feel beautiful, confident and comfortable in
              their own style – with handmade turbans, outfits and bags crafted
              with love in Roche Bois.
            </p>
            <p className="text-xs sm:text-sm text-[#a36d63] max-w-xl">
              Every piece is cut, sewn and finished by hand, in small batches.
              We focus on soft fabrics, feminine colours and practical designs
              that fit real life – school runs, office days, celebrations and
              cosy weekends.
            </p>
          </div>

          {/* Simple info card */}
          <div className="rounded-3xl border border-[#fde7f1] bg-white/80 shadow-sm p-5 sm:p-6 space-y-4">
            <h2 className="text-sm sm:text-base font-semibold">
              What makes us different
            </h2>
            <ul className="space-y-3 text-[12px] sm:text-sm text-[#a36d63]">
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#e11d70]" />
                <span>
                  <strong className="text-[#47201d]">Handmade in Mauritius</strong>{" "}
                  – designed and crafted locally in Roche Bois, Port-Louis.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#e11d70]" />
                <span>
                  <strong className="text-[#47201d]">Small-batch pieces</strong>{" "}
                  – we sew in limited quantities to keep quality high and waste low.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#e11d70]" />
                <span>
                  <strong className="text-[#47201d]">Mauritian-friendly shopping</strong>{" "}
                  – Cash on Delivery, Juice / Scan-to-Pay and friendly WhatsApp support.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* VALUES GRID */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-10 sm:py-12">
          <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold">
                Our values
              </h2>
              <p className="text-xs sm:text-sm text-[#a36d63]">
                A small atelier, big heart – and a lot of attention to detail.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-3xl border border-[#fde7f1] bg-[#fff7fb] p-4 sm:p-5 space-y-2">
              <h3 className="text-sm font-semibold text-[#47201d]">
                Handmade, not mass-produced
              </h3>
              <p className="text-[12px] sm:text-sm text-[#a36d63]">
                We cut and sew each piece ourselves, instead of importing
                ready-made products. This lets us choose better fabrics and
                refine each design over time.
              </p>
            </div>

            <div className="rounded-3xl border border-[#fde7f1] bg-[#fff7fb] p-4 sm:p-5 space-y-2">
              <h3 className="text-sm font-semibold text-[#47201d]">
                Comfort for everyday queens
              </h3>
              <p className="text-[12px] sm:text-sm text-[#a36d63]">
                Whether you wear a turban for style, modesty or comfort, we
                focus on soft, breathable fabrics and secure fits that stay in
                place all day.
              </p>
            </div>

            <div className="rounded-3xl border border-[#fde7f1] bg-[#fff7fb] p-4 sm:p-5 space-y-2">
              <h3 className="text-sm font-semibold text-[#47201d]">
                Accessible & transparent
              </h3>
              <p className="text-[12px] sm:text-sm text-[#a36d63]">
                Clear prices in Mauritian Rupees, simple COD delivery, and
                friendly WhatsApp support when you have questions about size,
                colours or styling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-[#fff7fb] border-t border-b border-[#fde7f1]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-10 sm:py-12">
          <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold">
                How ordering works
              </h2>
              <p className="text-xs sm:text-sm text-[#a36d63]">
                Simple steps from choosing your piece to receiving it at home.
              </p>
            </div>
          </div>

          <ol className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-3 text-[12px] sm:text-sm text-[#a36d63]">
            <li className="rounded-3xl border border-[#fde7f1] bg-white p-4 sm:p-5">
              <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#ec4899] text-white text-xs font-semibold mb-2">
                1
              </div>
              <h3 className="text-sm font-semibold text-[#47201d] mb-1">
                Choose your pieces
              </h3>
              <p>
                Browse our{" "}
                <span className="font-semibold text-[#e11d70]">
                  New Arrivals
                </span>{" "}
                or{" "}
                <span className="font-semibold text-[#e11d70]">
                  Categories
                </span>{" "}
                pages, then add your favourites to the bag.
              </p>
            </li>

            <li className="rounded-3xl border border-[#fde7f1] bg-white p-4 sm:p-5">
              <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#ec4899] text-white text-xs font-semibold mb-2">
                2
              </div>
              <h3 className="text-sm font-semibold text-[#47201d] mb-1">
                Confirm on WhatsApp
              </h3>
              <p>
                When you&rsquo;re ready, place your order through our{" "}
                <span className="font-semibold">WhatsApp checkout</span> so we
                can confirm stock, delivery area and total.
              </p>
            </li>

            <li className="rounded-3xl border border-[#fde7f1] bg-white p-4 sm:p-5">
              <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#ec4899] text-white text-xs font-semibold mb-2">
                3
              </div>
              <h3 className="text-sm font-semibold text-[#47201d] mb-1">
                Delivery & payment
              </h3>
              <p>
                We prepare your parcel within{" "}
                <span className="font-semibold">24–48 hours</span>. Pay Cash on
                Delivery or via{" "}
                <span className="font-semibold">Juice / Scan-to-Pay</span>.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* CONTACT BLOCK */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-10 sm:py-12 grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] items-center">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-2">
              Visit or contact the atelier
            </h2>
            <p className="text-xs sm:text-sm text-[#a36d63] mb-4 max-w-xl">
              Have a question about sizes, colours or custom pieces? Reach out
              on WhatsApp – we&rsquo;re happy to help you choose the right
              turbans and outfits for your style and budget.
            </p>
            <ul className="space-y-2 text-[12px] sm:text-sm text-[#47201d]">
              <li>
                <span className="font-semibold">Location:</span> Roche Bois,
                Port-Louis, Mauritius
              </li>
              <li>
                <span className="font-semibold">WhatsApp:</span>{" "}
                <a
                  href="https://wa.me/23059117549"
                  target="_blank"
                  className="text-[#e11d70] underline underline-offset-2"
                >
                  +230 5911 7549
                </a>
              </li>
              <li>
                <span className="font-semibold">Email:</span>{" "}
                <a
                  href="mailto:aureth03@gmail.com"
                  className="text-[#e11d70] underline underline-offset-2"
                >
                  aureth03@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl border border-[#fde7f1] bg-[#fff7fb] p-5 sm:p-6 text-[12px] sm:text-sm text-[#a36d63]">
            <h3 className="text-sm font-semibold text-[#47201d] mb-2">
              A note from the atelier
            </h3>
            <p>
              Thank you for supporting a small Mauritian brand. Every order
              helps us grow, improve our designs and create more beautiful
              pieces for women who want comfort, modesty and style in one.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
