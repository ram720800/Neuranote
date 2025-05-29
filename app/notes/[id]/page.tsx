import { getNeuranote } from "@/lib/actions/neuranote.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import NeuraComponent from "@/components/NeuraComponent";
import Wave from "@/components/icons/Wave";

interface neuranoteSessionProps {
  params: Promise<{ id: string }>;
}

const neuranoteSession = async ({ params }: neuranoteSessionProps) => {
  const { id } = await params;
  const neuranote = await getNeuranote(id);
  const user = await currentUser();

  if (!user) redirect("/sign-in");
  if (!neuranote) redirect("/notes");

  return (
    <main>
      <div className="flex items-center justify-center -mt-4">
        <h1 className="flex items-center justify-center font-bold text-xl sm:text-2xl">
          {neuranote.name}
          <span className="mx-2 sm:mx-3 px-3 py-2 sm:px-4 sm:py-3 rounded-xl border-2 border-white bg-[#f4f1f8] shadow-md hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2 sm:gap-3">
            <Wave />
            Coversation
            <Wave />
          </span>
          with Neuranote
        </h1>
      </div>
      <NeuraComponent {...neuranote} neuranoteId={id} />
    </main>
  );
};

export default neuranoteSession;
