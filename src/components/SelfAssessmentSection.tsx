"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Zap,
  Target,
  BarChart3,
  ClipboardList,
  Search,
  Gift,
  User,
  Building2,
  X,
} from "lucide-react";

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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("assessmentUserData", JSON.stringify(formData));
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

  const assessmentFeatures = [
    {
      icon: Zap,
      title: "Quick & Easy",
      description: "Complete in just 5 minutes",
    },
    {
      icon: Target,
      title: "Personalized Results",
      description: "Get tailored recommendations",
    },
    {
      icon: BarChart3,
      title: "Instant Insights",
      description: "Understand your needs immediately",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Answer Questions",
      description: "Simple multiple-choice questions about your organization",
      icon: ClipboardList,
    },
    {
      number: "02",
      title: "Get Analysis",
      description: "AI-powered analysis of your needs and challenges",
      icon: Search,
    },
    {
      number: "03",
      title: "Receive Recommendations",
      description: "Customized service recommendations for your goals",
      icon: Gift,
    },
  ];

  const assessmentTypes = [
    {
      icon: User,
      title: "Personality Assessment",
      description:
        "Discover your personality type (Sanguine, Melancholic, Phlegmatic, Choleric)",
      color: "from-[#0201FF] to-[#0000d1]",
      link: "/assessment/personality",
    },
    {
      icon: Building2,
      title: "Company System Assessment",
      description:
        "Evaluate your organization's system effectiveness and cultural health",
      color: "from-[#0201FF] to-[#0000d1]",
      link: "/assessment/company",
    },
  ];

  return (
    <section
      id="self-assessment"
      className="relative py-16 sm:py-20 lg:py-24 bg-white"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* Subtle Background Elements */}
      <div className="absolute top-1/4 right-10 w-72 h-72 bg-[#FACC01]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-10 w-64 h-64 bg-[#2B5589]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-base sm:text-2xl md:text-xl lg:text-2xl font-light tracking-tighter text-[#364153] mb-1">
            Discover Your Path
          </h2>
          <div className="w-full h-[1px] bg-gray-300 mb-8"></div>

          <div className="max-w-4xl">
            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter text-[#1a1a1a] leading-tight mb-4">
              Self{" "}
              <span className="text-[#0201FF] font-normal">Assessment</span>
            </h3>
            <p className="text-base sm:text-lg lg:text-xl font-light tracking-tight text-[#364153] mt-4">
              Discover which of our services best fit your needs through a quick
              self-assessment quiz.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-12 lg:space-y-16">
          {/* Features Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {assessmentFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative p-8 lg:p-10 bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="text-center space-y-4">
                    <div className="inline-flex w-14 h-14 bg-slate-50 border border-gray-200 items-center justify-center mx-auto group-hover:border-gray-300 transition-all duration-300">
                      <IconComponent className="w-6 h-6 text-[#0201FF]" />
                    </div>
                    <div>
                      <h3 className="text-lg lg:text-xl font-light tracking-tight text-[#1a1a1a] mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-[#364153] leading-relaxed font-light">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* How It Works Section */}
          <div className="relative p-10 lg:p-12 bg-white border border-gray-200 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FACC01]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2B5589]/5 rounded-full blur-3xl" />

            <div className="relative space-y-10 lg:space-y-12">
              <div className="text-center space-y-3">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tighter text-[#1a1a1a]">
                  How It Works
                </h3>
                <p className="text-[#364153] text-base lg:text-lg font-light max-w-2xl mx-auto">
                  Three simple steps to find your perfect solution
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
                {steps.map((step, index) => {
                  const IconComponent = step.icon;
                  return (
                    <div key={index} className="group relative">
                      {index < steps.length - 1 && (
                        <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gray-200" />
                      )}

                      <div className="relative space-y-4">
                        <div className="relative inline-flex">
                          <div className="w-16 h-16 bg-[#0201FF] flex items-center justify-center group-hover:bg-[#1E3F69] transition-all duration-300">
                            <span className="text-white font-light text-xl tracking-tight">
                              {step.number}
                            </span>
                          </div>
                          <div className="absolute -top-4 -right-4 w-10 h-10 bg-white border border-gray-200 flex items-center justify-center rounded-full">
                            <IconComponent className="w-5 h-5 text-[#0201FF]" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-lg lg:text-xl font-light tracking-tight text-[#1a1a1a]">
                            {step.title}
                          </h4>
                          <p className="text-sm text-[#364153] leading-relaxed font-light">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 sm:mt-20 border-t border-gray-200 pt-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="max-w-xl">
              <p className="text-base sm:text-lg lg:text-xl font-light tracking-tight text-[#364153]">
                Take our quick assessment and receive personalized
                recommendations tailored to your organization&apos;s unique
                needs.
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="group inline-flex items-center gap-3 bg-[#0201FF] text-white font-light px-8 py-4 hover:bg-[#0000d1] transition-all duration-300"
            >
              <span className="text-sm tracking-wide">Start Assessment</span>
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
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative bg-white max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors duration-300 z-10"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Modal Content */}
            <div className="p-8 sm:p-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tighter text-[#1a1a1a] mb-4">
                  Choose Your{" "}
                  <span className="text-[#0201FF] font-normal">Assessment</span>
                </h2>
                <p className="text-base sm:text-lg text-[#364153] font-light max-w-2xl mx-auto">
                  Select the assessment type that best fits your needs
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {assessmentTypes.map((type, index) => {
                  const IconComponent = type.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => handleAssessmentSelect(type.link)}
                      className="group relative p-8 bg-white border-2 border-gray-200 hover:border-[#0201FF] transition-all duration-300 hover:shadow-xl w-full text-left"
                    >
                      {/* Background Gradient */}
                      <div
                        className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${type.color} opacity-5 blur-2xl`}
                      />

                      <div className="relative">
                        {/* Icon */}
                        <div
                          className={`inline-flex w-16 h-16 bg-gradient-to-br ${type.color} items-center justify-center mb-6`}
                        >
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>

                        {/* Content */}
                        <h3 className="text-2xl font-light tracking-tight text-[#1a1a1a] mb-3">
                          {type.title}
                        </h3>
                        <p className="text-sm text-[#364153] leading-relaxed font-light mb-6">
                          {type.description}
                        </p>

                        {/* CTA */}
                        <div className="flex items-center gap-2 text-[#0201FF] font-light group-hover:gap-4 transition-all duration-300">
                          <span className="text-sm">Start This Assessment</span>
                          <svg
                            className="w-4 h-4"
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
      {/* Form Modal */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative bg-white max-w-md w-full shadow-2xl">
            {/* Close Button */}
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
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors duration-300 z-10"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Form Content */}
            <div className="p-8 sm:p-10">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-light tracking-tighter text-[#1a1a1a] mb-2">
                  Before We{" "}
                  <span className="text-[#0201FF] font-normal">Begin</span>
                </h2>
                <p className="text-sm text-[#364153] font-light">
                  Please fill in your information to get started
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-light text-[#364153] mb-2"
                  >
                    Name / Initials <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., John Doe or J.D."
                    className="w-full px-4 py-3 border-2 border-gray-200 focus:border-[#0201FF] focus:outline-none transition-colors duration-300 text-[#1a1a1a] font-light"
                  />
                </div>

                {/* Job Field */}
                <div>
                  <label
                    htmlFor="job"
                    className="block text-sm font-light text-[#364153] mb-2"
                  >
                    Occupation <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="job"
                    name="job"
                    required
                    value={formData.job}
                    onChange={handleInputChange}
                    placeholder="e.g., Marketing Manager"
                    className="w-full px-4 py-3 border-2 border-gray-200 focus:border-[#0201FF] focus:outline-none transition-colors duration-300 text-[#1a1a1a] font-light"
                  />
                </div>

                {/* Job Field */}
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-light text-[#364153] mb-2"
                  >
                    Job City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="e.g., Surabaya"
                    className="w-full px-4 py-3 border-2 border-gray-200 focus:border-[#0201FF] focus:outline-none transition-colors duration-300 text-[#1a1a1a] font-light"
                  />
                </div>

                {/* Age Field */}
                <div>
                  <label
                    htmlFor="age"
                    className="block text-sm font-light text-[#364153] mb-2"
                  >
                    Age <span className="text-red-500">*</span>
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
                    placeholder="e.g., 25"
                    className="w-full px-4 py-3 border-2 border-gray-200 focus:border-[#0201FF] focus:outline-none transition-colors duration-300 text-[#1a1a1a] font-light"
                  />
                </div>

                {/* Gender Field */}
                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-light text-[#364153] mb-2"
                  >
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    required
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 focus:border-[#0201FF] focus:outline-none transition-colors duration-300 text-[#1a1a1a] font-light bg-white"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Prefer not to say</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#0201FF] text-white font-light px-8 py-4 hover:bg-[#0000d1] transition-all duration-300 flex items-center justify-center gap-3 group"
                >
                  <span className="text-sm tracking-wide">
                    Start Assessment
                  </span>
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
                </button>
              </form>

              <p className="text-xs text-center text-[#364153] font-light mt-6">
                Your information is used solely for generating personalized
                assessment results.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
