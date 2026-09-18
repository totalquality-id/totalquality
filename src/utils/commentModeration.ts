import { createHash } from "crypto";
import type { CommentStatus } from "@/services/engagementService";

/**
 * Penyaring komentar untuk mode moderasi hybrid.
 *
 * Komentar yang lolos semua pemeriksaan langsung tayang; yang mencurigakan
 * masuk antrean "pending" untuk ditinjau admin, bukan ditolak diam-diam.
 * Yang jelas-jelas bot (honeypot terisi) langsung ditandai rejected.
 *
 * Tidak ada satu pun pemeriksaan yang memblokir sendirian: gabungan lapisan
 * inilah yang membuat spam otomatis mahal, tanpa menghalangi pengunjung asli.
 */

/** Rentang waktu minimal yang wajar antara form dibuka dan dikirim. */
const MIN_FILL_SECONDS = 3;

/** Batas jumlah tautan dalam satu komentar sebelum dianggap mencurigakan. */
const MAX_LINKS = 1;

/** Berapa komentar dari pengirim sama dalam sejam sebelum masuk antrean. */
export const RECENT_COMMENT_THRESHOLD = 3;
export const RECENT_WINDOW_MS = 60 * 60 * 1000;

export const MIN_CONTENT_LENGTH = 3;
export const MAX_CONTENT_LENGTH = 2000;
export const MAX_NAME_LENGTH = 80;

/**
 * Kata yang umum muncul pada spam komersial berbahasa Indonesia dan Inggris.
 * Sengaja pendek: daftar panjang justru menjaring komentar asli. Tujuannya
 * bukan memblokir, hanya melempar ke antrean review.
 */
const SUSPICIOUS_TERMS = [
  "viagra",
  "casino",
  "judi online",
  "slot gacor",
  "situs slot",
  "pinjaman cepat",
  "crypto investment",
  "make money fast",
  "click here to win",
];

const LINK_PATTERN = /https?:\/\/|www\.|\b[a-z0-9-]+\.(com|net|org|xyz|top|ru|id)\b/gi;

export interface ModerationInput {
  content: string;
  honeypot?: unknown;
  /** Milidetik antara form dirender dan dikirim, dilaporkan klien. */
  elapsedMs?: unknown;
  recentFromSameSender: number;
}

export interface ModerationVerdict {
  status: CommentStatus;
  flagReason: string | null;
}

export function moderateComment(input: ModerationInput): ModerationVerdict {
  const { content, honeypot, elapsedMs, recentFromSameSender } = input;

  // 1. Honeypot: field tersembunyi yang tidak pernah diisi manusia.
  if (typeof honeypot === "string" && honeypot.trim().length > 0) {
    return { status: "rejected", flagReason: "Honeypot terisi (bot)" };
  }

  // 2. Form diisi terlalu cepat untuk ukuran manusia.
  if (typeof elapsedMs === "number" && Number.isFinite(elapsedMs)) {
    if (elapsedMs >= 0 && elapsedMs < MIN_FILL_SECONDS * 1000) {
      return {
        status: "pending",
        flagReason: `Dikirim hanya ${Math.round(elapsedMs / 1000)} detik setelah form dibuka`,
      };
    }
  }

  // 3. Terlalu banyak tautan.
  const links = content.match(LINK_PATTERN)?.length ?? 0;
  if (links > MAX_LINKS) {
    return {
      status: "pending",
      flagReason: `Mengandung ${links} tautan`,
    };
  }

  // 4. Kata kunci spam yang umum.
  const lowered = content.toLowerCase();
  const hit = SUSPICIOUS_TERMS.find((term) => lowered.includes(term));
  if (hit) {
    return { status: "pending", flagReason: `Mengandung kata "${hit}"` };
  }

  // 5. Pengirim yang sama membanjiri dalam waktu singkat.
  if (recentFromSameSender >= RECENT_COMMENT_THRESHOLD) {
    return {
      status: "pending",
      flagReason: `${recentFromSameSender} komentar dari pengirim sama dalam satu jam`,
    };
  }

  // 6. Teks yang seluruhnya huruf kapital dan cukup panjang.
  const letters = content.replace(/[^a-zA-Z]/g, "");
  if (letters.length > 25 && letters === letters.toUpperCase()) {
    return { status: "pending", flagReason: "Seluruhnya huruf kapital" };
  }

  return { status: "approved", flagReason: null };
}

/**
 * Hash IP dengan garam rahasia. IP mentah adalah data pribadi dan tidak perlu
 * disimpan — yang dibutuhkan hanya kemampuan mengenali pengirim yang sama.
 */
export function hashIp(ip: string): string {
  const salt = process.env.JWT_SECRET ?? "totalquality-comment-salt";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}
