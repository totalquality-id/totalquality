"use client";

import { useState, useEffect, useRef } from "react";
// import Image from "next/image";
import { Newsreader } from "next/font/google";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["300", "600"],
});

export default function AboutPage() {
  const [activeYear, setActiveYear] = useState(0);
  const [isTimelineVisible, setIsTimelineVisible] = useState(false);
  const timelineRef = useRef(null);

  const timelineData = [
    {
      year: "2005",
      title: "The Beginning",
      description:
        "Total Quality Indonesia didirikan oleh Johan Yan dengan visi untuk mentransformasi budaya organisasi di seluruh Asia Tenggara melalui kekuatan motivasi dan keunggulan (excellence).",
      image: "/images/timeline/1.jpg",
    },
    {
      year: "2006",
      title: "Expansion Through New Branch Offices",
      description:
        "Pada tahun 2006, Total Quality memperluas jangkauannya dengan membuka kantor cabang baru di Jakarta dan Singapura, memperkuat kehadiran di Asia Tenggara.",
      image: "/images/timeline/2.jpg",
    },
    {
      year: "2007",
      title: "The 1st Annual National Empowerment Congress (ANEC)",
      description:
        "Pada tahun 2007, Total Quality mengadakan Kongres Nasional Kepemimpinan (ANEC) pertama yang menjadi acuan penting dalam membangun budaya organisasi yang kuat dan berkelanjutan.",
      image: "/images/timeline/3.jpg",
    },
    {
      year: "2008",
      title: "Breaking Records at the 2nd ANEC",
      description:
        "Pada tahun 2008, Total Quality mencatatkan rekor baru di Kongres Nasional Kepemimpinan (ANEC) kedua dengan memecahkan enam rekor MURI (Museum Rekor Indonesia). Acara ini mengumpulkan 486 Direktur dan 4.073 Manajer, mendapat pengakuan sebagai kongres motivasi terbesar di Asia Tenggara.",
      image: "/images/timeline/4.jpg",
    },
    {
      year: "2012",
      title: "Royal Recognition for Cultural Preservation",
      description:
        "Pada tahun 2012, Johan Yan menerima penghargaan kerajaan dari Pakubowono XIII dari Kesultanan Surakarta atas kontribusinya dalam melestarikan warisan budaya Indonesia.",
      image: "/images/timeline/5.jpg",
    },
    {
      year: "2013",
      title: "Among Indonesia's 10 Most Influential Young Leaders",
      description:
        "Pada tahun 2013, Johan Yan dihormati sebagai salah satu dari 10 Pemimpin Muda Indonesia yang paling berpengaruh dalam bidang budaya oleh organisasi pemuda terkait PBB, JCI (Junior Chamber International).",
      image: "/images/timeline/6.jpg",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTimelineVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    const currentRef = timelineRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      className="bg-white"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* Hero Section - Diperbarui agar selaras dengan GlobalBackground */}
      <section className="relative py-20 sm:py-24 lg:py-32 bg-[#15156b] text-white overflow-hidden">
        {/* 1. Base Gradient Layer - Meniru kedalaman GlobalBackground */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background: `radial-gradient(circle at 0% 0%, #0201FF 0%, transparent 40%), 
                         radial-gradient(circle at 100% 100%, #0201FF 0%, transparent 40%)`,
          }}
        />

        {/* 2. Mesh Grid - Disamakan ukurannya (60px) dan opasitasnya */}
        <div className="absolute inset-0 opacity-[0.05]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* 3. Soft Spotlights - Aksen dinamis khas GlobalBackground */}
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

        {/* 4. Noise Texture Overlay - Memberikan kesan premium matte */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none brightness-100 contrast-150"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter leading-tight mb-6 mt-16">
              About <span className="text-[#FACC01] font-normal">Us</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl font-light text-white/80 leading-tight max-w-3xl">
              Inspiring excellence and transforming organizations for over two
              decades
            </p>
          </div>
        </div>
      </section>

      {/* About Company Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-base sm:text-2xl md:text-xl lg:text-2xl font-light tracking-tighter text-[#364153] mb-1">
              Company Overview
            </h2>
            <div className="w-full h-[1px] bg-gradient-to-r from-[#0201FF]/30 via-[#0201FF]/10 to-transparent mb-8"></div>
            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter text-[#1a1a1a] leading-tight mb-4">
              Who <span className="text-[#0201FF] font-normal">We Are</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <p className="text-lg text-[#364153] leading-relaxed font-light">
                Didirikan tahun{" "}
                <span className="text-[#0201FF] font-normal">2005</span>, PT
                Total Quality Indonesia telah menjadi mitra terpercaya untuk
                pengembangan organisasi di seluruh Asia Tenggara. Dengan lebih
                dari{" "}
                <span className="text-[#0201FF] font-normal">
                  430 corporate partner
                </span>{" "}
                yang mencakup berbagai sektor industri, kami berspesialisasi
                dalam pengembangan sumber daya manusia dan implementasi sistem
                manajemen.
              </p>
              <p className="text-lg text-[#364153] leading-relaxed font-light">
                Beroperasi melalui kantor kami di{" "}
                <span className="text-[#0201FF] font-normal">Jakarta</span> dan{" "}
                <span className="text-[#0201FF] font-normal">Surabaya</span>,
                kami menghadirkan solusi komprehensif yang mendorong pertumbuhan
                berkelanjutan dan keunggulan organisasi.
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-10 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
              {/* Subtle Corner Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#0201FF]/5 rounded-full blur-2xl group-hover:bg-[#0201FF]/8 transition-all duration-300" />

              <div className="relative">
                <div className="w-12 h-1 bg-[#0201FF] mb-6"></div>
                <h3 className="text-2xl font-light text-[#1a1a1a] mb-6 tracking-tight">
                  Our Approach
                </h3>
                <p className="text-[#364153] leading-relaxed mb-6 font-light">
                  <span className="text-[#0201FF] font-normal">
                    Quality Empowerment System
                  </span>{" "}
                  kami memberikan pelatihan profesional dan bimbingan
                  berkelanjutan selama periode 4 bulan, menggunakan metodologi
                  unik yang dikembangkan khusus untuk menjawab kebutuhan
                  organisasi Anda dalam meningkatkan kualitas SDM serta mencapai
                  target perusahaan.
                </p>
                <p className="text-[#364153] leading-relaxed font-light">
                  Kami fokus membangun budaya organisasi yang positif dan
                  mencetak Agents of Change sebagai katalis transformasi, guna
                  memastikan organisasi Anda menjadi lebih produktif, efektif,
                  dan mampu mewujudkan visi besarnya.
                </p>
              </div>

              {/* Bottom Accent Line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0201FF] to-[#FACC01] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="mb-12">
            <h2 className="text-base sm:text-2xl md:text-xl lg:text-2xl font-light tracking-tighter text-[#364153] mb-1">
              Meet Our Leaders
            </h2>
            <div className="w-full h-[1px] bg-gray-300 mb-8"></div>
            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter text-[#1a1a1a] leading-tight mb-4">
              Our <span className="text-[#0201FF] font-normal">Leadership</span>
            </h3>
          </div>
          <p className="text-lg sm:text-xl text-[#364153] font-light max-w-3xl">
            Led by visionary leaders committed to organizational excellence
          </p>
        </div>

        {/* ========================================================================= */}
        {/* sementara tanpa foto */}
        {/* ========================================================================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Kartu Johan Yan */}
            <div className="bg-white p-10 lg:p-14 shadow-lg border border-gray-200 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#0201FF]/5 rounded-full blur-2xl group-hover:bg-[#0201FF]/10 transition-colors duration-300"></div>
              <div className="relative">
                <div className="w-12 h-1 bg-[#0201FF] mb-8"></div>
                <p
                  className={`text-xl lg:text-2xl font-normal leading-8 mb-6 tracking-normal text-[#1a1a1a] ${newsreader.className}`}
                >
                  &quot;Selama lebih dari 20 tahun, kami telah bermitra dengan
                  berbagai organisasi di seluruh Indonesia untuk menginspirasi
                  individu, memperkuat budaya kerja, dan menggerakkan perubahan
                  yang bermakna.&quot;
                </p>
                <p
                  className={`text-xl lg:text-2xl font-normal leading-8 tracking-normal text-[#1a1a1a] ${newsreader.className}`}
                >
                  &quot;Total Quality Indonesia terus membangun lingkungan kerja
                  di mana motivasi dan pertumbuhan berkembang beriringan.&quot;
                </p>
              </div>
              <div className="mt-12 relative">
                <h3 className="text-3xl font-light text-[#1a1a1a] mb-4 tracking-tight">
                  Johan Yan
                </h3>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0201FF]">
                  <span className="text-white font-light text-xs uppercase tracking-wide">
                    Direktur Utama
                  </span>
                </div>
              </div>
            </div>

            {/* Kartu Yusuf Adi Pura */}
            <div className="bg-white p-10 lg:p-14 shadow-lg border border-gray-200 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
              <div className="absolute top-0 left-0 w-32 h-32 bg-[#0201FF]/5 rounded-full blur-2xl group-hover:bg-[#0201FF]/10 transition-colors duration-300"></div>
              <div className="relative">
                <div className="w-12 h-1 bg-[#0201FF] mb-8"></div>
                <p
                  className={`text-xl lg:text-2xl font-normal leading-8 mb-6 tracking-normal text-[#1a1a1a] ${newsreader.className}`}
                >
                  &quot;Melalui inovasi strategis dan komitmen yang teguh, kami
                  mentransformasi tantangan menjadi peluang untuk pertumbuhan
                  berkelanjutan dan pencapaian ekselensi.&quot;
                </p>
                <p
                  className={`text-xl lg:text-2xl font-normal leading-8 tracking-normal text-[#1a1a1a] ${newsreader.className}`}
                >
                  &quot;Bersama-sama, kita membangun organisasi tangguh yang
                  siap menghadapi masa depan.&quot;
                </p>
              </div>
              <div className="mt-12 relative">
                <h3 className="text-3xl font-light text-[#1a1a1a] mb-4 tracking-tight">
                  Yusuf Adi Pura
                </h3>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0201FF]">
                  <span className="text-white font-light text-xs uppercase tracking-wide">
                    Direktur
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ========================================================================= */}

        {/* ========================================================================= */}
        {/* versi pake foto - nanti di uncomment */}
        {/* ========================================================================= */}
        {/*
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 shadow-lg overflow-hidden border border-gray-200">
            <div className="relative h-[400px] lg:h-[500px]">
              <Image
                src="https://images.squarespace-cdn.com/content/v1/5521b031e4b06ebe90178744/1578614550199-VA0TPUX88IDO9OUKBO3J/YT_19_03.jpg?format=1000w"
                alt="CEO"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0201FF]">
                    <span className="text-white font-light text-xs uppercase tracking-wide">
                      Direktur Utama
                    </span>
                  </div>
                  <div>
                    <h3 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
                      Johan Yan
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-12 lg:p-16 flex items-center border-l border-gray-200">
              <div className="text-[#1a1a1a]">
                <div className="w-12 h-1 bg-[#0201FF] mb-8"></div>
                <p
                  className={`text-xl lg:text-xl font-normal leading-7 mb-10 tracking-normal ${newsreader.className}`}
                >
                  For more than 20 years, we&apos;ve partnered with
                  organizations across Southeast Asia to inspire people,
                  strengthen culture, and drive meaningful change.
                </p>
                <p
                  className={`text-xl lg:text-xl font-normal leading-7 mb-10 tracking-normal ${newsreader.className}`}
                >
                  Total Quality Indonesia continues to shape workplaces where
                  motivation and growth thrive together.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 shadow-lg overflow-hidden border border-gray-200">
            <div className="bg-white p-12 lg:p-16 flex items-center border-r border-gray-200">
              <div className="text-[#1a1a1a]">
                <div className="w-12 h-1 bg-[#0201FF] mb-8"></div>
                <p
                  className={`text-xl lg:text-xl font-normal leading-7 mb-10 tracking-normal ${newsreader.className}`}
                >
                  Through strategic innovation and unwavering commitment, we
                  transform challenges into opportunities for sustainable growth
                  and excellence.
                </p>
                <p
                  className={`text-xl lg:text-xl font-normal leading-7 mb-10 tracking-normal ${newsreader.className}`}
                >
                  Together, we build resilient organization ready for the
                  future.
                </p>
              </div>
            </div>

            <div className="relative h-[400px] lg:h-[500px]">
              <Image
                src="/YSF.jpg"
                alt="Director"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
                      Yusuf Adi Pura
                    </h3>
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0201FF]">
                    <span className="text-white font-light text-xs uppercase tracking-wide">
                      Direktur
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        */}
        {/* ========================================================================= */}
      </section>

      {/* Company Values Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-base sm:text-2xl md:text-xl lg:text-2xl font-light tracking-tighter text-[#364153] mb-1">
              What Drives Us
            </h2>
            <div className="w-full h-[1px] bg-gray-300 mb-8"></div>
            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter text-[#1a1a1a] leading-tight mb-4">
              Our Core{" "}
              <span className="text-[#0201FF] font-normal">Values</span>
            </h3>
            <p className="text-lg sm:text-xl text-[#364153] font-light max-w-3xl mt-4">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Trustworthy */}
            <div className="group relative bg-white border border-gray-200 p-10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#0201FF] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
              <div className="relative">
                <div className="w-12 h-12 border-2 border-[#0201FF] flex items-center justify-center mb-6 group-hover:bg-[#0201FF] transition-colors duration-300">
                  <svg
                    className="w-6 h-6 text-[#0201FF] group-hover:text-white transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-light text-[#1a1a1a] mb-4 tracking-tight">
                  Kepercayaan
                </h3>
                <p className="text-[#364153] leading-relaxed font-light">
                  Kami membangun kepercayaan melalui integritas, transparansi,
                  dan konsistensi dalam setiap interaksi. Kami berkomitmen untuk
                  memenuhi janji kami kepada klien, mitra, dan rekan kerja,
                  memastikan bahwa kepercayaan yang diberikan kepada kami selalu
                  dihargai dan dijaga dengan baik.
                </p>
              </div>
            </div>

            {/* Contribution */}
            <div className="group relative bg-white border border-gray-200 p-10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#0201FF] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
              <div className="relative">
                <div className="w-12 h-12 border-2 border-[#0201FF] flex items-center justify-center mb-6 group-hover:bg-[#0201FF] transition-colors duration-300">
                  <svg
                    className="w-6 h-6 text-[#0201FF] group-hover:text-white transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-light text-[#1a1a1a] mb-4 tracking-tight">
                  Kontribusi
                </h3>
                <p className="text-[#364153] leading-relaxed font-light">
                  Berdasarkan prinsip &ldquo;lebih baik memberi daripada
                  menerima,&rdquo; kami mengukur semua kinerja, pencapaian, dan
                  pengakuan berdasarkan kontribusi bermakna yang telah diberikan
                  kepada organisasi. Setiap tindakan harus menambah nilai dan
                  mendorong kesuksesan kolektif.
                </p>
              </div>
            </div>

            {/* Partnership */}
            <div className="group relative bg-white border border-gray-200 p-10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#0201FF] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
              <div className="relative">
                <div className="w-12 h-12 border-2 border-[#0201FF] flex items-center justify-center mb-6 group-hover:bg-[#0201FF] transition-colors duration-300">
                  <svg
                    className="w-6 h-6 text-[#0201FF] group-hover:text-white transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-light text-[#1a1a1a] mb-4 tracking-tight">
                  Partnership
                </h3>
                <p className="text-[#364153] leading-relaxed font-light">
                  Kami percaya pada kekuatan kemitraan yang kuat dan saling
                  menguntungkan. Kami berkomitmen untuk membangun hubungan
                  jangka panjang dengan klien, mitra, dan komunitas kami,
                  berdasarkan rasa saling percaya, kolaborasi, dan dukungan
                  bersama untuk mencapai tujuan bersama.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-base sm:text-2xl md:text-xl lg:text-2xl font-light tracking-tighter text-[#364153] mb-1">
              Our History
            </h2>
            <div className="w-full h-[1px] bg-gray-300 mb-8"></div>
            {/* <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter text-[#1a1a1a] leading-tight mb-4">
              Our <span className="text-[#0201FF] font-normal">Journey</span>
            </h3>
            <p className="text-lg sm:text-xl text-[#364153] font-light max-w-3xl mt-4">
              Two decades of transformation, innovation, and excellence
            </p> */}
          </div>

          {/* Timeline Navigation */}
          {/* <div className="flex justify-start mb-12 overflow-x-auto pb-4">
            <div className="inline-flex gap-3 px-4">
              {timelineData.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setActiveYear(index)}
                  className={`px-6 py-3 font-light transition-all duration-300 whitespace-nowrap border ${
                    activeYear === index
                      ? "bg-[#0201FF] text-white border-[#0201FF] shadow-md"
                      : "bg-white text-[#364153] hover:bg-gray-50 border-gray-300"
                  }`}
                >
                  {item.year}
                </button>
              ))}
            </div>
          </div> */}

          {/* Timeline Content */}
          <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Image */}
              {/* <div
                className={`relative h-[400px] lg:h-[500px] overflow-hidden shadow-lg transition-all duration-700 border border-gray-200 ${
                  isTimelineVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }`}
              >
                <Image
                  src={timelineData[activeYear].image}
                  alt={timelineData[activeYear].title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="inline-block px-5 py-2 bg-[#0201FF] text-white font-normal text-2xl">
                    {timelineData[activeYear].year}
                  </span>
                </div>
              </div> */}

              {/* Content */}
              <div
                className={`transition-all duration-700 delay-200 ${
                  isTimelineVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
                }`}
              >
                {/* <div className="w-16 h-1 bg-[#0201FF] mb-6"></div> */}
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1a1a1a] mb-6 tracking-tight">
                  {timelineData[activeYear].title}
                </h3>
                <p className="text-lg sm:text-xl text-[#364153] leading-relaxed font-light">
                  {timelineData[activeYear].description}
                </p>

                {/* Progress Indicator */}
                <div className="mt-8">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-light text-[#364153]">
                      {activeYear + 1} of {timelineData.length}
                    </span>
                  </div>
                  <div className="h-1 bg-gray-200 overflow-hidden">
                    <div
                      className="h-full bg-[#0201FF] transition-all duration-500"
                      style={{
                        width: `${
                          ((activeYear + 1) / timelineData.length) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>

                {/* Navigation Arrows */}
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setActiveYear(Math.max(0, activeYear - 1))}
                    disabled={activeYear === 0}
                    className="px-6 py-3 bg-white border border-gray-300 text-[#364153] font-light hover:bg-gray-50 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={() =>
                      setActiveYear(
                        Math.min(timelineData.length - 1, activeYear + 1),
                      )
                    }
                    disabled={activeYear === timelineData.length - 1}
                    className="px-6 py-3 bg-[#0201FF] text-white font-light hover:bg-[#0000d1] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Visual Line */}
          <div className="mt-20 relative">
            <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-gray-300 -translate-y-1/2" />
            <div className="relative flex justify-between items-center">
              {timelineData.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setActiveYear(index)}
                  className="relative z-10 group"
                >
                  <div
                    className={`w-3 h-3 transition-all duration-300 ${
                      index <= activeYear
                        ? "bg-[#0201FF] scale-150"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                  <span
                    className={`absolute top-8 left-1/2 -translate-x-1/2 text-sm font-light whitespace-nowrap transition-all duration-300 ${
                      index <= activeYear ? "text-[#0201FF]" : "text-gray-400"
                    }`}
                  >
                    {item.year}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      {/* <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-base sm:text-2xl md:text-xl lg:text-2xl font-light tracking-tighter text-[#364153] mb-1">
              Client Feedback
            </h2>
            <div className="w-full h-[1px] bg-gray-300 mb-8"></div>
            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter text-[#1a1a1a] leading-tight mb-4">
              What Our Clients{" "}
              <span className="text-[#0201FF] font-normal">Say</span>
            </h3>
            <p className="text-lg sm:text-xl text-[#364153] font-light max-w-3xl mt-4">
              Trusted by industry leaders across Southeast Asia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gray-100 border border-gray-200 flex items-center justify-center text-[#364153] text-2xl font-light">
                  A
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-light text-[#1a1a1a]">
                    [Client Name]
                  </h4>
                  <p className="text-sm text-[#364153] font-light">
                    [Position]
                  </p>
                  <p className="text-sm text-gray-500 font-light">
                    [Company Name]
                  </p>
                </div>
              </div>
              <div className="w-8 h-1 bg-[#0201FF] mb-4"></div>
              <p className="text-[#364153] leading-relaxed mb-4 font-light">
                [Testimonial content will be added here. This space is reserved
                for client feedback about their experience with Total Quality
                Indonesia.]
              </p>
              <div className="flex text-[#FACC01]">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gray-100 border border-gray-200 flex items-center justify-center text-[#364153] text-2xl font-light">
                  B
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-light text-[#1a1a1a]">
                    [Client Name]
                  </h4>
                  <p className="text-sm text-[#364153] font-light">
                    [Position]
                  </p>
                  <p className="text-sm text-gray-500 font-light">
                    [Company Name]
                  </p>
                </div>
              </div>
              <div className="w-8 h-1 bg-[#0201FF] mb-4"></div>
              <p className="text-[#364153] leading-relaxed mb-4 font-light">
                [Testimonial content will be added here. This space is reserved
                for client feedback about their experience with Total Quality
                Indonesia.]
              </p>
              <div className="flex text-[#FACC01]">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gray-100 border border-gray-200 flex items-center justify-center text-[#364153] text-2xl font-light">
                  C
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-light text-[#1a1a1a]">
                    [Client Name]
                  </h4>
                  <p className="text-sm text-[#364153] font-light">
                    [Position]
                  </p>
                  <p className="text-sm text-gray-500 font-light">
                    [Company Name]
                  </p>
                </div>
              </div>
              <div className="w-8 h-1 bg-[#0201FF] mb-4"></div>
              <p className="text-[#364153] leading-relaxed mb-4 font-light">
                [Testimonial content will be added here. This space is reserved
                for client feedback about their experience with Total Quality
                Indonesia.]
              </p>
              <div className="flex text-[#FACC01]">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
