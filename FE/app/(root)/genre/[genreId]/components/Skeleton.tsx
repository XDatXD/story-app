import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const NovelByGenreSkeleton = () => {
    return (
        <div className="p-16">
            <div className="flex flex-col gap-4">
                {Array.from({ length: 16 }, (_, i) => i + 1).map((index) => (
                    <div key={index} className="flex h-[160px]">
                        <Skeleton className="w-[120px] h-[160px]" />
                        <div className="flex flex-col flex-1 justify-center p-8">
                            <Skeleton className="w-[200px] h-[25px] mb-4" />
                            <Skeleton className="w-[100px] h-[25px]" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NovelByGenreSkeleton;
