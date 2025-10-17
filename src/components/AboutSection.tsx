"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
// import { Newsreader } from "next/font/google";

// const newsreader = Newsreader({
//   subsets: ["latin"],
//   weight: ["300", "600"],
// });

export default function AboutSection() {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

  const row1 = [...companyLogos, ...companyLogos];

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
      id="about-section"
      className="relative py-8 sm:py-10 lg:py-12 bg-white"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-12">
          <h2 className="text-base sm:text-2xl md:text-xl lg:text-2xl font-light tracking-tighter text-[#364153] mb-1">
            They chose us, and grew with us
          </h2>
          <div className="w-full h-[1px] bg-gray-300"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-16">
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
              to have inspired lasting change through motivation and culture.{" "}
              <Link
                href="/about"
                className="text-[#2B5589] underline underline-offset-4 decoration-2 hover:text-[#1E3F69] transition-colors duration-300 font-light"
              >
                Learn more
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 sm:mt-20 lg:mt-24">
        <h3 className="text-base sm:text-xl md:text lg:text-3xl font-light tracking-tighter text-[#364153] mb-2 text-center">
          Our Trusted Partners
        </h3>
      </div>

      <div className="w-full overflow-hidden py-8">
        <div className="space-y-6">
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

      <style jsx>{`
        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
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

        .animate-pop-up {
          animation: pop-up 3s ease-in-out infinite;
        }

        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
