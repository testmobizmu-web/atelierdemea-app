// src/components/layout/MainFooter.tsx
"use client";

import Link from "next/link";
import type React from "react";

export function MainFooter({ isFr = false }: { isFr?: boolean }) {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-10 sm:py-12 grid gap-8 lg:grid-cols-4 text-xs sm:text-sm text-[#a36d63]">
        <div>
          <h3 className="text-sm font-semibold text-[#47201d] mb-2">
            Atelier de Méa
          </h3>
          <p className="max-w-xs">
            {isFr
              ? "Turbans, vêtements et sacs faits main avec amour à Roche Bois, Maurice."
              : "Handmade turbans, clothing and bags crafted with love in Roche Bois, Mauritius."}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[#47201d] mb-2">
            {isFr ? "Explorer" : "Explore"}
          </h3>
          <ul className="space-y-1">
            <li>
              <Link href="/shop" className="hover:text-[#e11d70]">
                {isFr ? "Boutique" : "Shop"}
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[#e11d70]">
                {isFr ? "À propos" : "About Us"}
              </Link>
            </li>
            <li>
              <Link href="/support" className="hover:text-[#e11d70]">
                {isFr ? "Support / FAQ" : "Support / FAQ"}
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-[#e11d70]">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[#47201d] mb-2">
            {isFr ? "Politiques" : "Policies"}
          </h3>
          <ul className="space-y-1">
            <li>
              <Link
                href="/policies/returns"
                className="hover:text-[#e11d70]"
              >
                {isFr ? "Politique de retour" : "Return Policy"}
              </Link>
            </li>
            <li>
              <Link
                href="/policies/privacy"
                className="hover:text-[#e11d70]"
              >
                {isFr ? "Politique de confidentialité" : "Privacy Policy"}
              </Link>
            </li>
            <li>
              <Link
                href="/policies/shipping"
                className="hover:text-[#e11d70]"
              >
                {isFr ? "Livraison & expédition" : "Delivery & Shipping"}
              </Link>
            </li>
            <li>
              <Link
                href="/policies/terms"
                className="hover:text-[#e11d70]"
              >
                {isFr ? "Termes & conditions" : "Terms & Conditions"}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[#47201d] mb-2">
            {isFr ? "Contact" : "Contact"}
          </h3>
          <p>{isFr ? "Roche Bois, Maurice" : "Roche Bois, Mauritius"}</p>
          <p className="mt-1">
            WhatsApp:{" "}
            <Link
              href="https://wa.me/23059117549"
              target="_blank"
              className="hover:text-[#e11d70]"
            >
              +230 5911 7549
            </Link>
          </p>
          <p>
            Email:{" "}
            <a
              href="mailto:aureth03@gmail.com"
              className="hover:text-[#e11d70]"
            >
              aureth03@gmail.com
            </a>
          </p>
        </div>
      </div>

      {/* Payment badges */}
      <div className="border-t border-[#fde7f1] bg-[#fff7fb]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 flex flex-wrap items-center gap-3 text-[11px] sm:text-xs text-[#a36d63]">
          <span className="font-semibold mr-1">
            {isFr ? "Paiements sécurisés :" : "Secure payments:"}
          </span>
          <Badge className="bg-white border-[#e5e7eb]">Visa / Mastercard</Badge>
          <Badge className="bg-white border-[#e5e7eb]">Juice by MCB</Badge>
          <Badge className="bg-white border-[#e5e7eb]">Scan-to-Pay</Badge>
          <Badge className="bg-white border-[#e5e7eb]">
            {isFr ? "Paiement à la livraison" : "Cash on Delivery"}
          </Badge>
        </div>
      </div>

      {/* Copyright strip */}
      <div className="bg-[#be185d] text-white text-[11px] sm:text-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-2">
          <span>
            © {new Date().getFullYear()} Atelier de Méa.{" "}
            {isFr ? "Tous droits réservés." : "All rights reserved."}
          </span>
          <span>
            {isFr ? "Site web créé par " : "Website built by "}
            <a
              href="https://mobiz.mu"
              target="_blank"
              className="font-semibold underline underline-offset-2"
            >
              MoBiz.mu
            </a>{" "}
            <span className="text-red-300">❤</span>
          </span>
        </div>
      </div>
    </footer>
  );
}

function Badge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-white/40 bg-white/40 px-3 py-1 text-[11px] sm:text-xs text-[#47201d] ${className}`}
    >
      {children}
    </span>
  );
}
