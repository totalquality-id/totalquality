import React from "react";

export default function TermsOfServicePage() {
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
              Syarat &{" "}
              <span className="text-[#FACC01] font-normal">Ketentuan</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl font-light text-white/80 leading-tight max-w-3xl">
              Ketentuan penggunaan layanan dan website PT Total Quality
              Indonesia.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section - Floating Card Design */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-4xl mx-auto bg-white p-8 sm:p-14 lg:p-16 shadow-xl border border-gray-100 relative -mt-16 z-10">
          <div className="prose prose-lg max-w-none text-[#364153] font-light leading-relaxed">
            <p className="mb-10 text-lg">
              Selamat datang di website PT Total Quality Indonesia. Dengan
              mengakses website ini, Anda dianggap telah menyetujui syarat dan
              ketentuan berikut:
            </p>

            <div className="mt-12 mb-6">
              <div className="w-12 h-1 bg-[#0201FF] mb-4"></div>
              <h2 className="text-2xl font-normal text-[#1a1a1a] tracking-tight">
                A. Penggunaan Website
              </h2>
            </div>
            <p className="mb-10 text-lg">
              Website ini ditujukan untuk memberikan informasi mengenai layanan
              konsultasi, pelatihan, dan pengembangan organisasi. Anda setuju
              untuk menggunakan website ini hanya untuk tujuan yang sah secara
              hukum dan tidak melanggar hak pihak lain.
            </p>

            <div className="mt-12 mb-6">
              <div className="w-12 h-1 bg-[#0201FF] mb-4"></div>
              <h2 className="text-2xl font-normal text-[#1a1a1a] tracking-tight">
                B. Hak Kekayaan Intelektual
              </h2>
            </div>
            <p className="mb-10 text-lg">
              Seluruh konten dalam website ini, termasuk teks, grafis, logo, dan
              metodologi (seperti{" "}
              <em className="italic">Quality Empowerment System</em>), adalah
              milik intelektual PT Total Quality Indonesia. Dilarang keras
              menggandakan atau mendistribusikan konten tanpa izin tertulis dari
              kami.
            </p>

            <div className="mt-12 mb-6">
              <div className="w-12 h-1 bg-[#0201FF] mb-4"></div>
              <h2 className="text-2xl font-normal text-[#1a1a1a] tracking-tight">
                C. Batasan Tanggung Jawab
              </h2>
            </div>
            <p className="mb-10 text-lg">
              PT Total Quality Indonesia berupaya menyajikan informasi yang
              akurat dan terkini. Namun, kami tidak bertanggung jawab atas
              kerugian yang timbul akibat ketergantungan pada informasi di
              website ini tanpa konsultasi profesional lebih lanjut dengan tim
              kami.
            </p>

            <div className="mt-12 mb-6">
              <div className="w-12 h-1 bg-[#0201FF] mb-4"></div>
              <h2 className="text-2xl font-normal text-[#1a1a1a] tracking-tight">
                D. Perubahan Ketentuan
              </h2>
            </div>
            <p className="mb-8 text-lg">
              Kami berhak mengubah syarat dan ketentuan ini sewaktu-waktu guna
              menyesuaikan dengan regulasi hukum yang berlaku di Indonesia.
              Perubahan akan berlaku segera setelah dipublikasikan di halaman
              ini.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
