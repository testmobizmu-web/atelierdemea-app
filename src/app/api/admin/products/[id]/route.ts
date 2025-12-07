// src/app/api/admin/products/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

// NOTE: Next 16 validator expects params to be a Promise<{ id: string }>
type RouteContext = {
  params: Promise<{ id: string }>;
};

// DELETE /api/admin/products/[id]
export async function DELETE(_req: NextRequest, context: RouteContext) {
  // ✅ Await the params to get the ID
  const { id } = await context.params;

  try {
    const { error } = await supabaseServer
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete product error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: any) {
    console.error("DELETE /api/admin/products/[id] exception:", err);
    return NextResponse.json(
      { error: err?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}

