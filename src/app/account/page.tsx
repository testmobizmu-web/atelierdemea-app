"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";

type Order = {
  id: string;
  status: string;
  total_amount: number;
  currency: string;
  created_at: string;
};

export default function AccountPage() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const supabase = getSupabaseBrowserClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      setUserEmail(user.email ?? null);

      const { data: ordersData } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      setOrders(ordersData || []);
      setLoading(false);
    };

    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fff7fb]">
        <p className="text-sm text-[#a36d63]">Loading your account…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff7fb] px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-semibold text-[#47201d] mb-1">
          My Account
        </h1>
        <p className="text-xs sm:text-sm text-[#a36d63] mb-6">
          Logged in as {userEmail}
        </p>

        <section className="mb-8">
          <h2 className="text-sm sm:text-base font-semibold text-[#47201d] mb-3">
            My Orders
          </h2>

          {orders.length === 0 ? (
            <p className="text-xs text-[#a36d63]">
              You have no orders yet.{" "}
              <Link href="/shop" className="text-[#e11d70] underline">
                Start shopping →
              </Link>
            </p>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-2xl border border-[#fde7f1] bg-white px-4 py-3 text-xs sm:text-sm text-[#47201d] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                >
                  <div>
                    <div className="font-semibold">
                      Order #{order.id.slice(0, 8)}
                    </div>
                    <div className="text-[11px] text-[#a36d63]">
                      {new Date(order.created_at).toLocaleString("en-MU")}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-[#e11d70]">
                      {order.currency} {order.total_amount.toFixed(2)}
                    </span>
                    <span className="rounded-full bg-[#fff1f7] px-3 py-1 text-[11px] text-[#a36d63]">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
