// src/app/products/[slug]/page.tsx
import Link from "next/link";
import Image from "next/image";
import { getProductBySlug } from "@/lib/products";
import { AddToCartControls } from "@/components/cart/AddToCartControls";
import ProductReviews from "@/components/product/ProductReviews";
//                                  ^^^^^^^ lower-case folder

// Disable static cache – always fetch fresh
export const revalidate = 0;

type Params = {
  slug: string;
};

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  // ✅ Next 16: params is a Promise → await it
  const { slug } = await params;

  // Fetch product by slug
  const product = await getProductBySlug(slug);

  // If no product, show a clean "not found" screen
  if (!product) {
    return (
      <main className="min-h-screen bg-white text-[#47201d]">
        <section className="max-w-4xl mx-auto px-4 py-12">
          <nav className="text-[11px] sm:text-xs text-[#a36d63] flex flex-wrap gap-1 items-center mb-4">
            <Link href="/" className="hover:text-[#e11d70]">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-[#e11d70]">
              Shop
            </Link>
            <span>/</span>
            <span className="text-[#47201d] font-medium">
              Product not found
            </span>
          </nav>

          <h1 className="text-2xl font-semibold mb-3">Product not found</h1>
          <p className="mb-4 text-sm text-[#a36d63]">
            We couldn&apos;t find any product with this link. The item may have
            been removed or the URL is incorrect.
          </p>

          <Link
            href="/shop"
            className="inline-flex items-center rounded-full bg-[#ec4899] px-4 py-2 text-sm font-semibold text-white hover:bg-[#db2777] transition-colors"
          >
            ← Back to shop
          </Link>
        </section>
      </main>
    );
  }

  // ========== Normal product layout ==========

  const description =
    product.short_description ||
    product.long_description ||
    "Handmade piece by Atelier de Méa.";

  const whatsAppMessage = encodeURIComponent(
    `Hello, I'm interested in "${product.name}" (Rs ${product.price}) from Atelier de Méa. Is it available?`
  );
  const whatsAppUrl = `https://wa.me/23059117549?text=${whatsAppMessage}`;

  const inStock =
    product.stock === null ||
    product.stock === undefined ||
    product.stock > 0;

  // ✅ Handle images array safely
  const images = Array.isArray(product.images) ? product.images : [];
  const primaryImage = images.length > 0 ? images[0] : null;

  return (
    <main className="min-h-screen bg-white text-[#47201d]">
      {/* Breadcrumb + header */}
      <section className="border-b bg-[#fff7fb]">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:py-5 flex flex-col gap-3">
          <nav className="text-[11px] sm:text-xs text-[#a36d63] flex flex-wrap gap-1 items-center">
            <Link href="/" className="hover:text-[#e11d70]">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-[#e11d70]">
              Shop
            </Link>
            <span>/</span>
            <span className="text-[#47201d] font-medium truncate">
              {product.name}
            </span>
          </nav>

          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
                {product.name}
              </h1>
              {product.category && (
                <p className="mt-1 text-xs sm:text-sm text-[#a36d63]">
                  Category:{" "}
                  <span className="font-medium text-[#47201d]">
                    {product.category}
                  </span>
                </p>
              )}
            </div>

            <div className="text-right">
              <div className="text-sm sm:text-base text-[#a36d63]">
                Handmade in Mauritius
              </div>
              <div className="text-xs text-[#a36d63]">
                COD · Juice / Scan-to-Pay accepted
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main product layout */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-8 lg:py-10 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)]">
          {/* LEFT: main image + thumbnails */}
          <div className="space-y-4">
            <div className="relative w-full aspect-[4/5] rounded-3xl border border-[#fde7f1] bg-[#fff1f7] overflow-hidden">
              {primaryImage ? (
                <Image
                  src={primaryImage}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-[#e5a4bc]">
                  No image available
                </div>
              )}

              {product.is_featured && (
                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold text-[#e11d70] shadow-sm">
                  Featured
                </span>
              )}
              {!inStock && (
                <span className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-[10px] font-semibold text-white">
                  Sold out
                </span>
              )}
            </div>

            {/* Thumbnails – up to 4 */}
            {images.length > 0 && (
              <div className="flex gap-3">
                {images.slice(0, 4).map((img, idx) => (
                  <div
                    key={idx}
                    className="w-20 h-24 rounded-2xl border border-[#fde7f1] overflow-hidden bg-[#fff1f7]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: details */}
          <div className="space-y-6">
            {/* Price + stock + cart controls + WhatsApp */}
            <div className="p-4 sm:p-5 rounded-3xl border border-[#fde7f1] bg-[#fff7fb] space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-[#e11d70] mb-1">
                    Atelier de Méa
                  </div>
                  <div className="text-2xl font-semibold text-[#e11d70]">
                    Rs {product.price}
                  </div>
                </div>
                <div className="text-right text-xs text-[#a36d63]">
                  {inStock ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#dcfce7] text-[#166534] px-3 py-1">
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      In stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#fee2e2] text-[#b91c1c] px-3 py-1">
                      Sold out
                    </span>
                  )}
                  {product.stock !== null &&
                    product.stock !== undefined &&
                    product.stock > 0 && (
                      <div className="mt-1">
                        Approx. stock:{" "}
                        <span className="font-medium">{product.stock}</span>
                      </div>
                    )}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#a36d63]">
                {description}
              </p>

              {/* ✅ Cart + quantity controls (side cart + WhatsApp flow) */}
              <div className="pt-2 border-t border-[#fde7f1] mt-2">
                <AddToCartControls
                  productId={product.id}
                  slug={product.slug}
                  name={product.name}
                  price={product.price}
                  imageUrl={primaryImage || undefined}
                />
              </div>

              {/* Secondary actions */}
              <div className="pt-3 flex flex-wrap gap-3 text-[11px] sm:text-xs">
                <Link
                  href={whatsAppUrl}
                  target="_blank"
                  className="inline-flex items-center rounded-full border border-[#f9a8d4] px-4 py-2.5 font-medium text-[#47201d] hover:bg-[#fff1f7] transition-colors"
                >
                  Ask on WhatsApp
                </Link>
                <span className="text-[#a36d63]">
                  Or add to cart and confirm your full order in WhatsApp.
                </span>
              </div>

              <div className="pt-2 flex flex-wrap gap-3 text-[11px] text-[#a36d63]">
                <span>• Cash on Delivery in Mauritius</span>
                <span>• Juice &amp; Scan-to-Pay available</span>
                <span>• Handmade, small batch</span>
              </div>
            </div>

            {/* Details + care tips */}
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-semibold mb-2">Product details</h2>
                <ul className="text-xs sm:text-sm text-[#a36d63] space-y-1">
                  {product.category && (
                    <li>
                      <span className="font-medium text-[#47201d]">
                        Category:
                      </span>{" "}
                      {product.category}
                    </li>
                  )}
                  <li>
                    <span className="font-medium text-[#47201d]">Origin:</span>{" "}
                    Handmade in Mauritius
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-sm font-semibold mb-2">
                  Care &amp; usage tips
                </h2>
                <p className="text-xs sm:text-sm text-[#a36d63]">
                  For best results, handle your Atelier de Méa piece with care.
                  Avoid aggressive washing, bleach and high heat. If you have
                  any questions on how to care for this specific item, message
                  us on WhatsApp and we will guide you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews section */}
      <section className="bg-white border-t border-[#fde7f1]">
        <div className="max-w-6xl mx-auto px-4 py-8 lg:py-10">
          <ProductReviews productId={product.id} productName={product.name} />
        </div>
      </section>
    </main>
  );
}

