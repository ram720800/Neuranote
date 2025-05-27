import Image from "next/image";
import Link from "next/link";
import Bookmark from "./icons/Bookmark";

interface NoteCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
  badge: string;
}

const NoteCard = ({
  id,
  name,
  topic,
  subject,
  duration,
  color,
  badge,
}: NoteCardProps) => {
  return (
    <article className={`note-card ${color}`}>
      <div className="flex justify-between items-center">
        <div className="subject-badge" style={{ backgroundColor: badge }}>
          {subject}
        </div>
        <button className="note-bookmark" style={{ backgroundColor: badge }}>
          <Bookmark />
        </button>
      </div>
      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="text-sm">{topic}</p>
      <div className="flex items-center gap-2">
        <Image
          src="/icons/clock.svg"
          alt="duration"
          width={13.5}
          height={13.5}
        />
        <p className="text-sm">{duration} mins</p>
      </div>
      <Link href={`/notes/${id}`} className="w-full">
        <button className="btn-primary justify-center w-full">
          launch neuranote
        </button>
      </Link>
    </article>
  );
};

export default NoteCard;
