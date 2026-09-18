/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Service {
  id: number;
  title: string;
  description: string;
  image?: string;
}

export default function AllServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const contactWa = "6281515300511";

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services");
        const data = await res.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Kartu service dirender setelah fetch selesai, jadi saat Next.js mencoba
  // melompat ke #service-<id> elemennya belum ada. Lompat manual begitu
  // datanya masuk supaya "Learn More" dari beranda mendarat di service yang benar.
  useEffect(() => {
    if (loading || services.length === 0) return;
    const hash = window.location.hash;
    if (!hash) return;

    const target = document.querySelector(hash);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [loading, services]);

  return (
    <div
      className="bg-white"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {" "}
      {/* Hero Section - Diperbarui agar selaras dengan GlobalBackground */}
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter leading-tight mb-6 mt-16">
              Comprehensive Solutions for{" "}
              <span className="text-[#FACC01] font-normal">
                Organizational Excellence
              </span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl font-light text-white/90 leading-tight max-w-3xl">
              Explore our complete range of services designed to help your
              organization achieve sustainable growth and operational
              excellence.
            </p>
          </div>
        </div>
      </section>
      {/* Services Grid Section */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <p className="text-center text-gray-500">Loading services...</p>
          ) : services.length === 0 ? (
            <p className="text-center text-gray-500">
              No services available at the moment.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {services.map((service, index) => (
                <article
                  key={service.id}
                  // Target anchor for the "Learn More" button on the home page
                  // service cards. scroll-mt clears the fixed navbar.
                  id={`service-${service.id}`}
                  className="group relative bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-500 overflow-hidden scroll-mt-32"
                >
                  <div className="p-8 lg:p-10 space-y-6">
                    {/* Title & Description */}
                    <div className="space-y-4">
                      <h3 className="text-2xl lg:text-3xl font-light tracking-tight text-[#1a1a1a] group-hover:text-[#2B5589] transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-sm lg:text-base text-[#364153] leading-relaxed font-light">
                        {service.description}
                      </p>
                      {service.image && (
                        <div className="relative w-full h-56">
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover border border-gray-100 rounded"
                            priority
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Hover Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#2B5589] to-[#FACC01] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
      {/* CTA Section - Diperbarui agar selaras dengan tema GlobalBackground */}
      <section className="relative py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative p-12 lg:p-20 bg-[#15156b] text-white overflow-hidden shadow-2xl">
            {/* 1. Base Gradient Layer - Meniru kedalaman GlobalBackground */}
            <div
              className="absolute inset-0 opacity-50"
              style={{
                background: `radial-gradient(circle at 0% 100%, #0201FF 0%, transparent 40%), 
                             radial-gradient(circle at 100% 0%, #0201FF 0%, transparent 40%)`,
              }}
            />

            {/* 2. Mesh Grid - Diselaraskan dengan Header & Background Utama */}
            <div className="absolute inset-0 opacity-[0.04]">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                  backgroundSize: "60px 60px",
                }}
              />
            </div>

            {/* 3. Soft Spotlight - Efek cahaya fokus di tengah */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[#0201FF]/10 rounded-full blur-[100px] pointer-events-none" />

            {/* 4. Noise Texture Overlay */}
            <div
              className="absolute inset-0 opacity-[0.02] pointer-events-none brightness-100 contrast-150"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            ></div>

            {/* Content */}
            <div className="relative max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tighter leading-tight">
                Ready to Transform Your{" "}
                <span className="text-[#FACC01] font-normal">
                  Organization?
                </span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-white/80 font-light leading-relaxed max-w-2xl mx-auto">
                Let&apos;s discuss how our services can help you achieve
                operational excellence and sustainable growth.
              </p>
              <div className="pt-4">
                <a
                  href={`https://wa.me/${contactWa}`}
                  className="group relative inline-flex items-center gap-3 bg-white text-[#01012b] font-light px-10 py-4 overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(2,1,255,0.3)]"
                >
                  {/* Hover effect on button */}
                  <div className="absolute inset-0 w-0 bg-[#FACC01] transition-all duration-300 group-hover:w-full -z-10" />

                  <span className="relative z-10 text-sm font-medium tracking-widest uppercase">
                    Contact Us
                  </span>
                  <svg
                    className="relative z-10 w-4 h-4 group-hover:translate-x-2 transition-transform duration-300"
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
      </section>
    </div>
  );
}
