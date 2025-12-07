// src/app/categories/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import ProductCard from "@/components/shop/ProductCard";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Browse by Category – Atelier de Méa",
  description:
    "Explore all Atelier de Méa handmade turbans, bags and clothing by category, or search by name and style.",
};

// Next 16: we receive a Promise for searchParams
type RawSearchParams = {
  [key: string]: string | string[] | undefined;
};

function getFirst(value: string | string[] | undefined): string {
  if (!value) return "";
  return Array.isArray(value) ? value[0] : value;
}

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const sp = await searchParams;

  const categoryFilter = getFirst(sp.category);
  const rawQ = getFirst(sp.q);
  const searchQuery = rawQ.trim().toLowerCase();

  const products = await getAllProducts();

  // Collect categories + counts
  const categoryCounts = new Map<string, number>();
  for (const p of products) {
    const cat = (p.category || "Uncategorised").trim();
    if (!cat) continue;
    categoryCounts.set(cat, (categoryCounts.get(cat) ?? 0) + 1);
  }

  const categories = Array.from(categoryCounts.keys()).sort();

  // Apply filters
  const filteredProducts = products.filter((p) => {
    const matchesCategory = categoryFilter
      ? (p.category || "").toLowerCase() === categoryFilter.toLowerCase()
      : true;

    const haystack =
      `${p.name ?? ""} ${p.short_description ?? ""} ${
        p.long_description ?? ""
      }`.toLowerCase();

    const matchesSearch = searchQuery ? haystack.includes(searchQuery) : true;

    return matchesCategory && matchesSearch;
  });

  const totalCount = filteredProducts.length;

  // Build base URL for links (keeps ?q= when changing category)
  const buildLink = (cat: string | null) => {
    const params = new URLSearchParams();
    if (cat) params.set("category", cat);
    if (searchQuery) params.set("q", rawQ);
    const qs = params.toString();
    return qs ? `/categories?${qs}` : "/categories";
  };

  return (
    <main className="min-h-screen bg-white text-[#47201d]">
      {/* ====== PAGE HEADER ====== */}
      <section className="border-b bg-gradient-to-r from-[#fff1f7] via-white to-[#ffe4f3]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#e11d70] mb-1">
              <span className="inline-block h-1 w-6 rounded-full bg-[#e11d70]" />
              <span>Categories</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold">
              Browse by category
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[#a36d63] max-w-xl">
              Explore all Atelier de Méa pieces by category, or search by name
              and style. All prices in Mauritian Rupees (Rs).
            </p>

            {(categoryFilter || searchQuery) && (
              <p className="mt-1 text-[11px] sm:text-xs text-[#e11d70]">
                {categoryFilter && (
                  <>
                    Category: <span className="font-semibold">{categoryFilter}</span>
                  </>
                )}
                {categoryFilter && searchQuery && " · "}
                {searchQuery && (
                  <>
                    Search: <span className="font-semibold">“{rawQ}”</span>
                  </>
                )}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:items-end gap-2 text-xs sm:text-sm">
            <div className="text-[#a36d63]">
              <span className="font-semibold">{totalCount}</span> products found
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center rounded-full bg-[#ec4899] px-4 py-2 text-white text-xs sm:text-sm font-medium shadow-sm hover:bg-[#db2777] transition-colors"
            >
              View all products
            </Link>
          </div>
        </div>
      </section>

      {/* ====== MAIN CONTENT: SIDEBAR LEFT, PRODUCTS RIGHT ====== */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-8 sm:py-10 grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          {/* ----- LEFT SIDEBAR ----- */}
          <aside className="space-y-6">
            {/* Search box */}
            <form
              action="/categories"
              method="GET"
              className="rounded-3xl border border-[#fde7f1] bg-[#fff7fb] p-4 space-y-3"
            >
              <h2 className="text-xs font-semibold text-[#47201d] mb-1">
                Search
              </h2>
              <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 border border-[#f9a8d4]">
                <span className="text-xs text-[#e11d70]">🔍</span>
                <input
                  type="text"
                  name="q"
                  defaultValue={rawQ}
                  placeholder="Search by name or style…"
                  className="flex-1 bg-transparent outline-none text-xs text-[#47201d] placeholder:text-[#d4a3b2]"
                />
              </div>
              {/* keep category when searching */}
              {categoryFilter && (
                <input type="hidden" name="category" value={categoryFilter} />
              )}
              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center rounded-full bg-[#ec4899] px-4 py-1.5 text-[11px] font-semibold text-white shadow-sm hover:bg-[#db2777] transition"
              >
                Go
              </button>
            </form>

            {/* Category list */}
            <div className="rounded-3xl border border-[#fde7f1] bg-[#fff7fb] p-4 space-y-3">
              <h2 className="text-xs font-semibold text-[#47201d] mb-1">
                Categories
              </h2>
              <div className="flex flex-col gap-1.5 text-xs">
                <Link
                  href={buildLink(null)}
                  className={`flex items-center justify-between rounded-full px-3 py-1.5 cursor-pointer ${
                    !categoryFilter
                      ? "bg-[#ec4899] text-white"
                      : "bg-white text-[#47201d] hover:bg-[#fff1f7]"
                  }`}
                >
                  <span>All categories</span>
                  <span className="text-[11px] opacity-80">
                    {products.length}
                  </span>
                </Link>

                {categories.map((cat) => {
                  const active =
                    categoryFilter &&
                    cat.toLowerCase() === categoryFilter.toLowerCase();
                  const count = categoryCounts.get(cat) ?? 0;

                  return (
                    <Link
                      key={cat}
                      href={buildLink(cat)}
                      className={`flex items-center justify-between rounded-full px-3 py-1.5 cursor-pointer ${
                        active
                          ? "bg-[#ec4899] text-white"
                          : "bg-white text-[#47201d] hover:bg-[#fff1f7]"
                      }`}
                    >
                      <span>{cat}</span>
                      <span className="text-[11px] opacity-80">{count}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* ----- RIGHT: PRODUCTS GRID ----- */}
          <div className="space-y-4">
            {filteredProducts.length === 0 ? (
              <p className="text-xs sm:text-sm text-[#a36d63]">
                No products match your filters. Try another category or clear the
                search.
              </p>
            ) : (
              <div className="grid gap-5 sm:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 items-stretch">
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

