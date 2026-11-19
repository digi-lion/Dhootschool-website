// src/components/Academics.jsx
import { BookOpen, FlaskConical, Monitor, Dumbbell, Droplets, ShieldCheck, BookMarked, Home, ClipboardList, GraduationCap, Award, Users, ShieldAlert } from "lucide-react";
import { useLang } from "../i18n/LangContext";

const FAC_ICONS = {
  fac_classrooms: BookOpen,
  fac_library:    BookMarked,
  fac_computer:   Monitor,
  fac_science:    FlaskConical,
  fac_playground: Dumbbell,
  fac_water:      Droplets,
  fac_cctv:       ShieldCheck,
  fac_toilet:     Home,
};

const EXAM_CATEGORIES = [
  { icon: ClipboardList, labelKey: "exam_cat_internal",    itemsKey: "exam_cat_internal_items"    },
  { icon: GraduationCap, labelKey: "exam_cat_board",       itemsKey: "exam_cat_board_items"       },
  { icon: Award,         labelKey: "exam_cat_scholarship", itemsKey: "exam_cat_scholarship_items" },
];

export default function Academics() {
  const { t, langData } = useLang();

  const academics = [
    ["academics_syllabus", "academics_syllabus_val"],
    ["academics_subjects", "academics_subjects_val"],
    ["academics_extra",    "academics_extra_val"],
  ];

  return (
    <section id="academics" className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-navy-800 section-heading mb-10">
          {t("academics_title")}
        </h2>

        {/* Academics info table */}
        <div className="mb-6 overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 rounded overflow-hidden">
            <tbody>
              {academics.map(([labelKey, valKey], i) => (
                <tr key={labelKey} className={i % 2 === 0 ? "bg-saffron-50" : "bg-white"}>
                  <td className="px-4 py-3 font-semibold text-navy-800 w-1/3 border-b border-gray-100">
                    {t(labelKey)}
                  </td>
                  <td className="px-4 py-3 text-gray-700 border-b border-gray-100">
                    {t(valKey)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Examination System - structured 3-category cards */}
        <div className="mb-10">
          <h3 className="text-lg font-bold text-navy-800 mb-3 border-b-2 border-saffron-500 pb-1">
            📋 {t("academics_exam")}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-5 bg-saffron-50 border border-saffron-200 rounded-lg p-4">
            {t("academics_exam_desc")}
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {EXAM_CATEGORIES.map(({ icon: Icon, labelKey, itemsKey }) => {
              const items = langData[itemsKey] || [];
              return (
                <div key={labelKey} className="bg-saffron-50 border border-saffron-200 rounded-lg p-4 hover:shadow-md transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="bg-saffron-100 rounded-full p-2">
                      <Icon className="text-saffron-700" size={18} />
                    </div>
                    <h4 className="font-bold text-navy-800 text-sm">{t(labelKey)}</h4>
                  </div>
                  <ul className="space-y-1">
                    {items.map((item, idx) => (
                      <li key={idx} className="text-gray-700 text-xs flex items-start gap-1">
                        <span className="text-saffron-600 font-bold mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Facilities */}
        <h2 className="text-xl md:text-2xl font-bold text-center text-navy-800 section-heading mb-8">
          {t("facilities_title")}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Object.keys(FAC_ICONS).map((key) => {
            const Icon = FAC_ICONS[key];
            return (
              <div
                key={key}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col items-center text-center hover:shadow-md hover:border-saffron-400 transition-all"
              >
                <div className="bg-saffron-100 rounded-full p-3 mb-3">
                  <Icon className="text-saffron-700" size={22} />
                </div>
                <p className="font-semibold text-navy-800 text-sm mb-1">{t(key)}</p>
                <p className="text-gray-600 text-xs leading-snug">{t(key + "_val")}</p>
              </div>
            );
          })}
        </div>

        {/* Admission Policy */}
        <div className="mt-14">
          <h2 className="text-xl md:text-2xl font-bold text-center text-navy-800 section-heading mb-2">
            {t("admission_title")}
          </h2>
          <p className="text-center text-gray-500 text-sm mb-6">{t("admission_subtitle")}</p>

          {/* Student count badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 bg-navy-800 text-white px-5 py-2 rounded-full text-sm font-semibold shadow">
              <Users size={16} className="text-saffron-400" />
              {t("admission_total")}
            </div>
          </div>

          {/* Admission rows table */}
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-navy-800 text-white">
                  <th className="px-4 py-3 text-left font-semibold w-1/4">वर्ग / Class</th>
                  <th className="px-4 py-3 text-left font-semibold w-1/4">नियम / Rule</th>
                  <th className="px-4 py-3 text-left font-semibold">तपशील / Details</th>
                </tr>
              </thead>
              <tbody>
                {(langData.admission_rows || []).map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-saffron-50"}>
                    <td className="px-4 py-3 font-semibold text-navy-800 border-b border-gray-100 align-top">{row.class}</td>
                    <td className="px-4 py-3 border-b border-gray-100 align-top">
                      <span className="inline-block bg-saffron-100 text-saffron-800 text-xs font-semibold px-2 py-0.5 rounded">
                        {row.rule}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700 border-b border-gray-100 align-top">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Transparency note */}
          <div className="bg-green-50 border-l-4 border-green-500 rounded-r-lg p-4 flex gap-3 items-start">
            <ShieldAlert size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-green-800 text-sm mb-1">{t("admission_transparency_title")}</p>
              <p className="text-green-700 text-sm">{t("admission_transparency_text")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
