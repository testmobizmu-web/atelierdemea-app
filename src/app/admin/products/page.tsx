// src/app/admin/products/page.tsx
import { adminGetAllProducts } from "@/lib/productsAdmin";
import { getAllCategories } from "@/lib/categories";
import { getSalesStats } from "@/lib/adminOrders";
import AdminProductsGrid from "./AdminProductsGrid";

export const revalidate = 0;

export default async function AdminProductsPage() {
  const [products, categories, sales] = await Promise.all([
    adminGetAllProducts(),
    getAllCategories(),
    getSalesStats(),
  ]);

  const totalProducts = products.length;
  const lowStockCount = products.filter(
    (p) => p.stock != null && p.stock > 0 && p.stock <= 5
  ).length;
  const categoriesCount = categories.length;

  return (
    <main className="min-h-screen bg-[#fff8fb] text-[#47201d]">
      <section className="max-w-6xl mx-auto px-3 sm:px-6 py-8 sm:py-10 space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold">
              Products dashboard
            </h1>
            <p className="text-xs sm:text-sm text-[#a36d63]">
              Manage products, categories &amp; see quick sales stats.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <a
              href="/admin/categories"
              className="inline-flex items-center rounded-full border border-[#f9a8d4] px-4 py-2 text-xs sm:text-sm font-medium text-[#e11d70] bg-white hover:bg-[#fff0f7]"
            >
              Categories
            </a>
            <a
              href="/admin/products/new"
              className="inline-flex items-center rounded-full bg-[#ec4899] px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#db2777]"
            >
              + Add new product
            </a>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <StatCard
            label="Total sales"
            value={Math.round(sales.totalSales)}
            prefix="Rs "
            tone="accent"
          />
          <StatCard label="Orders" value={sales.totalOrders} />
          <StatCard label="Items sold" value={sales.totalItems} />
          <StatCard label="Products" value={totalProducts} />
          <StatCard label="Categories" value={categoriesCount} />
          <StatCard
            label="Low stock (≤ 5)"
            value={lowStockCount}
            tone={lowStockCount > 0 ? "danger" : "muted"}
          />
        </div>

        {/* Products grid */}
        <AdminProductsGrid products={products} />
      </section>
    </main>
  );
}

function StatCard({
  label,
  value,
  tone = "default",
  prefix,
}: {
  label: string;
  value: number;
  tone?: "default" | "accent" | "danger" | "muted";
  prefix?: string;
}) {
  const toneClasses: Record<string, string> = {
    default: "bg-white border-[#fde7f1] text-[#47201d]",
    accent: "bg-[#fff0f7] border-[#f9a8d4] text-[#be185d]",
    danger: "bg-[#fef2f2] border-[#fecaca] text-[#b91c1c]",
    muted: "bg-[#f9fafb] border-[#e5e7eb] text-[#4b5563]",
  };

  return (
    <div
      className={`rounded-2xl border px-4 py-3 sm:px-5 sm:py-4 shadow-sm ${toneClasses[tone]}`}
    >
      <p className="text-[11px] sm:text-xs font-medium opacity-80">
        {label}
      </p>
      <p className="mt-1 text-lg sm:text-xl font-semibold">
        {prefix ?? ""}
        {value.toLocaleString("en-MU")}
      </p>
    </div>
  );
}


