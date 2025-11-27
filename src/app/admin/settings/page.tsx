"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import type { ShopSettings } from "@/lib/settings";

export default function AdminSettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<ShopSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setError(null);
      setSuccess(null);

      // ✅ Check auth like your products admin
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace("/admin/login");
        return;
      }

      const { data: row, error } = await supabase
        .from("shop_settings")
        .select("*")
        .order("created_at", { ascending: true })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Error loading settings:", error.message);
        setError("Error loading settings.");
        setSettings(null);
      } else if (!row) {
        // If no row exists, create one
        const { data: inserted, error: insertError } = await supabase
          .from("shop_settings")
          .insert({ site_name: "Atelier de Méa" })
          .select("*")
          .single();

        if (insertError) {
          console.error("Error creating default settings:", insertError.message);
          setError("Error creating default settings.");
          setSettings(null);
        } else {
          setSettings(inserted as ShopSettings);
        }
      } else {
        setSettings(row as ShopSettings);
      }

      setLoading(false);
    })();
  }, [router]);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);

    const payload = {
      site_name: formData.get("site_name")?.toString().trim() || null,
      logo_url: formData.get("logo_url")?.toString().trim() || null,
      favicon_url: formData.get("favicon_url")?.toString().trim() || null,
      hero_title: formData.get("hero_title")?.toString().trim() || null,
      hero_subtitle: formData.get("hero_subtitle")?.toString().trim() || null,
      hero_primary_image_url:
        formData.get("hero_primary_image_url")?.toString().trim() || null,
      hero_secondary_image_url:
        formData.get("hero_secondary_image_url")?.toString().trim() || null,
      blog_default_image_url:
        formData.get("blog_default_image_url")?.toString().trim() || null,
    };

    const { data: updated, error } = await supabase
      .from("shop_settings")
      .update(payload)
      .eq("id", settings.id)
      .select("*")
      .single();

    if (error) {
      console.error("Error saving settings:", error.message);
      setError("Error saving settings.");
      setSaving(false);
      return;
    }

    setSettings(updated as ShopSettings);
    setSuccess("Settings saved.");
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="text-sm text-[#7A6058]">
        Loading settings…
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="text-sm text-red-600">
        Could not load settings. Please try again.
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-[#3B2A24]">
            Shop Settings
          </h1>
          <p className="text-xs text-[#7A6058]">
            Manage logo, hero banner, favicon and default blog image for Atelier
            de Méa.
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
          {success}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* General */}
        <section className="rounded-xl border border-[#F3E3EC] bg-white p-4 space-y-3">
          <h2 className="text-sm font-semibold text-[#3B2A24]">
            General
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="site_name"
                className="text-[11px] font-medium text-[#3B2A24]"
              >
                Site name
              </label>
              <input
                id="site_name"
                name="site_name"
                defaultValue={settings.site_name ?? ""}
                className="rounded-full border border-[#F3E3EC] px-3 py-2 text-xs outline-none focus:border-[#C74382] focus:ring-1 focus:ring-[#C74382]"
                placeholder="Atelier de Méa"
              />
            </div>
          </div>
        </section>

        {/* Branding */}
        <section className="rounded-xl border border-[#F3E3EC] bg-white p-4 space-y-3">
          <h2 className="text-sm font-semibold text-[#3B2A24]">
            Branding (logo & favicon)
          </h2>
          <p className="text-[11px] text-[#7A6058]">
            Paste image URLs from Supabase Storage or any hosted image. Logo is
            used in the header, favicon in the browser tab.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="logo_url"
                className="text-[11px] font-medium text-[#3B2A24]"
              >
                Logo URL
              </label>
              <input
                id="logo_url"
                name="logo_url"
                defaultValue={settings.logo_url ?? ""}
                className="rounded-full border border-[#F3E3EC] px-3 py-2 text-xs outline-none focus:border-[#C74382] focus:ring-1 focus:ring-[#C74382]"
                placeholder="https://…/atelier-logo.png"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="favicon_url"
                className="text-[11px] font-medium text-[#3B2A24]"
              >
                Favicon URL
              </label>
              <input
                id="favicon_url"
                name="favicon_url"
                defaultValue={settings.favicon_url ?? ""}
                className="rounded-full border border-[#F3E3EC] px-3 py-2 text-xs outline-none focus:border-[#C74382] focus:ring-1 focus:ring-[#C74382]"
                placeholder="https://…/favicon-32x32.png"
              />
            </div>
          </div>
        </section>

        {/* Hero banner */}
        <section className="rounded-xl border border-[#F3E3EC] bg-white p-4 space-y-3">
          <h2 className="text-sm font-semibold text-[#3B2A24]">
            Hero banner
          </h2>
          <p className="text-[11px] text-[#7A6058]">
            These values will control the big hero section on the homepage.
          </p>

          <div className="space-y-3">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="hero_title"
                className="text-[11px] font-medium text-[#3B2A24]"
              >
                Hero title
              </label>
              <input
                id="hero_title"
                name="hero_title"
                defaultValue={settings.hero_title ?? ""}
                className="rounded-full border border-[#F3E3EC] px-3 py-2 text-xs outline-none focus:border-[#C74382] focus:ring-1 focus:ring-[#C74382]"
                placeholder="Feminine handmade pieces for everyday queens."
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="hero_subtitle"
                className="text-[11px] font-medium text-[#3B2A24]"
              >
                Hero subtitle
              </label>
              <textarea
                id="hero_subtitle"
                name="hero_subtitle"
                defaultValue={settings.hero_subtitle ?? ""}
                className="rounded-2xl border border-[#F3E3EC] px-3 py-2 text-xs outline-none focus:border-[#C74382] focus:ring-1 focus:ring-[#C74382] min-h-[60px]"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="hero_primary_image_url"
                className="text-[11px] font-medium text-[#3B2A24]"
              >
                Hero primary image URL
              </label>
              <input
                id="hero_primary_image_url"
                name="hero_primary_image_url"
                defaultValue={settings.hero_primary_image_url ?? ""}
                className="rounded-full border border-[#F3E3EC] px-3 py-2 text-xs outline-none focus:border-[#C74382] focus:ring-1 focus:ring-[#C74382]"
                placeholder="https://…/hero-main.jpg"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="hero_secondary_image_url"
                className="text-[11px] font-medium text-[#3B2A24]"
              >
                Hero secondary image URL
              </label>
              <input
                id="hero_secondary_image_url"
                name="hero_secondary_image_url"
                defaultValue={settings.hero_secondary_image_url ?? ""}
                className="rounded-full border border-[#F3E3EC] px-3 py-2 text-xs outline-none focus:border-[#C74382] focus:ring-1 focus:ring-[#C74382]"
                placeholder="https://…/hero-secondary.jpg"
              />
            </div>
          </div>
        </section>

        {/* Blog default image */}
        <section className="rounded-xl border border-[#F3E3EC] bg-white p-4 space-y-3">
          <h2 className="text-sm font-semibold text-[#3B2A24]">
            Blog defaults
          </h2>
          <p className="text-[11px] text-[#7A6058]">
            Default image used on blog cards when a post has no specific image.
          </p>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="blog_default_image_url"
              className="text-[11px] font-medium text-[#3B2A24]"
            >
              Blog default image URL
            </label>
            <input
              id="blog_default_image_url"
              name="blog_default_image_url"
              defaultValue={settings.blog_default_image_url ?? ""}
              className="rounded-full border border-[#F3E3EC] px-3 py-2 text-xs outline-none focus:border-[#C74382] focus:ring-1 focus:ring-[#C74382]"
              placeholder="https://…/blog-default.jpg"
            />
          </div>
        </section>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-[#C74382] hover:bg-[#d75b96] disabled:opacity-70 text-xs font-medium text-white px-4 py-2 shadow-sm shadow-[#C74382]/30"
          >
            {saving ? "Saving…" : "Save settings"}
          </button>
          <p className="text-[11px] text-[#7A6058]">
            Changes apply to the live site as soon as you deploy.
          </p>
        </div>
      </form>
    </div>
  );
}
