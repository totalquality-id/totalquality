"use client";

import { useState, useEffect } from "react";

interface News {
  id: number;
  title: string;
  content: string;
  image?: string;
  author?: string;
  createdAt: string;
}

export default function AllNewsPage() {
  const [newsArticles, setNewsArticles] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/news");

        if (!res.ok) {
          throw new Error("Failed to fetch news");
        }

        const data = await res.json();
        setNewsArticles(data);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to load news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* Hero Section - Diperbarui agar selaras dengan GlobalBackground */}
      <section className="relative py-20 sm:py-24 lg:py-32 bg-[#15156b] text-white overflow-hidden">
        {/* 1. Base Gradient Layer - Meniru kedalaman GlobalBackground */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background: `radial-gradient(circle at 0% 0%, #0201FF 0%, transparent 40%), 
                         radial-gradient(circle at 100% 100%, #0201FF 0%, transparent 40%)`,
          }}
        />

        {/* 2. Mesh Grid - Disamakan ukurannya (60px) dan opasitasnya */}
        <div className="absolute inset-0 opacity-[0.05]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* 3. Soft Spotlights - Aksen dinamis khas GlobalBackground */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-[#0201FF]/20 rounded-full blur-[120px] animate-pulse"
            style={{ animationDuration: "8s" }}
          />
          <div
            className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-[#0201FF]/15 rounded-full blur-[120px] animate-pulse"
            style={{ animationDuration: "10s" }}
          />
        </div>

        {/* 4. Noise Texture Overlay - Memberikan kesan premium matte */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none brightness-100 contrast-150"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter leading-tight mb-6 mt-16">
              Latest <span className="text-[#FACC01] font-normal">News</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl font-light text-white/80 leading-tight max-w-3xl">
              Insights, updates, and stories from our journey of transforming
              organizations across Southeast Asia.
            </p>
          </div>
        </div>
      </section>

      {/* News Grid Section */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        {loading && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
            <p className="text-[#364153] font-light">Loading news...</p>
          </div>
        )}

        {error && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
            <p className="text-red-600 font-light">{error}</p>
          </div>
        )}

        {!loading && !error && newsArticles.length === 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
            <p className="text-[#364153] font-light">
              No news available at the moment.
            </p>
          </div>
        )}

        {!loading && !error && newsArticles.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {newsArticles.map((article) => (
                <article
                  key={article.id}
                  className="group relative bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-500 overflow-hidden"
                >
                  {/* Content */}
                  <div className="p-8 space-y-6">
                    {/* Date & Author */}
                    <div className="flex items-center gap-2 text-xs text-[#364153] font-light">
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
                      <span>{formatDate(article.createdAt)}</span>
                      {article.author && (
                        <>
                          <span className="text-[#364153]/50">•</span>
                          <span>{article.author}</span>
                        </>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl lg:text-2xl font-light tracking-tight text-[#1a1a1a] leading-tight group-hover:text-[#2B5589] transition-colors duration-300">
                      {article.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-sm lg:text-base text-[#364153] leading-relaxed font-light">
                      {article.content.substring(0, 150)}
                      {article.content.length > 150 ? "..." : ""}
                    </p>

                    {/* Full Content Preview */}
                    <p className="text-xs text-[#364153]/80 leading-relaxed font-light border-t border-gray-100 pt-4">
                      {article.content.substring(150, 300)}
                      {article.content.length > 300 ? "..." : ""}
                    </p>

                    {/* CTA Link */}
                    <div className="pt-2">
                      <a
                        href={`/news/${article.id}`}
                        className="inline-flex items-center gap-2 text-sm text-[#2B5589] font-light underline underline-offset-4 decoration-1 hover:text-[#1E3F69] group-hover:gap-3 transition-all duration-300"
                      >
                        <span>Read More</span>
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

      {/* Newsletter Section */}
      {/* <section className="relative py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative p-12 lg:p-16 bg-[#2B5589] text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FACC01]/10 rounded-full blur-3xl" />

            <div className="relative max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tighter leading-tight">
                Never Miss an Update
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-white/90 font-light leading-relaxed max-w-2xl mx-auto">
                Subscribe to our newsletter and get the latest news, insights,
                and updates delivered directly to your inbox.
              </p>
              <div className="max-w-md mx-auto">
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm font-light focus:outline-none focus:border-[#FACC01] focus:bg-white/15 transition-all duration-300"
                  />
                  <button className="px-6 py-3 bg-[#FACC01] hover:bg-[#FDD835] text-[#2B5589] font-light transition-all duration-300">
                    <span className="text-sm tracking-wide">Subscribe</span>
                  </button>
                </div>
                <p className="text-xs text-white/60 font-light mt-3">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
