"use client";

import { useEffect, useState } from "react";

export interface EngagementCounts {
  likes: number;
  comments: number;
}

/**
 * Jumlah like & komentar untuk seluruh article (atau event) sekaligus.
 *
 * Satu request untuk semua kartu, bukan satu request per kartu — daftar
 * dengan 20 artikel jika tidak begini akan menembak API 20 kali dari browser.
 */
export function useEngagementSummary(targetType: "article" | "event") {
  const [summary, setSummary] = useState<Record<number, EngagementCounts>>({});

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch(
          `/api/engagement/summary?targetType=${targetType}`
        );
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled) setSummary(data ?? {});
      } catch {
        // Jumlah interaksi bersifat pelengkap; kegagalannya tidak boleh
        // mengosongkan daftar artikel.
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [targetType]);

  return summary;
}
