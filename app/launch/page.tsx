import Cta from "@/components/Cta";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <main>
      <div className="flex gap-20 justify-center items-center w-full max-md:flex-col-reverse max-md:items-center mt-20">
        <Cta />
        <div className="absolute inset-0 w-full h-full z-0 max-md:hidden">
          <div
            className={cn(
              "absolute inset-0 rounded-4xl",
              "[background-size:5px_5px]",
              "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
              "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
            )}
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(circle_at_bottom_right,transparent_40%,black_65%)] dark:bg-black"></div>
        </div>
        <div className="z-20">
          <h1 className="text-4xl font-extrabold">
            Launch Your Neuranote By creating one.
          </h1>
          <Button className="mt-10 px-2 py-4">
            <Link href="/notes/new-note">
              <p className="text-2xl">Create Neuranote</p>
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
