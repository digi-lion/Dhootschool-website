// src/components/Notices.jsx
import { FileText } from "lucide-react";
import { useLang } from "../i18n/LangContext";

// Static notice data (replace with API / CMS later)
const NOTICE_DATA = [
  { date_mr: "०१/०५/२०२५", date_hi: "०१/०५/२०२५", date_en: "01/05/2025",
    title_mr: "प्रवेश अर्ज पत्रक २०२५-२६ – इ. पहिली ते नववी",
    title_hi: "प्रवेश अर्ज पत्र २०२५-२६ – कक्षा १ से ९",
    title_en: "Admission Form 2025-26 – Class 1 to 9",
    type: "admission" },
  { date_mr: "१५/०४/२०२५", date_hi: "१५/०४/२०२५", date_en: "15/04/2025",
    title_mr: "SSC निकाल २०२४ जाहीर – शाळा यादी",
    title_hi: "SSC परिणाम २०२४ घोषित",
    title_en: "SSC Result 2024 Declared",
    type: "result" },
  { date_mr: "०१/०४/२०२५", date_hi: "०१/०४/२०२५", date_en: "01/04/2025",
    title_mr: "शिष्यवृत्ती परीक्षा नोंदणी – इ. ५ वी व ८ वी",
    title_hi: "छात्रवृत्ति परीक्षा पंजीकरण – कक्षा ५ व ८",
    title_en: "Scholarship Exam Registration – Class 5 & 8",
    type: "exam" },
  { date_mr: "२०/०३/२०२५", date_hi: "२०/०३/२०२५", date_en: "20/03/2025",
    title_mr: "वार्षिक स्नेहसंमेलन – दि. १५ जानेवारी २०२५",
    title_hi: "वार्षिक स्नेह मिलन समारोह",
    title_en: "Annual Gathering – 15 January 2025",
    type: "event" },
];

const TYPE_COLORS = {
  admission: "bg-blue-100 text-blue-700",
  result:    "bg-green-100 text-green-700",
  exam:      "bg-yellow-100 text-yellow-700",
  event:     "bg-purple-100 text-purple-700",
};

export default function Notices() {
  const { lang } = useLang();

  return (
    <section id="notices" className="py-10 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold text-navy-800 section-heading mb-6 text-center">
          {lang === "mr" ? "सूचना / परिपत्रके" : lang === "hi" ? "सूचनाएँ / परिपत्र" : "Notices & Circulars"}
        </h2>
        <div className="divide-y divide-gray-100 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          {NOTICE_DATA.map((n, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-3 bg-white hover:bg-saffron-50 transition-colors">
              <div className="bg-saffron-100 rounded p-2 flex-shrink-0">
                <FileText size={16} className="text-saffron-700" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-navy-800 truncate">
                  {lang === "mr" ? n.title_mr : lang === "hi" ? n.title_hi : n.title_en}
                </p>
              </div>
              <span className="text-xs text-gray-400 flex-shrink-0">
                {lang === "mr" ? n.date_mr : lang === "hi" ? n.date_hi : n.date_en}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded font-medium flex-shrink-0 ${TYPE_COLORS[n.type]}`}>
                {lang === "mr" ? (n.type === "result" ? "निकाल" : n.type) : lang === "hi" ? (n.type === "result" ? "परिणाम" : n.type) : n.type}
              </span>
              <a
                href="#"
                className="text-xs text-saffron-600 hover:underline flex-shrink-0 font-semibold"
              >
                PDF
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
