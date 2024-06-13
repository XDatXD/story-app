import { ContentChapter } from "@/schema/ContentChapter";
import React from "react";
import ChapterListItem from "./ChapterListItem";

const ChapterList: React.FC<{ chapterList?: ContentChapter[] }> = ({
    chapterList,
}) => {
    return (
        <ul className="columns-1 sm:columns-2 gap-x-8 space-y-2">
            {chapterList?.map((chapter, index) => (
                <ChapterListItem key={index} chapter={chapter} />
            ))}
        </ul>
    );
};

export default ChapterList;
