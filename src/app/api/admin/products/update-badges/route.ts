import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      productId,
      is_featured,
      is_new,
      is_best_seller,
      is_on_sale,
      sale_badge_label,
    } = body || {};

    if (!productId) {
      return NextResponse.json(
        { error: "productId is required" },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json(
        { error: "Supabase env vars missing" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, serviceKey);

    // Build update object only with defined keys (avoid overwriting with null)
    const update: Record<string, any> = {};
    if (typeof is_featured === "boolean") update.is_featured = is_featured;
    if (typeof is_new === "boolean") update.is_new = is_new;
    if (typeof is_best_seller === "boolean")
      update.is_best_seller = is_best_seller;
    if (typeof is_on_sale === "boolean") update.is_on_sale = is_on_sale;
    if (typeof sale_badge_label === "string")
      update.sale_badge_label = sale_badge_label;

    if (Object.keys(update).length === 0) {
      return NextResponse.json(
        { error: "Nothing to update" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("products")
      .update(update)
      .eq("id", productId);

    if (error) {
      console.error("Supabase update error:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("update-badges route error:", err);
    return NextResponse.json(
      { error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}
