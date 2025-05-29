import NoteCard from "@/components/NoteCard";
import SearchInput from "@/components/SearchInput";
import { getAllNeuranotes } from "@/lib/actions/neuranote.actions";
import { getSubjectBadges, getSubjectColors } from "@/lib/utils";

const neuranoteLibrary = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;
  const subject = filters.subject ? filters.subject : "";
  const topic = filters.topic ? filters.topic : "";

  let neuranotes = [];

  try {
    neuranotes = await getAllNeuranotes({ subject, topic });
  } catch (error) {
    console.log(`Error loading notes:${error}`);
    return (
      <main className="p-4 text-center">
        <h1 className="text-xl font-semibold text-red-600">
          Failed to load notes
        </h1>
        <p className="mt-2 text-muted-foreground">
          Please check your internet connection and try again.
        </p>
      </main>
    );
  }

  return (
    <main>
      <section className="flex justify-between items-center gap-4 max-sm:flex-col">
        <h1>Your Neuranotes Library</h1>
        <div>
          <SearchInput />
        </div>
      </section>
      <section className="note-grid">
        {neuranotes.map((note) => (
          <NoteCard
            key={note.id}
            {...note}
            color={getSubjectColors(note.subject)}
            badge={getSubjectBadges(note.subject)}
          />
        ))}
      </section>
    </main>
  );
};

export default neuranoteLibrary;
