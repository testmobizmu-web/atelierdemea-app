import type { Metadata } from "next";
import { getAllProducts } from "@/lib/products";
import ProductCard from "@/components/products/ProductCard";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "New Arrivals – Atelier de Méa",
  description:
    "Discover the latest handmade turbans, bandeaux, outfits and bags freshly added to Atelier de Méa.",
};

export default async function NewArrivalsPage() {
  const allProducts = await getAllProducts();

  // Treat products added in last 30 days as "New"
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  let newArrivals = allProducts.filter((p) => {
    const created = new Date(p.created_at);
    return created >= thirtyDaysAgo;
  });

  // Fallback: if no products match, just take the latest 24
  if (!newArrivals.length) {
    newArrivals = [...allProducts]
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
      .slice(0, 24);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#fff1f7] via-white to-[#ffe4f3] border-b border-[#fde7f1]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-10 sm:py-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-[#fde7f1] px-3 py-1 text-[11px] text-[#e11d70] mb-3">
            <span className="h-2 w-2 rounded-full bg-[#e11d70] animate-pulse" />
            <span>New pieces just landed</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#47201d]">
            New Arrivals
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#a36d63] max-w-xl">
            Fresh handmade turbans, bandeaux, outfits and bags – crafted with
            love in Mauritius and added to the boutique in the last few weeks.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-8 sm:py-10">
          {newArrivals.length === 0 ? (
            <p className="text-sm text-[#a36d63]">
              No new arrivals yet. Please check back soon.
            </p>
          ) : (
            <div className="grid gap-5 sm:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 items-stretch">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
