// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { CartProvider } from "@/components/cart/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { MainHeader } from "@/components/layout/MainHeader";
import { getShopSettings } from "@/lib/settings";

// ✅ import LanguageProvider from your LanguageSwitcher file
import { LanguageProvider } from "@/components/layout/LanguageSwitcher";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Atelier de Méa – Handmade Turbans, Clothing & Bags in Mauritius",
  description:
    "Feminine handmade turbans, outfits and bags crafted with love in Roche Bois, Mauritius. Cash on Delivery, Juice / Scan-to-Pay, fast dispatch and premium quality by Atelier de Méa.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getShopSettings();

  const logoUrl = settings?.logo_url ?? null;
  const siteName = settings?.site_name ?? "Atelier de Méa";
  const faviconUrl = settings?.favicon_url ?? "/favicon.ico";

  return (
    <html lang="en">
      <head>
        <link rel="icon" href={faviconUrl} />
      </head>
      <body className={`${inter.className} bg-white text-[#47201d]`}>
        {/* ✅ Make language available everywhere */}
        <LanguageProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              {/* Announcement bar is now inside MainHeader (with language switch) */}
              <MainHeader logoUrl={logoUrl} siteName={siteName} />

              {/* Page content */}
              <main className="flex-1">{children}</main>

              {/* Global UI */}
              <CartDrawer />
              <FloatingWhatsApp />
              <ScrollToTop />
            </div>
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

