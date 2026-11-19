// src/components/Results.jsx
import { useState } from "react";
import { Trophy, Sparkles, ChevronRight, ChevronUp, BarChart3, Users, GraduationCap, Percent, CalendarRange } from "lucide-react";
import { useLang } from "../i18n/LangContext";
import { useBoardResults } from "../hooks/useBoardResults";
import StudentVerificationModal from "./StudentVerificationModal";
import ResultImageViewer from "./ResultImageViewer";
import sampleResultImage from "../assets/result/result.png";

const MEDAL = ["🥇", "🥈", "🥉"];
const MERIT_PREVIEW_COUNT = 5;

function streamLabel(stream, t) {
  if (stream === "Science") return t("results_science");
  if (stream === "Arts") return t("results_arts");
  return stream;
}

function sumField(rows, field) {
  const vals = rows.map((r) => r[field]).filter((v) => v !== null && v !== undefined);
  if (vals.length === 0) return null;
  return vals.reduce((a, b) => a + b, 0);
}

// Weighted by appeared count, using the school's own explicit SCHOOL RESULT
// percentage per row — not the calculated passed/appeared ratio, since a
// handful of years have Distinction+1st+2nd+PassClass summing to more than
// the sheet's own TOTAL (a data-entry inconsistency in the source workbook,
// most visible in the HSC sheet). Averaging the explicit percentages avoids
// ever producing a nonsensical >100% figure from that mismatch.
function weightedOverallPassPercent(rows) {
  let weightedSum = 0;
  let totalWeight = 0;
  rows.forEach((r) => {
    if (r.schoolResultPercentValue !== null && r.appeared !== null) {
      weightedSum += r.schoolResultPercentValue * r.appeared;
      totalWeight += r.appeared;
    }
  });
  return totalWeight > 0 ? weightedSum / totalWeight : null;
}

function bestTopperPercent(rows) {
  let best = null;
  rows.forEach((r) => {
    (r.toppers || []).forEach((tp) => {
      if (tp.percentageValue !== null && (best === null || tp.percentageValue > best)) best = tp.percentageValue;
    });
  });
  return best;
}

function StatCard({ icon: Icon, value, label }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg px-3 py-2.5 flex items-center gap-2 shadow-sm">
      <span className="shrink-0 w-8 h-8 rounded-full bg-saffron-50 flex items-center justify-center">
        <Icon size={15} className="text-saffron-600" />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-bold text-navy-800 leading-tight truncate">{value}</p>
        <p className="text-[10px] text-gray-500 leading-tight truncate">{label}</p>
      </div>
    </div>
  );
}

// Flattens year records into table rows — a year with stream-wise data
// (e.g. HSC 2024-2026, which only has Science/Arts, no combined row in the
// sheet) becomes one row per stream instead of a fabricated combined row.
function toRows(records) {
  const rows = [];
  [...records].reverse().forEach((r) => {
    if (r.streams.length > 0) {
      r.streams.forEach((s) => rows.push({ year: r.year, stream: s.stream, ...s }));
    } else {
      rows.push({ year: r.year, stream: null, ...r });
    }
  });
  return rows;
}

// Every topper named in the sheet, most recent first — not just the latest
// year — so the honour roll matches the Excel's full TOPPER column.
function toMeritList(records) {
  const list = [];
  [...records].reverse().forEach((r) => {
    if (r.toppers.length > 0) {
      r.toppers.forEach((tp) => list.push({ year: r.year, stream: null, ...tp }));
    } else if (r.streams.length > 0) {
      r.streams.forEach((s) => {
        s.toppers.forEach((tp) => list.push({ year: r.year, stream: s.stream, ...tp }));
      });
    }
  });
  return list;
}

