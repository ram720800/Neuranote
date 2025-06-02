import { SignIn } from "@clerk/nextjs";
import Carousal from "@/components/Carousal";

const Page = () => {
  return (
    <main>
      <section className="home-section mt-10">
        <SignIn forceRedirectUrl="/launch" />
        <Carousal />
      </section>
    </main>
  );
};
export default Page;
