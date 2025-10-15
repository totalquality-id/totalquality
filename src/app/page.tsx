import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Events from "@/components/Events";
import News from "@/components/News";
import Career from "@/components/Career";
import Forum from "@/components/Forum";
import SelfAssessment from "@/components/SelfAssessment";
import AboutSection from "@/components/AboutSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
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
