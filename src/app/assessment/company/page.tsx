"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type CategoryType =
  | "culture"
  | "hr"
  | "communication"
  | "management"
  | "development"
  | "system";

interface Option {
  text: string;
  score: number;
}

interface Question {
  id: number;
  question: string;
  category: CategoryType;
  options: Option[];
}

interface CategoryScore {
  total: number;
  count: number;
  average?: number;
}

type CategoryScores = Record<CategoryType, CategoryScore>;
type CategoryNames = Record<CategoryType, string>;

export default function CompanyAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question:
        "Seberapa jelas visi dan misi perusahaan dikomunikasikan kepada seluruh karyawan?",
      category: "culture",
      options: [
        {
          text: "Sangat jelas, semua karyawan memahami dan mengingat",
          score: 5,
        },
        { text: "Cukup jelas, sebagian besar karyawan memahami", score: 4 },
        { text: "Kurang jelas, hanya beberapa karyawan yang tahu", score: 3 },
        { text: "Tidak jelas, banyak karyawan tidak tahu", score: 2 },
        { text: "Tidak ada komunikasi visi dan misi", score: 1 },
      ],
    },
    {
      id: 2,
      question:
        "Bagaimana sistem penilaian kinerja karyawan di perusahaan Anda?",
      category: "hr",
      options: [
        {
          text: "Sangat terstruktur dengan KPI yang jelas dan review berkala",
          score: 5,
        },
        {
          text: "Ada sistem penilaian namun tidak terlalu konsisten",
          score: 4,
        },
        {
          text: "Penilaian dilakukan sesekali tanpa standar yang jelas",
          score: 3,
        },
        { text: "Penilaian sangat subjektif dan tidak terstruktur", score: 2 },
        { text: "Tidak ada sistem penilaian kinerja", score: 1 },
      ],
    },
    {
      id: 3,
      question:
        "Seberapa efektif komunikasi antar departemen dalam perusahaan?",
      category: "communication",
      options: [
        { text: "Sangat efektif, kolaborasi berjalan lancar", score: 5 },
        { text: "Cukup efektif, kadang ada miscommunication", score: 4 },
        { text: "Kurang efektif, sering terjadi kesalahpahaman", score: 3 },
        { text: "Tidak efektif, departemen bekerja sendiri-sendiri", score: 2 },
        {
          text: "Sangat buruk, hampir tidak ada komunikasi antar departemen",
          score: 1,
        },
      ],
    },
    {
      id: 4,
      question: "Bagaimana perusahaan menangani pengembangan karyawan?",
      category: "development",
      options: [
        {
          text: "Program training rutin dan jenjang karir yang jelas",
          score: 5,
        },
        { text: "Ada program training namun tidak teratur", score: 4 },
        { text: "Training hanya untuk posisi tertentu", score: 3 },
        { text: "Jarang ada program pengembangan", score: 2 },
        { text: "Tidak ada program pengembangan karyawan", score: 1 },
      ],
    },
    {
      id: 5,
      question:
        "Seberapa transparan manajemen dalam berbagi informasi perusahaan?",
      category: "culture",
      options: [
        {
          text: "Sangat transparan, informasi penting selalu dikomunikasikan",
          score: 5,
        },
        { text: "Cukup transparan untuk hal-hal yang relevan", score: 4 },
        { text: "Kurang transparan, banyak informasi yang tertutup", score: 3 },
        {
          text: "Tidak transparan, karyawan tidak tahu kondisi perusahaan",
          score: 2,
        },
        { text: "Sangat tertutup, hampir tidak ada transparansi", score: 1 },
      ],
    },
    {
      id: 6,
      question: "Bagaimana sistem reward dan recognition di perusahaan Anda?",
      category: "hr",
      options: [
        { text: "Sistematis dan adil, prestasi selalu diapresiasi", score: 5 },
        { text: "Ada sistem reward namun tidak konsisten", score: 4 },
        { text: "Recognition hanya untuk pencapaian besar", score: 3 },
        { text: "Jarang ada apresiasi untuk karyawan", score: 2 },
        { text: "Tidak ada sistem reward sama sekali", score: 1 },
      ],
    },
    {
      id: 7,
      question: "Seberapa baik work-life balance di perusahaan Anda?",
      category: "culture",
      options: [
        {
          text: "Sangat baik, perusahaan mendukung keseimbangan hidup",
          score: 5,
        },
        { text: "Cukup baik, ada fleksibilitas dalam pekerjaan", score: 4 },
        { text: "Kurang seimbang, sering ada overtime", score: 3 },
        { text: "Buruk, karyawan sering bekerja di luar jam kerja", score: 2 },
        { text: "Sangat buruk, tidak ada batasan waktu kerja", score: 1 },
      ],
    },
    {
      id: 8,
      question: "Bagaimana proses pengambilan keputusan di perusahaan?",
      category: "management",
      options: [
        { text: "Partisipatif, melibatkan stakeholder yang relevan", score: 5 },
        { text: "Cukup partisipatif untuk keputusan penting", score: 4 },
        { text: "Top-down, dengan sedikit input dari bawah", score: 3 },
        {
          text: "Sangat top-down, keputusan dibuat tanpa konsultasi",
          score: 2,
        },
        { text: "Tidak jelas, sering berubah-ubah", score: 1 },
      ],
    },
    {
      id: 9,
      question: "Seberapa efektif sistem teknologi dan tools yang digunakan?",
      category: "system",
      options: [
        {
          text: "Sangat modern dan efisien, mendukung produktivitas",
          score: 5,
        },
        { text: "Cukup baik, tools yang ada memadai", score: 4 },
        { text: "Kurang memadai, beberapa proses masih manual", score: 3 },
        { text: "Ketinggalan zaman, menghambat pekerjaan", score: 2 },
        { text: "Sangat buruk, sistem sering bermasalah", score: 1 },
      ],
    },
    {
      id: 10,
      question: "Bagaimana budaya inovasi di perusahaan Anda?",
      category: "culture",
      options: [
        { text: "Sangat mendukung, ide baru selalu dihargai", score: 5 },
        { text: "Cukup terbuka terhadap inovasi", score: 4 },
        { text: "Kurang mendukung, lebih fokus pada cara lama", score: 3 },
        { text: "Tidak mendukung inovasi", score: 2 },
        { text: "Menolak perubahan dan ide baru", score: 1 },
      ],
    },
    {
      id: 11,
      question: "Seberapa baik sistem onboarding untuk karyawan baru?",
      category: "hr",
      options: [
        { text: "Sangat terstruktur dengan mentoring yang baik", score: 5 },
        { text: "Ada program onboarding yang cukup memadai", score: 4 },
        { text: "Onboarding dasar, kurang guidance", score: 3 },
        { text: "Minimal, karyawan baru harus belajar sendiri", score: 2 },
        { text: "Tidak ada proses onboarding", score: 1 },
      ],
    },
    {
      id: 12,
      question: "Bagaimana tingkat employee engagement di perusahaan?",
      category: "culture",
      options: [
        { text: "Sangat tinggi, karyawan termotivasi dan antusias", score: 5 },
        { text: "Cukup baik, sebagian besar karyawan engaged", score: 4 },
        {
          text: "Sedang-sedang saja, banyak yang hanya menjalankan tugas",
          score: 3,
        },
        { text: "Rendah, banyak karyawan yang tidak engaged", score: 2 },
        { text: "Sangat rendah, tingkat turnover tinggi", score: 1 },
      ],
    },
    {
      id: 13,
      question: "Seberapa efektif leadership di tingkat manajemen?",
      category: "management",
      options: [
        {
          text: "Sangat efektif, leader menginspirasi dan membimbing",
          score: 5,
        },
        { text: "Cukup efektif, leader kompeten di bidangnya", score: 4 },
        { text: "Kurang efektif, ada gap antara leader dan tim", score: 3 },
        { text: "Tidak efektif, banyak masalah leadership", score: 2 },
        { text: "Sangat buruk, leader tidak kompeten", score: 1 },
      ],
    },
    {
      id: 14,
      question: "Bagaimana sistem feedback dalam perusahaan?",
      category: "communication",
      options: [
        { text: "Sistematis, ada channel yang jelas untuk feedback", score: 5 },
        { text: "Ada sistem feedback namun tidak terstruktur", score: 4 },
        { text: "Feedback hanya one-way dari atas ke bawah", score: 3 },
        { text: "Jarang ada kesempatan untuk memberikan feedback", score: 2 },
        { text: "Tidak ada sistem feedback", score: 1 },
      ],
    },
    {
      id: 15,
      question: "Seberapa baik perusahaan menangani konflik internal?",
      category: "management",
      options: [
        { text: "Sangat baik, ada prosedur yang jelas dan efektif", score: 5 },
        { text: "Cukup baik, konflik biasanya terselesaikan", score: 4 },
        { text: "Kurang baik, konflik sering dibiarkan berlarut", score: 3 },
        { text: "Buruk, banyak konflik yang tidak terselesaikan", score: 2 },
        { text: "Sangat buruk, konflik menjadi toxic", score: 1 },
      ],
    },
    {
      id: 16,
      question: "Bagaimana kualitas fasilitas dan lingkungan kerja?",
      category: "system",
      options: [
        { text: "Sangat baik, nyaman dan mendukung produktivitas", score: 5 },
        { text: "Cukup baik, fasilitas memadai", score: 4 },
        { text: "Standar, ada yang perlu diperbaiki", score: 3 },
        { text: "Kurang memadai, banyak kekurangan", score: 2 },
        { text: "Buruk, tidak nyaman untuk bekerja", score: 1 },
      ],
    },
    {
      id: 17,
      question: "Seberapa adil sistem kompensasi dan benefit?",
      category: "hr",
      options: [
        { text: "Sangat adil dan kompetitif dengan industri", score: 5 },
        { text: "Cukup adil, sesuai dengan standar", score: 4 },
        { text: "Kurang adil, ada disparitas yang signifikan", score: 3 },
        { text: "Tidak adil, banyak ketidakpuasan", score: 2 },
        { text: "Sangat tidak adil, jauh di bawah standar", score: 1 },
      ],
    },
    {
      id: 18,
      question: "Bagaimana perusahaan menghadapi perubahan dan adaptasi?",
      category: "management",
      options: [
        { text: "Sangat adaptif, cepat merespon perubahan", score: 5 },
        { text: "Cukup adaptif dengan perubahan bertahap", score: 4 },
        { text: "Lambat beradaptasi namun akhirnya berubah", score: 3 },
        { text: "Resisten terhadap perubahan", score: 2 },
        { text: "Sangat kaku, menolak perubahan", score: 1 },
      ],
    },
    {
      id: 19,
      question: "Seberapa kuat team collaboration dalam perusahaan?",
      category: "communication",
      options: [
        { text: "Sangat kuat, tim bekerja dengan sangat baik", score: 5 },
        { text: "Cukup baik, ada kolaborasi yang solid", score: 4 },
        { text: "Biasa saja, kolaborasi terbatas", score: 3 },
        { text: "Lemah, lebih banyak bekerja individual", score: 2 },
        { text: "Sangat lemah, tidak ada teamwork", score: 1 },
      ],
    },
    {
      id: 20,
      question: "Bagaimana tingkat kepuasan karyawan secara keseluruhan?",
      category: "culture",
      options: [
        { text: "Sangat tinggi, karyawan senang bekerja di sini", score: 5 },
        { text: "Cukup tinggi, sebagian besar karyawan puas", score: 4 },
        { text: "Sedang, ada yang puas ada yang tidak", score: 3 },
        { text: "Rendah, banyak keluhan dari karyawan", score: 2 },
        { text: "Sangat rendah, tingkat resignasi tinggi", score: 1 },
      ],
    },
  ];

  const calculateResult = () => {
    let totalScore = 0;
    const categoryScores: CategoryScores = {
      culture: { total: 0, count: 0 },
      hr: { total: 0, count: 0 },
      communication: { total: 0, count: 0 },
      management: { total: 0, count: 0 },
      development: { total: 0, count: 0 },
      system: { total: 0, count: 0 },
    };

    Object.entries(answers).forEach(([questionIndex, score]) => {
      totalScore += score;
      const category = questions[parseInt(questionIndex)].category;
      categoryScores[category].total += score;
      categoryScores[category].count += 1;
    });

    const averageScore = totalScore / 20;
    const percentageScore = (averageScore / 5) * 100;

    // Calculate category averages
    (Object.keys(categoryScores) as CategoryType[]).forEach((category) => {
      if (categoryScores[category].count > 0) {
        categoryScores[category].average =
          categoryScores[category].total / categoryScores[category].count;
      }
    });

    let level: string;
    let description: string;
    let recommendations: string[];
    let color: string;

    if (percentageScore >= 80) {
      level = "Excellent";
      color = "from-[#10b981] to-[#059669]";
      description =
        "Sistem perusahaan Anda berada di level excellent. Organisasi Anda memiliki budaya kerja yang sehat, sistem yang terstruktur dengan baik, dan manajemen yang efektif. Pertahankan dan tingkatkan terus kualitas ini.";
      recommendations = [
        "Dokumentasikan best practices untuk dijadikan standar",
        "Jadilah benchmark bagi perusahaan lain",
        "Terus berinovasi untuk mempertahankan keunggulan",
        "Kembangkan program mentoring untuk share knowledge",
      ];
    } else if (percentageScore >= 60) {
      level = "Good";
      color = "from-[#FACC01] to-[#F5B800]";
      description =
        "Sistem perusahaan Anda berada di level good. Ada fondasi yang solid namun masih ada area yang perlu ditingkatkan untuk mencapai level excellent.";
      recommendations = [
        "Identifikasi area dengan skor terendah untuk diprioritaskan",
        "Implementasikan program improvement yang terstruktur",
        "Tingkatkan komunikasi antar departemen",
        "Develop leadership capability di semua level",
      ];
    } else if (percentageScore >= 40) {
      level = "Fair";
      color = "from-[#f59e0b] to-[#d97706]";
      description =
        "Sistem perusahaan Anda berada di level fair. Ada banyak area yang memerlukan perbaikan mendasar untuk meningkatkan efektivitas organisasi.";
      recommendations = [
        "Lakukan assessment menyeluruh untuk identifikasi root cause",
        "Prioritaskan perbaikan sistem HR dan komunikasi",
        "Investasi dalam program pengembangan karyawan",
        "Bangun budaya feedback dan continuous improvement",
        "Pertimbangkan konsultasi dengan ahli organizational development",
      ];
    } else {
      level = "Needs Improvement";
      color = "from-[#ef4444] to-[#dc2626]";
      description =
        "Sistem perusahaan Anda memerlukan perbaikan mendesak. Ada fundamental issues yang perlu segera ditangani untuk mencegah masalah yang lebih besar.";
      recommendations = [
        "Segera lakukan organizational audit komprehensif",
        "Rebuild budaya perusahaan dari fundamental",
        "Restructure sistem manajemen dan komunikasi",
        "Implementasi program change management",
        "Sangat disarankan untuk bekerja dengan konsultan profesional",
        "Fokus pada employee engagement dan retention",
      ];
    }

    return {
      totalScore,
      averageScore,
      percentageScore,
      categoryScores,
      level,
      description,
      recommendations,
      color,
    };
  };

  const handleAnswer = (score: number) => {
    setAnswers({ ...answers, [currentQuestion]: score });

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

  const categoryNames: CategoryNames = {
    culture: "Company Culture",
    hr: "Human Resources",
    communication: "Communication",
    management: "Management",
    development: "Employee Development",
    system: "Systems & Infrastructure",
  };

  if (showResult) {
    const result = calculateResult();

    return (
      <div
        className="min-h-screen bg-white"
        style={{ fontFamily: "Inter, system-ui, sans-serif" }}
      >
        <div className="max-w-5xl mx-auto px-4 py-16 sm:py-20">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tighter text-[#1a1a1a] mb-4">
              Company System{" "}
              <span className="text-[#2B5589] font-normal">Assessment</span>{" "}
              Results
            </h1>
            <p className="text-lg text-[#364153] font-light">
              Based on your assessment, here's your organization's health report
            </p>
          </div>

          {/* Overall Score */}
          <div
            className={`bg-gradient-to-br ${result.color} p-8 sm:p-12 mb-8 shadow-xl`}
          >
            <div className="text-white text-center">
              <div className="mb-6">
                <div className="text-7xl sm:text-8xl font-light mb-4">
                  {Math.round(result.percentageScore)}%
                </div>
                <h2 className="text-3xl sm:text-4xl font-light tracking-tight mb-2">
                  {result.level}
                </h2>
                <p className="text-lg font-light leading-relaxed opacity-90 max-w-2xl mx-auto">
                  {result.description}
                </p>
              </div>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-gray-50 border border-gray-200 p-8 mb-8">
            <h3 className="text-2xl font-light tracking-tight text-[#1a1a1a] mb-6">
              Category Breakdown
            </h3>
            <div className="space-y-6">
              {(
                Object.entries(result.categoryScores) as [
                  CategoryType,
                  CategoryScore
                ][]
              )
                .filter(([_, data]) => data.count > 0)
                .map(([category, data]) => {
                  const percentage = ((data.average || 0) / 5) * 100;
                  return (
                    <div key={category}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-base font-light text-[#364153]">
                          {categoryNames[category]}
                        </span>
                        <span className="text-base font-light text-[#364153]">
                          {(data.average || 0).toFixed(1)}/5.0
                        </span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            percentage >= 80
                              ? "bg-[#10b981]"
                              : percentage >= 60
                              ? "bg-[#FACC01]"
                              : percentage >= 40
                              ? "bg-[#f59e0b]"
                              : "bg-[#ef4444]"
                          } transition-all duration-1000`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white border-2 border-gray-200 p-8 sm:p-10 mb-8">
            <h3 className="text-2xl font-light tracking-tight text-[#1a1a1a] mb-6">
              Recommended Actions
            </h3>
            <ul className="space-y-4">
              {result.recommendations.map((recommendation, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center bg-[#2B5589] text-white text-sm rounded-full mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-base font-light text-[#364153] leading-relaxed">
                    {recommendation}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-[#2B5589] to-[#0000d1] p-8 sm:p-10 text-white text-center">
            <h3 className="text-2xl sm:text-3xl font-light tracking-tight mb-4">
              Ready to Transform Your Organization?
            </h3>
            <p className="text-lg font-light leading-relaxed opacity-90 mb-6 max-w-2xl mx-auto">
              Let Total Quality Indonesia help you develop a comprehensive
              improvement strategy tailored to your organization's unique needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => (window.location.href = "/contact")}
                className="inline-flex items-center justify-center gap-3 bg-white text-[#2B5589] font-light px-8 py-4 hover:bg-gray-100 transition-all duration-300"
              >
                <span className="text-sm tracking-wide">Contact Us</span>
              </button>
              <button
                onClick={() => (window.location.href = "/")}
                className="inline-flex items-center justify-center gap-3 bg-[#FACC01] text-[#2B5589] font-light px-8 py-4 hover:bg-[#F5B800] transition-all duration-300"
              >
                <span className="text-sm tracking-wide">Back to Home</span>
              </button>
            </div>
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
            className="inline-flex items-center text-sm text-[#364153] hover:text-[#2B5589] transition-colors duration-200 font-light"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Homepage
          </Link>
        </div>
        {/* Progress Bar */}
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
              className="h-full bg-[#2B5589] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="mb-12">
          <div className="mb-4">
            <span className="inline-block px-4 py-1.5 bg-gray-100 rounded-full text-sm text-[#364153]">
              {categoryNames[questions[currentQuestion].category]}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#1a1a1a] mb-8">
            {questions[currentQuestion].question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.score)}
                className="w-full text-left p-5 bg-white border-2 border-gray-200 hover:border-[#2B5589] hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-base sm:text-lg font-light text-[#364153] group-hover:text-[#2B5589] transition-colors duration-300">
                    {option.text}
                  </p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < option.score ? "bg-[#2B5589]" : "bg-gray-300"
                        } group-hover:bg-[#2B5589] transition-colors duration-300`}
                      />
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        {currentQuestion > 0 && (
          <button
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
            className="text-[#364153] hover:text-[#2B5589] font-light text-sm transition-colors duration-300"
          >
            ← Previous Question
          </button>
        )}
      </div>
    </div>
  );
}
