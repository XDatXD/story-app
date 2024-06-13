"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import NovelItem from "./NovelItem";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchAllNovel } from "@/api/fetchAllNovel";
import { useToast } from "./ui/use-toast";
import CustomPagination from "./CustomPagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import NovelListSkeleton from "./NovelListSkeleton";

const NovelList: React.FC = () => {
    const { toast } = useToast();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const page = Number(searchParams?.get("page")) || 1;
    const pageHref = useMemo(() => {
        return `https://truyenfull.vn/ajax.php?type=hot_select&id=${page}`;
    }, [page]);
    const { isPending, isError, data, error, isSuccess } = useQuery({
        queryKey: ["novels", pageHref],
        queryFn: () => fetchAllNovel(pageHref),
        // placeholderData: keepPreviousData,
    });
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
        router.push(
            pathname + "?" + createQueryString("page", page.toString())
        );
    };

    useEffect(() => {
        if (page === 1 && pathname) {
            router.push(pathname);
        }
    }, [page, pathname, router]);
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
        <NovelListSkeleton />
    ) : (
        <div>
            <div className="grid grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4 mb-8">
                {data?.novels?.map((novel, index) => (
                    <NovelItem key={index} novel={novel} />
                ))}
            </div>
            <CustomPagination
                currentPage={page}
                onChangePage={handlePageChange}
                totalPages={totalPage}
            />
        </div>
    );
};

export default NovelList;
