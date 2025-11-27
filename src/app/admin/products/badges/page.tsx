import { getAllProducts } from "@/lib/products";
import ProductBadgesTable from "@/components/admin/ProductBadgesTable";

export const revalidate = 0;

export default async function AdminProductBadgesPage() {
  const products = await getAllProducts();

  return (
    <main className="min-h-screen bg-white text-[#47201d]">
      <section className="border-b bg-[#fff7fb]">
        <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#e11d70] mb-1">
              <span className="inline-block h-1 w-6 rounded-full bg-[#e11d70]" />
              <span>Admin</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold">
              Product badges
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[#a36d63] max-w-xl">
              Choose which products appear as Featured, New, Best Sellers or
              Sale on the homepage and category pages.
            </p>
          </div>

          <div className="text-xs sm:text-sm text-[#a36d63]">
            <span className="font-semibold">{products.length}</span> products
            loaded
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
          <ProductBadgesTable products={products} />
        </div>
      </section>
    </main>
  );
}
