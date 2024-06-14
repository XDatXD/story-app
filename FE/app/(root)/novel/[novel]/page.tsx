"use client";

import { useToast } from "@/components/ui/use-toast";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import DetailNovelSkeleton from "./components/Skeleton";
import CustomPagination from "@/components/CustomPagination";
import { fetchDetailNovel } from "@/api/fetchDetailNovel";
import NovelDetail from "./components/NovelDetail";
import { nextPage } from "@/utils/nextPage";
import { getCurrentPageFromHref } from "@/utils/getCurrentPageFromHref";

const NovelDetailPage: React.FC = () => {
    const { toast } = useToast();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const novelHref = searchParams?.get("href") || "";
    const page = getCurrentPageFromHref(novelHref);
    const { isPending, isError, data, error, isSuccess } = useQuery({
        queryKey: ["detailNovel", novelHref],
        queryFn: () => fetchDetailNovel(novelHref),
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
        const url = nextPage(novelHref, page);
        router.push(pathname + "?" + createQueryString("href", url));
    };

    useEffect(() => {
        if (isSuccess) {
            const { pages } = data;
            if (pages?.length && pages.length > 0) {
                setTotalPage(pages.length);
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
        <DetailNovelSkeleton />
    ) : (
        <div>
            <NovelDetail novel={data} />
            <CustomPagination
                currentPage={page}
                onChangePage={handlePageChange}
                totalPages={totalPage}
            />
        </div>
    );
};

export default NovelDetailPage;
