// src/app/admin/categories/new/page.tsx
"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

type FormState = {
  name: string;
  slug: string;
  imageFile: File | null;
  imagePreview: string | null;
};

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export default function NewCategoryPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    name: "",
    slug: "",
    imageFile: null,
    imagePreview: null,
  });
  const [isSaving, setIsSaving] = useState(false);

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      name: value,
      // only auto-generate slug if user hasn't typed one yet
      slug: prev.slug ? prev.slug : slugify(value),
    }));
  }

  function handleSlugChange(e: ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({
      ...prev,
      slug: slugify(e.target.value),
    }));
  }

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (!file) {
      setForm((prev) => ({ ...prev, imageFile: null, imagePreview: null }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      imageFile: file,
      imagePreview: URL.createObjectURL(file),
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (isSaving) return;

    if (!form.name.trim() || !form.slug.trim()) {
      alert("Please fill in a name and slug.");
      return;
    }

    setIsSaving(true);

    try {
      let imageUrl: string | null = null;

      if (form.imageFile) {
        const ext = form.imageFile.name.split(".").pop() || "jpg";
        const safeSlug = form.slug || slugify(form.name) || "category";
        const filePath = `categories/${safeSlug}/${Date.now()}-${form.imageFile.name.replace(
          /\s+/g,
          "-"
        )}`;

        const { data, error } = await supabaseBrowser.storage
          .from("product-images") // ✅ reuse same bucket as products
          .upload(filePath, form.imageFile, {
            cacheControl: "3600",
            upsert: false,
          });

        if (error || !data) {
          console.error("Category image upload error:", error);
          throw new Error(error?.message || "Failed to upload category image");
        }

        const { data: publicData } = supabaseBrowser.storage
          .from("product-images")
          .getPublicUrl(data.path);

        imageUrl = publicData.publicUrl;
      }

      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          slug: form.slug.trim(),
          image_url: imageUrl,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || res.statusText);
      }

      alert("Category created ✅");
      router.push("/admin/categories");
      router.refresh();
    } catch (err: any) {
      console.error("Create category error:", err);
      alert(err?.message || "Failed to create category");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#fff8fb] text-[#47201d]">
      <section className="max-w-4xl mx-auto px-3 sm:px-6 py-8 sm:py-10 space-y-6">
        <header className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold">
              Add new category
            </h1>
            <p className="text-xs sm:text-sm text-[#a36d63]">
              Create a category with a banner image. Products use these
              categories in the dropdown and on the homepage.
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.push("/admin/categories")}
            className="inline-flex items-center rounded-full border border-[#f9a8d4] px-4 py-2 text-xs sm:text-sm font-medium text-[#e11d70] bg-white hover:bg-[#fff0f7]"
          >
            ← Back to categories
          </button>
        </header>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-[#fde7f1] bg-white shadow-sm px-4 py-5 sm:px-6 sm:py-6 space-y-6 text-sm sm:text-base"
        >
          {/* Name + slug */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium mb-1">
                Category name
              </label>
              <input
                className="w-full rounded-lg border border-[#fde7f1] px-3 py-2"
                value={form.name}
                onChange={handleNameChange}
                placeholder="e.g. Turbans, Bonnets, Bags…"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">
                Slug (URL)
              </label>
              <input
                className="w-full rounded-lg border border-[#fde7f1] px-3 py-2"
                value={form.slug}
                onChange={handleSlugChange}
                placeholder="e.g. turbans"
              />
              <p className="mt-1 text-[11px] text-[#a36d63]">
                Used in URLs and filters. Only lowercase letters, numbers and
                dashes.
              </p>
            </div>
          </div>

          {/* Image upload */}
          <div>
            <label className="block text-xs font-medium mb-1">
              Category banner image (optional)
            </label>

            <div className="flex flex-wrap items-center gap-3">
              <label className="inline-flex items-center gap-2 rounded-full border border-[#fde7f1] bg-[#fff7fb] px-4 py-2 text-xs font-medium text-[#47201d] cursor-pointer hover:bg-[#ffe4f3]">
                <span>📸 Choose image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {form.imageFile && (
                <span className="text-[11px] text-[#a36d63]">
                  {form.imageFile.name}
                </span>
              )}
            </div>

            <p className="mt-1 text-[11px] text-[#a36d63]">
              Tip: use a horizontal image (e.g. 1200×600) showing products or a
              pattern for this category.
            </p>

            {form.imagePreview && (
              <div className="mt-3 w-full max-w-md rounded-xl overflow-hidden border border-[#fde7f1] bg-[#fff1f7]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={form.imagePreview}
                  alt="Category preview"
                  className="w-full h-40 object-cover"
                />
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center rounded-full bg-[#ec4899] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#db2777] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSaving ? "Saving…" : "Save category"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
