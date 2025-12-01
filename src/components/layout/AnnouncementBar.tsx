// src/components/layout/AnnouncementBar.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export function AnnouncementBar() {
  return (
    <div className="bg-[#db2777] text-white text-[11px] sm:text-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-1.5 flex items-center justify-between gap-3">
        {/* LEFT: language selector */}
        <div className="flex items-center gap-2">
          <span className="font-semibold tracking-wide">LANG :</span>
          <div className="flex items-center gap-1.5">
            {/* EN flag */}
            <Image
              src="/flags/en.png"
              alt="English"
              width={16}
              height={16}
              className="rounded-[2px] border border-white/40"
            />
            <span>EN</span>
            <span className="mx-0.5">/</span>
            {/* FR flag */}
            <Image
              src="/flags/fr.png"
              alt="Français"
              width={16}
              height={16}
              className="rounded-[2px] border border-white/40"
            />
            <span>FR</span>
          </div>
        </div>

        {/* CENTER: tagline (hidden on very small screens) */}
        <div className="hidden sm:block text-center flex-1">
          Handmade with <span className="text-pink-200">♥</span> in Mauritius – Premium turbans, bags &amp; clothing
        </div>

        {/* RIGHT: social icons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="hidden sm:inline">Follow us:</span>

          <Link
            href="https://www.facebook.com"
            target="_blank"
            aria-label="Facebook"
            className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <Image
              src="/social/facebook.svg"
              alt="Facebook"
              width={14}
              height={14}
            />
          </Link>

          <Link
            href="https://www.tiktok.com"
            target="_blank"
            aria-label="TikTok"
            className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <Image
              src="/social/tiktok.svg"
              alt="TikTok"
              width={14}
              height={14}
            />
          </Link>

          <Link
            href="https://www.instagram.com"
            target="_blank"
            aria-label="Instagram"
            className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <Image
              src="/social/instagram.svg"
              alt="Instagram"
              width={14}
              height={14}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
