export default function About() {
  return (
    <section
      id="about"
      className="relative py-32 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden"
    >
      {/* Animated Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-[#2B5589]/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-20 left-10 w-80 h-80 bg-[#FACC01]/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      {/* Geometric Accents */}
      <div className="absolute top-40 left-1/4 w-20 h-20 border-2 border-[#2B5589]/20 rounded-lg rotate-12" />
      <div className="absolute bottom-40 right-1/4 w-16 h-16 border-2 border-[#FACC01]/30 rounded-full" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
        {/* Section Header - Centered & Punchy */}
        <div className="text-center mb-24 space-y-6">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight leading-[1.05]">
            Leading Change in
            <br />
            <span className="relative inline-block mt-2">
              <span className="bg-gradient-to-r from-[#2B5589] via-[#3A6BA5] to-[#2B5589] bg-clip-text text-transparent animate-gradient">
                Southeast Asia
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#FACC01] via-[#FDD835] to-[#FACC01] rounded-full" />
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
            Empowering organizations through strategic HR solutions
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Side - Text Content */}
          <div className="lg:col-span-5 space-y-10">
            {/* Description with Modern Cards */}
            <div className="space-y-5">
              <div className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-[#2B5589]/30 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <p className="text-base text-gray-700 leading-relaxed">
                    We are Southeast Asia's premier human resources consulting
                    and corporate motivator company, dedicated to empowering
                    organizations through strategic HR solutions and inspiring
                    transformative change.
                  </p>
                </div>
              </div>

              <div className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-[#FACC01]/40 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <p className="text-base text-gray-700 leading-relaxed">
                    With over a decade of expertise, we've partnered with
                    hundreds of organizations across the region, unlocking team
                    potential and driving sustainable growth through innovative
                    leadership development and organizational excellence.
                  </p>
                </div>
              </div>

              <div className="group p-6 bg-gradient-to-br from-[#2B5589]/5 to-[#FACC01]/5 rounded-2xl border border-gray-100 hover:border-[#2B5589]/30 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <p className="text-base text-gray-700 leading-relaxed font-medium">
                    Our mission is to create lasting impact by fostering
                    cultures of continuous improvement, empowerment, and
                    success.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button - Gen Z Style */}
            <div className="pt-4">
              <a
                href="/about"
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#2B5589] to-[#3A6BA5] text-white font-bold px-10 py-5 rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#FACC01]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative">Learn More About Us</span>
                <svg
                  className="relative w-5 h-5 group-hover:translate-x-2 transition-transform duration-300"
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

          {/* Right Side - Founder Card with Modern Touch */}
          <div className="lg:col-span-7">
            <div className="relative max-w-2xl mx-auto lg:ml-auto lg:mr-0">
              {/* Floating Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#FACC01] rounded-2xl rotate-12 opacity-20 blur-xl animate-pulse" />
              <div
                className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#2B5589] rounded-full opacity-10 blur-2xl animate-pulse"
                style={{ animationDelay: "0.5s" }}
              />

              {/* Main Card */}
              <div className="relative bg-white rounded-[2rem] shadow-2xl overflow-hidden group hover:shadow-[0_20px_70px_rgba(43,85,137,0.3)] transition-all duration-500">
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src="/johan.png"
                    alt="Founder"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Gradient Overlay with Modern Touch */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />

                  {/* Animated Border */}
                  <div className="absolute inset-0 border-4 border-transparent group-hover:border-[#FACC01]/30 rounded-[2rem] transition-all duration-500" />
                </div>

                {/* Founder Info - Modern Layout */}
                <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10">
                  <div className="space-y-4">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FACC01] rounded-full">
                      <div className="w-1.5 h-1.5 bg-[#2B5589] rounded-full animate-pulse" />
                      <span className="text-[#2B5589] font-black text-xs uppercase tracking-wider">
                        Founder & Visionary
                      </span>
                    </div>

                    <div>
                      <h3 className="text-4xl sm:text-5xl font-black text-white mb-1 tracking-tight">
                        Johan Yan
                      </h3>
                    </div>

                    {/* Quote Card */}
                    <div className="relative p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                      <div className="absolute -top-2 -left-2 text-4xl text-[#FACC01] opacity-50">
                        "
                      </div>
                      <p className="text-white/95 text-sm sm:text-base leading-relaxed italic">
                        Dengan bermalas-malas takkan tercapai apa yang
                        diidamkan; dengan bekerja keras orang mendapat kekayaan.
                      </p>
                      <p className="text-[#FACC01] text-sm font-bold mt-3">
                        ~ Johan Yan
                      </p>
                    </div>
                  </div>
                </div>

                {/* Top Corner Badge */}
                <div className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-br from-[#FACC01] to-[#FDD835] rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-xl">⭐</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
