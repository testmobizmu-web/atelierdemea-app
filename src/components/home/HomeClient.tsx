// src/components/home/HomeClient.tsx
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";
import { AddToCartControls } from "@/components/cart/AddToCartControls";
import { useLanguage } from "@/components/layout/LanguageSwitcher";
import ReviewForm from "@/components/reviews/ReviewForm";
import { blogPosts } from "@/lib/blogPosts";

type Props = {
  allProducts: Product[];
  settings: any;
};

export default function HomeClient({ allProducts, settings }: Props) {
  const { lang } = useLanguage();
  const isFr = lang === "fr";

  // --- Helper: pick unique products for sections, no repetition ---
  function pickUnique(
    source: Product[],
    usedIds: Set<string>,
    limit: number
  ): Product[] {
    const result: Product[] = [];
    for (const p of source) {
      if (result.length >= limit) break;
      if (usedIds.has(p.id)) continue;
      result.push(p);
      usedIds.add(p.id);
    }
    return result;
  }

  const usedIds = new Set<string>();

  // Featured = explicit flag
  const featuredProducts = pickUnique(
    allProducts.filter((p) => p.is_featured),
    usedIds,
    8
  );

  // New arrivals = checkbox, not date
  const newArrivals = pickUnique(
    allProducts.filter((p) => p.is_new),
    usedIds,
    8
  );

  // Best sellers = checkbox
  const bestSellers = pickUnique(
    allProducts.filter((p) => p.is_best_seller),
    usedIds,
    8
  );

  // If some sections are empty, gently fill with remaining products
  const remaining = allProducts.filter((p) => !usedIds.has(p.id));

  if (featuredProducts.length < 4) {
    const extra = pickUnique(remaining, usedIds, 4 - featuredProducts.length);
    featuredProducts.push(...extra);
  }
  if (newArrivals.length < 4) {
    const extra = pickUnique(remaining, usedIds, 4 - newArrivals.length);
    newArrivals.push(...extra);
  }
  if (bestSellers.length < 4) {
    const extra = pickUnique(remaining, usedIds, 4 - bestSellers.length);
    bestSellers.push(...extra);
  }

  // -------- HERO TEXT FROM SETTINGS --------
  const heroTitle =
    settings?.hero_title ||
    (isFr
      ? "Pièces féminines faites main pour reines du quotidien."
      : "Feminine handmade pieces for everyday queens.");

  const heroSubtitle =
    settings?.hero_subtitle ||
    (isFr
      ? "Atelier de Méa crée des turbans, tenues et sacs premium faits main avec amour à Roche Bois, Maurice."
      : "Atelier de Méa brings you premium handcrafted turbans, clothing and bags — designed with love in Roche Bois, Mauritius.");

  const heroPrimaryImageUrl = settings?.hero_primary_image_url || null;
  const heroSecondaryImageUrl = settings?.hero_secondary_image_url || null;

  return (
    <div className="min-h-screen bg-white text-[#47201d]">
      {/* ============ HERO ============ */}
      <section className="bg-gradient-to-br from-[#fff1f7] via-white to-[#ffe4f3]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-10 sm:py-14 lg:py-16 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-center">
          {/* Hero text */}
          <div className="space-y-4 sm:space-y-5">
            <div className="text-[11px] uppercase tracking-[0.28em] text-[#e11d70]">
              {isFr
                ? "Nouveau · Turbans, vêtements & sacs faits main"
                : "New · Handmade turbans, clothing & bags"}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
              {heroTitle}
            </h1>
            <p className="text-sm sm:text-base text-[#a36d63] max-w-xl">
              {heroSubtitle}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/shop?sort=new"
                className="inline-flex items-center rounded-full bg-[#ec4899] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#db2777] transition"
              >
                {isFr ? "Voir les nouveautés" : "Shop New Arrivals"}
              </Link>
              <Link
                href="https://wa.me/23059117549"
                target="_blank"
                className="inline-flex items-center rounded-full border border-[#f9a8d4] px-5 py-2.5 text-xs sm:text-sm font-medium text-[#47201d] hover:bg-white/60 transition"
              >
                {isFr ? "Commander sur WhatsApp" : "Order on WhatsApp"}
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-5 grid grid-cols-2 sm:flex sm:flex-wrap gap-2 text-[11px] sm:text-xs text-[#a36d63]">
              <Badge>
                {isFr
                  ? "Paiement à la livraison (Maurice)"
                  : "Cash on Delivery (Mauritius)"}
              </Badge>
              <Badge>
                {isFr
                  ? "Juice & Scan-to-Pay acceptés"
                  : "Juice & Scan-to-Pay accepted"}
              </Badge>
              <Badge>
                {isFr
                  ? "Fait main en petites séries"
                  : "Handmade in small batches"}
              </Badge>
              <Badge>
                {isFr ? "Expédition rapide 24–48h*" : "Fast dispatch 24–48h*"}
              </Badge>
            </div>
          </div>

          {/* Hero images */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {heroPrimaryImageUrl || heroSecondaryImageUrl ? (
              <>
                <div className="relative col-span-2 sm:col-span-1 h-40 sm:h-52 lg:h-60 rounded-3xl overflow-hidden border border-[#fde7f1] bg-[#fff1f7] shadow-lg">
                  {heroPrimaryImageUrl ? (
                    <Image
                      src={heroPrimaryImageUrl}
                      alt="Atelier de Méa hero"
                      fill
                      sizes="(min-width: 1024px) 340px, 50vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-[#e5a4bc]">
                      Hero image
                    </div>
                  )}
                </div>

                <div className="relative h-32 sm:h-40 lg:h-44 rounded-3xl overflow-hidden border border-[#fde7f1] bg-[#fff1f7] shadow-md">
                  {heroSecondaryImageUrl ? (
                    <Image
                      src={heroSecondaryImageUrl}
                      alt="Atelier de Méa hero secondary"
                      fill
                      sizes="(min-width: 1024px) 260px, 40vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[11px] text-[#e5a4bc]">
                      Secondary image
                    </div>
                  )}
                </div>

                <div className="rounded-3xl bg-gradient-to-br from-[#f9a8d4] via-white to-[#fecaca] shadow-lg h-32 sm:h-40 lg:h-44" />
              </>
            ) : (
              <>
                {[
                  "/hero/hero1.jpg",
                  "/hero/hero2.jpg",
                  "/hero/hero3.jpg",
                  "/hero/hero4.jpg",
                ].map((src, index) => (
                  <div
                    key={src}
                    className="relative h-32 sm:h-40 lg:h-44 rounded-3xl overflow-hidden bg-[#fff1f7] border border-[#fde7f1] shadow-lg"
                  >
                    <Image
                      src={src}
                      alt={`Atelier de Méa hero visual ${index + 1}`}
                      fill
                      priority={index === 0}
                      className="object-cover"
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </section>

      {/* ============ USP STRIP ============ */}
      <section className="border-t border-b border-[#fde7f1] bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-[11px] sm:text-xs text-[#a36d63]">
          <Usp title={isFr ? "Paiement à la livraison" : "Cash on Delivery"}>
            {isFr
              ? "Payez directement à la livraison à Maurice."
              : "Pay on delivery in Mauritius."}
          </Usp>
          <Usp title={isFr ? "Expédition rapide" : "Fast Dispatch"}>
            {isFr
              ? "Commandes préparées en 24–48h."
              : "Orders prepared within 24–48h."}
          </Usp>
          <Usp title={isFr ? "Qualité faite main" : "Handmade Quality"}>
            {isFr
              ? "Confection soignée en petites séries."
              : "Carefully crafted in small batches."}
          </Usp>
          <Usp title={isFr ? "Basé à Maurice" : "Mauritius Based"}>
            Roche Bois, Port-Louis.
          </Usp>
        </div>
      </section>

      {/* ============ FEATURED / NEW / BEST SELLERS ============ */}
      <SectionWrapper
        title={isFr ? "Collections en vedette" : "Featured Collections"}
        subtitle={
          isFr
            ? "Découvrez les turbans, tenues et sacs les plus appréciés."
            : "Explore bestselling turbans, outfits and bags."
        }
        actionLabel={isFr ? "Voir toute la boutique" : "View full shop"}
        actionHref="/shop"
      >
        <ProductGrid products={featuredProducts} isFr={isFr} />
      </SectionWrapper>

      <SectionWrapper
        title={isFr ? "Nouveautés" : "New Arrivals"}
        subtitle={
          isFr
            ? "Nouvelles pièces faites main tout juste disponibles."
            : "Fresh handmade pieces that just dropped."
        }
        actionLabel={isFr ? "Voir toutes les nouveautés" : "View all new"}
        actionHref="/shop?sort=new"
      >
        <ProductGrid products={newArrivals} isFr={isFr} />
      </SectionWrapper>

      <SectionWrapper
        title={isFr ? "Meilleures ventes" : "Best Sellers"}
        subtitle={
          isFr
            ? "Les pièces préférées de nos reines."
            : "Customer-favourite pieces loved by our queens."
        }
        actionLabel={
          isFr ? "Voir toutes les meilleures ventes" : "View all best sellers"
        }
        actionHref="/shop"
      >
        <ProductGrid products={bestSellers} isFr={isFr} />
      </SectionWrapper>

      {/* ============ BLOG CAROUSEL ============ */}
      <section className="bg-white border-t border-[#fde7f1]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-10 sm:py-12">
          <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold">
                {isFr ? "Depuis le blog de l’atelier" : "From the Atelier Blog"}
              </h2>
              <p className="text-xs sm:text-sm text-[#a36d63]">
                {isFr
                  ? "Conseils de style, guides d’entretien et coulisses."
                  : "Style tips, care guides and behind-the-scenes stories."}
              </p>
            </div>
            <Link
              href="/blog"
              className="text-[11px] sm:text-xs font-medium text-[#e11d70] underline underline-offset-4"
            >
              {isFr ? "Voir tous les articles" : "Read all articles"}
            </Link>
          </div>

          <BlogCarousel isFr={isFr} />
        </div>
      </section>

      {/* ============ REVIEWS CAROUSEL + FORM ============ */}
      <section className="bg-[#fff7fb] border-t border-b border-[#fde7f1]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-10 sm:py-12">
          <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold">
                {isFr ? "Adoré par nos reines" : "Loved by our queens"}
              </h2>
              <p className="text-xs sm:text-sm text-[#a36d63]">
                {isFr
                  ? "Faites défiler les avis de nos clientes et laissez le vôtre."
                  : "Scroll through what our customers say and leave your own review."}
              </p>
            </div>
          </div>

          {/* Carousel-style strip (scroll + snap) */}
          <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
            {[
              {
                name: "Mélissa",
                text: isFr
                  ? "Le bandeau est tellement confortable et stylé. Je l’ai porté toute la journée, il est resté parfait !"
                  : "The bandeau is so comfortable and stylish. I wore it the whole day and it stayed perfect!",
                tag: isFr
                  ? "Bandeau · Tous les jours"
                  : "Bandeau · Everyday wear",
              },
              {
                name: "Aisha",
                text: isFr
                  ? "Enfin des turbans qui correspondent à mon style et à mes cheveux. La qualité est incroyable pour le prix."
                  : "Finally turbans that fit my style and my hair. The quality is amazing for the price.",
                tag: isFr
                  ? "Turban · Occasions spéciales"
                  : "Turban · Special occasions",
              },
              {
                name: "Vanessa",
                text: isFr
                  ? "Livraison rapide, support WhatsApp chaleureux et le produit est encore plus beau en vrai."
                  : "Fast delivery, friendly WhatsApp support and the product looks even better in real life.",
                tag: isFr
                  ? "Expérience cliente"
                  : "Customer experience",
              },
              {
                name: "Rani",
                text: isFr
                  ? "J’adore le fait que ce soit fait main à Maurice. On sent l’amour dans chaque couture."
                  : "I love that it’s handmade in Mauritius. You can feel the love in every stitch.",
                tag: isFr
                  ? "Fait à Maurice"
                  : "Made in Mauritius",
              },
            ].map((review, idx) => (
              <figure
                key={idx}
                className="snap-start min-w-[260px] max-w-xs rounded-3xl border border-[#fde7f1] bg-white px-4 py-4 sm:px-5 sm:py-5 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#fb7185] via-[#ec4899] to-[#f97316] flex items-center justify-center text-white text-sm font-semibold">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">
                      {review.name}
                    </div>
                    <div className="text-[11px] text-[#a36d63]">
                      {isFr ? "Cliente vérifiée" : "Verified customer"}
                    </div>
                  </div>
                </div>
                <blockquote className="text-xs sm:text-sm text-[#47201d] mb-3">
                  “{review.text}”
                </blockquote>
                <figcaption className="text-[11px] text-[#e11d70]">
                  {review.tag}
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Review form */}
          <div className="mt-8">
            <ReviewForm />
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      {/* (keep your existing footer from previous version here; omitted for brevity) */}
    </div>
  );
}

/* ========== BLOG CAROUSEL COMPONENT ========== */
function BlogCarousel({ isFr }: { isFr: boolean }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cardWidth = 0;
    const firstCard = container.firstElementChild as HTMLElement | null;
    if (firstCard) {
      cardWidth = firstCard.getBoundingClientRect().width + 16;
    }
    if (!cardWidth) return;

    const interval = setInterval(() => {
      if (!container) return;
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft + cardWidth >= maxScroll - 4) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="blog-scroll flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory"
    >
      {blogPosts.map((post) => {
        const title = isFr ? post.title_fr : post.title_en;
        const category = isFr ? post.category_fr : post.category_en;
        const excerpt = isFr ? post.excerpt_fr : post.excerpt_en;

        return (
          <article
            key={post.slug}
            className="snap-start min-w-[260px] sm:min-w-[280px] max-w-[320px] flex-shrink-0 flex flex-col rounded-3xl border border-[#fde7f1] bg-[#fff7fb] overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative w-full aspect-[16/9]">
              <Image
                src={post.image}
                alt={`${title} – Atelier de Méa blog`}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col px-4 py-3 sm:px-5 sm:py-4 gap-2">
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#e11d70]">
                {category}
              </span>
              <h3 className="text-xs sm:text-sm font-semibold line-clamp-2 text-[#47201d]">
                {title}
              </h3>
              <p className="text-[11px] sm:text-xs text-[#a36d63] line-clamp-3">
                {excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-auto inline-flex items-center text-[11px] sm:text-xs font-medium text-[#e11d70] hover:underline"
              >
                {isFr ? "Lire plus →" : "Read more →"}
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}

/* ========== SMALL REUSABLE COMPONENTS ========== */

function Badge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-white/40 bg-white/40 px-3 py-1 text-[11px] sm:text-xs text-[#47201d] ${className}`}
    >
      {children}
    </span>
  );
}

function Usp({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1.5 text-[#47201d] font-medium">
        <span className="h-1.5 w-1.5 rounded-full bg-[#e11d70]" />
        <span>{title}</span>
      </div>
      <p>{children}</p>
    </div>
  );
}

function SectionWrapper({
  title,
  subtitle,
  actionLabel,
  actionHref,
  children,
}: {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  actionHref?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-10 sm:py-12">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold">{title}</h2>
            {subtitle && (
              <p className="text-xs sm:text-sm text-[#a36d63]">{subtitle}</p>
            )}
          </div>
          {actionLabel && actionHref && (
            <Link
              href={actionHref}
              className="text-[11px] sm:text-xs font-medium text-[#e11d70] underline underline-offset-4"
            >
              {actionLabel}
            </Link>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

function ProductGrid({ products, isFr }: { products: Product[]; isFr: boolean }) {
  if (!products || products.length === 0) {
    return (
      <p className="text-xs sm:text-sm text-[#a36d63]">
        {isFr
          ? "Aucun produit disponible pour le moment. Revenez bientôt."
          : "No products available yet. Please check back soon."}
      </p>
    );
  }

  return (
    <div className="grid gap-5 sm:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 items-stretch">
      {products.map((product) => {
        const isSoldOut =
          product.stock !== null &&
          product.stock !== undefined &&
          product.stock <= 0;

        const isOnSale =
          product.sale_price !== null &&
          product.sale_price !== undefined &&
          product.sale_price < product.price;

        const mainImage =
          product.images && product.images.length > 0
            ? product.images[0]
            : product.image_url || null;

        const description =
          product.short_description ||
          product.long_description ||
          (isFr
            ? "Pièce faite main par Atelier de Méa."
            : "Handmade piece by Atelier de Méa.");

        return (
          <article
            key={product.id}
            className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#fde7f1] bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            {/* soft pink glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-pink-100/80 blur-3xl opacity-60 animate-[atelier-pulse_7s_ease-in-out_infinite]"
            />

            <div className="relative flex h-full flex-col">
              <Link
                href={`/products/${product.slug}`}
                className="relative block w-full aspect-square bg-[#fff1f7]"
              >
                {mainImage ? (
                  <Image
                    src={mainImage}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[10px] text-[#e5a4bc]">
                    {isFr ? "Pas d’image" : "No image"}
                  </div>
                )}

                {/* BADGES: Featured, On sale (green), Hot seller (red), New, Limited, Sold out */}
                {product.is_featured && (
                  <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-[#e11d70] shadow-sm">
                    {isFr ? "En vedette" : "Featured"}
                  </span>
                )}

                {product.is_on_sale && (
                  <span className="absolute right-2 top-2 rounded-full bg-[#16a34a] px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm">
                    {isFr ? "Promo" : "On sale"}
                  </span>
                )}

                {product.is_best_seller && (
                  <span className="absolute right-2 bottom-2 rounded-full bg-[#b91c1c] px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm">
                    {isFr ? "Hot" : "Hot seller"}
                  </span>
                )}

                {isSoldOut && (
                  <span className="absolute left-2 bottom-2 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-semibold text-white">
                    {isFr ? "Rupture" : "Sold out"}
                  </span>
                )}

                {product.is_new && (
                  <span className="absolute left-2 bottom-7 rounded-full bg-[#f97316] px-2 py-0.5 text-[9px] font-semibold text-white shadow-sm">
                    {isFr ? "Nouveau" : "New"}
                  </span>
                )}

                {product.is_limited && (
                  <span className="absolute left-2 top-8 rounded-full bg-[#0f766e] px-2 py-0.5 text-[9px] font-semibold text-white shadow-sm">
                    {isFr ? "Série limitée" : "Limited"}
                  </span>
                )}
              </Link>

              {/* TEXT + CONTROLS */}
              <div className="flex flex-1 flex-col px-3 pt-3 pb-3 sm:px-4 sm:pt-4 sm:pb-4">
                <Link href={`/products/${product.slug}`}>
                  <h3 className="text-xs sm:text-sm font-semibold text-[#47201d] line-clamp-2">
                    {product.name}
                  </h3>
                </Link>

                <p className="mt-1 min-h-[34px] sm:min-h-[40px] text-[11px] sm:text-xs text-[#a36d63] line-clamp-2">
                  {description}
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <div className="text-sm sm:text-base font-semibold text-[#e11d70]">
                    Rs {product.price}
                  </div>
                  {product.category && (
                    <span className="rounded-full bg-[#fff1f7] px-2 py-1 text-[10px] text-[#a36d63]">
                      {product.category}
                    </span>
                  )}
                </div>

                <div className="mt-3 mt-auto">
                  <AddToCartControls
                    productId={product.id}
                    slug={product.slug}
                    name={product.name}
                    price={product.price}
                    imageUrl={
                      product.images && product.images.length > 0
                        ? product.images[0]
                        : product.image_url
                    }
                  />
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
