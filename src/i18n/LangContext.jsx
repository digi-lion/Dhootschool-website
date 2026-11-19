// src/i18n/LangContext.jsx
import { createContext, useContext, useState, useTransition } from "react";
import { translations } from "./translations";

const LangContext = createContext();

// localStorage se saved language lo, warna default 'mr'
function getSavedLang() {
  try {
    const saved = localStorage.getItem("site_lang");
    if (saved && translations[saved]) return saved;
  } catch (_) {}
  return "mr";
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(getSavedLang);
  const [isPending, startTransition] = useTransition();

  const setLang = (newLang) => {
    startTransition(() => {
      setLangState(newLang);
      try { localStorage.setItem("site_lang", newLang); } catch (_) {}
    });
  };

  const t = (key) => translations[lang]?.[key] ?? key;
  const langData = translations[lang];

  return (
    <LangContext.Provider value={{ lang, setLang, t, langData, isPending }}>
      {/* Smooth fade on language change */}
      <div
        style={{
          opacity: isPending ? 0.6 : 1,
          transition: "opacity 150ms ease",
        }}
      >
        {children}
      </div>
      
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
