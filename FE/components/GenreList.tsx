"use client";

import React from "react";
import GenreItem from "./GenreItem";
import { Separator } from "./ui/separator";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchAllGenre } from "@/api/fetchAllGenre";
import GenreListSkeleton from "./GenreListSkeleton";

const GenreList: React.FC = () => {
    const { isPending, data } = useQuery({
        queryKey: ["genres"],
        queryFn: fetchAllGenre,
        placeholderData: keepPreviousData,
    });

    return isPending ? (
        <GenreListSkeleton />
    ) : (
        <div className="bg-gray-100 dark:bg-[#333333] border border-1 p-4">
            <h2 className="text-xl font-semibold mb-4 uppercase w-fit">
                Thể loại truyện
                <Separator />
            </h2>
            <ul className="mx-auto w-fit grid grid-cols-2 gap-y-2 gap-x-4">
                {data?.slice(1).map((genre, index) => (
                    <GenreItem key={index} genre={genre} />
                ))}
            </ul>
        </div>
    );
};

export default GenreList;
