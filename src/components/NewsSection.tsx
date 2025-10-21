export default function NewsSection() {
  const newsArticles = [
    {
      title: "New Partnership with Regional Leaders",
      summary:
        "We're thrilled to announce strategic collaborations with top organizations across Southeast Asia to expand our impact.",
      date: "March 8, 2025",
      category: "Partnership",
      categoryColor: "bg-[#2B5589] text-white",
    },
    {
      title: "Award-Winning HR Innovation Program",
      summary:
        "Our latest HR transformation framework has been recognized as the most innovative solution in corporate development.",
      date: "February 22, 2025",
      category: "Achievement",
      categoryColor: "bg-[#FACC01] text-[#2B5589]",
    },
    {
      title: "Upcoming Leadership Summit 2025",
      summary:
        "Join us for the biggest leadership conference of the year featuring world-class speakers and networking opportunities.",
      date: "February 15, 2025",
      category: "Event",
      categoryColor: "bg-[#2B5589] text-white",
    },
  ];

  return (
    <section
      id="news"
      className="relative py-16 sm:py-20 lg:py-24 bg-slate-50"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* Subtle Background Elements */}
      <div className="absolute top-1/4 right-10 w-64 h-64 bg-[#FACC01]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-10 w-72 h-72 bg-[#2B5589]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-base sm:text-2xl md:text-xl lg:text-2xl font-light tracking-tighter text-[#364153] mb-1">
            Stay Updated
          </h2>
          <div className="w-full h-[1px] bg-gray-300 mb-8"></div>

          <div className="max-w-4xl">
            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter text-[#1a1a1a] leading-tight mb-4">
              Latest <span className="text-[#2B5589] font-normal">News</span>
            </h3>
            <p className="text-base sm:text-lg lg:text-xl font-light tracking-tight text-[#364153] mt-4">
              Insights, updates, and stories from our journey
            </p>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {newsArticles.map((article, index) => (
            <article
              key={index}
              className="group relative bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-500 overflow-hidden"
            >
              {/* Top Section with Category */}
              <div className="relative h-32 bg-gradient-to-br from-slate-50 to-white p-6 flex items-center justify-between border-b border-gray-100">
                {/* Category Badge */}
                <div
                  className={`inline-flex items-center px-3 py-1.5 ${article.categoryColor} text-xs font-light tracking-wide`}
                >
                  {article.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-6">
                {/* Date */}
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
                  <span>{article.date}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-light tracking-tight text-[#1a1a1a] leading-tight group-hover:text-[#2B5589] transition-colors duration-300">
                  {article.title}
                </h3>

                {/* Summary */}
                <p className="text-sm lg:text-base text-[#364153] leading-relaxed font-light">
                  {article.summary}
                </p>

                {/* CTA Link */}
                <div className="pt-2">
                  <a
                    href="/news"
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

        {/* Bottom CTA */}
        <div className="mt-16 sm:mt-20 border-t border-gray-200 pt-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="max-w-xl">
              <p className="text-base sm:text-lg lg:text-xl font-light tracking-tight text-[#364153]">
                Explore more stories and insights from our community and
                partners.
              </p>
            </div>

            <a
              href="/news"
              className="group inline-flex items-center gap-3 bg-[#2B5589] text-white font-light px-8 py-4 hover:bg-[#1E3F69] transition-all duration-300"
            >
              <span className="text-sm tracking-wide">View All News</span>
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
    </section>
  );
}
