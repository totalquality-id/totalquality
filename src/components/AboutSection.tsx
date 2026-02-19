"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // const companyLogos = [
  //   { name: "Company 1", logo: "/images/copart/copart-1.jpg" },
  //   { name: "Company 2", logo: "/images/copart/copart-2.jpg" },
  //   { name: "Company 3", logo: "/images/copart/copart-3.jpg" },
  //   { name: "Company 4", logo: "/images/copart/copart-1.jpg" },
  //   { name: "Company 5", logo: "/images/copart/copart-2.jpg" },
  //   { name: "Company 6", logo: "/images/copart/copart-3.jpg" },
  //   { name: "Company 7", logo: "/images/copart/copart-1.jpg" },
  //   { name: "Company 8", logo: "/images/copart/copart-2.jpg" },
  //   { name: "Company 9", logo: "/images/copart/copart-3.jpg" },
  //   { name: "Company 10", logo: "/images/copart/copart-1.jpg" },
  //   { name: "Company 11", logo: "/images/copart/copart-2.jpg" },
  //   { name: "Company 12", logo: "/images/copart/copart-3.jpg" },
  // ];

  // const row1 = [...companyLogos, ...companyLogos];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 },
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
      const duration = 2500;
      const endValue = 430;
      let startTime: number | null = null;

      const easeOutQuart = (t: number): number => {
        return 1 - Math.pow(1 - t, 4);
      };

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easedProgress = easeOutQuart(progress);
        const currentCount = Math.floor(easedProgress * endValue);

        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(endValue);
        }
      };

      const animationId = requestAnimationFrame(animate);

      return () => cancelAnimationFrame(animationId);
    }
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-16 sm:py-20 lg:py-24 lg:pb-0 overflow-hidden"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* Subtle Overlay untuk Contrast dengan Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none" />

      {/* Decorative Accent Elements - Subtle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top Left Accent */}
        <div className="absolute top-10 left-10 w-20 h-20 border border-[#0201FF]/10 rounded-full" />
        <div className="absolute top-14 left-14 w-12 h-12 border border-[#0201FF]/8 rounded-full" />

        {/* Top Right Accent */}
        <div className="absolute top-16 right-12 w-16 h-16 border border-[#FACC01]/10 rounded-lg rotate-45" />
        <div className="absolute top-20 right-16 w-10 h-10 border border-[#FACC01]/8 rounded-lg rotate-45" />

        {/* Bottom Left Accent */}
        <div className="absolute bottom-20 left-16 w-14 h-14 border border-white/10 rounded-full" />

        {/* Bottom Right Accent */}
        <div className="absolute bottom-16 right-20 w-18 h-18 border border-[#FACC01]/10 rounded-lg rotate-12" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
        {/* Stats & Description Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-50 items-center mb-20 lg:mb-28 max-w-[1280px] mx-auto">
          {/* Left Side - Counter dengan Enhanced Visual */}
          <div className="text-center lg:text-left px-6 sm:px-10 lg:px-14">
            <div className="relative inline-block">
              {/* Main Counter */}
              <div className="text-center lg:text-left">
                <div
                  className={`text-[130px] sm:text-[130px] md:text-[210px] lg:text-[160px] xl:text-[220px] font-semibold leading-none text-white tracking-tight transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                >
                  {count}+
                </div>
                <p className="text-base sm:text-xl md:text-4xl font-normal tracking-tighter text-white mt-4 sm:mt-6">
                  Corporate
                  <span className="hidden lg:inline">
                    <br />
                  </span>{" "}
                  Partners
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Description dengan Glass Card */}
          <div className="flex items-center px-6 sm:px-10 lg:px-0">
            <div
              className={`backdrop-blur-md bg-white/10 p-8 sm:p-10 rounded-2xl border border-white/20 shadow-2xl transition-all duration-700 delay-300 w-full ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light tracking-tight text-white leading-relaxed">
                Setiap kemitraan adalah sebuah perjalanan menuju{" "}
                <span className="font-semibold tracking-normal">
                  pertumbuhan
                </span>{" "}
                dan{" "}
                <span className="font-semibold tracking-normal">
                  transformasi
                </span>
                . Melayani lebih dari 430 perusahaan, kami bangga dapat
                menciptakan perubahan nyata yang berdampak panjang melalui
                penguatan motivasi dan budaya kerja.
              </p>

              {/* CTA Link dengan Enhanced Style */}
              <Link
                href="/about"
                className="inline-flex items-center gap-2 mt-6 text-xl font-medium text-white hover:text-[#FACC01] transition-all duration-300 group"
              >
                <span className="relative">
                  Selengkapnya
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FACC01] group-hover:w-full transition-all duration-300" />
                </span>
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
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-16 sm:mt-20 lg:mt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          {/* <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal tracking-tight text-white">
            Our Trusted Partners
          </h3> */}
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal tracking-tight text-white">
            Our Partner Distribution
          </h3>
        </div>

        {/* Partner Distribution Map/Image */}
        <div className="max-w-8xl mx-auto">
          {/* Image Container */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] lg:aspect-[24/9]">
            <Image
              src="/client-maps.png"
              alt="Partner Distribution Map"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1280px"
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Client Testimonials */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="text-center mb-12">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal tracking-tight text-white mb-2">
              What Our Partners Say
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Testimonial Card 1 */}
            <div className="backdrop-blur-md bg-white/10 p-8 rounded-2xl border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 relative rounded-full overflow-hidden border-2 border-white/30 flex-shrink-0">
                  <Image
                    src="/images/testimonials/hermanto-tanoko.png"
                    alt="Hermanto Tanoko"
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-normal text-white">
                    Hermanto Tanoko
                  </h4>
                  <p className="text-sm text-white/80 font-light">Owner</p>
                  <p className="text-sm text-white/60 font-light">
                    Tancorp Group
                  </p>
                </div>
              </div>
              <div className="w-8 h-1 bg-[#FACC01] mb-4"></div>
              <p className="text-white/90 leading-relaxed mb-4 font-light text-sm sm:text-base">
                Total Quality membantu kami membangun superteam, bukan sekadar
                superstar. Kekuatan sejati dari dalam memastikan seluruh tim
                bergerak selaras untuk mencapai pertumbuhan berkelanjutan dan
                kemenangan organisasi yang nyata.
              </p>
              {/* <div className="flex text-[#FACC01]">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div> */}
            </div>

            {/* Testimonial Card 2 */}
            <div className="backdrop-blur-md bg-white/10 p-8 rounded-2xl border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 relative rounded-full overflow-hidden border-2 border-white/30 flex-shrink-0">
                  <Image
                    src="/images/testimonials/rio-haryanto.png"
                    alt="Rio Haryanto"
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-normal text-white">
                    Rio Haryanto
                  </h4>
                  <p className="text-sm text-white/80 font-light">Director</p>
                  <p className="text-sm text-white/60 font-light">
                    PT Solo Murni
                  </p>
                </div>
              </div>
              <div className="w-8 h-1 bg-[#FACC01] mb-4"></div>
              <p className="text-white/90 leading-relaxed mb-4 font-light text-sm sm:text-base">
                Bersama Total Quality, kami mengubah data menjadi aksi nyata
                melalui komunikasi positif. Mereka membimbing pemimpin kami
                untuk menggerakkan tim agar berubah dengan cepat, antusias, dan
                penuh tanggung jawab.
              </p>
              {/* <div className="flex text-[#FACC01]">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div> */}
            </div>

            {/* Testimonial Card 3 */}
            <div className="backdrop-blur-md bg-white/10 p-8 rounded-2xl border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 relative rounded-full overflow-hidden border-2 border-white/30 flex-shrink-0">
                  <Image
                    src="/images/testimonials/andry-sumampouw.png"
                    alt="Andry Sumampow"
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-normal text-white">
                    Andry Sumampow
                  </h4>
                  <p className="text-sm text-white/80 font-light">Owner</p>
                  <p className="text-sm text-white/60 font-light">
                    Jerapah Group
                  </p>
                </div>
              </div>
              <div className="w-8 h-1 bg-[#FACC01] mb-4"></div>
              <p className="text-white/90 leading-relaxed mb-4 font-light text-sm sm:text-base">
                Total Quality adalah &apos;bahan bakar&apos; yang menghidupkan
                moral dan motivasi organisasi kami. Sistem penguatan energi
                mereka memberikan tenaga baru bagi tim untuk melaju lebih jauh
                dan bertahan lebih lama.
              </p>
              {/* <div className="flex text-[#FACC01]">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div> */}
            </div>
          </div>
        </div>

        {/* <div className="w-full overflow-hidden py-4">
          <div className="relative">
            <div className="flex gap-8 animate-scroll-right">
              {row1.map((company, index) => (
                <div
                  key={`row1-${index}`}
                  className={`flex-shrink-0 w-40 h-40 relative group ${
                    index % 5 === 0 || index % 7 === 0 ? "animate-pop-up" : ""
                  }`}
                  style={{
                    animationDelay: `${(index % 5) * 0.8}s`,
                  }}
                >
                  <div className="absolute inset-0 backdrop-blur-sm bg-white/10 rounded-xl border border-white/20 shadow-xl group-hover:shadow-2xl group-hover:bg-white/20 transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>
                    <div className="relative w-full h-full p-4 group-hover:scale-105 transition-transform duration-300">
                      <Image
                        src={company.logo}
                        alt={company.name}
                        fill
                        sizes="160px"
                        className="object-contain"
                        // style={{ filter: "brightness(0) invert(1)" }}
                      />
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-[#0201FF]/20 -z-10" />
                </div>
              ))}
            </div>
          </div>
        </div> */}

        {/* <div className="w-full overflow-hidden py-4">
          <div className="relative">
            <div className="flex gap-8 animate-scroll-right">
              {row1.map((company, index) => (
                <div
                  key={`row1-${index}`}
                  className={`flex-shrink-0 w-40 h-40 relative group ${
                    index % 5 === 0 || index % 7 === 0 ? "animate-pop-up" : ""
                  }`}
                  style={{
                    animationDelay: `${(index % 5) * 0.8}s`,
                  }}
                >
                  <div className="absolute inset-0 backdrop-blur-sm bg-white/10 rounded-xl border border-white/20 shadow-xl group-hover:shadow-2xl group-hover:bg-white/20 transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>
                    <div className="relative w-full h-full p-4 group-hover:scale-105 transition-transform duration-300">
                      <Image
                        src={company.logo}
                        alt={company.name}
                        fill
                        sizes="160px"
                        className="object-contain"
                        // style={{ filter: "brightness(0) invert(1)" }}
                      />
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-[#0201FF]/20 -z-10" />
                </div>
              ))}
            </div>
          </div>
        </div> */}
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
            transform: scale(1) translateY(0);
          }
          50% {
            transform: scale(1.08) translateY(-4px);
          }
        }

        .animate-scroll-right {
          animation: scroll-right 50s linear infinite;
        }

        .animate-pop-up {
          animation: pop-up 4s ease-in-out infinite;
        }

        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
