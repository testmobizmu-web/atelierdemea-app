// src/app/api/reviews/delete/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const id = String(formData.get("id") || "");

    if (!id) {
      return NextResponse.json(
        { error: "Missing review id" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("reviews")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("DEBUG /api/reviews/delete – Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to delete review" },
        { status: 500 }
      );
    }

    return NextResponse.redirect(
      new URL("/admin/reviews", req.url),
      303
    );
  } catch (err) {
    console.error("DEBUG /api/reviews/delete – error:", err);
    return NextResponse.json(
      { error: "Unexpected error" },
      { status: 500 }
    );
  }
}
