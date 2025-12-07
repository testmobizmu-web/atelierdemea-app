// src/app/api/admin/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import type { ProductVariant } from "@/lib/products";

type ProductPayload = {
  name: string;
  slug: string;
  price: number;
  sale_price?: number | null;
  category?: string | null;
  stock?: number | null;

  images: string[];

  short_description: string;
  long_description: string;

  is_featured: boolean;
  is_new: boolean;
  is_best_seller: boolean;
  is_on_sale: boolean;
  is_limited: boolean;

  variants: ProductVariant[];
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ProductPayload;

    // --- Validation ---
    if (!body.name || !body.slug || body.price == null) {
      return NextResponse.json(
        { error: "Missing required fields: name, slug, price" },
        { status: 400 }
      );
    }

    // --- Insert into Supabase ---
    const { data, error } = await supabaseServer
      .from("products")
      .insert({
        name: body.name,
        slug: body.slug,
        price: body.price,
        sale_price: body.sale_price ?? null,
        category: body.category ?? null,
        stock: body.stock ?? null,
        images: body.images ?? [],
        short_description: body.short_description,
        long_description: body.long_description,

        is_featured: body.is_featured,
        is_new: body.is_new,
        is_best_seller: body.is_best_seller,
        is_on_sale: body.is_on_sale,
        is_limited: body.is_limited,

        variants: body.variants ?? [],
      })
      .select("*")
      .single();

    if (error) {
      console.error("Supabase Insert Error:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { product: data },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("POST /api/admin/products ERROR:", err);
    return NextResponse.json(
      { error: err?.message ?? "Unexpected error" },
      { status: 500 }
    );
  }
}
