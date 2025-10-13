import { Users, Settings, TrendingUp } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Quality Empowerment System",
      description:
        "A structured mentoring program designed to enhance productivity and efficiency through motivation, team building, productive work culture development, and the creation of Agents of Change.",
      icon: <Users className="w-8 h-8 text-[#2B5589]" />,
      gradient: "from-[#2B5589]/10 to-[#3A6BA5]/5",
      accentColor: "bg-[#2B5589]",
      hoverBorder: "hover:border-[#2B5589]/30",
    },
    {
      title: "Quality Management System",
      description:
        "A structured, hands-on mentoring program to establish and implement an effective management system. Daily on-site guidance ensures smooth execution and leads to internationally recognized certification.",
      icon: <Settings className="w-8 h-8 text-[#FACC01]" />,
      gradient: "from-[#FACC01]/10 to-[#FDD835]/5",
      accentColor: "bg-[#FACC01]",
      hoverBorder: "hover:border-[#FACC01]/40",
    },
    {
      title: "Quality Improvement System",
      description:
        "A structured and continuous mentoring program to build a positive corporate culture through Agents of Change. Daily on-site assistance supports implementation, system alignment, and monitoring to improve overall effectiveness and productivity.",
      icon: <TrendingUp className="w-8 h-8 text-[#2B5589]" />,
      gradient: "from-[#2B5589]/10 to-[#FACC01]/5",
      accentColor: "bg-gradient-to-r from-[#2B5589] to-[#FACC01]",
      hoverBorder: "hover:border-[#2B5589]/30",
    },
  ];

  return (
    <section
      id="services"
      className="relative py-32 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden"
    >
      {/* Animated Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#FACC01]/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-20 right-10 w-80 h-80 bg-[#2B5589]/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      {/* Geometric Accents */}
      <div className="absolute top-32 right-1/4 w-16 h-16 border-2 border-[#FACC01]/30 rounded-lg rotate-45" />
      <div className="absolute bottom-32 left-1/3 w-20 h-20 border-2 border-[#2B5589]/20 rounded-full" />

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#FACC01]/20 rounded-full shadow-sm">
            <div className="w-2 h-2 bg-[#2B5589] rounded-full animate-pulse" />
            <span className="text-xs font-bold tracking-wider text-[#2B5589] uppercase">
              What We Offer
            </span>
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight leading-[1.05]">
            Our
            <span className="relative inline-block mx-4">
              <span className="bg-gradient-to-r from-[#2B5589] via-[#3A6BA5] to-[#2B5589] bg-clip-text text-transparent">
                Services
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#FACC01] via-[#FDD835] to-[#FACC01] rounded-full" />
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
            We provide total services
            {/* Transforming organizations through innovative solutions */}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative p-8 bg-gradient-to-br ${service.gradient} rounded-3xl border border-gray-200 ${service.hoverBorder} hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-2`}
            >
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="relative space-y-6">
                {/* Icon & Badge */}
                <div className="flex items-start justify-between">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <span className="text-3xl">{service.icon}</span>
                  </div>

                  <div
                    className={`w-2 h-2 ${service.accentColor} rounded-full group-hover:w-12 group-hover:h-2 transition-all duration-300`}
                  />
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-[#2B5589] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base">
                    {service.description}
                  </p>
                </div>

                {/* CTA Link */}
                <div className="pt-4">
                  <a
                    href="/services"
                    className="inline-flex items-center gap-2 text-[#2B5589] font-bold group-hover:gap-4 transition-all duration-300"
                  >
                    <span>Learn More</span>
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
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

              {/* Corner Accent */}
              <div className="absolute bottom-4 right-4 w-8 h-8 border-2 border-gray-300 rounded-lg rotate-12 opacity-20 group-hover:opacity-40 group-hover:rotate-45 transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <a
            href="/services"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#2B5589] to-[#3A6BA5] text-white font-bold px-10 py-5 rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <span>Explore All Services</span>
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
    </section>
  );
}
