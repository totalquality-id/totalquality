import Image from "next/image";

export default function ForumSection() {
  const forumPosts = [
    {
      quote:
        "Kemauan dari diri sendiri untuk berubah menjadi lebih baik adalah inti dari perubahan yang positif sesungguhnya.",
      author: "Johan Yan",
      likes: 124,
    },
    {
      quote:
        "Rejeki besar akan datang pada orang yang bermimpi besar, bergerak besar, berkorban besar dan berkontribusi besar!",
      author: "Yusuf Adi Pura",
      likes: 109,
    },
    {
      quote:
        "Dengan bermalas-malas takkan tercapai apa yang diidamkan; dengan bekerja keras orang mendapat kekayaan.",
      author: "Johan Yan",
      likes: 120,
    },
  ];

  return (
    <section
      id="forum-section"
      className="relative py-8 sm:py-10 lg:py-12 bg-slate-50"
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
              <span className="text-[#2B5589] font-normal">
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

              {/* Likes Badge - Outside card, bottom right corner */}
              <div className="absolute bottom-1 right-3 z-10">
                <button
                  className="flex items-center gap-2.5 bg-white px-4 py-2.5 rounded-full border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300 cursor-pointer"
                  aria-label={`Like quote by ${post.author}. Currently ${post.likes} likes`}
                  type="button"
                >
                  <Image
                    src="/like.png"
                    alt="Like"
                    width={16}
                    height={16}
                    className="w-4 h-4 object-cover"
                  />
                  <span className="text-[#364153] text-sm font-light">
                    {post.likes}
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
              className="group inline-flex items-center gap-3 bg-[#2B5589] text-white font-light px-8 py-4 hover:bg-[#1E3F69] transition-all duration-300"
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
    </section>
  );
}
