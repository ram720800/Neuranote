import HeroSection from "@/components/landingpage/HeroSection";
import Steps from "@/components/landingpage/Steps";
import Dispaly from "@/components/landingpage/Dispaly";
import Pricing from "@/components/landingpage/Pricing";
import CtaSection from "@/components/landingpage/CtaSection";
import Carousal from "@/components/Carousal";
const Page = () => {
  return (
    <main>
      <div className="relative w-full grid-frame">
        <HeroSection />
        <Steps />
        <Dispaly />
        <Pricing />
        <div className="relative flex items-center">
          <div className="absolute top-0 left-0 w-full h-px bg-gray-200"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gray-200"></div>
          <div className="px-24 text-md font-semibold w-1/2 max-lg:hidden">
            Built with powerful softwares
          </div>
          <Carousal />
        </div>
        <CtaSection />
      </div>
    </main>
  );
};

export default Page;
