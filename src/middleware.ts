import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * CORS untuk /api/*.
 *
 * Penting: CORS bukan mekanisme otorisasi. Ia hanya mengatur origin browser
 * mana yang boleh membaca respons; curl/Postman tetap bisa memanggil API ini.
 * Pengaman sebenarnya tetap JWT + requireAdmin di tiap controller.
 *
 * Daftar origin dibaca dari env ADMIN_ORIGINS (dipisah koma) supaya URL
 * deployment panel admin yang baru bisa ditambahkan tanpa mengubah kode.
 * Contoh:
 *   ADMIN_ORIGINS="https://admin.tq.tqpartner.my.id,https://totalquality-admin.vercel.app"
 */
const DEFAULT_ORIGINS = [
  "http://localhost:5173",
  "https://admin.tq.tqpartner.my.id",
  // Panel admin di Vercel. Dicantumkan langsung di kode, bukan hanya di env,
  // supaya setiap deployment baru (production maupun preview) otomatis bisa
  // dipakai panel tanpa perlu mengingat menyetel ADMIN_ORIGINS lebih dulu.
  "https://totalquality-admin.vercel.app",
];

const allowedOrigins = Array.from(
  new Set(
    [
      ...DEFAULT_ORIGINS,
      ...(process.env.ADMIN_ORIGINS ?? "")
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean),
    ]
  )
);

function applyCorsHeaders(response: NextResponse, origin: string | null) {
  // Vary: Origin wajib ada agar cache/CDN tidak menyajikan header CORS milik
  // origin lain ke origin yang berbeda.
  response.headers.set("Vary", "Origin");

  if (!origin || !allowedOrigins.includes(origin)) return response;

  response.headers.set("Access-Control-Allow-Origin", origin);
  response.headers.set("Access-Control-Allow-Credentials", "true");
  return response;
}

export function middleware(request: NextRequest) {
  const origin = request.headers.get("origin");

  // Preflight
  if (request.method === "OPTIONS") {
    const response = new NextResponse(null, { status: 204 });

    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Requested-With",
    );
    response.headers.set("Access-Control-Max-Age", "86400"); // 24 jam

    return applyCorsHeaders(response, origin);
  }

  return applyCorsHeaders(NextResponse.next(), origin);
}

export const config = {
  matcher: "/api/:path*",
};
