// src/app/api/admin/categories/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

type RouteParams = {
  id: string;
};

type RouteContext = {
  params: Promise<RouteParams>;
};

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  const { id } = await params;

  try {
    const body = await req.json();
    const { name, slug, description, image_url } = body;

    const { data, error } = await supabaseServer
      .from("categories")
      .update({
        name,
        slug,
        description: description ?? null,
        image_url: image_url ?? null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select("*")
      .maybeSingle();

    if (error) {
      console.error("Update category error:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    console.error("Update category exception:", err);
    return NextResponse.json(
      { error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  const { id } = await params;

  try {
    const { error } = await supabaseServer
      .from("categories")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete category error:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: any) {
    console.error("Delete category exception:", err);
    return NextResponse.json(
      { error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}