export default function Results() {
  const { t } = useLang();
  const { loading, error, data } = useBoardResults();
  const [board, setBoard] = useState("ssc");
  const [showAllMerit, setShowAllMerit] = useState(false);
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [resultImageOpen, setResultImageOpen] = useState(false);

  const records = (board === "ssc" ? data?.ssc : data?.hsc) ?? [];
  const rows = toRows(records);
  const meritList = toMeritList(records);
  const meritVisible = showAllMerit ? meritList : meritList.slice(0, MERIT_PREVIEW_COUNT);

  const totalAppeared = sumField(rows, "appeared");
  const totalPassed = sumField(rows, "passed");
  const overallPassPercentValue = weightedOverallPassPercent(rows);
  const overallPassPercent = overallPassPercentValue !== null ? `${overallPassPercentValue.toFixed(2)}%` : null;
  const bestTopperPct = bestTopperPercent(rows);
  const recordYears = records.map((r) => r.year);
  const yearsCovered = recordYears.length
    ? `${Math.min(...recordYears)}–${Math.max(...recordYears)}`
    : null;

  return (
    <section id="results" className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-navy-800 section-heading mb-6">
          {t("results_title")}
        </h2>

        {/* Toggle row + "View Results" button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3 mb-8 relative">
          <div className="flex gap-2 justify-center">
            {[
              ["ssc", t("results_tab_ssc")],
              ["hsc", t("results_tab_hsc")],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setBoard(key)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  board === key
                    ? "bg-navy-800 text-white shadow"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-saffron-50 hover:border-saffron-400"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setVerifyOpen(true)}
            className="blink-fast inline-flex items-center justify-center gap-1.5 bg-white border border-saffron-400 text-navy-800 text-xs sm:text-sm font-semibold px-4 py-2 rounded-full shadow-sm hover:bg-saffron-50 hover:border-saffron-500 hover:shadow-md transition-all duration-200 sm:absolute sm:right-0"
          >
            <Sparkles size={14} className="text-saffron-500" />
            {t("results_view_btn")}
          </button>
        </div>

        {error && (
          <p className="text-center text-red-500 text-sm mb-6">{t("results_no_data")}</p>
        )}

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {/* Results table — compact, full year history, scrolls within its box */}
          <div className="md:col-span-2 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
            <div className="overflow-auto max-h-[420px]">
              <table className="min-w-full text-xs">
                <thead>
                  <tr className="bg-navy-800 text-white sticky top-0">
                    <th className="px-2.5 py-2 text-left whitespace-nowrap">{t("results_year")}</th>
                    <th className="px-2 py-2 text-center">{t("results_distinction")}</th>
                    <th className="px-2 py-2 text-center">{t("results_first_class")}</th>
                    <th className="px-2 py-2 text-center">{t("results_second_class")}</th>
                    <th className="px-2 py-2 text-center">{t("results_pass_class")}</th>
                    <th className="px-2 py-2 text-center">{t("results_appeared")}</th>
                    <th className="px-2 py-2 text-center">{t("results_passed")}</th>
                    <th className="px-2.5 py-2 text-left">{t("results_topper")}</th>
                    <th className="px-2 py-2 text-center">{t("results_marks")}</th>
                    <th className="px-2 py-2 text-center">{t("results_topper_percent")}</th>
                    <th className="px-2 py-2 text-center">{t("results_school_result")}</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr>
                      <td colSpan={11} className="px-4 py-6 text-center text-gray-400">…</td>
                    </tr>
                  )}
                  {!loading && rows.length === 0 && (
                    <tr>
                      <td colSpan={11} className="px-4 py-6 text-center text-gray-400">{t("results_no_data")}</td>
                    </tr>
                  )}
                  {!loading && rows.map((r, i) => (
                    <tr key={`${r.year}-${r.stream ?? "x"}`} className={`border-b border-gray-100 ${i === 0 ? "bg-saffron-50 font-semibold" : "bg-white"}`}>
                      <td className="px-2.5 py-1.5 text-navy-800 font-medium whitespace-nowrap">
                        {r.year}
                        {r.stream && (
                          <span className="ml-1.5 text-[10px] font-normal text-saffron-700 bg-saffron-100 px-1.5 py-0.5 rounded-full align-middle">
                            {streamLabel(r.stream, t)}
                          </span>
                        )}
                      </td>
                      <td className="px-2 py-1.5 text-center text-gray-700">{r.distinction ?? "—"}</td>
                      <td className="px-2 py-1.5 text-center text-gray-700">{r.firstClass ?? "—"}</td>
                      <td className="px-2 py-1.5 text-center text-gray-700">{r.secondClass ?? "—"}</td>
                      <td className="px-2 py-1.5 text-center text-gray-700">{r.passClass ?? "—"}</td>
                      <td className="px-2 py-1.5 text-center text-gray-700">{r.appeared ?? "—"}</td>
                      <td className="px-2 py-1.5 text-center text-gray-700">{r.passed ?? "—"}</td>
                      <td className="px-2.5 py-1.5 text-navy-800 whitespace-nowrap">
                        {r.toppers.length > 0 ? r.toppers.map((tp) => tp.name).join(" & ") : "—"}
                      </td>
                      <td className="px-2 py-1.5 text-center text-gray-700">{r.toppers[0]?.marks ?? "—"}</td>
                      <td className="px-2 py-1.5 text-center text-gray-700">{r.toppers[0]?.percentage ?? "—"}</td>
                      <td className="px-2 py-1.5 text-center">
                        {r.schoolResultPercent ? (
                          <span className="bg-green-100 text-green-700 font-bold px-1.5 py-0.5 rounded text-[11px]">
                            {r.schoolResultPercent}
                          </span>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Merit students — compact card, top 5 with expand */}
          <div className="rounded-lg border border-gray-200 shadow-sm bg-white p-4">
            <h3 className="text-sm font-bold text-navy-800 mb-3 flex items-center gap-1.5">
              <Trophy size={16} className="text-saffron-600 shrink-0" />
              <span>{t("merit_title")}</span>
              {meritList.length > 0 && (
                <span className="text-gray-400 font-normal text-xs">
                  — {board === "ssc" ? t("results_tab_ssc") : t("results_tab_hsc")}
                  {" "}({meritList[meritList.length - 1].year}–{meritList[0].year})
                </span>
              )}
            </h3>

            {loading && <p className="text-gray-400 text-sm">…</p>}
            {!loading && meritList.length === 0 && (
              <p className="text-gray-400 text-sm">{t("results_no_data")}</p>
            )}

            <div className={showAllMerit ? "max-h-[420px] overflow-y-auto pr-1" : ""}>
              {!loading && meritVisible.map((s, i) => (
                <div
                  key={`${s.year}-${s.stream ?? "x"}-${i}`}
                  className="flex items-center gap-2.5 py-2 border-b border-gray-100 last:border-0"
                >
                  <span className="shrink-0 w-6 text-center">
                    {i < 3 ? (
                      <span className="text-lg leading-none">{MEDAL[i]}</span>
                    ) : (
                      <span className="text-gray-400 text-xs font-bold">{i + 1}</span>
                    )}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-navy-800 text-xs truncate">{s.name}</p>
                    <p className="text-gray-500 text-[11px] truncate">
                      {s.stream ? `${streamLabel(s.stream, t)} · ` : ""}
                      {s.marks ?? "—"} {t("results_marks")}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-[10px] text-gray-400">{s.year}</p>
                    <span className="inline-block mt-0.5 bg-saffron-100 text-saffron-700 font-bold text-[11px] px-1.5 py-0.5 rounded">
                      {s.percentage ?? "—"}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {!loading && meritList.length > MERIT_PREVIEW_COUNT && (
              <button
                onClick={() => setShowAllMerit((v) => !v)}
                className="mt-3 w-full flex items-center justify-center gap-1 text-xs font-semibold text-saffron-700 hover:text-saffron-800 transition-colors"
              >
                {showAllMerit ? (
                  <>
                    {t("results_show_less")}
                    <ChevronUp size={14} />
                  </>
                ) : (
                  <>
                    {t("results_view_all_merit")}
                    <ChevronRight size={14} />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Overall summary — compact aggregate bar, computed from the same rows above */}
        {!loading && rows.length > 0 && (
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <div className="sm:w-44 shrink-0 bg-navy-800 text-white rounded-lg px-4 py-3 flex sm:flex-col items-center sm:items-start gap-2 sm:gap-0.5">
              <BarChart3 size={16} className="text-saffron-400" />
              <div>
                <p className="text-xs font-semibold leading-tight">{t("results_overall_summary")}</p>
                <p className="text-[11px] text-white/60 leading-tight">
                  {board === "ssc" ? t("results_tab_ssc") : t("results_tab_hsc")}
                </p>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-5 gap-3">
              <StatCard icon={Users} value={totalAppeared ?? "—"} label={t("results_total_appeared")} />
              <StatCard icon={GraduationCap} value={totalPassed ?? "—"} label={t("results_total_passed")} />
              <StatCard icon={Percent} value={overallPassPercent ?? "—"} label={t("results_overall_pass_percent")} />
              <StatCard icon={Trophy} value={bestTopperPct !== null ? `${bestTopperPct.toFixed(2)}%` : "—"} label={t("results_best_topper_percent")} />
              <StatCard icon={CalendarRange} value={yearsCovered ?? "—"} label={t("results_years_covered")} />
            </div>
          </div>
        )}
      </div>

      {verifyOpen && (
        <StudentVerificationModal
          onClose={() => setVerifyOpen(false)}
          onVerified={() => {
            setVerifyOpen(false);
            setResultImageOpen(true);
          }}
        />
      )}

      {resultImageOpen && (
        <ResultImageViewer src={sampleResultImage} onClose={() => setResultImageOpen(false)} />
      )}
    </section>
  );
}
