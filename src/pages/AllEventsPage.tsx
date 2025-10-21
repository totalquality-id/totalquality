import Image from "next/image";
import { Calendar, MapPin, Users, Clock } from "lucide-react";

export default function AllEventsPage() {
  const events = [
    {
      title: "Legacy Training Camp",
      description:
        "Join industry leaders for an inspiring day of insights, networking, and transformative leadership strategies.",
      date: "January 9-11, 2026",
      time: "09:00 - 17:00 WIB",
      location: "Lembah Indah, Malang",
      attendees: "150+ Participants",
      image: "/images/events/legacy.jpg",
      badge: "Register Now",
      badgeColor: "bg-[#2B5589] text-white",
      category: "Training",
    },
    {
      title: "HR Innovation Workshop",
      description:
        "Discover cutting-edge HR practices and tools that will revolutionize your talent management approach.",
      date: "April 22, 2025",
      time: "08:00 - 16:00 WIB",
      location: "Surabaya Business Park",
      attendees: "100+ Participants",
      image: "/images/events/legacy.jpg",
      badge: "Upcoming",
      badgeColor: "bg-[#FACC01] text-[#2B5589]",
      category: "Workshop",
    },
    {
      title: "Corporate Motivation Seminar",
      description:
        "Energize your team with powerful motivational techniques and real-world success stories from top executives.",
      date: "May 10, 2025",
      time: "13:00 - 18:00 WIB",
      location: "Bali International Hub",
      attendees: "200+ Participants",
      image: "/images/events/legacy.jpg",
      badge: "Limited Seats",
      badgeColor: "bg-[#FACC01] text-[#2B5589]",
      category: "Seminar",
    },
    {
      title: "Quality Management Conference",
      description:
        "Annual conference bringing together quality management professionals to share best practices and innovations.",
      date: "June 15-16, 2025",
      time: "08:30 - 17:00 WIB",
      location: "Jakarta Convention Center",
      attendees: "300+ Participants",
      image: "/images/events/legacy.jpg",
      badge: "Early Bird",
      badgeColor: "bg-[#2B5589] text-white",
      category: "Conference",
    },
    {
      title: "Agent of Change Summit",
      description:
        "Celebrate and learn from our successful Agents of Change who have transformed their organizations.",
      date: "July 20, 2025",
      time: "09:00 - 16:00 WIB",
      location: "Surabaya Grand Hotel",
      attendees: "250+ Participants",
      image: "/images/events/legacy.jpg",
      badge: "Coming Soon",
      badgeColor: "bg-[#FACC01] text-[#2B5589]",
      category: "Summit",
    },
    {
      title: "Leadership Excellence Program",
      description:
        "Intensive program designed to develop next-generation leaders with strategic thinking and execution skills.",
      date: "August 5-7, 2025",
      time: "08:00 - 18:00 WIB",
      location: "Bandung Leadership Center",
      attendees: "80+ Participants",
      image: "/images/events/legacy.jpg",
      badge: "Registration Open",
      badgeColor: "bg-[#2B5589] text-white",
      category: "Program",
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
              Upcoming{" "}
              <span className="text-[#FACC01] font-normal">Events</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl font-light text-white/90 leading-tight max-w-3xl">
              Connect, learn, and grow with industry experts through our
              carefully curated events, workshops, and training programs.
            </p>
          </div>
        </div>
      </section>

      {/* Events Grid Section */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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

                  {/* Category */}
                  <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/90 text-xs font-light tracking-wide text-[#2B5589]">
                    {event.category}
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
                      <Clock className="w-4 h-4 text-[#FACC01] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-[#364153] font-light">
                          {event.time}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#2B5589] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-[#364153] font-light">
                          {event.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users className="w-4 h-4 text-[#FACC01] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-[#364153] font-light">
                          {event.attendees}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  {/* <div className="pt-2">
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 text-sm text-[#2B5589] font-light underline underline-offset-4 decoration-1 hover:text-[#1E3F69] group-hover:gap-3 transition-all duration-300"
                    >
                      <span>Register Now</span>
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
                  </div> */}
                </div>

                {/* Number Indicator */}
                {/* <div className="absolute top-52 right-6 text-6xl font-extralight text-gray-200 group-hover:text-gray-300 transition-colors duration-500 select-none">
                  0{index + 1}
                </div> */}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative p-12 lg:p-16 bg-gradient-to-br from-[#2B5589] to-[#3A6BA5] text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FACC01]/10 rounded-full blur-3xl" />

            <div className="relative max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tighter leading-tight">
                Can&apos;t Find the Right Event?
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-white/90 font-light leading-relaxed max-w-2xl mx-auto">
                Contact us to learn about custom training programs and private
                workshops tailored to your organization&apos;s needs.
              </p>
              <div>
                <a
                  href="/contact"
                  className="group inline-flex items-center gap-3 bg-white text-[#2B5589] font-light px-8 py-4 hover:bg-slate-50 transition-all duration-300"
                >
                  <span className="text-sm tracking-wide">Contact Us</span>
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
      </section>
    </div>
  );
}
