import Link from "next/link";

export const metadata = {
  title: "Page Not Found | Total Quality Indonesia",
};

export default function NotFound() {
  return (
    <div
      className="min-h-screen bg-white flex items-center justify-center px-4"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <div className="max-w-xl w-full text-center space-y-8">
        <p className="text-7xl sm:text-8xl font-light tracking-tighter text-[#0201FF]">
          404
        </p>

        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-light tracking-tighter text-[#1a1a1a]">
            Halaman tidak ditemukan
          </h1>
          <p className="text-[#364153] font-light leading-relaxed">
            Halaman yang Anda cari mungkin sudah dipindahkan, berganti alamat,
            atau tidak pernah ada.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#0201FF] text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-[#0000d1] transition-colors duration-300"
          >
            Kembali ke Beranda
          </Link>
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 border border-gray-200 text-[#364153] px-6 py-3 rounded-lg text-sm font-light hover:border-gray-300 hover:text-[#0201FF] transition-colors duration-300"
          >
            Lihat Articles
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 border border-gray-200 text-[#364153] px-6 py-3 rounded-lg text-sm font-light hover:border-gray-300 hover:text-[#0201FF] transition-colors duration-300"
          >
            Lihat Services
          </Link>
        </div>
      </div>
    </div>
  );
}
