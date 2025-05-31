import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { cn, getSubjectBadges} from "@/lib/utils";

interface NeuranoteListProp {
  title: string;
  neuranotes?: Neuranote[];
  classNames?: string;
}

const NeuranoteList = ({
  title,
  neuranotes,
  classNames,
}: NeuranoteListProp) => {
  return (
    <article className={cn("note-list", classNames)}>
      <h2 className="font-bold text-2xl">{title}</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg w-2/3">Neuras</TableHead>
            <TableHead className="text-lg">Subject</TableHead>
            <TableHead className="text-lg">Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {neuranotes?.map(({ id, subject, name, topic, duration }) => (
            <TableRow key={id}>
              <TableCell>
                <Link href={`/notes/${id}`}>
                  <div className="flex flex-col">
                    <p className="text-xl font-semibold">{name}</p>
                    <p className="text-sm truncate text-muted-foreground">{topic}</p>
                  </div>
                </Link>
              </TableCell>
              <TableCell>
                <div
                  className="subject-badge w-fit border-2 border-white shadow-md"
                  style={{ backgroundColor: getSubjectBadges(subject) }}
                >
                  {subject}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center">
                  <p className="text-md">
                    {duration}{" "}<span className="text-sm">mins</span>
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </article>
  );
};

export default NeuranoteList;
