import {
  getUserNeuranotes,
  getUserSessions,
} from "@/lib/actions/neuranote.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Tick from "./icons/Tick";
import Note from "./icons/Note";

const Profile = async () => {
  const user = await currentUser();

  if (!user) redirect("/sign-up");

  const neuranotes = await getUserNeuranotes(user.id);
  const sessions = await getUserSessions(user.id);

  return (
    <main className="note-profile">
      <section className="flex flex-col items-center gap-2 ">
        <div className="flex items-center gap-4">
          <Image
            src={user.imageUrl}
            alt={user.firstName!}
            width={64}
            height={64}
            className="rounded-full"
          />
          <div className="gap-1">
            <h1 className="text-xl font-bold">
              {user.firstName} {user.lastName}{" "}
            </h1>
            <p className="text-sm text-muted-foreground">
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>
        <div className="mt-4 space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Tick />
              <p className="text-md font-semibold">Sessions completed:</p>
            </div>

            <p className="text-md font-semibold text-muted-foreground ">
              {sessions.length}
            </p>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Note />
              <p className="text-md font-semibold">Created Neuranotes:</p>
            </div>

            <p className="text-md font-semibold text-muted-foreground ">
              {neuranotes.length}
            </p>
          </div>
          
        </div>
      </section>
    </main>
  );
};

export default Profile;
