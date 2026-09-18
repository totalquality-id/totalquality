import { randomBytes } from "crypto";

/**
 * Satu-satunya sumber JWT_SECRET untuk seluruh aplikasi.
 *
 * Sebelumnya tiga modul memakai fallback yang berbeda-beda
 * ("your-secret-key-change-in-production", "your-secret-key", dan sebuah hex
 * yang ikut ter-commit). Akibatnya token yang ditandatangani satu modul tidak
 * bisa diverifikasi modul lain ketika env belum di-set, dan secret yang
 * ter-commit membuat siapa pun bisa membuat token admin palsu.
 */
const configuredSecret = process.env.JWT_SECRET?.trim();

if (!configuredSecret && process.env.NODE_ENV === "production") {
  throw new Error(
    "JWT_SECRET wajib di-set di environment production. Generate dengan: " +
      'node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"'
  );
}

if (!configuredSecret) {
  console.warn(
    "[auth] JWT_SECRET belum di-set. Memakai secret acak khusus development; " +
      "semua token menjadi invalid setiap kali server restart."
  );
}

export const JWT_SECRET: string =
  configuredSecret || randomBytes(32).toString("hex");

export const JWT_EXPIRES_IN = "7d";
