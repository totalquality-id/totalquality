"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "tq_visitor_key";

/**
 * Identitas anonim per browser untuk deduplikasi like tanpa login.
 *
 * Sengaja TIDAK memakai alamat IP: satu kantor di balik satu IP publik akan
 * dianggap satu orang, sehingga hanya karyawan pertama yang bisa menyukai
 * sebuah artikel. Kunci acak per browser tidak punya masalah itu.
 *
 * Konsekuensinya jujur: pengunjung yang menghapus data situs bisa menyukai
 * lagi. Tanpa login itu tidak bisa dihindari, dan untuk situs company profile
 * dampaknya dapat diterima.
 */
function createKey(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID().replace(/-/g, "");
  }
  // Fallback untuk browser lama.
  return (
    Math.random().toString(36).slice(2) + Date.now().toString(36)
  ).padEnd(24, "0");
}

export function useVisitorKey(): string | null {
  const [visitorKey, setVisitorKey] = useState<string | null>(null);

  useEffect(() => {
    try {
      let key = window.localStorage.getItem(STORAGE_KEY);
      if (!key || key.length < 16) {
        key = createKey();
        window.localStorage.setItem(STORAGE_KEY, key);
      }
      setVisitorKey(key);
    } catch {
      // Mode privat atau penyimpanan diblokir: tetap bisa membaca jumlah like,
      // hanya tombolnya yang nonaktif.
      setVisitorKey(null);
    }
  }, []);

  return visitorKey;
}
