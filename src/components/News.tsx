export default function News() {
  return (
    <section id="news" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-[#2B5589] text-center mb-12">
          Latest News
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((news) => (
            <div
              key={news}
              className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-[#2B5589] mb-2">
                News Title {news}
              </h3>
              <p className="text-gray-600 mb-4">
                Brief summary of the news article goes here.
              </p>
              <a
                href="/news"
                className="text-[#FACC01] font-semibold hover:underline"
              >
                Read More →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
