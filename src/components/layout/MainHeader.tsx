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

  return (
    <header className="border-b border-[#fde7f1] bg-white sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">
        {/* Logo + brand */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          {/* If logoUrl set → image; fallback to gradient circle M */}
          {logoUrl ? (
            <div className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-full overflow-hidden border border-[#fde7f1] bg-[#fff1f7]">
              <Image
                src={logoUrl}
                alt={displayName}
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br from-[#fb7185] via-[#ec4899] to-[#f97316] flex items-center justify-center text-white font-bold text-lg">
              M
            </div>
          )}
          <div className="leading-tight">
            <div className="text-xs uppercase tracking-[0.25em] text-[#a36d63]">
              {displayName}
            </div>
            <div className="text-[11px] text-[#a36d63]">
              Handmade pieces · Mauritius
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
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

        {/* Right actions (desktop) */}
        <div className="hidden sm:flex items-center gap-3 sm:gap-4">
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

          {/* Cart icon – opens /cart page for now (side cart still works from AddToCartControls) */}
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#fde7f1] hover:bg-[#fff1f7] transition"
          >
            <span className="sr-only">Cart</span>
            <span className="text-lg">🛒</span>
          </Link>
        </div>

        {/* Mobile actions: hamburger + cart */}
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

      {/* Mobile nav panel */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#fde7f1] bg-white">
          <nav className="max-w-7xl mx-auto px-3 sm:px-6 py-3 flex flex-col gap-2 text-sm">
            <Link href="/" className="py-1 hover:text-[#e11d70]">
              Home
            </Link>
            <Link
              href="/shop?sort=new"
              className="py-1 hover:text-[#e11d70]"
            >
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
