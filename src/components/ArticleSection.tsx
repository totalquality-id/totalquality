"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEngagementSummary } from "@/hooks/useEngagementSummary";
import EngagementStats from "@/components/engagement/EngagementStats";
import { truncateContent } from "@/utils/htmlText";

interface Article {
  id: number;
  title: string;
  content: string;
  image?: string;
  author?: string;
  createdAt: string;
}

// stripHtml/truncateContent dipindah ke @/utils/htmlText agar dipakai bersama
// dengan halaman /articles, yang sebelumnya memotong HTML mentah.

export default function ArticleSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const engagement = useEngagementSummary("article");
  const [loading, setLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("/api/articles");
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        console.error("Failed to fetch articles:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const checkScrollability = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScrollability();
    window.addEventListener("resize", checkScrollability);
    return () => window.removeEventListener("resize", checkScrollability);
  }, [articles]);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    const targetScroll =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({ left: targetScroll, behavior: "smooth" });
    setTimeout(checkScrollability, 300);
  };

  return (
    <section
      id="article"
      className="relative py-16 sm:py-20 lg:py-24 bg-white overflow-hidden"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* Background Elements */}
      <div className="absolute top-1/4 right-10 w-64 h-64 bg-[#FACC01]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-10 w-72 h-72 bg-[#2B5589]/5 rounded-full blur-3xl" />

      {/* Decorative Accent Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 border border-[#0201FF]/10 rounded-full" />
        <div className="absolute top-14 left-14 w-12 h-12 border border-[#0201FF]/8 rounded-full" />
        <div className="absolute bottom-16 right-20 w-18 h-18 border border-[#FACC01]/10 rounded-lg rotate-12" />
      </div>

      {/* Header with Navigation */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-light tracking-tighter text-[#1a1a1a] leading-tight">
              Latest <span className="text-[#0201FF] font-normal">Article</span>
            </h2>

            <Link
              href="/articles"
              className="hidden lg:inline-flex text-center items-center gap-2 text-[#364153] hover:text-[#0201FF] transition-all duration-300 group"
            >
              <span className="text-xl font-medium">View All Articles</span>
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

          {/* Navigation Buttons */}
          {!loading && articles.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className={`w-12 h-12 bg-white border-2 border-[#0201FF]/20 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg group ${
                  canScrollLeft
                    ? "hover:bg-[#0201FF] hover:border-[#0201FF] cursor-pointer"
                    : "opacity-40 cursor-not-allowed"
                }`}
                aria-label="Scroll left"
              >
                <ChevronLeft
                  className={`w-6 h-6 transition-all duration-300 ${
                    canScrollLeft
                      ? "text-[#0201FF] group-hover:text-white group-hover:-translate-x-0.5"
                      : "text-gray-400"
                  }`}
                />
              </button>

              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className={`w-12 h-12 bg-white border-2 border-[#0201FF]/20 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg group ${
                  canScrollRight
                    ? "hover:bg-[#0201FF] hover:border-[#0201FF] cursor-pointer"
                    : "opacity-40 cursor-not-allowed"
                }`}
                aria-label="Scroll right"
              >
                <ChevronRight
                  className={`w-6 h-6 transition-all duration-300 ${
                    canScrollRight
                      ? "text-[#0201FF] group-hover:text-white group-hover:translate-x-0.5"
                      : "text-gray-400"
                  }`}
                />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <p className="text-[#364153] font-light">Loading articles...</p>
        </div>
      )}

      {/* Article Cards */}
      {!loading && articles.length > 0 && (
        <div className="relative z-10 w-full">
          <div
            ref={scrollContainerRef}
            onScroll={checkScrollability}
            className="overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex gap-6 lg:gap-8 pb-4 pr-[calc(1rem+6.75rem)] sm:pr-[calc(1.5rem+6.75rem)] lg:pr-[calc(2rem+6.75rem)]">
                {articles.map((article) => (
                  <div
                    key={article.id}
                    className="group relative flex-shrink-0 w-[300px] sm:w-[340px] lg:w-[380px] h-[480px] sm:h-[520px] lg:h-[560px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      {article.image ? (
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          sizes="(max-width: 640px) 300px, (max-width: 1024px) 340px, 380px"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#2B5589] to-[#1a2942] flex items-center justify-center">
                          <svg
                            className="w-20 h-20 text-white/20"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                            />
                          </svg>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/40 to-black/70" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Content Container */}
                    <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-7 lg:p-8">
                      {/* Default State */}
                      <div className="transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-4 group-focus-within:opacity-0 group-focus-within:translate-y-4">
                        <div className="flex items-center gap-2 mb-3">
                          <svg
                            className="w-4 h-4 text-[#FACC01]"
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
                          <p className="text-sm text-white/90 font-light">
                            {formatDate(article.createdAt)}
                          </p>
                          {article.author && (
                            <>
                              <span className="text-white/60">•</span>
                              <span className="text-sm text-white/90 font-light">
                                {article.author}
                              </span>
                            </>
                          )}
                        </div>
                        <h3 className="text-2xl sm:text-3xl lg:text-3xl font-normal tracking-tight text-white leading-tight">
                          {article.title}
                        </h3>
                        <EngagementStats
                          likes={engagement[article.id]?.likes}
                          comments={engagement[article.id]?.comments}
                          className="mt-3"
                        />
                      </div>

                      {/* Hover State */}
                      <div className="absolute bottom-6 sm:bottom-7 lg:bottom-8 left-6 sm:left-7 lg:left-8 right-6 sm:right-7 lg:right-8 opacity-0 translate-y-6 pointer-events-none transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto">
                        <div className="flex items-center gap-2 mb-4">
                          <svg
                            className="w-4 h-4 text-[#FACC01]"
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
                          <p className="text-sm text-white/90 font-light">
                            {formatDate(article.createdAt)}
                          </p>
                          {article.author && (
                            <>
                              <span className="text-white/60">•</span>
                              <span className="text-sm text-white/90 font-light">
                                {article.author}
                              </span>
                            </>
                          )}
                        </div>

                        <h3 className="text-2xl sm:text-2xl lg:text-3xl font-normal tracking-tight text-white leading-tighter mb-4">
                          {article.title}
                        </h3>

                        {/* Content preview — plain text, sudah strip HTML */}
                        <p className="text-sm sm:text-base text-white/90 leading-relaxed font-light mb-4 line-clamp-3">
                          {truncateContent(article.content)}
                        </p>

                        <a
                          href={`/articles/${article.id}`}
                          className="inline-flex items-center gap-2 text-sm sm:text-base text-white underline underline-offset-[6px] decoration-1 decoration-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm transition-colors duration-300 group/btn"
                        >
                          <span>Read More</span>
                          {/* <svg
                            className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg> */}
                        </a>
                      </div>
                    </div>

                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-[#0201FF]/20 -z-10" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && articles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#364153] font-light text-lg">
            No article available at the moment. Check back soon!
          </p>
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
