"use client";

import { useState, useEffect, useRef } from "react";

export default function AboutSection() {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const steps = 60;
      const increment = 400 / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= 400) {
          setCount(400);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      id="partnership"
      className="relative py-16 sm:py-20 lg:py-24 bg-white"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-[#1a1a1a] mb-4">
            They chose us, and grew with us
          </h2>
          <div className="w-full h-[1px] bg-gray-300"></div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left - Statistics */}
          <div className="text-center lg:text-left">
            <div
              className={`text-7xl sm:text-8xl md:text-9xl lg:text-[140px] xl:text-[160px] font-medium leading-none text-[#2B5589] tracking-tight transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {count}+
            </div>
            <p className="text-lg sm:text-xl md:text-2xl font-light tracking-tight text-[#1a1a1a] mt-4 sm:mt-6">
              Companies
              <br />
              Served
            </p>
          </div>

          {/* Right - Description */}
          <div className="flex items-center">
            <p
              className={`text-base sm:text-lg md:text-xl lg:text-2xl font-light tracking-tight text-[#1a1a1a] leading-relaxed transition-all duration-700 delay-300 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              Behind every partnership lies a journey of growth and
              transformation. With over 400 companies served, we're proud to
              have inspired lasting change through motivation and culture.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
