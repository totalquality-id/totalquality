"use client";

import { useState } from "react";
import { X, Mail, Lock, User, Eye, EyeOff } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  onSuccess,
}: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const body = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      console.log("API Response:", data); // Debug log

      if (!res.ok) {
        throw new Error(data.error || data.message || "Something went wrong");
      }

      // Check if data structure is correct
      if (!data || !data.data || !data.data.token || !data.data.user) {
        console.error("Invalid response structure:", data);
        throw new Error("Invalid response from server");
      }

      // Store token
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));

      // Reset form
      setFormData({ name: "", email: "", password: "" });

      // Call success callback
      onSuccess();
    } catch (err) {
      console.error("Auth error:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setFormData({ name: "", email: "", password: "" });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-white shadow-2xl animate-in zoom-in-95 duration-300"
        style={{ fontFamily: "Inter, system-ui, sans-serif" }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-8 sm:p-10">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-light tracking-tighter text-[#1a1a1a] mb-2">
              {isLogin ? "Welcome" : "Create Account"}
            </h2>
            <p className="text-sm text-[#364153] font-light">
              {isLogin
                ? "Sign in to start your application"
                : "Join us to start applying for opportunities"}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm font-light">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field (Register only) */}
            {!isLogin && (
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-light text-[#364153]"
                >
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required={!isLogin}
                    autoComplete="name"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 bg-white text-[#0b1220] placeholder:text-[#9aa4b2] caret-[#2B5589] focus:border-[#2B5589] focus:outline-none focus:ring-1 focus:ring-[#2B5589] transition-colors duration-200 text-sm font-light"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-light text-[#364153]"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 bg-white text-[#0b1220] placeholder:text-[#9aa4b2] caret-[#2B5589] focus:border-[#2B5589] focus:outline-none focus:ring-1 focus:ring-[#2B5589] transition-colors duration-200 text-sm font-light"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-light text-[#364153]"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 bg-white text-[#0b1220] placeholder:text-[#9aa4b2] caret-[#2B5589] focus:border-[#2B5589] focus:outline-none focus:ring-1 focus:ring-[#2B5589] transition-colors duration-200 text-sm font-light"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#0201FF] to-[#0000d1] text-white py-3 px-6 hover:from-[#0000d1] hover:to-[#0201FF] transition-all duration-300 font-light text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
            </button>
          </form>

          {/* Toggle Mode */}
          <div className="mt-6 text-center">
            <p className="text-sm text-[#364153] font-light">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={toggleMode}
                className="text-[#2B5589] hover:text-[#1E3F69] font-normal underline underline-offset-2 transition-colors duration-200 cursor-pointer"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>

          {/* Accent Line */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-center text-[#364153]/60 font-light">
              By continuing, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
