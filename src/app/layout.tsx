import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import ConditionalLayout from "@/components/ConditionalLayout";

export const metadata: Metadata = {
  title: "Total Quality | THE BEST CORPORATE MOTIVATOR",
  description: "Corporate Motivator & Human Resources Consultant",
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-900`}>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
