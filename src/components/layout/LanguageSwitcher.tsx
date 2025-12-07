// src/components/layout/LanguageSwitcher.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import Image from "next/image";

export type Lang = "en" | "fr";

type LanguageContextType = {
  lang: Lang;
  setLang: (value: Lang) => void;
};

const STORAGE_KEY = "atelierdemea_lang";
const COOKIE_NAME = "atelier_lang";

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // 1) Initial detection: cookie → localStorage → browser language
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;

      // cookie first
      const cookieMatch = document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${COOKIE_NAME}=`));
      const cookieLang = cookieMatch?.split("=")[1] as Lang | undefined;

      if (cookieLang === "en" || cookieLang === "fr") {
        setLangState(cookieLang);
        return;
      }

      // localStorage
      const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved === "en" || saved === "fr") {
        setLangState(saved);
        writeCookie(saved);
        return;
      }

      // browser language
      const nav = window.navigator.language.toLowerCase();
      const auto: Lang = nav.startsWith("fr") ? "fr" : "en";
      setLangState(auto);
      writeCookie(auto);
      window.localStorage.setItem(STORAGE_KEY, auto);
    } catch {
      // ignore
    }
  }, []);

  const writeCookie = (value: Lang) => {
    if (typeof document === "undefined") return;
    document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=31536000`;
  };

  const setLang = (value: Lang) => {
    setLangState(value);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, value);
    }
    writeCookie(value);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}

/**
 * EN / FR toggle with PNG flags
 */
export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  const changeLang = (value: Lang) => {
    setLang(value);
  };

  return (
    <div className="flex items-center gap-1 bg-white/10 rounded-full px-1 py-[2px]">
      {/* EN */}
      <button
        type="button"
        onClick={() => changeLang("en")}
        className={`flex items-center gap-1 px-1.5 py-[2px] rounded-full text-[10px] ${
          lang === "en" ? "bg-white/80 text-[#e11d70]" : "text-white/80"
        }`}
      >
        <Image
          src="/flags/en.png"
          alt="English"
          width={14}
          height={14}
          className="rounded-[2px]"
        />
        <span>EN</span>
      </button>

      {/* FR */}
      <button
        type="button"
        onClick={() => changeLang("fr")}
        className={`flex items-center gap-1 px-1.5 py-[2px] rounded-full text-[10px] ${
          lang === "fr" ? "bg-white/80 text-[#e11d70]" : "text-white/80"
        }`}
      >
        <Image
          src="/flags/fr.png"
          alt="Français"
          width={14}
          height={14}
          className="rounded-[2px]"
        />
        <span>FR</span>
      </button>
    </div>
  );
}

