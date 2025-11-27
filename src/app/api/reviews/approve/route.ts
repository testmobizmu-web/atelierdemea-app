// src/app/api/reviews/approve/route.ts
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
    const approvedStr = String(formData.get("approved") || "");
    const approved = approvedStr === "true";

    if (!id) {
      return NextResponse.json(
        { error: "Missing review id" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("reviews")
      .update({ approved })
      .eq("id", id);

    if (error) {
      console.error("DEBUG /api/reviews/approve – Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to update review" },
        { status: 500 }
      );
    }

    // After action, go back to admin list
    return NextResponse.redirect(
      new URL("/admin/reviews", req.url),
      303
    );
  } catch (err) {
    console.error("DEBUG /api/reviews/approve – error:", err);
    return NextResponse.json(
      { error: "Unexpected error" },
      { status: 500 }
    );
  }
}
