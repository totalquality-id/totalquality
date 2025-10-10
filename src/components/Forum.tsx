export default function Forum() {
  return (
    <section id="forum" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-[#2B5589] text-center mb-6">
          Forum – Agent of Change
        </h2>
        <p className="text-gray-600 text-center mb-12">
          Share and interact with motivational quotes from our community.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((post) => (
            <div
              key={post}
              className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
            >
              <p className="italic text-gray-700 mb-4">
                "Sample motivational quote {post}..."
              </p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>❤️ 12</span>
                <span>💬 4</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="/forum"
            className="bg-[#FACC01] text-[#2B5589] font-semibold px-6 py-3 rounded-lg hover:bg-yellow-400 transition"
          >
            Join the Conversation
          </a>
        </div>
      </div>
    </section>
  );
}
