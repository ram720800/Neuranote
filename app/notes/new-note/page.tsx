import NoteForm from "@/components/NoteForm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const NewNeuranote = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <main className="items-center justify-center">
      <article className="w-full">
        <h1 className="text-2xl">Build your Neuranote</h1>
        <NoteForm />
      </article>
    </main>
  );
};

export default NewNeuranote;
