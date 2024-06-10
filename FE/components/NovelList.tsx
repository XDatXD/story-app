"use client";

import React, { useEffect, useState } from "react";
import NovelItem from "./NovelItem";
import { useQuery } from "@tanstack/react-query";
import { fetchAllNovel } from "@/api/fetchAllNovel";
import { useToast } from "./ui/use-toast";
import CustomPagination from "./CustomPagination";

const ITEMS_PER_PAGE = 18;

const NovelList: React.FC = () => {
    const { isPending, isError, data, error } = useQuery({
        queryKey: ["novels"],
        queryFn: fetchAllNovel,
    });
    const { toast } = useToast();
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        if (isError) {
            toast({
                title: error.name,
                description: error.message,
            });
        }
    }, [isError, error, toast]);

    return (
        <div>
            <div className="grid grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
                {data?.novels?.map((novel, index) => (
                    <NovelItem key={index} novel={novel} />
                ))}
            </div>
            <CustomPagination
                currentPage={currentPage}
                onChangePage={handlePageChange}
                totalPages={5}
            />
        </div>
    );
};

export default NovelList;
