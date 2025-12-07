// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/products";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.atelierdemea.com"; // 👉 change if your domain differs

  // Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/new-arrivals`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic product pages
  const products = await getAllProducts();

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => {
    // Safely compute lastModified from created_at
    let lastModified: Date;

    if (p.created_at) {
      const created = new Date(p.created_at as string);
      if (!Number.isNaN(created.getTime())) {
        lastModified = created;
      } else {
        lastModified = new Date();
      }
    } else {
      lastModified = new Date();
    }

    return {
      url: `${baseUrl}/products/${p.slug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.6,
    };
  });

  return [...staticRoutes, ...productRoutes];
}
