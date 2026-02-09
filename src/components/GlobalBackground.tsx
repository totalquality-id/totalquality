"use client";

export default function GlobalBackground() {
  return (
    <>
      {/* Premium Multi-Color Background with Rich Gradients */}
      <div className="fixed inset-0 bg-[#0201FF] -z-50" />

      {/* Additional Gradient Layers for Depth with Color Accents */}
      {/* <div className="fixed inset-0 bg-gradient-to-tr from-[#0201FF]/20 via-[#06b6d4]/8 to-[#fbbf24]/15 -z-50" />
      <div className="fixed inset-0 bg-gradient-to-bl from-[#ec4899]/8 via-[#0201FF]/25 to-[#8b5cf6]/12 -z-50" />
      <div className="fixed inset-0 bg-gradient-to-tl from-[#10b981]/10 via-transparent to-[#0201FF]/15 -z-50" />
      <div className="fixed inset-0 bg-gradient-to-br from-transparent via-[#f97316]/8 to-[#0201FF]/12 -z-50" />
      <div className="fixed inset-0 bg-gradient-to-r from-[#0201FF]/12 via-transparent to-[#ec4899]/10 -z-50" />
      <div className="fixed inset-0 bg-gradient-to-l from-[#06b6d4]/12 via-[#0201FF]/8 to-[#FACC01]/10 -z-50" />
      <div className="fixed inset-0 bg-gradient-to-t from-[#8b5cf6]/10 via-transparent to-[#10b981]/8 -z-50" />
      <div className="fixed inset-0 bg-gradient-to-b from-[#f97316]/8 via-[#0201FF]/10 to-transparent -z-50" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(2,1,255,0.15),transparent_50%)] -z-50" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(250,204,1,0.1),transparent_50%)] -z-50" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(139,92,246,0.12),transparent_40%)] -z-50" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_15%_85%,rgba(6,182,212,0.1),transparent_45%)] -z-50" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(2,1,255,0.08),transparent_60%)] -z-50" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(236,72,153,0.09),transparent_50%)] -z-50" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(16,185,129,0.08),transparent_50%)] -z-50" /> */}

      {/* Dense Grid Pattern */}
      <div className="fixed inset-0 opacity-[0.04] -z-50">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Diagonal Grid Overlay */}
      <div className="fixed inset-0 opacity-[0.03] -z-50">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(-45deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Multiple Radial Gradient Spotlights with Colorful Accents */}
      <div className="fixed inset-0 -z-50">
        {/* Corner Spotlights */}
        <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-[#0201FF]/15 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-[620px] h-[620px] bg-[#06b6d4]/12 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[680px] h-[680px] bg-[#8b5cf6]/11 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[650px] h-[650px] bg-[#FACC01]/12 rounded-full blur-3xl" />

        {/* Edge Spotlights */}
        {/* <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[550px] h-[550px] bg-[#10b981]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[580px] h-[580px] bg-[#ec4899]/11 rounded-full blur-3xl" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-[#f97316]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#0201FF]/12 rounded-full blur-3xl" /> */}

        {/* Quarter Position Spotlights */}
        {/* <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#0201FF]/12 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-[480px] h-[480px] bg-[#FACC01]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-[520px] h-[520px] bg-[#06b6d4]/11 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#8b5cf6]/10 rounded-full blur-3xl" /> */}

        {/* Third Position Spotlights */}
        {/* <div className="absolute top-1/3 left-1/3 w-[550px] h-[550px] bg-[#ec4899]/9 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/3 w-[480px] h-[480px] bg-[#10b981]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/3 w-[460px] h-[460px] bg-[#f97316]/9 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-[540px] h-[540px] bg-[#0201FF]/11 rounded-full blur-3xl" /> */}

        {/* Center and Offset Spotlights */}
        {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#0201FF]/8 rounded-full blur-3xl" />
        <div className="absolute top-2/3 left-2/3 w-[420px] h-[420px] bg-[#06b6d4]/10 rounded-full blur-3xl" />
        <div className="absolute top-3/4 right-1/3 w-[380px] h-[380px] bg-[#FACC01]/11 rounded-full blur-3xl" />
        <div className="absolute top-1/6 left-2/3 w-[440px] h-[440px] bg-[#ec4899]/10 rounded-full blur-3xl" /> */}
      </div>

      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-50">
        {/* Floating Orbs - Top Section */}
        <div className="absolute top-10 left-20 w-32 h-32 bg-[#0201FF]/20 rounded-full blur-2xl animate-pulse" />
        <div
          className="absolute top-40 right-32 w-24 h-24 bg-[#FACC01]/15 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-20 left-1/3 w-20 h-20 bg-[#06b6d4]/20 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-60 right-1/4 w-28 h-28 bg-[#8b5cf6]/15 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />

        {/* Floating Orbs - Middle Section */}
        <div
          className="absolute top-1/3 left-10 w-36 h-36 bg-[#ec4899]/15 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute top-1/2 right-20 w-40 h-40 bg-[#0201FF]/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2.5s" }}
        />
        <div
          className="absolute top-2/5 left-1/2 w-24 h-24 bg-[#10b981]/20 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "1.8s" }}
        />
        <div
          className="absolute top-1/2 left-1/4 w-32 h-32 bg-[#f97316]/15 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "0.8s" }}
        />

        {/* Floating Orbs - Bottom Section */}
        <div
          className="absolute bottom-20 left-24 w-28 h-28 bg-[#FACC01]/20 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1.2s" }}
        />
        <div
          className="absolute bottom-40 right-16 w-32 h-32 bg-[#0201FF]/15 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "2.2s" }}
        />
        <div
          className="absolute bottom-32 left-2/3 w-20 h-20 bg-[#06b6d4]/20 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "1.6s" }}
        />
        <div
          className="absolute bottom-60 right-1/3 w-24 h-24 bg-[#ec4899]/15 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "0.3s" }}
        />

        {/* Geometric Lines - Diagonal */}
        <div className="absolute top-0 left-1/4 w-px h-96 bg-gradient-to-b from-[#0201FF]/30 via-[#0201FF]/10 to-transparent rotate-12" />
        <div className="absolute top-1/4 right-1/3 w-px h-80 bg-gradient-to-b from-[#FACC01]/25 via-[#FACC01]/8 to-transparent -rotate-12" />
        <div className="absolute top-1/3 left-1/2 w-px h-72 bg-gradient-to-b from-[#06b6d4]/30 via-[#06b6d4]/10 to-transparent rotate-6" />
        <div className="absolute bottom-0 right-1/4 w-px h-96 bg-gradient-to-t from-[#8b5cf6]/25 via-[#8b5cf6]/8 to-transparent -rotate-6" />
        <div className="absolute bottom-1/4 left-1/3 w-px h-64 bg-gradient-to-t from-[#ec4899]/30 via-[#ec4899]/10 to-transparent rotate-15" />

        {/* Geometric Lines - Horizontal */}
        <div className="absolute top-1/4 left-0 w-96 h-px bg-gradient-to-r from-transparent via-[#0201FF]/20 to-transparent" />
        <div className="absolute top-1/2 right-0 w-80 h-px bg-gradient-to-l from-transparent via-[#FACC01]/15 to-transparent" />
        <div className="absolute top-2/3 left-1/4 w-64 h-px bg-gradient-to-r from-transparent via-[#06b6d4]/20 to-transparent" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-px bg-gradient-to-l from-transparent via-[#8b5cf6]/15 to-transparent" />

        {/* Small Dots Pattern - Scattered */}
        <div className="absolute top-12 left-1/2 w-2 h-2 bg-[#0201FF]/40 rounded-full" />
        <div className="absolute top-24 right-1/3 w-1.5 h-1.5 bg-[#FACC01]/40 rounded-full" />
        <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-[#06b6d4]/40 rounded-full" />
        <div className="absolute top-1/2 right-1/2 w-1.5 h-1.5 bg-[#ec4899]/40 rounded-full" />
        <div className="absolute top-2/3 left-2/3 w-2 h-2 bg-[#8b5cf6]/40 rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-[#10b981]/40 rounded-full" />
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-[#f97316]/40 rounded-full" />
        <div className="absolute bottom-20 right-2/3 w-1.5 h-1.5 bg-[#0201FF]/40 rounded-full" />

        {/* Circle Rings */}
        <div className="absolute top-16 right-1/4 w-40 h-40 border border-[#0201FF]/10 rounded-full" />
        <div className="absolute top-20 right-1/4 w-32 h-32 border border-[#0201FF]/15 rounded-full" />
        <div className="absolute bottom-24 left-1/3 w-48 h-48 border border-[#FACC01]/10 rounded-full" />
        <div className="absolute bottom-28 left-1/3 w-40 h-40 border border-[#FACC01]/12 rounded-full" />
        <div className="absolute top-1/2 right-12 w-36 h-36 border border-[#06b6d4]/10 rounded-full" />
        <div className="absolute top-1/2 right-16 w-28 h-28 border border-[#06b6d4]/15 rounded-full" />

        {/* Square Elements */}
        <div className="absolute top-32 left-16 w-16 h-16 border border-[#8b5cf6]/15 rotate-45" />
        <div className="absolute bottom-40 right-24 w-20 h-20 border border-[#ec4899]/12 rotate-12" />
        <div className="absolute top-2/3 left-1/4 w-12 h-12 border border-[#10b981]/15 -rotate-12" />
        <div className="absolute top-1/4 right-1/3 w-14 h-14 border border-[#f97316]/12 rotate-45" />

        {/* Triangle Shapes */}
        <div className="absolute top-48 left-2/3 w-0 h-0 border-l-8 border-r-8 border-b-16 border-l-transparent border-r-transparent border-b-[#0201FF]/20 rotate-12" />
        <div className="absolute bottom-48 right-1/2 w-0 h-0 border-l-10 border-r-10 border-b-20 border-l-transparent border-r-transparent border-b-[#FACC01]/15 -rotate-45" />
        <div className="absolute top-1/3 right-16 w-0 h-0 border-l-6 border-r-6 border-b-12 border-l-transparent border-r-transparent border-b-[#06b6d4]/20 rotate-90" />

        {/* Curved Lines */}
        <div className="absolute top-1/4 left-0 w-64 h-64 border-2 border-[#0201FF]/10 rounded-full -translate-x-32" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 border-2 border-[#FACC01]/8 rounded-full translate-x-36" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 border border-[#8b5cf6]/10 rounded-full -translate-x-1/2 -translate-y-1/2" />

        {/* Plus Signs */}
        <div className="absolute top-40 right-40">
          <div className="w-8 h-0.5 bg-[#ec4899]/30 absolute top-1/2 left-0 -translate-y-1/2" />
          <div className="w-0.5 h-8 bg-[#ec4899]/30 absolute left-1/2 top-0 -translate-x-1/2" />
        </div>
        <div className="absolute bottom-32 left-40">
          <div className="w-6 h-0.5 bg-[#10b981]/30 absolute top-1/2 left-0 -translate-y-1/2" />
          <div className="w-0.5 h-6 bg-[#10b981]/30 absolute left-1/2 top-0 -translate-x-1/2" />
        </div>
        <div className="absolute top-2/3 right-1/3">
          <div className="w-10 h-0.5 bg-[#0201FF]/25 absolute top-1/2 left-0 -translate-y-1/2" />
          <div className="w-0.5 h-10 bg-[#0201FF]/25 absolute left-1/2 top-0 -translate-x-1/2" />
        </div>
      </div>
    </>
  );
}
