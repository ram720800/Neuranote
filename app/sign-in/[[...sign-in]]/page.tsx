import { SignIn } from "@clerk/nextjs";
import Carousal from "@/components/Carousal";

const Page = () => {
  return (
    <main>
      <section className="home-section">
        <SignIn />
        <Carousal />
      </section>
    </main>
  );
};
export default Page;
