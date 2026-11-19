import { Trophy, Award, Star } from "lucide-react";
import { useLang } from "../i18n/LangContext";

export default function Achievements() {
  const { t, langData } = useLang();
  const achievements = langData.achievements_list;

  const getIcon = (type) => {
    switch (type) {
      case "trophy":
        return <Trophy className="w-8 h-8 text-saffron-600" />;
      case "medal":
        return <Award className="w-8 h-8 text-saffron-600" />;
      case "star":
        return <Star className="w-8 h-8 text-saffron-600" />;
      default:
        return null;
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-navy-900 mb-4 text-center font-display">
          {t("achievements_title")}
        </h2>
        <p className="text-gray-600 text-center mb-12">
          {t("achievements_subtitle")}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 p-6 border-l-4 border-saffron-500"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-saffron-50 rounded-lg">
                  {getIcon(achievement.icon)}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-navy-900 mb-1 font-display">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {achievement.description}
                  </p>
                  <span className="text-xs bg-saffron-100 text-saffron-700 px-2 py-1 rounded">
                    {achievement.year}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-saffron-50 rounded-lg p-8 border-l-4 border-saffron-600">
          <h3 className="text-2xl font-bold text-navy-900 mb-4 font-display">
            {t("achievement_desc")}
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="text-saffron-600 font-bold">✓</span>
              <span>महाराष्ट्र शिक्षा मंडळ मान्यता (SSC Board)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-saffron-600 font-bold">✓</span>
              <span>आंतरराष्ट्रीय गुणवत्ता प्रमाणपत्र (ISO certified)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-saffron-600 font-bold">✓</span>
              <span>समावेशक शिक्षण नेतृत्व पुरस्कार</span>
            </li>
            <li className="flex gap-3">
              <span className="text-saffron-600 font-bold">✓</span>
              <span>संस्कार आणि शिक्षण केंद्र (राष्ट्रीय मान्यता)</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
