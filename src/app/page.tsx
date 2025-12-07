// src/app/page.tsx
import type { Metadata } from "next";
import { getAllProducts } from "@/lib/products";
import { getShopSettings } from "@/lib/settings";
import HomeClient from "@/components/home/HomeClient";

export const revalidate = 0;

/**
 * SEO metadata for the homepage
 * (Global dynamic SEO by language is handled in layout.tsx via generateMetadata)
 */
export const metadata: Metadata = {
  title:
    "Atelier de Méa – Handmade Turbans, Clothing & Bags in Mauritius",
  description:
    "Feminine handmade turbans, outfits and bags crafted with love in Roche Bois, Mauritius. Cash on Delivery, Juice / Scan-to-Pay, fast dispatch and premium quality by Atelier de Méa.",
  openGraph: {
    title:
      "Atelier de Méa – Handmade Turbans, Clothing & Bags in Mauritius",
    description:
      "Shop turbans, bandeaux, outfits and bags. Handmade in Mauritius with Cash on Delivery and Juice/Scan-to-Pay.",
    url: "https://atelierdemea.com",
    type: "website",
  },
};

export default async function HomePage() {
  const [allProducts, settings] = await Promise.all([
    getAllProducts(),
    getShopSettings(),
  ]);

  return (
    <HomeClient
      allProducts={allProducts}
      settings={settings}
    />
  );
}

