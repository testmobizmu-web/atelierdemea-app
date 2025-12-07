// src/components/reviews/ReviewForm.tsx
"use client";

import { useState } from "react";

export default function ReviewForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim() || null,
      rating: formData.get("rating")
        ? Number(formData.get("rating"))
        : null,
      message: String(formData.get("message") || "").trim(),
    };

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || data.error) {
        throw new Error(data.error || "Could not save review");
      }

      // ✅ success – clear form and show pink message
      form.reset();
      setSuccess(
        "Merci 💗 Votre avis a été envoyé. Il apparaîtra après validation par Atelier de Méa."
      );
    } catch (err: any) {
      console.error("Review submit error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 grid gap-4 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)] bg-white/60 border border-[#fde7f1] rounded-3xl px-4 py-4 sm:px-6 sm:py-5"
    >
      <div className="space-y-3">
        <h3 className="text-sm sm:text-base font-semibold text-[#47201d]">
          Leave a review
        </h3>
        <p className="text-[11px] sm:text-xs text-[#a36d63]">
          Share your experience with Atelier de Méa. Your review may
          appear on this page after moderation.
        </p>

        {success && (
          <div className="rounded-full border border-[#f9a8d4] bg-[#ffe4f3] px-3 py-1 text-[11px] text-[#9d174d]">
            {success}
          </div>
        )}

        {error && (
          <div className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-[11px] text-red-700">
            {error}
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="review-name" className="text-[11px] font-medium">
              Name *
            </label>
            <input
              id="review-name"
              name="name"
              required
              className="rounded-full border border-[#f9a8d4] px-3 py-2 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#f9a8d4]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="review-email" className="text-[11px] font-medium">
              Email (not shown)
            </label>
            <input
              id="review-email"
              name="email"
              type="email"
              className="rounded-full border border-[#f9a8d4] px-3 py-2 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#f9a8d4]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="review-rating" className="text-[11px] font-medium">
              Rating
            </label>
            <select
              id="review-rating"
              name="rating"
              className="rounded-full border border-[#f9a8d4] px-3 py-2 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#f9a8d4]"
            >
              <option value="">Select…</option>
              <option value="5">⭐⭐⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="2">⭐⭐</option>
              <option value="1">⭐</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1 flex-1">
          <label
            htmlFor="review-message"
            className="text-[11px] font-medium"
          >
            Your review *
          </label>
          <textarea
            id="review-message"
            name="message"
            required
            rows={4}
            className="rounded-2xl border border-[#f9a8d4] px-3 py-2 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#f9a8d4] resize-vertical"
            placeholder="Tell us what you loved about your Atelier de Méa piece…"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="self-start inline-flex items-center rounded-full bg-[#ec4899] px-5 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#db2777] transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Sending your review…" : "Submit review"}
        </button>

        <p className="text-[10px] sm:text-[11px] text-[#a36d63]">
          By submitting, you agree that your review may be published
          on this website. We only show your first name.
        </p>
      </div>
    </form>
  );
}
