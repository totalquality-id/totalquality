"use client";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Hero1 from "./../../public/images/hero/hero-1.png";
import Hero2 from "./../../public/images/hero/hero-2.png";
// import Hero3 from "./../../public/images/hero/hero-3.png";

export default function Hero() {
  const boxes = [
    {
      title: "About us",
      image: Hero1,
      link: "#about",
    },
    {
      title: "Our Services",
      image: Hero2,
      link: "#services",
    },
    // {
    //   title: "AOC Community",
    //   image: Hero3,
    //   link: "#community",
    // },
  ];

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('hero.jpeg')",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2B5589]/50 via-[#2B5589]/30 to-[#FACC01]/10" />
      <div className="absolute inset-0 bg-black/65" />

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-between py-20 sm:py-24 md:py-32 min-h-screen">
        <div className="flex-1 flex flex-col justify-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter leading-none mb-3 sm:mb-4">
            <span className="text-amber-300">The Best</span>
            <br />
            <span className="text-white">Corporate Motivator</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-tight tracking-tight font-light max-w-2xl mb-6">
            <span className="text-white">
              Empowering organizations through transformative
            </span>
            <br />
            <span className="text-white">
              leadership and strategic excellence.
            </span>
          </p>

          {/* <div className="flex gap-4">
            <a
              href="#about"
              className="group inline-flex items-center gap-2 text-white text-lg font-extralight border-b-1 border-white pb-1 transition-all duration-300 hover:border-[#FACC01] hover:text-[#FACC01]"
            >
              Discover More
              <span className="transition-transform duration-300">→</span>
            </a>
          </div> */}
        </div>

        {/* Replaced Statistics Section */}
        <div className="w-full pb-4 sm:pb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {boxes.map((box, index) => (
              <a
                key={index}
                href={box.link}
                onClick={(e) => handleSmoothScroll(e, box.link)}
                className="relative group overflow-hidden shadow-lg transition-all duration-500 flex flex-col bg-white h-40 sm:h-44 md:h-48 cursor-pointer"
              >
                <div className="absolute inset-0 w-full h-32 sm:h-36 md:h-40 group-hover:h-full transition-all duration-500 overflow-hidden">
                  <Image
                    src={box.image}
                    alt={box.title}
                    fill
                    className="object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500" />
                </div>

                <div className="absolute top-28 sm:top-29 md:top-32 right-4 sm:right-6 transform -translate-y-1/2 z-40">
                  <button
                    className="flex items-center justify-center bg-[#364153] rounded-full w-10 h-10 sm:w-12 sm:h-12 shadow-lg hover:bg-[#FACC01] group-hover:bg-transparent transition-colors duration-300"
                    aria-label={`Go to ${box.title}`}
                  >
                    <ArrowRight
                      size={18}
                      strokeWidth={2.5}
                      className="text-white"
                    />
                  </button>
                </div>

                {/* Title Container - always on top */}
                <div className="absolute bottom-0 left-0 right-0 z-30 px-4 sm:px-6 py-3 sm:py-4 md:py-5 bg-white group-hover:bg-transparent transition-all group-hover:-translate-y-4 duration-500">
                  <h2 className="text-base sm:text-lg font-light tracking-tighter text-[#1a1a1a] group-hover:text-white transition-all group-hover:-translate-y-4 duration-500">
                    {box.title}
                  </h2>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
