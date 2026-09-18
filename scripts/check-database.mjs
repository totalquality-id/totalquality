import nextEnv from "@next/env";
import { PrismaClient } from "@prisma/client";

nextEnv.loadEnvConfig(process.cwd());

async function main() {
  if (!process.env.SUPABASE_DATABASE_URL) {
    throw new Error("Isi SUPABASE_DATABASE_URL di .env terlebih dahulu.");
  }

  const prisma = new PrismaClient();
  try {
    const [connection] = await prisma.$queryRaw`
      SELECT current_database() AS database, current_user AS role
    `;
    const models = [
      "user", "hero", "heroContent", "service", "event", "article", "career",
      "application", "forum", "assessmentResult", "consultation",
    ];
    const counts = await prisma.$transaction(models.map((model) => prisma[model].count()));
    console.log("Koneksi PostgreSQL berhasil:", connection);
    console.table(Object.fromEntries(models.map((model, index) => [model, counts[index]])));
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  // Hindari mencetak error lengkap yang mungkin mengandung connection string.
  console.error("Pemeriksaan database gagal.", error.code || error.name);
  console.error("Periksa credential .env, jaringan, dan status migrasi Prisma.");
  process.exitCode = 1;
});
