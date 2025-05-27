import Code from "./icons/Code";
import Math from "./icons/Math";
import Language from "./icons/Language";
import Quiz from "./icons/Quiz";
import AI from "./icons/AI";

const Orbit = () => {
  return (
    <div className="relative w-[300px] h-[300px]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 radial-gradient">
        <div className="font-bold text-4xl opacity-50">N</div>
      </div>

      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-32 h-32 border border-border rounded-full absolute" />
        <div className="w-48 h-48 border border-border rounded-full absolute" />
        <div className="w-64 h-64 border border-border rounded-full absolute" />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-orbitone origin-center">
        <div className="absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6">
          <Language />
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-orbitone-delay1 origin-center">
        <div className="absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6">
          <Math />
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-orbittwo origin-center">
        <div className="absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7">
          <Code />
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-orbittwo-delay1 origin-center">
        <div className="absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7">
          <Quiz />
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-orbittwo-delay2 origin-center">
        <div className="absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7">
          <AI/>
        </div>
      </div>
    </div>
  );
};

export default Orbit;
