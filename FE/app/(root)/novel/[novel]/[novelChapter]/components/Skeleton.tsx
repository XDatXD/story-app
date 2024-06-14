import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ContentChapterSkeleton = () => {
    return (
        <div className="container mx-auto py-8 px-4 dark:text-white mb-6">
            <div className="flex justify-between items-end mb-16">
                <Skeleton className="w-[100px] h-[25px]" />
                <div>
                    <div className="text-center mb-2">
                        <h2 className="text-2xl font-bold mb-2">Đọc truyện</h2>
                        <Skeleton className="w-[150px] h-[25px] mx-auto" />
                    </div>
                    <Skeleton className="w-[100px] h-[25px] mx-auto" />
                </div>
                <Skeleton className="w-[100px] h-[25px]" />
            </div>
            {Array.from({ length: 24 }, (_, i) => i + 1).map((i) => {
                if (i % 2) {
                    return (
                        <Skeleton key={i} className="w-full h-[25px] mb-4" />
                    );
                }
                return <Skeleton key={i} className="w-3/4 h-[40px] mb-4" />;
            })}
        </div>
    );
};

export default ContentChapterSkeleton;
