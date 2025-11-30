"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  const displayedServices = services.filter((service) => service.id >= 1);

  return (
    <section
      id="service"
      className="relative py-16 sm:py-20 lg:py-24 overflow-hidden"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* Decorative Accent Elements - Subtle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top Left Accent */}
        <div className="absolute top-10 left-10 w-20 h-20 border border-[#0201FF]/10 rounded-full" />
        <div className="absolute top-14 left-14 w-12 h-12 border border-[#0201FF]/8 rounded-full" />

        {/* Top Right Accent */}
        <div className="absolute top-16 right-12 w-16 h-16 border border-[#FACC01]/10 rounded-lg rotate-45" />

        {/* Bottom Right Accent */}
        <div className="absolute bottom-16 right-20 w-18 h-18 border border-[#FACC01]/10 rounded-lg rotate-12" />
      </div>

      {/* Header with Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-8">
        <div className="flex items-center justify-between gap-4">
          {/* Left Side - Title and Link */}
          <div className="flex items-center gap-8">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-light tracking-tighter text-white">
              What We <span className="font-semibold">Offer</span>
            </h2>

            {/* Explore All Services Link */}
            <Link
              href="/services"
              className="hidden lg:inline-flex text-center items-center gap-2 text-white/80 hover:text-white transition-all duration-300 group"
            >
              <span className="text-xl font-medium">Explore All Services</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          {/* Right Side - Navigation Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`w-12 h-12 backdrop-blur-md bg-white/10 border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl group ${
                canScrollLeft
                  ? "hover:bg-white/20 cursor-pointer"
                  : "opacity-40 cursor-not-allowed"
              }`}
              aria-label="Scroll left"
            >
              <ChevronLeft
                className={`w-6 h-6 text-white transition-transform duration-300 ${
                  canScrollLeft ? "group-hover:-translate-x-0.5" : ""
                }`}
              />
            </button>

            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`w-12 h-12 backdrop-blur-md bg-white/10 border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl group ${
                canScrollRight
                  ? "hover:bg-white/20 cursor-pointer"
                  : "opacity-40 cursor-not-allowed"
              }`}
              aria-label="Scroll right"
            >
              <ChevronRight
                className={`w-6 h-6 text-white transition-transform duration-300 ${
                  canScrollRight ? "group-hover:translate-x-0.5" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Services Container - Full Width Overflow */}
      <div className="relative z-10 w-full mb-12">
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-4 lg:gap-4 pb-4 pr-[calc(1rem+6.75rem)] sm:pr-[calc(1.5rem+6.75rem)] lg:pr-[calc(2rem+6.75rem)]">
              {" "}
              {displayedServices.map((service) => (
                <div
                  key={service.id}
                  className="group relative flex-shrink-0 w-[260px] sm:w-[300px] lg:w-[310px] h-[450px] sm:h-[500px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    {service.image ? (
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 640px) 320px, (max-width: 1024px) 380px, 420px"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#2B5589] to-[#1a2942]" />
                    )}

                    {/* Sophisticated Multi-Layer Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-black/35 to-black/70" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Content Container */}
                  <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-6 lg:p-6">
                    {/* Title - Show by default, hide on hover */}
                    <h3 className="text-2xl sm:text-3xl lg:text-3xl font-normal tracking-tighter text-white leading-tighter mb-4 transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-4">
                      {service.title}
                    </h3>

                    {/* Description - Hidden by default, show on hover */}
                    <p className="text-sm sm:text-base text-white/90 leading-relaxed font-light absolute bottom-6 sm:bottom-8 lg:bottom-10 left-6 sm:left-6 lg:left-6 right-6 sm:right-8 lg:right-10 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                      {service.description}
                    </p>
                  </div>

                  {/* Glow Effect on Hover */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-[#0201FF]/20 -z-10" />
                </div>
              ))}
            </div>
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
