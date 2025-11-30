import {
  Facebook,
  Linkedin,
  Instagram,
  Twitter,
  MapPin,
  Mail,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

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
    <footer
      className="relative bg-black text-white overflow-hidden"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-4">
              {/* Logo/Brand */}
              <div className="inline-flex items-center gap-3">
                <div className="w-12 h-12 bg-white flex items-center justify-center p-2 relative">
                  <Image
                    src="/tq-logo.png"
                    alt="Total Quality Logo"
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-light text-white tracking-tight">
                    Total Quality
                  </h3>
                  <p className="text-xs text-white/70 font-light tracking-widest uppercase">
                    Totally Agent of Change
                  </p>
                </div>
              </div>

              <p className="text-white/80 leading-relaxed max-w-sm font-light text-sm">
                Driving organizational success through culture transformation
                and human empowerment.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div className="text-sm text-white/80 font-light">
                  <p className="font-normal text-white mb-0.5">
                    Surabaya, Indonesia
                  </p>
                  <p>Southeast Asia Region</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <a
                  href="mailto:info@tqpartner.com"
                  className="text-sm text-white font-light hover:text-white/80 transition-colors duration-300"
                >
                  info@tqpartner.com
                </a>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-sm font-light text-white tracking-widest uppercase">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-white/70 hover:text-white transition-all duration-300"
                  >
                    <span className="text-sm font-light group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-sm font-light text-white tracking-widest uppercase">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-white/70 hover:text-white transition-all duration-300"
                  >
                    <span className="text-sm font-light group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-6">
              <h4 className="text-sm font-light text-white tracking-widest uppercase">
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
                      className="group relative w-12 h-12 bg-white/10 hover:bg-white flex items-center justify-center transition-all duration-300"
                      aria-label={social.label}
                    >
                      <IconComponent className="w-5 h-5 text-white group-hover:text-[#0201FF] transition-colors duration-300" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <h5 className="text-sm font-light text-white">Stay Updated</h5>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm font-light focus:outline-none focus:border-[#FACC01] focus:bg-white/15 transition-all duration-300"
                />
                <button className="px-6 py-3 bg-[#FACC01] hover:bg-[#FDD835] text-[#0201FF] transition-all duration-300 cursor-pointer">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-white/60 font-light">
                Get the latest news and updates
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-sm text-white/70 font-light">
              <p>
                © {new Date().getFullYear()}{" "}
                <span className="font-normal text-white">
                  Total Quality Indonesia
                </span>
                . All rights reserved.
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-8">
              <a
                href="/privacy"
                className="text-sm text-white/70 font-light hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-sm text-white/70 font-light hover:text-white transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="/cookies"
                className="text-sm text-white/70 font-light hover:text-white transition-colors duration-300"
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
