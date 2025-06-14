import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
const CtaSection = () => {
  return (
    <section className="relative flex flex-col items-center justify-center z-0 py-12 transition-all animate-in lg:px-12 max-w-7xl grid-frame-bottom overflow-clip">
      <div className="absolute inset-0 z-0 blur-xl opacity-60 bg-[repeating-linear-gradient(to_bottom,#fcfcf7,#fffffa,#f39c02,#ffa722,#f59e0b_100%,#fcfcf7)]" />
      <h1 className="font-bold py-6 text-center lg:text-5xl sm:text-3xl min-lg:max-w-[800px] z-10">
        Smarter, simpler, and more efficient learning with Neuranote
      </h1>

      <div className="z-10">
        <Button className="mt-6 text-white text-base text-center sm:text-lg lg:text-xl rounded-xl px-4 sm:px-10 sm:py-7 lg:mt-16 transition-colors duration-400 shadow-[0_5px_10px_rgba(0,0,0,0.08),0_15px_25px_-5px_rgba(25,28,33,0.2)]">
          <Link href="/sign-in" className="flex gap-4 items-center">
            <span>Get Started</span>
            <ArrowRight className="animate-pulse w-24 h-24" />
          </Link>
        </Button>
      </div>
      <div className="absolute h-[375px] w-[1400px] rounded-[100%] bg-background left-1/2 -translate-x-1/2 border blur-xl border-[#f59e0b] bg-[radial-gradient(closest-side,#fcfcf7_82%,#ffa722)] top-[calc(100%-100px)]"></div>
    </section>
  );
};

export default CtaSection;
