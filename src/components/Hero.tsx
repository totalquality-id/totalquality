export default function Hero() {
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
          backgroundImage: "url('hero.jpg')",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2B5589]/70 via-[#2B5589]/50 to-[#FACC01]/30" />
      <div className="absolute inset-0 bg-black/20" />

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 h-full flex flex-col justify-between py-32">
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-none mb-3">
            <span className="text-white">The Best</span>
            <br />
            <span className="text-[#FACC01]">Corporate Motivator</span>
            <br />
            <span className="text-white">in Southeast Asia</span>
          </h1>

          <p className="text-xl text-white/90 leading-tight max-w-2xl mb-6">
            Empowering organizations through transformative leadership and
            strategic excellence.
          </p>

          <div className="flex gap-4">
            <a
              href="#about"
              className="group inline-flex items-center gap-2 text-white text-lg font-semibold border-b-2 border-white pb-1 transition-all duration-300 hover:border-[#FACC01] hover:text-[#FACC01]"
            >
              Discover More
              <span className="transition-transform duration-300">→</span>
            </a>
          </div>
        </div>

        {/* Statistics Section - Aligned to bottom */}
        <div className="w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="relative group">
              <div className="relative bg-black/10 backdrop-blur-sm border border-white/50 rounded-2xl shadow-[inset_0_1px_0px_rgba(255,255,255,0.75),0_0_9px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)] p-6 text-white before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/60 before:via-transparent before:to-transparent before:opacity-70 before:pointer-events-none after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-tl after:from-white/30 after:via-transparent after:to-transparent after:opacity-50 after:pointer-events-none transition-all duration-500 hover:shadow-[inset_0_1px_0px_rgba(255,255,255,0.85),0_0_12px_rgba(0,0,0,0.25),0_4px_10px_rgba(0,0,0,0.2)]">
                <div className="relative z-10">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1 drop-shadow-lg">
                    300+
                  </div>
                  <div className="text-xs md:text-sm text-white/90 font-medium drop-shadow">
                    Companies Served
                  </div>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="relative bg-black/10 backdrop-blur-sm border border-white/50 rounded-2xl shadow-[inset_0_1px_0px_rgba(255,255,255,0.75),0_0_9px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)] p-6 text-white before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/60 before:via-transparent before:to-transparent before:opacity-70 before:pointer-events-none after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-tl after:from-white/30 after:via-transparent after:to-transparent after:opacity-50 after:pointer-events-none transition-all duration-500 hover:shadow-[inset_0_1px_0px_rgba(255,255,255,0.85),0_0_12px_rgba(0,0,0,0.25),0_4px_10px_rgba(0,0,0,0.2)]">
                <div className="relative z-10">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1 drop-shadow-lg">
                    20+
                  </div>
                  <div className="text-xs md:text-sm text-white/90 font-medium drop-shadow">
                    Years Experiences
                  </div>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="relative bg-black/10 backdrop-blur-sm border border-white/50 rounded-2xl shadow-[inset_0_1px_0px_rgba(255,255,255,0.75),0_0_9px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)] p-6 text-white before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/60 before:via-transparent before:to-transparent before:opacity-70 before:pointer-events-none after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-tl after:from-white/30 after:via-transparent after:to-transparent after:opacity-50 after:pointer-events-none transition-all duration-500 hover:shadow-[inset_0_1px_0px_rgba(255,255,255,0.85),0_0_12px_rgba(0,0,0,0.25),0_4px_10px_rgba(0,0,0,0.2)]">
                <div className="relative z-10">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1 drop-shadow-lg">
                    98%
                  </div>
                  <div className="text-xs md:text-sm text-white/90 font-medium drop-shadow">
                    Client Satisfication
                  </div>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="relative bg-black/10 backdrop-blur-sm border border-white/50 rounded-2xl shadow-[inset_0_1px_0px_rgba(255,255,255,0.75),0_0_9px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)] p-6 text-white before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/60 before:via-transparent before:to-transparent before:opacity-70 before:pointer-events-none after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-tl after:from-white/30 after:via-transparent after:to-transparent after:opacity-50 after:pointer-events-none transition-all duration-500 hover:shadow-[inset_0_1px_0px_rgba(255,255,255,0.85),0_0_12px_rgba(0,0,0,0.25),0_4px_10px_rgba(0,0,0,0.2)]">
                <div className="relative z-10">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1 drop-shadow-lg">
                    50K+
                  </div>
                  <div className="text-xs md:text-sm text-white/90 font-medium drop-shadow">
                    People Trained
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
