
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type Lang = "en" | "fr";

type LanguageContextType = {
  lang: Lang;
  setLang: (value: Lang) => void;
};

const STORAGE_KEY = "atelierdemea_lang";

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Load from localStorage on first mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved === "en" || saved === "fr") {
      setLangState(saved);
    }
  }, []);

  const setLang = (value: Lang) => {
    setLangState(value);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, value);
    }
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
 * Small EN/FR toggle pill with flags
 */
export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  const changeLang = (value: Lang) => {
    setLang(value);
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
