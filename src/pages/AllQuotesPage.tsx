"use client";

import Image from "next/image";
import { useState, useMemo } from "react";

export default function AllQuotesPage() {
  const forumPosts = [
    {
      quote:
        "Kemauan dari diri sendiri untuk berubah menjadi lebih baik adalah inti dari perubahan yang positif sesungguhnya.",
      author: "Johan Yan",
      likes: 124,
      category: "Personal Growth",
    },
    {
      quote:
        "Rejeki besar akan datang pada orang yang bermimpi besar, bergerak besar, berkorban besar dan berkontribusi besar!",
      author: "Yusuf Adi Pura",
      likes: 109,
      category: "Success",
    },
    {
      quote:
        "Dengan bermalas-malas takkan tercapai apa yang diidamkan; dengan bekerja keras orang mendapat kekayaan.",
      author: "Johan Yan",
      likes: 120,
      category: "Work Ethics",
    },
    {
      quote:
        "Kepemimpinan sejati dimulai dengan kemampuan memimpin diri sendiri sebelum memimpin orang lain.",
      author: "Total Quality Team",
      likes: 156,
      category: "Leadership",
    },
    {
      quote:
        "Budaya organisasi yang kuat adalah hasil dari komitmen bersama untuk terus berkembang dan berinovasi.",
      author: "Johan Yan",
      likes: 98,
      category: "Culture",
    },
    {
      quote:
        "Perubahan dimulai dari kesadaran, diperkuat dengan tindakan, dan diabadikan melalui konsistensi.",
      author: "Yusuf Adi Pura",
      likes: 142,
      category: "Change Management",
    },
    {
      quote:
        "Tim yang solid bukan hanya tentang bekerja bersama, tetapi tentang tumbuh bersama menuju visi yang sama.",
      author: "Total Quality Team",
      likes: 167,
      category: "Teamwork",
    },
    {
      quote:
        "Kualitas bukan tujuan akhir, tetapi perjalanan berkelanjutan menuju kesempurnaan.",
      author: "Johan Yan",
      likes: 134,
      category: "Quality",
    },
    {
      quote:
        "Agent of Change adalah mereka yang tidak hanya melihat masalah, tetapi menciptakan solusi dan menginspirasi perubahan.",
      author: "Total Quality Team",
      likes: 189,
      category: "Innovation",
    },
    {
      quote:
        "Kesuksesan organisasi diukur bukan dari seberapa besar, tetapi seberapa berdampak.",
      author: "Yusuf Adi Pura",
      likes: 145,
      category: "Success",
    },
    {
      quote:
        "Investasi terbaik adalah investasi pada pengembangan sumber daya manusia.",
      author: "Johan Yan",
      likes: 178,
      category: "Development",
    },
    {
      quote:
        "Motivasi yang sejati datang dari dalam diri, bukan dari paksaan eksternal.",
      author: "Total Quality Team",
      likes: 112,
      category: "Motivation",
    },
  ];
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("Terbaru");
  const [likes, setLikes] = useState(forumPosts.map((p) => p.likes));
  const [liked, setLiked] = useState(forumPosts.map(() => false));
  const [shares, setShares] = useState(forumPosts.map(() => 0));

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

  const toggleLike = (index: number) => {
    setLiked((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
    setLikes((prev) => {
      const updated = [...prev];
      updated[index] += liked[index] ? -1 : 1;
      return updated;
    });
  };

  const incrementShare = (index: number) => {
    setShares((prev) => {
      const updated = [...prev];
      updated[index] += 1;
      return updated;
    });
  };

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* Hero Section */}
      <section className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-[#2B5589] to-[#1e3d5f] text-white overflow-hidden">
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
                className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B5589]"
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
                  {/* Category Badge */}
                  <div className="mb-4">
                    <span className="inline-flex items-center px-3 py-1 bg-slate-50 border border-gray-200 text-xs font-light tracking-wide text-[#2B5589]">
                      {post.category}
                    </span>
                  </div>

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
                    onClick={() => toggleLike(index)}
                    className="flex items-center gap-2.5 bg-white px-4 py-2.5 rounded-full border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300 cursor-pointer"
                    type="button"
                  >
                    <Image
                      src={liked[index] ? "/like.png" : "/unlike.png"}
                      alt="Like"
                      width={16}
                      height={16}
                      className="w-4 h-4 object-cover"
                    />
                    <span className="text-[#364153] text-sm font-light">
                      {likes[index]}
                    </span>
                  </button>

                  {/* Share Button */}
                  <button
                    onClick={() => incrementShare(index)}
                    className="flex items-center gap-2.5 bg-white px-4 py-2.5 rounded-full border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300 cursor-pointer"
                    type="button"
                  >
                    <Image
                      src="/share.png"
                      alt="Share"
                      width={16}
                      height={16}
                      className="w-4 h-4 object-cover"
                    />
                    <span className="text-[#364153] text-sm font-light">
                      {shares[index]}
                    </span>
                  </button>
                </div>

                {/* Number Indicator */}
                <div className="absolute top-4 right-4 text-5xl font-extralight text-gray-200 group-hover:text-gray-300 transition-colors duration-500 select-none">
                  {index < 9 ? `0${index + 1}` : index + 1}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
