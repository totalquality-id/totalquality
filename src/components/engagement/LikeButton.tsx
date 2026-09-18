"use client";

import { useCallback, useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useVisitorKey } from "@/hooks/useVisitorKey";

type TargetType = "article" | "event";

/**
 * Tombol suka tanpa login.
 *
 * Perubahan angka ditampilkan optimistis supaya terasa instan, lalu
 * disinkronkan dengan jawaban server. Kalau request gagal, angka dikembalikan
 * ke nilai sebelumnya agar tidak menampilkan jumlah palsu.
 */
export default function LikeButton({
  targetType,
  targetId,
}: {
  targetType: TargetType;
  targetId: number;
}) {
  const visitorKey = useVisitorKey();
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const params = new URLSearchParams({
          targetType,
          targetId: String(targetId),
        });
        if (visitorKey) params.set("visitorKey", visitorKey);

        const res = await fetch(`/api/engagement?${params}`);
        if (!res.ok) throw new Error("gagal");

        const data = await res.json();
        if (cancelled) return;
        setLikes(data.likes ?? 0);
        setLiked(Boolean(data.liked));
      } catch {
        // Diamkan: gagal memuat jumlah bukan alasan merusak halaman artikel.
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [targetType, targetId, visitorKey]);

  const handleToggle = useCallback(async () => {
    if (!visitorKey || pending) return;

    const previous = { likes, liked };
    setPending(true);
    setError(null);
    setLiked(!liked);
    setLikes((n) => Math.max(0, n + (liked ? -1 : 1)));

    try {
      const res = await fetch("/api/reactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetType, targetId, visitorKey }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Gagal menyimpan");

      setLikes(data.likes);
      setLiked(data.liked);
    } catch (err) {
      setLikes(previous.likes);
      setLiked(previous.liked);
      setError(err instanceof Error ? err.message : "Gagal menyimpan");
    } finally {
      setPending(false);
    }
  }, [visitorKey, pending, likes, liked, targetType, targetId]);

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={handleToggle}
        disabled={!visitorKey || pending || loading}
        aria-pressed={liked}
        aria-label={liked ? "Batalkan suka" : "Suka"}
        title={
          visitorKey
            ? liked
              ? "Batalkan suka"
              : "Suka artikel ini"
            : "Aktifkan penyimpanan situs untuk menyukai"
        }
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-light transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed ${
          liked
            ? "border-[#0201FF] bg-[#0201FF]/5 text-[#0201FF]"
            : "border-gray-200 text-[#364153] hover:border-[#0201FF]/40 hover:text-[#0201FF]"
        }`}
      >
        <Heart
          className={`w-4 h-4 transition-transform duration-300 ${
            pending ? "scale-90" : liked ? "scale-110" : ""
          }`}
          fill={liked ? "currentColor" : "none"}
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <span>{loading ? "…" : likes.toLocaleString("id-ID")}</span>
        <span className="sr-only">suka</span>
      </button>

      {error && <span className="text-xs text-red-600 font-light">{error}</span>}
    </div>
  );
}
