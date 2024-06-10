import React from "react";
import { Separator } from "./ui/separator";
import ReadingNovelItem from "./ReadingNovelItem";
import { ReadingStatus } from "@/schema/ReadingStatus";

const readings: ReadingStatus[] = [
    {
        href: "/",
        title: "Tự cẩm",
        numberChapter: 23,
        position: 5,
        source: "https://truyenfull.vn/",
    },
    {
        href: "/",
        title: "Hồng nhan",
        numberChapter: 2,
        position: 10,
        source: "https://truyenfull.vn/",
    },
    {
        href: "/",
        title: "Hoa xuyến chi",
        numberChapter: 14,
        position: 7,
        source: "https://truyenfull.vn/",
    },
];

const ReadingNovel: React.FC = () => {
    return (
        <div className="bg-gray-100 dark:bg-[#333333] border border-1 mt-6 lg:mt-0 mb-6 p-4">
            <h2 className="text-xl font-semibold mb-4 uppercase w-fit">
                Truyện đang đọc
                <Separator />
            </h2>
            <ul className="px-4">
                {readings.map((reading, index) => (
                    <ReadingNovelItem key={index} reading={reading} />
                ))}
            </ul>
        </div>
    );
};

export default ReadingNovel;