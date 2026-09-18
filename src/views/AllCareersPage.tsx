"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import UserProfileSection from "@/components/UserProfileSection";

interface Career {
  id: number;
  title: string;
  description: string;
  requirements: string;
  location: string;
  salary?: string;
  jobType?: string;
  experience?: string;
  status?: string;
  createdAt: string;
  _count: {
    applications: number; // Menggunakan applications, bukan applicants
  };
}

export default function AllCareersPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const res = await fetch("/api/careers");
        const data = await res.json();
        setCareers(data);
      } catch (error) {
        console.error("Error fetching careers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCareers();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* Hero Section */}
      <section className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-[#1a2942] via-[#2B5589] to-[#1e3a5f] text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FACC01]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter leading-tight mb-6 mt-16">
              Career{" "}
              <span className="text-[#FACC01] font-normal">Opportunities</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl font-light text-white/90 leading-tight max-w-3xl">
              Join our team of passionate professionals and help transform
              organizations across Southeast Asia. Explore our current openings
              and find your perfect role.
            </p>
          </div>
        </div>
      </section>

      {/* User Profile Section */}
      <UserProfileSection />

      {/* Careers Grid Section */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-[#364153] font-light">Loading careers...</p>
          </div>
        ) : careers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#364153] font-light text-lg">
              No career opportunities available at the moment. Check back soon!
            </p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {careers.map((career) => (
                <article
                  key={career.id}
                  className="group relative bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-500 overflow-hidden"
                >
                  {/* Content */}
                  <div className="p-8 space-y-6">
                    {/* Posted Date & Applicants */}
                    <div className="flex items-center gap-4 text-xs text-[#364153] font-light">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>Posted {formatDate(career.createdAt)}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl lg:text-2xl font-light tracking-tight text-[#1a1a1a] leading-tight group-hover:text-[#2B5589] transition-colors duration-300">
                      {career.title}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-sm text-[#364153] font-light">
                      <MapPin className="w-4 h-4 text-[#FACC01]" />
                      <span>{career.location}</span>
                    </div>

                    {/* Tipe pekerjaan, pengalaman, dan gaji. Ketiganya sudah
                        lama ada di database tapi belum pernah ditampilkan. */}
                    {(career.jobType || career.experience || career.salary) && (
                      <div className="flex flex-wrap gap-2">
                        {career.jobType && (
                          <span className="inline-block px-3 py-1 text-xs font-light rounded-full bg-[#0201FF]/5 text-[#0201FF] border border-[#0201FF]/10">
                            {career.jobType}
                          </span>
                        )}
                        {career.experience && (
                          <span className="inline-block px-3 py-1 text-xs font-light rounded-full bg-gray-50 text-[#364153] border border-gray-200">
                            {career.experience}
                          </span>
                        )}
                        {career.salary && (
                          <span className="inline-block px-3 py-1 text-xs font-light rounded-full bg-[#FACC01]/10 text-[#8a6d00] border border-[#FACC01]/20">
                            {career.salary}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-sm lg:text-base text-[#364153] leading-relaxed font-light">
                      {truncateText(career.description)}
                    </p>

                    {/* Requirements Preview */}
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-xs text-[#364153]/80 leading-relaxed font-light">
                        <span className="font-normal text-[#1a1a1a]">
                          Requirements:
                        </span>{" "}
                        {truncateText(career.requirements, 100)}
                      </p>
                    </div>

                    {/* CTA Link */}
                    <div className="pt-2">
                      <a
                        href={`/career/${career.id}`}
                        className="inline-flex items-center gap-2 text-sm text-[#2B5589] font-light underline underline-offset-4 decoration-1 hover:text-[#1E3F69] group-hover:gap-3 transition-all duration-300"
                      >
                        <span>View Details</span>
                        <svg
                          className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
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

                  {/* Hover Accent Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#2B5589] to-[#FACC01] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </article>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="relative py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative p-12 lg:p-16 bg-[#2B5589] text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FACC01]/10 rounded-full blur-3xl" />

            <div className="relative max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tighter leading-tight">
                Don&apos;t See the Right Role?
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-white/90 font-light leading-relaxed max-w-2xl mx-auto">
                Send us your resume and we&apos;ll keep you in mind for future
                opportunities that match your skills and experience.
              </p>
              <div>
                <a
                  href="/contact"
                  className="group inline-flex items-center gap-3 bg-white text-[#2B5589] font-light px-8 py-4 hover:bg-slate-50 transition-all duration-300"
                >
                  <span className="text-sm tracking-wide">
                    Send Your Resume
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
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
