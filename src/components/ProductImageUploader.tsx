"use client";

import { supabaseBrowser } from "@/lib/supabaseBrowser";
import { useState } from "react";

type Props = {
  label?: string;
  initialUrl?: string | null;
  onChange: (url: string | null) => void;
};

export default function ProductImageUploader({
  label = "Product image",
  initialUrl,
  onChange,
}: Props) {
  const [preview, setPreview] = useState<string | null>(initialUrl ?? null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabaseBrowser.storage
        .from("product-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error(uploadError);
        throw uploadError;
      }

      const { data } = supabaseBrowser.storage
        .from("product-images")
        .getPublicUrl(filePath);

      const publicUrl = data.publicUrl;
      setPreview(publicUrl);
      onChange(publicUrl);
    } catch (err: any) {
      console.error("Upload failed", err);
      setError("Image upload failed. Please try again.");
      onChange(null);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-[#47201d]">
        {label}
      </label>

      {preview && (
        <div className="w-32 h-32 rounded-xl overflow-hidden border border-[#f9a8d4] bg-[#fff1f7]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
        className="block w-full text-xs file:text-xs file:px-3 file:py-2 file:rounded-full file:border-0 file:bg-[#ec4899] file:text-white file:font-medium hover:file:bg-[#db2777] cursor-pointer"
      />
      {uploading && (
        <p className="text-xs text-[#a36d63]">Uploading image… please wait.</p>
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
