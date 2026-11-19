// src/components/Teachers.jsx
import { useLang } from "../i18n/LangContext";

export default function Teachers() {
  const { t } = useLang();
  const teachers = t("teachers");

  return (
    <section id="teachers" className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-navy-800 section-heading mb-10">
          {t("teachers_title")}
        </h2>

        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-navy-800 text-white">
                <th className="px-4 py-3 text-left font-semibold">#</th>
                <th className="px-4 py-3 text-left font-semibold">{t("teacher_name")}</th>
                <th className="px-4 py-3 text-left font-semibold">{t("teacher_designation")}</th>
                <th className="px-4 py-3 text-left font-semibold">{t("teacher_subject")}</th>
                <th className="px-4 py-3 text-left font-semibold">{t("teacher_qual")}</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher, i) => (
                <tr
                  key={i}
                  className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-saffron-50"} hover:bg-saffron-100 transition-colors`}
                >
                  <td className="px-4 py-3 text-gray-500 font-medium">{i + 1}</td>
                  <td className="px-4 py-3 font-medium text-navy-800">{teacher.name}</td>
                  <td className="px-4 py-3 text-gray-700">{teacher.designation}</td>
                  <td className="px-4 py-3 text-gray-700">{teacher.subject}</td>
                  <td className="px-4 py-3 text-gray-600">{teacher.qual}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
