"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  User,
  Building2,
  Mail,
  Phone,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function ConsultationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    contact: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);
    return () => clearTimeout(timer);
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
    setFormData({ name: "", company: "", email: "", contact: "" });
    setIsSubmitting(false);
    setIsOpen(false);
    setShowForm(false);
    alert("Thank you! We will contact you soon.");
  };

  const handleGetStarted = () => {
    setShowForm(true);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
      onClick={handleBackdropClick}
    >
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal Container */}
      <div
        className="relative w-full max-w-xs sm:max-w-md md:max-w-3xl lg:max-w-4xl xl:max-w-5xl bg-white shadow-2xl overflow-hidden rounded-xl sm:rounded-2xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/95 hover:bg-white transition-all duration-200 group shadow-lg hover:shadow-xl"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-gray-900 group-hover:rotate-90 transition-transform duration-200" />
        </button>

        {/* Content */}
        {!showForm ? (
          // Initial View - Simplified
          <div className="relative min-h-[450px] sm:min-h-[500px] md:min-h-[550px] bg-gradient-to-br from-[#1e3a5f] via-[#2B5589] to-[#3d6ba6] overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              ></div>
            </div>

            {/* Decorative Circles */}
            <div className="absolute inset-0">
              <div className="absolute top-5 left-5 sm:top-10 sm:left-10 w-24 h-24 sm:w-40 sm:h-40 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
              <div
                className="absolute bottom-5 right-5 sm:bottom-10 sm:right-10 w-32 h-32 sm:w-56 sm:h-56 bg-white/10 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>

            {/* Main Content - Centered */}
            <div className="relative h-full flex flex-col items-center justify-center p-6 sm:p-8 md:p-10 lg:p-12 text-center min-h-[450px] sm:min-h-[500px] md:min-h-[550px]">
              {/* Logo */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4 sm:mb-6 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm p-2 sm:p-3">
                <div className="relative w-full h-full">
                  <Image
                    src="/tq-logo.png"
                    alt="Company Logo"
                    fill
                    sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Main Message */}
              <div className="max-w-2xl mx-auto space-y-0 sm:space-y-0 md:space-y-2">
                <div className="inline-flex items-center gap-2 bg-amber-400 text-amber-900 rounded-full px-3 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-bold mb-2">
                  LIMITED TIME OFFER
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight tracking-tighter px-4">
                  Free Consultation
                </h2>

                <div className="space-y-1 sm:space-y-2">
                  <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-amber-400 tracking-tight">
                    Worth IDR 50 Million
                  </p>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-light tracking-tight px-4">
                    Transform Your Business Today
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleGetStarted}
                className="mt-8 sm:mt-10 md:mt-12 bg-white hover:bg-gray-50 text-[#1e3a5f] font-semibold py-3 px-6 sm:py-4 sm:px-8 md:py-5 md:px-10 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 group shadow-2xl hover:shadow-xl transform hover:-translate-y-1 text-base sm:text-lg tracking-tight"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </button>

              {/* Trust Indicators */}
              {/* <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-white/80 font-light tracking-tight px-4">
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="whitespace-nowrap">100% Free</span>
                </span>
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="whitespace-nowrap">No Commitment</span>
                </span>
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="whitespace-nowrap">24 Hour Response</span>
                </span>
              </div> */}
            </div>
          </div>
        ) : (
          // Form View
          <div className="grid md:grid-cols-5 min-h-[500px] sm:min-h-[550px] md:min-h-[600px]">
            {/* Left Side - Smaller Image Section */}
            <div className="hidden md:block md:col-span-2 relative bg-gradient-to-br from-[#1e3a5f] via-[#2B5589] to-[#3d6ba6] overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div
                  className="absolute top-0 left-0 w-full h-full"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                ></div>
              </div>

              <div className="relative h-full flex flex-col items-center justify-center p-6 lg:p-8 text-center">
                <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 lg:mb-6 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm p-2 lg:p-3">
                  <div className="relative w-full h-full">
                    <Image
                      src="/tq-logo.png"
                      alt="Company Logo"
                      fill
                      sizes="(max-width: 1024px) 64px, 80px"
                      className="object-contain"
                    />
                  </div>
                </div>
                <h3 className="text-2xl lg:text-3xl font-semibold text-white mb-2 lg:mb-3 tracking-tight">
                  IDR 50 Million
                </h3>
                <p className="text-base lg:text-lg text-white/90 font-light mb-1 lg:mb-2 tracking-tight">
                  Free Consultation
                </p>
                <p className="text-sm text-white/80 font-light tracking-tight">
                  Waiting for You
                </p>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="md:col-span-3 p-6 sm:p-8 md:p-10 flex flex-col justify-center bg-white">
              <div className="max-w-md mx-auto w-full">
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2 tracking-tight">
                    Fill Your Details
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 font-light tracking-tight">
                    We will contact you within 24 hours
                  </p>
                </div>

                <div className="space-y-4 sm:space-y-5">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
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
                        placeholder="e.g. John Smith"
                        required
                        className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-3.5 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#2B5589] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Company Input */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                      Company Name *
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="e.g. Tech Solutions Inc."
                        required
                        className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-3.5 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#2B5589] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
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
                        placeholder="e.g. john@company.com"
                        required
                        className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-3.5 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#2B5589] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Contact Input */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                      WhatsApp Number *
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <input
                        type="tel"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        placeholder="e.g. +62 812 3456 7890"
                        required
                        className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-3.5 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#2B5589] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#2B5589] to-[#1e3a5f] hover:from-[#1e3a5f] hover:to-[#2B5589] text-white font-semibold py-3 sm:py-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-4 sm:mt-6 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 tracking-tight text-sm sm:text-base"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Get Free Consultation
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </span>
                    )}
                  </button>
                </div>

                <div className="mt-4 sm:mt-6 flex items-center justify-center gap-2 text-xs text-gray-500 font-light tracking-tight">
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-center">
                    Your data is protected and will never be shared
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
