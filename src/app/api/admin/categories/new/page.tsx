// src/app/admin/categories/new/page.tsx
import NewCategoryForm from "../NewCategoryForm";

export default function AdminNewCategoryPage() {
  return (
    <main className="min-h-screen bg-[#fff8fb] text-[#47201d]">
      <section className="max-w-4xl mx-auto px-3 sm:px-6 py-8 sm:py-10">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-2">
          Add new category
        </h1>
        <p className="text-xs sm:text-sm text-[#a36d63] mb-6">
          Create a category to group your products and show a nice banner
          image on the shop.
        </p>

        <NewCategoryForm />
      </section>
    </main>
  );
}
