// src/app/admin/reviews/page.tsx
import { createClient } from "@supabase/supabase-js";
import dayjs from "dayjs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

type Review = {
  id: string;
  name: string;
  email: string | null;
  rating: number | null;
  message: string;
  approved: boolean;
  source_page: string | null;
  created_at: string;
};

export const revalidate = 0; // always fresh

export default async function AdminReviewsPage() {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });

  const reviews: Review[] = data ?? [];

  return (
    <main className="min-h-screen bg-[#f9fafb] text-[#111827]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-2">
          Reviews moderation – Atelier de Méa
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Approve, unapprove or delete reviews submitted from the homepage.
        </p>

        {error && (
          <p className="text-sm text-red-600 mb-4">
            Failed to load reviews: {error.message}
          </p>
        )}

        {reviews.length === 0 ? (
          <p className="text-sm text-gray-500">
            No reviews yet. Once customers submit reviews, they will appear
            here.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="min-w-full text-xs sm:text-sm">
              <thead className="bg-gray-50 text-[11px] uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-3 py-2 text-left">Customer</th>
                  <th className="px-3 py-2 text-left">Rating</th>
                  <th className="px-3 py-2 text-left">Review</th>
                  <th className="px-3 py-2 text-left">Date</th>
                  <th className="px-3 py-2 text-left">Status</th>
                  <th className="px-3 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((r) => (
                  <tr
                    key={r.id}
                    className="border-t border-gray-100 align-top"
                  >
                    {/* Customer */}
                    <td className="px-3 py-3">
                      <div className="font-medium text-gray-900">
                        {r.name}
                      </div>
                      {r.email && (
                        <div className="text-[11px] text-gray-500">
                          {r.email}
                        </div>
                      )}
                    </td>

                    {/* Rating */}
                    <td className="px-3 py-3 whitespace-nowrap">
                      {r.rating ? "⭐".repeat(r.rating) : "—"}
                    </td>

                    {/* Message */}
                    <td className="px-3 py-3 max-w-xs">
                      <p className="text-gray-800 text-xs sm:text-sm">
                        {r.message}
                      </p>
                      {r.source_page && (
                        <p className="mt-1 text-[11px] text-gray-400">
                          Source: {r.source_page}
                        </p>
                      )}
                    </td>

                    {/* Date */}
                    <td className="px-3 py-3 whitespace-nowrap text-[11px] text-gray-500">
                      {dayjs(r.created_at).format("DD MMM YYYY HH:mm")}
                    </td>

                    {/* Status */}
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium ${
                          r.approved
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                            : "bg-amber-50 text-amber-700 border border-amber-100"
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current mr-1.5" />
                        {r.approved ? "Approved" : "Pending"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-3 py-3 whitespace-nowrap text-right">
                      <div className="flex flex-wrap justify-end gap-2">
                        {/* Approve / Unapprove */}
                        <form
                          action="/api/reviews/approve"
                          method="POST"
                          className="inline-block"
                        >
                          <input type="hidden" name="id" value={r.id} />
                          <input
                            type="hidden"
                            name="approved"
                            value={(!r.approved).toString()}
                          />
                          <button
                            type="submit"
                            className={`rounded-full px-3 py-1 text-[11px] font-medium border transition ${
                              r.approved
                                ? "border-gray-300 text-gray-700 hover:bg-gray-50"
                                : "border-emerald-500 text-emerald-700 hover:bg-emerald-50"
                            }`}
                          >
                            {r.approved ? "Unapprove" : "Approve"}
                          </button>
                        </form>

                        {/* Delete */}
                        <form
                          action="/api/reviews/delete"
                          method="POST"
                          className="inline-block"
                          onSubmit={(e) => {
                            if (
                              !confirm(
                                "Are you sure you want to delete this review?"
                              )
                            ) {
                              e.preventDefault();
                            }
                          }}
                        >
                          <input type="hidden" name="id" value={r.id} />
                          <button
                            type="submit"
                            className="rounded-full px-3 py-1 text-[11px] font-medium border border-red-500 text-red-600 hover:bg-red-50 transition"
                          >
                            Delete
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
