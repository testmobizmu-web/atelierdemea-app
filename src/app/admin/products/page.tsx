"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import type { Product } from "@/lib/products";

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace("/admin/login");
        return;
      }

      const { data: rows, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading products:", error.message);
        setProducts([]);
      } else {
        setProducts((rows ?? []) as Product[]);
      }

      setLoading(false);
    })();
  }, [router]);

  async function handleDelete(id: string) {
    if (!confirm("Delete this product?")) return;

    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      alert("Error deleting product: " + error.message);
      return;
    }

    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-semibold text-[#3B2A24]">Products</h1>
          <p className="text-xs text-[#7A6058]">
            Manage all Atelier de Méa products here (badges: Featured, New, Best
            seller, Sale).
          </p>
        </div>
        <button
          onClick={() => router.push("/admin/products/new")}
          className="rounded-full bg-[#C74382] hover:bg-[#d75b96] text-xs font-medium text-white px-4 py-2 shadow-sm shadow-[#C74382]/30"
        >
          + Add Product
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-[#7A6058]">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-sm text-[#7A6058]">
          No products yet. Click <strong>“Add Product”</strong> to create one.
        </p>
      ) : (
        <div className="overflow-auto border border-[#F3E3EC] rounded-xl bg-white">
          <table className="w-full text-xs md:text-sm">
            <thead className="bg-[#FFF5FA]">
              <tr className="text-left text-[#7A6058]">
                <th className="px-3 py-2 border-b border-[#F3E3EC]">Name</th>
                <th className="px-3 py-2 border-b border-[#F3E3EC]">Price</th>
                <th className="px-3 py-2 border-b border-[#F3E3EC]">
                  Category
                </th>
                <th className="px-3 py-2 border-b border-[#F3E3EC]">Badges</th>
                <th className="px-3 py-2 border-b border-[#F3E3EC]">
                  Stock
                </th>
                <th className="px-3 py-2 border-b border-[#F3E3EC] w-32">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-[#F9EDF5] hover:bg-[#FFF7FC]"
                >
                  <td className="px-3 py-2">
                    <div className="font-medium text-[#3B2A24]">{p.name}</div>
                    <div className="text-[11px] text-[#7A6058]">
                      /products/{p.slug}
                    </div>
                  </td>
                  <td className="px-3 py-2 text-[#3B2A24]">Rs {p.price}</td>
                  <td className="px-3 py-2 text-[#7A6058]">
                    {p.category || "-"}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex flex-wrap gap-1">
                      {p.is_featured && (
                        <span className="inline-flex px-2 py-0.5 rounded-full bg-[#FDEAF5] text-[#C74382] text-[11px]">
                          Featured
                        </span>
                      )}
                      {p.is_new && (
                        <span className="inline-flex px-2 py-0.5 rounded-full bg-[#E0F2FE] text-[#0369A1] text-[11px]">
                          New
                        </span>
                      )}
                      {p.is_best_seller && (
                        <span className="inline-flex px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#92400E] text-[11px]">
                          Best seller
                        </span>
                      )}
                      {p.is_on_sale && (
                        <span className="inline-flex px-2 py-0.5 rounded-full bg-[#FEE2E2] text-[#B91C1C] text-[11px]">
                          {p.sale_badge_label || "Sale"}
                        </span>
                      )}
                      {!p.is_featured &&
                        !p.is_new &&
                        !p.is_best_seller &&
                        !p.is_on_sale && (
                          <span className="inline-flex px-2 py-0.5 rounded-full bg-[#F3E3EC] text-[#7A6058] text-[11px]">
                            None
                          </span>
                        )}
                    </div>
                  </td>
                  <td className="px-3 py-2 text-[#7A6058]">
                    {p.stock ?? "-"}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          router.push(`/admin/products/${p.id}`)
                        }
                        className="px-2 py-1 rounded-md border border-[#F3E3EC] text-[11px] text-[#7A6058] hover:border-[#C74382] hover:text-[#C74382]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="px-2 py-1 rounded-md border border-[#FECACA] text-[11px] text-[#B91C1C] hover:bg-[#FEF2F2]"
                      >
                        Del
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
