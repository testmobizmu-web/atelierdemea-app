// src/app/blog/page.tsx
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/blogPosts";

export default function BlogIndexPage() {
  return (
    <main className="min-h-screen bg-[#fff7fb] text-[#47201d]">
      <section className="max-w-7xl mx-auto px-3 sm:px-6 py-10 sm:py-14">
        <p className="text-[11px] uppercase tracking-[0.28em] text-[#e11d70] mb-2">
          Atelier Blog
        </p>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-2">
          Style tips, inspiration & behind-the-scenes in Mauritius
        </h1>
        <p className="text-xs sm:text-sm text-[#a36d63] max-w-2xl mb-8">
          Discover our handmade-in-Mauritius creations, how to style them and
          how to care for them.
        </p>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col rounded-3xl bg-white border border-[#fde7f1] shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="relative w-full aspect-[16/9] block"
              >
                <Image
                  src={post.image}
                  alt={`${post.title_en} – Atelier de Méa blog`}
                  fill
                  className="object-cover"
                />
              </Link>

              <div className="px-4 py-4 sm:px-5 sm:py-5 flex flex-col gap-2 flex-1">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#e11d70]">
                  {post.category_en}
                </p>

                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-sm sm:text-base font-semibold leading-snug mb-1">
                    {post.title_en}
                  </h2>
                </Link>

                <p className="text-[11px] sm:text-xs text-[#a36d63] line-clamp-3">
                  {post.excerpt_en}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-auto inline-flex items-center text-[11px] sm:text-xs font-medium text-[#e11d70] hover:underline"
                >
                  Read full article →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
