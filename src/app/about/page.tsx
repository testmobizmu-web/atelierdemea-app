import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Atelier de Méa",
  description:
    "Discover the story behind Atelier de Méa – handmade turbans, bandeaux, outfits and bags crafted with love in Mauritius.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-[#fff1f7] via-white to-[#ffe4f3] border-b border-[#fde7f1]">
        <div className="max-w-5xl mx-auto px-3 sm:px-6 py-10 sm:py-14">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#47201d]">
            About Atelier de Méa
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#a36d63] max-w-2xl">
            A small Mauritian atelier with a big heart – creating feminine
            handmade pieces for everyday queens.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-3 sm:px-6 py-10 sm:py-12 space-y-8 text-sm text-[#47201d]">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Our Story</h2>
            <p className="text-[#a36d63]">
              Atelier de Méa was born from a love of fabric, colour and the
              everyday confidence that a beautiful accessory can bring. From a
              small corner in Roche Bois, Mauritius, we design and handcraft
              turbans, bandeaux, outfits and bags in small batches.
            </p>
            <p className="text-[#a36d63]">
              Every piece is cut, sewn and finished with care – made to fit real
              women, real lives and real moments, from quick grocery runs to
              special celebrations.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3 text-[13px]">
            <div className="rounded-2xl border border-[#fde7f1] bg-[#fff7fb] p-4">
              <h3 className="font-semibold mb-1">Handmade in Mauritius</h3>
              <p className="text-[#a36d63]">
                All our pieces are designed and made locally, supporting
                Mauritian talent and creativity.
              </p>
            </div>
            <div className="rounded-2xl border border-[#fde7f1] bg-[#fff7fb] p-4">
              <h3 className="font-semibold mb-1">Small batches</h3>
              <p className="text-[#a36d63]">
                We prefer quality over quantity. Limited drops mean more unique
                pieces for you.
              </p>
            </div>
            <div className="rounded-2xl border border-[#fde7f1] bg-[#fff7fb] p-4">
              <h3 className="font-semibold mb-1">Made to be worn</h3>
              <p className="text-[#a36d63]">
                Comfortable fits, soft fabrics and practical designs that work
                with your everyday wardrobe.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold">How we work</h2>
            <ul className="list-disc pl-5 space-y-1 text-[#a36d63]">
              <li>We design and test each model before producing a small batch.</li>
              <li>Fabrics are chosen for comfort, durability and easy care.</li>
              <li>We check every piece before it goes out for delivery.</li>
              <li>
                Orders are prepared within 24–48h and delivered across Mauritius
                with Cash on Delivery or Juice / Scan-to-Pay.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
