// src/components/StudentVerificationModal.jsx
import { useEffect, useState } from "react";
import { X, Sparkles } from "lucide-react";
import { useLang } from "../i18n/LangContext";
import schoolLogo from "../assets/Logo/School_Logo.jpeg";

const CLASS_OPTIONS = Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`);
const SECTION_OPTIONS = ["A", "B", "C"];

const EMPTY_TOUCHED = { name: false, rollNo: false, studentClass: false, section: false };

export default function StudentVerificationModal({ onVerified, onClose }) {
  const { t } = useLang();
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [section, setSection] = useState("");
  const [touched, setTouched] = useState(EMPTY_TOUCHED);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const errors = {
    name: name.trim() === "",
    rollNo: rollNo.trim() === "",
    studentClass: studentClass === "",
    section: section === "",
  };
  const isValid = !errors.name && !errors.rollNo && !errors.studentClass && !errors.section;

  const markTouched = (field) => setTouched((tch) => ({ ...tch, [field]: true }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) {
      setTouched({ name: true, rollNo: true, studentClass: true, section: true });
      return;
    }
    onVerified({ name: name.trim(), rollNo: rollNo.trim(), studentClass, section });
  };

  const fieldClass = (hasError) =>
    `w-full px-3 py-2 text-sm rounded-lg border bg-white text-navy-800 focus:outline-none focus:ring-2 focus:ring-saffron-300 ${
      hasError ? "border-red-400" : "border-gray-300"
    }`;

  return (
    <div
      className="fixed inset-0 bg-navy-900/70 z-50 flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="bg-[#fdfaf3] w-full max-w-sm rounded-2xl shadow-2xl border border-saffron-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-navy-800 text-white px-5 py-4 text-center">
          <button
            onClick={onClose}
            aria-label={t("results_close")}
            className="absolute top-3 right-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-1.5 transition-colors"
          >
            <X size={16} />
          </button>
          <div className="flex items-center justify-center gap-2">
            <img
              src={schoolLogo}
              alt=""
              className="w-6 h-6 rounded-full border border-saffron-400 object-cover"
            />
            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-saffron-400">
              {t("results_verify_title")}
            </span>
          </div>
          <p className="text-xs text-white/70 mt-1">{t("results_verify_subtitle")}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-5 py-4 space-y-3">
          <div>
            <label className="block text-xs font-semibold text-navy-800 mb-1">{t("results_field_name")}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => markTouched("name")}
              placeholder={t("results_field_name_ph")}
              className={fieldClass(touched.name && errors.name)}
            />
            {touched.name && errors.name && (
              <p className="text-[11px] text-red-500 mt-1">{t("results_field_required")}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy-800 mb-1">{t("results_field_roll")}</label>
            <input
              type="text"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              onBlur={() => markTouched("rollNo")}
              placeholder={t("results_field_roll_ph")}
              className={fieldClass(touched.rollNo && errors.rollNo)}
            />
            {touched.rollNo && errors.rollNo && (
              <p className="text-[11px] text-red-500 mt-1">{t("results_field_required")}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-navy-800 mb-1">{t("results_field_class")}</label>
              <select
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
                onBlur={() => markTouched("studentClass")}
                className={fieldClass(touched.studentClass && errors.studentClass)}
              >
                <option value="">{t("results_field_class_ph")}</option>
                {CLASS_OPTIONS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {touched.studentClass && errors.studentClass && (
                <p className="text-[11px] text-red-500 mt-1">{t("results_field_required")}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-800 mb-1">{t("results_field_section")}</label>
              <select
                value={section}
                onChange={(e) => setSection(e.target.value)}
                onBlur={() => markTouched("section")}
                className={fieldClass(touched.section && errors.section)}
              >
                <option value="">{t("results_field_section_ph")}</option>
                {SECTION_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              {touched.section && errors.section && (
                <p className="text-[11px] text-red-500 mt-1">{t("results_field_required")}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className={`w-full mt-1 flex items-center justify-center gap-1.5 font-bold text-sm px-4 py-2.5 rounded-full transition-colors ${
              isValid
                ? "bg-navy-800 text-white hover:bg-navy-700 shadow-sm"
                : "bg-gray-200 text-gray-400"
            }`}
          >
            <Sparkles size={14} className={isValid ? "text-saffron-400" : "text-gray-400"} />
            {t("results_verify_continue")}
          </button>
        </form>
      </div>
    </div>
  );
}
