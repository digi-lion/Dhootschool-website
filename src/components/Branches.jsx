import { MapPin, Phone, Mail } from "lucide-react";
import { useLang } from "../i18n/LangContext";

export default function Branches() {
  const { t, langData } = useLang();
  const branches = langData.branches_list;

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-navy-900 mb-4 text-center font-display">
          {t("branches_title")}
        </h2>
        <p className="text-gray-600 text-center mb-12">
          {t("branches_subtitle")}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches.map((branch, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border-t-4 border-saffron-500"
            >
              <h3 className="text-xl font-bold text-navy-900 mb-4 font-display">
                {branch.name}
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <MapPin className="text-saffron-600 flex-shrink-0" size={18} />
                  <p className="text-gray-700">{branch.address}</p>
                </div>
                <div className="flex gap-3">
                  <Phone className="text-saffron-600 flex-shrink-0" size={18} />
                  <p className="text-gray-700">{branch.phone}</p>
                </div>
                <div className="flex gap-3">
                  <Mail className="text-saffron-600 flex-shrink-0" size={18} />
                  <p className="text-gray-700">{branch.email}</p>
                </div>
                <p className="text-gray-600 text-xs pt-2">
                  {t("branch_established")}: {branch.established}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
