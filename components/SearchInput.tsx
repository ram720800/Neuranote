"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import SubjectFilter from "./SubjectFilter";

const SearchInput = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  searchParams.get("topic") || "";

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setTimeout(() => {
      if (searchQuery) {
        const newurl = formUrlQuery({
          params: searchParams.toString(),
          key: "topic",
          value: searchQuery,
        });

        router.push(newurl, { scroll: false });
      } else {
        if (pathname === "/notes") {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["topic"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 500);
  }, [searchQuery, router, pathname, searchParams]);

  return (
    <div className="relative rounded-xl border-4 border-white shadow-[0_5px_10px_rgba(0,0,0,0.08),0_15px_25px_-5px_rgba(25,28,33,0.2)] flex justify-between items-center gap-4 px-4 py-2 h-fit">
      <div className="flex gap-2 items-center">
        <Image src="/icons/search.svg" alt="search" width={24} height={24} />
        <input
          type="text"
          placeholder="Search neuranote..."
          className="outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <SubjectFilter />
    </div>
  );
};

export default SearchInput;
