import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Events from "@/components/Events";
import News from "@/components/News";
import Career from "@/components/Career";
import Forum from "@/components/Forum";
import SelfAssessment from "@/components/SelfAssessment";
import AboutSection from "@/components/AboutSection";
import ServiceSection from "@/components/ServiceSection";
import EventSection from "@/components/EventSection";
import NewsSection from "@/components/NewsSection";
import CareerSection from "@/components/CareerSection";
import ForumSection from "@/components/ForumSection";

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
      <About />
      <Services />
      <Events />
      <News />
      <Career />
      <Forum />
      <SelfAssessment />
    </>
  );
}
