"use client";

import { useState } from "react";
import { User, Building2, X, ArrowRight, Target, Clock } from "lucide-react";

export default function SelfAssessmentSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    job: "",
    city: "",
    age: "",
    gender: "",
  });

  const handleAssessmentSelect = (link: string) => {
    setSelectedAssessment(link);
    setIsModalOpen(false);
    setShowFormModal(true);
  };

  const handleFormSubmit = () => {
    if (
      !formData.name ||
      !formData.job ||
      !formData.city ||
      !formData.age ||
      !formData.gender
    ) {
      alert("Mohon isi semua field terlebih dahulu");
      return;
    }

    localStorage.setItem(
      "assessmentUserInfo",
      JSON.stringify({
        name: formData.name.trim(),
        job: formData.job.trim(),
        city: formData.city.trim(),
        age: formData.age,
        gender: formData.gender,
      })
    );

    window.location.href = selectedAssessment;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const assessmentTypes = [
    {
      icon: User,
      title: "Personality Assessment",
      description: "Discover your personality type",
      color: "from-[#FACC01] to-[#ffd700]",
      link: "/assessment/personality",
    },
    {
      icon: Building2,
      title: "Company System Assessment",
      description: "Evaluate your organization's effectiveness",
      color: "from-[#FACC01] to-[#ffd700]",
      link: "/assessment/company",
    },
  ];

  return (
    <section
      id="self-assessment"
      className="relative w-full min-h-screen overflow-hidden"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://img.freepik.com/free-photo/office-workers-using-finance-graphs_23-2150408662.jpg?t=st=1763346942~exp=1763350542~hmac=0ded83086bd5296bcf5157748c156c2e152b8e4b522737c18b285a2e25a0ff6e&w=2000"
          alt="Self Assessment Background"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/1- via-black/30 to-black" />
      </div>

      {/* Content Container - CENTERED */}
      <div className="relative z-10 h-full min-h-screen flex items-center justify-center px-4 sm:px-8 lg:px-16">
        <div className="max-w-6xl text-center">
          {/* Main Title */}
          <h2 className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-white leading-tighter mb-4 sm:mb-6">
            Self Assessment
          </h2>

          {/* Description */}
          <p className="text-lg sm:text-xl lg:text-2xl text-white/90 leading-tight font-light max-w-2xl mx-auto mb-4 sm:mb-8">
            Discover your path with a quick assessment. Get personalized
            recommendations tailored to your needs.
          </p>

          {/* Stats - Minimal */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-4 sm:gap-8 mb-10 sm:mb-12">
            <div className="flex items-center justify-center gap-3">
              <Clock className="w-5 h-5 text-[#FACC01] flex-shrink-0" />
              <p className="text-sm sm:text-base text-white/90 font-light">
                5 Minutes Quick Test
              </p>
            </div>

            <div className="flex items-center justify-center gap-3">
              <Target className="w-5 h-5 text-[#FACC01] flex-shrink-0" />
              <p className="text-sm sm:text-base text-white/90 font-light">
                Personalized Results
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="group inline-flex items-center justify-center gap-3 bg-[#FACC01] text-[#1a2942] font-medium px-8 py-4 hover:bg-[#ffd700] transition-all duration-300 shadow-2xl shadow-[#FACC01]/30 hover:shadow-[#FACC01]/50 hover:scale-105"
            >
              <span className="text-base tracking-wide">Start Assessment</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-10 w-64 h-64 bg-[#FACC01]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />

      {/* Assessment Type Selection Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-lg">
          <div className="relative backdrop-blur-2xl bg-[#1a2942]/95 border border-white/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl rounded-lg">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-colors duration-300 z-10 group"
            >
              <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
            </button>

            <div className="p-8 sm:p-12">
              <div className="text-center mb-10">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tighter text-white mb-3">
                  Choose Your <span className="text-[#FACC01]">Assessment</span>
                </h2>
                <p className="text-base sm:text-lg text-white/80 font-light">
                  Select the type that best fits your needs
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {assessmentTypes.map((type, index) => {
                  const IconComponent = type.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => handleAssessmentSelect(type.link)}
                      className="group relative p-8 backdrop-blur-md bg-white/10 hover:bg-white/15 border-2 border-white/20 hover:border-[#FACC01] transition-all duration-500 hover:shadow-2xl hover:shadow-[#FACC01]/30 hover:-translate-y-2 text-left overflow-hidden rounded-lg"
                    >
                      <div
                        className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${type.color} opacity-10 group-hover:opacity-20 blur-2xl transition-opacity duration-500`}
                      />

                      <div className="relative">
                        <div
                          className={`inline-flex w-16 h-16 bg-gradient-to-br ${type.color} rounded-2xl items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-[#FACC01]/30`}
                        >
                          <IconComponent className="w-8 h-8 text-[#1a2942]" />
                        </div>

                        <h3 className="text-xl sm:text-2xl font-light tracking-tight text-white mb-3 group-hover:text-[#FACC01] transition-colors duration-300">
                          {type.title}
                        </h3>
                        <p className="text-sm text-white/70 leading-relaxed font-light mb-6">
                          {type.description}
                        </p>

                        <div className="flex items-center gap-2 text-[#FACC01] font-medium">
                          <span className="text-sm">Start</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Information Form Modal */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-lg">
          <div className="relative backdrop-blur-2xl bg-[#1a2942]/95 border border-white/20 max-w-lg w-full shadow-2xl rounded-lg">
            <button
              onClick={() => {
                setShowFormModal(false);
                setFormData({
                  name: "",
                  job: "",
                  city: "",
                  age: "",
                  gender: "",
                });
              }}
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-colors duration-300 z-10 group"
            >
              <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
            </button>

            <div className="p-8 sm:p-10">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-white mb-2">
                  Before We <span className="text-[#FACC01]">Begin</span>
                </h2>
                <p className="text-sm text-white/80 font-light">
                  Please fill in your information
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    Name / Initials <span className="text-[#FACC01]">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., John Doe"
                    className="w-full px-4 py-3 backdrop-blur-md bg-white/10 border-2 border-white/20 focus:border-[#FACC01] focus:outline-none transition-colors duration-300 text-white placeholder-white/50 font-light rounded-lg"
                  />
                </div>

                <div>
                  <label
                    htmlFor="job"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    Occupation <span className="text-[#FACC01]">*</span>
                  </label>
                  <input
                    type="text"
                    id="job"
                    name="job"
                    required
                    value={formData.job}
                    onChange={handleInputChange}
                    placeholder="e.g., Marketing Manager"
                    className="w-full px-4 py-3 backdrop-blur-md bg-white/10 border-2 border-white/20 focus:border-[#FACC01] focus:outline-none transition-colors duration-300 text-white placeholder-white/50 font-light rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      City <span className="text-[#FACC01]">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Surabaya"
                      className="w-full px-4 py-3 backdrop-blur-md bg-white/10 border-2 border-white/20 focus:border-[#FACC01] focus:outline-none transition-colors duration-300 text-white placeholder-white/50 font-light rounded-lg"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="age"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      Age <span className="text-[#FACC01]">*</span>
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      required
                      min="15"
                      max="100"
                      value={formData.age}
                      onChange={handleInputChange}
                      placeholder="25"
                      className="w-full px-4 py-3 backdrop-blur-md bg-white/10 border-2 border-white/20 focus:border-[#FACC01] focus:outline-none transition-colors duration-300 text-white placeholder-white/50 font-light rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    Gender <span className="text-[#FACC01]">*</span>
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    required
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 backdrop-blur-md bg-white/10 border-2 border-white/20 focus:border-[#FACC01] focus:outline-none transition-colors duration-300 text-white font-light rounded-lg"
                  >
                    <option value="" className="bg-[#1a2942] text-white">
                      Select Gender
                    </option>
                    <option value="male" className="bg-[#1a2942] text-white">
                      Male
                    </option>
                    <option value="female" className="bg-[#1a2942] text-white">
                      Female
                    </option>
                    <option value="other" className="bg-[#1a2942] text-white">
                      Prefer not to say
                    </option>
                  </select>
                </div>

                <button
                  onClick={handleFormSubmit}
                  className="group w-full bg-white text-[#1a2942] font-semibold px-8 py-4 rounded-full hover:bg-[#FACC01] hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105 mt-6"
                >
                  <span className="text-base tracking-wide">
                    Start Assessment
                  </span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
              </div>

              <p className="text-xs text-center text-white/60 font-light mt-5">
                Your information is used solely for personalized results
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
