import { Button } from "@/components/ui/button";
import Wave from "@/components/icons/Wave";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import AiVoice from "@/components/icons/AiVoice";
import Docs from "@/components/icons/Docs";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative flex flex-col items-center justify-center z-0 py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl overflow-clip">
      <div className="absolute inset-0 z-0 blur-xl opacity-60 bg-[repeating-linear-gradient(to_bottom,#fcfcf7,#fffffa,#f39c02,#ffa722,#f59e0b_100%,#fcfcf7)]" />
      <div className="flex z-10">
        <div className="relative p-[2px] overflow-hidden rounded-full bg-linear-to-r from-mic/20 via-mic/50 to-mic animate-gradient-x group">
          <Badge
            variant={"secondary"}
            className="relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors duration-200"
          >
            <Wave className="mr-2" />
            <p className="text-base text-mic">Powered by VAPI</p>
            <Wave className="ml-2" />
          </Badge>
        </div>
      </div>

      <h1 className="font-bold py-6 text-center lg:text-5xl sm:text-3xl z-10">
        <div className="flex flex-wrap justify-center items-center gap-2">
          <span>Your</span>
          <div className="flex items-center gap-1">
            <div className="blob -rotate-12">
              <AiVoice />
            </div>
            <span>voice-powered AI</span>
          </div>
          <span>tutor from your own</span>
          <div className="flex items-center gap-1">
            <div className="blob rotate-12">
              <Docs />
            </div>
            <span>notes</span>
          </div>
        </div>
      </h1>
      <h2 className="text-lg sm:text-xl lg:text-2xl text-center text-muted-foreground px-4 lg:px-0 lg:max-w-4xl z-10">
        Upload any document and have a real-time conversation with your notes
      </h2>
      <div className="z-10">
        <Button className="mt-6 text-white text-base text-center sm:text-lg lg:text-xl rounded-xl px-4 sm:px-10 sm:py-7 lg:mt-16 transition-colors duration-400 shadow-[0_5px_10px_rgba(0,0,0,0.08),0_15px_25px_-5px_rgba(25,28,33,0.2)]">
          <Link href="/sign-in" className="flex gap-4 items-center">
            <span>Get Started</span>
            <ArrowRight className="animate-pulse w-24 h-24"/>
          </Link>
        </Button>
      </div>
      <div className="absolute h-[375px] w-[1400px] rounded-[100%] bg-background left-1/2 -translate-x-1/2 border blur-xl border-[#f59e0b] bg-[radial-gradient(closest-side,#fcfcf7_82%,#ffa722)] top-[calc(100%-166px)]"></div>
    </section>
  );
};

export default HeroSection;
