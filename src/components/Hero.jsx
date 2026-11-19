// src/components/Hero.jsx
import { useLang } from "../i18n/LangContext";
import schoolLogo from "../assets/Logo/School_Logo.jpeg";

export default function Hero() {
  const { t } = useLang();
  const notices = t("notices");

  return (
    <section id="home">
      {/* Notice ticker */}
      <div className="bg-navy-900 text-white flex items-center overflow-hidden py-2">
        <span className="flex-shrink-0 bg-saffron-600 text-white px-3 py-1 text-xs font-bold mr-3 z-10">
          {t("notice_label")}
        </span>
        <div className="overflow-hidden flex-1">
          <div className="marquee-track text-sm">
            {notices.map((n, i) => (
              <span key={i} className="mr-12">{n}</span>
            ))}
            {/* duplicate for seamless loop */}
            {notices.map((n, i) => (
              <span key={"b" + i} className="mr-12">{n}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Hero image */}
      <div className="relative h-64 md:h-80 bg-navy-800 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80"
          alt="School building"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-saffron-400 shadow-lg mb-3 bg-white">
            <img src={schoolLogo} alt="School Logo" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-2xl md:text-4xl font-bold font-display drop-shadow">
            {t("school_name")}
          </h2>
          <p className="text-saffron-400 mt-2 text-base md:text-lg font-medium">
            {t("school_tagline")}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs md:text-sm">
            {["school_est","school_board","school_medium","school_classes"].map((k) => (
              <span key={k} className="bg-white/20 backdrop-blur-sm border border-white/30 rounded px-3 py-1">
                {t(k)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
