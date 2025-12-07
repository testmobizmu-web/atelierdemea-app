"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/products";
import ProductCard from "@/components/shop/ProductCard";

type Props = {
  products: Product[];
};

export default function ShopClient({ products }: Props) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | "all">("all");

  const categories = useMemo(
    () =>
      Array.from(
        new Set(
          products
            .map((p) => p.category)
            .filter((c): c is string => !!c && c.trim().length > 0)
        )
      ).sort(),
    [products]
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();

    return products.filter((p) => {
      const matchesCategory =
        activeCategory === "all" || p.category === activeCategory;

      const text =
        `${p.name} ${p.short_description ?? ""} ${
          p.long_description ?? ""
        }`.toLowerCase();

      const matchesSearch = !q || text.includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [products, search, activeCategory]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="border-b border-[#fde7f1] bg-[#fff7fb]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-8 sm:py-10">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#47201d]">
            Shop by Category
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#a36d63] max-w-2xl">
            Explore all Atelier de Méa pieces – turbans, bandeaux, outfits,
            pochettes and more. Use the filters and search bar to find your
            perfect match.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-8 sm:py-10 grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          {/* Sidebar */}
          <aside className="space-y-6 lg:border-r lg:border-[#fde7f1] lg:pr-6">
            {/* Search */}
            <div>
              <h2 className="text-sm font-semibold text-[#47201d] mb-2">
                Search
              </h2>
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search turbans, bandeaux, bags..."
                  className="w-full rounded-full border border-[#f9a8d4] px-3 py-2 pr-8 text-xs outline-none focus:ring-2 focus:ring-[#f9a8d4]"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[13px]">
                  🔍
                </span>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h2 className="text-sm font-semibold text-[#47201d] mb-2">
                Categories
              </h2>
              <div className="flex flex-wrap lg:flex-col gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveCategory("all")}
                  className={`rounded-full px-3 py-1 border text-left ${
                    activeCategory === "all"
                      ? "bg-[#ec4899] border-[#ec4899] text-white"
                      : "bg-white border-[#f9a8d4] text-[#47201d] hover:bg-[#fff1f7]"
                  }`}
                >
                  All pieces
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full px-3 py-1 border text-left ${
                      activeCategory === cat
                        ? "bg-[#ec4899] border-[#ec4899] text-white"
                        : "bg-white border-[#f9a8d4] text-[#47201d] hover:bg-[#fff1f7]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Small info box */}
            <div className="hidden lg:block rounded-2xl border border-[#fde7f1] bg-[#fff7fb] px-3 py-3 text-[11px] text-[#a36d63]">
              💡 Tip: use search + categories together to quickly find a colour
              or style you love.
            </div>
          </aside>

          {/* Product grid */}
          <div>
            <div className="flex items-center justify-between mb-3 text-[11px] sm:text-xs text-[#a36d63]">
              <span>
                Showing{" "}
                <span className="font-semibold text-[#47201d]">
                  {filtered.length}
                </span>{" "}
                piece{filtered.length === 1 ? "" : "s"}
              </span>
            </div>

            {filtered.length === 0 ? (
              <p className="text-xs sm:text-sm text-[#a36d63]">
                No products match your filters. Try clearing the search or
                selecting another category.
              </p>
            ) : (
              <div className="grid gap-5 sm:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 items-stretch">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
