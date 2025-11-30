"use client";

import { useEffect, useState } from "react";
import { User, Briefcase, LogOut, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface AppliedCareer {
  id: number;
  title: string;
  location: string;
  createdAt: string;
}

export default function UserProfileSection() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [appliedCareers, setAppliedCareers] = useState<AppliedCareer[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);

      // Fetch applied careers (if you have this endpoint)
      // fetchAppliedCareers(userData.id);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.push("/");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (!user) return null;

  return (
    <section
      className="relative py-8 bg-slate-50 border-b border-gray-200"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-gray-200 overflow-hidden">
          {/* Profile Header - Always Visible */}
          <div className="p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* User Info */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0 w-14 h-14 bg-[#2B5589] rounded-full flex items-center justify-center">
                  <User className="w-7 h-7 text-white" />
                </div>

                {/* Info */}
                <div>
                  <h3 className="text-lg lg:text-xl font-light tracking-tight text-[#1a1a1a]">
                    {user.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-[#364153] font-light mt-1">
                    <Mail className="w-3.5 h-3.5" />
                    <span>{user.email}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                {/* Toggle Details Button */}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-[#364153] hover:border-gray-400 hover:bg-slate-50 transition-all duration-200"
                >
                  <Briefcase className="w-4 h-4" />
                  <span className="text-sm font-light">
                    {isExpanded ? "Hide" : "Show"} Applications
                  </span>
                </button>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 hover:border-red-300 transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm font-light">Logout</span>
                </button>
              </div>
            </div>

            {/* Member Since */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-[#364153]/60 font-light">
                Register date {formatDate(user.createdAt)}
              </p>
            </div>
          </div>

          {/* Expanded Details */}
          {isExpanded && (
            <div className="border-t border-gray-200 bg-slate-50/50">
              <div className="p-6 lg:p-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-[#0201FF]" />
                    <h4 className="text-base font-light text-[#1a1a1a]">
                      Applied Positions
                    </h4>
                  </div>

                  {appliedCareers.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-sm text-[#364153] font-light">
                        You haven&apos;t applied to any positions yet.
                      </p>
                      <p className="text-xs text-[#364153]/60 font-light mt-2">
                        Browse available careers below to get started!
                      </p>
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {appliedCareers.map((career) => (
                        <div
                          key={career.id}
                          className="bg-white border border-gray-200 p-4 hover:border-gray-300 transition-colors duration-200"
                        >
                          <h5 className="text-sm font-light text-[#1a1a1a] mb-1">
                            {career.title}
                          </h5>
                          <p className="text-xs text-[#364153] font-light">
                            {career.location}
                          </p>
                          <p className="text-xs text-[#364153]/60 font-light mt-2">
                            Applied on {formatDate(career.createdAt)}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
