export default function News() {
  const newsArticles = [
    {
      title: "New Partnership with Regional Leaders",
      summary:
        "We're thrilled to announce strategic collaborations with top organizations across Southeast Asia to expand our impact.",
      date: "March 8, 2025",
      category: "Partnership",
      emoji: "🤝",
      categoryColor: "bg-[#2B5589] text-white",
    },
    {
      title: "Award-Winning HR Innovation Program",
      summary:
        "Our latest HR transformation framework has been recognized as the most innovative solution in corporate development.",
      date: "February 22, 2025",
      category: "Achievement",
      emoji: "🏆",
      categoryColor: "bg-[#FACC01] text-[#2B5589]",
    },
    {
      title: "Upcoming Leadership Summit 2025",
      summary:
        "Join us for the biggest leadership conference of the year featuring world-class speakers and networking opportunities.",
      date: "February 15, 2025",
      category: "Event",
      emoji: "📢",
      categoryColor: "bg-gradient-to-r from-[#2B5589] to-[#3A6BA5] text-white",
    },
  ];

  return (
    <section
      id="news"
      className="relative py-32 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden"
    >
      {/* Animated Decorative Elements */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-[#FACC01]/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-20 right-10 w-72 h-72 bg-[#2B5589]/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      {/* Geometric Accents */}
      <div className="absolute top-32 right-1/3 w-20 h-20 border-2 border-[#2B5589]/20 rounded-lg rotate-12" />
      <div className="absolute bottom-32 left-1/4 w-16 h-16 border-2 border-[#FACC01]/30 rounded-full" />

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#FACC01]/20 rounded-full shadow-sm">
            <div className="w-2 h-2 bg-[#2B5589] rounded-full animate-pulse" />
            <span className="text-xs font-bold tracking-wider text-[#2B5589] uppercase">
              Stay Updated
            </span>
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight leading-[1.05]">
            Latest
            <span className="relative inline-block mx-4">
              <span className="bg-gradient-to-r from-[#2B5589] via-[#3A6BA5] to-[#2B5589] bg-clip-text text-transparent">
                News
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#FACC01] via-[#FDD835] to-[#FACC01] rounded-full" />
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
            Insights, updates, and stories from our journey
          </p>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {newsArticles.map((article, index) => (
            <article
              key={index}
              className="group relative bg-white rounded-3xl border border-gray-200 hover:border-gray-300 hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2"
            >
              {/* Top Bar with Category */}
              <div className="relative h-40 bg-gradient-to-br from-gray-50 to-white p-6 flex flex-col justify-between overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 right-4 w-24 h-24 border-4 border-gray-900 rounded-full" />
                  <div className="absolute bottom-4 left-4 w-16 h-16 border-4 border-gray-900 rounded-lg rotate-45" />
                </div>

                {/* Category Badge */}
                <div
                  className={`relative inline-flex items-center gap-2 px-4 py-2 ${article.categoryColor} rounded-full text-xs font-bold uppercase tracking-wider shadow-lg w-fit`}
                >
                  <span>{article.category}</span>
                </div>

                {/* Emoji Icon */}
                <div className="relative w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 ml-auto">
                  <span className="text-3xl">{article.emoji}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-5">
                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="font-semibold">{article.date}</span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-black text-gray-900 group-hover:text-[#2B5589] transition-colors duration-300 leading-tight">
                  {article.title}
                </h3>

                {/* Summary */}
                <p className="text-gray-600 leading-relaxed text-base">
                  {article.summary}
                </p>

                {/* CTA Link */}
                <div className="pt-4">
                  <a
                    href="/news"
                    className="group/link inline-flex items-center gap-2 text-[#2B5589] font-bold hover:gap-4 transition-all duration-300"
                  >
                    <span>Read More</span>
                    <svg
                      className="w-5 h-5 group-hover/link:translate-x-1 transition-transform duration-300"
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

              {/* Hover Accent Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2B5589] to-[#FACC01] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
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
              <span>View All News</span>
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
