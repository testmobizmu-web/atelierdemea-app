"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@atelierdemea.com"); // change if you want
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.replace("/admin/products");
      }
    })();
  }, [router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    router.push("/admin/products");
  }

  return (
    <div className="flex items-center justify-center min-height-[70vh] py-10">
      <div className="w-full max-w-md rounded-2xl border border-[#F3E3EC] bg-white p-6 shadow-[0_18px_40px_rgba(199,67,130,0.12)]">
        <h1 className="text-xl font-semibold mb-1 text-[#3B2A24]">
          Admin Login
        </h1>
        <p className="text-xs text-[#7A6058] mb-4">
          Sign in with your admin email and password configured in Supabase.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3 text-sm">
          <div>
            <label className="block text-[#3B2A24] mb-1">Email</label>
            <input
              type="email"
              className="w-full rounded-md border border-[#F3E3EC] bg-white px-3 py-2 text-sm text-[#3B2A24] outline-none focus:border-[#C74382]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label className="block text-[#3B2A24] mb-1">Password</label>
            <input
              type="password"
              className="w-full rounded-md border border-[#F3E3EC] bg-white px-3 py-2 text-sm text-[#3B2A24] outline-none focus:border-[#C74382]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {errorMsg && (
            <p className="text-xs text-[#B91C1C] bg-[#FEF2F2] border border-[#FECACA] rounded-md px-3 py-2">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 inline-flex items-center justify-center rounded-full bg-[#C74382] hover:bg-[#d75b96] text-sm font-medium text-white px-4 py-2.5 disabled:opacity-60 shadow-md shadow-[#C74382]/30"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
