// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000", // Sesuaikan jika port backend berbeda
        pathname: "/**",
      },
      {
        // TODO(keamanan): wildcard ini membuat /_next/image bisa dipakai siapa
        // pun sebagai proxy gambar ke host mana saja. Data lama masih memakai
        // i.imgur.com, jadi penyempitan harus dilakukan setelah semua URL
        // gambar di database diinventarisasi. Lihat laporan audit.
        protocol: "https",
        hostname: "**", // Opsional: jika nanti ada gambar dari internet
      },
    ],
  },

  async redirects() {
    // News sudah diganti menjadi Article. Pertahankan URL lama agar link
    // yang sudah tersebar dan hasil indeks mesin pencari tetap hidup.
    return [
      { source: "/news", destination: "/articles", permanent: true },
      { source: "/news/:id", destination: "/articles/:id", permanent: true },
    ];
  },

  experimental: {
    serverActions: {
      // Sinkron dengan ADMIN_ORIGINS di src/middleware.ts (tanpa skema).
      allowedOrigins: [
        "localhost:5173",
        "admin.tq.tqpartner.my.id",
        ...(process.env.ADMIN_ORIGINS ?? "")
          .split(",")
          .map((origin) => origin.trim().replace(/^https?:\/\//, ""))
          .filter(Boolean),
      ],
    },
  },

  // API CORS is handled in src/middleware.ts using an explicit origin list.
  // A wildcard origin cannot be combined with credentialed browser requests.
};

export default nextConfig;
