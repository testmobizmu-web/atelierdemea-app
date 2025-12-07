// src/app/admin/categories/[id]/edit/EditCategoryForm.tsx
"use client";

import { useState } from "react";
import type React from "react";
import type { Category } from "@/lib/categories";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

type Props = {
  category: Category;
};

type CategoryFormState = {
  name: string;
  slug: string;
  description: string;
  imageFile: File | null;
  existingImageUrl: string | null;
  previewUrl: string | null;
};

export default function EditCategoryForm({ category }: Props) {
  const [form, setForm] = useState<CategoryFormState>({
    name: category.name,
    slug: category.slug,
    description: category.description || "",
    imageFile: null,
    existingImageUrl: category.image_url || null,
    previewUrl: null,
  });

  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = (e.target.files || [])[0] || null;
    setForm((prev) => ({
      ...prev,
      imageFile: file,
      previewUrl: file ? URL.createObjectURL(file) : null,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    try {
      let imageUrl = form.existingImageUrl;

      if (form.imageFile) {
        const file = form.imageFile;
        const filePath = `categories/${form.slug || category.id}/${
          Date.now()
        }-${file.name.replace(/\s+/g, "-")}`;

        const { data, error } = await supabaseBrowser.storage
          .from("category-images")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (error) {
          console.error("Upload error:", error);
          throw new Error("Failed to upload category image");
        }

        const { data: publicData } = supabaseBrowser.storage
          .from("category-images")
          .getPublicUrl(data.path);

        imageUrl = publicData.publicUrl;
      }

      const payload = {
        name: form.name,
        slug: form.slug,
        description: form.description || null,
        image_url: imageUrl,
      };

      const res = await fetch(`/api/admin/categories/${category.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || res.statusText);
      }

      alert("Category updated ✅");
      window.location.href = "/admin/categories";
    } catch (err: any) {
      console.error(err);
      alert(`Error updating category: ${err.message || "unknown error"}`);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this category? This cannot be undone.")) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/admin/categories/${category.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || res.statusText);
      }

      alert("Category deleted ✅");
      window.location.href = "/admin/categories";
    } catch (err: any) {
      console.error(err);
      alert(`Error deleting category: ${err.message || "unknown error"}`);
    } finally {
      setDeleting(false);
    }
  }

  const effectivePreview =
    form.previewUrl || form.existingImageUrl || null;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 text-sm sm:text-base bg-white rounded-3xl border border-[#fde7f1] shadow-sm px-4 py-5 sm:px-6 sm:py-6"
    >
      {/* NAME + SLUG */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-medium mb-1">
            Category name
          </label>
          <input
            className="w-full rounded-lg border border-[#fde7f1] px-3 py-2"
            value={form.name}
            onChange={(e) =>
              setForm((p) => ({ ...p, name: e.target.value }))
            }
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">
            Slug (URL)
          </label>
          <input
            className="w-full rounded-lg border border-[#fde7f1] px-3 py-2"
            value={form.slug}
            onChange={(e) =>
              setForm((p) => ({ ...p, slug: e.target.value }))
            }
          />
        </div>
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="block text-xs font-medium mb-1">
          Description (optional)
        </label>
        <textarea
          className="w-full rounded-lg border border-[#fde7f1] px-3 py-2 text-sm min-h-[80px]"
          value={form.description}
          onChange={(e) =>
            setForm((p) => ({ ...p, description: e.target.value }))
          }
        />
      </div>

      {/* IMAGE */}
      <div>
        <label className="block text-xs font-medium mb-1">
          Category banner image (optional)
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <label className="inline-flex items-center gap-2 rounded-full border border-[#fde7f1] bg-[#fff7fb] px-4 py-2 text-xs font-medium text-[#47201d] cursor-pointer hover:bg-[#ffe4f3]">
            <span>📸 Change image</span>
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
          If you upload a new image, it will replace the current one.
        </p>

        {effectivePreview && (
          <div className="mt-3 w-full rounded-xl overflow-hidden border border-[#fde7f1] bg-[#fff1f7]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={effectivePreview}
              alt="Preview"
              className="w-full h-40 object-cover"
            />
          </div>
        )}
      </div>

      {/* ACTIONS */}
      <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="text-xs sm:text-sm inline-flex items-center rounded-full border border-[#fecaca] bg-[#fef2f2] px-4 py-2 font-medium text-[#b91c1c] hover:bg-[#fee2e2] disabled:opacity-70"
        >
          {deleting ? "Deleting…" : "Delete category"}
        </button>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center rounded-full bg-[#ec4899] px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#db2777] disabled:opacity-70"
        >
          {submitting ? "Saving…" : "Save changes"}
        </button>
      </div>
    </form>
  );
}
