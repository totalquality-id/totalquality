import { Users, Settings, TrendingUp } from "lucide-react";

export default function ServiceSection() {
  const services = [
    {
      title: "Quality Empowerment System",
      description:
        "A structured mentoring program designed to enhance productivity and efficiency through motivation, team building, productive work culture development, and the creation of Agents of Change.",
      icon: <Users className="w-7 h-7 text-[#2B5589]" />,
      gradient: "from-[#2B5589]/5 to-white",
      accentColor: "bg-[#2B5589]",
      hoverBorder: "hover:border-[#2B5589]/40",
    },
    {
      title: "Quality Management System",
      description:
        "A structured, hands-on mentoring program to establish and implement an effective management system. Daily on-site guidance ensures smooth execution and leads to internationally recognized certification.",
      icon: <Settings className="w-7 h-7 text-[#FACC01]" />,
      gradient: "from-[#FACC01]/5 to-white",
      accentColor: "bg-[#FACC01]",
      hoverBorder: "hover:border-[#FACC01]/40",
    },
    {
      title: "Quality Improvement System",
      description:
        "A structured and continuous mentoring program to build a positive corporate culture through Agents of Change. Daily on-site assistance supports implementation, system alignment, and monitoring to improve overall effectiveness and productivity.",
      icon: <TrendingUp className="w-7 h-7 text-[#2B5589]" />,
      gradient: "from-[#2B5589]/5 to-white",
      accentColor: "bg-gradient-to-r from-[#2B5589] to-[#FACC01]",
      hoverBorder: "hover:border-[#2B5589]/40",
    },
  ];

  return (
    <section
      id="services-section"
      className="relative py-8 sm:py-10 lg:py-12 bg-white"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* Subtle Background Elements */}
      <div className="absolute top-1/4 right-10 w-64 h-64 bg-[#FACC01]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-10 w-72 h-72 bg-[#2B5589]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-base sm:text-2xl md:text-xl lg:text-2xl font-light tracking-tighter text-[#364153] mb-1">
            What We Offer
          </h2>
          <div className="w-full h-[1px] bg-gray-300 mb-8"></div>

          <div className="max-w-4xl">
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tighter text-[#1a1a1a] md:leading-14 lg:leading-16 mb-6">
              Comprehensive Solutions for{" "}
              <span className="text-[#2B5589] font-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                Organizational Excellence
              </span>
            </h3>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative p-8 lg:p-10 bg-gradient-to-br ${service.gradient} border border-gray-200 ${service.hoverBorder} hover:shadow-lg transition-all duration-500 overflow-hidden`}
            >
              {/* Hover Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="relative space-y-6">
                {/* Icon */}
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 bg-white border border-gray-200 flex items-center justify-center group-hover:border-gray-300 transition-all duration-300">
                    {service.icon}
                  </div>

                  <div
                    className={`w-1.5 h-1.5 ${service.accentColor} group-hover:w-10 group-hover:h-1.5 transition-all duration-500`}
                  />
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-xl lg:text-2xl font-light tracking-tight text-[#1a1a1a] mb-4 group-hover:text-[#2B5589] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm lg:text-base text-[#364153] leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>

                {/* CTA Link */}
                <div className="pt-2">
                  <a
                    href="/services"
                    className="inline-flex items-center gap-2 text-sm text-[#2B5589] tracking-tight font-normal underline underline-offset-4 decoration-1 hover:text-[#1E3F69] group-hover:gap-3 transition-all duration-300"
                  >
                    <span>Learn More</span>
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

              {/* Number Indicator */}
              <div className="absolute top-6 right-6 text-6xl font-extralight text-gray-200 group-hover:text-gray-300 transition-colors duration-500 select-none">
                0{index + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 sm:mt-20 border-t border-gray-200 pt-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="max-w-xl">
              <p className="text-base sm:text-lg lg:text-xl font-light tracking-tight text-[#364153]">
                Ready to transform your organization? Let&apos;s discuss how our
                services can help you achieve excellence.
              </p>
            </div>

            <a
              href="/services"
              className="group inline-flex items-center gap-3 bg-[#2B5589] text-white font-light px-8 py-4 hover:bg-[#1E3F69] transition-all duration-300"
            >
              <span className="text-sm tracking-wide">
                Explore All Services
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
    </section>
  );
}
