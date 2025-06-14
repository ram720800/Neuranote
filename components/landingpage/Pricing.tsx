import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import Link from "next/link";

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  period: string;
  billingNote?: string;
  recomended: boolean;
  features: string[];
  buttonText: string;
  buttonStyle: string;
}

const pricingPlans: PricingPlan[] = [
  {
    id: "basic",
    name: "Basic",
    description: "Perfect for getting started",
    price: 0,
    period: "Always free",
    recomended: false,
    features: [
      "3 Active Neuranotes/mo",
      "Concept Explanation AI",
      "Smart Quizzes from Notes",
      "Upload Notes (PDF/Image) - 3 files/month",
      "Voice Tutor (Vapi) Usage - 20mins/day",
    ],
    buttonText: "Get Started",
    buttonStyle: "bg-gray-900 hover:bg-gray-800",
    
  },
  {
    id: "pro",
    name: "Pro Scholar",
    description: "Students who study regularly",
    price: 7,
    period: "Month",
    billingNote: "Billed annually",
    recomended: true,
    features: [
      "15 Active Neuranotes/mo",
      "Concept Explanation AI",
      "Smart Quizzes from Notes",
      "Upload Notes (PDF/Image) - 15 files/mo",
      "Voice Tutor (Vapi) Usage - 60 mins/day",
    ],
    buttonText: "Choose Pro Scholar",
    buttonStyle: "bg-gray-900 hover:bg-gray-800",
    
  },
  {
    id: "mastermind",
    name: "Mastermind",
    description: "Power users & competitive exam prep",
    price: 19,
    period: "Month",
    recomended: false,
    features: [
      "Unlimited Active Neuranotes",
      "Concept Explanation AI",
      "Smart Quizzes from Notes",
      "Upload Notes (PDF/Image) - Unlimited",
      "Voice Tutor (Vapi) Usage - Unlimited",
    ],
    buttonText: "Choose Mastermind",
    buttonStyle:
      "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
    
  },
];

const PricingCard: React.FC<{ plan: PricingPlan }> = ({ plan }) => {
  return (
    <div
      className={`cards ${plan.recomended?"border-black":"border-white"} relative`}
    >
      <div className={`text-center mb-6 `}>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
        <div className="mb-4">
          <span className="text-4xl font-bold text-gray-900">
            ${plan.price}
          </span>
          {plan.period !== "Always free" && (
            <span className="text-gray-600 ml-2">/ {plan.period}</span>
          )}
        </div>
        <p className="text-sm text-gray-500">
          {plan.billingNote || plan.period}
        </p>
      </div>

      <div className="space-y-3 mb-8">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-center">
            <Check className="h-5 w-5 text-success mr-3 flex-shrink-0" />
            <span className="text-gray-700">{feature}</span>
          </div>
        ))}
      </div>


      <button
        className={`w-full ${plan.buttonStyle} text-white py-3 px-6 rounded-lg font-semibold transition-colors`}
      ><Link href="/subscribtion">{plan.buttonText}</Link>
      </button>
    </div>
  );
};

const Pricing: React.FC = () => {
  return (
    <section className="relative flex flex-col items-center justify-center z-0 py-12 transition-all animate-in lg:px-12 max-w-7xl">
      <div className="flex">
        <div className="relative p-[2px] overflow-hidden rounded-full bg-linear-to-r from-mic/20 via-mic/50 to-mic animate-gradient-x group">
          <Badge
            variant={"secondary"}
            className="relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors duration-200"
          >
            <p className="text-base text-mic">Pricing</p>
          </Badge>
        </div>
      </div>
      <h1 className="font-bold py-6 text-center lg:text-5xl sm:text-3xl min-lg:max-w-[660px]">
        Simple pricing based on your needs
      </h1>
      <h2 className="text-lg sm:text-xl lg:text-2xl text-center text-muted-foreground px-4 lg:px-0 lg:max-w-4xl">
        Choose a plan that fits your learning style and budget
      </h2>
      <div className="mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 py-12 sm:py-24">
        {pricingPlans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
      </div>
    </section>
  );
};

export default Pricing;
