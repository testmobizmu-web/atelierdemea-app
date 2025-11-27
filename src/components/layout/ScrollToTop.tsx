"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="fixed bottom-4 left-4 z-40 w-9 h-9 rounded-full bg-white border border-[#fde7f1] shadow flex items-center justify-center text-xs text-[#47201d] hover:bg-[#fff7fb]"
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}
