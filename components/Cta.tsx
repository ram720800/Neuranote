import { cn } from "@/lib/utils";
import Orbit from "@/components/Orbit";
const Cta = () => {
  return (
    <section className="relative note-card z-20">
      <div className="absolute inset-0 w-full h-full">
        <div
          className={cn(
            "absolute inset-0 rounded-4xl",
            "[background-size:5px_5px]",
            "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
            "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
          )}
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(circle_at_top,transparent_20%,black_50%)] dark:bg-black rounded-4xl"></div>
      </div>
      <h2 className="font-bold text-2xl z-20">Personalize your Neuranote</h2>
      <p className="text-muted-foreground z-20 text-[16px] -mt-4">
        Tell us what you want to learn and how you want to learn it.
      </p>

      <div className="relative z-1 flex items-center justify-center">
        <div className="transcript-fadestop" />
        <Orbit />
      </div>
    </section>
  );
};

export default Cta;
