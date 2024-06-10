import { ReadingStatus } from "@/schema/ReadingStatus";
import Link from "next/link";
import React from "react";

export const ReadingNovelItem: React.FC<{
    reading: ReadingStatus;
}> = ({ reading }) => {
    return (
        <li className="grid grid-cols-2 gap-x-4 mb-1">
            <p className="text-[#808080] dark:text-white hover:underline text-sm font-medium w-fit">
                <Link href={reading.href}>{reading.title}</Link>
            </p>
            <p className="text-blue-900 dark:text-white hover:underline text-sm font-medium w-fit">
                <Link href={reading.href}>
                    Đọc tiếp C{reading.numberChapter}
                </Link>
            </p>
        </li>
    );
};
