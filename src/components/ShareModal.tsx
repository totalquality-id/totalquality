"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import Image from "next/image";
import {
  X,
  Download,
  Share2,
  Palette,
  Type,
  Image as ImageIcon,
  Sparkles,
  CircleDot,
} from "lucide-react";
import React from "react";

// Mode type
type Mode = "color" | "gradient" | "image";

// Icon component type (SVG React component)
type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

interface ShareModalProps {
  quote: string;
  author: string;
  onClose: () => void;
}

export default function ShareModal({
  quote,
  author,
  onClose,
}: ShareModalProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const [mode, setMode] = useState<Mode>("gradient");
  const [bgColor, setBgColor] = useState("#2B5589");
  const [gradient, setGradient] = useState("from-[#2B5589] to-[#1E3F69]");
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [font, setFont] = useState("font-light italic");
  const [textColor, setTextColor] = useState("#ffffff");

  const gradients: { name: string; colors: [string, string] }[] = [
    { name: "from-[#2B5589] to-[#1E3F69]", colors: ["#2B5589", "#1E3F69"] },
    { name: "from-[#FACC01] to-[#E89A00]", colors: ["#FACC01", "#E89A00"] },
    { name: "from-[#FF7E5F] to-[#FEB47B]", colors: ["#FF7E5F", "#FEB47B"] },
    { name: "from-[#8E2DE2] to-[#4A00E0]", colors: ["#8E2DE2", "#4A00E0"] },
    { name: "from-[#00c6ff] to-[#0072ff]", colors: ["#00c6ff", "#0072ff"] },
    { name: "from-[#11998e] to-[#38ef7d]", colors: ["#11998e", "#38ef7d"] },
  ];

  const fonts = [
    { name: "Classic", class: "font-light italic", preview: "Aa" },
    { name: "Bold", class: "font-semibold", preview: "Aa" },
    { name: "Serif", class: "font-serif italic", preview: "Aa" },
    { name: "Modern", class: "font-medium tracking-tight", preview: "Aa" },
  ];

  const textColors = [
    { name: "White", value: "#ffffff" },
    { name: "Black", value: "#000000" },
    { name: "Gray", value: "#6B7280" },
    { name: "Navy", value: "#2B5589" },
    { name: "Gold", value: "#FACC01" },
    { name: "Cream", value: "#F5F5DC" },
  ];

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setBgImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleDownload = async () => {
    if (!ref.current) return;
    try {
      const dataUrl = await toPng(ref.current, { quality: 1, pixelRatio: 2 });
      const link = document.createElement("a");
      link.download = `quote-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  const shareToSocialMedia = async (platform: string) => {
    if (!ref.current) return;
    try {
      const dataUrl = await toPng(ref.current, { quality: 1, pixelRatio: 2 });
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], "quote.png", { type: "image/png" });

      const text = `"${quote}" — ${author}`;

      if (platform === "whatsapp") {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, "_blank");
      } else if (platform === "instagram") {
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: "Share Quote",
            text: text,
          });
        } else {
          alert(
            "Instagram sharing requires downloading the image first. Please use the Download button."
          );
        }
      } else if (platform === "twitter") {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          text
        )}`;
        window.open(twitterUrl, "_blank");
      } else if (platform === "facebook") {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          window.location.href
        )}&quote=${encodeURIComponent(text)}`;
        window.open(facebookUrl, "_blank");
      } else if (platform === "native") {
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: "Inspirational Quote",
            text: text,
          });
        } else {
          alert(
            "Sharing not supported on this device. Try downloading instead!"
          );
        }
      }
    } catch (err) {
      console.log("Share cancelled or failed:", err);
    }
  };

  // helper to render icon buttons (typed)
  const backgroundOptions: {
    value: Mode;
    label: string;
    icon: IconComponent;
  }[] = [
    { value: "gradient", label: "Gradient", icon: Sparkles },
    { value: "color", label: "Solid", icon: CircleDot },
    { value: "image", label: "Image", icon: ImageIcon },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto relative shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 sm:px-8 py-6 flex items-center justify-between z-10">
          <div>
            <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-[#1a1a1a]">
              Customize &{" "}
              <span className="font-normal text-[#2B5589]">Share</span>
            </h3>
            <p className="text-sm text-[#364153] font-light mt-1">
              Create your perfect quote design
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-300"
            aria-label="Close share modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 p-6 sm:p-8">
          {/* Left Side - Customization */}
          <div className="space-y-6">
            {/* Background Style Card */}
            <div className="bg-white border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 border border-gray-200 flex items-center justify-center">
                  <Palette className="w-5 h-5 text-[#364153]" />
                </div>
                <h4 className="text-lg font-light text-[#1a1a1a]">
                  Background Style
                </h4>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {backgroundOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.value}
                      onClick={() => setMode(option.value)}
                      className={`relative overflow-hidden p-4 border transition-all duration-300 group ${
                        mode === option.value
                          ? "bg-[#2B5589] text-white border-[#2B5589] shadow-lg"
                          : "bg-white text-[#364153] border-gray-200 hover:border-gray-300 hover:shadow-md"
                      }`}
                      aria-pressed={mode === option.value}
                      type="button"
                    >
                      <Icon className="w-6 h-6 mb-2 mx-auto" />
                      <span className="text-xs font-light block">
                        {option.label}
                      </span>
                      {mode === option.value && (
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Gradient Palette */}
              {mode === "gradient" && (
                <div className="space-y-3">
                  <p className="text-sm font-light text-[#364153]">
                    Choose your gradient
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {gradients.map((g) => (
                      <button
                        key={g.name}
                        onClick={() => setGradient(g.name)}
                        className={`relative h-20 overflow-hidden border-2 transition-all duration-300 ${
                          gradient === g.name
                            ? "border-[#393939] ring-2 ring-gray-300 shadow-lg"
                            : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                        }`}
                        style={{
                          background: `linear-gradient(135deg, ${g.colors[0]}, ${g.colors[1]})`,
                        }}
                        type="button"
                        aria-label={`Select gradient ${g.name}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Solid Color Picker */}
              {mode === "color" && (
                <div className="space-y-3">
                  <p className="text-sm font-light text-[#364153]">
                    Pick your color
                  </p>
                  <div className="flex items-center gap-4 p-4 bg-white border border-gray-200">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-20 h-20 border-2 border-gray-200 rounded-lg cursor-pointer"
                      aria-label="Choose background color"
                    />
                    <div className="flex-1">
                      <p className="text-lg font-mono text-[#1a1a1a] mb-1">
                        {bgColor}
                      </p>
                      <p className="text-xs font-light text-[#364153]">
                        Click to change color
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Image Upload */}
              {mode === "image" && (
                <div className="space-y-3">
                  <p className="text-sm font-light text-[#364153]">
                    Upload background
                  </p>

                  {!bgImage ? (
                    <div className="relative border-2 border-dashed border-gray-300 p-8 text-center hover:border-gray-400 transition-all duration-300 bg-white group cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        id="image-upload"
                      />
                      <div className="relative z-10 pointer-events-none">
                        <div className="w-16 h-16 mx-auto border border-gray-200 flex items-center justify-center mb-3 group-hover:border-gray-300 transition-all duration-300">
                          <ImageIcon className="w-8 h-8 text-[#364153]" />
                        </div>
                        <p className="text-sm font-light text-[#364153] mb-1">
                          Drop image here or click to browse
                        </p>
                        <p className="text-xs text-gray-400">
                          PNG, JPG up to 10MB
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-4 bg-white border border-gray-200">
                        <div className="w-12 h-12 border border-gray-200 flex items-center justify-center flex-shrink-0">
                          <ImageIcon className="w-6 h-6 text-[#364153]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-light text-[#364153] mb-1 flex items-center gap-2">
                            <span className="text-green-600">✓</span> Image
                            uploaded successfully
                          </p>
                          <p className="text-xs text-gray-400 truncate">
                            Background image is ready
                          </p>
                        </div>
                      </div>

                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          id="image-change"
                        />
                        <button
                          type="button"
                          className="w-full flex items-center justify-center gap-2 py-3 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 text-sm font-light text-[#364153]"
                        >
                          <ImageIcon className="w-4 h-4" />
                          Change Image
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Font Style Card */}
            <div className="bg-white border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 border border-gray-200 flex items-center justify-center">
                  <Type className="w-5 h-5 text-[#364153]" />
                </div>
                <h4 className="text-lg font-light text-[#1a1a1a]">
                  Text Style
                </h4>
              </div>

              <div className="space-y-6">
                {/* Font Style */}
                <div>
                  <p className="text-sm font-light text-[#364153] mb-3">
                    Font Style
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {fonts.map((f) => (
                      <button
                        key={f.name}
                        onClick={() => setFont(f.class)}
                        className={`relative p-5 border transition-all duration-300 overflow-hidden group ${
                          font === f.class
                            ? "bg-gradient-to-br from-[#2B5589] to-[#1E3F69] text-white border-[#2B5589] shadow-lg"
                            : "bg-white text-[#364153] border-gray-200 hover:border-[#2B5589] hover:shadow-md"
                        }`}
                        type="button"
                        aria-pressed={font === f.class}
                      >
                        <div className={`text-3xl mb-2 ${f.class}`}>
                          {f.preview}
                        </div>
                        <span className="text-xs font-light block">
                          {f.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Text Color */}
                <div>
                  <p className="text-sm font-light text-[#364153] mb-3">
                    Text Color
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {textColors.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setTextColor(color.value)}
                        className={`relative p-4 border transition-all duration-300 group ${
                          textColor === color.value
                            ? "border-[#1a1a1a] ring-2 ring-gray-300 shadow-lg"
                            : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                        }`}
                        type="button"
                        aria-pressed={textColor === color.value}
                      >
                        <div
                          className="w-full h-12 mb-2 border border-gray-200"
                          style={{ backgroundColor: color.value }}
                        />
                        <span className="text-xs font-light block text-[#364153]">
                          {color.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Preview & Actions */}
          <div className="space-y-6">
            {/* Preview Card */}
            <div className="bg-white border border-gray-200 p-6">
              <h4 className="text-lg font-light text-[#1a1a1a] mb-4 flex items-center gap-2">
                Preview
              </h4>

              <div className="flex justify-center">
                <div
                  ref={ref}
                  className="w-[270px] h-[480px] flex flex-col relative overflow-hidden shadow-2xl"
                  style={
                    mode === "color"
                      ? { backgroundColor: bgColor }
                      : mode === "gradient"
                      ? {
                          background: `linear-gradient(135deg, ${gradients
                            .find((g) => g.name === gradient)
                            ?.colors.join(", ")})`,
                        }
                      : bgImage
                      ? {
                          backgroundImage: `url(${bgImage})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }
                      : {
                          background:
                            "linear-gradient(135deg, #2B5589, #1E3F69)",
                        }
                  }
                >
                  {/* Logo at Top Center */}
                  <div className="absolute top-8 left-1/2 -translate-x-1/2">
                    <Image
                      src="/tq-logo.png"
                      alt="TQ Logo"
                      width={60}
                      height={60}
                      className="opacity-90 drop-shadow-2xl"
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />

                  {/* Quote Content - Centered */}
                  <div className="relative flex-1 flex flex-col items-center justify-center text-center px-8">
                    <p
                      className={`text-lg leading-relaxed mb-6 ${font}`}
                      style={{
                        color: textColor,
                        textShadow: "0 2px 15px rgba(0,0,0,0.4)",
                      }}
                    >
                      "{quote}"
                    </p>
                    <p
                      className="text-sm font-light"
                      style={{
                        color: textColor,
                        textShadow: "0 2px 10px rgba(0,0,0,0.4)",
                      }}
                    >
                      — {author}
                    </p>
                  </div>

                  {/* Hashtag at Bottom */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
                    <p
                      className="text-xs opacity-90 tracking-wide"
                      style={{
                        textShadow: "0 1px 5px rgba(0,0,0,0.3)",
                        color: textColor,
                      }}
                    >
                      #AgentOfChange
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {/* Download */}
              <button
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#2B5589] to-[#1E3F69] text-white py-4 hover:shadow-lg transition-all duration-300 font-light group"
              >
                <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Download Image</span>
              </button>

              {/* Social Media Grid */}
              <div className="bg-white border border-gray-200 p-6">
                <p className="text-sm font-light text-[#364153] mb-4 flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-[#364153]" />
                  Share to Social Media
                </p>
                <div className="grid grid-cols-4 gap-3">
                  <button
                    onClick={() => shareToSocialMedia("whatsapp")}
                    className="group relative p-4 border border-gray-200 hover:border-[#25D366] hover:shadow-lg transition-all duration-300 overflow-hidden"
                    type="button"
                  >
                    <div className="absolute inset-0 bg-[#25D366]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative">
                      <div className="w-12 h-12 mx-auto rounded-full bg-[#25D366] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                        <svg
                          className="w-7 h-7 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => shareToSocialMedia("instagram")}
                    className="group relative p-4 border border-gray-200 hover:border-[#E4405F] hover:shadow-lg transition-all duration-300 overflow-hidden"
                    type="button"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#833AB4]/5 via-[#FD1D1D]/5 to-[#F77737]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative">
                      <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                        <svg
                          className="w-7 h-7 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                        </svg>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => shareToSocialMedia("twitter")}
                    className="group relative p-4 border border-gray-200 hover:border-black hover:shadow-lg transition-all duration-300 overflow-hidden"
                    type="button"
                  >
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative">
                      <div className="w-12 h-12 mx-auto rounded-full bg-black flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => shareToSocialMedia("facebook")}
                    className="group relative p-4 border border-gray-200 hover:border-[#1877F2] hover:shadow-lg transition-all duration-300 overflow-hidden"
                    type="button"
                  >
                    <div className="absolute inset-0 bg-[#1877F2]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative">
                      <div className="w-12 h-12 mx-auto rounded-full bg-[#1877F2] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                        <svg
                          className="w-7 h-7 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* end modal container */}
    </div>
  );
}
