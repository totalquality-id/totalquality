"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroData {
  id: number;
  image: string;
}

interface HeroContentData {
  heading: string;
  subheading?: string;
  ctaText?: string;
  ctaLink?: string;
}

export default function Hero() {
  const [slides, setSlides] = useState<HeroData[]>([]);
  const [content, setContent] = useState<HeroContentData | null>(null);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Slider Images
        const imgRes = await fetch("/api/hero");
        const imgData = await imgRes.json();

        // Fetch Text Content
        const textRes = await fetch("/api/hero-content");
        const textData = await textRes.json();

        if (Array.isArray(imgData) && imgData.length > 0) {
          setSlides(imgData);
        } else {
          setSlides([{ id: 0, image: "/hero-lg.svg" }]);
        }

        if (textData && !textData.error) {
          setContent(textData);
        }
      } catch (error) {
        console.error("Error fetching hero data", error);
        setSlides([{ id: 0, image: "/hero-lg.svg" }]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const nextSlide = useCallback(() => {
    setCurrent((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  }, [slides.length]);

  const prevSlide = () => {
    setCurrent((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  };

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [slides.length, nextSlide]);

  if (loading)
    return <div className="min-h-screen bg-gray-100 animate-pulse" />;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 pb-6 px-4 md:pt-18 md:px-6 lg:pt-34 lg:pb-8"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* CONTAINER UTAMA: 
        Memiliki 'min-h' yang memberikan tinggi pada elemen ini.
        Class 'relative' penting agar anak-anaknya (absolute) mengacu ke sini.
      */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto rounded-2xl overflow-hidden shadow-xl min-h-[calc(104vh-120px)] sm:min-h-[calc(105vh-140px)] md:min-h-[calc(106vh-150px)] lg:min-h-[calc(102vh-180px)] group">
        {slides.map((slide, index) => (
          /* SLIDE INDIVIDUAL:
             Gunakan 'absolute inset-0' agar div ini mengisi PENUH Container Utama.
             Ini memberikan dimensi tinggi/lebar yang dibutuhkan oleh Image 'fill'.
          */

          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* IMAGE:
               'fill' akan mengisi parent terdekat yang memiliki posisi (absolute/relative).
               Dalam hal ini, parentnya adalah div slide di atas (absolute inset-0).
            */}

            <Image
              src={slide.image}
              alt={"Hero Image"}
              fill
              priority={index === 0} // Priority true hanya untuk slide pertama (LCP fix)
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1280px"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black z-10" />
            {/* Overlay Opsional agar teks lebih terbaca jika ada */}
            {/* <div className="absolute inset-0 bg-black/10" /> */}
          </div>
        ))}

        {content && (
          <div className="relative z-20 w-full max-w-[600px] h-full flex flex-col justify-end lg:pb-6 min-h-[60vh] md:min-h-[80vh]">
            {/* Logic Responsive:
             - text-center (Mobile/Default)
             - md:text-left (Desktop)
             - items-center (Mobile flex align)
             - md:items-start (Desktop flex align)
          */}
            <div className="flex flex-col gap-4 text-white px-4 md:px-12 w-full md:max-w-3xl items-center md:items-start text-center md:text-left">
              {/* Heading: Besar, Bold, Responsive Font Size */}
              <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tighter leading-12 md:leading-15 lg:leading-17 drop-shadow-lg">
                {content.heading}
              </h1>

              {/* Subheading */}
              {content.subheading && (
                <p className="text-lg sm:text-xl md:text-2xl text-gray-100 max-w-2xl drop-shadow-md">
                  {content.subheading}
                </p>
              )}

              {/* CTA Button */}
              {content.ctaText && (
                <a
                  href={content.ctaLink || "#"}
                  className="mt-4 px-8 py-4 bg-white hover:bg-[#FACC01] text-black text-lg font-bold uppercase tracking-wider rounded-full transition-transform shadow-xl"
                >
                  {content.ctaText}
                </a>
              )}
            </div>
          </div>
        )}

        {/* Navigation Arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="text-white w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="text-white w-6 h-6" />
            </button>

            {/* Dots Pagination */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    current === idx ? "bg-white scale-125" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
