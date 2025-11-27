// src/components/layout/AnnouncementBar.tsx

"use client";

import Image from "next/image";
import Link from "next/link";

export function AnnouncementBar() {
  return (
    <div className="w-full bg-[#d6336c] text-white text-xs py-2 px-4 flex items-center justify-between">
      {/* Left: Language Switch */}
      <div className="flex items-center gap-2">
        <span className="font-semibold">LANG :</span>

        <Link href="?lang=en" className="flex items-center gap-1 hover:opacity-80">
          <Image
            src="/flags/en.png"
            width={16}
            height={16}
            alt="EN"
            className="rounded-sm"
          />
          EN
        </Link>

        <span className="opacity-50">/</span>

        <Link href="?lang=fr" className="flex items-center gap-1 hover:opacity-80">
          <Image
            src="/flags/fr.png"
            width={16}
            height={16}
            alt="FR"
            className="rounded-sm"
          />
          FR
        </Link>
      </div>

      {/* Center slogan */}
      <div className="hidden sm:block text-center text-[11px] font-light">
        Handmade with ❤️ in Mauritius – Premium turbans, bags & clothing
      </div>

      {/* Right: social icons */}
      <div className="flex items-center gap-2">
        <span className="font-semibold">Follow us:</span>

        <Link href="https://facebook.com" target="_blank">
          <Image src="/icons/facebook.svg" width={16} height={16} alt="Facebook" />
        </Link>

        <Link href="https://tiktok.com" target="_blank">
          <Image src="/icons/tiktok.svg" width={16} height={16} alt="TikTok" />
        </Link>

        <Link href="https://instagram.com" target="_blank">
          <Image src="/icons/instagram.svg" width={16} height={16} alt="Instagram" />
        </Link>
      </div>
    </div>
  );
}
