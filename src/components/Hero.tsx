import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Hero1 from "./../../public/images/hero/hero-1.png";
import Hero2 from "./../../public/images/hero/hero-2.png";
import Hero3 from "./../../public/images/hero/hero-3.png";

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
    {
      title: "AOC Community",
      image: Hero3,
      link: "#community",
    },
  ];

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden"
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
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 h-full flex flex-col justify-between py-32">
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-6xl md:text-5xl lg:text-7xl font-bold tracking-tighter leading-none mb-3">
            <span className="text-amber-300">The Best</span>
            <br />
            <span className="text-white">Corporate Motivator</span>
          </h1>

          <p className="text-lg text-white/90 leading-tight tracking-tight font-extralight max-w-2xl mb-6">
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
        <div className="w-full mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {boxes.map((box, index) => (
              <a
                key={index}
                href={box.link}
                className="relative group overflow-hidden shadow-lg transition-all duration-500 flex flex-col bg-white h-48"
              >
                {/* Image Container - akan expand saat hover */}
                <div className="absolute inset-0 w-full h-40 group-hover:h-full transition-all duration-500 overflow-hidden">
                  <Image
                    src={box.image}
                    alt={box.title}
                    fill
                    className="object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Dark overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500" />
                </div>

                {/* Button - positioned right side */}
                <div className="absolute top-32 right-6 transform -translate-y-1/2 z-40">
                  <button
                    className="flex items-center justify-center bg-[#2a5488] rounded-full w-12 h-12 shadow-lg hover:bg-[#1e3f6b] group-hover:bg-transparent transition-colors duration-300"
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
                <div className="absolute bottom-0 left-0 right-0 z-30 px-6 py-5 bg-white group-hover:bg-transparent transition-all group-hover:-translate-y-4 duration-500">
                  <h2 className="text-lg font-extralight tracking-tighter text-[#1a1a1a] group-hover:text-white transition-all group-hover:-translate-y-4 duration-500">
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
