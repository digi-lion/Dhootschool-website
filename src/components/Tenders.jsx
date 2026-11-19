import { FileText, Calendar, AlertCircle } from "lucide-react";
import { useLang } from "../i18n/LangContext";

export default function Tenders() {
  const { t, langData } = useLang();
  const tenders = langData.tenders_list;

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "proposed":
        return "bg-yellow-100 text-yellow-800";
      case "closed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status) => {
    const statusMap = { active: langData.tender_status_map?.active || "Active", proposed: langData.tender_status_map?.proposed || "Proposed", closed: langData.tender_status_map?.closed || "Closed" };
    return statusMap[status] || status;
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-navy-900 mb-4 text-center font-display">
          {t("tenders_title")}
        </h2>
        <p className="text-gray-600 text-center mb-12">
          {t("tenders_subtitle")}
        </p>

        {/* Alert */}
        <div className="mb-8 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <div className="flex gap-3">
            <AlertCircle className="text-blue-600 flex-shrink-0" size={20} />
            <div>
              <h3 className="font-bold text-blue-900 mb-1">{t("tender_notice")}</h3>
              <p className="text-blue-800 text-sm">
                सर्व निविदा संपूर्ण माहितीसह आणि योग्य दस्तऐवजांसह सादर करा.
              </p>
            </div>
          </div>
        </div>

        {/* Tenders List */}
        <div className="space-y-6">
          {tenders.map((tender, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border-l-4 border-saffron-500"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-navy-900 mb-2 font-display flex items-center gap-2">
                    <FileText className="text-saffron-600" size={20} />
                    {tender.title}
                  </h3>
                  <p className="text-gray-600">{tender.description}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${getStatusColor(
                    tender.status
                  )}`}
                >
                  {getStatusLabel(tender.status)}
                </span>
              </div>

              <div className="grid md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded">
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-wide">
                    {t("tender_amount")}
                  </p>
                  <p className="text-lg font-bold text-navy-900 mt-1">
                    {tender.amount}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-saffron-600" />
                  <div>
                    <p className="text-xs text-gray-600">{t("tender_issued")}</p>
                    <p className="font-semibold text-navy-900">
                      {new Date(tender.issueDate).toLocaleDateString("mr-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-red-600" />
                  <div>
                    <p className="text-xs text-gray-600">{t("tender_deadline")}</p>
                    <p className="font-semibold text-navy-900">
                      {new Date(tender.dueDate).toLocaleDateString("mr-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <button className="bg-saffron-600 hover:bg-saffron-700 text-white px-4 py-2 rounded font-semibold transition-colors">
                  {t("tender_detail")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
