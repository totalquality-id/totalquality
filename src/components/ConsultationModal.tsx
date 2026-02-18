"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  User,
  Mail,
  ArrowRight,
  Sparkles,
  Clock,
} from "lucide-react";

export default function ConsultationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    // Check if modal should be shown based on localStorage
    const CONSULTATION_MODAL_KEY = "consultation_modal_last_shown";
    const CONSULTATION_MODAL_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    const lastShownTime = localStorage.getItem(CONSULTATION_MODAL_KEY);
    const now = Date.now();

    // Show modal if:
    // 1. Never shown before, or
    // 2. More than 24 hours have passed
    let shouldShowModal = false;

    if (!lastShownTime) {
      // First time visiting
      shouldShowModal = true;
    } else {
      const lastTime = parseInt(lastShownTime, 10);
      if (now - lastTime > CONSULTATION_MODAL_INTERVAL) {
        // More than 24 hours have passed
        shouldShowModal = true;
      }
    }

    if (shouldShowModal) {
      // Delay showing the modal by 2 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
        // Update the last shown time
        localStorage.setItem(CONSULTATION_MODAL_KEY, now.toString());
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    setShowForm(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
      setShowForm(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "" });
    setIsSubmitting(false);
    setIsOpen(false);
    setShowForm(false);
    alert("Terima kasih! Kami akan segera menghubungi Anda.");
  };

  const handleGetStarted = () => {
    setShowForm(true);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 md:p-6"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
      onClick={handleBackdropClick}
    >
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal Container - Fixed Height */}
      <div
        className="relative w-full max-w-[95vw] sm:max-w-md md:max-w-xl lg:max-w-2xl h-auto max-h-[95vh] bg-white shadow-2xl rounded-xl sm:rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - Simple & Clickable */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 z-[100] w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-gray-800/80 hover:bg-gray-900 transition-colors duration-200"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </button>

        {/* Content - Scrollable if needed */}
        <div className="h-full overflow-y-auto">
          {!showForm ? (
            // Initial View - Ramai tapi Professional
            <div className="relative min-h-0">
              {/* Background Image with Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80')`,
                }}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f]/95 via-[#2B5589]/95 to-[#3d6ba6]/95"></div>
              </div>

              {/* Confetti Kiri */}
              <div className="absolute left-0 top-0 h-full w-10 sm:w-12 md:w-16 overflow-hidden pointer-events-none z-10">
                {[...Array(15)].map((_, i) => (
                  <div
                    key={`left-${i}`}
                    className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full animate-bounce"
                    style={{
                      backgroundColor: [
                        "#ffd93d",
                        "#ff6bcb",
                        "#4ecdc4",
                        "#96ceb4",
                        "#ff6b6b",
                      ][i % 5],
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${2 + Math.random() * 1.5}s`,
                      opacity: 0.8,
                    }}
                  />
                ))}
              </div>

              {/* Confetti Kanan */}
              <div className="absolute right-0 top-0 h-full w-10 sm:w-12 md:w-16 overflow-hidden pointer-events-none z-10">
                {[...Array(15)].map((_, i) => (
                  <div
                    key={`right-${i}`}
                    className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full animate-bounce"
                    style={{
                      backgroundColor: [
                        "#ffd93d",
                        "#ff6bcb",
                        "#4ecdc4",
                        "#96ceb4",
                        "#ff6b6b",
                      ][i % 5],
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${2 + Math.random() * 1.5}s`,
                      opacity: 0.8,
                    }}
                  />
                ))}
              </div>

              {/* Sparkles Effect */}
              <div className="absolute inset-0 z-10 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={`sparkle-${i}`}
                    className="absolute animate-pulse hidden sm:block"
                    style={{
                      left: `${15 + Math.random() * 70}%`,
                      top: `${10 + Math.random() * 80}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${2 + Math.random() * 2}s`,
                    }}
                  >
                    <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-amber-400" />
                  </div>
                ))}
              </div>

              {/* Decorative Circles */}
              <div className="absolute inset-0 z-10">
                <div className="absolute top-5 left-5 sm:top-10 sm:left-10 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-amber-400/25 rounded-full blur-3xl animate-pulse"></div>
                <div
                  className="absolute bottom-5 right-5 sm:bottom-10 sm:right-10 w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 bg-purple-400/20 rounded-full blur-3xl animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 bg-pink-400/15 rounded-full blur-3xl animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                ></div>
              </div>

              {/* Main Content */}
              <div className="relative z-20 flex flex-col items-center justify-center px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 text-center">
                {/* Anniversary Badge */}
                <div className="mb-2 sm:mb-3 md:mb-4 relative">
                  <div className="absolute inset-0 bg-amber-400 blur-md opacity-40 animate-pulse"></div>
                  <div className="relative inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-900 rounded-full px-3 py-1 sm:px-4 sm:py-1.5 md:px-5 md:py-2 text-xs sm:text-sm font-black shadow-xl">
                    🎂 ANNIVERSARY KE-20 🎉
                  </div>
                </div>

                {/* Logo */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-2 sm:mb-3 md:mb-4 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center p-2 sm:p-2.5 md:p-3 shadow-2xl ring-2 sm:ring-4 ring-amber-400/30 animate-pulse">
                  <div className="relative w-full h-full">
                    <Image
                      src="/tq-logo.png"
                      alt="Company Logo"
                      fill
                      sizes="(max-width: 640px) 56px, (max-width: 768px) 64px, 80px"
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>

                {/* Special Offer Badge */}
                <div className="mb-2 sm:mb-3 md:mb-4 relative">
                  <div className="absolute inset-0 bg-red-500 blur-lg opacity-40 animate-pulse"></div>
                  <div className="relative inline-flex items-center gap-1 sm:gap-1.5 md:gap-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg sm:rounded-xl px-3 py-1 sm:px-4 sm:py-1.5 md:px-5 md:py-2 text-xs sm:text-sm font-bold shadow-xl border border-red-400 sm:border-2">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="whitespace-nowrap">
                      PROMO SPESIAL TERBATAS!
                    </span>
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>

                {/* Main Message */}
                <div className="max-w-xl mx-auto space-y-1.5 sm:space-y-2 md:space-y-3 mb-3 sm:mb-4 md:mb-5">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight drop-shadow-2xl px-2">
                    Konsultasi Bisnis Premium
                  </h2>

                  <div className="relative inline-block">
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 line-through font-bold">
                      Senilai IDR 50 Juta
                    </p>
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 sm:h-1 bg-red-500 transform -rotate-12"></div>
                  </div>

                  <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300 text-transparent bg-clip-text drop-shadow-2xl animate-pulse">
                    100% GRATIS!
                  </p>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/95 font-semibold mt-2 px-2">
                    🚀 Tingkatkan Performa Bisnis Anda
                  </p>
                </div>

                {/* Countdown Timer */}
                <div className="mb-4 sm:mb-5 md:mb-6 bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 shadow-2xl w-full max-w-xs sm:max-w-sm">
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-1 sm:mb-1.5 md:mb-2">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 animate-pulse" />
                    <p className="text-xs sm:text-xs font-bold text-red-600">
                      PROMO BERAKHIR DALAM:
                    </p>
                  </div>
                  <div className="flex gap-2 sm:gap-2.5 md:gap-3 justify-center">
                    <div className="text-center">
                      <div className="bg-gradient-to-br from-red-600 to-red-500 text-white font-black text-base sm:text-lg md:text-xl px-2 py-1 sm:px-2.5 sm:py-1.5 md:px-3 md:py-2 rounded-md sm:rounded-lg shadow-lg">
                        23
                      </div>
                      <p className="text-xs text-gray-700 mt-0.5 sm:mt-1 font-semibold">
                        JAM
                      </p>
                    </div>
                    <div className="text-lg sm:text-xl md:text-2xl font-black text-gray-800 self-center">
                      :
                    </div>
                    <div className="text-center">
                      <div className="bg-gradient-to-br from-red-600 to-red-500 text-white font-black text-base sm:text-lg md:text-xl px-2 py-1 sm:px-2.5 sm:py-1.5 md:px-3 md:py-2 rounded-md sm:rounded-lg shadow-lg">
                        45
                      </div>
                      <p className="text-xs text-gray-700 mt-0.5 sm:mt-1 font-semibold">
                        MENIT
                      </p>
                    </div>
                    <div className="text-lg sm:text-xl md:text-2xl font-black text-gray-800 self-center">
                      :
                    </div>
                    <div className="text-center">
                      <div className="bg-gradient-to-br from-red-600 to-red-500 text-white font-black text-base sm:text-lg md:text-xl px-2 py-1 sm:px-2.5 sm:py-1.5 md:px-3 md:py-2 rounded-md sm:rounded-lg shadow-lg">
                        12
                      </div>
                      <p className="text-xs text-gray-700 mt-0.5 sm:mt-1 font-semibold">
                        DETIK
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={handleGetStarted}
                  className="mb-4 sm:mb-5 md:mb-6 relative group w-full max-w-xs sm:max-w-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 rounded-lg sm:rounded-xl blur-md opacity-60 group-hover:opacity-90 animate-pulse transition-opacity"></div>
                  <div className="relative bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-amber-900 font-black py-3 px-4 sm:py-3.5 sm:px-6 md:py-4 md:px-8 rounded-lg sm:rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 shadow-2xl transform group-hover:scale-105 text-sm sm:text-base md:text-lg border-2 border-amber-300">
                    <span>🎁 Klaim Promo Sekarang!</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </button>
              </div>
            </div>
          ) : (
            // Form View
            <div className="relative min-h-0">
              {/* Background Image with Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80')`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f]/95 via-[#2B5589]/95 to-[#3d6ba6]/95"></div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute inset-0 z-10">
                <div className="absolute top-5 left-5 sm:top-10 sm:left-10 w-24 h-24 sm:w-32 sm:h-32 bg-amber-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div
                  className="absolute bottom-5 right-5 sm:bottom-10 sm:right-10 w-28 h-28 sm:w-40 sm:h-40 bg-white/10 rounded-full blur-3xl animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
              </div>

              {/* Form Content */}
              <div className="relative z-20 px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 flex flex-col justify-center">
                <div className="max-w-md mx-auto w-full">
                  {/* Logo */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center p-2 sm:p-2.5 md:p-3 shadow-xl">
                    <div className="relative w-full h-full">
                      <Image
                        src="/tq-logo.png"
                        alt="Company Logo"
                        fill
                        sizes="(max-width: 640px) 48px, (max-width: 768px) 56px, 64px"
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <div className="mb-4 sm:mb-5 md:mb-6 text-center">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1.5 sm:mb-2">
                      Mulai Konsultasi Gratis
                    </h2>
                    <p className="text-xs sm:text-sm text-white/90">
                      Isi formulir di bawah untuk memulai
                    </p>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    {/* Name Input */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-white mb-1.5 sm:mb-2">
                        Nama Lengkap *
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400">
                          <User className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Masukkan nama lengkap"
                          required
                          className="w-full bg-white/95 border-2 border-white/20 rounded-lg sm:rounded-xl pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-amber-400 focus:bg-white transition-all shadow-lg"
                        />
                      </div>
                    </div>

                    {/* Email Input */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-white mb-1.5 sm:mb-2">
                        Alamat Email *
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400">
                          <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="nama@perusahaan.com"
                          required
                          className="w-full bg-white/95 border-2 border-white/20 rounded-lg sm:rounded-xl pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-amber-400 focus:bg-white transition-all shadow-lg"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-amber-900 font-bold py-3 sm:py-3.5 md:py-4 rounded-lg sm:rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-4 sm:mt-6 shadow-xl hover:shadow-2xl transform hover:scale-105 text-sm sm:text-base"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-amber-900/30 border-t-amber-900 rounded-full animate-spin" />
                          <span>Memproses...</span>
                        </div>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          🎁 Dapatkan Konsultasi Gratis
                          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </span>
                      )}
                    </button>
                  </div>

                  <div className="mt-3 sm:mt-4 md:mt-5 flex items-center justify-center gap-1.5 sm:gap-2 text-xs text-white/70">
                    <svg
                      className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/50 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Data Anda aman dan terlindungi</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
