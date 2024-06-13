import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const NovelListSkeleton = () => {
    return (
        <div className="grid grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4 mb-6">
            {Array.from({ length: 18 }, (_, i) => i + 1).map((index) => (
                <div
                    key={index}
                    className="w-[80px] h-[150px] lg:w-[129px] lg:h-[192px]"
                >
                    <Skeleton className="w-[100%] h-[100%]" />
                </div>
            ))}
        </div>
    );
};

export default NovelListSkeleton;
