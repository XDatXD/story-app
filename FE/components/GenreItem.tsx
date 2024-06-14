"use client";

import { Genre } from "@/schema/Genre";
import { formattedPathName } from "@/utils/formattedPathName";
import Link from "next/link";
import React from "react";

const GenreItem: React.FC<{ genre: Genre }> = ({ genre }) => {
    const formattedGenre = formattedPathName(genre.name);

    return (
        <li className="text-[#808080] dark:text-white hover:underline text-sm font-medium">
            <Link
                href={{
                    pathname: `/genre/${formattedGenre}`,
                    query: { href: genre.href },
                }}
            >
                {genre.name}
            </Link>
        </li>
    );
};

export default GenreItem;
