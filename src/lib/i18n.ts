// src/lib/i18n.ts
import type { Lang } from "@/components/layout/LanguageSwitcher";

export const messages = {
  en: {
    seo: {
      siteTitle: "Atelier de Méa – Handmade Turbans, Clothing & Bags in Mauritius",
      siteDescription:
        "Feminine handmade turbans, outfits and bags crafted with love in Roche Bois, Mauritius.",
    },
    header: {
      home: "Home",
      newArrivals: "New Arrivals",
      categories: "Categories",
      about: "About Us",
      support: "Support",
      login: "Login",
      signup: "Sign up",
    },
    footer: {
      explore: "Explore",
      policies: "Policies",
      contact: "Contact",
      shop: "Shop",
      about: "About Us",
      support: "Support / FAQ",
      blog: "Blog",
      // ...
    },
    home: {
      heroKicker: "New · Handmade turbans, clothing & bags",
      heroCtaNew: "Shop New Arrivals",
      heroCtaWhatsapp: "Order on WhatsApp",
      heroBadge1: "Cash on Delivery (Mauritius)",
      heroBadge2: "Juice & Scan-to-Pay accepted",
      heroBadge3: "Handmade in small batches",
      heroBadge4: "Fast dispatch 24–48h*",
      // etc...
    },
    shop: {
      title: "Shop Atelier de Méa",
      subtitle:
        "Discover handmade turbans, clothing and bags created with love in Roche Bois, Mauritius.",
      productsShown: "products shown",
      inTotal: "in total",
      inCategory: `in "{category}" category`,
      orderOnWhatsapp: "Order on WhatsApp",
      browseByCategory: "Browse by category:",
      allProducts: "All products",
    },
    // add support, about, newArrivals etc. here
  },
  fr: {
    seo: {
      siteTitle:
        "Atelier de Méa – Turbans, vêtements & sacs faits main à Maurice",
      siteDescription:
        "Turbans, tenues et sacs féminins faits main avec amour à Roche Bois, Maurice.",
    },
    header: {
      home: "Accueil",
      newArrivals: "Nouveautés",
      categories: "Catégories",
      about: "À propos",
      support: "Support",
      login: "Connexion",
      signup: "Créer un compte",
    },
    footer: {
      explore: "Explorer",
      policies: "Politiques",
      contact: "Contact",
      shop: "Boutique",
      about: "À propos",
      support: "Support / FAQ",
      blog: "Blog",
    },
    home: {
      heroKicker:
        "Nouveau · Turbans, vêtements & sacs faits main",
      heroCtaNew: "Voir les nouveautés",
      heroCtaWhatsapp: "Commander sur WhatsApp",
      heroBadge1: "Paiement à la livraison (Maurice)",
      heroBadge2: "Juice & Scan-to-Pay acceptés",
      heroBadge3: "Fabrication artisanale en petites séries",
      heroBadge4: "Préparation en 24–48h*",
    },
    shop: {
      title: "Boutique Atelier de Méa",
      subtitle:
        "Découvrez des turbans, vêtements et sacs faits main avec amour à Roche Bois, Maurice.",
      productsShown: "produits affichés",
      inTotal: "au total",
      inCategory: `dans la catégorie « {category} »`,
      orderOnWhatsapp: "Commander sur WhatsApp",
      browseByCategory: "Parcourir par catégorie :",
      allProducts: "Tous les produits",
    },
  },
} as const;

export function getMessages(lang: Lang) {
  return lang === "fr" ? messages.fr : messages.en;
}
