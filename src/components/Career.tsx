export default function Career() {
  const benefits = [
    {
      icon: "🚀",
      title: "Growth Opportunities",
      description: "Continuous learning and career development programs",
    },
    {
      icon: "💼",
      title: "Competitive Benefits",
      description: "Comprehensive compensation and healthcare packages",
    },
    {
      icon: "🌟",
      title: "Innovative Culture",
      description: "Work with passionate teams on impactful projects",
    },
    {
      icon: "🎯",
      title: "Work-Life Balance",
      description: "Flexible schedules and remote work options",
    },
  ];

  return (
    <section
      id="career"
      className="relative py-32 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden"
    >
      {/* Animated Decorative Elements */}
      <div className="absolute top-20 right-10 w-80 h-80 bg-[#2B5589]/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-20 left-10 w-72 h-72 bg-[#FACC01]/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      {/* Geometric Accents */}
      <div className="absolute top-40 left-1/4 w-20 h-20 border-2 border-[#FACC01]/30 rounded-lg rotate-12" />
      <div className="absolute bottom-40 right-1/4 w-16 h-16 border-2 border-[#2B5589]/20 rounded-full" />

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#2B5589]/20 rounded-full shadow-sm">
            <div className="w-2 h-2 bg-[#FACC01] rounded-full animate-pulse" />
            <span className="text-xs font-bold tracking-wider text-[#2B5589] uppercase">
              Join Our Team
            </span>
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight leading-[1.05]">
            Build Your
            <span className="relative inline-block mx-4">
              <span className="bg-gradient-to-r from-[#2B5589] via-[#3A6BA5] to-[#2B5589] bg-clip-text text-transparent">
                Career
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#FACC01] via-[#FDD835] to-[#FACC01] rounded-full" />
            </span>
            <br />
            With Us
          </h2>

          <p className="text-xl text-gray-600 font-light leading-relaxed">
            Join our team and grow with us. Explore available jobs, learn about
            our work culture, and read inspiring employee stories.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group relative p-6 bg-white rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#2B5589]/10 to-[#FACC01]/10 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <span className="text-3xl">{benefit.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="relative p-12 sm:p-16 bg-gradient-to-br from-[#2B5589] to-[#3A6BA5] rounded-[3rem] text-white overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FACC01]/20 rounded-full blur-3xl" />

            <div className="relative max-w-3xl mx-auto text-center space-y-8">
              {/* Icon */}
              <div className="inline-flex w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl items-center justify-center">
                <span className="text-5xl">✨</span>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-3xl sm:text-4xl font-black">
                  Ready to Make an Impact?
                </h3>
                <p className="text-xl text-white/90 font-light">
                  Discover open positions and become part of our mission to
                  transform organizations across Southeast Asia.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 py-8">
                {[
                  { number: "20+", label: "Years Experience" },
                  { number: "300+", label: "Projects Delivered" },
                  { number: "100+", label: "Agent of Change" },
                ].map((stat, index) => (
                  <div key={index} className="space-y-2">
                    <div className="text-4xl sm:text-5xl font-black text-[#FACC01]">
                      {stat.number}
                    </div>
                    <div className="text-sm text-white/80 font-semibold uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Button */}
              <div className="pt-4">
                <a
                  href="/career"
                  className="group inline-flex items-center gap-3 bg-white text-[#2B5589] font-bold px-12 py-6 rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <span className="text-lg">See Opportunities</span>
                  <svg
                    className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300"
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
        </div>
      </div>
    </section>
  );
}
