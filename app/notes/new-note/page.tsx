import NoteForm from "@/components/NoteForm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { newNotePermission } from "@/lib/actions/neuranote.actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const NewNeuranote = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const canCreateNeuranote = await newNotePermission();

  return (
    <main className="items-center justify-center mt-10">
      {canCreateNeuranote ? (
        <article className="w-full">
          <h1 className="text-2xl">Build your Neuranote</h1>
          <NoteForm />
        </article>
      ) : (
        <article className="note-limit">
          <h1 className="text-2xl font-bold">Upgrade your plan</h1>
          <p>You've Reached Your Limit. Upgrade to create more Neuranotes</p>
          <Link href="/subscription">
            <Button>Upgrade</Button>
          </Link>
        </article>
      )}
    </main>
  );
};

export default NewNeuranote;
