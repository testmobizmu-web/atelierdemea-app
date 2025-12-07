// src/app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/blogPosts";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  if (!Array.isArray(blogPosts)) return [];
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default function BlogPostPage({ params }: PageProps) {
  const safePosts = Array.isArray(blogPosts) ? blogPosts : [];
  const post = safePosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const title = post.title_en;
  const category = post.category_en;
  const excerpt = post.excerpt_en;

  return (
    <main className="min-h-screen bg-white text-[#47201d]">
      <section className="bg-gradient-to-b from-[#fff1f7] via-white to-white">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 py-10 sm:py-14">
          <Link
            href="/blog"
            className="inline-flex items-center text-xs text-[#e11d70] mb-4 hover:underline"
          >
            ← Back to all articles
          </Link>

          <p className="text-[11px] uppercase tracking-[0.2em] text-[#e11d70] mb-2">
            {category}
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold mb-3">{title}</h1>
          <p className="text-sm sm:text-base text-[#a36d63] max-w-2xl">
            {excerpt}
          </p>

          <div className="relative mt-6 w-full aspect-[16/9] rounded-3xl overflow-hidden border border-[#fde7f1] bg-[#fff7fb]">
            <Image src={post.image} alt={title} fill className="object-cover" />
          </div>

          <article className="mt-8 space-y-4 text-sm sm:text-base leading-relaxed text-[#47201d] whitespace-pre-line">
            {post.content_en}
          </article>
        </div>
      </section>
    </main>
  );
}



