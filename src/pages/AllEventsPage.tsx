"use client";

import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location?: string;
  image?: string;
}

export default function AllEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/events");

        if (!res.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* Hero Section */}
      <section className="relative py-20 sm:py-24 lg:py-32 bg-[#15156b] text-white overflow-hidden">
        {/* 1. Base Gradient Layer - Meniru kedalaman GlobalBackground */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background: `radial-gradient(circle at 0% 0%, #0201FF 0%, transparent 40%), 
                         radial-gradient(circle at 100% 100%, #0201FF 0%, transparent 40%)`,
          }}
        />

        {/* 2. Mesh Grid - Disamakan ukurannya (60px) dan opasitasnya */}
        <div className="absolute inset-0 opacity-[0.05]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* 3. Soft Spotlights - Aksen dinamis khas GlobalBackground */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-[#0201FF]/20 rounded-full blur-[120px] animate-pulse"
            style={{ animationDuration: "8s" }}
          />
          <div
            className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-[#0201FF]/15 rounded-full blur-[120px] animate-pulse"
            style={{ animationDuration: "10s" }}
          />
        </div>

        {/* 4. Noise Texture Overlay - Memberikan kesan premium matte */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none brightness-100 contrast-150"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter leading-tight mb-6 mt-16">
              Latest <span className="text-[#FACC01] font-normal">News</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl font-light text-white/80 leading-tight max-w-3xl">
              Insights, updates, and stories from our journey of transforming
              organizations across Southeast Asia.
            </p>
          </div>
        </div>
      </section>

      {/* Events Grid Section */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        {loading && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
            <p className="text-[#364153] font-light">Loading events...</p>
          </div>
        )}

        {error && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
            <p className="text-red-600 font-light">{error}</p>
          </div>
        )}

        {!loading && !error && events.length === 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
            <p className="text-[#364153] font-light">
              No events available at the moment.
            </p>
          </div>
        )}

        {!loading && !error && events.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {events.map((event) => (
                <article
                  key={event.id}
                  className="group relative bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-500 overflow-hidden"
                >
                  {/* Image Header */}
                  <div className="relative h-48 overflow-hidden">
                    {event.image ? (
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#2B5589] to-[#0201FF] flex items-center justify-center">
                        <svg
                          className="w-20 h-20 text-white/20"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent" />
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
                            {formatDate(event.date)}
                          </p>
                        </div>
                      </div>

                      {event.location && (
                        <div className="flex items-start gap-3">
                          <MapPin className="w-4 h-4 text-[#2B5589] mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-[#364153] font-light">
                              {event.location}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* CTA Section */}
      {/* <section className="relative py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative p-12 lg:p-16 bg-[#0201FF] text-white overflow-hidden">
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
      </section> */}
    </div>
  );
}
