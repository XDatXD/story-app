"use client";

import React from "react";
import { Separator } from "./ui/separator";
import ReadingNovelItem from "./ReadingNovelItem";
import { getReadingStates } from "@/utils/readingState";
import DialogReadingNovel from "./DialogReadingNovel";

const ReadingNovel: React.FC = () => {
    const readingStates = getReadingStates();

    return (
        <div className="bg-gray-100 dark:bg-[#333333] border border-1 mt-6 lg:mt-0 mb-6 p-4">
            <h2 className="text-xl font-semibold mb-4 uppercase w-fit">
                Truyện đang đọc
                <Separator />
            </h2>
            <ul className="px-4">
                {readingStates.length <= 5 ? (
                    readingStates.map((reading, index) => (
                        <ReadingNovelItem key={index} reading={reading} />
                    ))
                ) : (
                    <>
                        {readingStates.slice(0, 5).map((reading, index) => (
                            <ReadingNovelItem key={index} reading={reading} />
                        ))}
                        <DialogReadingNovel readingStates={readingStates} />
                    </>
                )}
            </ul>
        </div>
    );
};

export default ReadingNovel;
