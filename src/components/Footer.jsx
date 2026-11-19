// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { useLang } from "../i18n/LangContext";
import schoolLogo from "../assets/Logo/School_Logo.jpeg";

const GOVT_LINKS = [
  { key: "govt_maha",        url: "https://maharashtra.gov.in" },
  { key: "govt_balbharati",  url: "https://www.balbharati.in" },
  { key: "govt_dise",        url: "http://www.dise.in" },
  { key: "govt_ssa",         url: "http://ssa.nic.in" },
  { key: "govt_ncert",       url: "https://www.ncert.nic.in" },
];

const QUICK_LINKS = [
  { key: "nav_home",      to: "/" },
  { key: "nav_about",     to: "/about" },
  { key: "nav_academics", to: "/academics" },
  { key: "nav_teachers",  to: "/teachers" },
  { key: "nav_results",   to: "/results" },
  { key: "nav_contact",   to: "/contact" },
];

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-navy-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-saffron-400 bg-white">
              <img src={schoolLogo} alt="School Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-bold text-white text-sm leading-tight">{t("school_name")}</p>
              <p className="text-saffron-400 text-xs">{t("school_sub")}</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">{t("school_trust")}</p>
          <p className="text-xs text-gray-400">{t("udise")}</p>
          <p className="text-xs text-gray-400">{t("index_no")}</p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-white font-semibold mb-3 text-sm border-b border-gray-700 pb-1">
            {t("footer_quick")}
          </h4>
          <ul className="space-y-1">
            {QUICK_LINKS.map(({ key, to }) => (
              <li key={key}>
                <Link to={to} className="text-xs text-gray-400 hover:text-saffron-400 transition-colors">
                  › {t(key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Govt links */}
        <div>
          <h4 className="text-white font-semibold mb-3 text-sm border-b border-gray-700 pb-1">
            {t("footer_govt_links")}
          </h4>
          <ul className="space-y-1">
            {GOVT_LINKS.map(({ key, url }) => (
              <li key={key}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-400 hover:text-saffron-400 transition-colors"
                >
                  › {t(key)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-xs text-gray-500">
        {t("footer_copy")}
      </div>
    </footer>
  );
}
