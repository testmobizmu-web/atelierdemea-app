"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // TODO: connect to your backend login logic
    setTimeout(() => {
      alert("Login demo — hook with real backend");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff7fb] px-4 py-20">
      <div className="w-full max-w-sm rounded-3xl border border-[#fde7f1] bg-white shadow-sm p-6 sm:p-8">
        <h1 className="text-xl font-semibold text-[#47201d] mb-1">Login</h1>
        <p className="text-xs text-[#a36d63] mb-5">
          Welcome back to Atelier de Méa 💗
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium">Email</label>
            <input
              type="email"
              required
              className="rounded-full border border-[#f9a8d4] px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-[#f9a8d4]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium">Password</label>
            <input
              type="password"
              required
              className="rounded-full border border-[#f9a8d4] px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-[#f9a8d4]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-[#ec4899] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#db2777]"
          >
            {loading ? "Please wait…" : "Login"}
          </button>
        </form>

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
