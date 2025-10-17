import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";

export default function EventSection() {
  const events = [
    {
      title: "Legacy Training Camp",
      description:
        "Join industry leaders for an inspiring day of insights, networking, and transformative leadership strategies.",
      date: "January 9-11, 2026",
      location: "Lembah Indah, Malang",
      image: "/images/events/legacy.jpg",
      badge: "Register Now",
      badgeColor: "bg-[#2B5589] text-white",
    },
    {
      title: "HR Innovation Workshop",
      description:
        "Discover cutting-edge HR practices and tools that will revolutionize your talent management approach.",
      date: "April 22, 2025",
      location: "Surabaya Business Park",
      image: "/images/events/legacy.jpg",
      badge: "Upcoming",
      badgeColor: "bg-[#FACC01] text-[#2B5589]",
    },
    {
      title: "Corporate Motivation Seminar",
      description:
        "Energize your team with powerful motivational techniques and real-world success stories from top executives.",
      date: "May 10, 2025",
      location: "Bali International Hub",
      image: "/images/events/legacy.jpg",
      badge: "Limited Seats",
      badgeColor: "bg-[#FACC01] text-[#2B5589]",
    },
  ];

  return (
    <section
      id="event-section"
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
            Don&apos;t Miss Out
          </h2>
          <div className="w-full h-[1px] bg-gray-300 mb-8"></div>

          <div className="max-w-4xl">
            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter text-[#1a1a1a] leading-tight mb-4">
              Upcoming{" "}
              <span className="text-[#2B5589] font-normal">Events</span>
            </h3>
            <p className="text-base sm:text-lg lg:text-xl font-light tracking-tight text-[#364153] mt-4">
              Connect, learn, and grow with industry experts
            </p>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {events.map((event, index) => (
            <article
              key={index}
              className="group relative bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-500 overflow-hidden"
            >
              {/* Image Header */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />

                {/* Badge */}
                <div
                  className={`absolute top-4 right-4 px-3 py-1.5 ${event.badgeColor} text-xs font-light tracking-wide`}
                >
                  {event.badge}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-6">
                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-light tracking-tight text-[#1a1a1a] group-hover:text-[#2B5589] transition-colors duration-300">
                  {event.title}
                </h3>

                {/* Description */}
                <p className="text-sm lg:text-base text-[#364153] leading-relaxed font-light">
                  {event.description}
                </p>

                {/* Event Details */}
                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-[#2B5589] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-[#364153] font-light">
                        {event.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#FACC01] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-[#364153] font-light">
                        {event.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Link */}
                <div className="pt-2">
                  <a
                    href="/events"
                    className="inline-flex items-center gap-2 text-sm text-[#2B5589] font-light underline underline-offset-4 decoration-1 hover:text-[#1E3F69] group-hover:gap-3 transition-all duration-300"
                  >
                    <span>View Details</span>
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
              <div className="absolute top-52 right-6 text-6xl font-extralight text-gray-200 group-hover:text-gray-300 transition-colors duration-500 select-none">
                0{index + 1}
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 sm:mt-20 border-t border-gray-200 pt-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="max-w-xl">
              <p className="text-base sm:text-lg lg:text-xl font-light tracking-tight text-[#364153]">
                Stay updated on our latest events and opportunities to connect
                with industry leaders.
              </p>
            </div>

            <a
              href="/events"
              className="group inline-flex items-center gap-3 bg-[#2B5589] text-white font-light px-8 py-4 hover:bg-[#1E3F69] transition-all duration-300"
            >
              <span className="text-sm tracking-wide">View All Events</span>
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
