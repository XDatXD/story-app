import { ReadingState } from "@/schema/ReadingState";
import { formattedChapterTitle } from "@/utils/formattedChapterTitle";
import { formattedPathName } from "@/utils/formattedPathName";
import { getNovelHrefFromChapterHref } from "@/utils/getNovelHrefFromChapterHref";
import Link from "next/link";
import React from "react";

const ReadingNovelItem: React.FC<{
    reading: ReadingState;
}> = ({ reading }) => {
    const chapterTitle = formattedChapterTitle(reading.chapterTitle);
    const novelHref = getNovelHrefFromChapterHref(reading.href);
    const pathname = `/novel/${formattedPathName(
        reading.novelTitle
    )}/${formattedPathName(chapterTitle)}`;

    return (
        <li className="grid grid-cols-2 gap-x-4 mb-1">
            <p className="text-[#808080] dark:text-white hover:underline text-sm font-medium w-fit">
                <Link
                    href={{
                        pathname: `/novel/${formattedPathName(
                            reading.novelTitle
                        )}`,
                        query: {
                            href: novelHref,
                        },
                    }}
                >
                    {reading.novelTitle}
                </Link>
            </p>
            <p className="text-blue-900 dark:text-white hover:underline text-sm font-medium w-fit">
                <Link
                    href={{
                        pathname,
                        query: { href: reading.href },
                    }}
                >
                    Đọc tiếp {reading.chapterTitle.split(" - ")[1]}
                </Link>
            </p>
        </li>
    );
};

export default ReadingNovelItem;
