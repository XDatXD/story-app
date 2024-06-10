"use client";

import React, { useEffect, useState } from "react";
import StoryCard from "./StoryCard";
import { useQuery } from "@tanstack/react-query";
import { fetchAllNovel } from "@/api/fetchAllNovel";
import { useToast } from "./ui/use-toast";
import { CustomPagination } from "./CustomPagination";

const novels = [
    { href: "/", title: "Tư Cẩm", image: "/image.png" },
    { href: "/", title: "Ngạo Thế Đan Thần", image: "/image.png" },
    { href: "/", title: "Nàng Không Muốn Làm Hoàng Hậu", image: "/image.png" },
    { href: "/", title: "Kiều Sủng Vị Thương", image: "/image.png" },
    { href: "/", title: "Linh Vũ Thiên Hạ", image: "/image.png" },
    { href: "/", title: "Anh Đào Hồ Phách", image: "/image.png" },
    { href: "/", title: "Thần Đạo Đan Tôn", image: "/image.png" },
    {
        href: "/",
        title: "Kiều Trước Yêu Sau - Mộng Liễu Nhi",
        image: "/image.png",
    },
    { href: "/", title: "Mê Đắm", image: "/profile.png" },
    { href: "/", title: "Không Phụ Thê Duyên", image: "/profile.png" },
    { href: "/", title: "Dịu Dàng Tận Xương", image: "/profile.png" },
    { href: "/", title: "Vợ Chồng Siêu Sao Hơi Ngọt", image: "/profile.png" },
    {
        href: "/",
        title: "Nhất U? Thật Ư? Phải Là Hồng Phai Xanh Thắm",
        image: "/profile.png",
    },
    {
        href: "/",
        title: "Thiếu Tướng, Vợ Ngài Nói Giận Rồi",
        image: "/profile.png",
    },
    { href: "/", title: "Cưng Chiều Vợ Nhỏ Trời Ban", image: "/profile.png" },
    {
        href: "/",
        title: "Thiên Hương Ngự Nữ, Liếc Mắt Đưa Tình",
        image: "/profile.png",
    },
];

const ITEMS_PER_PAGE = 18;

const ListStory: React.FC = () => {
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
                {novels?.map((novel, index) => (
                    <StoryCard
                        key={index}
                        novel={novel}
                    />
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

export default ListStory;
