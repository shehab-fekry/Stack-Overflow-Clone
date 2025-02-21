"use client";

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { decodeUrlToObject, encodeObjectToUrl } from '@/lib/urlCoders';
import { useRouter, useSearchParams } from 'next/navigation';

const FILTERS = [
  { name: "Nextjs", value: "nextjs" },
  { name: "Express", value: "express" },
  { name: "React", value: "react" },
  { name: "Nodejs", value: "nodejs" },
  { name: "JavaScript", value: "javaScript" },
  { name: "Custom Server", value: "custom-server" },
];

const Filters = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [active, setActive] = useState<string>(searchParams.get("filter") || "");
    
    const onClickFilter = (filter: string) => {
        const utrlObj = decodeUrlToObject(searchParams.toString());

        if(filter === active) {
            setActive("");
            delete utrlObj["filter"];
        } else {
            setActive(filter);
            utrlObj["filter"] = filter;
        }

        const urlString = encodeObjectToUrl(utrlObj);
        router.push(`?${urlString}`);
    }

    return (
        <section className='hidden sm:flex sm:gap-3 flex-wrap'>
            {FILTERS.map(filter => {
                return <Button
                className={cn("body-medium rounded-lg px-6 py-3 capitalize shadow-none",
                   active === filter.value 
                   ? "bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 dark:text-primary-500 dark:hover:bg-dark-400" 
                   : "bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300"
                )} 
                key={filter.name} 
                onClick={() => onClickFilter(filter.value)}>{filter.name}</Button>
            })}
        </section>
    )
}

export default Filters