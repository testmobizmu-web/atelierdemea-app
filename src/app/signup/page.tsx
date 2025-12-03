// src/app/signup/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { syncProfileFromAuth } from "@/lib/profile";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name"));
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // If email confirmation disabled, user is already logged in → sync profile
    await syncProfileFromAuth();

    alert("Account created! Please check your email to confirm (if required).");
    setLoading(false);
  };

  const handleGoogleSignup = async () => {
    setError(null);
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
        <h1 className="text-xl font-semibold text-[#47201d] mb-1">Sign Up</h1>
        <p className="text-xs text-[#a36d63] mb-5">
          Create your Atelier de Méa account 💗
        </p>

        {error && (
          <div className="mb-3 rounded-2xl bg-red-50 border border-red-200 px-3 py-2 text-[11px] text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium">Full Name</label>
            <input
              name="name"
              type="text"
              required
              className="rounded-full border border-[#f9a8d4] px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-[#f9a8d4]"
            />
          </div>

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
            {loading ? "Creating account…" : "Sign Up"}
          </button>
        </form>

        <button
          type="button"
          onClick={handleGoogleSignup}
          className="mt-3 w-full inline-flex items-center justify-center rounded-full border border-[#f9a8d4] px-5 py-2 text-xs font-medium text-[#47201d] hover:bg-[#fff1f7] transition"
        >
          Continue with Google
        </button>

        <p className="text-[11px] text-[#a36d63] mt-4 text-center">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#e11d70] font-semibold underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

