import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import ConditionalLayout from "@/components/ConditionalLayout";

export const metadata: Metadata = {
  title: "Total Quality | TOTALLY AGENT OF CHANGE",
  description:
    "Corporate Motivator, Business Consultant, Empowering Growth and Change, Inspiring Success, Driving Results, Transforming Businesses, Leadership Development, Team Building, Performance Improvement, Innovation and Strategy",
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
