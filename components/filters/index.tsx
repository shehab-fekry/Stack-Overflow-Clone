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
    const [active, setActive] = useState<string>("");
    
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
        <section className='flex gap-3'>
            {FILTERS.map(filter => {
                return <Button
                className={cn({"!bg-red-400 !text-red-950": active === filter.value})} 
                key={filter.name} 
                onClick={() => onClickFilter(filter.value)}>{filter.name}</Button>
            })}
        </section>
    )
}

export default Filters