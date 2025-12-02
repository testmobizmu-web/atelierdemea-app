// src/components/home/HomeClient.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";
import { AddToCartControls } from "@/components/cart/AddToCartControls";
import { useLanguage } from "@/components/layout/LanguageSwitcher";

type Props = {
  allProducts: Product[];
  // We don't need strict typing here, just what we use
  settings: any;
};

export default function HomeClient({ allProducts, settings }: Props) {
  const { lang } = useLanguage();
  const isFr = lang === "fr";

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
      title: isFr
        ? "5 façons de porter votre turban au quotidien"
        : "5 ways to style your turban for everyday queens",
      href: "/blog/how-to-style-your-turban",
      category: isFr ? "Conseils de style" : "Style Tips",
      image: "/blog/style-tips.png",
    },
    {
      title: isFr
        ? "Dans l’atelier – comment nous confectionnons chaque pièce Méa"
        : "Behind the seams – how we handcraft each Méa piece",
      href: "/blog/atelier-behind-the-scenes",
      category: isFr ? "Dans l’atelier" : "Inside the Atelier",
      image: "/blog/handcraft-each-mea-piece.png",
    },
    {
      title: isFr
        ? "Guide d’entretien : garder vos turbans frais & magnifiques"
        : "Care guide: keep your turbans fresh & beautiful",
      href: "/blog/turban-care-guide",
      category: isFr ? "Entretien & soin" : "Care & Maintenance",
      image: "/blog/turbans-fresh-beautiful.png",
    },
    {
      title: isFr
        ? "Comment fonctionnent le COD & Juice / Scan-to-Pay"
        : "How COD & Juice / Scan-to-Pay work with Atelier de Méa",
      href: "/blog/payment-options-mauritius",
      category: isFr ? "Guide d’achat" : "Shopping Guide",
      image: "/blog/scan-to-pay.png",
    },
    {
      title: isFr
        ? "Coiffer vos bandeaux pour cheveux bouclés, frisés & lisses"
        : "Styling bandeaux for curly, coily & straight hair",
      href: "/blog/style-bandeaux-hair-types",
      category: isFr ? "Conseils de style" : "Style Tips",
      image: "/blog/styling-bandeaux.png",
    },
    {
      title: isFr
        ? "Pourquoi nous aimons la slow fashion faite main"
        : "Why we love small-batch, slow handmade fashion",
      href: "/blog/slow-fashion-mauritius",
      category: isFr ? "Slow fashion" : "Slow Fashion",
      image: "/blog/slow-handmade-fashion.png",
    },
    {
      title: isFr
        ? "Associer vos turbans à vos tenues du quotidien"
        : "Match your turbans with your everyday outfits",
      href: "/blog/match-turbans-outfits",
      category: isFr ? "Idées de tenues" : "Outfit Ideas",
      image: "/blog/turbans-with-your-everyday-outfits.png",
    },
    {
      title: isFr
        ? "Idées cadeaux : coffrets pour anniversaires & Aïd"
        : "Gift ideas: thoughtful sets for birthdays & Eid",
      href: "/blog/gift-ideas-turbans-bags",
      category: isFr ? "Idées cadeaux" : "Gift Guide",
      image: "/blog/gift-ideas.png",
    },
  ];

  // Settings-driven hero content
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
                {isFr
                  ? "Expédition rapide 24–48h*"
                  : "Fast dispatch 24–48h*"}
              </Badge>
            </div>
          </div>

          {/* Hero visual area (unchanged) */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {heroPrimaryImageUrl || heroSecondaryImageUrl ? (
              <>
                {/* Main photo from settings */}
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

                {/* Secondary photo from settings */}
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

                {/* Decorative gradient block */}
                <div className="rounded-3xl bg-gradient-to-br from-[#f9a8d4] via-white to-[#fecaca] shadow-lg h-32 sm:h-40 lg:h-44" />
              </>
            ) : (
              <>
                {/* Fallback: 4 static hero images from /public/hero */}
                {["/hero/hero1.jpg", "/hero/hero2.jpg", "/hero/hero3.jpg", "/hero/hero4.jpg"].map(
                  (src, index) => (
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
                  )
                )}
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

      {/* ============ FEATURED CREATIONS ============ */}
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

      {/* ============ NEW ARRIVALS ============ */}
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

      {/* ============ BEST SELLERS ============ */}
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

      {/* ============ BLOG GRID (2 rows × 4) ============ */}
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

          <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {blogPosts.map((post) => (
              <article
                key={post.href}
                className="flex flex-col rounded-3xl border border-[#fde7f1] bg-[#fff7fb] overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative h-28 sm:h-32">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
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
                    {isFr ? "Lire plus →" : "Read more →"}
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

          {/* Leave a review form (posts to /api/reviews) */}
          <form
            action="/api/reviews"
            method="POST"
            className="mt-8 grid gap-4 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)] bg-white/60 border border-[#fde7f1] rounded-3xl px-4 py-4 sm:px-6 sm:py-5"
          >
            <div className="space-y-3">
              <h3 className="text-sm sm:text-base font-semibold text-[#47201d]">
                {isFr ? "Laisser un avis" : "Leave a review"}
              </h3>
              <p className="text-[11px] sm:text-xs text-[#a36d63]">
                {isFr
                  ? "Partagez votre expérience avec Atelier de Méa. Votre avis pourra apparaître sur cette page après modération."
                  : "Share your experience with Atelier de Méa. Your review may appear on this page after moderation."}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="review-name"
                    className="text-[11px] font-medium"
                  >
                    {isFr ? "Nom *" : "Name *"}
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
                    {isFr ? "Email (non affiché)" : "Email (not shown)"}
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
                    {isFr ? "Note" : "Rating"}
                  </label>
                  <select
                    id="review-rating"
                    name="rating"
                    className="rounded-full border border-[#f9a8d4] px-3 py-2 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#f9a8d4]"
                  >
                    <option value="">
                      {isFr ? "Sélectionner…" : "Select…"}
                    </option>
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
                  {isFr ? "Votre avis *" : "Your review *"}
                </label>
                <textarea
                  id="review-message"
                  name="message"
                  required
                  rows={4}
                  className="rounded-2xl border border-[#f9a8d4] px-3 py-2 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#f9a8d4] resize-vertical"
                  placeholder={
                    isFr
                      ? "Dites-nous ce que vous avez aimé dans votre pièce Atelier de Méa…"
                      : "Tell us what you loved about your Atelier de Méa piece…"
                  }
                />
              </div>
              <button
                type="submit"
                className="self-start inline-flex items-center rounded-full bg-[#ec4899] px-5 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#db2777] transition"
              >
                {isFr ? "Envoyer l’avis" : "Submit review"}
              </button>
              <p className="text-[10px] sm:text-[11px] text-[#a36d63]">
                {isFr
                  ? "En envoyant votre avis, vous acceptez qu’il soit publié sur ce site. Nous n’affichons que votre prénom."
                  : "By submitting, you agree that your review may be published on this website. We only show your first name."}
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-10 sm:py-12 grid gap-8 lg:grid-cols-4 text-xs sm:text-sm text-[#a36d63]">
          <div>
            <h3 className="text-sm font-semibold text-[#47201d] mb-2">
              Atelier de Méa
            </h3>
            <p className="max-w-xs">
              {isFr
                ? "Turbans, vêtements et sacs faits main avec amour à Roche Bois, Maurice."
                : "Handmade turbans, clothing and bags crafted with love in Roche Bois, Mauritius."}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#47201d] mb-2">
              {isFr ? "Explorer" : "Explore"}
            </h3>
            <ul className="space-y-1">
              <li>
                <Link href="/shop" className="hover:text-[#e11d70]">
                  {isFr ? "Boutique" : "Shop"}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#e11d70]">
                  {isFr ? "À propos" : "About Us"}
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-[#e11d70]">
                  {isFr ? "Support / FAQ" : "Support / FAQ"}
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
              {isFr ? "Politiques" : "Policies"}
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/policies/returns"
                  className="hover:text-[#e11d70]"
                >
                  {isFr ? "Politique de retour" : "Return Policy"}
                </Link>
              </li>
              <li>
                <Link
                  href="/policies/privacy"
                  className="hover:text-[#e11d70]"
                >
                  {isFr ? "Politique de confidentialité" : "Privacy Policy"}
                </Link>
              </li>
              <li>
                <Link
                  href="/policies/shipping"
                  className="hover:text-[#e11d70]"
                >
                  {isFr ? "Livraison & expédition" : "Delivery & Shipping"}
                </Link>
              </li>
              <li>
                <Link
                  href="/policies/terms"
                  className="hover:text-[#e11d70]"
                >
                  {isFr ? "Termes & conditions" : "Terms & Conditions"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#47201d] mb-2">
              {isFr ? "Contact" : "Contact"}
            </h3>
            <p>{isFr ? "Roche Bois, Maurice" : "Roche Bois, Mauritius"}</p>
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
              {isFr ? "Paiements sécurisés :" : "Secure payments:"}
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
              {isFr ? "Paiement à la livraison" : "Cash on Delivery"}
            </Badge>
          </div>
        </div>

        {/* Copyright strip */}
        <div className="bg-[#be185d] text-white text-[11px] sm:text-xs">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-2">
            <span>
              © {new Date().getFullYear()} Atelier de Méa.{" "}
              {isFr ? "Tous droits réservés." : "All rights reserved."}
            </span>
            <span>
              {isFr ? "Site web créé par " : "Website built by "}
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

function ProductGrid({
  products,
  isFr,
}: {
  products: Product[];
  isFr: boolean;
}) {
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
            {/* soft pink orb in background */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -bottom-10 h-32 w-32 rounded-full
                         bg-pink-100/80 blur-3xl opacity-60
                         animate-[atelier-pulse_7s_ease-in-out_infinite]"
            />

            <div className="relative flex h-full flex-col">
              {/* IMAGE — now 1:1 square */}
              <Link
                href={`/products/${product.slug}`}
                className="relative block w-full aspect-square bg-[#fff1f7]"
              >
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[10px] text-[#e5a4bc]">
                    {isFr ? "Pas d’image" : "No image"}
                  </div>
                )}

                {product.is_featured && (
                  <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-[#e11d70] shadow-sm">
                    {isFr ? "En vedette" : "Featured"}
                  </span>
                )}
                {isSoldOut && (
                  <span className="absolute right-2 top-2 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-semibold text-white">
                    {isFr ? "Rupture de stock" : "Sold out"}
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

                {/* fixed height so bottoms align */}
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

                {/* pushes controls to bottom so all cards align */}
                <div className="mt-3 mt-auto">
                  <AddToCartControls
                    productId={product.id}
                    slug={product.slug}
                    name={product.name}
                    price={product.price}
                    imageUrl={product.image_url}
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
