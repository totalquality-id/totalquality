export default function Forum() {
  const forumPosts = [
    {
      quote:
        "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Sarah Chen",
      role: "HR Manager",
      likes: 124,
      comments: 18,
      gradient: "from-[#2B5589]/10 to-[#3A6BA5]/5",
      avatar: "👩‍💼",
    },
    {
      quote:
        "The only way to do great work is to love what you do. If you haven't found it yet, keep looking.",
      author: "Michael Tan",
      role: "CEO",
      likes: 89,
      comments: 12,
      gradient: "from-[#FACC01]/10 to-[#FDD835]/5",
      avatar: "👨‍💼",
    },
    {
      quote:
        "Leadership is not about being in charge. It's about taking care of those in your charge.",
      author: "Diana Wong",
      role: "Team Leader",
      likes: 156,
      comments: 24,
      gradient: "from-[#2B5589]/10 to-[#FACC01]/5",
      avatar: "👩‍🏫",
    },
  ];

  const communityStats = [
    { icon: "👥", number: "2.5K+", label: "Active Members" },
    { icon: "💬", number: "5K+", label: "Conversations" },
    { icon: "💡", number: "10K+", label: "Shared Ideas" },
  ];

  return (
    <section
      id="forum"
      className="relative py-32 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden"
    >
      {/* Animated Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-[#2B5589]/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-20 left-10 w-80 h-80 bg-[#FACC01]/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      {/* Geometric Accents */}
      <div className="absolute top-40 left-1/4 w-20 h-20 border-2 border-[#FACC01]/30 rounded-lg rotate-12" />
      <div className="absolute bottom-40 right-1/3 w-16 h-16 border-2 border-[#2B5589]/20 rounded-full" />

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#2B5589]/20 rounded-full shadow-sm">
            <div className="w-2 h-2 bg-[#FACC01] rounded-full animate-pulse" />
            <span className="text-xs font-bold tracking-wider text-[#2B5589] uppercase">
              Community Hub
            </span>
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight leading-[1.05]">
            Forum —
            <span className="relative inline-block mx-2">
              <span className="bg-gradient-to-r from-[#2B5589] via-[#3A6BA5] to-[#2B5589] bg-clip-text text-transparent">
                Agent of Change
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#FACC01] via-[#FDD835] to-[#FACC01] rounded-full" />
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
            Share and interact with motivational quotes from us
          </p>
        </div>
        {/* Community Stats */}
        {/* <div className="max-w-5xl mx-auto mb-16">
          <div className="grid grid-cols-3 gap-6">
            {communityStats.map((stat, index) => (
              <div
                key={index}
                className="group relative p-6 bg-white rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 text-center hover:-translate-y-1"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">
                  {stat.icon}
                </div>
                <div className="text-3xl font-black text-[#2B5589] mb-1">
                  {stat.number}
                </div>
                <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div> */}
        {/* Forum Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {forumPosts.map((post, index) => (
            <article
              key={index}
              className={`group relative p-8 bg-gradient-to-br ${post.gradient} rounded-3xl border border-gray-200 hover:border-gray-300 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 w-12 h-12 bg-white/80 rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-2xl text-[#2B5589]">"</span>
              </div>

              {/* Content */}
              <div className="space-y-6">
                {/* Quote Text */}
                <div className="relative">
                  <p className="text-gray-800 italic leading-relaxed text-base font-medium">
                    "{post.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#2B5589] to-[#3A6BA5] rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">{post.avatar}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-900 text-sm">
                      {post.author}
                    </div>
                    <div className="text-xs text-gray-600 font-semibold">
                      {post.role}
                    </div>
                  </div>
                </div>

                {/* Engagement Stats */}
                <div className="flex items-center gap-6 pt-4">
                  <button className="group/like flex items-center gap-2 text-gray-600 hover:text-[#2B5589] transition-colors duration-300">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover/like:scale-110 transition-transform duration-300">
                      <span className="text-lg">❤️</span>
                    </div>
                    <span className="text-sm font-bold">{post.likes}</span>
                  </button>

                  <button className="group/comment flex items-center gap-2 text-gray-600 hover:text-[#2B5589] transition-colors duration-300">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover/comment:scale-110 transition-transform duration-300">
                      <span className="text-lg">💬</span>
                    </div>
                    <span className="text-sm font-bold">{post.comments}</span>
                  </button>
                </div>
              </div>

              {/* Corner Accent */}
              <div className="absolute bottom-4 right-4 w-8 h-8 border-2 border-gray-300 rounded-lg rotate-12 opacity-0 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-300" />
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="inline-block">
            <a
              href="/news"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#2B5589] to-[#3A6BA5] text-white font-bold px-10 py-5 rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <span>See All Quotes</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
