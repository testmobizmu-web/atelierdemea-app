// src/app/api/admin/products/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { updateProduct, ProductUpdateInput } from "@/lib/products";

/**
 * PUT /api/admin/products/[id]
 * Body: partial product fields to update
 */
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const body = (await req.json()) as ProductUpdateInput;

    // You can restrict which fields are allowed here if you want:
    const updates: ProductUpdateInput = {
      name: body.name,
      slug: body.slug,
      price: body.price,
      short_description: body.short_description,
      long_description: body.long_description,
      category: body.category,
      color: body.color,
      variant: body.variant,
      stock: body.stock,
      image_url: body.image_url,
      is_featured: body.is_featured,
    };

    const updated = await updateProduct(id, updates);

    return NextResponse.json({ data: updated });
  } catch (err: any) {
    console.error("Admin update product error:", err);
    return NextResponse.json(
      { error: err?.message ?? "Error updating product" },
      { status: 500 }
    );
  }
}
