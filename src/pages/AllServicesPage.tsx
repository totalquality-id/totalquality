"use client";

import { useEffect, useState } from "react";

interface Service {
  id: number;
  title: string;
  description: string;
  image?: string;
}

export default function AllServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* Hero Section */}
      <section className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-[#2B5589] to-[#1e3d5f] text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FACC01]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

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
                  className="group relative bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-500 overflow-hidden"
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
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-56 object-cover rounded-md border border-gray-100"
                        />
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

      {/* CTA Section */}
      <section className="relative py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative p-12 lg:p-16 bg-gradient-to-br from-[#2B5589] to-[#3A6BA5] text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FACC01]/10 rounded-full blur-3xl" />

            <div className="relative max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tighter leading-tight">
                Ready to Transform Your Organization?
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-white/90 font-light leading-relaxed max-w-2xl mx-auto">
                Let’s discuss how our services can help you achieve operational
                excellence and sustainable growth.
              </p>
              <div>
                <a
                  href="/contact"
                  className="group inline-flex items-center gap-3 bg-white text-[#2B5589] font-light px-8 py-4 hover:bg-slate-50 transition-all duration-300"
                >
                  <span className="text-sm tracking-wide">Contact Us</span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300"
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
