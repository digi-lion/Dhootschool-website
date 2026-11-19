import { Briefcase, Clock } from "lucide-react";
import { useLang } from "../i18n/LangContext";

export default function Recruitments() {
  const { t, langData } = useLang();
  const jobs = langData.jobs_list;

  const daysLeft = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diff = Math.ceil(
      (deadlineDate - today) / (1000 * 60 * 60 * 24)
    );
    return diff > 0 ? `${diff} ${t("days_text")}` : t("deadline_over");
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-navy-900 mb-4 text-center font-display">
          {t("recruitments_title")}
        </h2>
        <p className="text-gray-600 text-center mb-12">
          {t("recruitments_subtitle")}
        </p>

        {/* Job Listings */}
        <div className="space-y-6">
          {jobs.map((job, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 p-6 border-l-4 border-navy-600"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div className="flex gap-3">
                  <div className="p-3 bg-navy-50 rounded-lg h-fit">
                    <Briefcase className="text-navy-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy-900 mb-1 font-display">
                      {job.title}
                    </h3>
                    <p className="text-sm text-gray-600">{job.department}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="bg-navy-50 px-4 py-2 rounded-lg inline-block">
                    <p className="text-sm text-gray-600">{t("recruitment_positions")}</p>
                    <p className="text-2xl font-bold text-navy-900">
                      {job.positions}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-200">
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-wide">
                    {t("recruitment_qualification")}
                  </p>
                  <p className="text-sm font-semibold text-navy-900 mt-1">
                    {job.qualification}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-wide">
                    {t("recruitment_experience")}
                  </p>
                  <p className="text-sm font-semibold text-navy-900 mt-1">
                    {job.experience}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-wide">
                    {t("recruitment_salary")}
                  </p>
                  <p className="text-sm font-semibold text-navy-900 mt-1">
                    {job.salary}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={16} className="text-saffron-600" />
                    <span>
                      {t("recruitment_deadline_text")} : {daysLeft(job.deadline)}
                    </span>
                  </div>
                </div>
                <button className="bg-navy-600 hover:bg-navy-700 text-white px-6 py-2 rounded font-semibold transition-colors">
                  {t("recruitment_apply")}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Application Guidelines */}
        <div className="mt-12 bg-navy-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-navy-900 mb-4 font-display">
            {t("recruitment_guidelines")}
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="text-navy-600 font-bold">•</span>
              <span>
                सर्व महत्वाच्या कागदपत्रांसह आवेदन सादर करा
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-navy-600 font-bold">•</span>
              <span>
                आवेदन पत्र, स्नातक प्रमाणपत्र, B.Ed प्रमाणपत्र, अनुभव प्रमाणपत्र
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-navy-600 font-bold">•</span>
              <span>
                आवेदन मेल द्वारा: gangapurdhootkanya@gmail.com
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-navy-600 font-bold">•</span>
              <span>
                विषय ओळ: [पद] - [नाव] - [आवेदक क्र.]
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
