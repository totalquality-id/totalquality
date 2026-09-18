"use client";

import { Heart, MessageCircle } from "lucide-react";

/**
 * Penanda jumlah like & komentar untuk kartu di beranda dan halaman listing.
 *
 * Sengaja hanya angka, tidak bisa diklik: interaksi sebenarnya ada di halaman
 * detail. Ini menghindari klik tak sengaja saat kartu itu sendiri sebuah link.
 */
export default function EngagementStats({
  likes = 0,
  comments = 0,
  tone = "light",
  className = "",
}: {
  likes?: number;
  comments?: number;
  /** "light" untuk kartu gelap (teks putih), "dark" untuk kartu terang. */
  tone?: "light" | "dark";
  className?: string;
}) {
  if (!likes && !comments) return null;

  const base = tone === "light" ? "text-white/80" : "text-[#364153]";

  return (
    <div
      className={`flex items-center gap-4 text-xs font-light ${base} ${className}`}
      aria-label={`${likes} suka, ${comments} komentar`}
    >
      <span className="inline-flex items-center gap-1.5">
        <Heart
          className="w-3.5 h-3.5"
          aria-hidden="true"
          fill={likes > 0 ? "currentColor" : "none"}
          strokeWidth={1.5}
        />
        {likes.toLocaleString("id-ID")}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" strokeWidth={1.5} />
        {comments.toLocaleString("id-ID")}
      </span>
    </div>
  );
}
