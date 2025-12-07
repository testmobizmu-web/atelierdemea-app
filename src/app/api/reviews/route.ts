// src/app/api/reviews/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") ?? "";
    let payload: any = {};

    // Accept both JSON (from our client component) and classic form POST
    if (contentType.includes("application/json")) {
      payload = await req.json();
    } else {
      const form = await req.formData();
      payload = {
        product_id: form.get("product_id")?.toString() ?? null,
        name: form.get("name")?.toString() ?? "",
        email: form.get("email")?.toString() ?? "",
        rating: form.get("rating")
          ? Number(form.get("rating"))
          : null,
        message: form.get("message")?.toString() ?? "",
      };
    }

    const { product_id, name, email, rating, message } = payload;

    if (!name || !message) {
      return NextResponse.json(
        { error: "Name and message are required" },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("reviews").insert({
      product_id: product_id ?? null,
      name,
      email: email || null,
      rating: rating ?? null,
      message,
      approved: false, // owner approves in dashboard
    });

    if (error) {
      console.error("Error inserting review", error);
      return NextResponse.json(
        { error: "Could not save review" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Unexpected review error", err);
    return NextResponse.json(
      { error: "Could not save review" },
      { status: 500 }
    );
  }
}
