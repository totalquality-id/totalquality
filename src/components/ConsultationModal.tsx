"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, User, Mail, Phone, ArrowRight, Shield, CheckCircle } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  name: string;
  email: string;
  phone: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

// ─── Constants ────────────────────────────────────────────────────────────────

const MODAL_STORAGE_KEY = "consultation_modal_last_shown";
const MODAL_INTERVAL_MS = 24 * 60 * 60 * 1000; // 24 hours
const MODAL_DELAY_MS = 2000;

const BENEFITS: string[] = [
  "Analisis kebutuhan bisnis Anda",
  "Rekomendasi program pelatihan terbaik",
  "Konsultasi langsung dengan expert kami",
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function InputField({
  id,
  name,
  type,
  label,
  placeholder,
  value,
  icon: Icon,
  onChange,
  disabled,
}: {
  id: string;
  name: keyof FormData;
  type: string;
  label: string;
  placeholder: string;
  value: string;
  icon: React.ElementType;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          disabled={disabled}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#0201FF]/50 focus:bg-white focus:ring-2 focus:ring-[#0201FF]/10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ConsultationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", phone: "" });

  // ── Auto-show logic ─────────────────────────────────────────────────────────

  useEffect(() => {
    const lastShown = localStorage.getItem(MODAL_STORAGE_KEY);
    const now = Date.now();
    const shouldShow =
      !lastShown || now - parseInt(lastShown, 10) > MODAL_INTERVAL_MS;

    if (!shouldShow) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
      localStorage.setItem(MODAL_STORAGE_KEY, now.toString());
    }, MODAL_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  // ── Body scroll lock ────────────────────────────────────────────────────────

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // ── Handlers ────────────────────────────────────────────────────────────────

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setShowForm(false);
    setSubmitStatus("idle");
  }, []);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) closeModal();
    },
    [closeModal],
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) return;

      setSubmitStatus("loading");
      try {
        const response = await fetch("/api/consultations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Gagal mengirim data");
        }

        setSubmitStatus("success");
        setFormData({ name: "", email: "", phone: "" }); // Reset form
      } catch (error) {
        console.error("Error submitting form:", error);
        setSubmitStatus("error");
      }
    },
    [formData],
  );

  // ── Render guard ─────────────────────────────────────────────────────────────

  if (!isOpen) return null;

  const isLoading = submitStatus === "loading";
  const isSuccess = submitStatus === "success";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div
        className="relative w-full max-w-md sm:max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent bar — brand color */}
        <div
          className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#0201FF] via-blue-500 to-[#0201FF]"
          aria-hidden="true"
        />

        {/* Close button */}
        <button
          onClick={closeModal}
          aria-label="Tutup modal"
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-all duration-200"
        >
          <X className="w-4 h-4" />
        </button>

        {/* ── Content ─────────────────────────────────────────────────────── */}
        <div className="relative px-6 py-8 sm:px-8 sm:py-10">
          {/* Brand header */}
          <div className="flex items-center gap-3 mb-7">
            <div className="relative w-10 h-10 flex-shrink-0 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center p-1.5 shadow-sm">
              <Image
                src="/tq-logo.png"
                alt="Total Quality logo"
                fill
                sizes="40px"
                className="object-contain p-1"
              />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest text-[#0201FF] uppercase">
                Total Quality
              </p>
              <p className="text-xs text-gray-400">
                Totally Agent of Change
              </p>
            </div>
          </div>

          {/* ── Landing view ──────────────────────────────────────────────── */}
          {!showForm && !isSuccess && (
            <div>
              <h2
                id="modal-title"
                className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-snug mb-2"
              >
                Konsultasi Gratis
                <br />
                <span className="text-[#0201FF]">untuk Bisnis Anda</span>
              </h2>
              <p className="text-sm text-gray-500 mb-7 leading-relaxed">
                Bicara langsung dengan konsultan kami dan temukan program
                pelatihan yang tepat.
              </p>

              {/* Benefit list */}
              <ul className="space-y-3 mb-8">
                {BENEFITS.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-[#0201FF] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* Primary CTA */}
              <button
                onClick={() => setShowForm(true)}
                className="group w-full flex items-center justify-center gap-2 bg-[#0201FF] hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Mulai Konsultasi
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </button>

              {/* Dismiss */}
              <button
                onClick={closeModal}
                className="w-full mt-3 py-2 text-xs text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                Mungkin nanti
              </button>
            </div>
          )}

          {/* ── Form view ─────────────────────────────────────────────────── */}
          {showForm && !isSuccess && (
            <div>
              <button
                onClick={() => setShowForm(false)}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 mb-5 transition-colors duration-200"
              >
                ← Kembali
              </button>

              <h2
                id="modal-title"
                className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1"
              >
                Isi detail Anda
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Kami akan menghubungi Anda dalam 1×24 jam kerja.
              </p>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <InputField
                  id="name"
                  name="name"
                  type="text"
                  label="Nama Lengkap"
                  placeholder="Masukkan nama Anda"
                  value={formData.name}
                  icon={User}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <InputField
                  id="email"
                  name="email"
                  type="email"
                  label="Alamat Email"
                  placeholder="nama@perusahaan.com"
                  value={formData.email}
                  icon={Mail}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <InputField
                  id="phone"
                  name="phone"
                  type="tel"
                  label="Nomor Telepon"
                  placeholder="0812xxxxxxx"
                  value={formData.phone}
                  icon={Phone}
                  onChange={handleChange}
                  disabled={isLoading}
                />

                {submitStatus === "error" && (
                  <p role="alert" className="text-xs text-red-500">
                    Terjadi kesalahan. Silakan coba lagi.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={
                    isLoading || !formData.name.trim() || !formData.email.trim() || !formData.phone.trim()
                  }
                  className="group w-full flex items-center justify-center gap-2 bg-[#0201FF] hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-md mt-2"
                >
                  {isLoading ? (
                    <>
                      <span
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                        aria-hidden="true"
                      />
                      Memproses...
                    </>
                  ) : (
                    <>
                      Kirim Permintaan
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                    </>
                  )}
                </button>
              </form>

              {/* Trust note */}
              <div className="mt-5 flex items-center justify-center gap-1.5 text-xs text-gray-400">
                <Shield className="w-3.5 h-3.5 flex-shrink-0" />
                Data Anda aman dan tidak akan dibagikan kepada pihak ketiga.
              </div>
            </div>
          )}

          {/* ── Success view ──────────────────────────────────────────────── */}
          {isSuccess && (
            <div className="flex flex-col items-center text-center py-4">
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-5 ring-1 ring-blue-100">
                <CheckCircle className="w-7 h-7 text-[#0201FF]" />
              </div>
              <h2
                id="modal-title"
                className="text-xl font-semibold text-gray-900 mb-2"
              >
                Terima kasih!
              </h2>
              <p className="text-sm text-gray-500 mb-8 max-w-xs leading-relaxed">
                Permintaan konsultasi Anda telah kami terima. Tim kami akan
                menghubungi Anda dalam 1×24 jam kerja.
              </p>
              <button
                onClick={closeModal}
                className="px-6 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors duration-200"
              >
                Tutup
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}