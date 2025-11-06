"use client";

import { useEffect, useState } from "react";
import { Calendar, MapPin, ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import UserProfileSection from "@/components/UserProfileSection";
import AuthModal from "@/components/AuthModal";

interface Career {
  id: number;
  title: string;
  description: string;
  requirements: string;
  location: string;
  createdAt: string;
  _count: {
    applicants: number;
  };
}

export default function CareerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [career, setCareer] = useState<Career | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const fetchCareer = async () => {
      try {
        if (!params?.id) {
          setError(true);
          setLoading(false);
          return;
        }

        const res = await fetch(`/api/careers/${params.id}`);
        if (!res.ok) {
          setError(true);
          return;
        }
        const data = await res.json();
        setCareer(data);
      } catch (err) {
        console.error("Error fetching career:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCareer();
  }, [params]);

  const handleApply = async () => {
    if (!career) return;

    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (!token || !userStr) {
      setShowAuthModal(true);
      return;
    }

    window.location.href = `/career/${career.id}/apply`;
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    handleApply();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div
        className="min-h-screen bg-white flex items-center justify-center"
        style={{ fontFamily: "Inter, system-ui, sans-serif" }}
      >
        <p className="text-[#364153] font-light text-lg">Loading career...</p>
      </div>
    );
  }

  if (error || !career) {
    return (
      <div
        className="min-h-screen bg-white flex items-center justify-center"
        style={{ fontFamily: "Inter, system-ui, sans-serif" }}
      >
        <div className="text-center space-y-6 px-4">
          <h2 className="text-3xl font-light text-[#1a1a1a]">
            Career Not Found
          </h2>
          <p className="text-[#364153] font-light">
            The career opportunity you&apos;re looking for doesn&apos;t exist or
            has been closed.
          </p>
          <a
            href="/career"
            className="inline-flex items-center gap-2 text-[#2B5589] font-light hover:text-[#1E3F69] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Careers</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* Hero Section */}
      <section className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-[#0201FF] to-[#0000d1] text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FACC01]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter leading-tight mb-6 mt-16">
              {career.title}
            </h1>
            <p className="text-base sm:text-lg lg:text-xl font-light text-white/90 leading-tight max-w-3xl">
              Bring your passion and expertise as a {career.title}, and grow
              with our dedicated team.
            </p>
          </div>
        </div>
      </section>

      {/* User Profile Section */}
      <UserProfileSection />

      {/* Career Details Section */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#2B5589]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-[#FACC01]/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Career Information Card */}
          <div className="bg-white border border-gray-200 p-8 lg:p-12 space-y-12">
            {/* Job Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-base sm:text-lg font-light tracking-tighter text-[#364153] mb-1">
                  Job Information
                </h2>
                <div className="w-full h-[1px] bg-gray-300 mt-4"></div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
                {/* Posted Date */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 p-3 bg-[#0201FF]/5 rounded-lg h-fit">
                    <Calendar className="w-6 h-6 text-[#0201FF]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-light text-[#1a1a1a]">
                      Posted Date
                    </h3>
                    <p className="text-base text-[#364153] font-light">
                      {formatDate(career.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 p-3 bg-[#FACC01]/10 rounded-lg h-fit">
                    <MapPin className="w-6 h-6 text-[#FACC01]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-light text-[#1a1a1a]">
                      Location
                    </h3>
                    <p className="text-base text-[#364153] font-light">
                      {career.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="space-y-6">
              <div>
                <h2 className="text-base sm:text-lg font-light tracking-tighter text-[#364153] mb-1">
                  Job Description
                </h2>
                <div className="w-full h-[1px] bg-gray-300 mt-4"></div>
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-base lg:text-lg text-[#364153] leading-relaxed font-light whitespace-pre-line">
                  {career.description}
                </p>
              </div>
            </div>

            {/* Requirements */}
            <div className="space-y-6">
              <div>
                <h2 className="text-base sm:text-lg font-light tracking-tighter text-[#364153] mb-1">
                  Requirements
                </h2>
                <div className="w-full h-[1px] bg-gray-300 mt-4"></div>
              </div>

              <div className="prose prose-lg max-w-none">
                <div className="text-base lg:text-lg text-[#364153] leading-relaxed font-light whitespace-pre-line">
                  {career.requirements.split("\n").map((req, index) => {
                    const trimmed = req.trim();
                    if (!trimmed) return null;

                    // Check if it's a bullet point
                    if (trimmed.startsWith("-") || trimmed.startsWith("•")) {
                      return (
                        <div key={index} className="flex gap-3 mb-3">
                          <span className="text-[#0201FF] mt-1">•</span>
                          <span>{trimmed.replace(/^[-•]\s*/, "")}</span>
                        </div>
                      );
                    }

                    return (
                      <p key={index} className="mb-4">
                        {trimmed}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Apply CTA */}
          <div className="mt-12 p-8 lg:p-10 bg-gradient-to-br from-[#0201FF] to-[#0000d1] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FACC01]/10 rounded-full blur-3xl" />

            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="max-w-xl space-y-2">
                <h3 className="text-2xl lg:text-3xl font-light tracking-tight">
                  Ready to Join Our Team?
                </h3>
                <p className="text-sm lg:text-base text-white/90 font-light">
                  Submit your application and start your journey with us today.
                </p>
              </div>

              <button
                onClick={handleApply}
                disabled={applying || applied}
                className={`group inline-flex items-center gap-3 font-light px-8 py-4 transition-all duration-300 flex-shrink-0 cursor-pointer ${
                  applied
                    ? "bg-green-500 text-white cursor-not-allowed"
                    : applying
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-white text-[#0201FF] hover:bg-slate-50"
                }`}
              >
                <span className="text-sm tracking-wide">
                  {applied
                    ? "Applied ✓"
                    : applying
                    ? "Applying..."
                    : "Apply Now"}
                </span>
                {!applying && !applied && (
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
                )}
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
      {/* Related Careers Section */}
      {/* <section className="relative py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-base sm:text-lg font-light tracking-tighter text-[#364153] mb-1">
              More Opportunities
            </h2>
            <div className="w-full h-[1px] bg-gray-300 mt-4 mb-8"></div>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tighter text-[#1a1a1a]">
              Other{" "}
              <span className="text-[#0201FF] font-normal">Open Positions</span>
            </h3>
          </div>

          <div className="text-center">
            <a
              href="/career"
              className="group inline-flex items-center gap-3 bg-[#0201FF] text-white font-light px-8 py-4 hover:bg-[#0000d1] transition-all duration-300"
            >
              <span className="text-sm tracking-wide">View All Careers</span>
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
            </a>
          </div>
        </div>
      </section> */}
    </div>
  );
}
