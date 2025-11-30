"use client";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();

    const target = document.querySelector(targetId);
    if (target) {
      const yOffset = -80;
      const y =
        target.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-17 pb-6 px-4 md:pt-18 md:px-6 lg:pt-34 lg:pb-8"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* Main Hero Container */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto rounded-2xl overflow-hidden shadow-xl min-h-[calc(104vh-120px)] sm:min-h-[calc(105vh-140px)] md:min-h-[calc(106vh-150px)] lg:min-h-[calc(102vh-180px)]">
        {/* Background Image with Enhanced Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/hero-test.jpg"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
          {/* Sophisticated Multi-Layer Overlay */}
          {/* <div className="absolute inset-0 bg-gradient-to-br from-black/65 via-black/45 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" /> */}
        </div>

        
      </div>
    </section>
  );
}
