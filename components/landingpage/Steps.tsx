"use client";

import Orbit from "@/components/Orbit";
import { useState } from "react";

const Steps = () => {
  const [video2Loaded, setVideo2Loaded] = useState(false);
  const [video3Loaded, setVideo3Loaded] = useState(false);

  return (
    <section className="relative py-12 px-4">
      <div className="mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 grid-frame-bottom ">
        <div className="cards">
          <button className="font-semibold text-muted-foreground text-[16px] text-center rounded-md bg-border/40 w-[32px] h-[28px] mb-4">
            01
          </button>
          <h2 className="font-bold text-xl">Personalize your Neuranote</h2>
          <p className="text-muted-foreground z-20 text-[16px]">
            Tell us what you want to learn and how you want to learn
          </p>

          <div className="relative z-1 flex items-center justify-center">
            <div className="transcript-fadestop" />
            <Orbit />
          </div>
        </div>
        <div className="cards">
          <button className="font-semibold text-muted-foreground text-[16px] text-center rounded-md bg-border/40 w-[32px] h-[28px] mb-4">
            02
          </button>
          <h2 className="font-bold text-xl">Upload Notes, PDFs or Images</h2>
          <p className="text-muted-foreground z-20 text-[16px]">
            Let Neuranote read and understand your material
          </p>
          <div className="py-14">
            <video
              src="/video/step2.webm"
              autoPlay
              loop
              muted
              playsInline
              className={`w-full h-full object-cover transition duration-700 rounded-md p-2 border border-border ${
                video2Loaded ? "opacity-100" : "opacity-0 blur-3xl"
              }`}
              onLoadedData={() => setVideo2Loaded(true)}
            />
          </div>
        </div>
        <div className="cards relative">
          <button className="font-semibold text-muted-foreground text-[16px] text-center rounded-md bg-border/40 w-[32px] h-[28px] mb-4">
            03
          </button>
          <h2 className="font-bold text-xl">Ask, Speak, Learn</h2>
          <p className="text-muted-foreground z-20 text-[16px]">
            Talk to your voice tutor and get real-time explanations
          </p>

          <div className="py-14">
            <video
              src="/video/step3.webm"
              autoPlay
              loop
              muted
              playsInline
              className={`w-full h-full object-cover transition duration-700 rounded-md p-2 border border-border ${
                video3Loaded ? "opacity-100" : "opacity-0 blur-3xl"
              }`}
              onLoadedData={() => setVideo3Loaded(true)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Steps;
