// src/hooks/useBoardResults.js
import { useEffect, useState } from "react";
import { parseBoardResultsWorkbook } from "../utils/parseBoardResults";

const WORKBOOK_URL = "/assets/data/board-results.xlsx";

let cache = null; // module-level cache so every consumer shares one fetch+parse

export function useBoardResults() {
  const [state, setState] = useState(
    cache ? { loading: false, error: null, data: cache } : { loading: true, error: null, data: null }
  );

  useEffect(() => {
    if (cache) return;
    let cancelled = false;

    fetch(WORKBOOK_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load board results (${res.status})`);
        return res.arrayBuffer();
      })
      .then((buf) => {
        const parsed = parseBoardResultsWorkbook(buf);
        cache = parsed;
        if (!cancelled) setState({ loading: false, error: null, data: parsed });
      })
      .catch((err) => {
        if (!cancelled) setState({ loading: false, error: err, data: null });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
