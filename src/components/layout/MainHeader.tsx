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
  // Fallback to local logo
  const effectiveLogo = logoUrl || "/logo/logo.png";

  return (
    <header className="sticky top-0 z-30">
      {/* ============ TOP PINK STRIP ============ */}
      <div className="bg-[#be185d] text-white text-[10px] sm:text-[11px]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-1.5 flex items-center justify-between gap-3">
          {/* Left: language flags */}
          <div className="flex items-center gap-2">
            <span className="font-semibold">LANG :</span>
            <button className="flex items-center gap-1 hover:opacity-90">
              <Image
                src="/flags/en.png"
                alt="English"
                width={14}
                height={14}
              />
              <span>EN</span>
            </button>
            <span className="text-white/40 text-xs">/</span>
            <button className="flex items-center gap-1 hover:opacity-90">
              <Image
                src="/flags/fr.png"
                alt="Français"
                width={14}
                height={14}
              />
              <span>FR</span>
            </button>
          </div>

          {/* Center: tagline */}
          <div className="hidden sm:block text-center flex-1 text-[11px]">
            Handmade with 💗 in Mauritius – Premium turbans, bags &amp; clothing
          </div>

          {/* Right: Follow us + social icons */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-white/90">Follow us:</span>

            <Link
              href="https://facebook.com"
              target="_blank"
              aria-label="Facebook"
              className="hover:opacity-90"
            >
              <Image
                src="/social/facebook.svg"
                alt="Facebook"
                width={18}
                height={18}
              />
            </Link>

            <Link
              href="https://tiktok.com"
              target="_blank"
              aria-label="TikTok"
              className="hover:opacity-90"
            >
              <Image
                src="/social/tiktok.svg"
                alt="TikTok"
                width={18}
                height={18}
              />
            </Link>

            <Link
              href="https://instagram.com"
              target="_blank"
              aria-label="Instagram"
              className="hover:opacity-90"
            >
              <Image
                src="/social/instagram.svg"
                alt="Instagram"
                width={18}
                height={18}
              />
            </Link>
          </div>
        </div>
      </div>

      {/* ============ MAIN NAV BAR ============ */}
      <div className="border-b border-[#fde7f1] bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">
          {/* LEFT GROUP: logo + brand + nav (desktop) */}
          <div className="flex items-center gap-6 flex-1 min-w-0">
            {/* Logo + brand (always left) */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              {/* circular logo */}
              <div className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-full overflow-hidden border border-[#fde7f1] bg-[#fff1f7]">
                <Image
                  src={effectiveLogo}
                  alt={displayName}
                  fill
                  sizes="40px"
                  className="object-cover"
                  priority
                />
              </div>

              {/* brand text */}
              <div className="leading-tight">
                <div className="text-xs font-semibold tracking-[0.25em] text-[#a36d63] uppercase">
                  {displayName}
                </div>
                <div className="text-[11px] text-[#a36d63]">
                  Handmade pieces · Mauritius
                </div>
              </div>
            </Link>

            {/* Desktop nav – sits next to brand on the left */}
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
          </div>

          {/* RIGHT ACTIONS (desktop) */}
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

            <Link
              href="/cart"
              aria-label="Cart"
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#fde7f1] hover:bg-[#fff1f7] transition"
            >
              <span className="sr-only">Cart</span>
              <span className="text-lg">🛒</span>
            </Link>
          </div>

          {/* MOBILE ACTIONS */}
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

        {/* MOBILE NAV PANEL */}
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
      </div>
    </header>
  );
}

