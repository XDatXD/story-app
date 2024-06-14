import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Novel as NovelProps } from "@/schema/Novel";
import { formattedPathName } from "@/utils/formattedPathName";

const StoryCard: React.FC<{ novel: NovelProps }> = ({ novel }) => {
    const formattedNovel = formattedPathName(novel.title);

    return (
        <Card className="justify-self-center relative transition-transform duration-300 ease-in-out cursor-pointer hover:transform hover:translate-y-[-5px] hover:shadow-lg w-[100%] h-[100%] lg:w-[129px] lg:h-[192px] overflow-hidden">
            <CardHeader className="p-0">
                <Link
                    href={{
                        pathname: `/novel/${formattedNovel}`,
                        query: { href: novel.href },
                    }}
                >
                    <Image
                        src={novel.image}
                        alt={novel.title}
                        width={129}
                        height={192}
                        priority={true}
                        className="object-cover rounded-t-lg w-[100%] h-[100%]"
                    />
                </Link>
            </CardHeader>
            <CardContent
                className="absolute bottom-0 left-0 text-white w-full p-1 rounded-b-lg"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            >
                <p className="text-center text-sm">{novel.title}</p>
            </CardContent>
        </Card>
    );
};

export default StoryCard;
