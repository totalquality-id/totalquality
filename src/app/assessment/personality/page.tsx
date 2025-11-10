"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type PersonalityType = "sanguine" | "melancholic" | "phlegmatic" | "choleric";

interface Answer {
  text: string;
  type: PersonalityType;
}

interface Question {
  id: number;
  question: string;
  options: Answer[];
}

interface PersonalityDescription {
  title: string;
  color: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  tips: string;
}

type PersonalityDescriptions = Record<PersonalityType, PersonalityDescription>;

export default function PersonalityAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, PersonalityType>>({});
  const [showResult, setShowResult] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: "Dalam situasi sosial, saya cenderung:",
      options: [
        {
          text: "Menjadi pusat perhatian dan bercerita dengan antusias",
          type: "sanguine",
        },
        {
          text: "Menganalisis orang-orang di sekitar saya",
          type: "melancholic",
        },
        {
          text: "Mengamati dari kejauhan dan berbicara jika diperlukan",
          type: "phlegmatic",
        },
        {
          text: "Mengambil alih percakapan dan memimpin diskusi",
          type: "choleric",
        },
      ],
    },
    {
      id: 2,
      question: "Ketika menghadapi masalah, saya:",
      options: [
        {
          text: "Mencari cara kreatif dan spontan untuk menyelesaikannya",
          type: "sanguine",
        },
        {
          text: "Menganalisis setiap detail dan mencari solusi sempurna",
          type: "melancholic",
        },
        {
          text: "Tetap tenang dan mencari solusi yang praktis",
          type: "phlegmatic",
        },
        {
          text: "Segera mengambil tindakan dan mencari hasil cepat",
          type: "choleric",
        },
      ],
    },
    {
      id: 3,
      question: "Dalam bekerja, saya lebih suka:",
      options: [
        {
          text: "Bekerja dalam tim yang menyenangkan dan dinamis",
          type: "sanguine",
        },
        {
          text: "Bekerja sendiri dengan standar kualitas tinggi",
          type: "melancholic",
        },
        {
          text: "Bekerja dalam lingkungan yang stabil dan harmonis",
          type: "phlegmatic",
        },
        { text: "Memimpin proyek dan mencapai target", type: "choleric" },
      ],
    },
    {
      id: 4,
      question: "Cara saya berkomunikasi adalah:",
      options: [
        { text: "Ekspresif, penuh cerita dan humor", type: "sanguine" },
        { text: "Thoughtful, detail, dan mendalam", type: "melancholic" },
        {
          text: "Tenang, diplomatis, dan pendengar yang baik",
          type: "phlegmatic",
        },
        { text: "Langsung, tegas, dan to the point", type: "choleric" },
      ],
    },
    {
      id: 5,
      question: "Ketika membuat keputusan, saya:",
      options: [
        { text: "Mengikuti intuisi dan perasaan saat itu", type: "sanguine" },
        {
          text: "Mempertimbangkan semua pro dan kontra dengan hati-hati",
          type: "melancholic",
        },
        {
          text: "Mencari konsensus dan menghindari konflik",
          type: "phlegmatic",
        },
        {
          text: "Membuat keputusan cepat berdasarkan logika",
          type: "choleric",
        },
      ],
    },
    {
      id: 6,
      question: "Kekuatan utama saya adalah:",
      options: [
        {
          text: "Optimisme dan kemampuan memotivasi orang lain",
          type: "sanguine",
        },
        { text: "Perfeksionisme dan pemikiran analitis", type: "melancholic" },
        {
          text: "Kesabaran dan kemampuan menjaga keharmonisan",
          type: "phlegmatic",
        },
        {
          text: "Kepemimpinan dan kemampuan mencapai tujuan",
          type: "choleric",
        },
      ],
    },
    {
      id: 7,
      question: "Saya merasa tertekan ketika:",
      options: [
        { text: "Berada dalam rutinitas yang membosankan", type: "sanguine" },
        {
          text: "Tidak mencapai standar sempurna yang saya tetapkan",
          type: "melancholic",
        },
        {
          text: "Ada konflik atau ketegangan di sekitar saya",
          type: "phlegmatic",
        },
        {
          text: "Kehilangan kontrol atau tidak mencapai target",
          type: "choleric",
        },
      ],
    },
    {
      id: 8,
      question: "Pendekatan saya terhadap waktu adalah:",
      options: [
        {
          text: "Fleksibel, saya sering terlambat karena enjoy the moment",
          type: "sanguine",
        },
        {
          text: "Sangat terencana, saya selalu tepat waktu",
          type: "melancholic",
        },
        { text: "Santai tapi tetap menghargai jadwal", type: "phlegmatic" },
        { text: "Efisien, waktu adalah uang", type: "choleric" },
      ],
    },
    {
      id: 9,
      question: "Dalam menghadapi kritik, saya:",
      options: [
        {
          text: "Mencoba tidak terlalu memikirkannya dan move on",
          type: "sanguine",
        },
        {
          text: "Menganalisis kritik tersebut secara mendalam",
          type: "melancholic",
        },
        {
          text: "Menerimanya dengan tenang dan melihat sisi positifnya",
          type: "phlegmatic",
        },
        {
          text: "Membela diri atau segera memperbaiki kesalahan",
          type: "choleric",
        },
      ],
    },
    {
      id: 10,
      question: "Gaya kepemimpinan saya adalah:",
      options: [
        {
          text: "Inspiratif dan membuat pekerjaan menjadi menyenangkan",
          type: "sanguine",
        },
        {
          text: "Teliti dan memastikan semua detail sempurna",
          type: "melancholic",
        },
        {
          text: "Suportif dan menciptakan lingkungan yang harmonis",
          type: "phlegmatic",
        },
        { text: "Direktif dan fokus pada hasil", type: "choleric" },
      ],
    },
    {
      id: 11,
      question: "Cara saya menyelesaikan tugas:",
      options: [
        { text: "Multitasking dengan energi tinggi", type: "sanguine" },
        { text: "Fokus pada satu tugas sampai sempurna", type: "melancholic" },
        {
          text: "Steady dan konsisten dengan pace yang stabil",
          type: "phlegmatic",
        },
        { text: "Cepat dan efisien, fokus pada prioritas", type: "choleric" },
      ],
    },
    {
      id: 12,
      question: "Saya paling bahagia ketika:",
      options: [
        {
          text: "Bersosialisasi dan membuat orang lain tertawa",
          type: "sanguine",
        },
        {
          text: "Menciptakan sesuatu yang meaningful dan berkualitas",
          type: "melancholic",
        },
        {
          text: "Berada dalam lingkungan yang damai dan stabil",
          type: "phlegmatic",
        },
        { text: "Mencapai goal dan melihat hasil nyata", type: "choleric" },
      ],
    },
    {
      id: 13,
      question: "Dalam situasi konflik, saya:",
      options: [
        { text: "Mencoba meringankan suasana dengan humor", type: "sanguine" },
        {
          text: "Menarik diri dan merenung tentang masalahnya",
          type: "melancholic",
        },
        { text: "Mencari jalan tengah dan mediasi", type: "phlegmatic" },
        { text: "Menghadapi konflik secara langsung", type: "choleric" },
      ],
    },
    {
      id: 14,
      question: "Ruang kerja saya biasanya:",
      options: [
        {
          text: "Kreatif dan penuh dengan hal-hal yang menarik",
          type: "sanguine",
        },
        {
          text: "Terorganisir dengan sempurna dan minimalis",
          type: "melancholic",
        },
        { text: "Nyaman dan fungsional", type: "phlegmatic" },
        {
          text: "Praktis dan efisien untuk produktivitas maksimal",
          type: "choleric",
        },
      ],
    },
    {
      id: 15,
      question: "Saya lebih suka:",
      options: [
        { text: "Variasi dan spontanitas dalam hidup", type: "sanguine" },
        {
          text: "Kedalaman dan makna dalam setiap aktivitas",
          type: "melancholic",
        },
        { text: "Stabilitas dan predictability", type: "phlegmatic" },
        {
          text: "Challenge dan kesempatan untuk berkompetisi",
          type: "choleric",
        },
      ],
    },
    {
      id: 16,
      question: "Ketika belajar hal baru, saya:",
      options: [
        {
          text: "Excited dan ingin segera mencoba berbagai hal",
          type: "sanguine",
        },
        { text: "Mempelajari teori secara mendalam dulu", type: "melancholic" },
        {
          text: "Belajar dengan pace yang nyaman dan steady",
          type: "phlegmatic",
        },
        { text: "Fokus pada aplikasi praktis dan hasil", type: "choleric" },
      ],
    },
    {
      id: 17,
      question: "Dalam tim, peran saya biasanya:",
      options: [
        { text: "Motivator dan mood booster", type: "sanguine" },
        {
          text: "Quality controller dan strategic thinker",
          type: "melancholic",
        },
        { text: "Mediator dan team player yang reliable", type: "phlegmatic" },
        { text: "Leader dan decision maker", type: "choleric" },
      ],
    },
    {
      id: 18,
      question: "Saya menangani stres dengan:",
      options: [
        {
          text: "Bersosialisasi dan berbagi cerita dengan teman",
          type: "sanguine",
        },
        { text: "Menyendiri dan merefleksikan situasi", type: "melancholic" },
        {
          text: "Tetap tenang dan mencari aktivitas yang menenangkan",
          type: "phlegmatic",
        },
        {
          text: "Mengambil tindakan untuk menyelesaikan masalah",
          type: "choleric",
        },
      ],
    },
    {
      id: 19,
      question: "Pandangan saya tentang aturan:",
      options: [
        {
          text: "Aturan dibuat untuk dilanggar (kadang-kadang)",
          type: "sanguine",
        },
        { text: "Aturan harus diikuti dengan presisi", type: "melancholic" },
        {
          text: "Aturan penting untuk menjaga keharmonisan",
          type: "phlegmatic",
        },
        { text: "Aturan harus efisien dan masuk akal", type: "choleric" },
      ],
    },
    {
      id: 20,
      question: "Motivasi terbesar saya adalah:",
      options: [
        { text: "Recognition dan pujian dari orang lain", type: "sanguine" },
        { text: "Mencapai excellence dan kesempurnaan", type: "melancholic" },
        { text: "Harmoni dan stability dalam hidup", type: "phlegmatic" },
        { text: "Pencapaian dan kontrol atas hasil", type: "choleric" },
      ],
    },
  ];

  const calculateResult = () => {
    const scores: Record<PersonalityType, number> = {
      sanguine: 0,
      melancholic: 0,
      phlegmatic: 0,
      choleric: 0,
    };

    Object.values(answers).forEach((type) => {
      scores[type]++;
    });

    const sorted = (Object.entries(scores) as [PersonalityType, number][]).sort(
      (a, b) => b[1] - a[1]
    );
    return {
      primary: sorted[0],
      secondary: sorted[1],
      scores,
    };
  };

  const personalityDescriptions: PersonalityDescriptions = {
    sanguine: {
      title: "Sanguine - The Influencer",
      color: "from-[#FACC01] to-[#F5B800]",
      description:
        "Anda adalah pribadi yang energik, optimis, dan sosial. Anda senang berada di sekitar orang lain dan memiliki kemampuan alami untuk memotivasi dan menginspirasi mereka.",
      strengths: [
        "Antusiasme tinggi",
        "Komunikator yang baik",
        "Optimis",
        "Kreatif",
        "Mudah beradaptasi",
      ],
      weaknesses: [
        "Kurang fokus",
        "Impulsif",
        "Kurang detail",
        "Susah menepati janji",
      ],
      tips: "Kembangkan disiplin diri dan perhatian pada detail. Buat sistem untuk membantu Anda tetap terorganisir.",
    },
    melancholic: {
      title: "Melancholic - The Thinker",
      color: "from-[#2B5589] to-[#1E3F69]",
      description:
        "Anda adalah pribadi yang analitis, perfeksionis, dan thoughtful. Anda memiliki standar tinggi dan selalu berusaha mencapai kesempurnaan dalam segala hal.",
      strengths: [
        "Analitis",
        "Perfeksionis",
        "Loyal",
        "Organized",
        "Sensitive terhadap detail",
      ],
      weaknesses: [
        "Terlalu kritis",
        "Pessimistic",
        "Moody",
        "Sulit menerima kritik",
      ],
      tips: "Belajar untuk menerima ketidaksempurnaan. Fokus pada progress, bukan perfection.",
    },
    phlegmatic: {
      title: "Phlegmatic - The Peacemaker",
      color: "from-[#0201FF] to-[#0000d1]",
      description:
        "Anda adalah pribadi yang tenang, sabar, dan diplomatic. Anda memiliki kemampuan alami untuk menciptakan harmoni dan stabilitas di lingkungan Anda.",
      strengths: [
        "Reliable",
        "Patient",
        "Diplomatic",
        "Good listener",
        "Team player",
      ],
      weaknesses: [
        "Kurang inisiatif",
        "Terlalu passive",
        "Menghindari konflik",
        "Lambat dalam mengambil keputusan",
      ],
      tips: "Berani mengambil risiko dan keluar dari comfort zone. Latih diri untuk lebih proaktif.",
    },
    choleric: {
      title: "Choleric - The Leader",
      color: "from-[#0201FF] to-[#0000d1]",
      description:
        "Anda adalah pribadi yang kuat, decisive, dan goal-oriented. Anda adalah pemimpin alami yang selalu fokus pada hasil dan pencapaian.",
      strengths: [
        "Leadership",
        "Decisive",
        "Goal-oriented",
        "Confident",
        "Problem solver",
      ],
      weaknesses: ["Bossy", "Kurang empati", "Impatient", "Workaholic"],
      tips: "Kembangkan empati dan listening skills. Belajar untuk delegate dan trust others.",
    },
  };

  const handleAnswer = (type: PersonalityType) => {
    setAnswers({ ...answers, [currentQuestion]: type });

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      setTimeout(() => {
        setShowResult(true);
      }, 300);
    }
  };

  if (showResult) {
    const result = calculateResult();
    const primaryPersonality = personalityDescriptions[result.primary[0]];
    const secondaryPersonality = personalityDescriptions[result.secondary[0]];

    return (
      <div
        className="min-h-screen bg-white"
        style={{ fontFamily: "Inter, system-ui, sans-serif" }}
      >
        <div className="max-w-5xl mx-auto px-4 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tighter text-[#1a1a1a] mb-4">
              Your{" "}
              <span className="text-[#0201FF] font-normal">Personality</span>{" "}
              Profile
            </h1>
            <p className="text-lg text-[#364153] font-light">
              Based on your answers, here&apos;s your personality assessment
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-8 mb-8">
            <h3 className="text-xl font-light tracking-tight text-[#1a1a1a] mb-6">
              Your Personality Distribution
            </h3>
            <div className="space-y-4">
              {(
                Object.entries(result.scores) as [PersonalityType, number][]
              ).map(([type, score]) => (
                <div key={type}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-light text-[#364153] capitalize">
                      {type}
                    </span>
                    <span className="text-sm font-light text-[#364153]">
                      {score}/20
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#0201FF] transition-all duration-1000"
                      style={{ width: `${(score / 20) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`bg-gradient-to-br ${primaryPersonality.color} p-8 sm:p-10 mb-8 shadow-xl`}
          >
            <div className="text-white">
              <div className="mb-6">
                <span className="inline-block px-4 py-1.5 bg-white/20 rounded-full text-sm mb-4">
                  Primary Personality
                </span>
                <h2 className="text-3xl sm:text-4xl font-light tracking-tight mb-4">
                  {primaryPersonality.title}
                </h2>
                <p className="text-lg font-light leading-relaxed opacity-90">
                  {primaryPersonality.description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-normal text-lg mb-3">Strengths</h4>
                  <ul className="space-y-2">
                    {primaryPersonality.strengths.map(
                      (strength: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-white/70">•</span>
                          <span className="font-light">{strength}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div>
                  <h4 className="font-normal text-lg mb-3">Areas for Growth</h4>
                  <ul className="space-y-2">
                    {primaryPersonality.weaknesses.map(
                      (weakness: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-white/70">•</span>
                          <span className="font-light">{weakness}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>

              <div className="bg-white/10 p-4 rounded">
                <h4 className="font-normal text-lg mb-2">Development Tips</h4>
                <p className="font-light leading-relaxed">
                  {primaryPersonality.tips}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-gray-200 p-8 sm:p-10 mb-8">
            <div className="mb-6">
              <span className="inline-block px-4 py-1.5 bg-gray-100 rounded-full text-sm text-[#364153] mb-4">
                Secondary Personality
              </span>
              <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-[#1a1a1a] mb-4">
                {secondaryPersonality.title}
              </h2>
              <p className="text-lg font-light leading-relaxed text-[#364153]">
                {secondaryPersonality.description}
              </p>
            </div>
          </div>

          <div className="text-center space-y-4">
            <button
              onClick={() => (window.location.href = "/")}
              className="inline-flex items-center gap-3 bg-[#0201FF] text-white font-light px-8 py-4 hover:bg-[#0000d1] transition-all duration-300"
            >
              <span className="text-sm tracking-wide">Back to Home</span>
            </button>
            <p className="text-sm text-[#364153] font-light">
              Want to learn more? Contact us for personalized development
              programs.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-20">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-[#364153] hover:text-[#0201FF] transition-colors duration-200 font-light"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Homepage
          </Link>
        </div>
        <div className="mb-12">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-light text-[#364153]">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-light text-[#364153]">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0201FF] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#1a1a1a] mb-8">
            {questions[currentQuestion].question}
          </h2>

          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.type)}
                className="w-full text-left p-6 bg-white border-2 border-gray-200 hover:border-[#0201FF] hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center border-2 border-gray-300 group-hover:border-[#0201FF] group-hover:bg-[#0201FF] transition-all duration-300 rounded-full">
                    <span className="text-sm font-light text-gray-400 group-hover:text-white">
                      {String.fromCharCode(65 + index)}
                    </span>
                  </div>
                  <p className="text-base sm:text-lg font-light text-[#364153] group-hover:text-[#0201FF] transition-colors duration-300">
                    {option.text}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {currentQuestion > 0 && (
          <button
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
            className="text-[#364153] hover:text-[#0201FF] font-light text-sm transition-colors duration-300"
          >
            ← Previous Question
          </button>
        )}
      </div>
    </div>
  );
}
