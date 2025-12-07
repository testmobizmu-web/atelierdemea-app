"use client";

import { useState } from "react";

type Review = {
  id: string;
  created_at: string;
  name: string | null;
  rating: number | null;
  message: string | null;
};

type Props = {
  productId: string;
  productName: string;
  initialReviews: Review[];
};

export default function ProductReviewsClient({
  productId,
  productName,
  initialReviews,
}: Props) {
  const [reviews] = useState(initialReviews); // only approved ones
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    const form = new FormData(e.currentTarget);

    const payload = {
      product_id: productId,
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      rating: form.get("rating")
        ? Number(form.get("rating"))
        : null,
      message: String(form.get("message") || ""),
    };

    if (!payload.name || !payload.message) {
      setError("Name and review are required.");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(
        data.error ||
          "Could not send your review. Please try again."
      );
      setLoading(false);
      return;
    }

    setSuccess(
      "Thank you! Your review has been sent for approval and will appear here after validation."
    );
    (e.currentTarget as HTMLFormElement).reset();
    setLoading(false);
  }

  return (
    <section className="mt-10 border-t border-[#fde7f1] pt-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-lg sm:text-xl font-semibold text-[#47201d] mb-1">
          Reviews for {productName}
        </h2>
        <p className="text-xs sm:text-sm text-[#a36d63] mb-5">
          What other queens say about this piece. Only approved
          reviews appear here.
        </p>

        {/* Approved reviews list */}
        {reviews.length === 0 ? (
          <p className="text-xs sm:text-sm text-[#a36d63] mb-6">
            No reviews yet for this product. Be the first to share
            your experience 💗
          </p>
        ) : (
          <div className="mb-6 grid gap-3 sm:gap-4 sm:grid-cols-2">
            {reviews.map((review) => (
              <figure
                key={review.id}
                className="rounded-3xl border border-[#fde7f1] bg-white px-4 py-4 sm:px-5 sm:py-5 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#fb7185] via-[#ec4899] to-[#f97316] flex items-center justify-center text-white text-xs font-semibold">
                    {(review.name ?? "?")
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#47201d]">
                      {review.name || "Customer"}
                    </div>
                    {review.rating ? (
                      <div className="text-[11px] text-[#e11d70]">
                        {"⭐".repeat(review.rating)}
                      </div>
                    ) : null}
                  </div>
                </div>
                <blockquote className="text-xs sm:text-sm text-[#47201d]">
                  “{review.message}”
                </blockquote>
              </figure>
            ))}
          </div>
        )}

        {/* Review form */}
        <form
          onSubmit={handleSubmit}
          className="mt-4 grid gap-4 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)] bg-[#fff7fb] border border-[#fde7f1] rounded-3xl px-4 py-4 sm:px-6 sm:py-5"
        >
          <div className="space-y-3">
            <h3 className="text-sm sm:text-base font-semibold text-[#47201d]">
              Leave a review
            </h3>
            <p className="text-[11px] sm:text-xs text-[#a36d63]">
              Share your experience with Atelier de Méa. Your review
              will be published after approval.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium">
                  Name *
                </label>
                <input
                  name="name"
                  required
                  className="rounded-full border border-[#f9a8d4] px-3 py-2 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#f9a8d4]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium">
                  Email (not shown)
                </label>
                <input
                  name="email"
                  type="email"
                  className="rounded-full border border-[#f9a8d4] px-3 py-2 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#f9a8d4]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium">
                  Rating
                </label>
                <select
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
              <label className="text-[11px] font-medium">
                Your review *
              </label>
              <textarea
                name="message"
                required
                rows={4}
                className="rounded-2xl border border-[#f9a8d4] px-3 py-2 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#f9a8d4] resize-vertical"
                placeholder="Tell us what you loved about this piece…"
              />
            </div>

            {error && (
              <p className="text-[11px] text-[#b91c1c] bg-[#fee2e2] rounded-full px-3 py-1">
                {error}
              </p>
            )}
            {success && (
              <p className="text-[11px] text-[#166534] bg-[#dcfce7] rounded-full px-3 py-1">
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="self-start inline-flex items-center rounded-full bg-[#ec4899] px-5 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#db2777] transition disabled:opacity-60"
            >
              {loading ? "Sending…" : "Submit review"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
