// src/lib/adminOrders.ts
import { supabaseAdmin } from "@/lib/supabaseClient";

type OrderRow = { id: string };
type OrderItemRow = {
  quantity: number | null;
  line_total: number | string | null;
};

export type SalesStats = {
  totalSales: number;
  totalOrders: number;
  totalItems: number;
};

export async function getSalesStats(): Promise<SalesStats> {
  if (!supabaseAdmin) {
    console.warn(
      "getSalesStats: supabaseAdmin is not configured. Returning zero stats."
    );
    return {
      totalSales: 0,
      totalOrders: 0,
      totalItems: 0,
    };
  }

  try {
    const [
      { data: orders, error: ordersError },
      { data: items, error: itemsError },
    ] = await Promise.all([
      supabaseAdmin.from("orders").select("id"),
      supabaseAdmin.from("order_items").select("quantity, line_total"),
    ]);

    if (ordersError) {
      console.warn("getSalesStats orders error:", ordersError);
    }
    if (itemsError) {
      console.warn("getSalesStats order_items error (ignored):", itemsError);
      // If we can't read items, still return orders count but 0 sales
      const totalOrders = (orders as OrderRow[] | null)?.length ?? 0;
      return { totalSales: 0, totalOrders, totalItems: 0 };
    }

    const totalOrders = (orders as OrderRow[] | null)?.length ?? 0;

    let totalSales = 0;
    let totalItems = 0;

    if (items) {
      for (const item of items as OrderItemRow[]) {
        const qty = item.quantity ?? 0;
        const lineTotal = Number(item.line_total ?? 0);
        totalItems += qty;
        totalSales += lineTotal;
      }
    }

    return { totalSales, totalOrders, totalItems };
  } catch (err) {
    console.warn("getSalesStats unexpected error:", err);
    return {
      totalSales: 0,
      totalOrders: 0,
      totalItems: 0,
    };
  }
}

