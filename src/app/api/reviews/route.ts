// src/app/api/reviews/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// POST -> create a new review (homepage form)
export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let body: any;

    if (contentType.includes("application/json")) {
      body = await req.json();
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await req.formData();
      body = Object.fromEntries(formData.entries());
    } else {
      return NextResponse.json(
        { error: "Unsupported content type" },
        { status: 400 }
      );
    }

    const name = String(body.name ?? "").trim();
    const message = String(body.message ?? "").trim();
    const email = body.email ? String(body.email).trim() : null;
    const rating =
      body.rating !== undefined && body.rating !== null
        ? Number(body.rating)
        : null;

    if (!name || !message) {
      return NextResponse.json(
        { error: "Name and review message are required." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("reviews")
      .insert({
        name,
        email,
        rating,
        message,
        approved: false, // you will approve from admin later
      })
      .select()
      .single();

    if (error) {
      console.error("Review insert error:", error);
      return NextResponse.json(
        { error: "Could not save review" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, review: data });
  } catch (err) {
    console.error("Review POST error:", err);
    return NextResponse.json(
      { error: "Unexpected error" },
      { status: 500 }
    );
  }
}

// GET -> list reviews (optionally approved only)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const approvedOnly = searchParams.get("approved") === "1";

    let query = supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (approvedOnly) {
      query = query.eq("approved", true);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Review list error:", error);
      return NextResponse.json(
        { error: "Could not load reviews" },
        { status: 500 }
      );
    }

    return NextResponse.json({ reviews: data ?? [] });
  } catch (err) {
    console.error("Review GET error:", err);
    return NextResponse.json(
      { error: "Unexpected error" },
      { status: 500 }
    );
  }
}
