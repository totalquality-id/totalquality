import Image from "next/image";

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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {forumPosts.map((post, index) => (
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

                {/* Number Indicator */}
                <div className="absolute top-4 right-4 text-5xl font-extralight text-gray-200 group-hover:text-gray-300 transition-colors duration-500 select-none">
                  {index < 9 ? `0${index + 1}` : index + 1}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Community CTA Section */}
      <section className="relative py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative p-12 lg:p-16 bg-gradient-to-br from-[#2B5589] to-[#3A6BA5] text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FACC01]/10 rounded-full blur-3xl" />

            <div className="relative max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tighter leading-tight">
                Become an Agent of Change
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-white/90 font-light leading-relaxed max-w-2xl mx-auto">
                Join our community of transformational leaders and share your
                journey of creating positive change in your organization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-3 bg-white text-[#2B5589] font-light px-8 py-4 hover:bg-slate-50 transition-all duration-300"
                >
                  <span className="text-sm tracking-wide">Join Our Forum</span>
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
                <a
                  href="/about"
                  className="group inline-flex items-center justify-center gap-3 bg-transparent border border-white text-white font-light px-8 py-4 hover:bg-white/10 transition-all duration-300"
                >
                  <span className="text-sm tracking-wide">Learn More</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
