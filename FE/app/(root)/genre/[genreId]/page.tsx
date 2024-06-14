"use client";

import { fetchNovelByGenre } from "@/api/fetchNovelByGenre";
import { useToast } from "@/components/ui/use-toast";
import { nextPage } from "@/utils/nextPage";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import NovelByGenreSkeleton from "./components/Skeleton";
import NovelByGenreList from "./components/NovelByGenreList";
import CustomPagination from "@/components/CustomPagination";
import { getCurrentPageFromHref } from "@/utils/getCurrentPageFromHref";

export default function GenrePage() {
    const { toast } = useToast();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const genreHref = searchParams?.get("href") || "";
    const genre = decodeURIComponent(pathname || "")
        ?.split("/")
        .pop()
        ?.split("-")
        .join(" ")
        .toUpperCase();
    const { isPending, isError, data, error, isSuccess } = useQuery({
        queryKey: ["genres", genreHref],
        queryFn: () => fetchNovelByGenre(genreHref),
        // placeholderData: keepPreviousData,
    });
    const page = getCurrentPageFromHref(genreHref);
    const [totalPage, setTotalPage] = useState(1);
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams?.toString());
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );

    const handlePageChange = (page: number) => {
        const url = nextPage(genreHref, page);
        router.push(pathname + "?" + createQueryString("href", url));
    };

    useEffect(() => {
        if (isSuccess) {
            const { listPage } = data;
            if (listPage?.length && listPage.length > 0) {
                setTotalPage(listPage.length);
            }
        }
    }, [isSuccess, data]);
    useEffect(() => {
        if (isError) {
            toast({
                title: error.name,
                description: error.message,
            });
        }
    }, [isError, error, toast]);

    return isPending ? (
        <NovelByGenreSkeleton />
    ) : (
        <div className="p-4">
            <p className="text-xl">
                Thể loại:{" "}
                <span className="font-semibold">{genre}</span>
            </p>
            <NovelByGenreList novels={data?.novels} />
            <CustomPagination
                currentPage={page}
                onChangePage={handlePageChange}
                totalPages={totalPage}
            />
        </div>
    );
}
