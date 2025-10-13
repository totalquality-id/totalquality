export default function Events() {
  const events = [
    {
      title: "Legacy Training Camp",
      description:
        "Join industry leaders for an inspiring day of insights, networking, and transformative leadership strategies.",
      date: "January 9-11, 2025",
      location: "Lembah Indah, Malang",
      emoji: "🎯",
      badge: "Register Now",
      badgeColor: "bg-[#2B5589] text-white",
    },
    {
      title: "HR Innovation Workshop",
      description:
        "Discover cutting-edge HR practices and tools that will revolutionize your talent management approach.",
      date: "April 22, 2025",
      location: "Surabaya Business Park",
      emoji: "💡",
      badge: "Upcoming",
      badgeColor: "bg-[#FACC01] text-[#2B5589]",
    },
    {
      title: "Corporate Motivation Seminar",
      description:
        "Energize your team with powerful motivational techniques and real-world success stories from top executives.",
      date: "May 10, 2025",
      location: "Bali International Hub",
      emoji: "⚡",
      badge: "Limited Seats",
      badgeColor: "bg-gradient-to-r from-[#FACC01] to-[#FDD835] text-[#2B5589]",
    },
  ];

  return (
    <section
      id="events"
      className="relative py-32 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden"
    >
      {/* Animated Decorative Elements */}
      <div className="absolute top-20 right-10 w-80 h-80 bg-[#2B5589]/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-20 left-10 w-72 h-72 bg-[#FACC01]/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      {/* Geometric Accents */}
      <div className="absolute top-40 left-1/4 w-20 h-20 border-2 border-[#2B5589]/20 rounded-lg rotate-12" />
      <div className="absolute bottom-40 right-1/3 w-16 h-16 border-2 border-[#FACC01]/30 rounded-full" />

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#2B5589]/20 rounded-full shadow-sm">
            <div className="w-2 h-2 bg-[#FACC01] rounded-full animate-pulse" />
            <span className="text-xs font-bold tracking-wider text-[#2B5589] uppercase">
              Don't Miss Out
            </span>
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight leading-[1.05]">
            Upcoming
            <span className="relative inline-block mx-4">
              <span className="bg-gradient-to-r from-[#2B5589] via-[#3A6BA5] to-[#2B5589] bg-clip-text text-transparent">
                Events
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#FACC01] via-[#FDD835] to-[#FACC01] rounded-full" />
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
            Connect, learn, and grow with industry experts
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {events.map((event, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl border border-gray-200 hover:border-gray-300 hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2"
            >
              {/* Gradient Header */}
              <div className="relative h-32 bg-gradient-to-br from-[#2B5589]/10 via-[#FACC01]/5 to-[#2B5589]/5 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/50" />

                {/* Floating Emoji */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <span className="text-4xl">{event.emoji}</span>
                </div>

                {/* Badge */}
                <div
                  className={`absolute top-4 right-4 px-3 py-1.5 ${event.badgeColor} rounded-full text-xs font-bold uppercase tracking-wider shadow-lg`}
                >
                  {event.badge}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-5">
                {/* Title */}
                <h3 className="text-2xl font-black text-gray-900 group-hover:text-[#2B5589] transition-colors duration-300">
                  {event.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed text-base">
                  {event.description}
                </p>

                {/* Event Details */}
                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#2B5589]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">📅</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                        Date
                      </p>
                      <p className="text-sm font-bold text-gray-900">
                        {event.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#FACC01]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">📍</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                        Location
                      </p>
                      <p className="text-sm font-bold text-gray-900">
                        {event.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  <a
                    href="/events"
                    className="group/btn w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#2B5589] to-[#3A6BA5] text-white font-bold px-6 py-4 rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    <span>View Details</span>
                    <svg
                      className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300"
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

              {/* Corner Decoration */}
              <div className="absolute bottom-4 right-4 w-8 h-8 border-2 border-gray-200 rounded-lg rotate-12 opacity-0 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
