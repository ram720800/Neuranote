"use client";

import Image from "next/image";
import { subjects } from "@/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useSearchParams, useRouter } from "next/navigation";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import { useEffect, useState } from "react";

const SubjectFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("subject") || "";

  const [subject, setSubject] = useState(query);

  useEffect(() => {
    let newUrl = "";
    if (subject === "all") {
      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["subject"],
      });
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "subject",
        value: subject,
      });
    }
    router.push(newUrl, { scroll: false });
  }, [subject]);

  return (
    <div>
      <Select onValueChange={setSubject} value={subject}>
        <SelectTrigger>
          <Image src="/icons/funnel.svg" alt="filter" width={24} height={24} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {subjects.map((subject) => (
            <SelectItem key={subject} value={subject} className="capitalize">
              {subject}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SubjectFilter;
