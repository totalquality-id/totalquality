export default function AllNewsPage() {
  const newsArticles = [
    {
      title: "New Partnership with Regional Leaders",
      summary:
        "We're thrilled to announce strategic collaborations with top organizations across Southeast Asia to expand our impact.",
      fullContent:
        "This partnership marks a significant milestone in our mission to transform organizational culture across the region. By joining forces with leading companies, we aim to create a network of excellence that benefits all stakeholders.",
      date: "March 8, 2025",
      category: "Partnership",
      emoji: "🤝",
      categoryColor: "bg-[#2B5589] text-white",
      author: "Corporate Relations Team",
    },
    {
      title: "Award-Winning HR Innovation Program",
      summary:
        "Our latest HR transformation framework has been recognized as the most innovative solution in corporate development.",
      fullContent:
        "The award recognizes our commitment to developing cutting-edge solutions that address the evolving needs of modern organizations. This framework has already been implemented successfully in over 50 companies.",
      date: "February 22, 2025",
      category: "Achievement",
      emoji: "🏆",
      categoryColor: "bg-[#FACC01] text-[#2B5589]",
      author: "Innovation Team",
    },
    {
      title: "Upcoming Leadership Summit 2025",
      summary:
        "Join us for the biggest leadership conference of the year featuring world-class speakers and networking opportunities.",
      fullContent:
        "The summit will feature keynote speeches from industry leaders, interactive workshops, and networking sessions designed to foster collaboration and knowledge sharing among participants.",
      date: "February 15, 2025",
      category: "Event",
      emoji: "📢",
      categoryColor: "bg-[#2B5589] text-white",
      author: "Events Team",
    },
    {
      title: "500+ Agents of Change Milestone",
      summary:
        "We've reached a remarkable milestone with over 500 certified Agents of Change across Southeast Asia.",
      fullContent:
        "This achievement reflects our dedication to building sustainable change capabilities within organizations. Each Agent of Change represents a beacon of transformation in their respective companies.",
      date: "January 30, 2025",
      category: "Achievement",
      emoji: "🎯",
      categoryColor: "bg-[#FACC01] text-[#2B5589]",
      author: "Training Team",
    },
    {
      title: "New Digital Platform Launch",
      summary:
        "Introducing our new digital learning platform that makes quality management training more accessible than ever.",
      fullContent:
        "The platform features interactive courses, live mentoring sessions, and a community forum where participants can connect and share experiences. This marks a new era in our training delivery.",
      date: "January 15, 2025",
      category: "Innovation",
      emoji: "💡",
      categoryColor: "bg-[#2B5589] text-white",
      author: "Technology Team",
    },
    {
      title: "Expansion to Three New Countries",
      summary:
        "We're expanding our services to Vietnam, Thailand, and the Philippines, bringing our expertise to new markets.",
      fullContent:
        "This expansion allows us to serve a broader client base and share our proven methodologies with organizations across Southeast Asia. Local teams are already in place to ensure seamless service delivery.",
      date: "December 20, 2024",
      category: "Partnership",
      emoji: "🌏",
      categoryColor: "bg-[#FACC01] text-[#2B5589]",
      author: "Business Development",
    },
    {
      title: "ISO Certification Success Rate Hits 98%",
      summary:
        "Our clients continue to achieve exceptional results with a 98% success rate in obtaining ISO certification.",
      fullContent:
        "This outstanding achievement is a testament to our comprehensive mentoring approach and hands-on support throughout the certification process. We're proud to have helped hundreds of organizations achieve international recognition.",
      date: "December 10, 2024",
      category: "Achievement",
      emoji: "📊",
      categoryColor: "bg-[#2B5589] text-white",
      author: "Quality Assurance Team",
    },
    {
      title: "Annual Report 2024 Released",
      summary:
        "Our 2024 annual report showcases significant growth and impact across all service lines and regions.",
      fullContent:
        "The report highlights key achievements including serving 400+ companies, training 10,000+ professionals, and maintaining a 95% client satisfaction rate. We're grateful for the trust our clients place in us.",
      date: "November 25, 2024",
      category: "Company News",
      emoji: "📈",
      categoryColor: "bg-[#FACC01] text-[#2B5589]",
      author: "Management Team",
    },
    {
      title: "New Research on Corporate Culture",
      summary:
        "Our latest research paper reveals key insights into building sustainable organizational culture in modern workplaces.",
      fullContent:
        "The research, conducted over 12 months with 200+ organizations, provides data-driven insights into the factors that contribute to lasting cultural transformation and employee engagement.",
      date: "November 10, 2024",
      category: "Research",
      emoji: "🔬",
      categoryColor: "bg-[#2B5589] text-white",
      author: "Research Team",
    },
  ];

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
              Latest <span className="text-[#FACC01] font-normal">News</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl font-light text-white/90 leading-tight max-w-3xl">
              Insights, updates, and stories from our journey of transforming
              organizations across Southeast Asia.
            </p>
          </div>
        </div>
      </section>

      {/* News Grid Section */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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

                  {/* Emoji Icon */}
                  <div className="w-14 h-14 bg-white border border-gray-200 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                    <span className="text-2xl">{article.emoji}</span>
                  </div>
                </div>

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
                    <span>{article.date}</span>
                    <span className="text-[#364153]/50">•</span>
                    <span>{article.author}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl lg:text-2xl font-light tracking-tight text-[#1a1a1a] leading-tight group-hover:text-[#2B5589] transition-colors duration-300">
                    {article.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-sm lg:text-base text-[#364153] leading-relaxed font-light">
                    {article.summary}
                  </p>

                  {/* Full Content Preview */}
                  <p className="text-xs text-[#364153]/80 leading-relaxed font-light border-t border-gray-100 pt-4">
                    {article.fullContent}
                  </p>

                  {/* CTA Link */}
                  <div className="pt-2">
                    <a
                      href="/contact"
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

                {/* Number Indicator */}
                <div className="absolute top-36 right-6 text-6xl font-extralight text-gray-200 group-hover:text-gray-300 transition-colors duration-500 select-none">
                  0{index + 1}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative p-12 lg:p-16 bg-gradient-to-br from-[#2B5589] to-[#3A6BA5] text-white overflow-hidden">
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
      </section>
    </div>
  );
}
