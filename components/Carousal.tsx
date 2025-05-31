import Supabase from "./icons/Supabase";
import Vercel from "./icons/Vercel";
import Vapi from "./icons/Vapi";
import Tailwind from "./icons/Tailwind";
import Sentry from "./icons/Sentry";

const logos = [Vapi, Vercel, Supabase, Tailwind, Sentry];

const Carousal = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="animate-scroll whitespace-nowrap flex w-max gap-10">
        {[...logos, ...logos].map((LogoComponent, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex items-center justify-center"
          >
            <LogoComponent />
          </div>
        ))}
          </div>
          <div className="left-shadow"/>
          <div className="right-shadow"/>
    </div>
  );
};

export default Carousal;
