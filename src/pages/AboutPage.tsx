"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Newsreader } from "next/font/google";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["300", "600"],
});

export default function AboutPage() {
  const [activeYear, setActiveYear] = useState(0);
  const [isTimelineVisible, setIsTimelineVisible] = useState(false);
  const timelineRef = useRef(null);

  const timelineData = [
    {
      year: "2005",
      title: "The Beginning",
      description:
        "Total Quality Indonesia was founded by Johan Yan with a vision to transform organizational culture across Southeast Asia through motivation and excellence.",
      image: "/images/timeline/1.jpg",
    },
    {
      year: "2006",
      title: "Expansion Through New Branch Offices",
      description:
        "In 2006, Total Quality expanded its reach by opening new branch offices in Jakarta and Singapore, strengthening its presence in Southeast Asia.",
      image: "/images/timeline/2.jpg",
    },
    {
      year: "2007",
      title: "The 1st Annual National Empowerment Congress (ANEC)",
      description:
        "Total Quality successfully held Indonesia’s largest motivational congress, engaging hundreds of company directors and thousands of managers nationwide.",
      image: "/images/timeline/3.jpg",
    },
    {
      year: "2008",
      title: "Breaking Records at the 2nd ANEC",
      description:
        "The 2nd Annual National Empowerment Congress (ANEC) achieved remarkable milestones by breaking six MURI (Indonesian World Records Museum) records. The event gathered 486 Directors and 4,073 Managers, earning recognition as the largest motivational congress in Southeast Asia.",
      image: "/images/timeline/4.jpg",
    },
    {
      year: "2012",
      title: "Royal Recognition for Cultural Preservation",
      description:
        "Johan Yan, President Director of Total Quality, received the honorary title “Prince” from Pakubowono XIII of the Surakarta Sunanate in recognition of his significant contribution to preserving Indonesia’s cultural heritage.",
      image: "/images/timeline/5.jpg",
    },
    {
      year: "2013",
      title: "Among Indonesia’s 10 Most Influential Young Leaders",
      description:
        "In 2013, Johan Yan was honored as one of Indonesia’s 10 Most Influential Young Leaders in Culture by the United Nations-affiliated youth organization, JCI (Junior Chamber International).",
      image: "/images/timeline/6.jpg",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTimelineVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => {
      if (timelineRef.current) {
        observer.unobserve(timelineRef.current);
      }
    };
  }, []);

  return (
    <div
      className="bg-white"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* Hero Section */}
      <section className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-[#0201FF] to-[#0000d1] text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FACC01]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter leading-10 sm:leading-12  md:leading-16 lg:leading-18 mb-6 mt-16">
              About <span className="text-[#FACC01] font-normal">Us</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl font-light text-white/90 leading-tight max-w-3xl">
              Inspiring excellence and transforming organizations for over two
              decades
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center mb-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#0201FF] mb-4">
              Our Leadership
            </h2>
            <div className="w-24 h-1 bg-[#FACC01] mx-auto" />
          </div>
          <p className="text-center text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mt-6">
            Led by visionary leaders committed to organizational excellence
          </p>
        </div>

        {/* Direktur Utama */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 shadow-2xl">
            <div className="relative h-[400px] lg:h-[500px]">
              <Image
                src="https://images.squarespace-cdn.com/content/v1/5521b031e4b06ebe90178744/1578614550199-VA0TPUX88IDO9OUKBO3J/YT_19_03.jpg?format=1000w"
                alt="CEO Testimonial"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FACC01] rounded-full">
                    <span className="text-[#2B5589] font-bold text-xs uppercase tracking-normal">
                      Direktur Utama
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-light text-white mb-1 tracking-tighter">
                      Johan Yan
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#0201FF] p-12 lg:p-16 flex items-center">
              <div className="text-white">
                <div
                  className={`text-7xl mb-2 font-bold text-[#1E3F69] ${newsreader.className}`}
                >
                  &ldquo;
                </div>
                <p
                  className={`text-xl lg:text-xl font-normal leading-7 mb-10 tracking-normal ${newsreader.className}`}
                >
                  For more than 20 years, we&apos;ve partnered with
                  organizations across Southeast Asia to inspire people,
                  strengthen culture, and drive meaningful change.
                </p>
                <p
                  className={`text-xl lg:text-xl font-normal leading-7 mb-10 tracking-normal ${newsreader.className}`}
                >
                  Total Quality Indonesia continues to shape workplaces where
                  motivation and growth thrive together.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Direktur */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 shadow-2xl">
            <div className="bg-gradient-to-br from-[#FACC01] to-[#F5B800] p-12 lg:p-16 flex items-center">
              <div className="text-[#2B5589]">
                <div
                  className={`text-7xl mb-2 font-bold text-[#2B5589]/20 ${newsreader.className}`}
                >
                  &ldquo;
                </div>
                <p
                  className={`text-xl lg:text-xl font-normal leading-7 mb-10 tracking-normal ${newsreader.className}`}
                >
                  Through strategic innovation and unwavering commitment, we
                  transform challenges into opportunities for sustainable growth
                  and excellence.
                </p>
                <p
                  className={`text-xl lg:text-xl font-normal leading-7 mb-10 tracking-normal ${newsreader.className}`}
                >
                  Together, we build resilient organization ready for the
                  future.
                </p>
              </div>
            </div>

            <div className="relative h-[400px] lg:h-[500px]">
              <Image
                src="https://img.freepik.com/free-photo/portrait-confident-young-businessman-with-his-arms-crossed_23-2148176206.jpg?semt=ais_hybrid&w=740&q=80"
                alt="Director"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute top-0 left-0 right-0 p-8 sm:p-10">
                <div className="space-y-2">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-light text-white mb-1 tracking-tighter">
                      Yusuf Adi Pura
                    </h3>
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0201FF] rounded-full">
                    <span className="text-white font-normal text-xs uppercase tracking-normal">
                      Direktur
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#0201FF] mb-4">
              Our Journey
            </h2>
            <div className="w-24 h-1 bg-[#FACC01] mx-auto" />
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mt-6">
              Two decades of transformation, innovation, and excellence
            </p>
          </div>

          {/* Timeline Navigation */}
          <div className="flex justify-center mb-12 overflow-x-auto pb-4">
            <div className="inline-flex gap-4 px-4">
              {timelineData.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setActiveYear(index)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap ${
                    activeYear === index
                      ? "bg-[#0201FF] text-white shadow-lg"
                      : "bg-white text-[#0201FF] hover:bg-gray-100 border-2 border-[#0201FF]"
                  }`}
                >
                  {item.year}
                </button>
              ))}
            </div>
          </div>

          {/* Timeline Content */}
          <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Image */}
              <div
                className={`relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-2xl transition-all duration-700 ${
                  isTimelineVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }`}
              >
                <Image
                  src={timelineData[activeYear].image}
                  alt={timelineData[activeYear].title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="inline-block px-4 py-2 bg-[#FACC01] text-[#2B5589] font-bold text-2xl rounded">
                    {timelineData[activeYear].year}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div
                className={`transition-all duration-700 delay-200 ${
                  isTimelineVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
                }`}
              >
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#0201FF] mb-6 tracking-tight">
                  {timelineData[activeYear].title}
                </h3>
                <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                  {timelineData[activeYear].description}
                </p>

                {/* Progress Indicator */}
                <div className="mt-8">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-semibold text-[#2B5589]">
                      {activeYear + 1} of {timelineData.length}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#2B5589] to-[#FACC01] transition-all duration-500"
                      style={{
                        width: `${
                          ((activeYear + 1) / timelineData.length) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>

                {/* Navigation Arrows */}
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setActiveYear(Math.max(0, activeYear - 1))}
                    disabled={activeYear === 0}
                    className="px-6 py-3 bg-white border-2 border-[#0201FF] text-[#0201FF] rounded-full font-semibold hover:bg-[#0201FF] hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={() =>
                      setActiveYear(
                        Math.min(timelineData.length - 1, activeYear + 1)
                      )
                    }
                    disabled={activeYear === timelineData.length - 1}
                    className="px-6 py-3 bg-[#0201FF] text-white rounded-full font-semibold hover:bg-[#0000d1] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Visual Line */}
          <div className="mt-20 relative">
            <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-300 -translate-y-1/2" />
            <div className="relative flex justify-between items-center">
              {timelineData.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setActiveYear(index)}
                  className="relative z-10 group"
                >
                  <div
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      index <= activeYear
                        ? "bg-[#FACC01] scale-150"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                  <span
                    className={`absolute top-8 left-1/2 -translate-x-1/2 text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                      index <= activeYear ? "text-[#2B5589]" : "text-gray-400"
                    }`}
                  >
                    {item.year}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
