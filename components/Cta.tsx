import Link from "next/link";
import Orbit from "@/components/Orbit";
const Cta = () => {
  return (
    <section className="note-card">
      <h2 className="font-bold">Personalize your Neuranote</h2>
      <p className="text-muted-foreground">Tell us what you want to learn and how you want to learn it.</p>
      <div className="flex items-center justify-center">
        <Orbit />
      </div>
      
      {/* <button className="w-full btn-primary justify-center">
        <Link href="/notes/new-note">
          <p>Create Neuranote</p>
        </Link>
      </button> */}
    </section>
  );
};

export default Cta;
