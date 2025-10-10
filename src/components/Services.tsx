export default function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-[#2B5589] text-center mb-12">
          Our Services
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {["HR Consulting", "Corporate Motivation", "Leadership Training"].map(
            (service, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-[#2B5589] mb-4">
                  {service}
                </h3>
                <p className="text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <a
                  href="/services"
                  className="text-[#FACC01] font-semibold hover:underline"
                >
                  Learn More →
                </a>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
