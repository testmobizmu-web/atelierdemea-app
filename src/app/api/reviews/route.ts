import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const name = form.get("name")?.toString() || "";
    const email = form.get("email")?.toString() || "";
    const rating = form.get("rating")?.toString() || "";
    const message = form.get("message")?.toString() || "";

    if (!name || !message) {
      const url = new URL(req.url);
      url.pathname = "/";
      url.searchParams.set("review", "error");
      return NextResponse.redirect(url, 303);
    }

    const ratingNum = rating ? Math.max(1, Math.min(5, Number(rating))) : null;

    const { error } = await supabase.from("reviews").insert({
      name,
      email: email || null,
      rating: ratingNum,
      message,
      published: false, // admin will approve later
    });

    if (error) throw error;

    const url = new URL(req.url);
    url.pathname = "/";
    url.searchParams.set("review", "thanks");
    return NextResponse.redirect(url, 303);
  } catch (err) {
    console.error("Review submit error:", err);

    const url = new URL(req.url);
    url.pathname = "/";
    url.searchParams.set("review", "error");
    return NextResponse.redirect(url, 303);
  }
}

// GET: public reviews for carousel
export async function GET() {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// src/app/api/reviews/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// ⚠️ This route is server-only; do NOT import it in client components
const supabase = createClient(supabaseUrl, supabaseKey);

// POST  -> create a new review (from homepage form)
export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let payload: {
      name: string;
      email?: string | null;
      rating?: number | null;
      message: string;
      source_page?: string | null;
    };

    if (contentType.includes("application/json")) {
      // If you ever send JSON
      const body = await req.json();
      payload = body;
    } else {
      // Our homepage uses <form method="POST"> → formData
      const formData = await req.formData();
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const ratingStr = String(formData.get("rating") || "").trim();
      const message = String(formData.get("message") || "").trim();

      if (!name || !message) {
        return NextResponse.json(
          { error: "Name and message are required" },
          { status: 400 }
        );
      }

      payload = {
        name,
        email: email || null,
        rating: ratingStr ? Number(ratingStr) : null,
        message,
        source_page: "/", // homepage by default
      };
    }

    const { data, error } = await supabase
      .from("reviews")
      .insert({
        name: payload.name,
        email: payload.email,
        rating: payload.rating,
        message: payload.message,
        source_page: payload.source_page ?? "/",
        approved: false, // always pending
      })
      .select()
      .single();

    if (error) {
      console.error("DEBUG /api/reviews POST – Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to save review" },
        { status: 500 }
      );
    }

    // 🔁 If you want: trigger email notification here later (Resend, Mailgun, etc.)

    // For form submit: redirect back with a small success flag in URL
    if (!contentType.includes("application/json")) {
      return NextResponse.redirect(
        new URL("/?review_submitted=1", req.url),
        303
      );
    }

    return NextResponse.json({ success: true, review: data });
  } catch (err) {
    console.error("DEBUG /api/reviews POST – error:", err);
    return NextResponse.json(
      { error: "Unexpected error while saving review" },
      { status: 500 }
    );
  }
}

// GET -> list reviews (optionally only approved)
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
      console.error("DEBUG /api/reviews GET – Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to fetch reviews" },
        { status: 500 }
      );
    }

    return NextResponse.json({ reviews: data ?? [] });
  } catch (err) {
    console.error("DEBUG /api/reviews GET – error:", err);
    return NextResponse.json(
      { error: "Unexpected error while fetching reviews" },
      { status: 500 }
    );
  }
}
