// src/utils/parseBoardResults.js
//
// Parses the school's board-results workbook (public/assets/data/board-results.xlsx)
// into a normalized shape the UI can render without ever hand-typing result numbers.
//
// Workbook layout (both "10TH" and "12TH" sheets share it):
//   row 0: title
//   row 1: headers -> Sr.NO | YEAR | DISTN | 1st CLASS | 2nd CLASS | PASS CLASS | TOTAL | TOPPER | MARK'S | PERCENTAGE | SCHOOL RESULT
//   row 2+: one row per year. TOTAL is the appeared-student count; DISTN/1st/2nd/PASS
//   CLASS are the passed-student breakdown (their sum is the calculated "passed" count,
//   per the school's own instruction that Passed can be derived from those categories);
//   SCHOOL RESULT is the school's own reported pass percentage and is used as-is.
//   MARK'S / PERCENTAGE describe the TOPPER named on that row, not the batch.
//
// Two irregular patterns show up in the raw sheets and are handled explicitly:
//   - A row with no Sr.No but a TOPPER name (10th, 2025) is a second, tied topper
//     for the immediately preceding year - it gets appended to that year's toppers.
//   - A row whose YEAR cell is a stream word ("SCINECE"/"ART") instead of a date
//     (12th, 2024-2026) is that year's stream-wise breakdown - it gets attached to
//     the most recent year row instead of starting a new year.

import * as XLSX from "xlsx";

function toNumberOrNull(value) {
  if (value === null || value === undefined || value === "") return null;
  const n = Number(value);
  return Number.isNaN(n) ? null : n;
}

function trimStr(value) {
  if (value === null || value === undefined) return null;
  const s = String(value).trim();
  return s === "" ? null : s;
}

function parseYearFromLabel(label) {
  if (!label) return null;
  const m = /(\d{4})/.exec(label);
  return m ? parseInt(m[1], 10) : null;
}

function parsePercentValue(str) {
  if (!str) return null;
  const n = parseFloat(String(str).replace("%", "").trim());
  return Number.isNaN(n) ? null : n;
}

function normalizeStreamLabel(label) {
  const upper = label.toUpperCase();
  if (upper.includes("SCI")) return "Science";
  if (upper.includes("ART")) return "Arts";
  if (upper.includes("COMM")) return "Commerce";
  // Fallback: Title Case whatever the sheet actually says, unchanged in meaning.
  return label.trim().replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase());
}

function sortToppers(toppers) {
  return [...toppers].sort((a, b) => {
    const pctDiff = (b.percentageValue ?? -Infinity) - (a.percentageValue ?? -Infinity);
    if (pctDiff !== 0) return pctDiff;
    return (b.marks ?? -Infinity) - (a.marks ?? -Infinity);
  });
}

function buildTopper(row) {
  const name = trimStr(row[7]);
  if (!name) return null;
  const marks = toNumberOrNull(row[8]);
  const percentage = trimStr(row[9]);
  return { name, marks, percentage, percentageValue: parsePercentValue(percentage) };
}

function buildResultFields(row) {
  const distinction = toNumberOrNull(row[2]);
  const firstClass = toNumberOrNull(row[3]);
  const secondClass = toNumberOrNull(row[4]);
  const passClass = toNumberOrNull(row[5]);
  const appeared = toNumberOrNull(row[6]);
  const schoolResultPercent = trimStr(row[10]);
  const schoolResultPercentValue = parsePercentValue(schoolResultPercent);
  const passed =
    distinction !== null && firstClass !== null && secondClass !== null && passClass !== null
      ? distinction + firstClass + secondClass + passClass
      : null;
  return { distinction, firstClass, secondClass, passClass, appeared, passed, schoolResultPercent, schoolResultPercentValue };
}

// Parses one sheet's raw rows (as produced by sheet_to_json({header:1})) into
// a chronological list of year records, each optionally carrying a `streams` array.
function parseSheetRows(rows) {
  const records = [];
  let current = null;

  for (let i = 2; i < rows.length; i++) {
    const row = rows[i];
    if (!row || row.every((c) => c === null || c === undefined || c === "")) continue;

    const srNo = row[0];
    const label = trimStr(row[1]);
    const year = parseYearFromLabel(label);
    const topper = buildTopper(row);

    if (srNo !== null && srNo !== undefined && year) {
      // A normal year row (may or may not carry its own data yet).
      const fields = buildResultFields(row);
      const hasOwnData =
        fields.distinction !== null ||
        fields.firstClass !== null ||
        fields.secondClass !== null ||
        fields.passClass !== null ||
        fields.appeared !== null ||
        fields.schoolResultPercent !== null ||
        !!topper;

      current = {
        year,
        ...fields,
        toppers: topper ? [topper] : [],
        streams: [],
        hasData: hasOwnData,
      };
      records.push(current);
    } else if (srNo !== null && srNo !== undefined && label && !year) {
      // Stream-wise sub-row (e.g. "SCINECE" / "ART"), belongs to the last year row.
      if (!current) continue;
      const fields = buildResultFields(row);
      current.streams.push({
        stream: normalizeStreamLabel(label),
        ...fields,
        toppers: topper ? [topper] : [],
      });
      current.hasData = true;
    } else if ((srNo === null || srNo === undefined) && topper && current) {
      // Extra (tied) topper for the previous year row.
      current.toppers.push(topper);
    }
  }

  records.forEach((r) => {
    r.toppers = sortToppers(r.toppers);
    r.streams.forEach((s) => {
      s.toppers = sortToppers(s.toppers);
    });
  });

  return records;
}

// Parses the full workbook (ArrayBuffer) into { ssc, hsc } year-record arrays.
export function parseBoardResultsWorkbook(arrayBuffer) {
  const wb = XLSX.read(arrayBuffer, { type: "array" });
  const sscSheet = wb.Sheets["10TH"];
  const hscSheet = wb.Sheets["12TH"];

  const sscRows = sscSheet ? XLSX.utils.sheet_to_json(sscSheet, { header: 1, defval: null, raw: false }) : [];
  const hscRows = hscSheet ? XLSX.utils.sheet_to_json(hscSheet, { header: 1, defval: null, raw: false }) : [];

  return {
    ssc: parseSheetRows(sscRows),
    hsc: parseSheetRows(hscRows),
  };
}
