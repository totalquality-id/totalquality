import {
  Zap,
  Target,
  BarChart3,
  ClipboardList,
  Search,
  Gift,
} from "lucide-react";

export default function SelfAssessmentSection() {
  const assessmentFeatures = [
    {
      icon: Zap,
      title: "Quick & Easy",
      description: "Complete in just 5 minutes",
    },
    {
      icon: Target,
      title: "Personalized Results",
      description: "Get tailored recommendations",
    },
    {
      icon: BarChart3,
      title: "Instant Insights",
      description: "Understand your needs immediately",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Answer Questions",
      description: "Simple multiple-choice questions about your organization",
      icon: ClipboardList,
    },
    {
      number: "02",
      title: "Get Analysis",
      description: "AI-powered analysis of your needs and challenges",
      icon: Search,
    },
    {
      number: "03",
      title: "Receive Recommendations",
      description: "Customized service recommendations for your goals",
      icon: Gift,
    },
  ];

  return (
    <section
      id="self-assessment"
      className="relative py-16 sm:py-20 lg:py-24 bg-white"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* Subtle Background Elements */}
      <div className="absolute top-1/4 right-10 w-72 h-72 bg-[#FACC01]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-10 w-64 h-64 bg-[#2B5589]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-base sm:text-2xl md:text-xl lg:text-2xl font-light tracking-tighter text-[#364153] mb-1">
            Discover Your Path
          </h2>
          <div className="w-full h-[1px] bg-gray-300 mb-8"></div>

          <div className="max-w-4xl">
            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter text-[#1a1a1a] leading-tight mb-4">
              Self{" "}
              <span className="text-[#2B5589] font-normal">Assessment</span>
            </h3>
            <p className="text-base sm:text-lg lg:text-xl font-light tracking-tight text-[#364153] mt-4">
              Discover which of our services best fit your needs through a quick
              self-assessment quiz.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-12 lg:space-y-16">
          {/* Features Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {assessmentFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative p-8 lg:p-10 bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="text-center space-y-4">
                    <div className="inline-flex w-14 h-14 bg-slate-50 border border-gray-200 items-center justify-center mx-auto group-hover:border-gray-300 transition-all duration-300">
                      <IconComponent className="w-6 h-6 text-[#2B5589]" />
                    </div>
                    <div>
                      <h3 className="text-lg lg:text-xl font-light tracking-tight text-[#1a1a1a] mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-[#364153] leading-relaxed font-light">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* How It Works Section */}
          <div className="relative p-10 lg:p-12 bg-white border border-gray-200 overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FACC01]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2B5589]/5 rounded-full blur-3xl" />

            <div className="relative space-y-10 lg:space-y-12">
              {/* Title */}
              <div className="text-center space-y-3">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tighter text-[#1a1a1a]">
                  How It Works
                </h3>
                <p className="text-[#364153] text-base lg:text-lg font-light max-w-2xl mx-auto">
                  Three simple steps to find your perfect solution
                </p>
              </div>

              {/* Steps Grid */}
              <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
                {steps.map((step, index) => {
                  const IconComponent = step.icon;
                  return (
                    <div key={index} className="group relative">
                      {/* Connector Line (hidden on last item) */}
                      {index < steps.length - 1 && (
                        <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gray-200" />
                      )}

                      <div className="relative space-y-4">
                        {/* Number Badge */}
                        <div className="relative inline-flex">
                          <div className="w-16 h-16 bg-[#2B5589] flex items-center justify-center group-hover:bg-[#1E3F69] transition-all duration-300">
                            <span className="text-white font-light text-xl tracking-tight">
                              {step.number}
                            </span>
                          </div>
                          {/* Icon Badge */}
                          <div className="absolute -top-4 -right-4 w-10 h-10 bg-white border border-gray-200 flex items-center justify-center rounded-full">
                            <IconComponent className="w-5 h-5 text-[#2B5589]" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-2">
                          <h4 className="text-lg lg:text-xl font-light tracking-tight text-[#1a1a1a]">
                            {step.title}
                          </h4>
                          <p className="text-sm text-[#364153] leading-relaxed font-light">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 sm:mt-20 border-t border-gray-200 pt-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="max-w-xl">
              <p className="text-base sm:text-lg lg:text-xl font-light tracking-tight text-[#364153]">
                Take our quick assessment and receive personalized
                recommendations tailored to your organization&apos;s unique
                needs.
              </p>
            </div>

            <a
              href="/forum"
              className="group inline-flex items-center gap-3 bg-[#2B5589] text-white font-light px-8 py-4 hover:bg-[#1E3F69] transition-all duration-300"
            >
              <span className="text-sm tracking-wide">Start Assessment</span>
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
