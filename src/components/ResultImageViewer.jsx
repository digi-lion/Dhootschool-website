// src/components/ResultImageViewer.jsx
import { useEffect } from "react";
import { X } from "lucide-react";
import { useLang } from "../i18n/LangContext";

export default function ResultImageViewer({ src, onClose }) {
  const { t } = useLang();

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-navy-900/70 z-50 flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-[35.2rem] max-h-[90vh] rounded-2xl shadow-2xl border border-saffron-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-navy-800 px-4 py-2.5 flex items-center justify-center shrink-0">
          <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-saffron-400">
            {t("results_title")}
          </span>
          <button
            onClick={onClose}
            aria-label={t("results_close")}
            className="absolute top-2 right-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-1.5 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
        <div className="overflow-auto p-3 bg-gray-50">
          <img src={src} alt="" className="w-full h-auto rounded-lg" />
        </div>
      </div>
    </div>
  );
}
