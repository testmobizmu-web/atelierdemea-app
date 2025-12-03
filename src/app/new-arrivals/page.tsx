// src/app/new-arrivals/page.tsx
import type { Metadata } from "next";
import { getAllProducts } from "@/lib/products";
import ProductCard from "@/components/shop/ProductCard"; // ✅ correct path

export const revalidate = 0;

export const metadata: Metadata = {
  title: "New Arrivals – Atelier de Méa",
  description:
    "Discover the latest handmade turbans, bandeaux, outfits and bags freshly added to Atelier de Méa.",
};

export default async function NewArrivalsPage() {
  const allProducts = await getAllProducts();

  // 🔥 Define "new" as added in last 30 days
  const now = new Date();
  const thirtyDaysAgo = new Date(
    now.getTime() - 30 * 24 * 60 * 60 * 1000
  );

  let newArrivals = allProducts.filter((p) => {
    const created = new Date(p.created_at);
    return created >= thirtyDaysAgo;
  });

  // Fallback: if nothing in last 30 days, show latest 24 items
  if (!newArrivals.length) {
    newArrivals = [...allProducts]
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
      )
      .slice(0, 24);
  }

  return (
    <main className="min-h-screen bg-white text-[#47201d]">
      {/* HERO */}
      <section className="bg-gradient-to-br from-[#fff1f7] via-white to-[#ffe4f3] border-b border-[#fde7f1]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-10 sm:py-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-[#fde7f1] px-3 py-1 text-[11px] text-[#e11d70] mb-3">
            <span className="h-2 w-2 rounded-full bg-[#e11d70] animate-pulse" />
            <span>New pieces just landed</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
            New Arrivals
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#a36d63] max-w-xl">
            Fresh handmade turbans, bandeaux, outfits and bags – crafted with
            love in Mauritius and recently added to the boutique.
          </p>
        </div>
      </section>

      {/* GRID */}
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
    </main>
  );
}

