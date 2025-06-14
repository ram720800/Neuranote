import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
const Dispaly = () => {
  return (
    <section className="relative flex flex-col items-center justify-center z-0 py-12 transition-all animate-in lg:px-12 max-w-7xl grid-frame-bottom">
      <div className="flex">
        <div className="relative p-[2px] overflow-hidden rounded-full bg-linear-to-r from-mic/20 via-mic/50 to-mic animate-gradient-x group">
          <Badge
            variant={"secondary"}
            className="relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors duration-200"
          >
            <p className="text-base text-mic">Benifits</p>
          </Badge>
        </div>
      </div>
      <h1 className="font-bold py-6 text-center lg:text-5xl sm:text-3xl min-lg:max-w-[660px]">
        Your all-in-one AI tutor from your own notes
      </h1>
      <h2 className="text-lg sm:text-xl lg:text-2xl text-center text-muted-foreground px-4 lg:px-0 lg:max-w-4xl">
        Revisit your notes with a voice-powered AI tutor that helps you learn
      </h2>
      <div>
        <Button className="mt-6 text-white text-base text-center sm:text-lg lg:text-xl rounded-xl px-4 sm:px-10 sm:py-7 lg:mt-16 transition-colors duration-400 shadow-[0_5px_10px_rgba(0,0,0,0.08),0_15px_25px_-5px_rgba(25,28,33,0.2)]">
          <Link href="/sign-in" className="flex gap-4 items-center">
            <span>Get Started</span>
            <ArrowRight className="animate-pulse w-24 h-24"/>
          </Link>
        </Button>
      </div>
     {/*  <div className="mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 py-12 sm:py-24">
        <div className="display-cards">
          <h2 className="font-bold text-xl">Personalize your Neuranote</h2>
          <p className="text-muted-foreground z-20 text-[16px]">
            Tell us what you want to learn
          </p>
        </div>
        <div className="display-cards">
          <h2 className="font-bold text-xl">Personalize your Neuranote</h2>
          <p className="text-muted-foreground z-20 text-[16px]">
            Tell us what you want to learn
          </p>
        </div>
      </div> */}
    </section>
  );
};

export default Dispaly;
