import NoteCard from "@/components/NoteCard";
import SearchInput from "@/components/SearchInput";
import { getAllNeuranotes } from "@/lib/actions/neuranote.actions";
import { getSubjectBadges, getSubjectColors } from "@/lib/utils";

const neuranoteLibrary = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;
  const subject = filters.subject ? filters.subject : "";
  const topic = filters.topic ? filters.topic : "";

  const neuranotes = await getAllNeuranotes({ subject, topic });

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
