"use client";

import Link from "next/link";
import { useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    const supabase = getSupabaseBrowserClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // You can redirect or reload
    window.location.href = "/";
  };

  const handleGoogleLogin = async () => {
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) setError(error.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff7fb] px-4 py-20">
      <div className="w-full max-w-sm rounded-3xl border border-[#fde7f1] bg-white shadow-sm p-6 sm:p-8">
        <h1 className="text-xl font-semibold text-[#47201d] mb-1">Login</h1>
        <p className="text-xs text-[#a36d63] mb-5">
          Welcome back to Atelier de Méa 💗
        </p>

        {error && (
          <div className="mb-3 rounded-2xl bg-red-50 border border-red-200 px-3 py-2 text-[11px] text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium">Email</label>
            <input
              name="email"
              type="email"
              required
              className="rounded-full border border-[#f9a8d4] px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-[#f9a8d4]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium">Password</label>
            <input
              name="password"
              type="password"
              required
              className="rounded-full border border-[#f9a8d4] px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-[#f9a8d4]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-[#ec4899] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#db2777] disabled:opacity-60"
          >
            {loading ? "Please wait…" : "Login"}
          </button>
        </form>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="mt-3 w-full inline-flex items-center justify-center rounded-full border border-[#f9a8d4] px-5 py-2 text-xs font-medium text-[#47201d] hover:bg-[#fff1f7] transition"
        >
          Continue with Google
        </button>

        <p className="text-[11px] text-[#a36d63] mt-4 text-center">
          Don't have an account?{" "}
          <Link href="/signup" className="text-[#e11d70] font-semibold underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
