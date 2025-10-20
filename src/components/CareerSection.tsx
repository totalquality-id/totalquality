import { TrendingUp, Award, Sparkles, Scale } from "lucide-react";

export default function CareerSection() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Growth Opportunities",
      description: "Continuous learning and career development programs",
    },
    {
      icon: Award,
      title: "Competitive Benefits",
      description: "Comprehensive compensation and healthcare packages",
    },
    {
      icon: Sparkles,
      title: "Innovative Culture",
      description: "Work with passionate teams on impactful projects",
    },
    {
      icon: Scale,
      title: "Work-Life Balance",
      description: "Flexible schedules and remote work options",
    },
  ];

  return (
    <section
      id="career-section"
      className="relative py-8 sm:py-10 lg:py-12 bg-white"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* Subtle Background Elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#2B5589]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-[#FACC01]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-base sm:text-2xl md:text-xl lg:text-2xl font-light tracking-tighter text-[#364153] mb-1">
            Join Our Team
          </h2>
          <div className="w-full h-[1px] bg-gray-300 mb-8"></div>

          <div className="max-w-4xl">
            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter text-[#1a1a1a] leading-tight mb-4">
              Build Your{" "}
              <span className="text-[#2B5589] font-normal">Career</span> With Us
            </h3>
            <p className="text-base sm:text-lg lg:text-xl font-light tracking-tight text-[#364153] mt-4">
              Join our team and grow with us. Explore available jobs, learn
              about our work culture, and read inspiring employee stories.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-12 lg:space-y-16">
          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={index}
                  className="group relative p-6 lg:p-8 bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-slate-50 border border-gray-200 flex items-center justify-center group-hover:border-gray-300 transition-all duration-300">
                      <IconComponent className="w-6 h-6 text-[#2B5589]" />
                    </div>
                    <div>
                      <h3 className="text-base lg:text-lg font-light tracking-tight text-[#1a1a1a] mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-[#364153] leading-relaxed font-light">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="relative p-12 lg:p-16 bg-gradient-to-br from-[#2B5589] to-[#3A6BA5] text-white overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FACC01]/10 rounded-full blur-3xl" />

            <div className="relative max-w-4xl mx-auto space-y-8 lg:space-y-12">
              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tighter leading-tight">
                  Ready to Make an Impact?
                </h3>
                <p className="text-base sm:text-lg lg:text-xl text-white/90 font-light leading-8 max-w-2xl">
                  Join us and play your part in driving productivity,
                  profitability, and extraordinary success.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 lg:gap-8 py-6 border-y border-white/20">
                {[
                  { number: "20+", label: "Years Experience" },
                  { number: "400+", label: "Corporate Partner" },
                  { number: "100+", label: "Agent of Change" },
                ].map((stat, index) => (
                  <div key={index} className="space-y-2">
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tighter text-[#FACC01]">
                      {stat.number}
                    </div>
                    <div className="text-xs sm:text-sm text-white/80 font-light tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Button */}
              <div>
                <a
                  href="/career"
                  className="group inline-flex items-center gap-3 bg-white text-[#2B5589] font-light px-8 py-4 hover:bg-slate-50 transition-all duration-300"
                >
                  <span className="text-sm tracking-wide">
                    See Opportunities
                  </span>
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
        </div>
      </div>
    </section>
  );
}
