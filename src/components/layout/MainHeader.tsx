// src/components/layout/MainHeader.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

type MainHeaderProps = {
  logoUrl?: string | null;
  siteName?: string | null;
};

export function MainHeader({ logoUrl, siteName }: MainHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const displayName = siteName || "Atelier de Méa";

  // Always fallback to the local logo file if no custom logo exists in DB
  const effectiveLogo = logoUrl || "/logo/logo.png";

  return (
    <header className="border-b border-[#fde7f1] bg-white sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">
        {/* ================= LOGO + BRAND ================= */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="relative h-10 w-32 sm:h-11 sm:w-36 overflow-hidden">
            <Image
              src={effectiveLogo}
              alt={displayName}
              fill
              sizes="160px"
              className="object-contain"
              priority
            />
          </div>

          <div className="leading-tight">
            <div className="text-xs uppercase tracking-[0.25em] text-[#a36d63]">
              {displayName}
            </div>
            <div className="text-[11px] text-[#a36d63]">
              Handmade pieces · Mauritius
            </div>
          </div>
        </Link>

        {/* ================= DESKTOP NAV ================= */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm">
          <Link href="/" className="font-semibold text-[#e11d70]">
            Home
          </Link>
          <Link href="/shop?sort=new" className="hover:text-[#e11d70]">
            New Arrivals
          </Link>
          <Link href="/shop" className="hover:text-[#e11d70]">
            Categories
          </Link>
          <Link href="/about" className="hover:text-[#e11d70]">
            About Us
          </Link>
          <Link href="/support" className="hover:text-[#e11d70]">
            Support
          </Link>
        </nav>

        {/* ================= RIGHT ACTIONS (DESKTOP) ================= */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Follow us + social icons */}
          <div className="hidden md:flex items-center gap-2 pr-3 border-r border-[#fde7f1]">
            <span className="text-[11px] text-[#a36d63]">Follow us:</span>

            <Link href="https://facebook.com" target="_blank" aria-label="Facebook">
              <Image
                src="/social/facebook.svg"
                alt="Facebook"
                width={18}
                height={18}
                className="opacity-80 hover:opacity-100 transition"
              />
            </Link>

            <Link href="https://instagram.com" target="_blank" aria-label="Instagram">
              <Image
                src="/social/instagram.svg"
                alt="Instagram"
                width={18}
                height={18}
                className="opacity-80 hover:opacity-100 transition"
              />
            </Link>

            <Link href="https://tiktok.com" target="_blank" aria-label="TikTok">
              <Image
                src="/social/tiktok.svg"
                alt="TikTok"
                width={18}
                height={18}
                className="opacity-80 hover:opacity-100 transition"
              />
            </Link>
          </div>

          {/* Auth links */}
          <Link
            href="/login"
            className="text-[11px] sm:text-xs hover:text-[#e11d70]"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-full border border-[#f9a8d4] px-3 py-1.5 text-[11px] sm:text-xs font-medium text-[#47201d] hover:bg-[#fff1f7] transition"
          >
            Sign up
          </Link>

          {/* Cart icon */}
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#fde7f1] hover:bg-[#fff1f7] transition"
          >
            <span className="sr-only">Cart</span>
            <span className="text-lg">🛒</span>
          </Link>
        </div>

        {/* ================= MOBILE (Cart + Menu) ================= */}
        <div className="flex items-center gap-2 sm:hidden">
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#fde7f1] hover:bg-[#fff1f7] transition"
          >
            <span className="sr-only">Cart</span>
            <span className="text-base">🛒</span>
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#fde7f1] hover:bg-[#fff1f7] transition"
            aria-label="Toggle menu"
          >
            <span className="sr-only">Toggle menu</span>
            <span className="text-lg">{menuOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {/* ================= MOBILE NAV PANEL ================= */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#fde7f1] bg-white">
          <nav className="max-w-7xl mx-auto px-3 sm:px-6 py-3 flex flex-col gap-2 text-sm">
            <Link href="/" className="py-1 hover:text-[#e11d70]">
              Home
            </Link>
            <Link href="/shop?sort=new" className="py-1 hover:text-[#e11d70]">
              New Arrivals
            </Link>
            <Link href="/shop" className="py-1 hover:text-[#e11d70]">
              Categories
            </Link>
            <Link href="/about" className="py-1 hover:text-[#e11d70]">
              About Us
            </Link>
            <Link href="/support" className="py-1 hover:text-[#e11d70]">
              Support
            </Link>

            <div className="flex gap-3 pt-2">
              <Link
                href="/login"
                className="text-[11px] hover:text-[#e11d70]"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="text-[11px] hover:text-[#e11d70]"
              >
                Sign up
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

