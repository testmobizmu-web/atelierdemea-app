// src/lib/orders.ts
"use client";

import { supabase } from "./supabaseClient";

export type CartItem = {
  product_id: string; // your internal product id / slug
  name: string;
  price: number;
  quantity: number;
};

export type Order = {
  id: string;
  created_at: string;
  user_id?: string | null;
  customer_name: string | null;
  customer_phone: string | null;
  customer_address: string | null;
  notes: string | null;
  status: string;
  payment_method: string | null;
  total_amount: number;
  currency?: string | null;
};

export type OrderItem = {
  id: string;
  created_at: string;
  order_id: string;
  product_id: string | null;
  name: string;
  unit_price: number;
  quantity: number;
  line_total?: number;
};

export type OrderWithItems = Order & {
  items: OrderItem[];
};

/**
 * Build a WhatsApp order message text.
 */
export function buildWhatsAppOrderMessage(params: {
  items: CartItem[];
  customer_name?: string;
  customer_phone?: string;
  customer_address?: string;
  notes?: string;
}) {
  const { items, customer_name, customer_phone, customer_address, notes } =
    params;

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const lines: string[] = [];

  lines.push("🧕 Atelier de Méa – New order");
  lines.push("");
  lines.push("Items:");

  items.forEach((item, idx) => {
    lines.push(
      `${idx + 1}. ${item.name} × ${item.quantity} — Rs ${
        item.price * item.quantity
      }`
    );
  });

  lines.push("");
  lines.push(`Total: Rs ${total}`);
  lines.push("");

  if (customer_name) lines.push(`👤 Name: ${customer_name}`);
  if (customer_phone) lines.push(`📞 Phone: ${customer_phone}`);
  if (customer_address) lines.push(`📍 Address: ${customer_address}`);
  if (notes) {
    lines.push("");
    lines.push(`📝 Notes: ${notes}`);
  }

  lines.push("");
  lines.push("Sent from atelierdemea.com ✨");

  return lines.join("\n");
}

/**
 * Save order + items to Supabase.
 * Requires the customer to be logged in (because of RLS on user_id).
 */
export async function createOrderInSupabase(params: {
  customer_name?: string;
  customer_phone?: string;
  customer_address?: string;
  notes?: string;
  payment_method?: string;
  items: CartItem[];
}): Promise<OrderWithItems | null> {
  const {
    customer_name = null,
    customer_phone = null,
    customer_address = null,
    notes = null,
    payment_method = null,
    items,
  } = params;

  if (!items || items.length === 0) {
    throw new Error("No items in order");
  }

  // Make sure user is logged in – required for user_id and RLS
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("createOrderInSupabase: no authenticated user", userError);
    throw new Error("You must be logged in to place an order.");
  }

  const total_amount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Insert order row
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      customer_name,
      customer_phone,
      customer_address,
      notes,
      payment_method,
      status: "pending",
      total_amount,
    })
    .select("*")
    .single();

  if (orderError || !order) {
    console.error("Error inserting order:", orderError);
    throw new Error(orderError?.message || "Failed to create order");
  }

  // Insert related order_items
  const itemsPayload = items.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    name: item.name,
    unit_price: item.price,
    quantity: item.quantity,
    line_total: item.price * item.quantity,
  }));

  const { data: orderItems, error: itemsError } = await supabase
    .from("order_items")
    .insert(itemsPayload)
    .select("*");

  if (itemsError || !orderItems) {
    console.error("Error inserting order_items:", itemsError);
    throw new Error(itemsError?.message || "Failed to create order_items");
  }

  return {
    ...(order as Order),
    items: orderItems as OrderItem[],
  };
}

/**
 * Fetch recent orders with items.
 * With current RLS this returns *only* orders for the logged-in user.
 */
export async function getRecentOrdersWithItems(limit = 50) {
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching orders:", error);
    return [];
  }

  return (data ?? []).map((row: any) => ({
    ...(row as Order),
    items: (row.order_items ?? []) as OrderItem[],
  })) as OrderWithItems[];
}
