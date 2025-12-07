// src/app/admin/categories/page.tsx
import { getAllCategories } from "@/lib/categories";

export const revalidate = 0;

export default async function AdminCategoriesPage() {
  const categories = await getAllCategories();

  return (
    <main className="min-h-screen bg-[#fff8fb] text-[#47201d]">
      <section className="max-w-5xl mx-auto px-3 sm:px-6 py-8 sm:py-10 space-y-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold">
              Categories
            </h1>
            <p className="text-xs sm:text-sm text-[#a36d63]">
              Manage product categories and their images.
            </p>
          </div>

          <a
            href="/admin/categories/new"
            className="inline-flex items-center rounded-full bg-[#ec4899] px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#db2777]"
          >
            + Add category
          </a>
        </div>

        {categories.length === 0 ? (
          <p className="text-sm text-[#a36d63]">
            No categories yet. Create one to start organising your products.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {categories.map((cat) => (
              <article
                key={cat.id}
                className="flex gap-3 rounded-2xl border border-[#fde7f1] bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 bg-[#fff1f7] flex-shrink-0 overflow-hidden">
                  {cat.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={cat.image_url}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[11px] text-[#e5a4bc]">
                      No image
                    </div>
                  )}
                </div>
                <div className="flex-1 px-3 py-3 sm:px-4 sm:py-4 flex flex-col gap-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h2 className="text-sm sm:text-base font-semibold">
                        {cat.name}
                      </h2>
                      <p className="text-[11px] text-[#a36d63]">
                        /category/{cat.slug}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={`/admin/categories/${cat.id}/edit`}
                        className="text-[11px] rounded-full bg-[#f9fafb] px-3 py-1 text-[#4b5563] hover:bg-[#e5e7eb]"
                      >
                        Edit
                      </a>
                      {/* You can add delete later similar to products */}
                    </div>
                  </div>
                  {cat.description && (
                    <p className="text-[11px] text-[#7a6058] line-clamp-2">
                      {cat.description}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
