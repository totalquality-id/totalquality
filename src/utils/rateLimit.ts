import { ApiError } from "@/utils/apiResponse";

/**
 * Rate limiter in-memory sederhana untuk endpoint publik yang rawan
 * brute-force dan spam (login, register, form konsultasi).
 *
 * Catatan deployment: penghitung disimpan di memori proses. Ini cocok untuk
 * runtime Node single-process seperti `server.js` di cPanel. Jika nanti pindah
 * ke serverless/multi-instance, ganti penyimpanannya ke Redis/Upstash karena
 * setiap instance akan punya penghitung sendiri.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

// Buang entri kedaluwarsa sesekali supaya Map tidak tumbuh tanpa batas.
let lastSweep = Date.now();
const SWEEP_INTERVAL_MS = 5 * 60 * 1000;

function sweep(now: number) {
  if (now - lastSweep < SWEEP_INTERVAL_MS) return;
  lastSweep = now;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

/**
 * Ambil IP client. Di belakang reverse proxy (cPanel/Nginx/Vercel) IP asli ada
 * di X-Forwarded-For. Entri pertama adalah client sebenarnya.
 */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

export interface RateLimitOptions {
  /** Jumlah percobaan yang diizinkan dalam satu jendela waktu. */
  limit: number;
  /** Panjang jendela waktu dalam milidetik. */
  windowMs: number;
  /** Pesan yang ditampilkan saat kuota habis. */
  message?: string;
}

/**
 * Menaikkan penghitung untuk `key` dan melempar ApiError 429 bila kuota habis.
 * Panggil sebelum melakukan pekerjaan berat (query database, hash password).
 */
export function enforceRateLimit(key: string, options: RateLimitOptions): void {
  const { limit, windowMs, message } = options;
  const now = Date.now();
  sweep(now);

  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return;
  }

  bucket.count += 1;

  if (bucket.count > limit) {
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((bucket.resetAt - now) / 1000)
    );
    throw new ApiError(
      429,
      message ??
        `Terlalu banyak percobaan. Coba lagi dalam ${retryAfterSeconds} detik.`,
      { retryAfterSeconds }
    );
  }
}

/**
 * Hapus penghitung untuk `key`. Dipakai setelah login berhasil supaya user yang
 * sah tidak ikut terkunci gara-gara salah ketik sebelumnya.
 */
export function clearRateLimit(key: string): void {
  buckets.delete(key);
}
