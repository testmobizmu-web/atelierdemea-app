import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllProducts } from "@/lib/products";
import { AddToCartControls } from "@/components/cart/AddToCartControls";
import { getShopSettings } from "@/lib/settings";

export const revalidate = 0;

/**
 * SEO metadata for the homepage
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

  // Sort helpers
  const byNewest = [...allProducts].sort(
    (a, b) =>
      new Date(b.created_at).getTime() -
      new Date(a.created_at).getTime()
  );

  const newArrivals = byNewest.slice(0, 8);

  const featuredProducts = (allProducts.filter((p) => p.is_featured)
    .length
    ? allProducts.filter((p) => p.is_featured)
    : allProducts
  ).slice(0, 8);

  const bestSellers = [...allProducts]
    .sort(
      (a, b) =>
        (b.stock ?? 0) - (a.stock ?? 0)
    )
    .slice(0, 8);

  const blogPosts = [
    {
      title: "5 ways to style your turban for everyday queens",
      href: "/blog/how-to-style-your-turban",
      category: "Style Tips",
    },
    {
      title: "Behind the seams – how we handcraft each Méa piece",
      href: "/blog/atelier-behind-the-scenes",
      category: "Inside the Atelier",
    },
    {
      title: "Care guide: keep your turbans fresh & beautiful",
      href: "/blog/turban-care-guide",
      category: "Care & Maintenance",
    },
    {
      title: "How COD & Juice / Scan-to-Pay work with Atelier de Méa",
      href: "/blog/payment-options-mauritius",
      category: "Shopping Guide",
    },
    {
      title: "Styling bandeaux for curly, coily & straight hair",
      href: "/blog/style-bandeaux-hair-types",
      category: "Style Tips",
    },
    {
      title: "Why we love small-batch, slow handmade fashion",
      href: "/blog/slow-fashion-mauritius",
      category: "Slow Fashion",
    },
    {
      title: "Match your turbans with your everyday outfits",
      href: "/blog/match-turbans-outfits",
      category: "Outfit Ideas",
    },
    {
      title: "Gift ideas: thoughtful sets for birthdays & Eid",
      href: "/blog/gift-ideas-turbans-bags",
      category: "Gift Guide",
    },
  ];

  // Settings-driven hero content
  const heroTitle =
    settings?.hero_title ||
    "Feminine handmade pieces for everyday queens.";
  const heroSubtitle =
    settings?.hero_subtitle ||
    "Atelier de Méa brings you premium handcrafted turbans, clothing and bags — designed with love in Roche Bois, Mauritius.";

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
              New · Handmade turbans, clothing &amp; bags
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
                Shop New Arrivals
              </Link>
              <Link
                href="https://wa.me/23059117549"
                target="_blank"
                className="inline-flex items-center rounded-full border border-[#f9a8d4] px-5 py-2.5 text-xs sm:text-sm font-medium text-[#47201d] hover:bg-white/60 transition"
              >
                Order on WhatsApp
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-5 grid grid-cols-2 sm:flex sm:flex-wrap gap-2 text-[11px] sm:text-xs text-[#a36d63]">
              <Badge>Cash on Delivery (Mauritius)</Badge>
              <Badge>Juice &amp; Scan-to-Pay accepted</Badge>
              <Badge>Handmade in small batches</Badge>
              <Badge>Fast dispatch 24–48h*</Badge>
            </div>
          </div>

          {/* Hero visual area – uses images from settings if available, else gradient blocks */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {heroPrimaryImageUrl || heroSecondaryImageUrl ? (
              <>
                {/* Main photo */}
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

                {/* Secondary photo / decorative */}
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

                {/* Fallback decorative block to keep grid balanced */}
                <div className="rounded-3xl bg-gradient-to-br from-[#f9a8d4] via-white to-[#fecaca] shadow-lg h-32 sm:h-40 lg:h-44" />
              </>
            ) : (
              <>
                {/* Old gradient layout if no hero images configured */}
                <div className="rounded-3xl bg-gradient-to-br from-[#fb7185] via-[#ec4899] to-[#f97316] shadow-lg h-32 sm:h-40 lg:h-44" />
                <div className="rounded-3xl bg-gradient-to-br from-[#f97316] via-[#fb7185] to-[#ec4899] shadow-lg h-32 sm:h-40 lg:h-44" />
                <div className="rounded-3xl bg-gradient-to-br from-[#f9a8d4] via-white to-[#fecaca] shadow-lg h-32 sm:h-40 lg:h-44" />
                <div className="rounded-3xl bg-gradient-to-br from-white via-[#fecaca] to-[#f9a8d4] shadow-lg h-32 sm:h-40 lg:h-44" />
              </>
            )}
          </div>
        </div>
      </section>

      {/* ============ USP STRIP ============ */}
      <section className="border-t border-b border-[#fde7f1] bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-[11px] sm:text-xs text-[#a36d63]">
          <Usp title="Cash on Delivery">
            Pay on delivery in Mauritius.
          </Usp>
          <Usp title="Fast Dispatch">
            Orders prepared within 24–48h.
          </Usp>
          <Usp title="Handmade Quality">
            Carefully crafted in small batches.
          </Usp>
          <Usp title="Mauritius Based">
            Roche Bois, Port-Louis.
          </Usp>
        </div>
      </section>

      {/* ============ FEATURED CREATIONS ============ */}
      <SectionWrapper
        title="Featured Collections"
        subtitle="Explore bestselling turbans, outfits and bags."
        actionLabel="View full shop"
        actionHref="/shop"
      >
        <ProductGrid products={featuredProducts} />
      </SectionWrapper>

      {/* ============ NEW ARRIVALS ============ */}
      <SectionWrapper
        title="New Arrivals"
        subtitle="Fresh handmade pieces that just dropped."
        actionLabel="View all new"
        actionHref="/shop?sort=new"
      >
        <ProductGrid products={newArrivals} />
      </SectionWrapper>

      {/* ============ BEST SELLERS ============ */}
      <SectionWrapper
        title="Best Sellers"
        subtitle="Customer-favourite pieces loved by our queens."
        actionLabel="View all best sellers"
        actionHref="/shop"
      >
        <ProductGrid products={bestSellers} />
      </SectionWrapper>

      {/* ============ BLOG GRID (2 rows × 4) ============ */}
      <section className="bg-white border-t border-[#fde7f1]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-10 sm:py-12">
          <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold">
                From the Atelier Blog
              </h2>
              <p className="text-xs sm:text-sm text-[#a36d63]">
                Style tips, care guides and behind-the-scenes stories.
              </p>
            </div>
            <Link
              href="/blog"
              className="text-[11px] sm:text-xs font-medium text-[#e11d70] underline underline-offset-4"
            >
              Read all articles
            </Link>
          </div>

          <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {blogPosts.map((post) => (
              <article
                key={post.href}
                className="flex flex-col rounded-3xl border border-[#fde7f1] bg-[#fff7fb] overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-28 sm:h-32 bg-gradient-to-br from-[#fecaca] via-[#f9a8d4] to-[#fef2f2]" />
                <div className="flex-1 px-4 py-3 sm:px-5 sm:py-4 flex flex-col gap-2">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#e11d70]">
                    {post.category}
                  </span>
                  <h3 className="text-xs sm:text-sm font-semibold line-clamp-3">
                    {post.title}
                  </h3>
                  <Link
                    href={post.href}
                    className="mt-auto inline-flex items-center text-[11px] sm:text-xs font-medium text-[#e11d70] hover:underline"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ REVIEWS CAROUSEL + FORM ============ */}
      <section className="bg-[#fff7fb] border-t border-b border-[#fde7f1]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-10 sm:py-12">
          <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold">
                Loved by our queens
              </h2>
              <p className="text-xs sm:text-sm text-[#a36d63]">
                Scroll through what our customers say and leave your own
                review.
              </p>
            </div>
          </div>

          {/* Carousel-style strip (scroll + snap) */}
          <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
            {[
              {
                name: "Mélissa",
                text: "The bandeau is so comfortable and stylish. I wore it the whole day and it stayed perfect!",
                tag: "Bandeau · Everyday wear",
              },
              {
                name: "Aisha",
                text: "Finally turbans that fit my style and my hair. The quality is amazing for the price.",
                tag: "Turban · Special occasions",
              },
              {
                name: "Vanessa",
                text: "Fast delivery, friendly WhatsApp support and the product looks even better in real life.",
                tag: "Customer experience",
              },
              {
                name: "Rani",
                text: "I love that it’s handmade in Mauritius. You can feel the love in every stitch.",
                tag: "Made in Mauritius",
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
                      Verified customer
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

          {/* Leave a review form (posts to /api/reviews) */}
          <form
            action="/api/reviews"
            method="POST"
            className="mt-8 grid gap-4 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)] bg.white/60 border border-[#fde7f1] rounded-3xl px-4 py-4 sm:px-6 sm:py-5"
          >
            <div className="space-y-3">
              <h3 className="text-sm sm:text-base font-semibold text-[#47201d]">
                Leave a review
              </h3>
              <p className="text-[11px] sm:text-xs text-[#a36d63]">
                Share your experience with Atelier de Méa. Your review may
                appear on this page after moderation.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="review-name"
                    className="text-[11px] font-medium"
                  >
                    Name *
                  </label>
                  <input
                    id="review-name"
                    name="name"
                    required
                    className="rounded-full border border-[#f9a8d4] px-3 py-2 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#f9a8d4]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="review-email"
                    className="text-[11px] font-medium"
                  >
                    Email (not shown)
                  </label>
                  <input
                    id="review-email"
                    name="email"
                    type="email"
                    className="rounded-full border border-[#f9a8d4] px-3 py-2 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#f9a8d4]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="review-rating"
                    className="text-[11px] font-medium"
                  >
                    Rating
                  </label>
                  <select
                    id="review-rating"
                    name="rating"
                    className="rounded-full border border-[#f9a8d4] px-3 py-2 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#f9a8d4]"
                  >
                    <option value="">Select…</option>
                    <option value="5">⭐⭐⭐⭐⭐</option>
                    <option value="4">⭐⭐⭐⭐</option>
                    <option value="3">⭐⭐⭐</option>
                    <option value="2">⭐⭐</option>
                    <option value="1">⭐</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1 flex-1">
                <label
                  htmlFor="review-message"
                  className="text-[11px] font-medium"
                >
                  Your review *
                </label>
                <textarea
                  id="review-message"
                  name="message"
                  required
                  rows={4}
                  className="rounded-2xl border border-[#f9a8d4] px-3 py-2 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#f9a8d4] resize-vertical"
                  placeholder="Tell us what you loved about your Atelier de Méa piece…"
                />
              </div>
              <button
                type="submit"
                className="self-start inline-flex items-center rounded-full bg-[#ec4899] px-5 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#db2777] transition"
              >
                Submit review
              </button>
              <p className="text-[10px] sm:text-[11px] text-[#a36d63]">
                By submitting, you agree that your review may be published
                on this website. We only show your first name.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg.white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-10 sm:py-12 grid gap-8 lg:grid-cols-4 text-xs sm:text-sm text-[#a36d63]">
          <div>
            <h3 className="text-sm font-semibold text-[#47201d] mb-2">
              Atelier de Méa
            </h3>
            <p className="max-w-xs">
              Handmade turbans, clothing and bags crafted with love in
              Roche Bois, Mauritius.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#47201d] mb-2">
              Explore
            </h3>
            <ul className="space-y-1">
              <li>
                <Link href="/shop" className="hover:text-[#e11d70]">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#e11d70]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-[#e11d70]">
                  Support / FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#e11d70]">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#47201d] mb-2">
              Policies
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/policies/returns"
                  className="hover:text-[#e11d70]"
                >
                  Return Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/policies/privacy"
                  className="hover:text-[#e11d70]"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/policies/shipping"
                  className="hover:text-[#e11d70]"
                >
                  Delivery &amp; Shipping
                </Link>
              </li>
              <li>
                <Link
                  href="/policies/terms"
                  className="hover:text-[#e11d70]"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#47201d] mb-2">
              Contact
            </h3>
            <p>Roche Bois, Mauritius</p>
            <p className="mt-1">
              WhatsApp:{" "}
              <Link
                href="https://wa.me/23059117549"
                target="_blank"
                className="hover:text-[#e11d70]"
              >
                +230 5911 7549
              </Link>
            </p>
            <p>
              Email:{" "}
              <a
                href="mailto:aureth03@gmail.com"
                className="hover:text-[#e11d70]"
              >
                aureth03@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Payment badges */}
        <div className="border-t border-[#fde7f1] bg-[#fff7fb]">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 flex flex-wrap items-center gap-3 text-[11px] sm:text-xs text-[#a36d63]">
            <span className="font-semibold mr-1">
              Secure payments:
            </span>
            <Badge className="bg-white border-[#e5e7eb]">
              Visa / Mastercard
            </Badge>
            <Badge className="bg-white border-[#e5e7eb]">
              Juice by MCB
            </Badge>
            <Badge className="bg-white border-[#e5e7eb]">
              Scan-to-Pay
            </Badge>
            <Badge className="bg-white border-[#e5e7eb]">
              Cash on Delivery
            </Badge>
          </div>
        </div>

        {/* Copyright strip */}
        <div className="bg-[#be185d] text-white text-[11px] sm:text-xs">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-2">
            <span>
              © {new Date().getFullYear()} Atelier de Méa. All
              rights reserved.
            </span>
            <span>
              Website built by{" "}
              <a
                href="https://mobiz.mu"
                target="_blank"
                className="font-semibold underline underline-offset-2"
              >
                MoBiz.mu
              </a>{" "}
              <span className="text-red-300">❤</span>
            </span>
          </div>
        </div>
      </footer>
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
      className={`inline-flex items-center rounded-full border border.white/40 bg.white/40 px-3 py-1 text-[11px] sm:text-xs text-[#47201d] ${className}`}
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
    <section className="bg.white">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-10 sm:py-12">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs sm:text-sm text-[#a36d63]">
                {subtitle}
              </p>
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

type Product = Awaited<ReturnType<typeof getAllProducts>>[number];

function ProductGrid({ products }: { products: Product[] }) {
  if (!products || products.length === 0) {
    return (
      <p className="text-xs sm:text-sm text-[#a36d63]">
        No products available yet. Please check back soon.
      </p>
    );
  }

  return (
    <div className="grid gap-5 sm:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <article
          key={product.id}
          className="flex flex-col bg.white rounded-3xl border border-[#fde7f1] shadow-sm hover:shadow-md transition-shadow overflow-hidden"
        >
          <div className="relative w-full aspect-[4/5] bg-[#fff1f7]">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[10px] text-[#e5a4bc]">
                No image
              </div>
            )}

            {product.is_featured && (
              <span className="absolute left-2 top-2 rounded-full bg.white/90 px-2.5 py-1 text-[10px] font-semibold text-[#e11d70] shadow-sm">
                Featured
              </span>
            )}
            {product.stock !== null &&
              product.stock !== undefined &&
              product.stock <= 0 && (
                <span className="absolute right-2 top-2 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-semibold text.white">
                  Sold out
                </span>
              )}
          </div>

          <div className="flex flex-col flex-1 px-3 pt-3 pb-3 sm:px-4 sm:pt-4 sm:pb-4">
            <h3 className="text-xs sm:text-sm font-semibold text-[#47201d] line-clamp-2">
              {product.name}
            </h3>
            <p className="mt-1 text-[11px] sm:text-xs text-[#a36d63] line-clamp-2">
              {product.short_description ||
                product.long_description ||
                "Handmade piece by Atelier de Méa."}
            </p>

            <div className="mt-3 flex items-center justify-between">
              <div className="text-sm sm:text-base font-semibold text-[#e11d70]">
                Rs {product.price}
              </div>
              {product.category && (
                <span className="text-[10px] px-2 py-1 rounded-full bg-[#fff1f7] text-[#a36d63]">
                  {product.category}
                </span>
              )}
            </div>

            <div className="mt-3">
              <AddToCartControls
                productId={product.id}
                slug={product.slug}
                name={product.name}
                price={product.price}
                imageUrl={product.image_url}
              />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

