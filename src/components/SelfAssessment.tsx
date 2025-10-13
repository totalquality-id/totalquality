import {
  Zap,
  Target,
  BarChart3,
  ClipboardList,
  Search,
  Gift,
} from "lucide-react";

export default function SelfAssessment() {
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
      className="relative py-32 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden"
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
        <div className="text-center mb-20 space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#FACC01]/20 rounded-full shadow-sm">
            <div className="w-2 h-2 bg-[#2B5589] rounded-full animate-pulse" />
            <span className="text-xs font-bold tracking-wider text-[#2B5589] uppercase">
              Discover Your Path
            </span>
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight leading-[1.05]">
            Self
            <span className="relative inline-block mx-4">
              <span className="bg-gradient-to-r from-[#2B5589] via-[#3A6BA5] to-[#2B5589] bg-clip-text text-transparent">
                Assessment
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#FACC01] via-[#FDD835] to-[#FACC01] rounded-full" />
            </span>
          </h2>

          <p className="text-xl text-gray-600 font-light leading-relaxed">
            Discover which of our services best fit your needs through a quick
            self-assessment quiz.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Features Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {assessmentFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative p-8 bg-white rounded-3xl border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-center space-y-4">
                    <div className="inline-flex w-16 h-16 bg-gradient-to-br from-[#2B5589]/10 to-[#FACC01]/10 rounded-2xl items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 mx-auto">
                      <IconComponent className="w-8 h-8 text-[#2B5589]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* How It Works Section */}
          <div className="relative p-10 sm:p-12 bg-gradient-to-br from-[#2B5589]/5 via-white to-[#FACC01]/5 rounded-[3rem] border border-gray-200 overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FACC01]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2B5589]/10 rounded-full blur-3xl" />

            <div className="relative space-y-12">
              {/* Title */}
              <div className="text-center space-y-3">
                <h3 className="text-3xl sm:text-4xl font-black text-gray-900">
                  How It Works
                </h3>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Three simple steps to find your perfect solution
                </p>
              </div>

              {/* Steps Grid */}
              <div className="grid md:grid-cols-3 gap-8">
                {steps.map((step, index) => {
                  const IconComponent = step.icon;
                  return (
                    <div key={index} className="group relative">
                      {/* Connector Line (hidden on last item) */}
                      {index < steps.length - 1 && (
                        <div className="hidden md:block absolute top-20 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[#2B5589]/30 to-transparent" />
                      )}

                      <div className="relative space-y-4">
                        {/* Number Badge */}
                        <div className="relative inline-flex">
                          <div className="w-16 h-16 bg-gradient-to-br from-[#2B5589] to-[#3A6BA5] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                            <span className="text-white font-black text-xl">
                              {step.number}
                            </span>
                          </div>
                          {/* Icon Badge */}
                          <div className="absolute -top-2 -right-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-100">
                            <IconComponent className="w-5 h-5 text-[#2B5589]" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-2">
                          <h4 className="text-xl font-black text-gray-900">
                            {step.title}
                          </h4>
                          <p className="text-gray-600 leading-relaxed">
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

          {/* CTA Hero Section */}
          <div className="relative p-12 sm:p-20 bg-gradient-to-br from-[#2B5589] to-[#3A6BA5] rounded-[3rem] text-white overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FACC01]/20 rounded-full blur-3xl" />

            {/* Floating Icons */}
            <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-2xl rotate-12 animate-pulse" />
            <div
              className="absolute bottom-10 left-10 w-16 h-16 bg-[#FACC01]/20 rounded-full animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />

            <div className="relative max-w-3xl mx-auto text-center space-y-8">
              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-3xl sm:text-5xl font-black leading-tight">
                  Ready to Find Your Perfect Solution?
                </h3>
                <p className="text-xl text-white/90 font-light leading-relaxed max-w-2xl mx-auto">
                  Take our quick assessment and receive personalized
                  recommendations tailored to your organization&apos;s unique
                  needs.
                </p>
              </div>

              {/* Features Badges */}
              <div className="flex flex-wrap justify-center gap-3 py-4">
                {["Free", "5 Minutes", "No Sign-Up Required"].map(
                  (badge, index) => (
                    <div
                      key={index}
                      className="px-5 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30"
                    >
                      <span className="text-sm font-bold text-white">
                        {badge}
                      </span>
                    </div>
                  )
                )}
              </div>

              {/* Button */}
              <div className="pt-6">
                <a
                  href="/self-assessment"
                  className="group inline-flex items-center gap-4 bg-white text-[#2B5589] font-black px-12 py-6 rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105 text-lg"
                >
                  <span>Start Assessment</span>
                  <div className="flex items-center gap-1">
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
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
