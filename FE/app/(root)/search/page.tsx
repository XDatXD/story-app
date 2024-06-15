"use client";

import { fetchSearch } from "@/api/fetchSearch";
import { useToast } from "@/components/ui/use-toast";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import SearchSkeleton from "../genre/[genreId]/components/Skeleton";
import NovelSearchList from "../genre/[genreId]/components/NovelByGenreList";

const SearchPage = () => {
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const title = decodeURIComponent(searchParams?.get("title") || "");
    const author = decodeURIComponent(searchParams?.get("author") || "");
    const genre = decodeURIComponent(searchParams?.get("genre") || "");
    const href = decodeURIComponent(searchParams?.get("href") || "");
    const { isPending, isError, data, error } = useQuery({
        queryKey: ["searchNovels", title, author, href],
        queryFn: () => fetchSearch(title, author, href),
        placeholderData: keepPreviousData,
    });

    useEffect(() => {
        if (isError) {
            toast({
                title: error.name,
                description: error.message,
            });
        }
    }, [isError, error, toast]);

    return isPending ? (
        <SearchSkeleton />
    ) : (
        <div className="p-4">
            <p className="text-xl">
                Kết quả tìm kiếm truyên:{" "}
                <span className="font-semibold">{title}</span>
            </p>
            {author && (
                <p className="text-lg">
                    Tác giả: <span className="font-semibold">{author}</span>
                </p>
            )}
            {genre && (
                <p className="text-lg">
                    Thể loại: <span className="font-semibold">{genre}</span>
                </p>
            )}
            {data?.length > 0 ? (
                <NovelSearchList novels={data} />
            ) : (
                <p className="text-xl font-semibold">Không tồn tại truyện</p>
            )}
        </div>
    );
};

export default SearchPage;
