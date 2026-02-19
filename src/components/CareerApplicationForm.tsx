/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  User,
  Briefcase,
  GraduationCap,
  FileText,
  Send,
} from "lucide-react";
import Link from "next/link";

interface Career {
  id: number;
  title: string;
  description: string;
  requirements: string;
  location: string;
  createdAt: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function CareerApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [career, setCareer] = useState<Career | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    dateOfBirth: "",
    age: "",
    gender: "",
    lastEducation: "",
    institution: "",
    major: "",
    graduationYear: "",
    gpa: "",
    lastCompany: "",
    lastPosition: "",
    workStartDate: "",
    workEndDate: "",
    jobDescription: "",
    reasonLeaving: "",
    skills: "",
    certifications: "",
    portfolioUrl: "",
    linkedinUrl: "",
    coverLetter: "",
    expectedSalary: "",
    availableDate: "",
  });

  useEffect(() => {
    const pathParts = window.location.pathname.split("/");
    const careerId = pathParts[2];

    if (careerId) {
      fetchCareer(careerId);
    } else {
      setLoading(false);
    }

    loadUserData();
  }, []);

  const fetchCareer = async (id: string) => {
    try {
      const res = await fetch(`/api/careers/${id}`);
      const data = await res.json();

      if (data.success) {
        setCareer(data.data);
      } else {
        setCareer(data);
      }
    } catch (error) {
      console.error("Error fetching career:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const userStr = localStorage.getItem("user");
      if (!userStr) return;

      const user = JSON.parse(userStr);

      const res = await fetch(`/api/users/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (data.success && data.data) {
        const userData = data.data;
        setFormData((prev) => ({
          ...prev,
          phone: userData.phone || "",
          address: userData.address || "",
          dateOfBirth: userData.dateOfBirth
            ? userData.dateOfBirth.split("T")[0]
            : "",
          age: userData.age?.toString() || "",
          gender: userData.gender || "",
          lastEducation: userData.lastEducation || "",
          institution: userData.institution || "",
          major: userData.major || "",
          graduationYear: userData.graduationYear?.toString() || "",
          gpa: userData.gpa?.toString() || "",
          lastCompany: userData.lastCompany || "",
          lastPosition: userData.lastPosition || "",
          workStartDate: userData.workStartDate
            ? userData.workStartDate.split("T")[0]
            : "",
          workEndDate: userData.workEndDate
            ? userData.workEndDate.split("T")[0]
            : "",
          jobDescription: userData.jobDescription || "",
          reasonLeaving: userData.reasonLeaving || "",
          skills: userData.skills || "",
          certifications: userData.certifications || "",
          portfolioUrl: userData.portfolioUrl || "",
          linkedinUrl: userData.linkedinUrl || "",
        }));
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const steps = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Education", icon: GraduationCap },
    { number: 3, title: "Experience", icon: Briefcase },
    { number: 4, title: "Additional", icon: FileText },
    { number: 5, title: "Review", icon: CheckCircle },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!formData.phone) newErrors.phone = "Phone is required";
      if (!formData.address) newErrors.address = "Address is required";
      if (!formData.dateOfBirth)
        newErrors.dateOfBirth = "Date of birth is required";
      if (!formData.gender) newErrors.gender = "Gender is required";
    } else if (step === 2) {
      if (!formData.lastEducation)
        newErrors.lastEducation = "Education level is required";
      if (!formData.institution)
        newErrors.institution = "Institution is required";
      if (!formData.graduationYear)
        newErrors.graduationYear = "Graduation year is required";
    } else if (step === 4) {
      if (!formData.coverLetter)
        newErrors.coverLetter = "Cover letter is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");

      if (!token || !userStr) {
        throw new Error("User not authenticated");
      }

      const user = JSON.parse(userStr);

      // 1. UPDATE USER PROFILE
      const updateRes = await fetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          phone: formData.phone,
          address: formData.address,
          dateOfBirth: formData.dateOfBirth,
          age: parseInt(formData.age) || null,
          gender: formData.gender,
          lastEducation: formData.lastEducation,
          institution: formData.institution,
          major: formData.major,
          graduationYear: parseInt(formData.graduationYear) || null,
          gpa: parseFloat(formData.gpa) || null,
          lastCompany: formData.lastCompany,
          lastPosition: formData.lastPosition,
          workStartDate: formData.workStartDate || null,
          workEndDate: formData.workEndDate || null,
          jobDescription: formData.jobDescription,
          reasonLeaving: formData.reasonLeaving,
          skills: formData.skills,
          certifications: formData.certifications,
          portfolioUrl: formData.portfolioUrl,
          linkedinUrl: formData.linkedinUrl,
          isProfileComplete: true,
        }),
      });

      if (!updateRes.ok) {
        throw new Error("Failed to update profile");
      }

      // 2. SUBMIT APPLICATION
      const pathParts = window.location.pathname.split("/");
      const careerId = pathParts[2];

      const applyRes = await fetch(`/api/careers/${careerId}/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          coverLetter: formData.coverLetter,
          expectedSalary: formData.expectedSalary,
          availableDate: formData.availableDate || null,
        }),
      });

      const applyData = await applyRes.json();

      if (applyRes.ok) {
        alert("Application submitted successfully!");
        window.location.href = "/career";
      } else {
        throw new Error(applyData.error || "Failed to submit application");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to submit application";
      alert(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (!career) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Career not found</p>
          <Link href="/career" className="text-blue-600 hover:underline">
            Back to Careers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* Background Elements */}
      <div className="fixed top-1/4 left-10 w-72 h-72 bg-[#2B5589]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 right-10 w-64 h-64 bg-[#FACC01]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/career"
            className="inline-flex items-center text-sm text-[#364153] hover:text-[#0201FF] transition-colors duration-200 font-light"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Careers
          </Link>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-base sm:text-lg font-light tracking-tighter text-[#364153] mb-1">
              Application Form
            </h2>
            <div className="w-full h-[1px] bg-gray-300 mb-8"></div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter text-[#1a1a1a] leading-tight mb-4">
              Apply for{" "}
              <span className="text-[#0201FF] font-normal">
                {career?.title}
              </span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl font-light tracking-tight text-[#364153]">
              Complete your profile to submit your application
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 flex items-center justify-center mb-2 transition-all duration-300 ${
                        currentStep >= step.number
                          ? "bg-[#0201FF] text-white"
                          : "bg-slate-50 border border-gray-200 text-gray-400"
                      }`}
                    >
                      <step.icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-xs font-light ${
                        currentStep >= step.number
                          ? "text-[#0201FF]"
                          : "text-gray-400"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-0.5 flex-1 mx-2 transition-all duration-300 ${
                        currentStep > step.number
                          ? "bg-[#0201FF]"
                          : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto bg-white border border-gray-200 p-8 lg:p-12 mb-12">
            {" "}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl lg:text-3xl font-light tracking-tight text-[#1a1a1a] mb-8">
                  Personal Information
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-light text-[#364153] mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 bg-white text-[#1a1a1a] placeholder:text-[#9aa4b2] caret-[#2B5589] focus:border-[#2B5589] focus:outline-none focus:ring-1 focus:ring-[#2B5589] transition-colors duration-200 text-sm font-light"
                      placeholder="+62 812 3456 7890"
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-600 mt-1 font-light">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-light text-[#364153] mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 bg-white text-[#1a1a1a] placeholder:text-[#9aa4b2] caret-[#2B5589] focus:border-[#2B5589] focus:outline-none focus:ring-1 focus:ring-[#2B5589] transition-colors duration-200 text-sm font-light"
                    />
                    {errors.dateOfBirth && (
                      <p className="text-xs text-red-600 mt-1 font-light">
                        {errors.dateOfBirth}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-light text-[#364153] mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 bg-white text-[#1a1a1a] placeholder:text-[#9aa4b2] caret-[#2B5589] focus:border-[#2B5589] focus:outline-none focus:ring-1 focus:ring-[#2B5589] transition-colors duration-200 text-sm font-light"
                      placeholder="25"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-light text-[#364153] mb-2">
                      Gender *
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 bg-white text-[#1a1a1a] focus:border-[#2B5589] focus:outline-none focus:ring-1 focus:ring-[#2B5589] transition-colors duration-200 text-sm font-light"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && (
                      <p className="text-xs text-red-600 mt-1 font-light">
                        {errors.gender}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-light text-[#364153] mb-2">
                    Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 bg-white text-[#1a1a1a] placeholder:text-[#9aa4b2] caret-[#2B5589] focus:border-[#2B5589] focus:outline-none focus:ring-1 focus:ring-[#2B5589] transition-colors duration-200 text-sm font-light"
                    placeholder="Your full address"
                  />
                  {errors.address && (
                    <p className="text-xs text-red-600 mt-1 font-light">
                      {errors.address}
                    </p>
                  )}
                </div>
              </div>
            )}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl lg:text-3xl font-light tracking-tight text-[#1a1a1a] mb-8">
                  Educational Background
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-light text-[#364153] mb-2">
                      Last Education *
                    </label>
                    <select
                      name="lastEducation"
                      value={formData.lastEducation}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 bg-white text-[#1a1a1a] focus:border-[#2B5589] focus:outline-none focus:ring-1 focus:ring-[#2B5589] transition-colors duration-200 text-sm font-light"
                    >
                      <option value="">Select Education Level</option>
                      <option value="SMA">SMA/SMK</option>
                      <option value="D3">D3</option>
                      <option value="S1">S1 (Bachelor)</option>
                      <option value="S2">S2 (Master)</option>
                      <option value="S3">S3 (PhD)</option>
                    </select>
                    {errors.lastEducation && (
                      <p className="text-xs text-red-600 mt-1 font-light">
                        {errors.lastEducation}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-light text-[#364153] mb-2">
                      Institution *
                    </label>
                    <input
                      type="text"
                      name="institution"
                      value={formData.institution}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 bg-white text-[#1a1a1a] placeholder:text-[#9aa4b2] caret-[#2B5589] focus:border-[#2B5589] focus:outline-none focus:ring-1 focus:ring-[#2B5589] transition-colors duration-200 text-sm font-light"
                      placeholder="University/School Name"
                    />
                    {errors.institution && (
                      <p className="text-xs text-red-600 mt-1 font-light">
                        {errors.institution}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-light text-[#364153] mb-2">
                      Major/Field of Study
                    </label>
                    <input
                      type="text"
                      name="major"
                      value={formData.major}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 bg-white text-[#1a1a1a] placeholder:text-[#9aa4b2] caret-[#2B5589] focus:border-[#2B5589] focus:outline-none focus:ring-1 focus:ring-[#2B5589] transition-colors duration-200 text-sm font-light"
                      placeholder="Computer Science"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-light text-[#364153] mb-2">
                      Graduation Year *
                    </label>
                    <input
                      type="number"
                      name="graduationYear"
                      value={formData.graduationYear}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 bg-white text-[#1a1a1a] placeholder:text-[#9aa4b2] caret-[#2B5589] focus:border-[#2B5589] focus:outline-none focus:ring-1 focus:ring-[#2B5589] transition-colors duration-200 text-sm font-light"
                      placeholder="2023"
                    />
                    {errors.graduationYear && (
                      <p className="text-xs text-red-600 mt-1 font-light">
                        {errors.graduationYear}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-light text-[#364153] mb-2">
                      GPA
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      name="gpa"
                      value={formData.gpa}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 bg-white text-[#1a1a1a] placeholder:text-[#9aa4b2] caret-[#2B5589] focus:border-[#2B5589] focus:outline-none focus:ring-1 focus:ring-[#2B5589] transition-colors duration-200 text-sm font-light"
                      placeholder="3.75"
                    />
                  </div>
                </div>
              </div>
            )}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl lg:text-3xl font-light tracking-tight text-[#1a1a1a] mb-8">
                  Work Experience
                </h2>
                <p className="text-sm text-[#364153]/80 font-light mb-6">
                  Optional - Skip if you&apos;re a fresh graduate
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-light text-[#364153] mb-2">
                      Last Company
                    </label>
                    <input
                      type="text"
                      name="lastCompany"
                      value={formData.lastCompany}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 bg-white text-[#1a1a1a] placeholder:text-[#9aa4b2] caret-[#2B5589] focus:border-[#2B5589] focus:outline-none focus:ring-1 focus:ring-[#2B5589] transition-colors duration-200 text-sm font-light"
                      placeholder="PT. Example Indonesia"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-light text-[#364153] mb-2">
                      Last Position
                    </label>
                    <input
                      type="text"
                      name="lastPosition"
                      value={formData.lastPosition}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 bg-white text-[#1a1a1a] placeholder:text-[#9aa4b2] caret-[#2B5589] focus:border-[#2B5589] focus:outline-none focus:ring-1 focus:ring-[#2B5589] transition-colors duration-200 text-sm font-light"
                      placeholder="Software Engineer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-light text-[#364153] mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="workStartDate"
                      value={formData.workStartDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 bg-white text-[#1a1a1a] placeholder:text-[#9aa4b2] caret-[#2B5589] focus:border-[#2B5589] focus:outline-none focus:ring-1 focus:ring-[#2B5589] transition-colors duration-200 text-sm font-light"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-light text-[#364153] mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      name="workEndDate"
                      value={formData.workEndDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 bg-white text-[#1a1a1a] placeholder:text-[#9aa4b2] caret-[#2B5589] focus:border-[#2B5589] focus:outline-none focus:ring-1 focus:ring-[#2B5589] transition-colors duration-200 text-sm font-light"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-light text-[#364153] mb-2">
                    Job Description
                  </label>
                  <textarea
                    name="jobDescription"
                    value={formData.jobDescription}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 bg-white text-[#1a1a1a] placeholder:text-[#9aa4b2] caret-[#2B5589] focus:border-[#2B5589] focus:outline-none focus:ring-1 focus:ring-[#2B5589] transition-colors duration-200 text-sm font-light"
                    placeholder="Describe your responsibilities and achievements..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-light text-[#364153] mb-2">
                    Reason for Leaving
                  </label>
                  <textarea
                    name="reasonLeaving"
                    value={formData.reasonLeaving}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 bg-white text-[#1a1a1a] placeholder:text-[#9aa4b2] caret-[#2B5589] focus:border-[#2B5589] focus:outline-none focus:ring-1 focus:ring-[#2B5589] transition-colors duration-200 text-sm font-light"
                    placeholder="Why did you leave or why are you looking for a new opportunity?"
                  />
                </div>
              </div>
            )}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl lg:text-3xl font-light tracking-tight text-[#1a1a1a] mb-8">
                  Additional Information
                </h2>

                <div>
                  <label className="block text-sm font-light text-[#364153] mb-2">
                    Skills
                  </label>
                  <textarea
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 bg-white text-[#1a1a1a] placeholder:text-[#9aa4b2] caret-[#2B5589] focus:border-[#2B5589] focus:outline-none focus:ring-1 focus:ring-[#2B5589] transition-colors duration-200 text-sm font-light"
                    placeholder="JavaScript, React, Node.js, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-light text-[#364153] mb-2">
                    Certifications
                  </label>
                  <textarea
                    name="certifications"
                    value={formData.certifications}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-300 bg-white text-[#1a1a1a] placeholder:text-[#9aa4b2] caret-[#2B5589] focus:border-[#2B5589] focus:outline-none focus:ring-1 focus:ring-[#2B5589] transition-colors duration-200 text-sm font-light"
                    placeholder="AWS Certified, Google Analytics, etc."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-light text-[#364153] mb-2">
                      Portfolio URL
                    </label>
                    <input
                      type="url"
                      name="portfolioUrl"
                      value={formData.portfolioUrl}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 bg-white text-[#1a1a1a] placeholder:text-[#9aa4b2] caret-[#2B5589] focus:border-[#2B5589] focus:outline-none focus:ring-1 focus:ring-[#2B5589] transition-colors duration-200 text-sm font-light"
                      placeholder="https://yourportfolio.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-light text-[#364153] mb-2">
                      LinkedIn URL
                    </label>
                    <input
                      type="url"
                      name="linkedinUrl"
                      value={formData.linkedinUrl}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 bg-white text-[#1a1a1a] placeholder:text-[#9aa4b2] caret-[#2B5589] focus:border-[#2B5589] focus:outline-none focus:ring-1 focus:ring-[#2B5589] transition-colors duration-200 text-sm font-light"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-light text-[#364153] mb-2">
                    Cover Letter *
                  </label>
                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 bg-white text-[#1a1a1a] placeholder:text-[#9aa4b2] caret-[#2B5589] focus:border-[#2B5589] focus:outline-none focus:ring-1 focus:ring-[#2B5589] transition-colors duration-200 text-sm font-light"
                    placeholder="Tell us why you're a great fit for this position..."
                  />
                  {errors.coverLetter && (
                    <p className="text-xs text-red-600 mt-1 font-light">
                      {errors.coverLetter}
                    </p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-light text-[#364153] mb-2">
                      Expected Salary
                    </label>
                    <input
                      type="text"
                      name="expectedSalary"
                      value={formData.expectedSalary}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 bg-white text-[#1a1a1a] placeholder:text-[#9aa4b2] caret-[#2B5589] focus:border-[#2B5589] focus:outline-none focus:ring-1 focus:ring-[#2B5589] transition-colors duration-200 text-sm font-light"
                      placeholder="Rp 10,000,000 - Rp 15,000,000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-light text-[#364153] mb-2">
                      Available Start Date
                    </label>
                    <input
                      type="date"
                      name="availableDate"
                      value={formData.availableDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 bg-white text-[#1a1a1a] placeholder:text-[#9aa4b2] caret-[#2B5589] focus:border-[#2B5589] focus:outline-none focus:ring-1 focus:ring-[#2B5589] transition-colors duration-200 text-sm font-light"
                    />
                  </div>
                </div>
              </div>
            )}
            {currentStep === 5 && (
              <div className="space-y-6">
                <h2 className="text-2xl lg:text-3xl font-light tracking-tight text-[#1a1a1a] mb-8">
                  Review Your Appication
                </h2>

                <div className="bg-gradient-to-r from-[#0201FF]/5 to-[#0000d1]/5 border border-[#0201FF]/10 p-6 lg:p-8 mb-8">
                  <h3 className="text-xl lg:text-2xl font-light tracking-tight text-[#1a1a1a] mb-2">
                    Position: {career?.title}
                  </h3>
                  <p className="text-sm lg:text-base text-[#364153] font-light">
                    {career?.location}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="border-b border-gray-100 pb-6">
                    <h4 className="text-base font-light text-[#1a1a1a] mb-4">
                      Personal Information
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-[#364153] font-light">
                      <p>
                        <span className="font-normal text-[#1a1a1a]">
                          Phone:
                        </span>{" "}
                        {formData.phone}
                      </p>
                      <p>
                        <span className="font-normal text-[#1a1a1a]">
                          Date of Birth:
                        </span>{" "}
                        {formData.dateOfBirth}
                      </p>
                      <p>
                        <span className="font-normal text-[#1a1a1a]">
                          Gender:
                        </span>{" "}
                        {formData.gender}
                      </p>
                      <p className="md:col-span-2">
                        <span className="font-normal text-[#1a1a1a]">
                          Address:
                        </span>{" "}
                        {formData.address}
                      </p>
                    </div>
                  </div>

                  <div className="border-b pb-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Education
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <p>
                        <span className="font-medium">Level:</span>{" "}
                        {formData.lastEducation}
                      </p>
                      <p>
                        <span className="font-medium">Institution:</span>{" "}
                        {formData.institution}
                      </p>
                      <p>
                        <span className="font-medium">Major:</span>{" "}
                        {formData.major || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Graduation:</span>{" "}
                        {formData.graduationYear}
                      </p>
                    </div>
                  </div>

                  {formData.lastCompany && (
                    <div className="border-b pb-4">
                      <h4 className="font-medium text-gray-900 mb-2">
                        Work Experience
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <p>
                          <span className="font-medium">Company:</span>{" "}
                          {formData.lastCompany}
                        </p>
                        <p>
                          <span className="font-medium">Position:</span>{" "}
                          {formData.lastPosition}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="bg-[#FACC01]/10 border border-[#FACC01]/30 p-6">
                    <p className="text-sm text-[#364153] font-light">
                      <strong className="font-normal text-[#1a1a1a]">
                        Important:
                      </strong>{" "}
                      By submitting this application, you confirm that all
                      information provided is accurate and complete.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="max-w-4xl mx-auto flex justify-between items-center">
            {currentStep > 1 && (
              <button
                onClick={prevStep}
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-[#364153] hover:border-gray-400 hover:bg-slate-50 transition-all duration-200 font-light text-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
            )}

            <div className="flex-1" />

            {currentStep < 5 ? (
              <button
                onClick={nextStep}
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#0201FF] to-[#0000d1] text-white hover:from-[#0000d1] hover:to-[#0201FF] transition-all duration-300 font-light text-sm"
              >
                <span>Next Step</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#2B5589] to-[#0201FF] text-white hover:from-[#0201FF] hover:to-[#2B5589] transition-all duration-300 font-light text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                <span>
                  {submitting ? "Submitting..." : "Submit Application"}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
