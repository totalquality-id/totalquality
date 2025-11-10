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

      {/* About Company Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#0201FF] mb-4">
              About Us
            </h2>
            <div className="w-24 h-1 bg-[#FACC01] mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Established in{" "}
                <span className="font-semibold text-[#0201FF]">2005</span>, PT
                Total Quality Indonesia has been a trusted partner for
                organizational development across Southeast Asia. With over{" "}
                <span className="font-semibold text-[#0201FF]">
                  406 partner organizations
                </span>{" "}
                spanning multiple industry sectors, we specialize in human
                resource development and management system implementation.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Operating from our offices in{" "}
                <span className="font-semibold text-[#0201FF]">Jakarta</span>{" "}
                and{" "}
                <span className="font-semibold text-[#0201FF]">Surabaya</span>,
                we deliver comprehensive solutions that drive sustainable growth
                and organizational excellence.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#0201FF] to-[#0000d1] p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-light text-white mb-6">
                Our Approach
              </h3>
              <p className="text-white/90 leading-relaxed mb-6">
                Our{" "}
                <span className="font-semibold text-[#FACC01]">
                  Quality Empowerment System
                </span>{" "}
                delivers professional training and continuous guidance over a
                4-month period, utilizing unique methodologies specifically
                developed to address your organization's needs in enhancing
                human resource quality and achieving organizational targets.
              </p>
              <p className="text-white/90 leading-relaxed">
                We focus on building a positive{" "}
                <span className="font-semibold text-[#FACC01]">
                  corporate culture
                </span>{" "}
                and developing{" "}
                <span className="font-semibold text-[#FACC01]">
                  agents of change
                </span>{" "}
                who serve as catalysts for positive transformation, ensuring
                your organization becomes more productive, effective, and
                capable of achieving its vision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 bg-gray-50">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 shadow-2xl rounded-2xl overflow-hidden">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 shadow-2xl rounded-2xl overflow-hidden">
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

      {/* Company Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#0201FF] mb-4">
              Our Core Values
            </h2>
            <div className="w-24 h-1 bg-[#FACC01] mx-auto" />
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mt-6">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Trustworthy */}
            <div className="group relative bg-gradient-to-br from-[#0201FF] to-[#0000d1] p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FACC01]/10 rounded-full blur-2xl" />
              <div className="relative">
                <div className="w-16 h-16 bg-[#FACC01] rounded-full flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-[#0201FF]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Trustworthy
                </h3>
                <p className="text-white/90 leading-relaxed">
                  We believe trust is the cornerstone of Total Quality. Our
                  relationships with stakeholders and the bond between
                  organizations and employees must be built on mutual trust and
                  unwavering commitment to maintaining that trust with the
                  highest integrity.
                </p>
              </div>
            </div>

            {/* Contribution */}
            <div className="group relative bg-gradient-to-br from-[#FACC01] to-[#F5B800] p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <div className="relative">
                <div className="w-16 h-16 bg-[#0201FF] rounded-full flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-[#0201FF] mb-4">
                  Contribution
                </h3>
                <p className="text-[#2B5589] leading-relaxed">
                  Guided by the principle "it is better to give than to
                  receive," we measure all performance, achievements, and
                  recognition by the meaningful contributions made to the
                  organization. Every action should add value and drive
                  collective success.
                </p>
              </div>
            </div>

            {/* Partnership */}
            <div className="group relative bg-gradient-to-br from-[#2B5589] to-[#1E3F69] p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FACC01]/10 rounded-full blur-2xl" />
              <div className="relative">
                <div className="w-16 h-16 bg-[#FACC01] rounded-full flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-[#0201FF]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Partnership
                </h3>
                <p className="text-white/90 leading-relaxed">
                  We view our employees as family and trusted colleagues who
                  support, strengthen, and complement each other while
                  maintaining professional excellence. Our clients are valued
                  partners with whom we build enduring, long-term relationships.
                </p>
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

      {/* Client Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#0201FF] mb-4">
              What Our Clients Say
            </h2>
            <div className="w-24 h-1 bg-[#FACC01] mx-auto" />
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mt-6">
              Trusted by industry leaders across Southeast Asia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial Card 1 */}
            <div className="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#0201FF] to-[#0000d1] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  A
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-[#0201FF]">
                    [Client Name]
                  </h4>
                  <p className="text-sm text-gray-600">[Position]</p>
                  <p className="text-sm text-gray-500">[Company Name]</p>
                </div>
              </div>
              <div
                className={`text-5xl text-[#FACC01] mb-4 ${newsreader.className}`}
              >
                &ldquo;
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                [Testimonial content will be added here. This space is reserved
                for client feedback about their experience with Total Quality
                Indonesia.]
              </p>
              <div className="flex text-[#FACC01]">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Testimonial Card 2 */}
            <div className="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#FACC01] to-[#F5B800] rounded-full flex items-center justify-center text-[#0201FF] text-2xl font-bold">
                  B
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-[#0201FF]">
                    [Client Name]
                  </h4>
                  <p className="text-sm text-gray-600">[Position]</p>
                  <p className="text-sm text-gray-500">[Company Name]</p>
                </div>
              </div>
              <div
                className={`text-5xl text-[#FACC01] mb-4 ${newsreader.className}`}
              >
                &ldquo;
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                [Testimonial content will be added here. This space is reserved
                for client feedback about their experience with Total Quality
                Indonesia.]
              </p>
              <div className="flex text-[#FACC01]">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Testimonial Card 3 */}
            <div className="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#2B5589] to-[#1E3F69] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  C
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-[#0201FF]">
                    [Client Name]
                  </h4>
                  <p className="text-sm text-gray-600">[Position]</p>
                  <p className="text-sm text-gray-500">[Company Name]</p>
                </div>
              </div>
              <div
                className={`text-5xl text-[#FACC01] mb-4 ${newsreader.className}`}
              >
                &ldquo;
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                [Testimonial content will be added here. This space is reserved
                for client feedback about their experience with Total Quality
                Indonesia.]
              </p>
              <div className="flex text-[#FACC01]">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
