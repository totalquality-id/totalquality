"use client";

import { useState, useMemo, useEffect } from "react";
import ShareModal from "@/components/ShareModal";
import { Heart, Forward } from "lucide-react";

interface ForumPost {
  id: number;
  quote: string;
  author: string;
  likes: number;
  shares: number;
}

export default function AllQuotesPage() {
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([]);
  const [liked, setLiked] = useState<boolean[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("Terbaru");
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

  const filteredPosts = useMemo(() => {
    let posts = [...forumPosts];

    if (searchQuery.trim()) {
      posts = posts.filter(
        (p) =>
          p.quote.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (filter) {
      case "Terbaru":
        return posts.reverse(); // contoh urutan terbalik
      case "Terlama":
        return posts; // urutan default
      case "Paling Disukai":
        return posts.sort((a, b) => b.likes - a.likes);
      default:
        return posts;
    }
  }, [searchQuery, filter, forumPosts]);

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
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter leading-10 sm:leading-12  md:leading-16 lg:leading-18 mb-6 mt-16">
              Forum —{" "}
              <span className="text-[#FACC01] font-normal">
                Agent of Change
              </span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl font-light text-white/90 leading-tight max-w-3xl">
              Discover inspiring quotes and wisdom from our community of change
              agents and motivational leaders.
            </p>
          </div>
        </div>
      </section>

      {/* Quotes Grid Section */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
            {/* Filter */}
            <div className="flex gap-3">
              {["Terbaru", "Terlama", "Paling Disukai"].map((option) => (
                <button
                  key={option}
                  onClick={() => setFilter(option)}
                  className={`px-4 py-2 border rounded-full text-sm transition-all duration-300 ${
                    filter === option
                      ? "bg-[#2B5589] text-white border-[#2B5589]"
                      : "bg-white text-[#364153] border-gray-300 hover:border-[#2B5589]"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Cari quote atau penulis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0201FF ]"
              />
              <svg
                className="w-5 h-5 text-black absolute right-3 top-2.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredPosts.map((post, index) => (
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
                      {post.likes}{" "}
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
                      {post.shares}{" "}
                    </span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      {activeShare && (
        <ShareModal
          quote={activeShare.quote}
          author={activeShare.author}
          onClose={() => setActiveShare(null)}
        />
      )}
    </div>
  );
}
