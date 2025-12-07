// src/app/api/admin/categories/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

type CategoryPayload = {
  name: string;
  slug: string;
  image_url?: string | null;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CategoryPayload;

    if (!body.name || !body.slug) {
      return NextResponse.json(
        { error: "Missing required fields: name, slug" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseServer
      .from("categories")
      .insert({
        name: body.name,
        slug: body.slug,
        image_url: body.image_url ?? null,
      })
      .select("*")
      .single();

    if (error) {
      console.error("Insert category error:", error);
      return NextResponse.json(
        { error: error.message ?? "Failed to insert category" },
        { status: 500 }
      );
    }

    return NextResponse.json({ category: data }, { status: 201 });
  } catch (err: any) {
    console.error("POST /api/admin/categories error:", err);
    return NextResponse.json(
      { error: err?.message ?? "Unexpected error" },
      { status: 500 }
    );
  }
}
