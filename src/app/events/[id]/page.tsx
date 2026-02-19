"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import { useParams } from "next/navigation";

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
      {/* Hero Section — Image Only, no text overlay */}
      <section className="relative w-full h-[500px] sm:h-[550px] lg:h-[500px] overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-black/40 to-transparent z-10 pointer-events-none" />
        {event.image ? (
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0201FF] to-[#0000d1]">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#FACC01]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          </div>
        )}
      </section>

      {/* Event Details Section — unchanged structure & styling */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#2B5589]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-[#FACC01]/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="bg-white border border-gray-200 p-8 lg:p-12 space-y-12">
            {/* Title & description — moved down from hero, styled to match page tone */}
            <div className="space-y-4 border-b border-gray-100 pb-10">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tighter leading-tight text-[#1a1a1a]">
                {event.title}
              </h1>
              <p className="text-base sm:text-lg lg:text-xl font-light text-[#364153] leading-tight max-w-3xl">
                {event.description}
              </p>
            </div>

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
        </div>
      </section>
    </div>
  );
}
