import { ContentChapter } from "@/schema/ContentChapter";
import { formattedChapterTitle } from "@/utils/formattedChapterTitle";
import { formattedPathName } from "@/utils/formattedPathName";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ChapterListItem: React.FC<{ chapter: ContentChapter }> = ({
    chapter,
}) => {
    const pathname = usePathname();
    const chapterTitle = formattedChapterTitle(chapter.title);
    const pathChapter = `/novel/${pathname?.split("/novel/")[1]}/${formattedPathName(chapterTitle)}`;

    return (
        <li className="text-[#808080] dark:text-white hover:underline text-base font-medium">
            <Link
                href={{
                    pathname: pathChapter,
                    query: { href: chapter.href },
                }}
            >
                {chapterTitle}
            </Link>
        </li>
    );
};

export default ChapterListItem;
