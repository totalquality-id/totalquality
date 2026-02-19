import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div
      className="min-h-screen bg-slate-50"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* Hero Section */}
      <section className="relative py-20 sm:py-24 lg:py-32 bg-[#15156b] text-white overflow-hidden pb-32">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background: `radial-gradient(circle at 0% 0%, #0201FF 0%, transparent 40%), radial-gradient(circle at 100% 100%, #0201FF 0%, transparent 40%)`,
          }}
        />
        <div className="absolute inset-0 opacity-[0.05]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-[#0201FF]/20 rounded-full blur-[120px] animate-pulse"
            style={{ animationDuration: "8s" }}
          />
          <div
            className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-[#0201FF]/15 rounded-full blur-[120px] animate-pulse"
            style={{ animationDuration: "10s" }}
          />
        </div>
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none brightness-100 contrast-150"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl pt-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tighter leading-tight mb-6">
              Kebijakan{" "}
              <span className="text-[#FACC01] font-normal">Privasi</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl font-light text-white/80 leading-tight max-w-3xl">
              Komitmen kami dalam melindungi data pribadi dan privasi Anda.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section - Floating Card Design */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-4xl mx-auto bg-white p-8 sm:p-14 lg:p-16 shadow-xl border border-gray-100 relative -mt-16 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 mb-10">
            <span className="text-[#364153] font-light text-sm">
              Terakhir Diperbarui: 1 Januari 2026
            </span>
          </div>

          <div className="prose prose-lg max-w-none text-[#364153] font-light leading-relaxed">
            <p className="mb-10 text-lg">
              Di PT Total Quality Indonesia, kami menghargai privasi Anda dan
              berkomitmen untuk melindungi data pribadi Anda. Kebijakan Privasi
              ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan
              menjaga informasi Anda saat mengunjungi website kami.
            </p>

            <div className="mt-12 mb-6">
              <div className="w-12 h-1 bg-[#0201FF] mb-4"></div>
              <h2 className="text-2xl font-normal text-[#1a1a1a] tracking-tight">
                A. Informasi yang Kami Kumpulkan
              </h2>
            </div>
            <p className="mb-6 text-lg">
              Kami mengumpulkan informasi yang Anda berikan secara sukarela saat
              mengisi formulir kontak, mendaftar program pelatihan, atau
              berlangganan buletin kami, termasuk namun tidak terbatas pada:
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#0201FF] mt-2.5 mr-4"></span>
                <span className="text-lg">Nama lengkap dan jabatan.</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#0201FF] mt-2.5 mr-4"></span>
                <span className="text-lg">Nama perusahaan dan industri.</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#0201FF] mt-2.5 mr-4"></span>
                <span className="text-lg">Alamat email dan nomor telepon.</span>
              </li>
            </ul>

            <div className="mt-12 mb-6">
              <div className="w-12 h-1 bg-[#0201FF] mb-4"></div>
              <h2 className="text-2xl font-normal text-[#1a1a1a] tracking-tight">
                B. Penggunaan Informasi
              </h2>
            </div>
            <p className="mb-6 text-lg">
              Informasi yang kami kumpulkan digunakan untuk:
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#0201FF] mt-2.5 mr-4"></span>
                <span className="text-lg">
                  Menyediakan solusi konsultasi dan pelatihan yang sesuai dengan
                  kebutuhan Anda.
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#0201FF] mt-2.5 mr-4"></span>
                <span className="text-lg">
                  Menghubungi Anda terkait layanan, pembaruan program, atau
                  informasi promosi.
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#0201FF] mt-2.5 mr-4"></span>
                <span className="text-lg">
                  Meningkatkan pengalaman pengguna dan kualitas layanan website
                  kami.
                </span>
              </li>
            </ul>

            <div className="mt-12 mb-6">
              <div className="w-12 h-1 bg-[#0201FF] mb-4"></div>
              <h2 className="text-2xl font-normal text-[#1a1a1a] tracking-tight">
                C. Keamanan Data
              </h2>
            </div>
            <p className="mb-10 text-lg">
              Sesuai dengan nilai inti kami,{" "}
              <strong className="font-normal text-[#1a1a1a]">
                Trustworthy
              </strong>
              , kami menerapkan standar keamanan teknis dan organisasi untuk
              melindungi data Anda dari akses yang tidak sah, perubahan, atau
              penyalahgunaan.
            </p>

            <div className="mt-12 mb-6">
              <div className="w-12 h-1 bg-[#0201FF] mb-4"></div>
              <h2 className="text-2xl font-normal text-[#1a1a1a] tracking-tight">
                D. Hak Anda
              </h2>
            </div>
            <p className="mb-8 text-lg">
              Anda memiliki hak untuk mengakses, memperbarui, atau meminta
              penghapusan data pribadi Anda yang tersimpan di sistem kami dengan
              menghubungi tim administrasi kami.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
