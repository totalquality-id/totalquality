export default function SelfAssessment() {
  return (
    <section id="self-assessment" className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center max-w-4xl">
        <h2 className="text-3xl font-bold text-[#2B5589] mb-6">
          Self Assessment
        </h2>
        <p className="text-gray-600 mb-6">
          Discover which of our services best fit your needs through a quick
          self-assessment quiz.
        </p>
        <a
          href="/self-assessment"
          className="bg-[#2B5589] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#23456e] transition"
        >
          Start Assessment
        </a>
      </div>
    </section>
  );
}
