"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location?: string;
  image?: string;
}

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        if (!params?.id) {
          setError(true);
          setLoading(false);
          return;
        }

        const res = await fetch(`/api/events/${params.id}`);
        if (!res.ok) {
          setError(true);
          return;
        }
        const data = await res.json();
        setEvent(data);
      } catch (err) {
        console.error("Error fetching event:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [params]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (loading) {
    return (
      <div
        className="min-h-screen bg-white flex items-center justify-center"
        style={{ fontFamily: "Inter, system-ui, sans-serif" }}
      >
        <p className="text-[#364153] font-light text-lg">Loading event...</p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div
        className="min-h-screen bg-white flex items-center justify-center"
        style={{ fontFamily: "Inter, system-ui, sans-serif" }}
      >
        <div className="text-center space-y-6 px-4">
          <h2 className="text-3xl font-light text-[#1a1a1a]">
            Event Not Found
          </h2>
          <p className="text-[#364153] font-light">
            The event you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <a
            href="/event"
            className="inline-flex items-center gap-2 text-[#2B5589] font-light hover:text-[#1E3F69] transition-colors"
          >
            <span>Back to Events</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* Hero Section with Image */}
      <section className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-[#0201FF]-70 to-[#0000d1]-50 text-white overflow-hidden">
        {/* Background Image */}
        {event.image && (
          <>
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0201FF]/80 via-[#0201FF]/70 to-[#0000d1]/90" />
          </>
        )}

        {/* Fallback blur circles if no image */}
        {!event.image && (
          <>
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#FACC01]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          </>
        )}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter leading-tight mb-6 mt-16">
              {event.title}
            </h1>
            <p className="text-base sm:text-lg lg:text-xl font-light text-white/90 leading-tight max-w-3xl">
              {event.description}
            </p>
          </div>
        </div>
      </section>

      {/* Event Details Section */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#2B5589]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-[#FACC01]/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Event Information Card */}
          <div className="bg-white border border-gray-200 p-8 lg:p-12 space-y-12">
            {/* Event Details Grid */}
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-8">
                {/* Date & Time */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 p-3 bg-[#0201FF]/5 rounded-lg h-fit">
                    <Calendar className="w-6 h-6 text-[#0201FF]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-light text-[#1a1a1a]">
                      Date & Time
                    </h3>
                    <p className="text-base text-[#364153] font-light">
                      {formatDate(event.date)}
                    </p>
                    <p className="text-sm text-[#364153]/70 font-light">
                      {formatTime(event.date)}
                    </p>
                  </div>
                </div>

                {/* Location */}
                {event.location && (
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 p-3 bg-[#FACC01]/10 rounded-lg h-fit">
                      <MapPin className="w-6 h-6 text-[#FACC01]" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-light text-[#1a1a1a]">
                        Location
                      </h3>
                      <p className="text-base text-[#364153] font-light">
                        {event.location}
                      </p>
                    </div>
                  </div>
                )}
                {/* About This Event */}
                <div className="space-y-6">
                  <div className="prose prose-lg max-w-none">
                    <p className="text-base lg:text-lg text-[#364153] leading-relaxed font-light whitespace-pre-line">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Register CTA */}
          <div className="mt-12 p-8 lg:p-10 bg-gradient-to-br from-[#0201FF] to-[#0000d1] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FACC01]/10 rounded-full blur-3xl" />

            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="max-w-xl space-y-2">
                <h3 className="text-2xl lg:text-3xl font-light tracking-tight">
                  Interested in Attending?
                </h3>
                <p className="text-sm lg:text-base text-white/90 font-light">
                  Register now to secure your spot at this exclusive event.
                </p>
              </div>

              <a
                href="/contact"
                className="group inline-flex items-center gap-3 bg-white text-[#0201FF] font-light px-8 py-4 hover:bg-slate-50 transition-all duration-300 flex-shrink-0"
              >
                <span className="text-sm tracking-wide">Register Now</span>
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

      {/* Related Events Section */}
      <section className="relative py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-base sm:text-lg font-light tracking-tighter text-[#364153] mb-1">
              More Events
            </h2>
            <div className="w-full h-[1px] bg-gray-300 mt-4 mb-8"></div>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tighter text-[#1a1a1a]">
              Other{" "}
              <span className="text-[#0201FF] font-normal">
                Upcoming Events
              </span>
            </h3>
          </div>

          <div className="text-center">
            <a
              href="/event"
              className="group inline-flex items-center gap-3 bg-[#0201FF] text-white font-light px-8 py-4 hover:bg-[#0000d1] transition-all duration-300"
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
      </section>
    </div>
  );
}
