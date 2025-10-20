import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ServiceSection from "@/components/ServiceSection";
import EventSection from "@/components/EventSection";
import NewsSection from "@/components/NewsSection";
import CareerSection from "@/components/CareerSection";
import ForumSection from "@/components/ForumSection";
import SelfAssessmentSection from "@/components/SelfAssessmentSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServiceSection />
      <EventSection />
      <NewsSection />
      <CareerSection />
      <ForumSection />
      <SelfAssessmentSection />
    </>
  );
}
