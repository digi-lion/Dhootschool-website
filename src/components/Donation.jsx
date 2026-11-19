import { Heart, Gift, Users, Target } from "lucide-react";
import { useLang } from "../i18n/LangContext";

export default function Donation() {
  const { t, langData } = useLang();
  const donationPlans = langData.donation_plans;

  const impacts = [
    {
      icon: <Users className="w-8 h-8" />,
      number: "500+",
      title: "विद्यार्थी लाभवंत",
    },
    {
      icon: <Target className="w-8 h-8" />,
      number: "98%",
      title: "उत्तीर्णता दर",
    },
    {
      icon: <Gift className="w-8 h-8" />,
      number: "₹50L+",
      title: "दान प्राप्त",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-navy-900 mb-4 text-center font-display">
          {t("donation_title")}
        </h2>
        <p className="text-gray-600 text-center mb-4">
          {t("donation_subtitle")}
        </p>
        <p className="text-center text-saffron-600 font-semibold mb-12">
          {t("donation_tagline")}
        </p>

        {/* Impact Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {impacts.map((impact, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-md p-6 text-center border-t-4 border-saffron-500"
            >
              <div className="inline-block p-4 bg-saffron-100 rounded-lg text-saffron-600 mb-4">
                {impact.icon}
              </div>
              <p className="text-3xl font-bold text-navy-900 font-display mb-2">
                {impact.number}
              </p>
              <p className="text-gray-600">{impact.title}</p>
            </div>
          ))}
        </div>

        {/* Donation Plans */}
        <h3 className="text-2xl font-bold text-navy-900 mb-8 text-center font-display">
          {t("donation_methods")}
        </h3>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {donationPlans.map((plan, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1 p-6 border-l-4 border-navy-600"
            >
              <div className="flex items-start gap-3 mb-4">
                <Heart className="text-red-500 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="text-lg font-bold text-navy-900 font-display">
                    {plan.name}
                  </h4>
                  <p className="text-2xl font-bold text-saffron-600 mt-1">
                    {plan.amount}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <div className="bg-gray-50 rounded p-4 mb-4">
                <p className="text-xs text-gray-600 uppercase tracking-wide mb-2">
                  लाभ
                </p>
                <ul className="space-y-2">
                  {plan.benefits.map((benefit, i) => (
                    <li key={i} className="flex gap-2 text-sm">
                      <span className="text-saffron-600">✓</span>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button className="w-full bg-saffron-600 hover:bg-saffron-700 text-white px-4 py-2 rounded font-semibold transition-colors">
                {t("donation_donate")}
              </button>
            </div>
          ))}
        </div>

        {/* Custom Donation */}
        <div className="bg-gradient-to-r from-navy-600 to-navy-800 rounded-lg p-8 text-white mb-12 text-center">
          <Gift className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-3">कस्टम दान</h3>
          <p className="mb-6 text-gray-100">
            आपल्या स्वतंत्र दान रकम निवडा
          </p>
          <button className="bg-saffron-500 hover:bg-saffron-600 text-white px-8 py-3 rounded-lg font-bold transition-colors">
            इच्छेनुसार दान करा
          </button>
        </div>

        {/* Tax Benefits */}
        <div className="bg-blue-50 rounded-lg p-8 border-l-4 border-blue-500">
          <h3 className="text-xl font-bold text-navy-900 mb-4 font-display">
            कर सुविधा
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span>भारतीय आयकर कायदा, कलम 80G अंतर्गत छूट</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span>दान देणारांना 50% पर्यंत कर सवलत</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span>
                संस्था रजिस्ट्रेशन क्र. : 27190204913/BIN/80G/2015
              </span>
            </li>
          </ul>
        </div>

        {/* Donation Methods */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="text-lg font-bold text-navy-900 mb-4 font-display">
              {t("donation_bank")}
            </h4>
            <div className="space-y-2 text-sm text-gray-700 bg-gray-50 p-4 rounded">
              <p>
                <span className="font-semibold">खाता नाम:</span> {langData.donation_bank_account_name}
              </p>
              <p>
                <span className="font-semibold">खाता क्र.:</span> {langData.donation_bank_account_no}
              </p>
              <p>
                <span className="font-semibold">IFSC:</span> {langData.donation_bank_ifsc}
              </p>
              <p>
                <span className="font-semibold">बँक:</span> {langData.donation_bank_name}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="text-lg font-bold text-navy-900 mb-4 font-display">
              {t("donation_contact")}
            </h4>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <span className="font-semibold">फोन:</span> {langData.donation_contact_phone}
              </p>
              <p>
                <span className="font-semibold">ईमेल:</span>{" "}
                {langData.donation_contact_email}
              </p>
              <p>
                <span className="font-semibold">वेबसाइट:</span>{" "}
                {langData.donation_website}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
