import React from "react";

export default function CookiePolicyPage() {
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
              <span className="text-[#FACC01] font-normal">Cookie</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl font-light text-white/80 leading-tight max-w-3xl">
              Bagaimana kami menggunakan cookie untuk meningkatkan pengalaman
              penelusuran Anda.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section - Floating Card Design */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-4xl mx-auto bg-white p-8 sm:p-14 lg:p-16 shadow-xl border border-gray-100 relative -mt-16 z-10">
          <div className="prose prose-lg max-w-none text-[#364153] font-light leading-relaxed">
            <p className="mb-10 text-lg">
              PT Total Quality Indonesia menggunakan{" "}
              <em className="italic">cookie</em> untuk meningkatkan
              fungsionalitas website dan memberikan pengalaman penelusuran yang
              lebih baik bagi Anda.
            </p>

            <div className="mt-12 mb-6">
              <div className="w-12 h-1 bg-[#0201FF] mb-4"></div>
              <h2 className="text-2xl font-normal text-[#1a1a1a] tracking-tight">
                Apa itu Cookie?
              </h2>
            </div>
            <p className="mb-10 text-lg">
              <em className="italic">Cookie</em> adalah file teks kecil yang
              disimpan di perangkat Anda saat Anda mengunjungi sebuah website.
              Ini membantu kami mengenali preferensi Anda dan menganalisis lalu
              lintas website untuk terus meningkatkan layanan kami.
            </p>

            <div className="mt-12 mb-6">
              <div className="w-12 h-1 bg-[#0201FF] mb-4"></div>
              <h2 className="text-2xl font-normal text-[#1a1a1a] tracking-tight">
                Bagaimana Kami Menggunakan Cookie?
              </h2>
            </div>
            <p className="mb-6 text-lg">
              Kami menggunakan <em className="italic">cookie</em> untuk tujuan
              berikut:
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#0201FF] mt-2.5 mr-4"></span>
                <span className="text-lg">
                  <strong className="font-normal text-[#1a1a1a]">
                    Cookie Esensial:
                  </strong>{" "}
                  Diperlukan agar website dapat berfungsi dengan benar dan aman.
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#0201FF] mt-2.5 mr-4"></span>
                <span className="text-lg">
                  <strong className="font-normal text-[#1a1a1a]">
                    Cookie Analitik:
                  </strong>{" "}
                  Membantu kami memahami bagaimana pengunjung berinteraksi
                  dengan website kami (misalnya, halaman mana yang paling sering
                  dikunjungi).
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#0201FF] mt-2.5 mr-4"></span>
                <span className="text-lg">
                  <strong className="font-normal text-[#1a1a1a]">
                    Cookie Fungsional:
                  </strong>{" "}
                  Mengingat pengaturan yang Anda pilih untuk meningkatkan
                  kenyamanan saat Anda kembali mengakses website.
                </span>
              </li>
            </ul>

            <div className="mt-12 mb-6">
              <div className="w-12 h-1 bg-[#0201FF] mb-4"></div>
              <h2 className="text-2xl font-normal text-[#1a1a1a] tracking-tight">
                Mengelola Cookie
              </h2>
            </div>
            <p className="mb-8 text-lg">
              Anda dapat memilih untuk menonaktifkan{" "}
              <em className="italic">cookie</em> melalui pengaturan browser Anda
              kapan saja. Namun, harap dicatat bahwa beberapa bagian dari
              website kami mungkin tidak berfungsi secara optimal jika{" "}
              <em className="italic">cookie</em> dinonaktifkan.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
