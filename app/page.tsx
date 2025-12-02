import Hero from "../app/components/Home";
import Services from "../app/services/page";
import Portfolio from "./portofolio/page";
import Contact from "../app/contact/page";
import BackgroundWrapper from "../app/components/wrapperDarkVeil";
import SectionWrapper from "../app/components/SectionWrapper";
import TestimoniPage from "../app/components/testimoni/page";

export default function Home() {
  return (
    <div className="no-scrollbar relative min-h-screen overflow-hidden bg-black">
      {/* Background */}
      <BackgroundWrapper />

      {/* Page content */}
      <main className="relative z-10">
        <SectionWrapper>
          <Hero />
        </SectionWrapper>

        <SectionWrapper>
          <Services />
        </SectionWrapper>

        <Portfolio />

        <TestimoniPage />


        <Contact />
      </main>
    </div>
  );
}
