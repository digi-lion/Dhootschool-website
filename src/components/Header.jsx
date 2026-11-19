// src/components/Header.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useLang } from "../i18n/LangContext";
import schoolLogo from "../assets/Logo/School_Logo.jpeg";

const NAV_KEYS = [
  { key: "nav_home",         href: "/" },
  { key: "nav_about",        href: "/about" },
  { key: "nav_branches",     href: "/branches" },
  { key: "nav_academics",    href: "/academics" },
  { key: "nav_gallery",      href: "/gallery" },
  { key: "nav_achievements", href: "/achievements" },
  { key: "nav_academy",      href: "/academy" },
  { key: "nav_teachers",     href: "/teachers" },
  { key: "nav_results",      href: "/results" },
  { key: "nav_contact",      href: "/contact" },
];

const LANG_OPTIONS = [
  { code: "mr", label: "मराठी" },
  { code: "hi", label: "हिंदी" },
  { code: "en", label: "English" },
];

export default function Header() {
  const { lang, setLang, t, isPending } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* Top strip */}
      <div className="bg-navy-900 text-white text-xs py-1 px-4 flex justify-between items-center">
        <span>{t("udise")} &nbsp;|&nbsp; {t("index_no")}</span>

        {/* Language toggle */}
        <div className="flex gap-1">
          {LANG_OPTIONS.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => setLang(code)}
              disabled={isPending}
              className={`px-2 py-0.5 rounded text-xs font-semibold transition-all duration-200 ${
                lang === code
                  ? "bg-saffron-500 text-white ring-2 ring-saffron-300 scale-105"
                  : "bg-navy-700 text-gray-300 hover:bg-saffron-600 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* School identity bar */}
      <div className="bg-navy-800 text-white px-4 py-3 flex items-center gap-4">
        <Link
          to="/"
          className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-saffron-400 hover:scale-105 transition-transform bg-white"
        >
          <img src={schoolLogo} alt="School Logo" className="w-full h-full object-cover" />
        </Link>
        <Link to="/" className="flex-1 hover:opacity-90 transition-opacity">
          <h1 className="text-xl md:text-2xl font-bold font-display leading-tight">
            {t("school_name")}
          </h1>
          <p className="text-saffron-400 text-sm font-medium">{t("school_sub")}</p>
          <p className="text-gray-300 text-xs mt-0.5">{t("school_trust")}</p>
        </Link>
      </div>

      {/* Nav bar */}
      <nav className="bg-saffron-600 text-white">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="hidden md:flex overflow-x-auto">
            {NAV_KEYS.map(({ key, href }) => (
              <Link
                key={key}
                to={href}
                className="px-4 py-3 text-sm font-semibold hover:bg-saffron-700 hover:text-white transition-colors border-r border-saffron-500 last:border-r-0 whitespace-nowrap"
              >
                {t(key)}
              </Link>
            ))}
          </div>
          {/* Mobile hamburger */}
          <button
            className="md:hidden p-3 ml-auto"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden bg-navy-800 border-t border-navy-700 max-h-96 overflow-y-auto">
            {NAV_KEYS.map(({ key, href }) => (
              <Link
                key={key}
                to={href}
                onClick={() => setOpen(false)}
                className="block px-5 py-3 text-sm font-semibold border-b border-navy-700 hover:bg-saffron-600 transition-colors"
              >
                {t(key)}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
