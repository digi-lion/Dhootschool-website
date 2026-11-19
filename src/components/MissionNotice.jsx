import { useLang } from "../i18n/LangContext";

const NOTICES = {
  mr: [
    { date: "०५ मे २०२५",      text: "इयत्ता १ ली ते ९ वी साठी नवीन प्रवेश सुरू – कार्यालयात संपर्क करा" },
    { date: "२८ एप्रिल २०२५", text: "वार्षिक परीक्षा वेळापत्रक प्रसिद्ध – शाळेच्या सूचना फलकावर पाहा" },
    { date: "१५ एप्रिल २०२५", text: "दहावी SSC निकाल २०२४-२५ – शाळेचा उत्तीर्णता दर ९७.७%" },
    { date: "०२ एप्रिल २०२५", text: "विद्यार्थी शिष्यवृत्ती परीक्षेची नोंदणी सुरू आहे" },
    { date: "२० मार्च २०२५",  text: "वार्षिक स्नेहसंमेलन व पारितोषिक वितरण समारंभ यशस्वीपणे पार पडला" },
    { date: "१० मार्च २०२५",  text: "नवीन संगणक प्रयोगशाळा सुरू – ५० संगणकांची सुविधा उपलब्ध" },
  ],
  hi: [
    { date: "०५ मई २०२५",      text: "कक्षा १ से ९ के लिए नई प्रवेश प्रक्रिया शुरू – कार्यालय से संपर्क करें" },
    { date: "२८ अप्रैल २०२५", text: "वार्षिक परीक्षा समय-सारणी जारी – सूचना पट्ट देखें" },
    { date: "१५ अप्रैल २०२५", text: "SSC परिणाम २०२४-२५ – विद्यालय का उत्तीर्ण प्रतिशत ९७.७%" },
    { date: "०२ अप्रैल २०२५", text: "छात्रवृत्ति परीक्षा पंजीकरण अब खुला है" },
    { date: "२० मार्च २०२५",  text: "वार्षिक पुरस्कार समारोह सफलतापूर्वक सम्पन्न" },
    { date: "१० मार्च २०२५",  text: "नई कंप्यूटर लैब का उद्घाटन – ५० कंप्यूटरों की सुविधा" },
  ],
  en: [
    { date: "05 May 2025", text: "New Admissions Open for Class 1–9 — Contact the school office" },
    { date: "28 Apr 2025", text: "Annual Exam Timetable Released — Check the school notice board" },
    { date: "15 Apr 2025", text: "SSC Result 2024-25 Declared — School pass percentage: 97.7%" },
    { date: "02 Apr 2025", text: "Scholarship Exam Registration is now open for all students" },
    { date: "20 Mar 2025", text: "Annual Prize Distribution Ceremony concluded successfully" },
    { date: "10 Mar 2025", text: "New Computer Lab inaugurated with 50 computers" },
  ],
};

export default function MissionNotice() {
  const { t, lang } = useLang();
  const notices = NOTICES[lang] || NOTICES.en;

  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* ── Mission / Goal card ── */}
        <div className="rounded-xl overflow-hidden shadow-md border border-gray-200">
          {/* Navy header — same as admission table */}
          <div className="bg-navy-800 px-5 py-3 flex items-center gap-2">
            <span className="text-lg">🎯</span>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest">
              {t("mission_title")}
            </h3>
          </div>

          {/* Body */}
          <div className="bg-white px-5 py-5">
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              {t("mission_text")}
            </p>
            <p className="text-gray-600 text-xs leading-relaxed" style={{ textAlign: "justify" }}>
              {t("about_p2")}
            </p>

            {/* Established badge — saffron pill like admission rule badges */}
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 bg-saffron-100 text-saffron-800 text-xs font-semibold px-3 py-1 rounded-full">
                📅 {t("school_est")}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-navy-50 text-navy-800 text-xs font-semibold px-3 py-1 rounded-full border border-navy-200">
                🏫 {t("school_board")}
              </span>
            </div>
          </div>
        </div>

        {/* ── Notice Board ── */}
        <div
          className="rounded-xl overflow-hidden shadow-md border border-gray-200 flex flex-col"
          style={{ height: "280px" }}
        >
          {/* Navy header */}
          <div className="bg-navy-800 px-5 py-3 flex items-center gap-2 flex-shrink-0">
            <span className="text-lg">📋</span>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest">
              {t("notice_board") || "Notice Board"}
            </h3>
            <span className="ml-auto flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-300 text-xs font-medium">Live</span>
            </span>
          </div>

          {/* Scrolling rows — alternating white / saffron-50 like table rows */}
          <div className="flex-1 overflow-hidden relative">
            <div className="animate-notice-scroll">
              {[...notices, ...notices].map((n, i) => (
                <div
                  key={i}
                  className={`px-4 py-3 border-b border-gray-100 ${
                    i % 2 === 0 ? "bg-white" : "bg-saffron-50"
                  }`}
                >
                  <span className="inline-block bg-saffron-100 text-saffron-800 text-xs font-semibold px-2 py-0.5 rounded mb-1">
                    📅 {n.date}
                  </span>
                  <p className="text-gray-700 text-xs leading-snug">{n.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes notice-scroll {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-notice-scroll {
          animation: notice-scroll 18s linear infinite;
        }
        .animate-notice-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
