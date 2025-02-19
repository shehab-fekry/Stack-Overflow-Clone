"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { decodeUrlToObject, encodeObjectToUrl } from "@/lib/urlCoders";

interface ILocalSearchProps {
  // route: string;
  imgSrc: string;
  placeholder: string;
  className?: string;
}

const LocalSearch = ({
  // route,
  imgSrc,
  placeholder,
  className,
}: ILocalSearchProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("query") || "";
  const [searchQuery, setSearchQuery] = useState<string>(query);

  useEffect(() => {
    const delayDebounceFN = setTimeout(() => {
      const oldParams = new URLSearchParams(searchParams).toString();
      const paramsObj = decodeUrlToObject(oldParams);
      
      if (searchQuery.length) paramsObj["query"] = searchQuery;
      else delete paramsObj["query"];

      const newParams = encodeObjectToUrl(paramsObj);

      const url = `${newParams.length ? "?" + newParams : "/"}`;
      router.replace(url, { scroll: false });
    }, 1000);

    return () => clearTimeout(delayDebounceFN);
  }, [router, searchParams, searchQuery]);

  const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
  };

  return (
    <div
      className={`flex-center min-h-[56px] grow gap-4 px-4 rounded-[10px] background-light800_darkgradient ${className}`}
    >
      <Image
        src={imgSrc}
        width={24}
        height={24}
        alt="Search"
        className="cursor-pointer"
      />
      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => searchHandler(e)}
        className="paragraph-regular no-focus placholder text-dark400_light700 border-none shadow-none outline-none border"
      />
    </div>
  );
};

export default LocalSearch;
