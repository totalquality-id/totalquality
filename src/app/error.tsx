"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Detail error tidak ditampilkan ke pengunjung; cukup dicatat di console
    // browser (dan di log server lewat digest) untuk keperluan debugging.
    console.error(error);
  }, [error]);

  return (
    <div
      className="min-h-screen bg-white flex items-center justify-center px-4"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <div className="max-w-xl w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-light tracking-tighter text-[#1a1a1a]">
            Terjadi kesalahan
          </h1>
          <p className="text-[#364153] font-light leading-relaxed">
            Maaf, halaman ini gagal dimuat. Silakan coba lagi beberapa saat
            lagi.
          </p>
          {error.digest && (
            <p className="text-xs text-[#364153]/60 font-light">
              Kode referensi: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 bg-[#0201FF] text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-[#0000d1] transition-colors duration-300"
          >
            Coba Lagi
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-gray-200 text-[#364153] px-6 py-3 rounded-lg text-sm font-light hover:border-gray-300 hover:text-[#0201FF] transition-colors duration-300"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
