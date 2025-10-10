"use client";
import { useState, useEffect } from "react";
import {
  Phone,
  Mail,
  Facebook,
  Linkedin,
  Instagram,
  Twitter,
  Menu,
  X,
} from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [sidebarOpen]);

  const handleLinkClick = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <header
        className={`fixed w-full top-0 z-50 transition-all duration-700 ease-in-out ${
          scrolled ? "bg-white shadow-lg" : "bg-transparent"
        }`}
        style={{ fontFamily: "Inter, system-ui, sans-serif" }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Top Bar - Contact & Social */}
          <div
            className={`hidden lg:flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3 text-xs sm:text-sm border-b transition-all duration-700 ease-in-out ${
              scrolled
                ? "border-gray-200 text-gray-600"
                : "border-white/20 text-white"
            }`}
          >
            <div className="flex items-center gap-4 lg:gap-6">
              <div className="flex items-center gap-2 hover:text-[#FACC01] transition-colors duration-300 cursor-pointer">
                <Phone className="w-4 h-4 transition-all duration-700" />
                <span className="transition-all duration-700 hidden xl:inline">
                  +62 31 848 4690/95
                </span>
              </div>
              <div className="flex items-center gap-2 hover:text-[#FACC01] transition-colors duration-300 cursor-pointer">
                <Mail className="w-4 h-4 transition-all duration-700" />
                <span className="transition-all duration-700 hidden xl:inline">
                  info@tqpartner.com
                </span>
              </div>
            </div>
            <div className="flex gap-2 sm:gap-3">
              <a
                href="https://www.facebook.com/totalquality.id/"
                aria-label="Facebook"
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-700 ease-in-out ${
                  scrolled
                    ? "bg-gray-100 hover:bg-[#2B5589] text-gray-600 hover:text-white"
                    : "relative group"
                }`}
              >
                {!scrolled && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 rounded-full blur-md group-hover:blur-lg transition-all duration-300" />
                    <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-full border border-white/30 group-hover:bg-white/30 transition-all duration-300" />
                  </>
                )}
                <Facebook className="w-4 h-4 relative z-10 transition-all duration-700" />
              </a>
              <a
                href="https://www.linkedin.com/company/pt-total-quality-indonesia/"
                aria-label="LinkedIn"
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-700 ease-in-out ${
                  scrolled
                    ? "bg-gray-100 hover:bg-[#2B5589] text-gray-600 hover:text-white"
                    : "relative group"
                }`}
              >
                {!scrolled && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 rounded-full blur-md group-hover:blur-lg transition-all duration-300" />
                    <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-full border border-white/30 group-hover:bg-white/30 transition-all duration-300" />
                  </>
                )}
                <Linkedin className="w-4 h-4 relative z-10 transition-all duration-700" />
              </a>
              <a
                href="https://www.instagram.com/totalquality.id/"
                aria-label="Instagram"
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-700 ease-in-out ${
                  scrolled
                    ? "bg-gray-100 hover:bg-[#2B5589] text-gray-600 hover:text-white"
                    : "relative group"
                }`}
              >
                {!scrolled && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 rounded-full blur-md group-hover:blur-lg transition-all duration-300" />
                    <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-full border border-white/30 group-hover:bg-white/30 transition-all duration-300" />
                  </>
                )}
                <Instagram className="w-4 h-4 relative z-10 transition-all duration-700" />
              </a>
              <a
                href="https://www.twitter.com/totalquality_id"
                aria-label="Twitter"
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-700 ease-in-out ${
                  scrolled
                    ? "bg-gray-100 hover:bg-[#2B5589] text-gray-600 hover:text-white"
                    : "relative group"
                }`}
              >
                {!scrolled && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 rounded-full blur-md group-hover:blur-lg transition-all duration-300" />
                    <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-full border border-white/30 group-hover:bg-white/30 transition-all duration-300" />
                  </>
                )}
                <Twitter className="w-4 h-4 relative z-10 transition-all duration-700" />
              </a>
            </div>
          </div>

          {/* Bottom Bar - Logo & Navigation */}
          <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            <div className="flex items-center">
              <img
                src="tq-logo.png"
                alt="Total Quality Logo"
                className={`h-8 sm:h-10 w-auto transition-all duration-700 ease-in-out ${
                  scrolled ? "" : "brightness-0 invert"
                }`}
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:block">
              <ul
                className={`flex items-center gap-4 xl:gap-8 font-medium text-sm transition-all duration-700 ease-in-out ${
                  scrolled ? "text-gray-700" : "text-white"
                }`}
              >
                <li>
                  <a
                    href="#about"
                    className="hover:text-[#FACC01] transition-colors duration-300 relative group"
                  >
                    About Us
                    <span
                      className={`absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
                        scrolled ? "bg-[#2B5589]" : "bg-[#FACC01]"
                      }`}
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="hover:text-[#FACC01] transition-colors duration-300 relative group"
                  >
                    Services
                    <span
                      className={`absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
                        scrolled ? "bg-[#2B5589]" : "bg-[#FACC01]"
                      }`}
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="#events"
                    className="hover:text-[#FACC01] transition-colors duration-300 relative group"
                  >
                    Events
                    <span
                      className={`absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
                        scrolled ? "bg-[#2B5589]" : "bg-[#FACC01]"
                      }`}
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="#news"
                    className="hover:text-[#FACC01] transition-colors duration-300 relative group"
                  >
                    News
                    <span
                      className={`absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
                        scrolled ? "bg-[#2B5589]" : "bg-[#FACC01]"
                      }`}
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="#career"
                    className="hover:text-[#FACC01] transition-colors duration-300 relative group"
                  >
                    Career
                    <span
                      className={`absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
                        scrolled ? "bg-[#2B5589]" : "bg-[#FACC01]"
                      }`}
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="#forum"
                    className="hover:text-[#FACC01] transition-colors duration-300 relative group"
                  >
                    Forum
                    <span
                      className={`absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
                        scrolled ? "bg-[#2B5589]" : "bg-[#FACC01]"
                      }`}
                    />
                  </a>
                </li>
                <li>
                  {scrolled ? (
                    <a
                      href="#self-assessment"
                      className="px-4 xl:px-6 py-2 xl:py-2.5 rounded-lg font-semibold transition-all duration-700 ease-in-out shadow-md hover:shadow-lg bg-[#2B5589] text-white hover:bg-[#FACC01] hover:text-[#2B5589]"
                    >
                      Self Assessment
                    </a>
                  ) : (
                    <a
                      href="#assessment"
                      className="relative group px-4 xl:px-6 py-2 xl:py-2.5 rounded-lg font-semibold transition-all duration-700 ease-in-out"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 rounded-lg blur-md group-hover:blur-lg transition-all duration-300" />
                      <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-lg border border-white/30 group-hover:bg-white/30 transition-all duration-300" />
                      <span className="relative z-10 text-white drop-shadow">
                        Self Assessment
                      </span>
                    </a>
                  )}
                </li>
              </ul>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className={`lg:hidden p-2 rounded-lg transition-all duration-300 ${
                scrolled
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <img
              src="/tq-logo.png"
              alt="Total Quality Logo"
              className="h-8 w-auto"
            />
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300 text-gray-700"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 overflow-y-auto py-6">
            <ul className="space-y-1 px-4">
              <li>
                <a
                  href="#about"
                  onClick={handleLinkClick}
                  className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-[#2B5589] hover:text-white transition-all duration-300 font-medium"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={handleLinkClick}
                  className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-[#2B5589] hover:text-white transition-all duration-300 font-medium"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#events"
                  onClick={handleLinkClick}
                  className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-[#2B5589] hover:text-white transition-all duration-300 font-medium"
                >
                  Events
                </a>
              </li>
              <li>
                <a
                  href="#news"
                  onClick={handleLinkClick}
                  className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-[#2B5589] hover:text-white transition-all duration-300 font-medium"
                >
                  News
                </a>
              </li>
              <li>
                <a
                  href="#career"
                  onClick={handleLinkClick}
                  className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-[#2B5589] hover:text-white transition-all duration-300 font-medium"
                >
                  Career
                </a>
              </li>
              <li>
                <a
                  href="#forum"
                  onClick={handleLinkClick}
                  className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-[#2B5589] hover:text-white transition-all duration-300 font-medium"
                >
                  Forum
                </a>
              </li>
              <li className="pt-2">
                <a
                  href="#self-assessment"
                  onClick={handleLinkClick}
                  className="block px-4 py-3 rounded-lg bg-[#2B5589] text-white hover:bg-[#FACC01] hover:text-[#2B5589] transition-all duration-300 font-semibold text-center shadow-md"
                >
                  Self Assessment
                </a>
              </li>
            </ul>
          </nav>

          {/* Sidebar Footer - Contact & Social */}
          <div className="border-t border-gray-200 p-6 space-y-4">
            <div className="space-y-3">
              <a
                href="tel:+62318484690"
                className="flex items-center gap-3 text-gray-600 hover:text-[#2B5589] transition-colors duration-300"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm">+62 31 848 4690/95</span>
              </a>
              <a
                href="mailto:info@tqpartner.com"
                className="flex items-center gap-3 text-gray-600 hover:text-[#2B5589] transition-colors duration-300"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">info@tqpartner.com</span>
              </a>
            </div>

            <div className="flex gap-3 pt-2">
              <a
                href="https://www.facebook.com/totalquality.id/"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 hover:bg-[#2B5589] text-gray-600 hover:text-white transition-all duration-300"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/pt-total-quality-indonesia/"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 hover:bg-[#2B5589] text-gray-600 hover:text-white transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/totalquality.id/"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 hover:bg-[#2B5589] text-gray-600 hover:text-white transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.twitter.com/totalquality_id"
                aria-label="Twitter"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 hover:bg-[#2B5589] text-gray-600 hover:text-white transition-all duration-300"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
