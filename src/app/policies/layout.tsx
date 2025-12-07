// src/app/policies/layout.tsx
import type { ReactNode } from "react";

export default function PoliciesLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-white text-[#47201d]">
      <section className="max-w-3xl mx-auto px-3 sm:px-6 py-10 sm:py-14">
        {children}
      </section>
    </main>
  );
}
