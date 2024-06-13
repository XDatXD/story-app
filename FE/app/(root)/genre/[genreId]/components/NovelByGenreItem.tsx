import { Separator } from "@/components/ui/separator";
import { NovelGenre } from "@/schema/NovelGenre";
import { formattedPathName } from "@/utils/formattedPathName";
import { BookIcon, PencilIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NovelByGenreItem: React.FC<{ novel: NovelGenre }> = ({ novel }) => {
    const formattedNovel = formattedPathName(novel.title);

    return (
        <>
            <div className="flex h-[120px]">
                <Image
                    src={novel?.image || "/image.png"}
                    alt={novel.title}
                    width={192}
                    height={120}
                    priority={true}
                    className="object-contain object-center rounded-lg border border-separate max-w-[100%] h-auto"
                />
                <div className="flex flex-col flex-1 justify-center p-8">
                    <Link
                        href={{
                            pathname: `/novel/${formattedNovel}`,
                            query: { href: novel.href },
                        }}
                        className="hover:underline text-xl flex items-center gap-1 mb-1"
                    >
                        <span>
                            <BookIcon size={14} />
                        </span>{" "}
                        <b>{novel.title}</b>
                    </Link>
                    <div className="text-sm flex items-center">
                        <span>
                            <PencilIcon size={14} />
                        </span>
                        <i>{novel.author.name}</i>
                    </div>
                </div>
            </div>
            <Separator />
        </>
    );
};

export default NovelByGenreItem;
