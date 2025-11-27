import { NextResponse } from "next/server";
import { updateProduct } from "@/lib/products";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const body = await req.json();

  try {
    const updated = await updateProduct(id, body);
    return NextResponse.json({ data: updated });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? "Failed to update product" },
      { status: 500 }
    );
  }
}
