import { Facebook, Linkedin, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  const footerLinks = {
    company: [
      { label: "About Us", href: "/about" },
      { label: "Our Services", href: "/services" },
      { label: "Events", href: "/events" },
      { label: "News", href: "/news" },
    ],
    resources: [
      { label: "Career", href: "/career" },
      { label: "Self Assessment", href: "/self-assessment" },
      { label: "Forum", href: "/forum" },
      { label: "Contact", href: "/contact" },
    ],
    connect: [
      {
        label: "Facebook",
        href: "https://www.facebook.com/totalquality.id/",
        Icon: Facebook,
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/pt-total-quality-indonesia/",
        Icon: Linkedin,
      },
      {
        label: "Instagram",
        href: "https://www.instagram.com/totalquality.id/",
        Icon: Instagram,
      },
      {
        label: "Twitter",
        href: "https://www.twitter.com/totalquality_id",
        Icon: Twitter,
      },
    ],
  };

  return (
    <footer className="relative bg-gradient-to-br from-[#2B5589] via-[#1e3d5f] to-[#2B5589] text-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FACC01]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      {/* Main Footer Content */}
      <div className="relative container mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-4">
              {/* Logo/Brand */}
              <div className="inline-flex items-center gap-3">
                <div className="w-12 h-12 bg-[#FACC01] rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-black text-[#2B5589]">TQ</span>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">
                    Total Quality
                  </h3>
                  <p className="text-xs text-white/70 font-semibold uppercase tracking-wider">
                    Agent of Change
                  </p>
                </div>
              </div>

              <p className="text-white/80 leading-relaxed max-w-sm">
                Empowering organizations across Southeast Asia through strategic
                HR solutions and transformative leadership development.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm">📍</span>
                </div>
                <div className="text-sm text-white/80">
                  <p className="font-semibold text-white">
                    Surabaya, Indonesia
                  </p>
                  <p>Southeast Asia Region</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">📧</span>
                </div>
                <a
                  href="mailto:info@totalquality.com"
                  className="text-sm text-white/80 hover:text-[#FACC01] transition-colors duration-300"
                >
                  info@tqpartner.com
                </a>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-lg font-black text-white uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-white/80 hover:text-[#FACC01] transition-all duration-300"
                  >
                    <span className="w-1.5 h-1.5 bg-[#FACC01] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-lg font-black text-white uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-white/80 hover:text-[#FACC01] transition-all duration-300"
                  >
                    <span className="w-1.5 h-1.5 bg-[#FACC01] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-4">
              <h4 className="text-lg font-black text-white uppercase tracking-wider">
                Connect With Us
              </h4>

              {/* Social Links */}
              <div className="flex flex-wrap gap-3">
                {footerLinks.connect.map((social, index) => {
                  const IconComponent = social.Icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className="group relative w-12 h-12 bg-white/10 hover:bg-[#FACC01] rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                      aria-label={social.label}
                    >
                      <IconComponent className="w-5 h-5 text-white group-hover:text-[#2B5589] transition-colors duration-300" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-3">
              <h5 className="text-sm font-bold text-white">Stay Updated</h5>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 text-sm focus:outline-none focus:border-[#FACC01] focus:bg-white/15 transition-all duration-300"
                />
                <button className="px-6 py-3 bg-[#FACC01] hover:bg-[#FDD835] text-[#2B5589] font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg">
                  <span className="text-lg">→</span>
                </button>
              </div>
              <p className="text-xs text-white/60">
                Get the latest news and updates
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-sm text-white/70">
              <p>
                © {new Date().getFullYear()}{" "}
                <span className="font-bold text-white">Total Quality</span>. All
                rights reserved.
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6">
              <a
                href="/privacy"
                className="text-sm text-white/70 hover:text-[#FACC01] transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <span className="w-1 h-1 bg-white/30 rounded-full" />
              <a
                href="/terms"
                className="text-sm text-white/70 hover:text-[#FACC01] transition-colors duration-300"
              >
                Terms of Service
              </a>
              <span className="w-1 h-1 bg-white/30 rounded-full" />
              <a
                href="/cookies"
                className="text-sm text-white/70 hover:text-[#FACC01] transition-colors duration-300"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
