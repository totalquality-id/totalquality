"use client";

import { useState, useEffect } from "react";
import ShareModal from "@/components/ShareModal";
import { Heart, Forward } from "lucide-react";

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
      const res = await fetch("/api/forums");
      const data: ForumPost[] = await res.json();
      setForumPosts(data);
      setLiked(
        data.map((p) => localStorage.getItem(`forum_like_${p.id}`) === "true")
      );
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

    if (isLiked) localStorage.removeItem(`forum_like_${id}`);
    else localStorage.setItem(`forum_like_${id}`, "true");

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
  };

  if (!forumPosts.length) {
    return (
      <section className="py-24 text-center text-gray-500">
        Loading forum...
      </section>
    );
  }

  return (
    <section
      id="forum"
      className="relative py-16 sm:py-20 lg:py-24 bg-slate-50"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* Subtle Background Elements */}
      <div className="absolute top-1/4 right-10 w-64 h-64 bg-[#2B5589]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-10 w-72 h-72 bg-[#FACC01]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-base sm:text-2xl md:text-xl lg:text-2xl font-light tracking-tighter text-[#364153] mb-1">
            Community Hub
          </h2>
          <div className="w-full h-[1px] bg-gray-300 mb-8"></div>

          <div className="max-w-4xl">
            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter text-[#1a1a1a] leading-tight mb-4">
              Forum —{" "}
              <span className="text-[#0201FF] font-normal">
                Agent of Change
              </span>
            </h3>
            <p className="text-base sm:text-lg lg:text-xl font-light tracking-tight text-[#364153] mt-4">
              Share and interact with motivational quotes from us
            </p>
          </div>
        </div>

        {/* Forum Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {forumPosts.map((post, index) => (
            <article key={index} className="group relative pb-6">
              {/* Card Content */}
              <div className="p-8 lg:p-10 bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300">
                {/* Content */}
                <div className="space-y-6">
                  {/* Quote Text */}
                  <blockquote className="text-[#364153] leading-relaxed text-base lg:text-lg font-light min-h-[140px]">
                    &quot;{post.quote}&quot;
                  </blockquote>

                  {/* Author Info */}
                  <cite className="block font-light text-[#1a1a1a] text-sm not-italic">
                    — {post.author}
                  </cite>
                </div>
              </div>

              {/* Like & Share Buttons */}
              <div className="absolute bottom-1 right-3 z-10 flex gap-3">
                {/* Like Button */}
                <button
                  onClick={() => toggleLike(index, post.id)}
                  className={`flex items-center gap-2.5 bg-white px-4 py-2.5 rounded-full border border-gray-200 shadow-sm hover:shadow-md 
      transition-all duration-300 cursor-pointer active:scale-95`}
                >
                  <Heart
                    className={`w-4 h-4 transition-all duration-300 
        ${
          liked[index]
            ? "fill-red-500 stroke-red-500 scale-125 "
            : "stroke-gray-500"
        }
      `}
                  />
                  <span className="text-[#364153] text-sm font-light">
                    {post.likes}
                  </span>
                </button>

                {/* Share Button */}
                <button
                  onClick={() => handleShare(index, post.id)}
                  className="flex items-center gap-2.5 bg-white px-4 py-2.5 rounded-full border border-gray-200 shadow-sm hover:shadow-md 
      transition-all duration-300 cursor-pointer active:scale-95"
                >
                  <Forward className="w-4 h-4 stroke-gray-500 transition-transform duration-200" />
                  <span className="text-[#364153] text-sm font-light">
                    {post.shares}
                  </span>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 sm:mt-20 border-t border-gray-200 pt-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="max-w-xl">
              <p className="text-base sm:text-lg lg:text-xl font-light tracking-tight text-[#364153]">
                Discover motivational quotes from Total Quality Indonesia, made
                to inspire our Agents of Change.
              </p>
            </div>

            <a
              href="/forum"
              className="group inline-flex items-center gap-3 bg-[#0201FF] text-white font-light px-8 py-4 hover:bg-[#0000d1] transition-all duration-300"
            >
              <span className="text-sm tracking-wide">See All Quotes</span>
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
      {activeShare && (
        <ShareModal
          quote={activeShare.quote}
          author={activeShare.author}
          onClose={() => setActiveShare(null)}
        />
      )}
    </section>
  );
}
