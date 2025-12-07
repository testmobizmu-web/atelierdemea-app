// src/hooks/useT.ts
"use client";

import { useLanguage } from "@/components/layout/LanguageSwitcher";
import { messages } from "@/lib/i18n";

export function useT() {
  const { lang } = useLanguage();
  const dict = lang === "fr" ? messages.fr : messages.en;

  return { t: dict, lang };
}
