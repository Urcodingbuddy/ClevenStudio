import { AppBar } from "@repo/components/landing/src/AppBar";
import { HeroMessage } from "@repo/components/landing/src/HeroMessage";
import { ContainerScroll } from "@repo/components/ui/container-scroll-animation";
import { EssentialSection } from "@repo/components/landing/src/EssentialSection";
import { FAQ } from "@repo/components/landing/src/FAQ";
import { Footer } from "@repo/components/landing/src/Footer";
import { Services } from "@repo/components/landing/src/Services";
import { Testimonials } from "@repo/components/landing/src/Testimonials";
import { TextHoverEffect } from "@repo/components/ui/text-hover-effect";

export default function Landing() {
  return (
    <>
      <AppBar />
      <ContainerScroll>
        <img src="./dashboard-ex.jpg" alt="" />
      </ContainerScroll>
      <HeroMessage />
      <EssentialSection />
      <Services />
      <Testimonials />
      <FAQ />
      <TextHoverEffect text="CLEVEN" />
      <Footer />
    </>
  );
}
