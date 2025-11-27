"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Order = {
  id: string;
  created_at: string;
  status: string;
  customer_name: string | null;
  customer_phone: string | null;
  customer_email: string | null;
  address_line1: string | null;
  city: string | null;
  notes: string | null;
  total_amount: number;
  payment_method: string | null;
};

const STATUS_OPTIONS = ["pending", "confirmed", "shipped", "completed", "cancelled"];

export default function AdminOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace("/admin/login");
        return;
      }

      const { data: rows, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading orders:", error.message);
        setOrders([]);
      } else {
        setOrders((rows ?? []) as Order[]);
      }

      setLoading(false);
    })();
  }, [router]);

  async function handleStatusChange(id: string, nextStatus: string) {
    const { error } = await supabase
      .from("orders")
      .update({ status: nextStatus })
      .eq("id", id);

    if (error) {
      alert("Error updating status: " + error.message);
      return;
    }

    setOrders((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, status: nextStatus } : o
      )
    );
  }

  function formatDate(d: string) {
    return new Date(d).toLocaleString("en-MU", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#3B2A24]">
            Orders
          </h1>
          <p className="text-xs text-[#7A6058]">
            View customer orders, addresses and notes.
          </p>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-[#7A6058]">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-sm text-[#7A6058]">
          No orders yet. Orders will appear here when customers place them.
        </p>
      ) : (
        <div className="overflow-auto border border-[#F3E3EC] rounded-xl bg-white">
          <table className="w-full text-xs md:text-sm">
            <thead className="bg-[#FFF5FA]">
              <tr className="text-left text-[#7A6058]">
                <th className="px-3 py-2 border-b border-[#F3E3EC]">
                  Order
                </th>
                <th className="px-3 py-2 border-b border-[#F3E3EC]">
                  Customer
                </th>
                <th className="px-3 py-2 border-b border-[#F3E3EC]">
                  Address
                </th>
                <th className="px-3 py-2 border-b border-[#F3E3EC]">
                  Notes
                </th>
                <th className="px-3 py-2 border-b border-[#F3E3EC]">
                  Payment
                </th>
                <th className="px-3 py-2 border-b border-[#F3E3EC]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr
                  key={o.id}
                  className="border-b border-[#F9EDF5] hover:bg-[#FFF7FC]"
                >
                  <td className="px-3 py-2 align-top">
                    <div className="font-medium text-[#3B2A24]">
                      #{o.id.slice(0, 6).toUpperCase()}
                    </div>
                    <div className="text-[11px] text-[#7A6058]">
                      {formatDate(o.created_at)}
                    </div>
                    <div className="mt-1 text-[11px] text-[#C74382] font-semibold">
                      Rs {o.total_amount.toFixed(0)}
                    </div>
                  </td>

                  <td className="px-3 py-2 align-top text-[#3B2A24]">
                    <div className="font-medium">
                      {o.customer_name || "N/A"}
                    </div>
                    {o.customer_phone && (
                      <div className="text-[11px] text-[#7A6058]">
                        {o.customer_phone}
                      </div>
                    )}
                    {o.customer_email && (
                      <div className="text-[11px] text-[#7A6058]">
                        {o.customer_email}
                      </div>
                    )}
                  </td>

                  <td className="px-3 py-2 align-top text-[#7A6058]">
                    <div className="text-[11px]">
                      {o.address_line1 || "-"}
                    </div>
                    <div className="text-[11px]">
                      {o.city || ""}
                    </div>
                  </td>

                  <td className="px-3 py-2 align-top text-[#7A6058]">
                    <div
                      className="text-[11px] max-w-xs line-clamp-3"
                      title={o.notes || undefined}
                    >
                      {o.notes || "-"}
                    </div>
                  </td>

                  <td className="px-3 py-2 align-top text-[#7A6058]">
                    <div className="text-[11px] capitalize">
                      {o.payment_method || "COD"}
                    </div>
                  </td>

                  <td className="px-3 py-2 align-top">
                    <select
                      value={o.status}
                      onChange={(e) =>
                        handleStatusChange(o.id, e.target.value)
                      }
                      className="rounded-full border border-[#F3E3EC] bg-white px-2 py-1 text-[11px] text-[#3B2A24] focus:outline-none focus:ring-2 focus:ring-[#C74382]/40"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </option>
                      ))}
                    </select>
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



