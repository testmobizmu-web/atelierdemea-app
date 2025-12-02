// src/components/layout/MainHeader.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/components/layout/LanguageSwitcher";

type MainHeaderProps = {
  logoUrl?: string | null;
  siteName?: string | null;
};

export function MainHeader({ logoUrl, siteName }: MainHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const { lang, setLang } = useLanguage();

  const displayName = siteName || "Atelier de Méa";
  // Fallback to local logo
  const effectiveLogo = logoUrl || "/logo/logo.png";

  const tagline =
    lang === "en"
      ? "Handmade with 💗 in Mauritius – Premium turbans, bags & clothing"
      : "Fait main avec 💗 à Maurice – Turbans, sacs & vêtements premium";

  const followLabel = lang === "en" ? "Follow us:" : "Suivez-nous :";

  return (
    <header className="sticky top-0 z-30">
      {/* ============ TOP PINK STRIP (LANG + TAGLINE + SOCIAL) ============ */}
      <div className="bg-[#be185d] text-white text-[10px] sm:text-[11px]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-1.5 flex items-center justify-between gap-3">
          {/* Left: language flags */}
          <div className="flex items-center gap-2">
            <span className="font-semibold">LANG :</span>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`flex items-center gap-1 px-1 py-[2px] rounded-full transition ${
                lang === "en"
                  ? "bg-white/90 text-[#be185d]"
                  : "text-white/80 hover:bg-white/10"
              }`}
            >
              <Image
                src="/flags/en.png"
                alt="English"
                width={14}
                height={14}
              />
              <span>EN</span>
            </button>
            <span className="text-white/40 text-xs">/</span>
            <button
              type="button"
              onClick={() => setLang("fr")}
              className={`flex items-center gap-1 px-1 py-[2px] rounded-full transition ${
                lang === "fr"
                  ? "bg-white/90 text-[#be185d]"
                  : "text-white/80 hover:bg-white/10"
              }`}
            >
              <Image
                src="/flags/fr.png"
                alt="Français"
                width={14}
                height={14}
              />
              <span>FR</span>
            </button>
          </div>

          {/* Center: tagline (switches EN/FR) */}
          <div className="hidden sm:block text-center flex-1 text-[11px]">
            {tagline}
          </div>

          {/* Right: Follow us + social icons (label switches EN/FR) */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-white/90">
              {followLabel}
            </span>

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
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
          {/* ---------- DESKTOP LAYOUT (logo left, nav centered, actions right) ---------- */}
          <div className="hidden md:grid md:grid-cols-[auto_1fr_auto] md:items-center md:gap-4">
            {/* Logo + brand (LEFT) */}
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-10 w-10 sm:h-11 sm:w-11 rounded-full overflow-hidden">
                <Image
                  src={effectiveLogo}
                  alt={displayName}
                  fill
                  sizes="44px"
                  className="object-cover"
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

            {/* Menu centered (CENTER) */}
            <nav className="flex justify-center gap-6 text-xs sm:text-sm">
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

            {/* Actions (RIGHT) */}
            <div className="flex items-center justify-end gap-3 sm:gap-4">
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
          </div>

          {/* ---------- MOBILE LAYOUT ---------- */}
          <div className="flex md:hidden items-center justify-between gap-3">
            {/* Logo + brand on mobile (LEFT) */}
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-9 w-9 rounded-full overflow-hidden">
                <Image
                  src={effectiveLogo}
                  alt={displayName}
                  fill
                  sizes="36px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="leading-tight">
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#a36d63]">
                  {displayName}
                </div>
                <div className="text-[10px] text-[#a36d63]">
                  Handmade pieces · Mauritius
                </div>
              </div>
            </Link>

            {/* Right: cart + hamburger */}
            <div className="flex items-center gap-2">
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
        </div>

        {/* Mobile slide-down menu */}
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


