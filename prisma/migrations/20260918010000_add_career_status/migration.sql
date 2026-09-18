-- Panel admin sudah lama punya kontrol Open/Closed untuk lowongan, tapi
-- kolomnya tidak pernah ada sehingga nilainya selalu hilang saat disimpan.
ALTER TABLE "Career" ADD COLUMN "status" TEXT NOT NULL DEFAULT 'open';
