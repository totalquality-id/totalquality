import Image from "next/image";

export default function Forum() {
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

        {/* Forum Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {forumPosts.map((post, index) => (
            <article key={index} className="group relative">
              {/* Card Content */}
              <div className="p-8 bg-white rounded-[20px] border-[1.5px] border-[#d9d9d9] hover:border-gray-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Content */}
                <div className="space-y-6">
                  {/* Quote Text */}
                  <blockquote className="text-[#364153] leading-relaxed text-lg font-light min-h-[140px]">
                    &quot;{post.quote}&quot;
                  </blockquote>

                  {/* Author Info */}
                  <cite className="block font-bold text-[#364153] text-base not-italic">
                    {post.author}
                  </cite>
                </div>
              </div>

              {/* Likes Badge - Outside card, bottom right corner */}
              <div className="absolute -bottom-4 right-2 z-10">
                <button
                  className="flex items-center gap-2.5 bg-white px-4 py-2.5 rounded-full shadow-[0px_4px_10px_-3px_rgba(0,0,0,0.25),inset_0px_4px_10px_-3px_rgba(0,0,0,0.1)] border-[0.5px] border-[#d9d9d9] cursor-pointer transition-transform hover:scale-105 active:scale-95"
                  aria-label={`Like quote by ${post.author}. Currently ${post.likes} likes`}
                  type="button"
                >
                  <Image
                    src="/like.png"
                    alt="Like"
                    width={18}
                    height={18}
                    className="w-[18px] h-[18px] object-cover"
                  />
                  <span className="text-black text-base font-semibold">
                    {post.likes}
                  </span>
                </button>
              </div>
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
