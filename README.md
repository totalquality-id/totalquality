This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Database Supabase

Proyek menggunakan Prisma 6 dan PostgreSQL di Supabase. Credential tersimpan di
`.env` (diabaikan Git); `.env.example` menyediakan format untuk setup baru.
`SUPABASE_DATABASE_URL` digunakan aplikasi, sedangkan `SUPABASE_DIRECT_URL`
digunakan Prisma CLI. Keduanya memakai Session pooler port 5432 agar mendukung
IPv4. Akun `totalquality_prisma` memiliki tabel aplikasi di schema `public`,
tanpa hak superuser, membuat database, atau mengelola role.

```bash
npm run db:generate
npm run db:migrate
npm run db:check
```

`db:check` hanya membaca koneksi dan jumlah baris. Setelah mengganti `.env` atau
Prisma Client, restart server Next.js. Pada hosting, isi kedua variabel Supabase
di environment server dan generate Prisma Client saat build/deploy.
Token Management API `sbp_...` hanya digunakan saat setup; aplikasi tidak
memerlukannya. Tidak diperlukan Supabase JS SDK atau API key untuk Prisma.

Migrasi PostgreSQL aktif berada di `prisma/migrations`. Skema dan riwayat MySQL
lama diarsipkan di `prisma/legacy-mysql` sebagai referensi, bukan untuk dijalankan
di Supabase. `MYSQL_DATABASE_URL` menyimpan koneksi lama dan tidak dipakai runtime.
Gunakan `migrate deploy` untuk menerapkan migrasi yang sudah ditinjau. Pembuatan
migrasi dengan `migrate dev` memerlukan database pengembangan dan shadow database
terpisah; role aplikasi tidak memiliki izin `CREATEDB`.

Tabel aplikasi mengaktifkan RLS tanpa policy Data API. Server Prisma mengaksesnya
sebagai pemilik tabel; autentikasi dan otorisasi website tetap menggunakan kode
backend yang sudah ada. Tambahkan RLS juga pada tabel baru di migrasi berikutnya.
Koneksi ini tidak mengganti login website dengan Supabase Auth.

Dump cPanel `tqpartn1_totalquality.sql` telah diimpor pada 16 September 2026:
26 baris aplikasi (1 User, 9 Service, 3 Event, 3 Article, 2 Hero, 4 HeroContent,
4 Consultation). Tabel aplikasi lainnya memang kosong di sumber. Seluruh kolom
termasuk hash password dan tanggal diverifikasi kembali terhadap dump, dan
sequence mempertahankan nilai AUTO_INCREMENT sumber. Lima baris riwayat migrasi
MySQL tidak diimpor; riwayat PostgreSQL tetap utuh.

Importer khusus dump phpMyAdmin proyek ini tersedia untuk pemeriksaan ulang:

```bash
node --test scripts/mysql-dump.test.mjs
node scripts/import-mysql-dump.mjs /path/to/tqpartn1_totalquality.sql
# Tambahkan --apply hanya untuk melakukan impor.
```

Tanpa `--apply`, importer hanya membaca. Mode impor menggunakan satu transaksi,
mengunci tabel selama proses, memverifikasi semua nilai sebelum commit, dan
menolak menimpa database yang berisi data berbeda. Dump yang sudah sama persis
tidak diimpor ulang. File SQL asli tetap di luar repository karena berisi data
pribadi dan hash password. SHA256 dump yang diimpor:
`e9316db46e6ed78d85e3ff16780075df11c8b6bbf6faed248328f1253d9d9787`.

Untuk dump lain, SQL MySQL harus dikonversi menjadi PostgreSQL dan disesuaikan
dengan tabel yang sudah dibuat. Saat impor, pertahankan ID/relasi,
hash password, kapitalisasi nama tabel/kolom, tipe JSON/tanggal/boolean, serta
sesuaikan sequence setelah memasukkan ID lama. Periksa pula perbedaan pencocokan
huruf besar/kecil (terutama email) antara MySQL dan PostgreSQL. Jangan menjalankan
`migrate reset` atau seed admin bawaan pada database berisi data asli.

Referensi: [koneksi Supabase](https://supabase.com/docs/guides/database/connecting-to-postgres)
dan [migrasi MySQL](https://supabase.com/docs/guides/platform/migrating-to-supabase/mysql).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

Gunakan Node.js 22 (ditetapkan pada `package.json`) dan build command default
`npm run build`. Build menjalankan `prisma generate` terlebih dahulu agar Prisma
Client sesuai schema dan menyertakan engine Linux OpenSSL 3 untuk Vercel.

Isi Environment Variables proyek Vercel untuk production/preview:

- `SUPABASE_DATABASE_URL`: Transaction pooler port 6543 dengan
  `sslmode=require&pgbouncer=true&connection_limit=1&pool_timeout=20`.
- `SUPABASE_DIRECT_URL`: Session pooler port 5432 untuk Prisma CLI.
- `JWT_SECRET`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`,
  `CLOUDINARY_API_SECRET`: nilai server dari `.env` lokal.

`.env` lokal tidak otomatis dikirim ke Vercel. `VERCEL_TOKEN` dan
`SUPABASE_TOKEN` hanya untuk pengelolaan proyek, bukan environment runtime.
File upload, termasuk hero, disimpan melalui Cloudinary karena filesystem
deployment Vercel tidak dapat digunakan sebagai penyimpanan upload permanen.

Endpoint daftar pengguna/konsultasi/assessment dan perubahan konten hero
memerlukan token admin. Baca/perbarui profil pengguna memerlukan token pemilik
akun atau admin; penghapusan akun memerlukan admin. Halaman publik, formulir
konsultasi, dan pengiriman assessment tetap dapat diakses pengunjung.

Next.js dipin ke 15.5.25 dan React ke 19.1.9. Override PostCSS 8.5.28 memperbaiki
dependensi lama yang dipin oleh Next.js 15. Perubahan `package.json` dan
`package-lock.json` harus ikut di-commit/push agar deployment Git berikutnya
menggunakan versi yang sama. Jangan menonaktifkan pemeriksaan keamanan Vercel.

Audit npm masih melaporkan advisory `deepmerge-ts` melalui tooling Prisma
(`@prisma/config` dan CLI Prisma); ini belum merupakan audit keamanan menyeluruh
terhadap aplikasi. Tidak digunakan `npm audit fix --force` yang menyarankan
downgrade Prisma. Rujukan: [advisory DeepmergeTS](https://github.com/advisories/GHSA-ggr8-5vv4-36mx).

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
