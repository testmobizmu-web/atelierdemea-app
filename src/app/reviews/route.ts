// src/app/api/reviews/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient"; // same client you use in lib/products.ts

export async function POST(req: Request) {
  try {
    // Form is sending x-www-form-urlencoded
    const formData = await req.formData();

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const ratingRaw = String(formData.get("rating") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const rating = ratingRaw ? parseInt(ratingRaw, 10) : null;

    // Basic validation
    if (!name || !message) {
      return NextResponse.redirect(
        new URL("/?review=missing_fields", req.url),
        303
      );
    }

    // Optional: clamp rating between 1–5 or set null
    const safeRating =
      rating && rating >= 1 && rating <= 5 ? rating : null;

    const { error } = await supabase.from("reviews").insert([
      {
        name,
        email: email || null,
        rating: safeRating,
        message,
        approved: false, // admin will approve in dashboard
      },
    ]);

    if (error) {
      console.error("DEBUG /api/reviews insert error:", error);
      return NextResponse.redirect(
        new URL("/?review=error", req.url),
        303
      );
    }

    // Optional: later you can trigger email notification to owner here

    return NextResponse.redirect(
      new URL("/?review=sent", req.url),
      303
    );
  } catch (err) {
    console.error("DEBUG /api/reviews exception:", err);
    return NextResponse.redirect(
      new URL("/?review=error", req.url),
      303
    );
  }
}
