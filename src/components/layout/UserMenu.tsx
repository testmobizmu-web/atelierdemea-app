"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";

type UserData = {
  id: string;
  email?: string;
  full_name?: string;
};

export default function UserMenu() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();

    // initial check
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email ?? undefined,
          full_name:
            (data.user.user_metadata?.full_name as string) ||
            (data.user.user_metadata?.name as string) ||
            undefined,
        });
      }
      setLoading(false);
    });

    // listen for login / logout changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? undefined,
          full_name:
            (session.user.user_metadata?.full_name as string) ||
            (session.user.user_metadata?.name as string) ||
            undefined,
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    setUser(null);
    window.location.href = "/";
  };

  if (loading) {
    return null;
  }

  // Not logged in → show Login / Sign up
  if (!user) {
    return (
      <div className="flex items-center gap-3 sm:gap-4">
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
      </div>
    );
  }

  // Logged in → show Account + Logout
  const displayName = user.full_name || user.email || "Account";

  return (
    <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs">
      <Link
        href="/account"
        className="inline-flex items-center rounded-full border border-[#f9a8d4] px-3 py-1.5 font-medium text-[#47201d] hover:bg-[#fff1f7] transition"
      >
        <span className="mr-1">👑</span>
        <span className="hidden sm:inline">{displayName}</span>
        <span className="sm:hidden">Account</span>
      </Link>
      <button
        type="button"
        onClick={handleLogout}
        className="text-[#a36d63] hover:text-[#e11d70]"
      >
        Logout
      </button>
    </div>
  );
}
