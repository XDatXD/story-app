import { Genre } from "@/schema/Genre";
import React from "react";
import { GenreItem } from "./GenreItem";
import { Separator } from "./ui/separator";

const genres: Genre[] = [
    { name: "Kiếm Hiệp", href: "/category/kiem-hiep" },
    { name: "Ngôn Tình", href: "/category/ngon-tinh" },
    { name: "Dị Giới", href: "/category/di-gioi" },
    { name: "Dị Năng", href: "/category/di-nang" },
    { name: "Quân Sự", href: "/category/quan-su" },
    { name: "Lịch Sử", href: "/category/lich-su" },
    { name: "Xuyên Không", href: "/category/xuyen-khong" },
    { name: "Trinh Thám", href: "/category/trinh-tham" },
    { name: "Thám Hiểm", href: "/category/tham-hiem" },
    { name: "Đông Phương", href: "/category/dong-phuong" },
    { name: "Hài Hước", href: "/category/hai-huoc" },
    { name: "Cổ Đại", href: "/category/co-dai" },
    { name: "Truyện Teen", href: "/category/truyen-teen" },
    { name: "Phương Tây", href: "/category/phuong-tay" },
    { name: "Light Novel", href: "/category/light-novel" },
    { name: "Việt Nam", href: "/category/viet-nam" },
];

export const GenreList: React.FC = () => {
    return (
        <div className="bg-gray-100 dark:bg-[#333333] border border-1 p-4">
            <h2 className="text-xl font-semibold mb-4 uppercase w-fit">
                Thể loại truyện
                <Separator />
            </h2>
            <ul className="mx-auto w-fit grid grid-cols-2 gap-y-2 gap-x-4">
                {genres.map((genre, index) => (
                    <GenreItem key={index} genre={genre} />
                ))}
            </ul>
        </div>
    );
};
