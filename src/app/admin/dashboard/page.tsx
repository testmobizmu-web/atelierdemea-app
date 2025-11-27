"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Order = {
  id: string;
  created_at: string;
  status: string;
  total_amount: number;
};

type Product = {
  id: string;
  name: string;
  stock: number | null;
};

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        // dashboard route itself should already protect, but just in case
        window.location.href = "/admin/login";
        return;
      }

      // Orders last 30 days
      const since = daysAgo(30).toISOString();

      const [{ data: orderRows }, { data: productRows }] =
        await Promise.all([
          supabase
            .from("orders")
            .select("id, created_at, status, total_amount")
            .gte("created_at", since),
          supabase
            .from("products")
            .select("id, name, stock"),
        ]);

      setOrders((orderRows ?? []) as Order[]);
      setProducts((productRows ?? []) as Product[]);
      setLoading(false);
    })();
  }, []);

  // ====== KPIs ======
  const today = startOfDay(new Date());
  const weekStart = startOfDay(daysAgo(6)); // last 7 days

  const todaySales = orders
    .filter((o) => startOfDay(new Date(o.created_at)) >= today)
    .reduce((sum, o) => sum + (o.total_amount || 0), 0);

  const thisWeekSales = orders
    .filter(
      (o) => new Date(o.created_at).getTime() >= weekStart.getTime()
    )
    .reduce((sum, o) => sum + (o.total_amount || 0), 0);

  const lastWeekStart = startOfDay(daysAgo(13));
  const lastWeekEnd = startOfDay(daysAgo(7));

  const lastWeekSales = orders
    .filter((o) => {
      const d = new Date(o.created_at);
      return (
        d.getTime() >= lastWeekStart.getTime() &&
        d.getTime() < lastWeekEnd.getTime()
      );
    })
    .reduce((sum, o) => sum + (o.total_amount || 0), 0);

  let weekDelta = 0;
  if (lastWeekSales > 0) {
    weekDelta =
      ((thisWeekSales - lastWeekSales) / lastWeekSales) * 100;
  } else if (thisWeekSales > 0) {
    weekDelta = 100;
  }

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    (o) => o.status === "pending" || o.status === "confirmed"
  ).length;
  const completedOrders = orders.filter(
    (o) => o.status === "completed"
  ).length;

  // low stock list
  const lowStock = products
    .filter((p) => (p.stock ?? 0) > 0 && (p.stock ?? 0) <= 5)
    .sort((a, b) => (a.stock ?? 0) - (b.stock ?? 0))
    .slice(0, 5);

  const weekArrow = weekDelta >= 0 ? "▲" : "▼";
  const weekColor =
    weekDelta > 0
      ? "text-[#15803d]"
      : weekDelta < 0
      ? "text-[#b91c1c]"
      : "text-[#7A6058]";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-[#3B2A24]">
          Dashboard
        </h1>
        <p className="text-xs text-[#7A6058]">
          Overview of Atelier de Méa orders & inventory (last 30 days).
        </p>
      </div>

      {loading ? (
        <p className="text-sm text-[#7A6058]">Loading metrics…</p>
      ) : (
        <>
          {/* KPI Row */}
          <div className="grid gap-4 md:grid-cols-4">
            {/* Today’s sales */}
            <div className="rounded-2xl bg-gradient-to-br from-[#FFE4F2] via-[#FFF7FC] to-[#FDF2FF] border border-[#F3E3EC] px-4 py-3 shadow-sm">
              <div className="text-[11px] uppercase tracking-[0.18em] text-[#C74382] mb-1">
                Today’s sales
              </div>
              <div className="text-2xl font-semibold text-[#3B2A24]">
                Rs {todaySales.toFixed(0)}
              </div>
              <div className="mt-1 text-[11px] text-[#7A6058]">
                Completed & confirmed orders only.
              </div>
            </div>

            {/* This week total */}
            <div className="rounded-2xl bg-white border border-[#F3E3EC] px-4 py-3 shadow-sm">
              <div className="text-[11px] uppercase tracking-[0.18em] text-[#C74382] mb-1">
                This week (7 days)
              </div>
              <div className="text-2xl font-semibold text-[#3B2A24]">
                Rs {thisWeekSales.toFixed(0)}
              </div>
              <div className="mt-1 text-[11px] text-[#7A6058]">
                Vs last week in tile on the right.
              </div>
            </div>

            {/* Orders count */}
            <div className="rounded-2xl bg-white border border-[#F3E3EC] px-4 py-3 shadow-sm">
              <div className="text-[11px] uppercase tracking-[0.18em] text-[#C74382] mb-1">
                Orders (30 days)
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold text-[#3B2A24]">
                  {totalOrders}
                </span>
                <span className="text-[11px] text-[#7A6058]">
                  {pendingOrders} pending · {completedOrders} completed
                </span>
              </div>
            </div>

            {/* This week vs last week tile */}
            <div className="rounded-2xl bg-gradient-to-br from-[#FDF2FF] via-[#FFF7FC] to-[#FFE4F2] border border-[#F3E3EC] px-4 py-3 shadow-sm">
              <div className="text-[11px] uppercase tracking-[0.18em] text-[#C74382] mb-1">
                This week vs last week
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xl font-semibold ${weekColor}`}>
                  {weekArrow} {Math.abs(weekDelta).toFixed(1)}%
                </span>
              </div>
              <div className="mt-1 text-[11px] text-[#7A6058]">
                This week: Rs {thisWeekSales.toFixed(0)} · Last week: Rs{" "}
                {lastWeekSales.toFixed(0)}
              </div>
            </div>
          </div>

          {/* Low stock card */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-white border border-[#F3E3EC] px-4 py-3 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-semibold text-[#3B2A24]">
                  Low stock alert
                </h2>
                <span className="text-[11px] text-[#C74382]">
                  {lowStock.length ? `${lowStock.length} items` : "All good"}
                </span>
              </div>
              {lowStock.length === 0 ? (
                <p className="text-xs text-[#7A6058]">
                  No products below 5 units.
                </p>
              ) : (
                <ul className="space-y-1">
                  {lowStock.map((p) => (
                    <li
                      key={p.id}
                      className="flex items-center justify-between text-xs text-[#7A6058]"
                    >
                      <span className="truncate max-w-[70%]">
                        {p.name}
                      </span>
                      <span className="text-[#B91C1C] font-medium">
                        {p.stock} left
                      </span>
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
