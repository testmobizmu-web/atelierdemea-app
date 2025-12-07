// src/app/admin/categories/[id]/edit/page.tsx
import { getCategoryById } from "@/lib/categories";
import EditCategoryForm from "./EditCategoryForm";

type PageParams = {
  params: { id: string };
};

export default async function AdminEditCategoryPage({ params }: PageParams) {
  const { id } = params;
  const category = await getCategoryById(id);

  if (!category) {
    return (
      <main className="min-h-screen bg-[#fff8fb] text-[#47201d]">
        <section className="max-w-4xl mx-auto px-3 sm:px-6 py-8 sm:py-10">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-2">
            Category not found
          </h1>
          <p className="text-sm text-[#a36d63]">
            We couldn&apos;t find any category with this ID.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fff8fb] text-[#47201d]">
      <section className="max-w-4xl mx-auto px-3 sm:px-6 py-8 sm:py-10">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-2">
          Edit category
        </h1>
        <p className="text-xs sm:text-sm text-[#a36d63] mb-6">
          Update details for <strong>{category.name}</strong>.
        </p>

        <EditCategoryForm category={category} />
      </section>
    </main>
  );
}
