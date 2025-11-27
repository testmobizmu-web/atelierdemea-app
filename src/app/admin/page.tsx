"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Order = {
  id: string;
  created_at: string;
  total_amount: number | null;
  status: string | null;
};

type Product = {
  id: string;
  name: string;
  stock: number | null;
  category: string | null;
};

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      // Load last 90 days orders (for stats + forecast + chart)
      const since = new Date();
      since.setDate(since.getDate() - 90);

      const { data: ordersRows } = await supabase
        .from("orders")
        .select("id, created_at, total_amount, status")
        .gte("created_at", since.toISOString())
        .order("created_at", { ascending: true });

      const { data: productsRows } = await supabase
        .from("products")
        .select("id, name, stock, category");

      setOrders((ordersRows ?? []) as Order[]);
      setProducts((productsRows ?? []) as Product[]);
      setLoading(false);
    })();
  }, []);

  const now = new Date();

  // ---- SALES STATS ----
  const last30Orders = orders.filter((o) => {
    const d = new Date(o.created_at);
    const diffDays =
      (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
    return diffDays <= 30;
  });

  const revenueLast30 = last30Orders.reduce(
    (sum, o) => sum + (o.total_amount ?? 0),
    0
  );
  const avgPerDayLast30 = revenueLast30 / 30;
  const forecastNext30 = Math.round(avgPerDayLast30 * 30);

  const totalOrders = orders.length;
  const completedOrders = orders.filter(
    (o) => o.status === "done"
  ).length;

  const completionRate =
    totalOrders === 0
      ? 0
      : Math.round((completedOrders / totalOrders) * 100);

  // ---- INVENTORY ----
  const lowStock = products
    .filter((p) => p.stock !== null && p.stock !== undefined)
    .filter((p) => (p.stock as number) <= 3)
    .sort((a, b) => (a.stock ?? 0) - (b.stock ?? 0))
    .slice(0, 8);

  const outOfStock = products
    .filter((p) => p.stock === 0)
    .slice(0, 8);

  // ---- WEEKLY SALES CHART (last 8 weeks) ----
  const weeklyData = (() => {
    const today = new Date();
    const result: { label: string; total: number }[] = [];

    // 8 last weeks (oldest first)
    for (let i = 7; i >= 0; i--) {
      const start = new Date(today);
      const end = new Date(today);

      // Simple 7-day chunks backward from today
      start.setDate(today.getDate() - (i + 1) * 7 + 1);
      end.setDate(today.getDate() - i * 7);

      const total = orders.reduce((sum, o) => {
        const d = new Date(o.created_at);
        if (d >= start && d <= end) {
          return sum + (o.total_amount ?? 0);
        }
        return sum;
      }, 0);

      const label = `${start.getDate()}/${start.getMonth() + 1}`;
      result.push({ label, total });
    }
    return result;
  })();

  const maxWeeklyTotal = Math.max(
    ...weeklyData.map((w) => w.total),
    1
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-[#3B2A24]">
          Dashboard
        </h1>
        <p className="text-xs text-[#7A6058]">
          Quick overview of sales and inventory for Atelier de Méa.
        </p>
      </div>

      {loading ? (
        <p className="text-sm text-[#7A6058]">Loading stats…</p>
      ) : (
        <>
          {/* Top stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              label="Revenue (last 30 days)"
              value={`Rs ${revenueLast30.toFixed(0)}`}
              hint="Based on all orders created in the last 30 days"
            />
            <StatCard
              label="Forecast next 30 days"
              value={`Rs ${forecastNext30.toFixed(0)}`}
              hint="Simple forecast using last 30 days average / day"
            />
            <StatCard
              label="Order completion rate"
              value={`${completionRate}%`}
              hint={`${completedOrders}/${totalOrders} orders marked as done`}
            />
          </div>

          {/* Weekly chart */}
          <div className="border border-[#F3E3EC] rounded-xl bg-white p-4">
            <h2 className="text-sm font-semibold text-[#3B2A24] mb-2">
              Sales per week (last 8 weeks)
            </h2>
            {weeklyData.every((w) => w.total === 0) ? (
              <p className="text-xs text-[#7A6058]">
                No sales in the last weeks yet.
              </p>
            ) : (
              <div className="space-y-2">
                <svg
                  viewBox="0 0 100 60"
                  className="w-full h-24 md:h-28"
                  aria-hidden="true"
                >
                  {/* baseline */}
                  <line
                    x1="0"
                    y1="55"
                    x2="100"
                    y2="55"
                    className="stroke-[#F3E3EC]"
                    strokeWidth={0.8}
                  />
                  {weeklyData.map((w, index) => {
                    const step = 100 / weeklyData.length;
                    const barWidth = step - 2;
                    const x = index * step + 1;
                    const barHeight =
                      (w.total / maxWeeklyTotal) * 45; // 0–45
                    const y = 55 - barHeight;

                    return (
                      <g key={index}>
                        <rect
                          x={x}
                          y={y}
                          width={barWidth}
                          height={barHeight}
                          rx={1.5}
                          className="fill-[#C74382]"
                        />
                      </g>
                    );
                  })}
                </svg>

                <div className="flex justify-between text-[10px] text-[#7A6058]">
                  {weeklyData.map((w, index) => (
                    <div
                      key={index}
                      className="flex-1 text-center"
                    >
                      <div>{w.label}</div>
                      <div className="font-semibold">
                        {w.total > 0 ? `Rs ${w.total}` : "–"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Inventory blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-[#F3E3EC] rounded-xl bg-white p-4">
              <h2 className="text-sm font-semibold text-[#3B2A24] mb-2">
                Low stock (≤ 3)
              </h2>
              {lowStock.length === 0 ? (
                <p className="text-xs text-[#7A6058]">
                  No low stock products for now.
                </p>
              ) : (
                <ul className="space-y-2 text-xs">
                  {lowStock.map((p) => (
                    <li
                      key={p.id}
                      className="flex items-center justify-between border border-[#F9EDF5] rounded-lg px-3 py-2"
                    >
                      <div>
                        <div className="text-[#3B2A24] font-medium">
                          {p.name}
                        </div>
                        {p.category && (
                          <div className="text-[11px] text-[#7A6058]">
                            {p.category}
                          </div>
                        )}
                      </div>
                      <div className="text-[11px] text-[#B91C1C] font-semibold">
                        Stock: {p.stock ?? 0}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border border-[#F3E3EC] rounded-xl bg-white p-4">
              <h2 className="text-sm font-semibold text-[#3B2A24] mb-2">
                Out of stock
              </h2>
              {outOfStock.length === 0 ? (
                <p className="text-xs text-[#7A6058]">
                  No products completely out of stock.
                </p>
              ) : (
                <ul className="space-y-2 text-xs">
                  {outOfStock.map((p) => (
                    <li
                      key={p.id}
                      className="flex items-center justify-between border border-[#F9EDF5] rounded-lg px-3 py-2"
                    >
                      <div>
                        <div className="text-[#3B2A24] font-medium">
                          {p.name}
                        </div>
                        {p.category && (
                          <div className="text-[11px] text-[#7A6058]">
                            {p.category}
                          </div>
                        )}
                      </div>
                      <div className="text-[11px] text-[#7A6058] font-semibold">
                        Stock: 0
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="border border-[#F3E3EC] rounded-xl bg-white p-4 flex flex-col gap-1">
      <div className="text-[11px] uppercase tracking-[0.15em] text-[#C74382]">
        {label}
      </div>
      <div className="text-lg font-semibold text-[#3B2A24]">
        {value}
      </div>
      {hint && (
        <div className="text-[11px] text-[#7A6058]">{hint}</div>
      )}
    </div>
  );
}

