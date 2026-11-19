import { BookOpen, Users, Zap } from "lucide-react";
import { useLang } from "../i18n/LangContext";

export default function Academy() {
  const { t, langData } = useLang();
  const programs = langData.academy_programs;
  const features = langData.academy_features;

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-navy-900 mb-4 text-center font-display">
          {t("academy_title")}
        </h2>
        <p className="text-gray-600 text-center mb-12">
          {t("academy_subtitle")}
        </p>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {programs.map((program, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border-t-4 border-saffron-500"
            >
              <h3 className="text-lg font-bold text-navy-900 mb-3 font-display">
                {program.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{program.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-700">
                  <span className="font-semibold">कालावधी:</span>
                  <span>{program.duration}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span className="font-semibold">बॅच आकार:</span>
                  <span>{program.batch}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="bg-navy-50 rounded-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-navy-900 mb-8 text-center font-display">
            {t("academy_feature")}
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-block p-4 bg-saffron-100 rounded-lg text-saffron-600 mb-4">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-bold text-navy-900 mb-2 font-display">
                  {feature.title}
                </h4>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-saffron-500 to-saffron-600 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">{t("academy_cta")}</h3>
          <p className="mb-6">{t("academy_cta_desc")}</p>
          <button className="bg-white text-saffron-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
            अधिक माहिती मिळवा
          </button>
        </div>
      </div>
    </section>
  );
}
