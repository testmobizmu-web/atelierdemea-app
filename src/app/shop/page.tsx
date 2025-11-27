// src/app/shop/page.tsx
import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import ProductCard from "@/components/shop/ProductCard";

export const revalidate = 0;

type SearchParams = {
  category?: string;
};

export default async function ShopPage({
  searchParams,
}: {
  // ✅ Next 16: searchParams is a Promise
  searchParams: Promise<SearchParams>;
}) {
  const resolved = await searchParams;
  const categoryFilter = resolved.category ?? "";

  const products = await getAllProducts();

  // Unique category list (for filter chips)
  const categories = Array.from(
    new Set(
      products
        .map((p) => p.category)
        .filter((c): c is string => !!c && c.trim().length > 0)
    )
  ).sort();

  // Apply category filter (if any)
  const filteredProducts =
    categoryFilter && categoryFilter.length > 0
      ? products.filter(
          (p) =>
            (p.category || "").toLowerCase() ===
            categoryFilter.toLowerCase()
        )
      : products;

  return (
    <main className="min-h-screen bg-white text-[#47201d]">
      {/* Page header */}
      <section className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#e11d70] mb-1">
              <span className="inline-block h-1 w-6 rounded-full bg-[#e11d70]" />
              <span>Shop</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold">
              Shop Atelier de Méa
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[#a36d63] max-w-xl">
              Discover handmade turbans, clothing and bags created with love in
              Roche Bois, Mauritius. All prices in Mauritian Rupees (Rs).
            </p>
            {categoryFilter && (
              <p className="mt-1 text-[11px] sm:text-xs text-[#e11d70]">
                Browsing category:&nbsp;
                <span className="font-semibold">
                  {categoryFilter}
                </span>
              </p>
            )}
          </div>

          <div className="flex flex-col sm:items-end gap-2 text-xs sm:text-sm">
            <div className="text-[#a36d63]">
              <span className="font-semibold">
                {filteredProducts.length}
              </span>{" "}
              products shown
              {categoryFilter
                ? ` in "${categoryFilter}" category`
                : " in total"}
            </div>
            <a
              href="https://wa.me/23059117549"
              target="_blank"
              className="inline-flex items-center rounded-full bg-[#ec4899] px-4 py-2 text-white text-xs sm:text-sm font-medium shadow-sm hover:bg-[#db2777] transition-colors"
            >
              Order on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b bg-[#fff7fb]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 flex flex-wrap gap-2 items-center text-xs sm:text-sm">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#a36d63] mr-2">
            Browse by category:
          </span>

          <Link
            href="/shop"
            className={`px-3 py-1.5 rounded-full border text-xs sm:text-sm ${
              !categoryFilter
                ? "bg-[#ec4899] border-[#ec4899] text-white"
                : "border-[#f9a8d4] text-[#47201d] hover:bg-[#fff1f7]"
            }`}
          >
            All products
          </Link>

          {categories.map((cat) => {
            const active =
              cat.toLowerCase() === categoryFilter.toLowerCase();
            return (
              <Link
                key={cat}
                href={`/shop?category=${encodeURIComponent(cat)}`}
                className={`px-3 py-1.5 rounded-full border text-xs sm:text-sm ${
                  active
                    ? "bg-[#ec4899] border-[#ec4899] text-white"
                    : "border-[#f9a8d4] text-[#47201d] hover:bg-[#fff1f7]"
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Product grid */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-8 sm:py-10">
          {filteredProducts.length === 0 ? (
            <p className="text-sm text-[#a36d63]">
              No products found in this category yet. Please choose another
              category or check back soon.
            </p>
          ) : (
            <div className="grid gap-5 sm:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}



