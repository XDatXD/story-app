"use client";

import { fetchSearch } from '@/api/fetchSearch';
import CustomPagination from '@/components/CustomPagination';
import { useToast } from '@/components/ui/use-toast';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import SearchSkeleton from '../genre/[genreId]/components/Skeleton';
import NovelSearchList from '../genre/[genreId]/components/NovelByGenreList';

const SearchPage = () => {
    const searchParams = useSearchParams();
    const query = searchParams?.get("query") || "";
    const { toast } = useToast();
    const router = useRouter();
    const pathname = usePathname();
    const page = Number(searchParams?.get("page")) || 1;
    const { isPending, isError, data, error, isSuccess } = useQuery({
        queryKey: ["search", query, page],
        queryFn: () => fetchSearch(query, page),
        // placeholderData: keepPreviousData,
    });
    const [totalPage, setTotalPage] = useState(1);

    const handlePageChange = (page: number) => {
        router.push(pathname + `?query=${query}&page=${page}`);
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
        <SearchSkeleton />
    ) : (
        <div className="p-4">
            <p className="text-xl">
                Kết quả tìm kiếm cho:{" "}
                <span className="font-semibold">{query}</span>
            </p>
            <NovelSearchList novels={data?.novels} />
            <CustomPagination
                currentPage={page}
                onChangePage={handlePageChange}
                totalPages={totalPage}
            />
        </div>
    );
}

export default SearchPage