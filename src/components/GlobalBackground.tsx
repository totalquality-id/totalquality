"use client";

export default function GlobalBackground() {
  return (
    <>
      {/* Premium Navy Blue Background with Gradients */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#1a2942] via-[#2B5589] to-[#1e3a5f] -z-50" />

      {/* Additional Gradient Layers for Depth */}
      <div className="fixed inset-0 bg-gradient-to-tr from-[#0201FF]/10 via-transparent to-[#FACC01]/10 -z-50" />
      <div className="fixed inset-0 bg-gradient-to-bl from-transparent via-[#2B5589]/50 to-transparent -z-50" />

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

      {/* Multiple Radial Gradient Spotlights */}
      <div className="fixed inset-0 -z-50">
        <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-[#0201FF]/8 rounded-full blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#0201FF]/6 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[650px] h-[650px] bg-[#FACC01]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#FACC01]/6 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/3 rounded-full blur-3xl" />
      </div>

      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-50">
        {/* ... semua decorative elements dengan className="fixed" ... */}
      </div>
    </>
  );
}
