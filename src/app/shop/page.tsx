// src/app/shop/page.tsx
import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import ProductCard from "@/components/shop/ProductCard";


export const revalidate = 0;

type SearchParams = {
  category?: string;
  q?: string;
};

export default async function ShopPage({
  searchParams,
}: {
  // ✅ Next 16: searchParams is a Promise
  searchParams: Promise<SearchParams>;
}) {
  const resolved = await searchParams;
  const categoryFilter = resolved.category ?? "";
  const query = (resolved.q ?? "").toLowerCase().trim();

  const products = await getAllProducts();

  // Unique category list (for sidebar)
  const categories = Array.from(
    new Set(
      products
        .map((p) => p.category)
        .filter((c): c is string => !!c && c.trim().length > 0)
    )
  ).sort();

  // Apply category + search filter
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      !categoryFilter ||
      (p.category || "").toLowerCase() === categoryFilter.toLowerCase();

    const text =
      `${p.name} ${p.short_description ?? ""} ${
        p.long_description ?? ""
      }`.toLowerCase();

    const matchesSearch = !query || text.includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-white text-[#47201d]">
      {/* =========================
          PAGE HERO
      ========================== */}
      <section className="border-b bg-gradient-to-br from-[#fff7fb] via-white to-[#ffe4f3]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-8 sm:py-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#e11d70] mb-2">
              <span className="inline-block h-1 w-6 rounded-full bg-[#e11d70]" />
              <span>Shop</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold">
              Shop Atelier de Méa
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[#a36d63] max-w-xl">
              Browse all handmade turbans, bandeaux, outfits and bags. Use the
              search and side filters to quickly find the style you love.
            </p>
            {(categoryFilter || query) && (
              <p className="mt-2 text-[11px] sm:text-xs text-[#e11d70]">
                {categoryFilter && (
                  <>
                    Category:&nbsp;
                    <span className="font-semibold">{categoryFilter}</span>
                  </>
                )}
                {categoryFilter && query && <span>&nbsp;·&nbsp;</span>}
                {query && (
                  <>
                    Search:&nbsp;
                    <span className="font-semibold">“{resolved.q}”</span>
                  </>
                )}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:items-end gap-2 text-xs sm:text-sm">
            <div className="text-[#a36d63]">
              <span className="font-semibold">
                {filteredProducts.length}
              </span>{" "}
              product{filteredProducts.length === 1 ? "" : "s"} shown
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

      {/* =========================
          CONTENT: SIDEBAR + GRID
      ========================== */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-8 sm:py-10 grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          {/* ---------- SIDEBAR ---------- */}
          <aside className="space-y-6 lg:border-r lg:border-[#fde7f1] lg:pr-6">
            {/* Search */}
            <div>
              <h2 className="text-sm font-semibold text-[#47201d] mb-2">
                Search
              </h2>
              <form method="GET" className="relative">
                {/* keep current category in the query when searching */}
                {categoryFilter && (
                  <input
                    type="hidden"
                    name="category"
                    value={categoryFilter}
                  />
                )}
                <input
                  type="text"
                  name="q"
                  defaultValue={resolved.q ?? ""}
                  placeholder="Search turbans, bandeaux, bags..."
                  className="w-full rounded-full border border-[#f9a8d4] px-3 py-2 pr-8 text-xs outline-none focus:ring-2 focus:ring-[#f9a8d4]"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[13px]"
                  aria-label="Search"
                >
                  🔍
                </button>
              </form>
            </div>

            {/* Categories list */}
            <div>
              <h2 className="text-sm font-semibold text-[#47201d] mb-2">
                Categories
              </h2>
              <div className="flex flex-wrap lg:flex-col gap-2 text-xs">
                {/* All products chip */}
                <Link
                  href={resolved.q ? `/shop?q=${encodeURIComponent(resolved.q)}` : "/shop"}
                  className={`rounded-full px-3 py-1.5 border text-left ${
                    !categoryFilter
                      ? "bg-[#ec4899] border-[#ec4899] text-white"
                      : "bg-white border-[#f9a8d4] text-[#47201d] hover:bg-[#fff1f7]"
                  }`}
                >
                  All products
                </Link>

                {categories.map((cat) => {
                  const active =
                    cat.toLowerCase() === categoryFilter.toLowerCase();
                  const href = new URLSearchParams();
                  href.set("category", cat);
                  if (resolved.q) href.set("q", resolved.q);

                  return (
                    <Link
                      key={cat}
                      href={`/shop?${href.toString()}`}
                      className={`rounded-full px-3 py-1.5 border text-left ${
                        active
                          ? "bg-[#ec4899] border-[#ec4899] text-white"
                          : "bg-white border-[#f9a8d4] text-[#47201d] hover:bg-[#fff1f7]"
                      }`}
                    >
                      {cat}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Info card */}
            <div className="hidden lg:block rounded-2xl border border-[#fde7f1] bg-[#fff7fb] px-3 py-3 text-[11px] text-[#a36d63]">
              💡 Tip: combine search + category filters to quickly find a
              specific colour, fabric or style.
            </div>
          </aside>

          {/* ---------- PRODUCT GRID ---------- */}
          <div>
            {filteredProducts.length === 0 ? (
              <p className="text-xs sm:text-sm text-[#a36d63]">
                No products match your filters. Try clearing the search or
                choosing another category.
              </p>
            ) : (
              <div className="grid gap-5 sm:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}



