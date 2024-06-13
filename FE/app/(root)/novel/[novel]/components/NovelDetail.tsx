import React, { useState } from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { NovelDetail as NovelDetailProps } from "@/schema/NovelDetail";
import GenreItem from "@/components/GenreItem";
import ChapterList from "./ChapterList";
import Link from "next/link";
import { formattedChapterTitle } from "@/utils/formattedChapterTitle";
import { formattedPathName } from "@/utils/formattedPathName";
import { usePathname } from "next/navigation";

const NovelDetail: React.FC<{ novel?: NovelDetailProps }> = ({ novel }) => {
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const pathname = usePathname();
    const parser = new DOMParser();
    const briefDescriptionHTML = novel?.briefDescription
        ? parser.parseFromString(novel.briefDescription, "text/html").body
              .innerHTML
        : "";

    return (
        <div className="container mx-auto py-8 px-4 dark:text-white mb-6">
            <h2 className="text-2xl font-bold mb-6">Thông tin truyện</h2>

            <div className="flex flex-col lg:flex-row bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                <div className="lg:w-1/3 w-full p-4">
                    <Image
                        src={novel?.image || "/image.png"}
                        alt="Truyện Xuyên Nhanh: Nam Thần, Bùng Cháy Đi!"
                        width={400}
                        height={600}
                        priority={true}
                        className="object-cover rounded-lg"
                    />
                </div>
                <div className="lg:w-2/3 w-full p-6">
                    <h3 className="text-2xl font-semibold mb-2 text-center">
                        {novel?.title}
                    </h3>
                    <Separator className="my-2" />
                    <div className="text-center mb-4">
                        <span className="text-gray-600 dark:text-gray-300">
                            Đánh giá:{" "}
                        </span>
                        <span className="text-yellow-500 font-bold">
                            {novel?.rating}/10
                        </span>
                    </div>
                    <div className={`mb-4 text-gray-800 dark:text-gray-200`}>
                        <div>
                            <ul className="flex flex-wrap items-center gap-2">
                                <b>Thể loại: </b>{" "}
                                {novel?.listGenre?.map((genre) => (
                                    <GenreItem key={genre.href} genre={genre} />
                                ))}
                            </ul>
                            <b>Tác giả:</b> {novel?.author?.name}
                            <br />
                            <b>Nguồn:</b> {novel?.src}
                            <br />
                            <b>Trạng thái:</b>{" "}
                            {novel?.status === "Full"
                                ? "Full"
                                : "Chưa hoàn thành"}
                        </div>
                        <div
                            className={`mt-4 ${
                                isDescriptionExpanded ? "" : "line-clamp-3"
                            }`}
                        >
                            <b>Tóm tắt:</b>{" "}
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: briefDescriptionHTML,
                                }}
                            />
                        </div>
                        <button
                            className="text-blue-500 dark:text-blue-300"
                            onClick={() =>
                                setIsDescriptionExpanded(!isDescriptionExpanded)
                            }
                        >
                            {isDescriptionExpanded ? "Thu gọn" : "Xem thêm"}
                        </button>
                    </div>
                    <div className="mt-4 flex justify-start gap-2">
                        <Button variant="default">
                            <Link
                                href={{
                                    pathname: `/novel/${pathname?.split("/novel/")[1]}/${formattedPathName(
                                        formattedChapterTitle(
                                            novel?.contentChapterList?.[0].title!
                                        )
                                    )}`,
                                    query: { href: novel?.contentChapterList?.[0].href },
                                }}
                            >
                                Đọc từ đầu
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Danh Sách Chương</h2>
                <ChapterList chapterList={novel?.contentChapterList} />
            </div>
        </div>
    );
};

export default NovelDetail;
