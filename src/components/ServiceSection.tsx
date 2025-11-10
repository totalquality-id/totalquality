"use client";

import { JSX, useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  Users,
  Settings,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Service {
  id: number;
  title: string;
  description: string;
  image?: string;
}

export default function ServiceSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        // Sort services by id in ascending order (oldest first)
        const sortedData = data.sort((a: Service, b: Service) => a.id - b.id);
        setServices(sortedData);
      })
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  const checkScrollability = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScrollability();
    window.addEventListener("resize", checkScrollability);
    return () => window.removeEventListener("resize", checkScrollability);
  }, [services]);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    const targetScroll =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });

    setTimeout(checkScrollability, 300);
  };

  interface StyleConfig {
    icon: JSX.Element;
    gradient: string;
    hoverBorder: string;
  }

  const styleMap: Record<string, StyleConfig> = {
    "Quality Empowerment System": {
      icon: <Users className="w-7 h-7 text-[#2B5589]" />,
      gradient: "from-[#2B5589]/5 to-white",
      hoverBorder: "hover:border-[#2B5589]/40",
    },
    "Quality Management System": {
      icon: <Settings className="w-7 h-7 text-[#FACC01]" />,
      gradient: "from-[#FACC01]/5 to-white",
      hoverBorder: "hover:border-[#FACC01]/40",
    },
    "Quality Improvement System": {
      icon: <TrendingUp className="w-7 h-7 text-[#2B5589]" />,
      gradient: "from-[#2B5589]/5 to-white",
      hoverBorder: "hover:border-[#2B5589]/40",
    },
  };

  // Tampilkan semua services untuk scrolling
  const displayedServices = services.filter((service) => service.id >= 1);

  return (
    <section
      id="service"
      className="relative py-16 sm:py-20 lg:py-24 bg-slate-50"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* Background elemen */}
      <div className="absolute top-1/4 right-10 w-64 h-64 bg-[#FACC01]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-10 w-72 h-72 bg-[#2B5589]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-base sm:text-2xl md:text-xl lg:text-2xl font-light tracking-tighter text-[#364153] mb-1">
            What We Offer
          </h2>
          <div className="w-full h-[1px] bg-gray-300 mb-8"></div>

          <div className="max-w-4xl">
            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter text-[#1a1a1a] leading-tight mb-4">
              Our <span className="text-[#0201FF] font-normal">Services</span>
            </h3>
          </div>
        </div>

        {/* Services Container with Navigation */}
        <div className="relative mb-12">
          {/* Navigation Buttons */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white border border-gray-200 hover:border-[#0201FF] hover:bg-[#0201FF] hover:text-white flex items-center justify-center transition-all duration-300 shadow-lg group"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 text-[#0201FF] group-hover:text-white transition-colors duration-300" />
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white border border-gray-200 hover:border-[#0201FF] hover:bg-[#0201FF] hover:text-white flex items-center justify-center transition-all duration-300 shadow-lg group"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 text-[#0201FF] group-hover:text-white transition-colors duration-300" />
            </button>
          )}

          {/* Scrollable Services Grid */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScrollability}
            className="overflow-x-auto scrollbar-hide scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <div className="flex gap-6 lg:gap-8 pb-4">
              {displayedServices.map((service) => {
                const style = styleMap[service.title] || {
                  icon: <Users className="w-7 h-7 text-[#2B5589]" />,
                  gradient: "from-gray-100 to-white",
                  hoverBorder: "hover:border-gray-200",
                };

                return (
                  <div
                    key={service.id}
                    className={`group relative p-8 lg:p-10 bg-gradient-to-br ${style.gradient} border border-gray-200 ${style.hoverBorder} hover:shadow-lg transition-all duration-500 overflow-hidden flex-shrink-0 w-[320px] sm:w-[380px] lg:w-[420px]`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative space-y-6">
                      <div className="flex items-start justify-between">
                        <div className="w-14 h-14 bg-white border border-gray-200 flex items-center justify-center group-hover:border-gray-300 transition-all duration-300">
                          {style.icon}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl lg:text-2xl font-light tracking-tight text-[#1a1a1a] mb-4 group-hover:text-[#2B5589] transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-sm lg:text-base text-[#364153] leading-relaxed font-light">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scroll Indicator Dots */}
          {/* {displayedServices.length > 3 && (
            <div className="flex justify-center gap-2 mt-6">
              {displayedServices.map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 rounded-full bg-gray-300 transition-all duration-300"
                />
              ))}
            </div>
          )} */}
        </div>

        {/* Tombol Explore */}
        <div className="mt-16 sm:mt-20 border-t border-gray-200 pt-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="max-w-xl">
              <p className="text-base sm:text-lg lg:text-xl font-light tracking-tight text-[#364153]">
                Ready to transform your organization? Let&apos;s discuss how our
                services can help you achieve excellence.
              </p>
            </div>

            <Link
              href="/services"
              className="group inline-flex items-center gap-3 bg-[#0201FF] text-white font-light px-8 py-4 hover:bg-[#0000d1] transition-all duration-300"
            >
              <span className="text-sm tracking-wide">
                Explore All Services
              </span>
              <svg
                className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
