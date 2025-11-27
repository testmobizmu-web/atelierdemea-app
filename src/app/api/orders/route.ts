import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
// If you have a service role key & stricter RLS, you can swap to:
// const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

type IncomingItem = {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  slug?: string;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const items = (body.items || []) as IncomingItem[];

    if (!items.length) {
      return NextResponse.json(
        { error: "No items in order" },
        { status: 400 }
      );
    }

    const totalAmount = items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );

    // 👇 New fields we’ll show in admin
    const customerName = body.customer_name ?? null;
    const customerPhone = body.customer_phone ?? null;
    const customerEmail = body.customer_email ?? null;
    const addressLine1 = body.address_line1 ?? null;
    const city = body.city ?? null;
    const notes = body.notes ?? null;
    const paymentMethod = body.payment_method ?? "COD";
    const whatsappNumber = "+23059117549";

    // 1) Create order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        status: "pending",
        customer_name: customerName,
        customer_phone: customerPhone,
        customer_email: customerEmail,
        address_line1: addressLine1,
        city,
        notes,
        total_amount: totalAmount,
        payment_method: paymentMethod,
        whatsapp_number: whatsappNumber,
      })
      .select()
      .single();

    if (orderError || !order) {
      console.error("Order insert error", orderError);
      return NextResponse.json(
        { error: "Could not create order" },
        { status: 500 }
      );
    }

    // 2) Order items
    const orderItemsPayload = items.map((i) => ({
      order_id: order.id,
      product_id: i.product_id,
      product_name: i.name,
      unit_price: i.price,
      quantity: i.quantity,
      line_total: i.price * i.quantity,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItemsPayload);

    if (itemsError) {
      console.error("Order items insert error", itemsError);
      return NextResponse.json(
        { error: "Could not create order items" },
        { status: 500 }
      );
    }

    // 3) WhatsApp summary for you
    const lines = [
      "Bonjour Atelier de Méa 👋",
      "",
      "Nouvelle commande via le site :",
      "",
      ...items.map(
        (i) =>
          `• ${i.name} x${i.quantity} — Rs ${i.price * i.quantity}`
      ),
      "",
      `Total approximatif : Rs ${totalAmount}`,
      "",
      `Client : ${customerName || "N/A"}`,
      customerPhone ? `Téléphone : ${customerPhone}` : "",
      customerEmail ? `Email : ${customerEmail}` : "",
      addressLine1 || city
        ? `Adresse : ${[addressLine1, city].filter(Boolean).join(", ")}`
        : "",
      notes ? `Notes client : ${notes}` : "",
      "",
      "Mode de paiement : " +
        (paymentMethod === "COD"
          ? "Cash on Delivery"
          : paymentMethod),
      "",
      "Merci de me confirmer la disponibilité 🙏",
    ].filter(Boolean);

    const message = encodeURIComponent(lines.join("\n"));
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(
      /[^0-9]/g,
      ""
    )}?text=${message}`;

    return NextResponse.json({
      success: true,
      orderId: order.id,
      whatsappUrl,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Unexpected error" },
      { status: 500 }
    );
  }
}


