"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function AboutSection() {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Logo perusahaan - ganti dengan logo asli Anda
  const companyLogos = [
    { name: "Company 1", logo: "/images/copart/copart-1.jpg" },
    { name: "Company 2", logo: "/images/copart/copart-2.jpg" },
    { name: "Company 3", logo: "/images/copart/copart-3.jpg" },
    { name: "Company 4", logo: "/images/copart/copart-1.jpg" },
    { name: "Company 5", logo: "/images/copart/copart-2.jpg" },
    { name: "Company 6", logo: "/images/copart/copart-3.jpg" },
    { name: "Company 7", logo: "/images/copart/copart-1.jpg" },
    { name: "Company 8", logo: "/images/copart/copart-2.jpg" },
    { name: "Company 9", logo: "/images/copart/copart-3.jpg" },
    { name: "Company 10", logo: "/images/copart/copart-1.jpg" },
    { name: "Company 11", logo: "/images/copart/copart-2.jpg" },
    { name: "Company 12", logo: "/images/copart/copart-3.jpg" },
  ];

  // Duplikasi untuk infinite scroll
  const row1 = [...companyLogos, ...companyLogos];
  const row2 = [
    ...companyLogos.slice(4),
    ...companyLogos.slice(0, 4),
    ...companyLogos.slice(4),
    ...companyLogos.slice(0, 4),
  ];
  const row3 = [
    ...companyLogos.slice(2),
    ...companyLogos.slice(0, 2),
    ...companyLogos.slice(2),
    ...companyLogos.slice(0, 2),
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const currentSection = sectionRef.current;

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
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
        <div className="mb-8 sm:mb-12">
          <h2 className="text-base sm:text-2xl md:text-xl lg:text-2xl font-normal tracking-tighter text-[#364153] mb-1">
            They chose us, and grew with us
          </h2>
          <div className="w-full h-[1px] bg-gray-300"></div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-16">
          {/* Left - Statistics */}
          <div className="text-center lg:text-left">
            <div
              className={`text-8xl sm:text-8xl md:text-9xl lg:text-[140px] xl:text-[160px] font-medium leading-none text-[#2B5589] tracking-tight transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {count}+
            </div>
            <p className="text-base sm:text-xl md:text-2xl font-light tracking-tighter text-[#1a1a1a] mt-4 sm:mt-6">
              Companies
              <span className="hidden lg:inline">
                <br />
              </span>{" "}
              Served
            </p>
          </div>

          {/* Right - Description */}
          <div className="flex items-center">
            <p
              className={`text-base sm:text-xl md:text-xl lg:text-3xl font-light tracking-tighter text-[#1a1a1a] leading-relaxed transition-all duration-700 delay-300 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              Behind every partnership lies a journey of growth and
              transformation. With over 400 companies served, we&apos;re proud
              to have inspired lasting change through motivation and culture.
            </p>
          </div>
        </div>
      </div>

      {/* Logo Carousel Section */}
      <div className="w-full overflow-hidden py-8">
        <div className="space-y-6">
          {/* Scroll Right */}
          <div className="relative">
            <div className="flex gap-6 animate-scroll-right">
              {row1.map((company, index) => (
                <div
                  key={`row1-${index}`}
                  className={`flex-shrink-0 w-36 h-36 relative shadow-lg hover:shadow-md transition-all duration-300 hover:scale-105 overflow-hidden ${
                    index % 5 === 0 || index % 7 === 0 ? "animate-pop-up" : ""
                  }`}
                  style={{
                    animationDelay: `${(index % 5) * 0.8}s`,
                  }}
                >
                  {/* Subtle border overlay */}
                  <div className="absolute inset-0 border border-gray-200/50 pointer-events-none z-10" />
                  <Image
                    src={company.logo}
                    alt={company.name}
                    fill
                    sizes="128px"
                    className="object-cover p-3"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Left */}
          <div className="relative">
            <div className="flex gap-6 animate-scroll-left">
              {row2.map((company, index) => (
                <div
                  key={`row2-${index}`}
                  className={`flex-shrink-0 w-36 h-36 relative shadow-lg hover:shadow-md transition-all duration-300 hover:scale-105 overflow-hidden ${
                    index % 6 === 0 || index % 8 === 0 ? "animate-pop-up" : ""
                  }`}
                  style={{
                    animationDelay: `${(index % 6) * 0.9}s`,
                  }}
                >
                  <div className="absolute inset-0 border border-gray-200/50 pointer-events-none z-10" />
                  <Image
                    src={company.logo}
                    alt={company.name}
                    fill
                    sizes="128px"
                    className="object-cover p-3"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Right */}
          <div className="relative">
            <div className="flex gap-6 animate-scroll-right-slow">
              {row3.map((company, index) => (
                <div
                  key={`row3-${index}`}
                  className={`flex-shrink-0 w-36 h-36 relative shadow-lg hover:shadow-md transition-all duration-300 hover:scale-105 overflow-hidden ${
                    index % 4 === 0 || index % 9 === 0 ? "animate-pop-up" : ""
                  }`}
                  style={{
                    animationDelay: `${(index % 4) * 1}s`,
                  }}
                >
                  <div className="absolute inset-0 border border-gray-200/50 pointer-events-none z-10" />
                  <Image
                    src={company.logo}
                    alt={company.name}
                    fill
                    sizes="128px"
                    className="object-cover p-3"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left - Image */}
          <div className="relative h-[400px] lg:h-[500px]">
            <Image
              src="/johan-yan.jpg"
              alt="CEO Testimonial"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Right - Quote */}
          <div className="bg-[#2B5589] p-12 lg:p-16 flex items-center">
            <div className="text-white">
              <div className="text-6xl mb-6 font-serif">&ldquo;</div>
              <p className="text-lg lg:text-xl font-light leading-relaxed mb-6 tracking-tight">
                For more than 20 years, we've partnered with organizations
                across Southeast Asia to inspire people, strengthen culture, and
                drive meaningful change.
              </p>
              <p className="text-lg lg:text-xl font-light leading-relaxed tracking-tight">
                Total Quality Indonesia continues to shape workplaces where
                motivation and growth thrive together.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes pop-up {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        .animate-scroll-right {
          animation: scroll-right 40s linear infinite;
        }

        .animate-scroll-right-slow {
          animation: scroll-right 50s linear infinite;
        }

        .animate-scroll-left {
          animation: scroll-left 45s linear infinite;
        }

        .animate-pop-up {
          animation: pop-up 3s ease-in-out infinite;
        }

        .animate-scroll-right:hover,
        .animate-scroll-left:hover,
        .animate-scroll-right-slow:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
