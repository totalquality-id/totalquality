export default function Events() {
  return (
    <section id="events" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-[#2B5589] text-center mb-12">
          Upcoming Events
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((event) => (
            <div
              key={event}
              className="p-6 border rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-[#2B5589] mb-2">
                Event Title {event}
              </h3>
              <p className="text-gray-600 mb-4">
                Short description of the event goes here.
              </p>
              <a
                href="/events"
                className="text-[#FACC01] font-semibold hover:underline"
              >
                Learn More →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
