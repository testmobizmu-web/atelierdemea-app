"use client";

import { useState, useEffect } from "react";

type Lang = "en" | "fr";

const STORAGE_KEY = "atelierdemea_lang";

export default function LanguageSwitcher() {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved === "en" || saved === "fr") {
      setLang(saved);
    }
  }, []);

  const changeLang = (value: Lang) => {
    setLang(value);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, value);
    }
    // Later we can hook this into full i18n
  };

  return (
    <div className="flex items-center gap-1 bg-white/10 rounded-full px-1 py-[2px]">
      <button
        type="button"
        onClick={() => changeLang("en")}
        className={`flex items-center gap-1 px-1.5 py-[2px] rounded-full text-[10px] ${
          lang === "en" ? "bg-white/80 text-[#e11d70]" : "text-white/80"
        }`}
      >
        <span className="text-[11px]">🇬🇧</span>
        <span>EN</span>
      </button>
      <button
        type="button"
        onClick={() => changeLang("fr")}
        className={`flex items-center gap-1 px-1.5 py-[2px] rounded-full text-[10px] ${
          lang === "fr" ? "bg-white/80 text-[#e11d70]" : "text-white/80"
        }`}
      >
        <span className="text-[11px]">🇫🇷</span>
        <span>FR</span>
      </button>
    </div>
  );
}
