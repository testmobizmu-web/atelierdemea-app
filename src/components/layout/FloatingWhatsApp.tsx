"use client";

import Link from "next/link";
import Image from "next/image";

export default function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-5 right-4 z-50 sm:bottom-6 sm:right-6">
      <Link
        href="https://wa.me/23059117549"
        target="_blank"
        aria-label="Chat with us on WhatsApp"
        className="group flex items-center gap-2 rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 px-3 py-2 sm:px-4 sm:py-2.5 transition-transform hover:-translate-y-0.5"
      >
        <span className="relative h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-white flex items-center justify-center">
          <Image
            src="/icons/whatsapp.png"
            alt="WhatsApp"
            fill
            sizes="36px"
            className="object-contain p-1"
          />
        </span>

        <span className="text-xs sm:text-sm font-semibold">
          Chat with us
        </span>
      </Link>
    </div>
  );
}

