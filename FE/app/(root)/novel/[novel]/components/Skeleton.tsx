import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const DetailNovelSkeleton = () => {
    return (
        <div className="container mx-auto py-8 px-4 dark:text-white mb-6">
            <h2 className="text-2xl font-bold mb-6">Thông tin truyện</h2>

            <div className="flex flex-col lg:flex-row bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                <div className="lg:w-1/3 w-full p-4">
                    <Skeleton className="w-[400px] h-[600px]" />
                </div>
                <div className="lg:w-2/3 w-full p-6">
                    <Skeleton className="w-[200px] h-[40px] mx-auto" />
                    <Separator className="my-2" />
                    <div className="text-center mb-4">
                        <Skeleton className="w-[100px] h-[25px] mx-auto" />
                    </div>
                    <div className={`mb-4 text-gray-800 dark:text-gray-200`}>
                        <div>
                            <ul className="flex flex-wrap items-center gap-2 mb-4">
                                <b>Thể loại: </b>{" "}
                                <Skeleton className="w-[120px] h-[25px]" />
                            </ul>
                            <div className="flex items-center gap-2 mb-4">
                                <b>Tác giả:</b>{" "}
                                <Skeleton className="w-[100px] h-[25px]" />
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                                <b>Nguồn:</b>{" "}
                                <Skeleton className="w-[160px] h-[25px]" />
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                                <b>Trạng thái:</b>{" "}
                                <Skeleton className="w-[70px] h-[25px]" />
                            </div>
                        </div>
                        <div>
                            <b>Tóm tắt:</b>{" "}
                            <Skeleton className="w-full h-[300px] mt-2" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Danh Sách Chương</h2>
                <ul className="columns-1 sm:columns-2 gap-x-8 space-y-2">
                    {Array.from({ length: 50 }, (_, i) => i + 1).map((i) => (
                        <li
                            key={i}
                            className="text-[#808080] dark:text-white hover:underline text-base font-medium"
                        >
                            <Skeleton className="w-full h-[25px]" />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DetailNovelSkeleton;
