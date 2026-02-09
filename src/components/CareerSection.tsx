"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Calendar,
  ArrowRight,
  Briefcase,
} from "lucide-react";

interface Career {
  id: number;
  title: string;
  description: string;
  requirements: string;
  location: string;
  _count: {
    applicants: number;
  };
}

export default function CareerSection() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const res = await fetch("/api/careers");
        const data = await res.json();
        setCareers(data);
      } catch (err) {
        console.error("Failed to fetch careers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCareers();
  }, []);

  const handleSeeOpportunities = () => {
    window.location.href = "/career";
  };

  return (
    <section
      id="career"
      className="relative w-full min-h-screen overflow-hidden"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://img.freepik.com/free-photo/hr-representatives-positively-greeting-female-job-candidate_1163-4702.jpg?t=st=1763294266~exp=1763297866~hmac=7ab1936330ce265b8825e3783140cd959ebd4116b83f601539989b15564e13ce&w=2000"
          alt="Team collaboration"
          fill
          className="w-full h-full object-cover"
        />

        {/* Multi-Layer Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/1- via-black/30 to-black" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-black/35 to-black/70" />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" /> */}
      </div>

      {/* Content Container - CENTERED */}
      <div className="relative z-10 h-full min-h-screen flex items-center justify-center px-4 sm:px-8 lg:px-16">
        <div className="max-w-6xl text-center">
          {/* Main Title */}
          <h2 className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-white leading-tighter mb-4 sm:mb-6">
            Build Your Career
            <br />
            <span className="text-[#FACC01]">With Us</span>
          </h2>

          {/* Description */}
          <p className="text-lg sm:text-xl lg:text-2xl text-white/90 leading-tight font-light max-w-2xl mx-auto mb-4 sm:mb-8">
            Join our team and grow together. Explore opportunities that match
            your passion and expertise.
          </p>

          {/* Stats - Minimal */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-4 sm:gap-8 mb-10 sm:mb-12">
            <div className="flex items-center justify-center gap-3">
              <Calendar className="w-5 h-5 text-[#FACC01] flex-shrink-0" />
              <p className="text-sm sm:text-base text-white/90 font-light">
                20+ Years Excellence
              </p>
            </div>

            <div className="flex items-center justify-center gap-3">
              <Briefcase className="w-5 h-5 text-[#FACC01] flex-shrink-0" />
              <p className="text-sm sm:text-base text-white/90 font-light">
                {loading ? "Loading..." : `${careers.length}+ Open Positions`}
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSeeOpportunities}
              className="group inline-flex items-center justify-center gap-3 bg-[#FACC01] text-[#1a2942] font-medium px-8 py-4 hover:bg-[#ffd700] transition-all duration-300 shadow-2xl shadow-[#FACC01]/30 hover:shadow-[#FACC01]/50 hover:scale-105"
            >
              <span className="text-base tracking-wide">See Opportunities</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-10 w-64 h-64 bg-[#FACC01]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-72 h-72 bg-[#0201FF]/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
