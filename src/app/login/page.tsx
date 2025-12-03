// src/app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      console.error("Login error:", error);
      setError(error.message || "Unable to sign in. Please try again.");
      return;
    }

    // Success: go back home or to account page
    router.push("/account");
  }

  return (
    <div className="min-h-screen bg-[#fff7fb] px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-md rounded-3xl border border-[#fde7f1] bg-white shadow-sm p-6 sm:p-8">
        <h1 className="text-lg sm:text-xl font-semibold text-[#47201d] mb-2">
          Login to Atelier de Méa
        </h1>
        <p className="text-xs sm:text-sm text-[#a36d63] mb-5">
          Access your orders and save your favourite pieces.
        </p>

        {error && (
          <div className="mb-3 rounded-2xl bg-red-50 border border-red-200 px-3 py-2 text-[11px] text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium text-[#47201d]">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-full border border-[#f9a8d4] px-3 py-2 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#f9a8d4]"
              placeholder="you@example.com"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium text-[#47201d]">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-full border border-[#f9a8d4] px-3 py-2 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#f9a8d4]"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center rounded-full bg-[#ec4899] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#db2777] transition disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-4 text-[11px] sm:text-xs text-[#a36d63]">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-[#e11d70] hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
