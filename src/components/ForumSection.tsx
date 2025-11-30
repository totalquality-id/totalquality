"use client";

import { useState, useEffect } from "react";
import { Heart, Share2, MessageCircle, Quote, Sparkles } from "lucide-react";

interface ForumPost {
  id: number;
  quote: string;
  author: string;
  likes: number;
  shares: number;
}

export default function ForumSection() {
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([]);
  const [liked, setLiked] = useState<boolean[]>([]);
  const [activeShare, setActiveShare] = useState<{
    quote: string;
    author: string;
  } | null>(null);

  useEffect(() => {
    const fetchForums = async () => {
      try {
        const res = await fetch("/api/forums");
        const data: ForumPost[] = await res.json();
        setForumPosts(data);
        setLiked(
          data.map((p) => {
            const stored =
              typeof window !== "undefined"
                ? localStorage.getItem(`forum_like_${p.id}`)
                : null;
            return stored === "true";
          })
        );
      } catch (err) {
        console.error("Failed to fetch forums:", err);
      }
    };
    fetchForums();
  }, []);

  const toggleLike = async (index: number, id: number) => {
    const isLiked = liked[index];

    setLiked((prev) => {
      const updated = [...prev];
      updated[index] = !isLiked;
      return updated;
    });

    setForumPosts((prev) => {
      const updated = [...prev];
      updated[index].likes += isLiked ? -1 : 1;
      return updated;
    });

    if (typeof window !== "undefined") {
      if (isLiked) localStorage.removeItem(`forum_like_${id}`);
      else localStorage.setItem(`forum_like_${id}`, "true");
    }

    const endpoint = isLiked
      ? `/api/forums/${id}/unlike`
      : `/api/forums/${id}/like`;

    try {
      await fetch(endpoint, { method: "POST" });
    } catch (err) {
      console.error("Failed to update like:", err);
    }
  };

  const handleShare = async (index: number, id: number) => {
    try {
      await fetch(`/api/forums/${id}/share`, { method: "POST" });
      setForumPosts((prev) => {
        const updated = [...prev];
        updated[index].shares += 1;
        return updated;
      });
      setActiveShare({
        quote: forumPosts[index].quote,
        author: forumPosts[index].author,
      });
    } catch (err) {
      console.error("Failed to share:", err);
    }
  };

  return (
    <section
      id="forum"
      className="relative py-16 sm:py-20 lg:py-24 bg-white overflow-hidden"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* Subtle Background Elements */}
      <div className="absolute top-1/4 right-10 w-64 h-64 bg-[#FACC01]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-10 w-72 h-72 bg-[#2B5589]/5 rounded-full blur-3xl" />

      {/* Decorative Accent Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 border border-[#0201FF]/10 rounded-full" />
        <div className="absolute top-14 left-14 w-12 h-12 border border-[#0201FF]/8 rounded-full" />
        <div className="absolute top-16 right-12 w-16 h-16 border border-[#FACC01]/10 rounded-lg rotate-45" />
        <div className="absolute bottom-16 right-20 w-18 h-18 border border-[#FACC01]/10 rounded-lg rotate-12" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-light tracking-tighter text-[#1a1a1a] leading-tight">
              AOC <span className="text-[#2B5589] font-normal">Connect</span>
            </h2>
          </div>
          <p className="text-lg sm:text-xl text-[#364153] font-light max-w-2xl">
            Inspiring our Agents of Change with motivation to drive excellence
            every day.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - CEO Image & Company Info with News Card Style */}
          <div className="relative h-[680px]">
            {/* Card Container */}
            <div className="relative h-full rounded-2xl overflow-hidden shadow-lg">
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src="/direksi.jpg"
                  alt="CEO"
                  className="w-full h-full object-cover"
                />

                {/* Multi-Layer Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-black/30 to-black/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-black/5" />
              </div>

              {/* Content Container */}
              <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-7 lg:p-8">
                {/* Title */}
                <h3 className="text-3xl sm:text-4xl font-semibold text-white leading-tight tracking-tight mb-4">
                  Total Quality Indonesia
                </h3>

                {/* Description */}
                <p className="text-base sm:text-lg text-white/90 leading-relaxed tracking-tight font-light mb-6">
                  Inspiring our Agents of Change with wisdom and motivation to
                  drive excellence every day.
                </p>

                {/* Stats */}
                <div className="flex items-center gap-6">
                  <div className="text-sm text-white/80">
                    <span className="font-semibold text-white text-2xl">
                      {forumPosts.length}
                    </span>
                    <span className="ml-2">Quotes</span>
                  </div>
                  <div className="text-sm text-white/80">
                    <span className="font-semibold text-white text-2xl">
                      {forumPosts.reduce((acc, post) => acc + post.likes, 0)}
                    </span>
                    <span className="ml-2">Likes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Quotes Feed */}
          <div className="bg-white border-2 border-gray-200 rounded-3xl overflow-hidden shadow-lg h-[680px] flex flex-col">
            {/* Header */}
            <div className="bg-gray-50 border-b-2 border-gray-200 px-6 py-5">
              <div className="flex items-center gap-3">
                <Quote className="w-6 h-6 text-[#FACC01]" />
                <div>
                  <h3 className="text-xl font-semibold text-[#1a1a1a] tracking-tight">
                    Inspirational Quotes
                  </h3>
                  <p className="text-sm text-[#364153] font-light mt-0.5">
                    Latest motivation from our community
                  </p>
                </div>
              </div>
            </div>

            {/* Posts Feed - Scrollable */}
            <div className="flex-1 overflow-y-auto divide-y divide-gray-200">
              {forumPosts.map((post, index) => (
                <article
                  key={post.id}
                  className="px-6 py-5 hover:bg-gray-50 transition-all duration-300 cursor-pointer group/post"
                >
                  <div className="flex gap-4">
                    {/* Avatar with gradient */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0201FF] to-[#2B5589] flex items-center justify-center text-white font-bold text-lg shadow-lg ring-2 ring-[#0201FF]/20">
                        {post.author.charAt(0)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Author */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-normal text-[#1a1a1a] transition-colors duration-300">
                          {post.author}
                        </span>
                      </div>

                      {/* Quote with light background */}
                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4 group-hover/post:bg-gray-100 group-hover/post:border-gray-300 transition-all duration-300">
                        <Quote className="w-5 h-5 text-[#FACC01] mb-2" />
                        <p className="text-[#1a1a1a] text-base leading-relaxed font-light italic">
                          {post.quote}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-1 -ml-2">
                        {/* Like */}
                        <button
                          onClick={() => toggleLike(index, post.id)}
                          className={`group/btn flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 ${
                            liked[index] ? "bg-pink-100" : "hover:bg-gray-100"
                          }`}
                        >
                          <Heart
                            className={`w-5 h-5 transition-all duration-300 ${
                              liked[index]
                                ? "fill-pink-500 text-pink-500 scale-110"
                                : "text-[#364153] group-hover/btn:text-[#1a1a1a]"
                            }`}
                          />
                          <span
                            className={`text-sm transition-colors duration-300 font-light ${
                              liked[index]
                                ? "text-[#1a1a1a] font-normal"
                                : "text-[#364153] group-hover/btn:text-[#1a1a1a]"
                            }`}
                          >
                            {post.likes}
                          </span>
                        </button>
                        {/* Share */}
                        <button
                          onClick={() => handleShare(index, post.id)}
                          className="group/btn flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 transition-all duration-300"
                        >
                          <Share2 className="w-5 h-5 text-[#364153] group-hover/btn:text-[#1a1a1a] transition-colors duration-300" />
                          <span className="text-sm text-[#364153] group-hover/btn:text-[#1a1a1a] transition-colors duration-300 font-light">
                            {post.shares}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* See All CTA */}
            <div className="border-t-2 border-gray-200 p-6 bg-gray-50">
              <a
                href="/forum"
                className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-[#0201FF] to-[#2B5589] hover:from-[#0201FF]/90 hover:to-[#2B5589]/90 text-white font-semibold rounded-full transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-[#0201FF]/50"
              >
                <span>See All Quotes</span>
                <svg
                  className="w-5 h-5"
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
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal Placeholder */}
      {activeShare && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-semibold text-[#1a1a1a] mb-4">
              Share Quote
            </h3>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
              <Quote className="w-5 h-5 text-[#FACC01] mb-2" />
              <p className="text-[#1a1a1a] italic mb-2">
                "{activeShare.quote}"
              </p>
              <p className="text-sm text-[#364153]">- {activeShare.author}</p>
            </div>
            <button
              onClick={() => setActiveShare(null)}
              className="w-full px-6 py-3 bg-[#0201FF] text-white rounded-lg font-medium hover:bg-[#0000d1] transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        /* Custom scrollbar for the feed */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </section>
  );
}
