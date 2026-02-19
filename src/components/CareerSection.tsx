"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Calendar,
  ArrowRight,
  Briefcase,
  X, // Tambahkan X icon
} from "lucide-react";

interface Career {
  id: number;
  title: string;
  description: string;
  requirements: string;
  location: string;
  _count: {
    applicants: number;
  };
}

export default function CareerSection() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);

  // State baru untuk mengontrol Popup
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const res = await fetch("/api/careers");
        const data = await res.json();
        setCareers(data);
      } catch (err) {
        console.error("Failed to fetch careers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCareers();
  }, []);

  // Update fungsi ini untuk membuka modal
  const handleSeeOpportunities = () => {
    setIsModalOpen(true);
  };

  return (
    <section
      id="career"
      className="relative w-full min-h-screen overflow-hidden"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://img.freepik.com/free-photo/hr-representatives-positively-greeting-female-job-candidate_1163-4702.jpg?t=st=1763294266~exp=1763297866~hmac=7ab1936330ce265b8825e3783140cd959ebd4116b83f601539989b15564e13ce&w=2000"
          alt="Team collaboration"
          fill
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/1- via-black/30 to-black" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-black/35 to-black/70" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full min-h-screen flex items-center justify-center px-4 sm:px-8 lg:px-16">
        <div className="max-w-6xl text-center">
          <h2 className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-white leading-tighter mb-4 sm:mb-6">
            Build Your Career
            <br />
            <span className="text-[#FACC01]">With Us</span>
          </h2>

          <p className="text-lg sm:text-xl lg:text-2xl text-white/90 leading-tight font-light max-w-2xl mx-auto mb-4 sm:mb-8">
            Join our team and grow together. Explore opportunities that match
            your passion and expertise.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-4 sm:gap-8 mb-10 sm:mb-12">
            <div className="flex items-center justify-center gap-3">
              <Calendar className="w-5 h-5 text-[#FACC01] flex-shrink-0" />
              <p className="text-sm sm:text-base text-white/90 font-light">
                20+ Years Excellence
              </p>
            </div>

            <div className="flex items-center justify-center gap-3">
              <Briefcase className="w-5 h-5 text-[#FACC01] flex-shrink-0" />
              <p className="text-sm sm:text-base text-white/90 font-light">
                {loading ? "Loading..." : `${careers.length}+ Open Positions`}
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleSeeOpportunities}
              className="group inline-flex items-center justify-center gap-3 bg-[#FACC01] text-[#1a2942] font-medium px-8 py-4 hover:bg-[#ffd700] transition-all duration-300 shadow-2xl shadow-[#FACC01]/30 hover:shadow-[#FACC01]/50 hover:scale-105 rounded-sm"
            >
              <span className="text-base tracking-wide">See Opportunities</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-10 w-64 h-64 bg-[#FACC01]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-72 h-72 bg-[#0201FF]/10 rounded-full blur-3xl pointer-events-none" />

      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
          {/* Backdrop Blur (warna biru gelap agar senada dengan hero) */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Container */}
          <div
            className="relative w-full max-w-lg bg-white p-8 sm:p-12 shadow-2xl border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-300 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Subtle Corner Accents */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#0201FF]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#FACC01]/5 rounded-full blur-3xl pointer-events-none" />

            {/* Tombol Tutup Kotak Tajam */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-gray-50 hover:border-white text-[#364153] transition-colors border border-gray-200 z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="relative z-10">
              {/* Ikon dengan border kotak (Senada dengan About Page Values) */}
              {/* <div className="w-14 h-14 border-2 border-[#0201FF] flex items-center justify-center mb-8 bg-white group-hover:bg-[#0201FF] transition-colors duration-300">
                <Briefcase className="w-6 h-6 text-[#0201FF]" />
              </div> */}

              {/* Teks & Typography */}
              <h3 className="text-3xl sm:text-4xl font-light text-[#1a1a1a] mb-6 tracking-tight">
                Segera <span className="text-[#0201FF] font-normal">Hadir</span>
              </h3>

              {/* <div className="w-12 h-1 bg-gradient-to-r from-[#0201FF] to-[#FACC01] mb-6"></div> */}

              <p className="text-base sm:text-lg text-[#364153] font-light leading-relaxed mb-10">
                Informasi peluang karir sedang dalam tahap persiapan. Kami
                sedang menyiapkan tempat terbaik untuk Anda bertumbuh bersama
                kami. Silakan kembali dalam waktu dekat.
              </p>

              {/* Tombol Aksi Tajam & Interaktif */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="group w-full inline-flex items-center justify-center gap-3 bg-[#0201FF] text-white font-light px-8 py-4 hover:bg-[#0000d1] transition-all duration-300 shadow-xl shadow-[#0201FF]/20 hover:shadow-[#0201FF]/40"
              >
                <span className="text-base tracking-wide">Saya Mengerti</span>
                {/* <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" /> */}
              </button>
            </div>

            {/* Bottom Accent Line */}
            {/* <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0201FF] via-[#0201FF] to-[#FACC01]" /> */}
          </div>
        </div>
      )}
    </section>
  );
}
