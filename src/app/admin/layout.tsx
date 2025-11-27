"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  const isLoginPage = pathname === "/admin/login";

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#3B2A24]">
      {/* Top bar */}
      <header className="border-b border-[#F3E3EC] bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-semibold">Atelier de Méa – Admin</div>
            <div className="text-[11px] text-[#7A6058]">
              Product dashboard &amp; management
            </div>
          </div>

          {!isLoginPage && (
            <div className="flex items-center gap-3 text-xs">
              <button
                onClick={() => router.push("/")}
                className="px-3 py-1 rounded-full border border-[#F3E3EC] text-[#7A6058] hover:border-[#C74382] hover:text-[#C74382] transition"
              >
                View Site
              </button>
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full bg-[#C74382] text-white hover:bg-[#d75b96] transition shadow-sm shadow-[#C74382]/30"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main */}
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-6">{children}</div>
      </main>

      <footer className="text-center text-[11px] text-[#7A6058] border-t border-[#F3E3EC] py-2">
        Admin · Atelier de Méa
      </footer>
    </div>
  );
}

