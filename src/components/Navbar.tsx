"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
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
  const pathname = usePathname();
  const router = useRouter();

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

  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    setSidebarOpen(false);

    if (pathname === "/") {
      const target = document.querySelector(sectionId);
      if (target) {
        const yOffset = -80;
        const y =
          target.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    } else {
      router.push(`/${sectionId}`);
    }
  };

  useEffect(() => {
    if (pathname === "/" && window.location.hash) {
      setTimeout(() => {
        const target = document.querySelector(window.location.hash);
        if (target) {
          const yOffset = -80;
          const y =
            target.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    }
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed w-full top-0 z-50 transition-all duration-400 ease-in-out ${
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
            <div className="flex items-center font-light gap-4 lg:gap-6">
              <div
                className={`flex items-center gap-2 transition-colors duration-300 cursor-pointer ${
                  scrolled ? "hover:text-[#0201FF]" : "hover:text-white/80"
                }`}
              >
                <Phone className="w-4 h-4 transition-all duration-500" />
                <span className="transition-all duration-500 hidden xl:inline">
                  +62 31 848 4690/95
                </span>
              </div>
              <div
                className={`flex items-center gap-2 transition-colors duration-300 cursor-pointer ${
                  scrolled ? "hover:text-[#0201FF]" : "hover:text-white/80"
                }`}
              >
                <Mail className="w-4 h-4 transition-all duration-500" />
                <span className="transition-all duration-500 hidden xl:inline">
                  info@tqpartner.com
                </span>
              </div>
            </div>
            <div className="flex gap-2 sm:gap-3">
              <a
                href="https://www.facebook.com/totalquality.id/"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 border ${
                  scrolled
                    ? "border-gray-300 text-gray-600 hover:border-[#0201FF] hover:text-[#0201FF]"
                    : "border-white text-white hover:bg-gray-100 hover:text-[#0201FF]"
                }`}
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/pt-total-quality-indonesia/"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 border ${
                  scrolled
                    ? "border-gray-300 text-gray-600 hover:border-[#0201FF] hover:text-[#0201FF]"
                    : "border-white text-white hover:bg-gray-100 hover:text-[#0201FF]"
                }`}
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/totalquality.id/"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 border ${
                  scrolled
                    ? "border-gray-300 text-gray-600 hover:border-[#0201FF] hover:text-[#0201FF]"
                    : "border-white text-white hover:bg-gray-100 hover:text-[#0201FF]"
                }`}
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.twitter.com/totalquality_id"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 border ${
                  scrolled
                    ? "border-gray-300 text-gray-600 hover:border-[#0201FF] hover:text-[#0201FF]"
                    : "border-white text-white hover:bg-gray-100 hover:text-[#0201FF]"
                }`}
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Bottom Bar - Logo & Navigation */}
          <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            <Link href="/" className="flex items-center cursor-pointer">
              <Image
                src="/tq-logo.png"
                alt="Total Quality Logo"
                width={120}
                height={40}
                className={`h-8 sm:h-10 w-auto transition-all duration-700 ease-in-out hover:opacity-80 ${
                  scrolled ? "" : "brightness-0 invert"
                }`}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:block">
              <ul
                className={`flex items-center gap-4 xl:gap-8 font-light tracking-normal text-sm transition-all duration-700 ease-in-out ${
                  scrolled ? "text-black" : "text-white"
                }`}
              >
                <li>
                  <a
                    href="#about"
                    onClick={(e) => handleNavigation(e, "#about")}
                    className={`cursor-pointer transition-colors duration-300 relative group ${
                      scrolled ? "hover:text-[#0201FF]" : "hover:text-white/70"
                    }`}
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#service"
                    onClick={(e) => handleNavigation(e, "#service")}
                    className={`cursor-pointer transition-colors duration-300 relative group ${
                      scrolled ? "hover:text-[#0201FF]" : "hover:text-white/70"
                    }`}
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#event"
                    onClick={(e) => handleNavigation(e, "#event")}
                    className={`cursor-pointer transition-colors duration-300 relative group ${
                      scrolled ? "hover:text-[#0201FF]" : "hover:text-white/70"
                    }`}
                  >
                    Events
                  </a>
                </li>
                <li>
                  <a
                    href="#news"
                    onClick={(e) => handleNavigation(e, "#news")}
                    className={`cursor-pointer transition-colors duration-300 relative group ${
                      scrolled ? "hover:text-[#0201FF]" : "hover:text-white/70"
                    }`}
                  >
                    News
                  </a>
                </li>
                <li>
                  <a
                    href="#career"
                    onClick={(e) => handleNavigation(e, "#career")}
                    className={`cursor-pointer transition-colors duration-300 relative group ${
                      scrolled ? "hover:text-[#0201FF]" : "hover:text-white/70"
                    }`}
                  >
                    Career
                  </a>
                </li>
                <li>
                  <a
                    href="#forum"
                    onClick={(e) => handleNavigation(e, "#forum")}
                    className={`cursor-pointer transition-colors duration-300 relative group ${
                      scrolled ? "hover:text-[#0201FF]" : "hover:text-white/70"
                    }`}
                  >
                    Forum
                  </a>
                </li>
                <li>
                  {scrolled ? (
                    <a
                      href="#self-assessment"
                      onClick={(e) => handleNavigation(e, "#self-assessment")}
                      className="px-4 xl:px-6 py-2 xl:py-2.5 font-normal rounded-full cursor-pointer transition-all duration-700 ease-in-out hover: bg-transparent border border-gray-300 text-gray-600 hover:bg-white hover:text-[#0201FF] hover:border-[#0201FF]"
                    >
                      Self Assessment
                    </a>
                  ) : (
                    <a
                      href="#self-assessment"
                      onClick={(e) => handleNavigation(e, "#self-assessment")}
                      className="px-4 xl:px-6 py-2 xl:py-2.5 font-normal rounded-full cursor-pointer transition-all duration-700 ease-in-out border border-white text-white hover:bg-white hover:text-[#0201FF]"
                    >
                      Self Assessment
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
            <Link href="/" onClick={handleLinkClick}>
              <Image
                src="/tq-logo.png"
                alt="Total Quality Logo"
                width={120}
                height={40}
                className="h-8 w-auto cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Link>

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
                  onClick={(e) => handleNavigation(e, "#about")}
                  className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-[#0201FF] transition-all duration-300 font-light"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#service"
                  onClick={(e) => handleNavigation(e, "#service")}
                  className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-[#0201FF] transition-all duration-300 font-light"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#event"
                  onClick={(e) => handleNavigation(e, "#event")}
                  className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-[#0201FF] transition-all duration-300 font-light"
                >
                  Events
                </a>
              </li>
              <li>
                <a
                  href="#news"
                  onClick={(e) => handleNavigation(e, "#news")}
                  className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-[#0201FF] transition-all duration-300 font-light"
                >
                  News
                </a>
              </li>
              <li>
                <a
                  href="#career"
                  onClick={(e) => handleNavigation(e, "#career")}
                  className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-[#0201FF] transition-all duration-300 font-light"
                >
                  Career
                </a>
              </li>
              <li>
                <a
                  href="#forum"
                  onClick={(e) => handleNavigation(e, "#forum")}
                  className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-[#0201FF] transition-all duration-300 font-light"
                >
                  AOC Connect
                </a>
              </li>
              <li className="pt-2">
                <a
                  href="#self-assessment"
                  onClick={(e) => handleNavigation(e, "#self-assessment")}
                  className="block px-4 py-3 rounded-full bg-transparent border border-gray-300 text-gray-700 hover:bg-[#0201FF] hover:text-white hover:border-[#0201FF] transition-all duration-300 font-normal text-center"
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
                className="flex items-center gap-3 text-gray-600 hover:text-[#0201FF] transition-colors duration-300"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm font-light">+62 31 848 4690/95</span>
              </a>
              <a
                href="mailto:info@tqpartner.com"
                className="flex items-center gap-3 text-gray-600 hover:text-[#0201FF] transition-colors duration-300"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm font-light">info@tqpartner.com</span>
              </a>
            </div>

            <div className="flex gap-3 pt-2">
              <a
                href="https://www.facebook.com/totalquality.id/"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border border-gray-300 text-gray-600 hover:border-[#0201FF] hover:text-[#0201FF]"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/pt-total-quality-indonesia/"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border border-gray-300 text-gray-600 hover:border-[#0201FF] hover:text-[#0201FF]"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/totalquality.id/"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border border-gray-300 text-gray-600 hover:border-[#0201FF] hover:text-[#0201FF]"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.twitter.com/totalquality_id"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border border-gray-300 text-gray-600 hover:border-[#0201FF] hover:text-[#0201FF]"
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
