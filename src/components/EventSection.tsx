"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Calendar, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location?: string;
  image?: string;
}

export default function EventSection() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    // Reset show full description when changing events
    setShowFullDescription(false);
  }, [currentIndex]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? events.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === events.length - 1 ? 0 : prev + 1));
  };

  const handleEventClick = () => {
    if (currentEvent) {
      window.location.href = `/events/${currentEvent.id}`;
    }
  };

  const currentEvent = events[currentIndex];

  // Truncate description to approximately 150 characters
  const truncateDescription = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  if (loading) {
    return (
      <section
        id="event"
        className="relative py-16 sm:py-20 lg:py-24 bg-white min-h-screen flex items-center justify-center"
        style={{ fontFamily: "Inter, system-ui, sans-serif" }}
      >
        <p className="text-[#364153] font-light text-lg">Loading events...</p>
      </section>
    );
  }

  if (events.length === 0) {
    return (
      <section
        id="event"
        className="relative py-16 sm:py-20 lg:py-24 bg-white min-h-screen flex items-center justify-center"
        style={{ fontFamily: "Inter, system-ui, sans-serif" }}
      >
        <p className="text-[#364153] font-light text-lg">
          No upcoming events at the moment. Check back soon!
        </p>
      </section>
    );
  }

  return (
    <section
      id="event"
      className="relative w-full min-h-screen overflow-hidden cursor-pointer"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
      onClick={handleEventClick}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        {currentEvent?.image ? (
          <Image
            src={currentEvent.image}
            alt={currentEvent.title}
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-700"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#2B5589] to-[#1a2942] flex items-center justify-center">
            <Calendar className="w-32 h-32 text-white/20" />
          </div>
        )}

        {/* Multi-Layer Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-black/35 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4 sm:left-8 lg:left-12 z-20">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="w-12 h-12 sm:w-14 sm:h-14 backdrop-blur-md bg-white/10 border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl hover:bg-white/20 group/btn"
          aria-label="Previous event"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 text-white transition-transform duration-300 group-hover/btn:-translate-x-0.5" />
        </button>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 right-4 sm:right-8 lg:right-12 z-20">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="w-12 h-12 sm:w-14 sm:h-14 backdrop-blur-md bg-white/10 border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl hover:bg-white/20 group/btn"
          aria-label="Next event"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-white transition-transform duration-300 group-hover/btn:translate-x-0.5" />
        </button>
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full min-h-screen flex flex-col justify-end px-4 sm:px-8 lg:px-16 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-4xl">
          {/* Title */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter text-white leading-tighter mb-6 sm:mb-8">
            {currentEvent.title}
          </h2>

          {/* Description with Read More */}
          <div className="mb-6 sm:mb-8">
            <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-tight font-light max-w-3xl">
              {showFullDescription
                ? currentEvent.description
                : truncateDescription(currentEvent.description)}
            </p>
            {currentEvent.description.length > 150 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFullDescription(!showFullDescription);
                }}
                className="mt-3 text-sm sm:text-base text-[#FACC01] font-light hover:text-[#ffd700] transition-colors duration-300 underline underline-offset-4"
              >
                {showFullDescription ? "Tampilkan lebih sedikit" : "Tampilkan lebih banyak"}
              </button>
            )}
          </div>

          {/* Event Details */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-[#FACC01] flex-shrink-0" />
              <p className="text-sm sm:text-base text-white/90 font-light">
                {formatDate(currentEvent.date)}
              </p>
            </div>

            {currentEvent.location && (
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#FACC01] flex-shrink-0" />
                <p className="text-sm sm:text-base text-white/90 font-light">
                  {currentEvent.location}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Event Counter/Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {events.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(index);
            }}
            className={`transition-all duration-300 ${
              index === currentIndex
                ? "w-8 h-2 bg-white"
                : "w-2 h-2 bg-white/40 hover:bg-white/60"
            } rounded-full`}
            aria-label={`Go to event ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}