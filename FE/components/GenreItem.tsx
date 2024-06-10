import { Genre } from "@/schema/Genre";
import Link from "next/link";
import React from "react";

export const GenreItem: React.FC<{ genre: Genre }> = ({ genre }) => {
    return (
        <li className="text-[#808080] dark:text-white hover:underline text-sm font-medium">
            <Link href={genre.href}>{genre.name}</Link>
        </li>
    );
};
