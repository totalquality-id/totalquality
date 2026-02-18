"use client";

export default function GlobalBackground() {
  return (
    <>
      {/* Base Deep Blue Gradient - Memberikan kesan premium dan kedalaman */}
      <div className="fixed inset-0 bg-[#15156b] -z-50" />
      <div 
        className="fixed inset-0 opacity-40 -z-50" 
        style={{
          background: `radial-gradient(circle at 0% 0%, #0201FF 0%, transparent 50%), 
                       radial-gradient(circle at 100% 100%, #0201FF 0%, transparent 50%)`
        }}
      />

      {/* Subtle Mesh Grid - Tipis dan profesional, memberikan kesan struktur digital */}
      <div className="fixed inset-0 opacity-[0.05] -z-50">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Professional Soft Spotlights - Tidak menggunakan banyak warna, hanya gradasi biru */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-50">
        {/* Main Brand Accent - Penempatan strategis di area yang tidak menutupi teks utama */}
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-[#0201FF]/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#0201FF]/5 rounded-full blur-[100px]" />

        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-[#0201FF]/15 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '10s' }} />
      </div>

      {/* Noise Texture Overlay - Memberikan kesan material premium (matte finish) */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none -z-50 brightness-100 contrast-150" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3 Blackboard %3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>
    </>
  );
}