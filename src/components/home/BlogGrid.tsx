// src/components/home/BlogGrid.tsx
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/blogPosts";

export default function BlogGrid() {
  return (
    <section className="mt-16">
      <div className="grid gap-6 md:grid-cols-4">
        {BLOG_POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-3xl border border-[#fde7f1] bg-white/80 overflow-hidden hover:shadow-md transition"
          >
            <div className="relative h-40 w-full">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-[1.02] transition-transform"
              />
            </div>
            <div className="p-4 space-y-1">
              <p className="text-[11px] font-semibold text-[#ec4899] uppercase tracking-wide">
                {post.category}
              </p>
              <h3 className="text-sm font-semibold text-[#47201d] leading-snug">
                {post.title}
              </h3>
              <span className="inline-flex text-[11px] text-[#a36d63] mt-1">
                Read more →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
